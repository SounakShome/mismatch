<script lang="ts">
  import { onMount } from "svelte";
  import { Html5QrcodeScanner } from "html5-qrcode";
  import { fade, scale, fly } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  let showModal = false;
  interface ParticipantDetails {
    [key: string]: string | number | boolean;
  }
  let participantDetails: ParticipantDetails;
  let scanning = false;
  let scanCount = 0;

  async function onScanSuccess(decodedText: string) {
    try {
      scanning = false;
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

  async function handleApprove(){
    try {
      const data = await fetch("/api/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: participantDetails }),
      });
      const response = await data.json();
      if (response.success) {
        alert("Participant approved successfully!");
      } else {
        alert("Failed to approve participant.");
      }
    } catch (error) {
      alert("An error occurred while approving the participant.");
    } finally {
      closeModal();
    }
  }

  function closeModal() {
    showModal = false;
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

<div
  class="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center"
  in:fade={{ duration: 300 }}
>
  <div
    class="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl p-4 md:p-8 shadow-lg border border-white/10"
    in:fly={{ y: 20, duration: 800, easing: elasticOut }}
  >
    <div class="flex justify-between items-center mb-8">
      <h1
        class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        Scan QR Code
      </h1>
      {#if scanCount > 0}
        <div
          class="bg-white/10 px-4 py-3 rounded-xl flex flex-col items-center"
          in:scale={{ duration: 300 }}
        >
          <span class="text-xl font-bold text-secondary">{scanCount}</span>
          <small class="text-xs uppercase tracking-wider opacity-70"
            >Scanned</small
          >
        </div>
      {/if}
    </div>
    <div
      class="relative rounded-2xl overflow-hidden bg-black/20 shadow-inner flex items-center"
    >
      <div id="reader" class="mx-auto w-full"></div>
      {#if scanning}
        <div
          class="absolute inset-0 pointer-events-none"
          in:fade={{ duration: 300 }}
        >
          <div class="absolute inset-0">
            <div
              class="absolute top-5 left-5 w-8 h-8 border-t-3 border-l-3 border-secondary/80 rounded-tl-lg"
            ></div>
            <div
              class="absolute top-5 right-5 w-8 h-8 border-t-3 border-r-3 border-secondary/80 rounded-tr-lg"
            ></div>
            <div
              class="absolute bottom-5 left-5 w-8 h-8 border-b-3 border-l-3 border-secondary/80 rounded-bl-lg"
            ></div>
            <div
              class="absolute bottom-5 right-5 w-8 h-8 border-b-3 border-r-3 border-secondary/80 rounded-br-lg"
            ></div>
          </div>
          <div
            class="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan shadow-md shadow-secondary"
          ></div>
        </div>
      {/if}
    </div>
  </div>

  {#if showModal}
    <div
      class="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
      transition:fade={{ duration: 250 }}
    >
      <div
        class="w-full max-w-md bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-white/20"
        in:fly={{ y: 30, duration: 500, easing: elasticOut }}
      >
        <!-- Header -->
        <div class="relative p-5 border-b border-white/10">
          <div class="absolute top-4 right-4">
            <button 
              class="text-white/50 hover:text-white transition-colors" 
              on:click={closeModal}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 class="text-xl font-bold text-white">Participant Verified</h2>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-5 max-h-[60vh] overflow-y-auto">
          {#if participantDetails}
            <div class="space-y-4">
              {#each Object.entries(participantDetails) as [key, value], i}
                <div 
                  class="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  in:fly={{ y: 10, delay: i * 75, duration: 300 }}
                >
                  <div class="text-xs uppercase tracking-wider text-white/50 mb-1">{key}</div>
                  <div class="font-medium text-white break-all">{value}</div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
        
        <!-- Footer -->
        <div class="p-5 border-t border-white/10 flex gap-3">
          <button 
            class="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium transition-transform hover:scale-105 active:scale-95"
            on:click={handleApprove}
          >
            Approve
          </button>
          <button 
            class="flex-1 py-3 rounded-lg bg-white/10 text-white font-medium backdrop-blur-sm hover:bg-white/20 transition-all"
            on:click={closeModal}
          >
            Scan Another
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
