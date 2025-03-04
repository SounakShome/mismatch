<script>
    import "@fortawesome/fontawesome-free/css/all.min.css";

    let name = "";
    let email = "";
    let message = "";
    let phone = "";
    let success = null;
    let loading = false;
    const submitForm = async () => {
        try {
            loading = true;
            success = null;

            // Create a unique callback name
            const callbackName = "jsonpCallback_" + Date.now();

            // Create a promise that will be resolved by the JSONP response
            const jsonpPromise = new Promise((resolve, reject) => {
                // Define the callback function
                window[callbackName] = (data) => {
                    // Clean up
                    document.body.removeChild(script);
                    delete window[callbackName];

                    // Resolve with the data
                    resolve(data);
                };

                // Create the script element
                const script = document.createElement("script");

                // Add error handler
                script.onerror = () => {
                    // Clean up
                    document.body.removeChild(script);
                    delete window[callbackName];

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

<!-- Footer Section -->
<footer class="bg-black opacity-70 text-white py-8 px-4 md:px-12 border-t-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo & Description -->
        <div>
            <div class="flex items-center space-x-4">
                <img src="/logo.png" alt="logo" class="h-16 w-16" />
                <h2 class="text-2xl font-bold">MisMatch'25</h2>
            </div>
            <p class="text-gray-400 mt-2">
                One-Kind-Of Hackathon by the IEEERAS Club of VITC!
            </p>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-col space-y-2">
            <h3 class="font-semibold text-lg">Quick Links</h3>
            <a href="/" class="text-gray-400 hover:text-white">Home</a>
            <a href="/about" class="text-gray-400 hover:text-white">About</a>
            <a href="/prize" class="text-gray-400 hover:text-white">PrizePool</a
            >
            <a href="/tracks" class="text-gray-400 hover:text-white">Tracks</a>
        </div>

        <!-- Social Media Links -->
        <div>
            <h3 class="font-bold text-lg">Follow Us</h3>
            <div class="flex space-x-8 mt-2">
                <a
                    href="https://www.instagram.com/ieeerasvitc/"
                    class="text-gray-400 hover:text-white text-4xl"
                    ><i class="fab fa-instagram"></i></a
                >
                <a
                    href="https://www.linkedin.com/company/ieeeras-vitc"
                    class="text-gray-400 hover:text-white text-4xl"
                    ><i class="fab fa-linkedin"></i></a
                >
            </div>
        </div>
    </div>

    <div
        class="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm"
    >
        &copy; 2025 MisMatch'25 . All rights reserved.
    </div>
</footer>
