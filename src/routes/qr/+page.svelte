<script lang="ts">
    import QrCode from "$lib/scripts/qrcode";
    import type { PageData } from './$types';
    import { page } from '$app/state';
    let matrix = QrCode.generate(page.data.token);
    let uri = QrCode.render("svg-uri", matrix);
</script>

<img src={uri} alt="" class="m-5 w-2xl" />