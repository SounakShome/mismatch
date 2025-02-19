<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  let text = "Verifying your email...";
  if (page.data.body.error) {
    text = page.data.error + " Please try again.";
  } else if (page.data.body.success) {
    text = "Verification Complete.";
  }
</script>

<main>
  <h1>{text}</h1>
  {#if page.data.body.success}
    <button on:click={() => goto("/signIn")}>Login</button>
  {/if}
</main>
