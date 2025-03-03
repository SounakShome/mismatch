<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ras from "$lib/assets/public/logo.png";

  function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
      mobileMenu.classList.toggle("hidden");
    }
  }
</script>

<nav class={`${page.url.pathname !== "/timeline" ? "absolute" : "relative"} font-press z-50 top-0 left-0 w-full`}>
  <!-- Main container -->
  <div class="container mx-auto px-4 justify-center flex gap-x-5 items-center bg-black/25 ">
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
        
      <svg on:click={toggleMobileMenu} on:keydown={(e) => e.key === 'Enter' && toggleMobileMenu()} tabindex="0" role="button" aria-label="Toggle mobile menu" xmlns="http://www.w3.org/2000/svg" class="md:hidden h-6 w-6 absolute top-2 right-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </div>
  </div>

  <!-- Mobile Collapsible Menu -->
  <div id="mobile-menu" class="hidden absolute top-10 right-4 bg-gray-800 p-4 rounded-lg md:hidden">
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50 " on:click={toggleMobileMenu}>Close Menu</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/")}>Home</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/about")}>About</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/timeline")}>TimeLine</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/tracks")}>Tracks</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/organizers")}>Organizers</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/prize")}>Prize</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/sponsors")}>Sponsors</button>
    <button class="text-white block w-full text-left p-2 cursor-pointer hover:text-white/50" on:click={() => goto("/faq")}>FAQ</button>
  </div>
</nav>

<style>
  /* Additional styling can be added here if needed */
</style>