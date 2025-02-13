
<script lang="ts">
    import { onMount } from 'svelte';
	import trackPage from "$lib/assets/trackPage.png";
	import background from "$lib/assets/background.png";
	import bubbles from "$lib/assets/bubbles.png";
	import tracks from "$lib/assets/tracks.png";

	let slideIndex = 0;
	let expanded = false;
	let titles = ["FinTech", "Web3", "DevTools", "OpenINO"];
	let texts = [
		"Financial technology is transforming the way we manage, invest, and transact money through innovative solutions like digital banking, blockchain, and AI-driven financial services.",
		"Blockchain and decentralized finance are revolutionizing the digital economy.",
		"Advanced tools and frameworks empower developers to build efficient solutions.",
		"Open Innovation fosters collaboration between industries, startups, and academia to drive technological advancements and solve global challenges.",
	];
	function plusDivs(n: number) {
		slideIndex = (slideIndex + n + titles.length) % titles.length;
		expanded = false;
	}
	function toggleExpand() {
        expanded = !expanded;
    }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com"  />
	<link
		href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section>
	<div class="container">
		<img src={background} alt="Welcome" class="bg" />
		<img src={bubbles} alt="Welcome" class="bubbles" />
		<div class="welcome">
			<img src={tracks} alt="Welcome" class="trackimg" />
			<div class="trackSliderContainer">
				<img src={trackPage} alt="Track Page" class="trackPage" />
				<div class="trackSlider">
					<div class="tracks">
						<div class="content">
							{#each titles as title, index}
								<div class:hidden={index !== slideIndex}>
									<h1 class="title">{title}</h1>
									<p class:text-expanded={expanded} class="text">{expanded ? texts[index] : texts[index].slice(0, 100) + '...'}</p>
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
								<button class="know glow-button" on:click={toggleExpand}>{expanded ? "Show Less" : "Know More"}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	
	.container {
        margin: 0;
		background-color: #19072b;
		z-index: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		min-height: 100ch;
		overflow: hidden;
	}
	.bg {
		position: absolute;
		z-index: -1;
		height: 100%;
	}
	.bubbles {
		right: 0%;
		position: absolute;
		z-index: -2;
		height: 100%;
	}
	.welcome {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 1;
	}
	.trackimg {
		position: relative;
		padding-right: 150px;
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

	.trackSliderContainer:hover {
		transform: scale(2);
		overflow: hidden;
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
		color:red;
		position: absolute;
		top: 34%;
		right: 24%;
		font-size: 8px;
	}
	.next {
		background: -webkit-linear-gradient(#FFECAD, #FFDD00);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		position: absolute;
		top: 54%;
		right: 24%;
		font-size: 9px;
	}
	.know{
		background: -webkit-linear-gradient(#FF85DA, #FF057C);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		position: absolute;
		top: 54%;
		left: 26%;
		font-size: 9px;
	}
	@media (max-width: 768px) {
		.container{
			max-height: 458px;
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
			height: 50px;
		}
		.trackSliderContainer:hover {
			transform: scale(1.4);
			overflow: hidden;
		}

		.glow-button {
			width: 95px;
			height: 45px;

		}
		.trackimg {
			margin-bottom: 50px;
			padding-right: 50px;
		}
		.prev{
			top: 31%;
			right: 19%;
			font-size: 5px;
		}
		.next{
			top: 53%;
			right: 22%;
			font-size: 6px;
		}
		.know{
			top: 53%;
			left: 24%;
			font-size: 6px;
		}
	}
</style>
