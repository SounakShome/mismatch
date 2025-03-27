<script>
  let { children } = $props();
  import "../app.css";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Navbar from "$lib/components/navbar/+page.svelte";
  import { UserRound } from "lucide-svelte";
  let isLoaded = writable(false);
  onMount(() => {
    isLoaded.set(true);
  });
</script>

<svelte:head>
  <title>MisMatch'25</title>
  <meta name="MisMatch'25 IEEE RAS VIT Chennai (Vellore Institute of Technology, Chennai) Hackathon" content="Hackathon website of MisMatch'25 that will be held in VIT Chennai on the 31st of March and 1st of April" />
</svelte:head>

{#if !isLoaded}
  <div class="flex bg-black h-screen flex-col items-center justify-center">
    <img src="/loading.gif" alt="loading..." />
  </div>
{:else if isLoaded}
  <div class="mx-auto">
    <Navbar />
    {@render children()}
    <div
      class="text-white border-2 p-2 rounded-full"
      style="position: fixed; bottom: 20px; right: 20px;"
    >
      <a href="/contact" class="flex items-center z-50 gap-2">
        <UserRound /> Contact Us
      </a>
    </div>
  </div>
{/if}
