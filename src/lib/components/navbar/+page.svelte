<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ras from "$lib/assets/public/logo.png";
  import { Menu, X } from "lucide-svelte";
  import { fade } from "svelte/transition";

  let open = false;

  function toggleMobileMenu() {
    open = !open;
  }
</script>

<nav
  class={`fixed flex items-center md:text-sm font-press z-50 top-0 left-0 w-full`}
>
  <!-- Background Blur Div -->
  <div class="absolute inset-0 w-screen bg-gradient-to-b from-black via-black/70 to-trasparent z-[-1]"></div>

  <!-- Main container -->
  <div
    class="container mx-auto px-4 bg-transparent justify-center flex lg:gap-x-5 gap-x-2 items-center"
  >
    <!-- Desktop Left Nav (hidden on mobile) -->
    <div class="hidden md:flex lg:gap-x-10 gap-x-5">
      <button class="text-white cursor-pointer" on:click={() => goto("/")}
        >Home</button
      >
      <button class="text-white cursor-pointer" on:click={() => goto("/about")}
        >About</button
      >
      <button class="text-white cursor-pointer" on:click={() => goto("/tracks")}
        >Tracks</button
      >
      <button
        class="text-white cursor-pointer"
        on:click={() => goto("/timeline")}>Timeline</button
      >
    </div>

    <!-- Center: Logo -->
    <img src={ras} alt="RAS Logo" class="md:h-20 h-32 lg:h-32 cursor-pointer" />

    <!-- Right side: Desktop Right Nav and Mobile Menu Button -->
    <div class="flex items-center gap-x-4">
      <!-- Desktop Right Nav (hidden on mobile) -->
      <div class="hidden md:flex lg:gap-x-10 gap-x-5">
        <button
          class="text-white cursor-pointer"
          on:click={() => goto("/organizers")}>Organizers</button
        >
        <button
          class="text-white cursor-pointer"
          on:click={() => goto("/prize")}>Prize</button
        >
        <button
          class="text-white cursor-pointer"
          on:click={() => goto("/sponsors")}>Sponsors</button
        >
        <button class="text-white cursor-pointer" on:click={() => goto("/faq")}
          >FAQ</button
        >
      </div>
      <!-- Mobile Menu Button (visible on mobile only) -->
      {#if open}
        <button
          class="text-white md:hidden h-6 w-6 absolute z-50 top-2 right-2"
          on:click={toggleMobileMenu}><X /></button
        >
      {:else}
        <button
          class="text-white md:hidden h-6 w-6 absolute z-50 top-2 right-2"
          on:click={toggleMobileMenu}><Menu /></button
        >
      {/if}
    </div>
  </div>

  <!-- Mobile Collapsible Menu -->
  <div
    class={`sticky inset-0 z-40 w-full h-full bg-black/90 md:hidden overflow-auto flex flex-col justify-center items-center`}
    id="mobile-menu"
    transition:fade={{ duration: 200 }}
    class:hidden={!open}
  >
    <div class="flex flex-col items-center gap-y-5 p-5">
      <button class="text-white cursor-pointer" on:click={() => {goto("/"); toggleMobileMenu()}}
        >Home</button
      >
      <button class="text-white cursor-pointer" on:click={() => {goto("/about"); toggleMobileMenu()}}
        >About</button
      >
      <button class="text-white cursor-pointer" on:click={() => {goto("/tracks"); toggleMobileMenu()}}
        >Tracks</button
      >
      <button
        class="text-white cursor-pointer"
        on:click={() => {goto("/timeline"); toggleMobileMenu()}}>Timeline</button
      >
      <button
        class="text-white cursor-pointer"
        on:click={() => {goto("/organizers"); toggleMobileMenu()}}>Organizers</button
      >
      <button class="text-white cursor-pointer" on:click={() => {goto("/prize"); toggleMobileMenu()}}
        >Prize</button
      >
      <button
        class="text-white cursor-pointer"
        on:click={() => {goto("/sponsors"); toggleMobileMenu()}}>Sponsors</button
      >
      <button class="text-white cursor-pointer" on:click={() => {goto("/faq"); toggleMobileMenu()}}
        >FAQ</button
      >
      <!-- <button class="text-white cursor-pointer" on:click={() => goto("/signIn")}
        >Login</button
      > -->
    </div>
  </div>
</nav>

<style>
  /* Additional styling can be added here if needed */
  
</style>