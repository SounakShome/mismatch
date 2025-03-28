<script lang="ts">
  import Hero from "$lib/components/hero/+page.svelte";
  import Background from "$lib/components/hero/BackgroundParticles.svelte";

</script>

<Background />
<div class={`overflow-x-hidden`}>
  <Hero />
</div>

<style>
  @reference "tailwindcss/theme";
</style>
