<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ras from "$lib/assets/public/logo.png";
  import { Menu, X } from "lucide-svelte";

  let open = false;

  function toggleMobileMenu() {
    open = !open;
  }
</script>

<nav class={`${page.url.pathname !== "/timeline" ? "absolute" : "relative"} font-press z-50 top-0 left-0 w-full`}>
  <!-- Main container -->
  <div class="container mx-auto px-4 justify-center flex gap-x-5 items-center">
    <!-- Desktop Left Nav (hidden on mobile) -->
    <div class="hidden md:flex lg:gap-x-10 gap-x-5">
      <button class="text-white cursor-pointer" on:click={() => goto("/")}>Home</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/about")}>About</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/tracks")}>Tracks</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/timeline")}>Timeline</button>
    </div>

    <!-- Center: Logo -->
      <img src={ras} alt="RAS Logo" class="h-32 md:h-32 cursor-pointer" />

    <!-- Right side: Desktop Right Nav and Mobile Menu Button -->
    <div class="flex items-center gap-x-4">
      <!-- Desktop Right Nav (hidden on mobile) -->
      <div class="hidden md:flex lg:gap-x-10 gap-x-5">
        <button class="text-white cursor-pointer" on:click={() => goto("/organizers")}>Organizers</button>
        <button class="text-white cursor-pointer" on:click={() => goto("/prize")}>Prize</button>
        <button class="text-white cursor-pointer" on:click={() => goto("/sponsors")}>Sponsors</button>
        <button class="text-white cursor-pointer" on:click={() => goto("/faq")}>FAQ</button>
      </div>
      <!-- Mobile Menu Button (visible on mobile only) -->
       {#if open}
        <button class="text-white md:hidden h-6 w-6 absolute top-2 right-2" on:click={toggleMobileMenu}><X class="rotate-90" /></button>
      {:else}
        <button class="text-white md:hidden h-6 w-6 absolute top-2 right-2" on:click={toggleMobileMenu}><Menu /></button>
      {/if}
    </div>
  </div>

  <!-- Mobile Collapsible Menu -->
  <div class={`${open ? "block" : "hidden"} bg-gray-800/70 border-2 m-3 absolute top-10 right-4 rounded-3xl md:hidden`} id="mobile-menu">
    <div class="flex flex-col items-end gap-y-5 p-5">
      <button class="text-white cursor-pointer" on:click={() => goto("/")}>Home</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/about")}>About</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/tracks")}>Tracks</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/timeline")}>Timeline</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/organizers")}>Organizers</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/prize")}>Prize</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/sponsors")}>Sponsors</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/faq")}>FAQ</button>
      <button class="text-white cursor-pointer" on:click={() => goto("/signIn")}>Login</button>
    </div>
  </div>
</nav>

<style>
  /* Additional styling can be added here if needed */
</style>