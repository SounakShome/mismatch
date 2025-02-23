<script lang="ts">
  import { goto } from "$app/navigation";
    import { page } from "$app/state";
    const reg = page.data.data.reg;
    const name = page.data.data.name;

</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
    }
    .buttons {
        margin-top: 20px;
    }
    button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
</style>

<div class="container">
    <h1>{name}</h1>
    <p>Registration: {reg}</p>
    <div class="buttons">
        <button on:click="{() => alert('Approved')}">Approve</button>
        <button on:click="{() => goto(`/qread`)}">Scan Another QR</button>
    </div>
</div>