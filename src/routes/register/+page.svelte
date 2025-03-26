<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	
	let currentStep = 0;
	let email = '';
	let otpDigits = ['', '', '', '', '', ''];
    let otp = '';
	let password = '';
	let confirmPassword = '';
	let loading = false;
	
	const progress = spring(0, {
		stiffness: 0.1,
		damping: 0.4
	});
	
	$: {
		progress.set(currentStep * 33.33);
	}
	
	async function handleEmailSubmit() {
		loading = true;
        const res = await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => res.json());
        if (res.status==200) {
            otp = res.otp;
            loading = false;
            currentStep = 1;
        } else {
            loading = false
            alert("Email not found!");
            return;
        }
	}
	
	async function handleOTPSubmit() {
		loading = true;
        const currOtp = otpDigits.join('');
        const res = await fetch('/api/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currOtp: currOtp, otp: otp })
        }).then(res => res.json());
        if (res.status==200) {
            loading = false;
            currentStep = 2;
        } else {
            loading = false;
            alert("Invalid OTP!");
        }
	}
	
	async function handlePasswordSubmit() {
		if (password !== confirmPassword) {
			alert("Passwords don't match!");
			return;
		}
		loading = true;
        const res = await fetch('/api/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            loading = false;
            return;
        }
		loading = false;
		currentStep = 3;
	}

	function handleOtpInput(event: Event & { currentTarget: EventTarget & HTMLInputElement; }, index: number) {
			const input = event.target as HTMLInputElement;
			const value = input.value;

		if (!/^\d*$/.test(value)) {
			input.value = otpDigits[index];
			return;
		}

		if (value.length <= 1) {
			otpDigits[index] = value;
			if (value && index < 5) {
				const nextInput = input.parentElement?.nextElementSibling?.querySelector('input');
				if (nextInput) nextInput.focus();
			}
		} else {
			const digits = value.split('').slice(0, 6);
			otpDigits = [...digits, ...Array(6 - digits.length).fill('')];
			const lastFilledIndex = otpDigits.findIndex(d => d === '') - 1;
			const targetIndex = lastFilledIndex >= 0 ? lastFilledIndex : digits.length - 1;
			const inputs = input.parentElement?.parentElement?.querySelectorAll('input');
			if (inputs?.[targetIndex]) inputs[targetIndex].focus();
		}
	}

	function handleOtpKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement; }, index: number) {
		if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
			const prevInput = event.currentTarget.parentElement?.previousElementSibling?.querySelector('input');
			if (prevInput) {
				prevInput.focus();
				otpDigits[index - 1] = '';
			}
		} else if (event.key === 'ArrowLeft' && index > 0) {
			const prevInput = event.currentTarget.parentElement?.previousElementSibling?.querySelector('input');
			if (prevInput) prevInput.focus();
		} else if (event.key === 'ArrowRight' && index < 5) {
			const nextInput = event.currentTarget.parentElement?.nextElementSibling?.querySelector('input');
			if (nextInput) nextInput.focus();
		}
	}

	const steps = ['Email', 'Verify', 'Password'];
</script>

<svelte:head>
	<title>Create Account</title>
</svelte:head>

