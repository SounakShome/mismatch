<script lang="ts">
    import "@fortawesome/fontawesome-free/css/all.min.css";

    let name = "";
    let email = "";
    let message = "";
    let phone = "";
    let success: string | null = null;
    let loading = false;
    const submitForm = async () => {
        try {
            loading = true;
            success = null;

            // Create a unique callback name
            const callbackName = "jsonpCallback_" + Date.now();

            // Define callback response type
            interface JsonpResponse {
                status: string;
                message?: string;
                [key: string]: any;
            }

            // Create a promise that will be resolved by the JSONP response
            const jsonpPromise = new Promise<JsonpResponse>((resolve, reject) => {
                // Define the callback function
                (window as {[key: string]: any})[callbackName] = (data: JsonpResponse) => {
                    // Clean up
                    document.body.removeChild(script);
                    delete (window as {[key: string]: any})[callbackName];

                    // Resolve with the data
                    resolve(data);
                };

                // Create the script element
                const script = document.createElement("script");

                // Add error handler
                script.onerror = () => {
                    // Clean up
                    document.body.removeChild(script);
                    delete (window as {[key: string]: any})[callbackName];

                    // Reject with error
                    reject(new Error("JSONP request failed"));
                };

                // Set the source URL with data and callback
                const dataParam = encodeURIComponent(
                    JSON.stringify({
                        name,
                        email,
                        phone,
                        message,
                    }),
                );

                script.src = `https://script.google.com/macros/s/AKfycbwQtA0weWrsK5i49tT2xnCJLyu09aLBh5m1ePre6cYmSvdTA0bxZefnVxZXzoUENuRrOg/exec?callback=${callbackName}&data=${dataParam}`;

                // Add the script to the document
                document.body.appendChild(script);
            });

            // Wait for the JSONP response
            const result = await jsonpPromise;

            // Handle the result
            if (result.status === "success") {
                success = "Message sent successfully!";
                name = "";
                email = "";
                phone = "";
                message = "";
            } else {
                success = "Failed: " + (result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error:", error);
            success = "An error occurred. Please try again later.";
        } finally {
            loading = false;
        }
    };
</script>

<!-- Fullscreen background -->
<div
    class="background fixed inset-0 z-[-1] bg-center bg-contain image-rendering-pixelated"
    style="background-image: url('/TimelineBG.gif')"
></div>

<div
    class="min-h-screen flex flex-col justify-center items-center px-6 mt-46 md:mt-14"
>
    <div
        class="max-w-5xl w-full bg-black/70 shadow-md rounded-lg p-8 flex flex-col md:flex-row"
    >
        <!-- Left Section -->
        <div class="md:w-1/2 p-2 md:p-10 text-white font-notable">
            <h2 class="text-2xl font-bold mb-4">CONTACT US</h2>
            <p class=" mb-4">
                We'd love to hear from you. Please fill out the form and we'll
                get back to you as soon as possible.
            </p>

            <div class="space-y-3 text-red-500">
                <p>
                    <i class="fas fa-envelope"></i> Instagram
                </p>
                <p>
                    <i class="fas fa-phone"></i> Linkedin
                </p>
                <p>
                    <i class="fas fa-map-marker-alt"></i> Mail ID
                </p>
                <p>
                    <i class="fas fa-map-marker-alt"></i> contact number
                </p>
            </div>
        </div>

        <!-- Contact Form -->
        <div
            class="md:w-1/2 p-2 md:p-6 bg-black/70 text-white shadow-lg rounded-lg"
        >
            <form class="space-y-4" on:submit|preventDefault={submitForm}>
                <input
                    type="text"
                    bind:value={name}
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                    placeholder="Your Name"
                    required
                />
                <input
                    type="email"
                    bind:value={email}
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                    placeholder="Your Mail"
                    required
                />
                <input
                    type="number"
                    bind:value={phone}
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                    placeholder="Your Phone number"
                    required
                />
                <textarea
                    bind:value={message}
                    rows="4"
                    class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                    placeholder="Message..."
                    required
                ></textarea>
                <button
                    type="submit"
                    class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition"
                    >SEND</button
                >
                {#if success}<p class="mt-2">{success}</p>{/if}
            </form>
        </div>
    </div>
</div>

