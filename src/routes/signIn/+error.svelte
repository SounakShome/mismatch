<script context="module" lang="ts">
    export function load({ error }: { error: Error }) {
        return {
            props: {
                error: error.message || 'An unknown error occurred'
            }
        };
    }
</script>

<script>
    export let error;
</script>

<style>
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        color: #ff0000;
    }
    .error-message {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    .home-link {
        font-size: 1rem;
        color: #0070f3;
        text-decoration: none;
    }
</style>

<div class="error-container">
    <h1 class="error-message">Error: {error}</h1>
    <a class="home-link" href="/">Go back to Home</a>
</div>