<div class="register-container">
	<div class="brand">
		<div class="steps">
			{#each steps as step, i}
				<div class="step" class:active={currentStep >= i}>
					<div class="step-number">{i + 1}</div>
					<span>{step}</span>
				</div>
				{#if i < steps.length - 1}
					<div class="step-line" class:active={currentStep > i}></div>
				{/if}
			{/each}
		</div>
	</div>
	
	<div class="card" in:scale={{ duration: 700, easing: cubicOut }}>
		{#if currentStep === 0}
			<div class="form-container" in:fly={{ y: 20, duration: 400, delay: 300 }} out:fade>
				<h1>Welcome!</h1>
				<p>Enter your email to get started</p>
					<div class="input-group">
						<label for="email">Email address</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="john@example.com"
							required
							disabled={loading}
						/>
					</div>
					<button type="submit" on:click={handleEmailSubmit} disabled={loading}>
						{#if loading}
							<div class="loader"></div>
							<span>Sending...</span>
						{:else}
							<span>Continue</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M5 12h14m-7-7 7 7-7 7"/>
							</svg>
						{/if}
					</button>
			</div>
		{:else if currentStep === 1}
			<div class="form-container" in:fly={{ y: 20, duration: 400, delay: 300 }} out:fade>
				<h1>Check your email</h1>
				<p>We've sent a 6-digit code to <strong>{email}</strong></p>
				
				<form on:submit|preventDefault={handleOTPSubmit}>
					<div class="input-group">
						<label for="otp">Verification code</label>
						<div class="otp-container">
							{#each otpDigits as digit, i}
								<div class="otp-input-wrapper">
									<input
										type="text"
										inputmode="numeric"
										maxlength="1"
										value={digit}
										on:input={(e) => handleOtpInput(e, i)}
										on:keydown={(e) => handleOtpKeydown(e, i)}
										disabled={loading}
									/>
								</div>
							{/each}
						</div>
					</div>
                    <div class="button-group">
                        <button type="button" class="back-button" on:click={() => currentStep = 0} disabled={loading}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            <span>Back</span>
                        </button>
                        <button type="submit" disabled={loading || otpDigits.some(d => !d)}>
                            {#if loading}
                                <div class="loader"></div>
                                <span>Verifying...</span>
                            {:else}
                                <span>Verify Code</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m5 12 5 5L20 7"/>
                                </svg>
                            {/if}
                        </button>
                    </div>

                    <style>
                        .button-group {
                            display: flex;
                            gap: 0.75rem;
                        }
                        
                        .back-button {
                            background: transparent;
                            border: 1.5px solid #334155;
                            color: #e2e8f0;
                        }
                        
                        .back-button:hover:not(:disabled) {
                            background: #334155;
                            transform: translateY(-1px);
                        }
                    </style>
				</form>
			</div>
		{:else if currentStep === 2}
			<div class="form-container" in:fly={{ y: 20, duration: 400, delay: 300 }} out:fade>
				<h1>Set your password</h1>
				<p>Create a strong password to secure your account</p>
				
				<form on:submit|preventDefault={handlePasswordSubmit}>
					<div class="input-group">
						<label for="password">Password</label>
						<input
							id="password"
							type="password"
							bind:value={password}
							placeholder="••••••••"
							required
							minlength="8"
							disabled={loading}
						/>
					</div>
					<div class="input-group">
						<label for="confirm-password">Confirm password</label>
						<input
							id="confirm-password"
							type="password"
							bind:value={confirmPassword}
							placeholder="••••••••"
							required
							minlength="8"
							disabled={loading}
						/>
					</div>
					<button type="submit" disabled={loading}>
						{#if loading}
							<div class="loader"></div>
							<span>Creating account...</span>
						{:else}
							<span>Complete Registration</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M5 12h14m-7-7 7 7-7 7"/>
							</svg>
						{/if}
					</button>
				</form>
			</div>
		{:else}
			<div class="success" in:scale={{ duration: 400, delay: 300 }}>
				<div class="success-icon">✨</div>
				<h1>Welcome aboard!</h1>
				<p>Your account has been created successfully.</p>
				<a href="/signIn" class="button">
					<span>Continue to Login</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
					</svg>
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Inter', sans-serif;
		background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
		color: #e2e8f0;
	}

	.register-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		gap: 2rem;
        margin-top: 0rem;
	}

	.brand {
		text-align: center;
		margin-bottom: 1rem;
	}

	.steps {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.step {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #94a3b8;
		font-size: 0.875rem;
	}

	.step.active {
		color: #a78bfa;
	}

	.step-number {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #1e293b;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		font-size: 0.75rem;
		transition: all 0.3s ease;
	}

	.step.active .step-number {
		background: #7c3aed;
		color: #f8fafc;
	}

	.step-line {
		width: 40px;
		height: 2px;
		background: #1e293b;
		transition: all 0.3s ease;
	}

	.step-line.active {
		background: #7c3aed;
	}
	
	.card {
		background: #1e293b;
		padding: 2.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2);
		width: 100%;
		max-width: 440px;
		display: flex;
		flex-direction: column;
		position: relative;
		border: 1px solid #334155;
	}

	.form-container {
		flex: 1;
	}
	
	h1 {
		font-size: 1.5rem;
		color: #c4b5fd;
		margin: 0 0 0.5rem;
		font-weight: 600;
	}
	
	p {
		color: #94a3b8;
		margin: 0 0 2rem;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	strong {
		color: #c4b5fd;
		font-weight: 500;
	}
	
	.input-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: #c4b5fd;
		margin-bottom: 0.5rem;
	}
	
	input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1.5px solid #334155;
		border-radius: 0.75rem;
		font-size: 0.95rem;
		transition: all 0.2s;
		background: #0f172a;
		color: #e2e8f0;
	}
	
	input:focus {
		outline: none;
		border-color: #7c3aed;
		box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
	}
	
	input::placeholder {
		color: #64748b;
	}

	.otp-container {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
	}

	.otp-input-wrapper {
		flex: 1;
	}

	.otp-input-wrapper input {
		width: 100%;
		height: 3.5rem;
		padding: 0;
		text-align: center;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
	}
	
	button, .button {
		width: 100%;
		padding: 0.875rem;
		background: #7c3aed;
		color: #f8fafc;
		border: none;
		border-radius: 0.75rem;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		text-decoration: none;
	}
	
	button:hover, .button:hover {
		background: #6d28d9;
		transform: translateY(-1px);
	}
	
	button:disabled {
		background: #334155;
		color: #64748b;
		cursor: not-allowed;
		transform: none;
	}

	.loader {
		width: 18px;
		height: 18px;
		border: 2px solid #f8fafc;
		border-bottom-color: transparent;
		border-radius: 50%;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	.success {
		text-align: center;
		padding: 2rem 0;
	}

	.success-icon {
		font-size: 3rem;
		margin-bottom: 1.5rem;
		animation: bounce 1s ease infinite;
	}

	@keyframes bounce {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	
	.success h1 {
		margin-bottom: 1rem;
	}
	
	.success p {
		margin-bottom: 2rem;
	}

	@media (max-width: 480px) {
		.register-container {
			padding: 1rem;
		}

		.card {
			padding: 1.5rem;
			border-radius: 1rem;
		}

		.steps span {
			display: none;
		}

		.step-line {
			width: 20px;
		}

		.otp-container {
			gap: 0.35rem;
		}

		.otp-input-wrapper input {
			height: 3rem;
			font-size: 1.125rem;
		}
	}
</style>