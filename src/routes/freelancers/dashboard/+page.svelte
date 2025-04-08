<script lang="ts">
	import { goto } from '$app/navigation';

	// Function to handle navigation
	const handleNavigation = (action: string) => {
		if (action === 'edit-profile') {
			goto('/freelancers/edit-profile');
		} else if (action === 'find-jobs') {
			goto('/jobs');
		} else if (action === 'contact-support') {
			goto('/contact-support');
		}
	};
</script>

<div class="dashboard-page">
	<!-- Profile Card -->
	<div class="profile-card">
		<div class="profile-avatar">
			<img src="/images/profile_4.webp" alt="Profile Avatar" />
		</div>
		<div class="profile-info">
			<h2>Rahul Das</h2>

			<p class="role">Freelancer</p>
			<div class="rating">
				<span class="stars">★★★</span>
				<span class="rating-value">3.8</span>
			</div>
			<p class="bio">Freelance developer with 2+ years of experience in web development.</p>
		</div>
	</div>

	<!--header -->
	<div class="dashboard-header">
		<h1 class="creative" data-text="Freelancer Dashboard">Freelancer Dashboard</h1>
		<p class="description">
			Welcome back! Manage your profile, find jobs, and connect with recruiters.
		</p>
	</div>

	<div class="dashboard-content">
		<div class="dashboard-buttons">
			<button class="option-button edit-profile" on:click={() => handleNavigation('edit-profile')}>
				Edit Profile
			</button>
			<button class="option-button find-jobs" on:click={() => handleNavigation('find-jobs')}>
				Find Jobs
			</button>
			<button
				class="option-button contact-support"
				on:click={() => handleNavigation('contact-support')}
			>
				Contact Support
			</button>
		</div>

		<div class="dashboard-stats">
			<div class="stat-card">
				<h3>Total Earnings</h3>
				<p>₹3,250</p>
			</div>
			<div class="stat-card">
				<h3>Jobs Completed</h3>
				<p>12</p>
			</div>
			<div class="stat-card">
				<h3>Active Jobs</h3>
				<p>3</p>
			</div>
		</div>
	</div>

	<!-- Decorative Elements -->
	<div class="decorative-elements">
		<div class="icon lightbulb">💡</div>
		<div class="icon mobile">📱</div>
		<div class="icon mouse">🖱️</div>
		<div class="icon monitor">🖥️</div>
		<div class="icon books">📚</div>
	</div>
</div>

<style>
	.dashboard-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 15px 15px;
		background-color: #f7f7f7;
		font-family: 'Arial', sans-serif;
		text-align: center;
		padding: 20px;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}
	.profile-card {
		position: absolute;
		top: 20px;
		left: 20px;
		background-color: #fff;
		border-radius: 10px;
		padding: 20px;
		width: 250px;
		text-align: center;
		z-index: 2;
		box-shadow:
			5px 5px 0 #333,
			-2px -2px 0 #777;
		transition:
			transform 0.2s ease,
			box-shadow 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.profile-avatar {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.profile-avatar img {
		border-radius: 50%;
		object-fit: cover;
		width: 84px;
		height: 80px;
		margin-bottom: 15px;
	}

	.profile-info h2 {
		font-size: clamp(1.2rem, 4vw, 1.5rem);
		color: #000;
		margin-bottom: 5px;
	}

	.profile-info .role {
		font-size: clamp(0.9rem, 3vw, 1.1rem);
		color: #555;
		margin-bottom: 10px;
	}

	.profile-info .bio {
		font-size: clamp(0.8rem, 2.5vw, 0.9rem);
		color: #777;
		text-align: center;
		margin-bottom: 10px;
	}

	.rating {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		margin-top: 10px;
	}

	.stars {
		font-size: 1.2rem;
		color: #ffd700;
		position: relative;
	}

	.stars::before {
		content: '★★';
		opacity: 0.3;
	}

	.stars::after {
		content: '★★★';
		position: absolute;
		top: 0;
		left: 0;
		color: #ffd700;
		width: 96%;
		overflow: hidden;
		white-space: nowrap;
	}

	.rating-value {
		font-size: 1rem;
		color: #555;
		font-weight: bold;
	}

	.dashboard-header {
		text-align: center;
		margin-bottom: 2rem;
		margin-top: 100px;
	}

	h1.creative {
		position: relative;
		display: inline-block;
		font-size: clamp(2rem, 8vw, 4rem);
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

	.description {
		font-size: clamp(0.9rem, 3vw, 1rem);
		color: #555;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.dashboard-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 800px;
	}

	.dashboard-buttons {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.option-button {
		margin: 10px;
		padding: clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px);
		font-size: clamp(1rem, 3vw, 1.1rem);
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

	.option-button.edit-profile {
		background-color: #000;
	}

	.option-button.find-jobs {
		background-color: #333;
	}

	.option-button.contact-support {
		background-color: #555;
	}

	.dashboard-stats {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.stat-card {
		background-color: #fff;
		border: 2px solid #ddd;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		width: clamp(120px, 30vw, 150px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.stat-card h3 {
		font-size: clamp(0.9rem, 3vw, 1rem);
		color: #555;
		margin-bottom: 0.5rem;
	}

	.stat-card p {
		font-size: clamp(1.2rem, 4vw, 1.5rem);
		color: #000;
		font-weight: bold;
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
		font-size: clamp(1.5rem, 4vw, 2rem);
		color: #ddd;
		opacity: 0.5;
	}

	.lightbulb {
		top: 5%;
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
	}

	.monitor {
		bottom: 20%;
		left: 80%;
	}

	.books {
		top: 5%;
		right: 35%;
	}

	@media (max-width: 768px) {
		.profile-card {
			position: static;
			margin-bottom: 20px;
			width: 100%;
			max-width: 300px;
		}

		.dashboard-header {
			margin-top: 20px;
		}

		.dashboard-buttons {
			flex-direction: column;
			align-items: center;
		}

		.option-button {
			width: 100%;
			max-width: 300px;
		}

		.stat-card {
			width: 100%;
			max-width: 200px;
		}
	}

	@media (max-width: 480px) {
		.profile-card {
			padding: 15px;
		}

		.dashboard-header {
			margin-top: 10px;
		}

		.dashboard-buttons {
			gap: 1rem;
		}

		.option-button {
			padding: 10px 20px;
			font-size: 0.9rem;
		}

		.stat-card {
			padding: 15px;
		}
	}
</style>
