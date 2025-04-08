<script lang="ts">
	import { onMount } from 'svelte';

	let Allfreelancers: Array<{
		id: number;
		name: string;
		email: string;
		skills: string[];
		portfolioURL: string;
		hourlyRate: number;
		rating: number;
		createdAt: string;
		department: string;
		profilePhoto: string;
	}> = [
		{
			id: 1,
			name: 'Amit Sharma',
			email: 'Sharma.Amit@gamil.com',
			skills: ['JavaScript', 'Svelte', 'Node.js'],
			portfolioURL: 'https://Amit.com',
			hourlyRate: 50,
			rating: 4.2,
			createdAt: '2023-10-01',
			department: 'Web Development',
			profilePhoto: '/images/profile_1.png'
		},
		{
			id: 2,
			name: 'Sandeep Das',
			email: 'Das@gamil.com',
			skills: ['Python', 'Django', 'Data Analysis'],
			portfolioURL: 'https://Sandeep.com',
			hourlyRate: 60,
			rating: 4.5,
			createdAt: '2023-09-15',
			department: 'Data Science',
			profilePhoto: '/images/profile_2.jpg'
		},
		{
			id: 3,
			name: 'Priya Desai',
			email: 'Priya1@gamil.com',
			skills: ['React', 'TypeScript', 'UI/UX Design'],
			portfolioURL: 'https://Priya.com',
			hourlyRate: 70,
			rating: 4.8,
			createdAt: '2023-08-20',
			department: 'Frontend Development',
			profilePhoto: '/images/profile_3.jpg'
		},
		{
			id: 4,
			name: 'Vikas',
			email: 'Vikas@gamil.com',
			skills: ['Java', 'Spring Boot', 'Microservices'],
			portfolioURL: 'https://Vikas.com',
			hourlyRate: 80,
			rating: 3.9,
			createdAt: '2023-07-10',
			department: 'Backend Development',
			profilePhoto: '/images/profile_4.webp'
		}
	];

	onMount(async () => {
		try {
			const response = await fetch('https://freelancers');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			Allfreelancers = await response.json();
		} catch (error) {
			console.error('Error fetching freelancers:', error);
		}
	});
</script>

<main class="freelancers-page">
	<div class="dashboard-header">
		<h1 class="creative" data-text="Freelancers List">Freelancers List</h1>
	</div>

	<div class="freelancers-container">
		{#if Allfreelancers.length > 0}
			{#each Allfreelancers as freelancer}
				<div class="freelancer-card">
					<div class="profile-avatar">
						<img src={freelancer.profilePhoto} alt="Profile Avatar" />
					</div>
					<div class="profile-info">
						<h2>{freelancer.name}</h2>
						<p class="role">{freelancer.department}</p>
						<div class="rating">
							<span class="stars" style="--rating: {freelancer.rating}"></span>
							<span class="rating-value">{freelancer.rating.toFixed(1)}</span>
						</div>
						<p class="bio">
							Hourly Rate: <span class="hourly-rate">₹{freelancer.hourlyRate}</span>
						</p>
						<div class="skills">
							{#each freelancer.skills as skill}
								<span class="skill-tag">{skill}</span>
							{/each}
						</div>
						<a href={freelancer.portfolioURL} class="portfolio-link" target="_blank"
							>View Portfolio</a
						>
					</div>
				</div>
			{/each}
		{:else}
			<p class="no-freelancers">No freelancers found.</p>
		{/if}
	</div>
</main>

<style>
	.freelancers-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		background-color: #f7f7f7;
		background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 15px 15px;
		font-family: 'Arial', sans-serif;
		padding: 20px;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}

	.dashboard-header {
		text-align: center;
		margin-bottom: 2rem;
		margin-top: 20px;
		width: 100%;
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

	.freelancers-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		width: 80%;
		max-width: 1200px;
		padding: 20px;
	}

	.freelancer-card {
		background-color: #fff;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
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

	.freelancer-card:hover {
		transform: translate(-2px, -2px);
		box-shadow:
			7px 7px 0 #555,
			-3px -3px 0 #999;
	}

	.profile-avatar img {
		border-radius: 50%;
		width: 100px;
		height: 100px;
		object-fit: cover;
		margin-bottom: 15px;
		border: 3px solid #000;
	}

	.profile-info {
		width: 100%;
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
		font-weight: 600;
	}

	.profile-info .bio {
		font-size: clamp(0.9rem, 2.5vw, 1rem);
		color: #000;
		margin-bottom: 15px;
		font-weight: 500;
	}

	.rating {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		margin: 10px 0;
	}

	.stars {
		--percent: calc(var(--rating) / 5 * 100%);

		/* (var(--rating value)) (ex 4.2)
		stores the result in a new CSS variable --percent */

		display: inline-block;
		font-size: 1.2rem;
		font-family: Times;
		line-height: 1;
	}

	.stars::before {
		content: '★★★★★';
		letter-spacing: 3px;
		background: linear-gradient(90deg, #ffd700 var(--percent), #ddd var(--percent));
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.rating-value {
		font-size: 1rem;
		color: #555;
		font-weight: bold;
	}

	.hourly-rate {
		color: #28a745;
		font-weight: bold;
		font-size: 1.1em;
	}

	.freelancer-card:hover .hourly-rate {
		color: #273a2b;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: center;
		margin: 15px 0;
	}

	.skill-tag {
		background-color: #000;
		color: white;
		padding: 5px 10px;
		border-radius: 15px;
		font-size: 0.8rem;
	}

	.portfolio-link {
		display: inline-block;
		margin-top: 10px;
		padding: 8px 15px;
		background-color: #333;
		color: white;
		text-decoration: none;
		border-radius: 5px;
		font-size: 0.9rem;
		transition: background-color 0.3s ease;
	}

	.portfolio-link:hover {
		background-color: #555;
	}

	.no-freelancers {
		text-align: center;
		font-size: 1.2rem;
		color: #555;
		grid-column: 1 / -1;
	}

	@media (max-width: 768px) {
		.freelancers-container {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}

		.profile-avatar img {
			width: 80px;
			height: 80px;
		}
	}

	@media (max-width: 480px) {
		.freelancers-container {
			grid-template-columns: 1fr;
		}

		.freelancer-card {
			padding: 15px;
		}
	}
</style>
