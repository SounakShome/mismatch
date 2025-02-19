<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import jsQR from "jsqr";
    import { goto } from "$app/navigation";
    
    let video: HTMLVideoElement;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let stream: MediaStream;
    let scanning = true;
    let qrResult: string = "";
    
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        video.srcObject = stream;
        video.setAttribute("playsinline", "true");
        await video.play();
  
        // Initialize canvas once video starts
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx = canvas.getContext("2d");
  
        requestAnimationFrame(scanQRCode);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
  
    async function scanQRCode() {
      if (!scanning || !ctx || !video.videoWidth) return;
  
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let code = jsQR(imageData.data, imageData.width, imageData.height);
  
      if (code) {
        qrResult = code.data;
        stopCamera(); // Stop scanning after success
        goto(`/qread/`+qrResult);
      } else {
        requestAnimationFrame(scanQRCode);
      }
    }
  
    function stopCamera() {
      scanning = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  
    onMount(startCamera);
    onDestroy(stopCamera);
  </script>
  
  <main class="scanner-container">
    <video bind:this={video} class="video-preview">
      <track kind="captions" srclang="en" label="English captions" />
    </video>
    <canvas bind:this={canvas} class="hidden-canvas"></canvas>
    {#if qrResult}
      <p>Scanned QR Code: <strong>{qrResult}</strong></p>
    {/if}
  </main>
  
  <style>
    .scanner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .video-preview {
      width: 100%;
      max-width: 400px;
      border: 2px solid #ccc;
      border-radius: 8px;
    }
    .hidden-canvas {
      display: none;
    }
  </style>
  