<script lang="ts">
    import { slide } from 'svelte/transition';

    let faqs = [
        { question: "When is the hackathon?", answer: "The hackathon is on 31st March and 1st April.", open: false },
        { question: "Why join this event?", answer: "Mismatch offers a unique opportunity to level up, collaborate with new people, and experience a fresh, innovative approach to hackathons.", open: false },
        { question: "If I don't have a team-member then?", answer: "Don't worry! Mismatch provides you the opportunity to match up with different talented people and foster a new environment of learning.", open: false },
        { question: "How do I participate?", answer: "You can register using this same website.", open: false },
        { question: "Does this event have a registration fee?", answer: "Yes, Rs.100 for solo, Rs.190 for duo, and Rs.280 for trio.", open: false }
    ];

    function toggle(index: number) {
        faqs = faqs.map((faq, i) => ({
            ...faq,
            open: i === index ? !faq.open : false // Toggle clicked one, close others
        }));
    }
</script>

<div class="relative w-full min-h-screen flex bgimg pt-32 items-center justify-center px-4 sm:px-6">
    <div class="faq-container relative bg-black/70  text-white px-6 sm:px-10 py-6 sm:py-8 rounded-2xl shadow-xl w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl">
        <div class="absolute inset-0 rounded-2xl border-2 sm:border-4 border-blue-400 shadow-[0_0_20px_rgba(0,0,255,0.8)]"></div>

        <div class="relative">
            <h2 class="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white font-notable">Frequently Asked Questions</h2>
            
            {#each faqs as faq, i}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div class="faq-item font-press border-b border-gray-300 py-6 md:py-7 px-3 cursor-pointer transition duration-300 hover:text-purple-400"  
                     on:click={() => toggle(i)}>
                    <div class="faq-question flex justify-between font-semibold text-base sm:text-lg">
                        <span>{faq.question}</span>
                        <span>{faq.open ? "−" : "+"}</span>
                    </div>
                    {#if faq.open}
                        <div in:slide={{ duration: 300 }} out:slide={{ duration: 200 }} class="faq-answer mt-2 text-gray-300 text-sm sm:text-base">{faq.answer}</div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .bgimg {
        background-image: url('/faq.gif');
        background-size: cover;
        background-position: center;
    }
    .faq-answer {
        color: white;
    }
</style>
