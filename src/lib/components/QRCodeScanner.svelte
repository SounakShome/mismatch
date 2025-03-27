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
      const response = await data.json();
      participantDetails = response.decoded as ParticipantDetails;
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

<div class="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center" in:fade={{ duration: 300 }}>
  <div
    class="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl p-4 md:p-8 shadow-lg border border-white/10"
    in:fly={{ y: 20, duration: 800, easing: elasticOut }}
  >
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Scan QR Code</h1>
      {#if scanCount > 0}
        <div class="bg-white/10 px-4 py-3 rounded-xl flex flex-col items-center" in:scale={{ duration: 300 }}>
          <span class="text-xl font-bold text-secondary">{scanCount}</span>
          <small class="text-xs uppercase tracking-wider opacity-70">Scanned</small>
        </div>
      {/if}
    </div>
    <div class="relative rounded-2xl overflow-hidden bg-black/20 shadow-inner flex items-center">
      <div id="reader" class="mx-auto w-full"></div>
      {#if scanning}
        <div class="absolute inset-0 pointer-events-none" in:fade={{ duration: 300 }}>
          <div class="absolute inset-0">
            <div class="absolute top-5 left-5 w-8 h-8 border-t-3 border-l-3 border-secondary/80 rounded-tl-lg"></div>
            <div class="absolute top-5 right-5 w-8 h-8 border-t-3 border-r-3 border-secondary/80 rounded-tr-lg"></div>
            <div class="absolute bottom-5 left-5 w-8 h-8 border-b-3 border-l-3 border-secondary/80 rounded-bl-lg"></div>
            <div class="absolute bottom-5 right-5 w-8 h-8 border-b-3 border-r-3 border-secondary/80 rounded-br-lg"></div>
          </div>
          <div class="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan shadow-md shadow-secondary"></div>
        </div>
      {/if}
    </div>
  </div>

  {#if showModal}
    <div class="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex justify-center items-center z-50" transition:fade={{ duration: 200 }}>
      <div
        class="bg-gray-900 rounded-3xl shadow-2xl max-w-[90%] w-[500px] border border-white/10 overflow-hidden"
        transition:scale={{ duration: 400, easing: elasticOut }}
      >
        <div class="p-6 md:p-8">
          <div class="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center text-3xl text-white animate-bounce">✓</div>
          <h2 class="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Participant Details</h2>
          {#if participantDetails}
            <div class="flex flex-col gap-4 my-8">
              {#each Object.entries(participantDetails) as [key, value]}
                <div
                  class="flex flex-col gap-1 p-5 bg-white/5 rounded-xl border border-white/10 transition-transform hover:-translate-y-0.5"
                  in:fly={{ y: 20, duration: 300, delay: 200 }}
                >
                  <span class="text-sm text-white/60 uppercase tracking-wider">{key}</span>
                  <span class="text-xl font-semibold text-white">{value}</span>
                </div>
              {/each}
            </div>
          {/if}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button class="py-4 px-6 rounded-xl bg-green-500 text-white font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all relative overflow-hidden" on:click={closeModal}>
              <span class="relative z-10">Approve</span>
              <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity"></div>
            </button>
            <button class="py-4 px-6 rounded-xl bg-white/10 text-white font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all relative overflow-hidden" on:click={closeModal}>
              <span class="relative z-10">Scan Another</span>
              <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>