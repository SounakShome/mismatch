<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { page } from "$app/state";
  export let timelineData = [
    {
      day: "Day One",
      image: "/day_1.png",
      events: [
        { time: "10:00 AM", title: "Opening Ceremony" },
        { time: "1:00 PM", title: "Lunch Break" },
        { time: "2:30 PM", title: "Workshop 1" },
        { time: "4:00 PM", title: "Networking" },
      ],
    },
    {
      day: "Day Two",
      image: "/day_2.png",
      events: [
        { time: "10:00 AM", title: "Keynote Speech" },
        { time: "2:00 PM", title: "Lunch Break" },
        { time: "3:30 PM", title: "Workshop 2" },
        { time: "5:00 PM", title: "Closing Ceremony" },
      ],
    },
  ];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:ital,wght@0,200..800;1,200..800&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Notable&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- Fullscreen background -->
<div
  class="background fixed inset-0 z-[-1] bg-cover bg-center"
  style="background-image: url('/metro.gif')"
></div>

<div class="content relative h-screen overflow-auto px-4 py-6">
  <header class="flex md:h-96 h-48 justify-center items-center mb-8">
    <h1
      class="heading text-[48px] items-center md:text-[96px] font-bold text-purple-100"
    >
      TIMELINE
    </h1>
  </header>

  <div class="flex flex-col md:flex-row gap-4">
    {#each timelineData as day, dayIndex}
      <section
        class="day-section border border-white rounded-3xl bg-gray-700/70 m-4 p-6 flex flex-col items-center"
        in:fade={{ delay: dayIndex * 300, duration: 500 }}
      >
        <div class="day-image md:w-1/3 w-full mb-4 md:mb-0">
          <img
            src={day.image}
            alt={day.day}
            class="w-full h-auto object-cover rounded-2xl"
          />
        </div>
        <div class="day-content md:w-2/3 w-full flex flex-col">
          <div class="events space-y-4">
            {#each day.events as event, index}
              <div
                class="event flex items-center bg-violet-400 rounded-2xl p-4 shadow-lg hover:bg-violet-300 transition-colors"
                in:fly={{
                  y: 50,
                  delay: dayIndex * 300 + index * 200,
                  duration: 400,
                }}
              >
                <div
                  class="event-icon w-12 h-12 rounded-full bg-purple-200 flex-shrink-0 mr-4 animate-pulse"
                >
                  <div
                    class="h-full w-full rounded-full border-4 border-purple-600 flex items-center justify-center"
                  >
                    {index + 1}
                  </div>
                </div>
                <div class="event-info">
                  <p class="time text-lg font-mono text-stone-800">
                    {event.time}
                  </p>
                  <p class="title text-xl text-stone-900">{event.title}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/each}
  </div>
</div>

<style>
  /* .background {
    }
    
    .content {
    } */

  .heading {
    font-family: "Notable", sans-serif;
    color: rgba(247, 221, 255, 1);
  }

  .time {
    font-family: "Atkinson Hyperlegible Mono", monospace;
  }

  .title {
    font-family: "Notable", sans-serif;
    color: rgba(247, 221, 255, 1);
  }
</style>
