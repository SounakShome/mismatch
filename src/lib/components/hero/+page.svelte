<script>
  import { onMount } from "svelte";
  import BackgroundParticles from "./BackgroundParticles.svelte";
  import hack_logo from "$lib/assets/public/hackathon_logo_trans.png"
  import ras from "$lib/assets/public/logo.png"

  let countdown = { days: 66, hours: 21, minutes: 17 };

  function updateCountdown() {
    const endDate = new Date("2025-04-16").getTime();
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
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&family=Rubik+Glitch&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
  <!-- <BackgroundParticles /> -->

  <div class="content flex flex-col items-center text-center space-y-4">
    <h1 class="font-rubik-glitch text-2xl font-light">Presents</h1>
    <img
      src={hack_logo}
      alt="Hackathon Logo"
      class="hackathon-logo max-w-xs sm:max-w-sm"
    />
    <h2 class="font-rubik-glitch text-xl font-light">Registrations Starts Soon!!!</h2>
    <!-- <div class="countdown text-5xl font-light">
      {countdown.days}d : {countdown.hours}h : {countdown.minutes}m
    </div> -->
  </div>
</main>

<style>
  @media (max-width: 768px) {
    .hackathon-logo {
      max-width: 300px;
    }

    h1 {
      font-size: 1.8rem;
      margin-top: 8rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    .content {
      padding-top: 5%;
    }
  }

  @media (max-width: 480px) {
    .hackathon-logo {
      max-width: 200px;
    }

    h1 {
      font-size: 1.5rem;
      margin-top: 8rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .content {
      padding-top: 10%;
    }
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
    max-width: 400px; /* Reduced from 400px */
  }

  h1 {
    font-family: "Rubik Glitch", cursive;
    font-size: 2.3rem; /* Reduced from 2.5rem */
    margin: 0;
    padding: 0;
  }

  h2 {
    font-family: "Rubik Glitch", cursive;
    font-size: 2.3rem; /* Reduced from 2.5rem */
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
    padding-top: 2%; /* Add padding from the top to position the content higher */
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
