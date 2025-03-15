<script lang="ts">
	const handleNavigation = (action: string) => {
		if (action === 'create-account') {
			window.location.href = '/CreateFreelancer';
		} else if (action === 'login') {
			window.location.href = '/login';
		}
	};
</script>

<div class="freelancer-dashboard">
	<h1>Freelancer Dashboard</h1>
	<p class="description">
		Welcome to the freelancer portal. Create a new account or log in to your existing account to get
		started.
	</p>

	<div class="options">
		<button class="option-button" on:click={() => handleNavigation('create-account')}>
			Create Freelancing Account
		</button>
		<button class="option-button login" on:click={() => handleNavigation('login')}>
			Login to Existing Account
		</button>
	</div>
</div>

<style>
	.freelancer-dashboard {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
		font-family: 'Arial', sans-serif;
		text-align: center;
		padding: 20px;
		box-sizing: border-box;
	}

	h1 {
		font-size: 2.5rem;
		color: #333;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.description {
		font-size: 1.2rem;
		color: #555;
		margin-bottom: 2rem;
		max-width: 600px;
		line-height: 1.6;
	}

	.options {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.option-button {
		padding: 1rem 2rem;
		font-size: 1rem;
		color: white;
		background: linear-gradient(135deg, #6a11cb, #2575fc);
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			background 0.3s ease;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.option-button:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
		background: linear-gradient(135deg, #2575fc, #6a11cb);
	}

	.option-button::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 300%;
		height: 300%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
		transform: translate(-50%, -50%) scale(0);
		transition: transform 0.5s ease;
		pointer-events: none;
	}

	.option-button:hover::before {
		transform: translate(-50%, -50%) scale(1);
	}

	.option-button.login {
		background: linear-gradient(135deg, #4caf50, #45a049);
	}

	.option-button.login:hover {
		background: linear-gradient(135deg, #45a049, #4caf50);
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2rem;
		}

		.description {
			font-size: 1rem;
		}

		.option-button {
			padding: 0.8rem 1.5rem;
			font-size: 0.9rem;
		}
	}
</style>
