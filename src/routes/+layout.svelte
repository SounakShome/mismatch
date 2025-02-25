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
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !isLoaded}
  <div class="flex bg-black h-screen flex-col items-center justify-center">
    <img src="/loading.gif" alt="loading...">
  </div>
{/if}
  <Navbar />
  {@render children()}
  <div
    class="text-white border-2 p-2 rounded-full"
    style="position: fixed; bottom: 20px; right: 20px;"
  >
    <a href="/contact" class="flex items-center gap-2">
      <UserRound /> Contact Us
    </a>
  </div>
