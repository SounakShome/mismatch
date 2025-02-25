<script lang="ts">
  import { onMount } from "svelte";
  let prizeAmount = 0;
  const targetAmount = 10000;
  let mouseX = 0;
  let mouseY = 0;
  let coins: {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    speedX: number;
    speedY: number;
  }[] = [];
  let coinId = 0;
  let container: HTMLDivElement;

  // Track mouse position
  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    createCoins(mouseX, mouseY);
  }

  // Create coins at cursor position
  function createCoins(x: number, y: number) {
    // Only create coins occasionally to avoid too many elements
    if (Math.random() > 0.1) return;

    // Create 2-5 coins per splash
    const count = Math.floor(Math.random() * 4) + 2;

    for (let i = 0; i < count; i++) {
      const coin = {
        id: coinId++,
        x,
        y,
        rotation: Math.random() * 360,
        scale: 0.2 + Math.random() * 0.3,
        speedX: (Math.random() - 0.5) * 10,
        speedY: (Math.random() - 0.5) * 10 - 5, // Mostly upward initial velocity
      };

      coins = [...coins, coin];

      // Remove coin after animation completes
      setTimeout(() => {
        coins = coins.filter((c) => c.id !== coin.id);
      }, 1000);
    }
  }

  // Animate coins
  function animateCoins() {
    coins = coins.map((coin) => {
      // Apply gravity
      coin.speedY += 0.2;

      // Update position
      coin.x += coin.speedX;
      coin.y += coin.speedY;

      // Update rotation
      coin.rotation += coin.speedX * 2;

      return coin;
    });

    requestAnimationFrame(animateCoins);
  }

  onMount(() => {
    let step = Math.ceil(targetAmount / 50);
    let interval = setInterval(() => {
      prizeAmount += step;
      if (prizeAmount >= targetAmount) {
        prizeAmount = targetAmount;
        clearInterval(interval);
      }
    }, 30);

    // Start coin animation loop
    animateCoins();

    return () => {
      clearInterval(interval);
    };
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="confetti bg-[url('/try.gif')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center"
  on:mousemove={handleMouseMove}
  bind:this={container}
>
  <!-- Coin splash elements -->
  {#each coins as coin (coin.id)}
    <img
      src="/coinsplash.png"
      class="absolute pointer-events-none z-10 "
      alt="coins"
      style="
        left: {coin.x}px;
        top: {coin.y}px;
        transform: translate(-50%, -50%) rotate({coin.rotation}deg) scale({coin.scale * 0.3});
        opacity: {1 - (coins.indexOf(coin) / coins.length) * 0.3};
      "
    />
  {/each}

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

  img {
    transition: opacity 0.8s ease-out;
  }
</style>
