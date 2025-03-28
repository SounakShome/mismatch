<script>
  import { onMount } from "svelte";
  import BackgroundParticles from "./BackgroundParticles.svelte";
  import { X } from "lucide-svelte";

  let countdown = { days: 66, hours: 21, minutes: 17 };
  let popup = false;
  function updateCountdown() {
    const endDate = new Date("2025-03-31").getTime();
    const now = new Date().getTime();
    const timeLeft = Math.max(0, endDate - now);

    if (timeLeft > 0) {
      countdown = {
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      };
    }
  }

  onMount(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&family=Rubik+Glitch&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<BackgroundParticles />
<main
  class="relative font-rGlitch md:pt-20 pb-0 bg-black text-white flex flex-col items-center lg:justify-center"
>
  <div class="content flex flex-col items-center text-center">
    <h1 class="md:text-5xl text-3xl">Presents</h1>
    <img
      src="/logo.png"
      alt="Hackathon Logo"
      class="hackathon-logo"
    />
    <button class="md:text-3xl text-3xl" on:click={() => (popup = true)}>
      <svg
        height="30"
        width="30"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          fill="currentColor"
        ></path>
      </svg>
      <span>Register Now!</span>
    </button>

    <h2 class="text-sm md:text-5xl md:block">March 31 - April 1, 2025</h2>
    <div class="countdown md:text-5xl text-4xl">
      {countdown.days}d : {countdown.hours}h : {countdown.minutes}m
    </div>
  </div>
</main>

{#if popup}
  <div
    class="fixed inset-0 z-50 backdrop-blur-lg flex items-center justify-center"
  >
    <div class="border-2 border-white p-8 rounded-lg relative max-w-3xl w-full">
      <button
        class="absolute top-4 right-4 text-gray-700 "
        on:click={() => (popup = false)}
      >
        <X size={24} />
      </button>
      <h2 class="text-2xl mb-6 text-white text-center">Choose Your Team Size</h2>

      <div class="grid md:grid-cols-3 gap-6 mt-6">
        <!-- Solo Card -->
         <a href="https://www.vitchennaievents.com/conf1/index.php?eventid=2713">
        <div
          class="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-indigo-200"
        >
          <h3 class="text-xl font-bold text-indigo-700 mb-2">Solo</h3>
          <div class="text-3xl text-black font-bold mb-4">₹100</div>
        </div>
        </a>

        <!-- Duo Card -->
         <a href="https://www.vitchennaievents.com/conf1/index.php?eventid=2714">
        <div
          class="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-blue-200 transform scale-105"
        >
          <h3 class="text-xl font-bold text-blue-700 mb-2">Duo</h3>
          <div class="text-3xl text-black font-bold mb-4">₹190</div>
        </div>
        </a>

        <!-- Trio Card -->
          <a href="https://www.vitchennaievents.com/conf1/index.php?eventid=2715">
        <div
          class="bg-gradient-to-br from-violet-50 to-fuchsia-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-violet-200"
        >
          <h3 class="text-xl font-bold text-violet-700 mb-2">Trio</h3>
            <div class="text-3xl text-black font-bold mb-4">₹280</div>
        </div>
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  @media (max-width: 768px) {
    .hackathon-logo {
      width: 500px;
    }

    h1 {
      font-size: 1.8rem;
      margin-top: 8rem;
    }

    h2 {
      font-size: 1.8rem;
    }

  }

  @media (max-width: 480px) {
    .hackathon-logo {
      width: 400px;
    }

    h1 {
      margin-top: 8rem;
    }

  }

  button {
    display: flex;
    align-items: center;
    font-family: inherit;
    cursor: pointer;
    padding: 0.8em 1.3em 0.8em 0.9em;
    background: transparent;
    border: none;
    letter-spacing: 0.05em;
    border-radius: 16px;
  }

  button svg {
    margin-right: 3px;
    transform: rotate(30deg);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  button span {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  button:hover svg {
    transform: translateX(5px) rotate(90deg);
  }

  button:hover span {
    transform: translateX(7px);
  }

  main {
    min-height: 100vh;
    max-height: 100vh;
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(
        circle at bottom right,
        rgba(255, 0, 255, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at top left,
        rgba(71, 5, 176, 0.3) 0%,
        transparent 50%
      ); /* Added indigo glow */
    background-size:
      50px 50px,
      50px 50px,
      100% 100%,
      100% 100%; /* Size for all backgrounds */
    background-color: #000000;
    background-position:
      0 0,
      0 0,
      0 0,
      0 0; /* Position for all backgrounds */
    background-repeat: repeat, repeat, no-repeat, no-repeat; /* Grid repeats, but glows don't */
    position: relative; /* Add this line */
  }

  .hackathon-logo {
    width: 300px; /* Reduced from 400px */
  }

  h1 {
    font-family: "Rubik Glitch", cursive;
    margin: 0;
    padding: 0;
  }

  h2 {
    font-family: "Rubik Glitch", cursive;
    margin: 0;
    padding: 0;
  }

  .content {
    animation: glitch 4s infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    justify-content: center; /* Changed from center to flex-start */
    min-height: calc(100vh - 80px);
    text-align: center;
    gap: 1rem;
  }
  /* .countdown {
    font-family: "Rubik Glitch", cursive;
    font-size: 5.5rem;
    color: #ffffff; 
    font-weight: 200;
  } */

  @keyframes glitch {
    0% {
      filter: none;
    }
    92% {
      filter: none;
    }
    92.5% {
      filter: invert(0.1) hue-rotate(180deg);
      transform: translate(2px, 1px);
    }
    93% {
      filter: none;
      transform: none;
    }
    93.5% {
      filter: saturate(200%) brightness(150%);
      transform: translate(-2px, -1px);
    }
    94% {
      filter: none;
      transform: none;
    }
    94.5% {
      filter: hue-rotate(-90deg) contrast(150%);
      transform: translate(1px, -1px);
    }
    95% {
      filter: none;
      transform: none;
    }
    95.5% {
      filter: brightness(120%) contrast(150%);
      transform: translate(-1px, 1px) scale(1.01);
    }
    96% {
      filter: none;
      transform: none;
    }
  }
</style>
