<script lang="ts">
	import { onMount } from 'svelte';
	import JobPost from './[id]/JobPost.svelte';
	import Error from '../+error.svelte';

	let jobDetails_dummy = [
		{
			id: 1,
			title: 'WordPress Website',
			description: 'Build a responsive WordPress website for a client.',
			budget: 1500,
			recruiter: 'Ravi Kumar',
			deadline: new Date(2025, 5, 15),
			bidding: ['Amit Sharma', 'Priya Desai']
		},
		{
			id: 2,
			title: 'Web Developer',
			description: 'Develop a front-end React app for a startup.',
			budget: 2000,
			recruiter: 'Anjali Gupta',
			deadline: new Date(2025, 5, 25),
			bidding: ['Sandeep', 'Neha']
		},
		{
			id: 3,
			title: 'UI/UX Designer',
			description: 'Design a modern and user-friendly interface.',
			budget: 1800,
			recruiter: 'Amit Verma',
			deadline: new Date(2025, 6, 5),
			bidding: ['Simran', 'Vikas']
		},
		{
			id: 4,
			title: 'Backend Developer',
			description: 'Build the server-side infrastructure for an app.',
			budget: 2500,
			recruiter: 'Deepak Mehra',
			deadline: new Date(2025, 7, 1),
			bidding: ['Rajesh', 'Sonal']
		}
	];

	let jobDetails = [];

	onMount(async () => {
		try {
			let res = await fetch('http://localhost:8080/api/jobs',
			{
				"method": "GET",
				"credentials":"include"
			});
			if (!res.ok) {
				console.log('Error in fetching jobs', res);
			}
			jobDetails = await res.json();
		} catch (error) {
			console.log('Error in fetching jobs', error);
		}
	});
</script>

<div class="jobs-container">
	{#each jobDetails as job}
		<JobPost {...job} />
		<!--{...job} is spread attributes and it takes all properties 
		 from the job object and passes them as individual props to the JobPost component. -->
	{/each}
</div>

<style>
	.jobs-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: center;
	}
</style>
