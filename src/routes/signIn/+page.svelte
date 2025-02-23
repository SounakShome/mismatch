<script lang="ts">
  import { page } from "$app/state";
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let email = "";
  let password = "";
  let error = "";

  const signin = () => {
    const res = signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
      redirectUrl: "/",
    });
    console.log(res);
  };
  onMount(() => {
    if (page.data.session) {
      goto("/");
    }
    if (page.data.error) {
      error = page.data.error;
    }
  });
</script>

<nav>
  <h1>You are not logged in sign in</h1>
  <form on:submit|preventDefault={() => signin()}>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={email} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <button type="submit">Sign In</button>
  </form>
  {#if error}
    <p>{error}</p>
  {/if}
</nav>
