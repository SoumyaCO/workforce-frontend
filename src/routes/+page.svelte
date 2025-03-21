<script lang="ts">
	import { goto } from '$app/navigation';
	const handleNavigation = (role: string) => {
		if (role === 'freelancer') {
			goto('/freelancers/dashboard');
		} else if (role === 'recruiter') {
			goto('/recruiters/dashboard');
		}
	};
</script>

<div class="home-page">
	<div class="content-wrapper">
		<div class="text-content">
			<h1 class="creative" data-text="Work Revolution">Work Revolution</h1>
			<p class="description">
				This is for company internal freelancing Works , exclusively for company employees from
				different branches.
			</p>
			<div class="two_options">
				<button class="option-button freelancer" on:click={() => handleNavigation('freelancer')}>
					Continue as Freelancer
				</button>
				<button class="option-button recruiter" on:click={() => handleNavigation('recruiter')}>
					Continue as Recruiter
				</button>
			</div>
		</div>
		<img src="/images/bg_background_main.webp" alt="" class="main-image" />
	</div>

	<div class="decorative-elements">
		<div class="icon lightbulb">💡</div>
		<div class="icon mobile">📱</div>
		<div class="icon mouse">🖱️</div>
		<div class="icon monitor">🖥️</div>
		<div class="icon books">📚</div>
	</div>
</div>

<style>
	.home-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #f7f7f7;
		font-family: 'Arial', sans-serif;
		text-align: center;
		padding: 20px;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}

	.content-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 1200px;
		position: relative;
		z-index: 1;
	}

	.text-content {
		text-align: left;
		max-width: 600px;
	}
	h1 {
		font-size: 4rem;
		font-weight: 700;
		color: #000;
		margin-bottom: 1rem;
		text-shadow: none;
		position: relative;
		letter-spacing: -0.02em;
	}
	/* 
	h1::before {
		content: attr(data-text);
		position: absolute;
		top: -3px;
		left: -3px;
		color: #777;
		z-index: -2;
	} */
	h1.creative {
		position: relative;
		display: inline-block;
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 700;
		color: #000;
		margin-bottom: 1rem;
		text-shadow: none;
		letter-spacing: -0.02em;
	}

	h1.creative::before {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		color: #8eafd0;
		z-index: -1;
		transform: translate(-2px, -2px);
		pointer-events: none;
	}

	@media (max-width: 768px) {
		h1.creative {
			font-size: clamp(2rem, 6vw, 3rem);
		}

		h1.creative::before {
			transform: translate(-1px, -1px); /* smaller screens */
		}
	}

	@media (max-width: 480px) {
		h1.creative {
			font-size: clamp(1.5rem, 5vw, 2rem); /*font size for mobile */
		}

		h1.creative::before {
			transform: translate(-0.5px, -0.5px); /*for mobile */
		}
	}
	.description {
		font-size: 1rem;
		color: #555;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.two_options {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.option-button {
		margin: 10px;
		padding: 15px 30px;
		font-size: 1.1rem;
		color: white;
		background-color: #000;
		border: 2px solid #555;
		border-radius: 5px;
		cursor: pointer;
		transition:
			background-color 0.3s ease,
			transform 0.2s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
		box-shadow:
			5px 5px 0 #333,
			-2px -2px 0 #777;
	}

	.option-button:hover {
		background-color: #333;
		border-color: #777;
		transform: translate(-1px, -1px);
		box-shadow:
			3px 3px 0 #555,
			-3px -3px 0 #999;
	}

	/* .option-button:active {
		transform: translate(1px, 1px);
		border-color: #333;
		box-shadow:
			1px 1px 0 #111,
			-1px -1px 0 #555;
	} */

	.option-button.recruiter {
		background-color: #333;
		border-color: #666;
	}

	.option-button.recruiter:hover {
		background-color: #555;
		border-color: #888;
	}

	.main-image {
		max-width: 40%;
		height: auto;
	}

	.decorative-elements {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.decorative-elements .icon {
		position: absolute;
		font-size: 2rem;
		color: #ddd;
		opacity: 0.8;
	}

	.lightbulb {
		top: 10%;
		left: 15%;
	}

	.mobile {
		bottom: 20%;
		left: 9%;
	}

	.mouse {
		top: 20%;
		right: 5%;
		transform: translateX(-50%);
		font-size: 1.5rem;
	}

	.monitor {
		bottom: 40%;
		left: 50%;
	}

	.books {
		top: 5%;
		right: 35%;
	}

	@media (max-width: 600px) {
		.content-wrapper {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.text-content {
			text-align: center;
			margin-bottom: 20px;
		}

		.main-image {
			max-width: 80%;
		}

		h1 {
			font-size: 3rem;
		}

		.description {
			font-size: 1rem;
		}

		.option-button {
			padding: 12px 25px;
			font-size: 1rem;
		}
	}
</style>
