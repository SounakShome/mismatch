<!-- <script lang="ts">
    import { onMount } from 'svelte';
    interface Sponsor {
      id: number;
      name: string;
      image: string;
      description: string;
    }
  
    const sponsors: Sponsor[] = [
      { 
        id: 1, 
        name: 'TechInnovate', 
        image: '/placeholder.svg',
        description: 'Pioneering digital transformation'
      },
      { 
        id: 2, 
        name: 'GlobalReach', 
        image: '/placeholder.svg',
        description: 'Connecting businesses worldwide'
      },
      { 
        id: 3, 
        name: 'FutureNow', 
        image: '/placeholder.svg',
        description: 'Driving innovation forward'
      },
      { 
        id: 4, 
        name: 'EcoSphere', 
        image: '/placeholder.svg',
        description: 'Sustainable solutions for tomorrow'
      },
      { 
        id: 5, 
        name: 'DataDynamics', 
        image: '/placeholder.svg',
        description: 'Transforming data into insights'
      }
    ];
  
    let currentIndex = 2;
    let items = [...sponsors];
    let isMobile = false;
  
    function updateCarousel() {
      items = [
        ...sponsors.slice(currentIndex - 2),
        ...sponsors.slice(0, currentIndex - 2)
      ];
    }
  
    function next() {
      currentIndex = (currentIndex + 1) % sponsors.length;
      updateCarousel();
    }
  
    function prev() {
      currentIndex = (currentIndex - 1 + sponsors.length) % sponsors.length;
      updateCarousel();
    }
  
    onMount(() => {
      // Check screen size and adjust layout
      const checkMobile = () => {
        isMobile = window.innerWidth < 768;
        updateCarousel();
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    });
  </script>

  <div class="min-h-screen bg-gradient-to-br from-[#0a0a2f] to-[#1a1a4f] flex items-center justify-center p-4">
    <div class="max-w-5xl w-full">
      <h2 class="text-3xl md:text-5xl font-extrabold text-center mb-8 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#e44bdf] to-[#7d3fe3]">
        Organizers
      </h2>

      <div class="relative flex justify-center items-center gap-2 md:gap-6 px-4 h-[300px] md:h-[400px]">
        {#each items as sponsor, i (sponsor.id)}
          <div 
            class="absolute transform transition-all duration-700 ease-in-out"
            style="
              transform: 
                translateX({
                  isMobile 
                    ? (i - Math.floor(items.length / 2)) * 120 
                    : (i - 2) * 280
                }px) 
                scale({
                  isMobile 
                    ? (i === Math.floor(items.length / 2) ? 1 : 0.7)
                    : (i === 2 ? 1.25 : 0.75)
                });
              z-index: {
                isMobile 
                  ? (i === Math.floor(items.length / 2) ? 10 : 0)
                  : (i === 2 ? 10 : 0)
              };
              opacity: {
                isMobile 
                  ? Math.max(0.4, 1 - Math.abs(i - Math.floor(items.length / 2)) * 0.3)
                  : Math.max(0.4, 1 - Math.abs(i - 2) * 0.3)
              };
            "
          >
            <div class="relative group w-40 md:w-56 hover:scale-105 transition-transform duration-300">
              <div class="absolute -inset-1 bg-gradient-to-r from-[#e44bdf] to-[#7d3fe3] rounded-2xl opacity-60 group-hover:opacity-80 blur-xl transition-all duration-300"></div>

              <div class="relative bg-[#1a1a3d] rounded-2xl p-4 md:p-6 flex flex-col items-center space-y-3 md:space-y-5 shadow-2xl border border-[#2a2a5f]">
                <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#e44bdf] overflow-hidden shadow-lg">
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <div class="text-center">
                  <h3 class="text-lg md:text-xl font-bold text-[#e44bdf] mb-2">{sponsor.name}</h3>
                  <p class="text-xs md:text-sm text-gray-300 opacity-75">{sponsor.description}</p>
                </div>

                <button class="
                  px-3 py-1 md:px-5 md:py-2 
                  bg-gradient-to-r from-[#e44bdf] to-[#7d3fe3] 
                  text-white 
                  rounded-full 
                  text-xs md:text-sm 
                  hover:scale-105 
                  transition-all 
                  duration-300 
                  shadow-md 
                  hover:shadow-xl
                ">
                  Explore Partner
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="flex justify-center mt-8 md:mt-12 gap-4 md:gap-6">
        <button 
          class="
            p-2 md:p-3 rounded-full 
            bg-gradient-to-r from-[#e44bdf] to-[#7d3fe3] 
            text-white 
            hover:scale-110 
            transition-transform 
            duration-300 
            shadow-md 
            hover:shadow-xl
          "
          on:click={prev}
        >
          ← Previous
        </button>
        <button 
          class="
            p-2 md:p-3 rounded-full 
            bg-gradient-to-r from-[#e44bdf] to-[#7d3fe3] 
            text-white 
            hover:scale-110 
            transition-transform 
            duration-300 
            shadow-md 
            hover:shadow-xl
          "
          on:click={next}
        >
          Next →
        </button>
      </div>
    </div>
  </div>
<style>
  @media (max-width: 767px) {
    :global(body) {
      overflow-x: hidden;
    }
  }
</style> -->

<script lang="ts">
  import { page } from "$app/state";
</script>

<div>
  <h1>Organizers</h1>
  <p>Organizers content goes here</p>
</div>