<script>
    import { page } from '$app/state';
    import { goto } from '$app/navigation';

    let username="";
    let password="";
    let confirmPassword="";
    let email="";

    async function handleSubmit() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        await fetch(`${page.url.origin}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <div class="mb-4">
        <label for="username" class="block text-gray-700 font-bold mb-2">Username:</label>
        <input type="text" id="username" bind:value={username} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
        <input type="email" id="email" bind:value={email} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
        <label for="password" class="block text-gray-700 font-bold mb-2">Password:</label>
        <input type="password" id="password" bind:value={password} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
        <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm Password:</label>
        <input type="password" id="confirmPassword" bind:value={confirmPassword} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Register
    </button>
</form>
