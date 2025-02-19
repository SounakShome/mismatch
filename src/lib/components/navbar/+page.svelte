<script lang="ts">
  import { page } from "$app/state"
  import { signOut } from "@auth/sveltekit/client";
  import { goto } from "$app/navigation";
</script>

{#if !page.data.token}
    <span class="font-rGlitch">landing page goes here</span>
    <button class="border-2 m-10 p-5" on:click={() => goto("/signIn")}>Login</button>
  {:else}
    <p>Hello {page.data.name?.name}</p>
    this is home route
    <button on:click={() => {
      signOut({ callbackUrl: "/signOut" });
    }}>Log out</button>
  {/if}

  <div> Navbar </div>