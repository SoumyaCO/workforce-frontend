<script lang="ts">
	import { onMount } from 'svelte';
	import AllFreelancers from './AllFreelancers.svelte';

	// let Allfreelancers: Array<{
	// 	id: number;
	// 	name: string;
	// 	email: string;
	// 	skills: string[];
	// 	portfolioURL: string;
	// 	hourlyRate: number;
	// 	createdAt: string;
	// 	department: string;
	// 	profilePhoto: string;
	// }> = [];

	let Allfreelancers: Array<{
		id: number;
		name: string;
		email: string;
		skills: string[];
		portfolioURL: string;
		hourlyRate: number;
		createdAt: string;
		department: string;
		profilePhoto: string;
	}> = [
		{
			id: 1,
			name: 'Amit Sharma',
			email: 'Sharma.Amit@gamil.com',
			skills: ['JavaScript', 'Svelte', 'Node.js'],
			portfolioURL: 'https://johndoe.com',
			hourlyRate: 50,
			createdAt: '2023-10-01',
			department: 'Web Development',
			profilePhoto: '/images/profile_1.png'
		},
		{
			id: 2,
			name: 'Sandeep Das',
			email: 'Das@gamil.com',
			skills: ['Python', 'Django', 'Data Analysis'],
			portfolioURL: 'https://janesmith.com',
			hourlyRate: 60,
			createdAt: '2023-09-15',
			department: 'Data Science',
			profilePhoto: '/images/profile_2.jpg'
		},
		{
			id: 3,
			name: 'Priya Desai',
			email: 'Priya1@gamil.com',
			skills: ['React', 'TypeScript', 'UI/UX Design'],
			portfolioURL: 'https://alicejohnson.com',
			hourlyRate: 70,
			createdAt: '2023-08-20',
			department: 'Frontend Development',
			profilePhoto: '/images/profile_3.jpg'
		},
		{
			id: 4,
			name: 'Vikas',
			email: 'Vikas@gamil.com',
			skills: ['Java', 'Spring Boot', 'Microservices'],
			portfolioURL: 'https://bobbrown.com',
			hourlyRate: 80,
			createdAt: '2023-07-10',
			department: 'Backend Development',
			profilePhoto: '/images/profile_4.webp'
		}
	];

	// onMount(async () => {
	// 	try {
	// 		const response = await fetch('https://freelancers');
	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}
	// 		Allfreelancers = await response.json();
	// 	} catch (error) {
	// 		console.error('Error fetching freelancers:', error);
	// 	}
	// });
</script>

<main>
	<h1>Freelancers List</h1>
	<div class="jobs-container">
		{#if Allfreelancers.length > 0}
			{#each Allfreelancers as freelancer}
				<AllFreelancers {...freelancer} />
			{/each}
		{:else}
			<p>No freelancers found.</p>
		{/if}
	</div>
</main>

<style>
	main {
		padding: 20px;
		background-color: #f5f7fa;
		min-height: 100vh;
	}

	h1 {
		text-align: center;
		color: #333;
		font-size: 2rem;
		margin-bottom: 20px;
	}

	.jobs-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		padding: 20px;
	}
</style>
