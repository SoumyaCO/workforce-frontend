<script lang="ts">
	import { goto } from '$app/navigation';

	let showJobsDropdown = false;

	const handleNavigation = (action: string) => {
		if (action === 'edit-profile') {
			goto('/recruiters/edit-profile');
		} else if (action === 'contact-support') {
			goto('/contact-support');
		}
	};

	const toggleJobsDropdown = () => {
		showJobsDropdown = !showJobsDropdown;
	};
</script>

<div class="dashboard-page">
	<!-- Profile Card -->
	<div class="profile-card">
		<div class="profile-avatar">
			<img src="/images/recruiter_profile.webp" alt="Recruiter Avatar" />
		</div>
		<div class="profile-info">
			<h2>Priya Sharma</h2>
			<p class="role">Recruiter</p>
			<div class="rating">
				<span class="stars">★★★★</span>
				<span class="rating-value">4.2</span>
			</div>
			<p class="bio">Hiring manager in tech recruitment.</p>
		</div>
	</div>

	<!-- Header -->
	<div class="dashboard-header">
		<h1 class="creative" data-text="Recruiter Dashboard">Recruiter Dashboard</h1>
		<p class="description">
			Manage your hiring pipeline, track job postings, and connect with top talent in your company.
		</p>
	</div>

	<div class="dashboard-content">
		<div class="dashboard-buttons">
			<button class="option-button edit-profile" on:click={() => handleNavigation('edit-profile')}>
				Edit Profile
			</button>

			<div class="jobs-button-wrapper">
				<button
					class="option-button find-jobs {showJobsDropdown ? 'active' : ''}"
					on:click={toggleJobsDropdown}
				>
					My Jobs {showJobsDropdown ? '▲' : '▼'}
				</button>

				{#if showJobsDropdown}
					<div class="jobs-dropdown">
						<button
							class="sub-option-button"
							on:click={() => goto('/recruiters/myjobs/?section=posted')}
						>
							<span class="sub-icon">📋</span> Posted Jobs
						</button>
						<button
							class="sub-option-button"
							on:click={() => goto('/recruiters/myjobs/?section=running')}
						>
							<span class="sub-icon">🔄</span> Running Jobs
						</button>
						<button
							class="sub-option-button"
							on:click={() => goto('/recruiters/myjobs/?section=completed')}
						>
							<span class="sub-icon">✅</span> Completed Jobs
						</button>
					</div>
				{/if}
			</div>

			<button
				class="option-button contact-support"
				on:click={() => handleNavigation('contact-support')}
			>
				Contact Support
			</button>
		</div>
	</div>

	<div class="decorative-elements">
		<div class="icon briefcase">💼</div>
		<div class="icon search">🔍</div>
		<div class="icon document">📄</div>
		<div class="icon handshake">🤝</div>
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
		margin-top: -10rem;
		margin-bottom: 1rem;
		text-shadow: none;
		letter-spacing: -0.02em;
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

	.jobs-button-wrapper {
		position: relative;
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

	.jobs-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		width: auto;
		background: white;
		border-radius: 8px;
		padding: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 10;
		margin-top: 5px;
		border: 1px solid #e0e0e0;
		animation: fadeIn 0.2s ease-out;
		display: flex;
		gap: 8px;
	}

	.sub-option-button {
		padding: 10px 15px;
		font-size: 0.95rem;
		background: #f8f8f8;
		color: #333;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		text-align: left;

		white-space: nowrap;

		flex: 1;
		min-width: 120px;
		justify-content: center;
	}

	.sub-option-button:hover {
		background: #e9e9e9;
		transform: translateX(3px);
	}

	.sub-icon {
		font-size: 1.1rem;
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

	.briefcase {
		top: 5%;
		left: 30%;
	}
	.search {
		bottom: 20%;
		right: 10%;
	}
	.document {
		top: 70%;
		left: 20%;
	}
	.handshake {
		top: 30%;
		right: 20%;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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

		.jobs-dropdown {
			position: static;
			width: 100%;
			max-width: 300px;
			margin-top: 8px;
			flex-direction: column;
			width: 100%;
			max-width: 300px;
		}

		.sub-option-button {
			width: 100%;
			justify-content: flex-start;
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
	}
</style>
