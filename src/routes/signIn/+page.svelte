<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import sign from "$lib/sign";

  let email = "";
  let password = "";
  let loading = false;
  let rememberMe = false;
  let error = "";
  console.log(page.data);
  const signin = async () => {
    loading = true;
    try {
      const res = await sign(email, password)
      error = "Sign-in attempt completed";
    } catch (err) {
      console.error(err);
      error = "Failed to sign in. Please check your credentials.";
    } finally {
      loading = false;
    }
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

<svelte:head>
  <title>Sign In</title>
</svelte:head>

<div class="login-container">
  <div class="card" in:scale={{ duration: 700, easing: cubicOut }}>
    <div
      class="form-container"
      in:fly={{ y: 20, duration: 400, delay: 300 }}
      out:fade
    >
      <h1>Sign in to your account</h1>
      <p>Enter your credentials to access your account</p>

      <form>
        {#if error}
          <div class="alert alert-error">{error}</div>
        {/if}
        <div class="input-group">
          <label for="email">Email address</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            placeholder="john@example.com"
            required
            disabled={loading}
          />
        </div>

        <div class="input-group">
          <div class="password-label">
            <label for="password">Password</label>
            <a href="/forgot-password" class="forgot-link">Forgot password?</a>
          </div>
          <input
            id="password"
            type="password"
            bind:value={password}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>
        <button type="button" on:click={signin} disabled={loading}>
          {#if loading}
            <div class="loader"></div>
            <span>Signing in...</span>
          {:else}
            <span>Sign In</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"
              />
            </svg>
          {/if}
        </button>
      </form>

      <div class="signup-prompt">
        <span>Don't have an account?</span>
        <a href="/register">Create account</a>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    font-family: "Inter", sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
    color: #e2e8f0;
  }

  .login-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 2rem;
    margin-top: 2rem;
  }

  .card {
    background: #1e293b;
    padding: 2.5rem;
    border-radius: 1.5rem;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -2px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid #334155;
  }

  .form-container {
    flex: 1;
  }

  h1 {
    font-size: 1.5rem;
    color: #c4b5fd;
    margin: 0 0 0.5rem;
    font-weight: 600;
  }

  p {
    color: #94a3b8;
    margin: 0 0 2rem;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  .password-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .forgot-link {
    font-size: 0.875rem;
    color: #a78bfa;
    text-decoration: none;
    transition: color 0.2s;
  }

  .forgot-link:hover {
    color: #c4b5fd;
  }

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #c4b5fd;
  }

  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #334155;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    transition: all 0.2s;
    background: #0f172a;
    color: #e2e8f0;
  }

  input:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
  }

  input::placeholder {
    color: #64748b;
  }

  button {
    width: 100%;
    padding: 0.875rem;
    background: #7c3aed;
    color: #f8fafc;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  button:hover {
    background: #6d28d9;
    transform: translateY(-1px);
  }

  button:disabled {
    background: #334155;
    color: #64748b;
    cursor: not-allowed;
    transform: none;
  }

  .loader {
    width: 18px;
    height: 18px;
    border: 2px solid #f8fafc;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .signup-prompt {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.95rem;
  }

  .signup-prompt span {
    color: #94a3b8;
  }

  .signup-prompt a {
    color: #a78bfa;
    text-decoration: none;
    margin-left: 0.5rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .signup-prompt a:hover {
    color: #c4b5fd;
  }

  @media (max-width: 480px) {
    .login-container {
      padding: 1rem;
    }

    .card {
      padding: 1.5rem;
      border-radius: 1rem;
    }
  }
</style>
