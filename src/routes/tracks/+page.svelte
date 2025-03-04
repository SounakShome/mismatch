<script lang="ts">
	import { onMount } from "svelte";
	import trackPage from "$lib/assets/trackPage.png";
	import { fade, scale } from "svelte/transition";

	let slideIndex = 0;
	let expanded = false;
	let titles = ["Web3", "DevTools", "OpenINO"];
	let selectedTrack: number | null = null;
	let modalOpen = false;
	let texts = [
		"Blockchain and decentralized finance are revolutionizing the digital economy.",
		"Advanced tools and frameworks empower developers to build efficient solutions.",
		"Open Innovation fosters collaboration between industries, startups, and academia to drive technological advancements and solve global challenges.",
	];
	let tracks = [
		{
			title: "Blockchain and Decentralized Finance: Transforming the Digital Economy",
			description:
				"Blockchain technology and decentralized finance (DeFi) are reshaping the financial landscape by eliminating intermediaries, reducing transaction costs, and enhancing transparency. Through smart contracts, blockchain enables automated, trustless financial transactions, allowing for decentralized lending, borrowing, and trading. Cryptocurrencies, stablecoins, and decentralized exchanges provide users with greater financial control, while innovations like tokenization open new opportunities for asset management. As traditional banking faces disruption, DeFi fosters financial inclusion by granting access to banking services without reliance on centralized institutions. However, challenges such as scalability, security, and regulatory frameworks remain key considerations for long-term adoption.",
		},
		{
			title: "Empowering Developers with Advanced Tools and Frameworks",
			description:
				"The rapid evolution of software development is driven by powerful tools and frameworks that streamline coding processes, enhance productivity, and enable developers to build scalable, high-performance applications. Modern frameworks like React, Next.js, and Vue.js accelerate front-end development, while backend solutions such as Node.js and Django offer robust server-side capabilities. AI-driven tools, low-code platforms, and cloud-based development environments further simplify complex tasks, allowing developers to focus on innovation rather than infrastructure. Open-source collaboration also plays a vital role in this ecosystem, fostering continuous improvement and knowledge sharing among developers worldwide.",
		},
		{
			title: "Open Innovation: A Collaborative Approach to Problem-Solving",
			description:
				"Open innovation bridges the gap between industries, startups, and academic institutions, promoting the exchange of ideas and technological breakthroughs. Unlike traditional R&D models confined within organizations, open innovation encourages external partnerships to drive faster, more efficient solutions to global challenges. This approach has led to advancements in artificial intelligence, biotechnology, and clean energy, where interdisciplinary collaboration fuels progress. Hackathons, incubators, and open-source projects exemplify the power of shared expertise, reducing barriers to innovation and accelerating the transition from concept to implementation. By fostering a culture of knowledge-sharing and co-creation, open innovation ensures that technological advancements benefit society as a whole.",
		},
	];
	function plusDivs(n: number) {
		slideIndex = (slideIndex + n + titles.length) % titles.length;
		expanded = false;
	}
	function toggleExpand() {
		expanded = !expanded;
	}
	function openModal(trackIndex) {
		selectedTrack = trackIndex;
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section>
	<div class="container mt-32">
		<div class="font-notable md:text-7xl pt-32 md:pt-0 text-4xl text-white">
			Tracks
		</div>
		<div class="welcome mt-44">
			<div class="trackSliderContainer">
				<img src={trackPage} alt="Track Page" class="trackPage" />
				<div class="trackSlider">
					<div class="tracks">
						<div class="content">
							{#each titles as title, index}
								<div class:hidden={index !== slideIndex}>
									<h1 class="title">{title}</h1>
									<p
										class:text-expanded={expanded}
										class="text"
									>
										{expanded
											? texts[index]
											: texts[index].slice(0, 100) +
												"..."}
									</p>
								</div>
							{/each}
						</div>
						<div class="controlbtn">
							<div class="ctrlsec">
								<button
									class="prev glow-button"
									on:click={() => plusDivs(-1)}>Back</button
								>
								<button
									class="next glow-button"
									on:click={() => plusDivs(1)}>Next</button
								>
								<button
									class="know glow-button"
									on:click={() => openModal(slideIndex)}
									>{expanded
										? "Show Less"
										: "Know More"}</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		{#if modalOpen}
			<div class="modal" >
				<div
					class="modal-content"
					
					transition:scale={{ duration: 300 }}
				>
					<h1 class="font-notable text-lg md:text-2xl pt-4 mb-4">
						{selectedTrack !== null
							? tracks[selectedTrack].title
							: ""}
					</h1>
					<div class="modal-body">
						<p
							class="font-press font-light text-sm md:text-base text-justify"
						>
							{selectedTrack !== null
								? tracks[selectedTrack].description
								: ""}
						</p>
					</div>
					<button
						class="close font-notable text-xs mt-4"
						on:click={closeModal}
						transition:fade
						aria-label="Close modal"
					>
						CLOSE
					</button>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		background-image: url("/tracks.gif");
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100000;
		color: white;
		padding: 15px;
	}

	.modal-content {
		background: rgba(0, 0, 0, 0.8);
		padding: 20px;
		border-radius: 10px;
		width: 90%;
		max-width: 800px;
		max-height: 80vh;
		text-align: center;
		border: 5px aqua solid;
		box-shadow: 0px 10px 30px rgba(0, 25, 254, 0.5);
		transition: transform 0.3s ease-out, opacity 0.3s ease-out;
		display: flex;
		flex-direction: column;
	}

	.modal-body {
		overflow-y: auto;
		max-height: 50vh;
		margin: 10px 0;
		padding: 0 10px;
		/* Custom scrollbar styles */
		scrollbar-width: thin;
		scrollbar-color: aqua rgba(0, 0, 0, 0.2);
	}

	.modal-body::-webkit-scrollbar {
		width: 8px;
	}

	.modal-body::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.modal-body::-webkit-scrollbar-thumb {
		background-color: aqua;
		border-radius: 4px;
	}

	.close {
		padding: 8px 16px;
		background: rgba(0, 0, 0, 0.5);
		border: 2px solid aqua;
		color: aqua;
		border-radius: 5px;
		cursor: pointer;
		margin: 0 auto;
		transition: all 0.2s ease;
	}

	.close:hover {
		background: rgba(0, 255, 255, 0.1);
		transform: scale(1.05);
	}

	.container {
		margin: 0;
		z-index: 0;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		position: relative;
		min-height: 100ch;
		overflow: hidden;
	}
	.welcome {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 1;
	}
	.welcome img {
		width: 500px;
	}

	.trackSliderContainer {
		padding: auto;
		position: relative;
		transition: transform 0.4s ease-in-out;
		transform: scale(1.4);
	}

	.trackPage {
		width: 100%;
		position: relative;
		z-index: 0;
	}

	.trackSlider {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}

	.content {
		position: absolute;
		top: 36%;
		left: 30%;
		text-align: left;
		color: #81f7ff;
		font-family: "Press Start 2P", cursive;
		width: 190px;
	}

	.title {
		padding-top: 5px;
		letter-spacing: 1px;
		font-size: 1rem;
		color: white;
		margin-bottom: 9px;
	}

	.text {
		padding-left: 9px;
		font-size: 0.55rem;
		line-height: 1.5;
		overflow: hidden;
		scrollbar-width: none;
		height: 80px;
	}
	.text-expanded {
		white-space: normal;
		overflow-y: auto;
		max-height: 200px;
	}
	.hidden {
		display: none;
	}

	.glow-button {
		width: 115px;
		height: 55px;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		font-family: "Press Start 2P", serif;
		transition: transform 0.1s ease-in-out;
	}

	.glow-button:hover {
		transition: transform 0.1s ease-in-out;
		transform: scale(1.1);
	}

	.prev {
		color: red;
		position: absolute;
		top: 34%;
		right: 24%;
		font-size: 8px;
	}
	.next {
		background: -webkit-linear-gradient(#ffecad, #ffdd00);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		position: absolute;
		top: 54%;
		right: 24%;
		font-size: 9px;
	}
	.know {
		background: -webkit-linear-gradient(#ff85da, #ff057c);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		position: absolute;
		top: 54%;
		left: 26%;
		font-size: 9px;
	}
	@media (max-width: 768px) {
		.modal-content {
			width: 95%;
			padding: 15px;
			max-height: 90vh;
		}

		.modal-body {
			max-height: 60vh;
		}
		.container {
			max-height: 458px;
			flex-direction: column;
		}
		.welcome {
			flex-direction: column;
		}
		.welcome img {
			width: 400px;
		}
		.content {
			top: 34%;
			left: 30%;
			width: 120px;
		}
		.title {
			letter-spacing: 1px;
			font-size: 0.6rem;
			color: white;
			margin-bottom: 5px;
		}

		.text {
			padding-left: 10px;
			font-size: 0.39rem;
			line-height: 1.5;
			overflow: auto;
			scrollbar-width: none;
			height: 70px;
		}
		.trackSliderContainer:hover {
			transform: scale(1);
			overflow: hidden;
		}

		.glow-button {
			width: 95px;
			height: 45px;
		}
		.prev {
			top: 32%;
			right: 23%;
			font-size: 10px;
		}
		.next {
			top: 53%;
			right: 22%;
			font-size: 10px;
		}
		.know {
			top: 53%;
			left: 28%;
			font-size: 10px;
			padding: 0;
		}
	}

	@media (max-width: 480px) {
		.modal-content {
			border-width: 3px;
			padding: 12px;
		}

		.close {
			padding: 6px 12px;
			margin-top: 10px;
		}
	}
</style>