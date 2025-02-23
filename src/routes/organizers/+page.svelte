<script lang="ts">
  import { onMount } from "svelte";
  import { Instagram } from "lucide-svelte";
  import { Linkedin } from "lucide-svelte";
  interface Orgs {
    id: number;
    name: string;
    image: string;
    description: string;
    bgImage: string;
    instagram: string;
    linkedin: string;
  }

  const orgs: Orgs[] = [
    {
      id: 1,
      name: "Kartik Goyal",
      image: "/placehoder.avif",
      description: "Chairperson",
      bgImage: "/box.svg",
      instagram: "kartikgoyal",
      linkedin: "kartikgoyal",
    },
    {
      id: 2,
      name: "Sounak Shome",
      image: "/placehoder.avif",
      description: "Vice Chairperson",
      bgImage: "/box.svg",
      instagram: "sounakshome",
      linkedin: "sounakshome",
    },
    {
      id: 3,
      name: "Sharvin Joshi",
      image: "/placehoder.avif",
      description: "WebMaster",
      bgImage: "/box.svg",
      instagram: "sharvinjoshi",
      linkedin: "sharvinjoshi",
    },
    {
      id: 4,
      name: "Dev Agarwal",
      image: "/placehoder.avif",
      description: "WebDev Lead",
      bgImage: "/box.svg",
      instagram: "devagarwal",
      linkedin: "devagarwal",
    },
    {
      id: 5,
      name: "Ashif",
      image: "/placehoder.avif",
      description: "WebDev Co-Lead",
      bgImage: "/box.svg",
      instagram: "ashif",
      linkedin: "ashif",
    },
  ];
  let isMobile = false;
  let items = [...orgs];
</script>

<div class="min-h-screen flex md:items-center md:pt-0 pt-42 justify-center p-4 w-screen site-background">
  <div class="w-full">
    <h2
      class="text-3xl md:text-5xl md:pt-32 font-extrabold font-notable text-center p-3 md:p-0 text-white"
    >
      Organizers
    </h2>

    <div
      class="flex justify-center items-center md:flex-row flex-col gap-10 px-4 min-h-[300px] md:min-h-[500px]"
    >
      {#each items as person, i (person.id)}
        <div
        >
          <div
            class="w-50 group md:w-56 md:hover:scale-125 md:transition-transform md:duration-300"
          >

            <div
              class="bg-[#1a1a3d] rounded-2xl p-4 md:p-6 flex flex-col items-center space-y-3 md:space-y-5 shadow-2xl border border-[#2a2a5f] sponsor-box"
              style="background-image: url({person.bgImage}); background-size: cover; background-position: center;"
            >
              <div
                class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#e44bdf] overflow-hidden shadow-lg"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div
                class="text-center backdrop-blur-sm bg-black/40 p-2 rounded-lg"
              >
                <h3 class="text-lg md:text-xl font-bold text-[#e44bdf] mb-2">
                  {person.name}
                </h3>
                <p class="text-xs md:text-sm text-gray-300 opacity-75">
                  {person.description}
                </p>
              </div>
              <div class="text-white flex gap-2">
                  <button on:click={() => window.open(person.instagram)}>
                    <Instagram  />
                    </button>
                    <button on:click={() => window.open(person.linkedin)}>
                      <Linkedin  />
                  </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .site-background {
    background-image: url("/organizers.gif");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  @media (max-width: 767px) {
    :global(body) {
      overflow-x: hidden;
    }
  }
</style>
