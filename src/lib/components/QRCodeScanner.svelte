<script lang="ts">
  import { onMount } from "svelte";
  import { Html5QrcodeScanner } from "html5-qrcode";
  import { fade, scale, fly } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  let showModal = false;
  interface ParticipantDetails {
    [key: string]: string | number | boolean;
  }
  let participantDetails: ParticipantDetails | null = null;
  let scanning = false;
  let scanCount = 0;

  async function onScanSuccess(decodedText: string) {
    try {
      const data = await fetch("/api/decode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: decodedText }),
      });
	  participantDetails = await data.json();
	  participantDetails = participantDetails.decoded;
      showModal = true;
      scanning = false;
      scanCount++;
    } catch (error) {
      alert("Invalid QR code format");
    }
  }

  function closeModal() {
    showModal = false;
    participantDetails = null;
    scanning = true;
  }

  onMount(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 300,
          height: 300,
        },
        fps: 10,
        rememberLastUsedCamera: true,
        aspectRatio: 1.0,
      },
      false
    );
    scanner.render(onScanSuccess, (error) => {
      // Handling errors silently
    });

    return () => {
      scanner.clear();
    };
  });
</script>

<svelte:head>
  <title>QR Scanner</title>
</svelte:head>

<div class="container" in:fade={{ duration: 300 }}>
  <div
    class="scanner-container"
    in:fly={{ y: 20, duration: 800, easing: elasticOut }}
  >
    <div class="scanner-header">
      <h1>Scan QR Code</h1>
      {#if scanCount > 0}
        <div class="scan-count" in:scale={{ duration: 300 }}>
          <span>{scanCount}</span>
          <small>Scanned</small>
        </div>
      {/if}
    </div>
    <div class="scanner-wrapper">
      <div id="reader"></div>
      {#if scanning}
        <div class="scanning-overlay" in:fade={{ duration: 300 }}>
          <div class="scanning-frame">
            <div class="corner top-left"></div>
            <div class="corner top-right"></div>
            <div class="corner bottom-left"></div>
            <div class="corner bottom-right"></div>
          </div>
          <div class="scanning-animation"></div>
        </div>
      {/if}
    </div>
  </div>

  {#if showModal}
    <div class="modal-overlay" transition:fade={{ duration: 200 }}>
      <div
        class="modal"
        transition:scale={{ duration: 400, easing: elasticOut }}
      >
        <div class="modal-content">
          <div class="success-icon">✓</div>
          <h2>Participant Details</h2>
          {#if participantDetails}
            <div class="details">
              {#each Object.entries(participantDetails) as [key, value]}
                <div
                  class="detail-item"
                  in:fly={{ y: 20, duration: 300, delay: 200 }}
                >
                  <span class="label">{key}</span>
                  <span class="value">{value}</span>
                </div>
              {/each}
            </div>
          {/if}
          <div class="button-group">
            <button class="approve" on:click={closeModal}>
              <span>Approve</span>
              <div class="button-bg"></div>
            </button>
            <button class="scan-another" on:click={closeModal}>
              <span>Scan Another</span>
              <div class="button-bg"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .scanner-container {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border-radius: 32px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
    max-width: 600px;
  }

  .scanner-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .scan-count {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1.25rem;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .scan-count span {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-theme-2);
  }

  .scan-count small {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.7;
  }

  h1 {
    color: var(--color-text);
    margin: 0;
    font-weight: 700;
    letter-spacing: -0.025em;
    background: linear-gradient(
      to right,
      var(--color-theme-1),
      var(--color-theme-2)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .scanner-wrapper {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    background: var(--color-bg-2);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    width: 100%;
    display: flex;
    align-items: center;
  }

  #reader {
    margin: 0 auto;
    max-width: 100%;
  }

  :global(#reader video) {
    border-radius: 24px !important;
  }

  :global(#reader) {
    border: none !important;
    box-shadow: none !important;
  }

  .scanning-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .scanning-frame {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 3px solid var(--color-theme-2);
    opacity: 0.8;
  }

  .top-left {
    top: 20px;
    left: 20px;
    border-right: 0;
    border-bottom: 0;
    border-radius: 8px 0 0 0;
  }

  .top-right {
    top: 20px;
    right: 20px;
    border-left: 0;
    border-bottom: 0;
    border-radius: 0 8px 0 0;
  }

  .bottom-left {
    bottom: 20px;
    left: 20px;
    border-right: 0;
    border-top: 0;
    border-radius: 0 0 0 8px;
  }

  .bottom-right {
    bottom: 20px;
    right: 20px;
    border-left: 0;
    border-top: 0;
    border-radius: 0 0 8px 0;
  }

  .scanning-animation {
    position: absolute;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--color-theme-2),
      transparent
    );
    animation: scan 2s ease-in-out infinite;
    box-shadow: 0 0 8px var(--color-theme-2);
  }

  @keyframes scan {
    0% {
      top: 20px;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      top: calc(100% - 20px);
      opacity: 0;
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: var(--color-bg-1);
    border-radius: 32px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    max-width: 90%;
    width: 500px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  .modal-content {
    padding: 2rem;
  }

  .success-icon {
    width: 60px;
    height: 60px;
    background: var(--color-success);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    margin: 0 auto 1.5rem;
    animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }

  .modal h2 {
    margin: 0 0 1.5rem;
    color: var(--color-text);
    text-align: center;
    background: linear-gradient(
      to right,
      var(--color-theme-1),
      var(--color-theme-2)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.2s ease;
  }

  .detail-item:hover {
    transform: translateY(-2px);
  }

  .label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .value {
    font-size: 1.25rem;
    color: var(--color-text);
    font-weight: 600;
  }

  .button-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }

  button {
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .button-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      var(--color-theme-1),
      var(--color-theme-2)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  button span {
    position: relative;
    z-index: 1;
  }

  .approve {
    background: var(--color-success);
    color: white;
  }

  .scan-another {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  button:hover .button-bg {
    opacity: 1;
  }

  button:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    .container {
      padding: 1rem;
    }

    .scanner-container {
      padding: 1rem;
      border-radius: 24px;
    }

    .modal {
      width: 95%;
    }

    .button-group {
      grid-template-columns: 1fr;
    }

    .detail-item {
      padding: 1rem;
    }

    .scan-count {
      padding: 0.5rem 1rem;
    }
  }
</style>
