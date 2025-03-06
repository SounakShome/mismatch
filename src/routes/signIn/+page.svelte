<script lang="ts">
  import { page } from "$app/state";
  import { signIn } from "@auth/sveltekit/client";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let email = "";
  let password = "";
  let error = "";
  let loading = false;

  const signin = () => {
    loading = true;
    const res = signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectUrl: "/dashboard",
    });
  };
  onMount(() => {
    if (page.data.session) {
      goto("/dashboard");
    }
    if (page.data.error) {
      error = page.data.error;
    }
  });
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-purple-600">
  <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6">Sign In</h2>
    {#if error}
      <div class="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
    {/if}
    <form on:submit|preventDefault={signin} class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {#if loading}
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        {/if}
        Sign In
      </button>
    </form>
  </div>
</div>
