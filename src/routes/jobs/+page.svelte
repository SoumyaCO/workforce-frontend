<script lang="ts">
	import { onMount } from 'svelte';

	let userRole: string | null = null;
	let isLoggedIn = false;

	let jobDetailsDummy = [
		{
			id: 1,
			title: 'WordPress Developer',
			description:
				'Build a responsive WordPress website with custom theme development and plugin integration.',
			budget: 1500,
			recruiter: 'Ravi Kumar',
			deadline: new Date(2025, 5, 15),
			skills: ['WordPress', 'PHP', 'CSS', 'Elementor']
		},
		{
			id: 2,
			title: 'React Frontend Developer',
			description:
				'Develop a responsive React application with Redux state management and API integration.',
			budget: 2000,
			recruiter: 'Anjali Gupta',
			deadline: new Date(2025, 5, 25),
			skills: ['React', 'JavaScript', 'Redux', 'CSS']
		},
		{
			id: 3,
			title: 'UI/UX Designer',
			description: 'Create modern, user-friendly interfaces with prototypes and design systems.',
			budget: 1800,
			recruiter: 'Amit Verma',
			deadline: new Date(2025, 6, 5),
			skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping']
		},
		{
			id: 4,
			title: 'Node.js Backend Engineer',
			description:
				'Build scalable server-side infrastructure with database design and API development.',
			budget: 2500,
			recruiter: 'Deepak Mehra',
			deadline: new Date(2025, 7, 1),
			skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs']
		}
	];

	let jobDetails: Array<{
		id: number;
		title: string;
		description: string;
		budget: number;
		recruiter: string;
		deadline: Date;
		skills: string[];
	}> = [];

	let isLoading = false;

	const fetchJobs = async () => {
		isLoading = true;

		try {
			const response = await fetch('http://localhost:8080/api/jobs', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP response error! status: ${response.status}`);
			}

			const data = await response.json();

			jobDetails = data.map((job: any) => ({
				...job,
				deadline: new Date(job.deadline)
			}));
		} catch (err) {
			console.error('Error fetching jobs:', err);
		} finally {
			isLoading = false;
		}
	};

	// const checkRole = async () =>{

	// }
	onMount(() => {
		fetchJobs();
		// checkRole();
	});
</script>

<div class="page-background">
	<div class="jobs-page">
		<div class="header-section">
			<h1 class="creative" data-text="Job Board">Job Board</h1>

			{#if isLoggedIn && userRole === 'recruiter'}
				<a href="/jobs/addJob" class="add-job-btn">Add new job</a>
			{/if}
		</div>
		<div class="jobs-container">
			{#each jobDetailsDummy as job}
				<div class="job-card">
					<div class="card-header">
						<h2>{job.title}</h2>
						<div class="budget">₹{job.budget}</div>
					</div>
					<p class="description">{job.description}</p>
					<div class="skills">
						{#each job.skills as skill}
							<span class="skill-tag">{skill}</span>
						{/each}
					</div>
					<div class="card-footer">
						<div class="recruiter">
							<svg width="18" height="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<path
									fill="currentColor"
									d="M159.131,169.721c5.635,58.338,43.367,96.867,96.871,96.867c53.502,0,91.23-38.53,96.867-96.867l7.988-63.029 C365.812,44.768,315.281,0,256.002,0c-59.281,0-109.812,44.768-104.86,106.692L159.131,169.721z"
								/>
								<path
									fill="currentColor"
									d="M463.213,422.569l-3.824-24.35c-3.203-20.417-16.035-38.042-34.475-47.361l-80.473-40.693 c-2.519-1.274-4.57-3.194-6.289-5.338c-23.297,24.632-51.6,39.12-82.15,39.12c-30.549,0-58.856-14.488-82.152-39.12 c-1.719,2.144-3.77,4.064-6.289,5.338l-80.472,40.693c-18.442,9.319-31.272,26.944-34.475,47.361l-3.826,24.35 c-1.363,8.692,0.436,21.448,8.222,27.825C67.42,458.907,105.875,512,256.002,512c150.125,0,188.578-53.093,198.988-61.606 C462.779,444.017,464.576,431.261,463.213,422.569z"
								/>
							</svg>
							<span>{job.recruiter}</span>
						</div>
						<div class="deadline">
							<svg
								width="18"
								height="18"
								viewBox="0 0 1024 1024"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill="currentColor"
									d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z"
								/>
							</svg>
							<span>Deadline: {job.deadline.toLocaleDateString()}</span>
						</div>
					</div>
					<a href="/jobs/{job.id}" class="view-button">View Details</a>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.page-background {
		background-color: #f7f7f7;
		min-height: 100vh;
		padding: 1rem;
		background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
		background-size: 15px 15px;
	}

	.jobs-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.header-section {
		text-align: center;
		margin-bottom: 3rem;
		position: relative;
	}
	.add-job-btn {
		position: absolute;
		top: 20px;
		right: 0;
		background: linear-gradient(135deg, #2a7f62 0%, #3a9a7a 100%);
		color: #ffffff;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		cursor: pointer;
		font-size: 0.95rem;
		border: none;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.1),
			0 4px 8px rgba(42, 127, 98, 0.2);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: 0.5px;
		z-index: 10;
	}

	.add-job-btn:hover {
		background: linear-gradient(135deg, #24805c 0%, #348b6d 100%);
		transform: translateY(-2px);
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.15),
			0 6px 12px rgba(42, 127, 98, 0.25);
	}

	.add-job-btn:active {
		transform: translateY(0);
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.1),
			0 4px 8px rgba(42, 127, 98, 0.2);
	}

	.add-job-btn::before {
		content: '+';
		font-size: 1.2rem;
		font-weight: 700;
	}

	@keyframes subtlePulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.02);
		}
		100% {
			transform: scale(1);
		}
	}

	.add-job-btn {
		animation: subtlePulse 3s infinite;
	}

	@media (max-width: 768px) {
		.add-job-btn {
			position: static;
			display: flex;
			justify-content: center;
			margin: 1.5rem auto 0;
			width: fit-content;
			padding: 0.65rem 1.75rem;
		}
	}
	h1.creative {
		position: relative;
		display: inline-block;
		font-size: clamp(2.5rem, 8vw, 3.5rem);
		font-weight: 700;
		color: #000;
		margin-bottom: 0.5rem;
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

	.jobs-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
	}

	.job-card {
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.05),
			0 10px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.job-card:hover {
		transform: translateY(-5px);
		box-shadow:
			0 10px 20px rgba(0, 0, 0, 0.1),
			0 15px 25px rgba(0, 0, 0, 0.1);
	}

	.job-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: linear-gradient(90deg, #8eafd0, #2a7f62);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.card-header h2 {
		font-size: 1.4rem;
		font-weight: 600;
		color: #222;
		margin: 0;
	}

	.budget {
		background: #f0f7f4;
		color: #2a7f62;
		padding: 0.3rem 0.8rem;
		border-radius: 20px;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.description {
		color: #555;
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.skill-tag {
		background: #f0f4f7;
		color: #3a5a78;
		padding: 0.3rem 0.8rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
		color: #666;
		font-size: 0.85rem;
	}

	.card-footer div {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.view-button {
		display: block;
		text-align: center;
		background: #3a5a78;
		color: white;
		padding: 0.6rem;
		border-radius: 6px;
		margin-top: 1.5rem;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.view-button:hover {
		background: #2d4560;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.jobs-container {
			grid-template-columns: 1fr;
		}
	}
</style>
