<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';

    onMount(() => {
        if (!page.data.session) {
            goto('/signIn');
            return;
        }
        setTimeout(() => {
            goto('/');
        }, 2000);
    });
</script>

<main>
    <h1>Signing out...</h1>
    <p>You will be redirected to the home page in few seconds.</p>
</main>