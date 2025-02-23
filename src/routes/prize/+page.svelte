<script lang="ts">
  import { onMount } from "svelte";
  let prizeAmount = 0;
  const targetAmount = 10000;

  onMount(() => {
    let step = Math.ceil(targetAmount / 50);
    let interval = setInterval(() => {
      prizeAmount += step;
      if (prizeAmount >= targetAmount) {
        prizeAmount = targetAmount;
        clearInterval(interval);
      }
    }, 30);
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<div
  class="confetti bg-[url('/try.gif')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center"
>
  <div class="w-full max-w-3xl">
    <div class="">
      <h2 class="font-notable mb-6 text-center text-5xl text-white">
        Prize Pool
      </h2>
      <div
        class="relative flex flex-col md:flex-row md:gap-4 items-center justify-center"
      >
        <img
          src="/coins.png"
          class="w-20 md:w-27 text-purple-500 mb-4 md:mb-0"
          alt="controller"
        />
        <p
          class="arcade-text text-center text-4xl md:text-5xl lg:text-7xl text-[#fffb14]"
        >
          {prizeAmount.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.arcade-text) {
    font-family: "Press Start 2P", cursive;
    text-shadow: 0 0 10px;
  }
</style>
