<script lang="ts">
    import { page } from "$app/state"
    export let timelineData = [
        {
            day: "Day One",
            events: [
                { time: "10:00 AM", title: "Opening Ceremony" },
                { time: "1:00 PM", title: "Lunch Break" },
                { time: "2:30 PM", title: "Workshop 1" },
                { time: "4:00 PM", title: "Networking" },
            ],
        },
        {
            day: "Day Two",
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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Notable&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</svelte:head>

<style>
    .heading{
        font-family: "Notable", regular;
        color: rgba(247, 221, 255, 1);
    }

    .text{
        font-family: "Notable", serif;
    }

    .time{
        font-family: "Atkinson Hyperlegible Mono", serif;
    }
</style>

<div class="relative w-full">
<div class="bg-purple-300 h-auto absolute opacity-30 z-10 inset-0"></div>
<div class="w-full h-80 absolute flex flex-row justify-center items-center">
    <p class="heading md:text-[96px] max-sm:text-[48px]">TIMELINE</p>
</div>
<img src="/metro.gif" class="w-full h-80" alt="animated metro">
<div class="bg-linear-to-b min-h-screen from-violet-900 to-black z-10">
    <div class="flex p-5 pb-0 justify-around z-10">
        <img src="/day_1.png" class=" md:w-1/4 md:h-1/3  max-sm:w-1/3 max-sm:h-1/2" alt="day one">
        <img src="/day_2.png" class=" md:w-1/4 md:h-1/3 max-sm:w-1/3 max-sm:h-1/2" alt="day two">
    </div>
    <div class="flex w-full absolute my-30 opacity-80 z-0 justify-center">
        <img src="/arcade.png" class="md:w-1/4 md:h-1/2 max-sm:h-1/5 max-sm:w-1/2" alt="arcade">
    </div>
    <div class="flex p-5 justify-between z-20 max-sm:gap-10 gap-15">
        {#each timelineData as dayData}
            <div class="min-h-screen md:w-1/2 max-sm:w-1/2 z-20 flex flex-col flex-shrink-0">
            {#each dayData.events as event, i}
                <div class="ml-7 w-12 h-20 max-sm:w-12 max-sm:h-15 rounded-full bg-purple-200"></div>
                <div class="h-12 max-sm:h-3 relative left-12 w-1 bg-gray-100"></div>
                {#if i%2!=0}
                    <div class= "shadow-xl shadow-stone-300/50 h-1/4 rounded-2xl hover:inset-shadow-sm hover:bg-violet-300 hover:inset-shadow-violet-600 w-6/7 max-sm:h-1/5 bg-violet-400">
                        <div class="m-5">
                            <p class="time text-xl max-sm:text-xs">{event.time}</p>
                            <br />
                            <p class="text text-3xl max-sm:text-xl text-stone-200">{event.title}</p>
                        </div>
                    </div>
                {:else}
                    <div class= "shadow-xl shadow-neutral-300/50 hover:inset-shadow-sm hover:inset-shadow-purple-600 h-1/4 hover:bg-purple-200 rounded-2xl w-6/7 max-sm:h-1/5 bg-purple-300">
                        <div class="m-5">
                            <p class="time text-xl max-sm:text-xs">{event.time}</p>
                            <br />
                            <p class="text text-3xl max-sm:text-xl text-slate-100">{event.title}</p>
                        </div>
                    </div>
                {/if}
                {#if i!=dayData.events.length-1}
                    <div class="h-12 max-sm:h-3 relative left-12 w-1 bg-gray-100"></div>
                {/if}
            {/each}
            </div>
        {/each}
    </div>
    
</div>
</div>