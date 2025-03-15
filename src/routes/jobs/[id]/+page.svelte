<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// id from url
	let id: number;
	$: id = parseInt($page.params.id);

	let jobDetails = {
		// title: '',
		// description: '',
		// budget: 0,
		// recruiter: '',
		// deadline: null,
		// bidding: []

		title: 'Web Developer',
		description: 'Develop a front-end React app for a startup.',
		budget: 2000,
		recruiter: 'Anjali Gupta',
		deadline: new Date(2025, 5, 25),
		bidding: ['Sandeep', 'Neha']
	};

	// onMount(async () => {
	// 	try {
	// 		const response = await fetch(`http://jobs/${id}`);
	// 		if (!response.ok) {
	// 			throw new Error('Failed to fetch job details');
	// 		}
	// 		jobDetails = await response.json();
	// 	} catch (error) {
	// 		console.error('Error fetching job details:', error);
	// 		goto('/JobPost');
	// 	}
	// });

	function handleBid() {
		alert(`You have placed a bid on the job: ${jobDetails.title}`);
	}
</script>

<div class="job-details">
	<h1>{jobDetails.title}</h1>

	{#if jobDetails.description}
		<p>{jobDetails.description}</p>
	{/if}

	<p><strong>Posted by:</strong> {jobDetails.recruiter}</p>

	{#if jobDetails.deadline}
		<p><strong>Deadline:</strong> {jobDetails.deadline.toLocaleDateString()}</p>
	{/if}

	{#if jobDetails.budget !== undefined}
		<p><strong>Budget:</strong> ₹{jobDetails.budget}</p>
	{/if}

	{#if jobDetails.bidding.length > 0}
		<p><strong>Bidders:</strong> {jobDetails.bidding.join(', ')}</p>
	{/if}
	<button class="bid-button" on:click={handleBid}>Place Bid</button>
</div>

<style>
	.job-details {
		max-width: 800px;
		margin: 0 auto;
		margin-top: 3rem;
		padding: 2rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		font-family: 'Inter', sans-serif;
		line-height: 1.6;
	}

	h1 {
		font-size: 2.5rem;
		color: #2c3e50;
		margin-bottom: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.025em;
	}

	p {
		font-size: 1.1rem;
		color: #555;
		margin-top: 0.75rem;
		margin-bottom: 0.75rem;
	}

	strong {
		color: #2c3e50;
		font-weight: 600;
	}
	.bid-button {
		display: inline-block;
		background-color: #0d4715;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin-top: 1.5rem;
	}

	.bid-button:hover {
		background-color: #e9762b;
	}

	.bid-button:focus {
		outline: 2px solid #690b22;
		outline-offset: 2px;
	}
	@media (max-width: 768px) {
		.job-details {
			padding: 1.5rem;
			border-radius: 8px;
		}

		h1 {
			font-size: 2rem;
		}

		p {
			font-size: 1rem;
		}
	}
</style>
