<!-- <script lang="ts">
	let jobDetails: {
		title: string;
		description?: string;
		budget?: Float64Array;
		recruiter: string;
		deadline?: Date;
		bidding?: Array<string>;
	} = $props();
</script> -->

<script lang="ts">
	export let id: number;
	export let title: string;
	export let description: string = '';
	export let budget: number | undefined = undefined;
	export let recruiter: string;
	export let deadline: Date | undefined = undefined;
	export let bidding: Array<string> = [];
</script>

<a href={`/jobs/${id}`} class="job-card">
	<div class="job-card-header">
		<h3>{title}</h3>

		{#if description}
			<p>{description}</p>
		{/if}

		<p><strong>Posted by:</strong> {recruiter}</p>

		{#if deadline}
			<p><strong>Deadline:</strong> {deadline.toLocaleDateString()}</p>
		{/if}

		{#if budget !== undefined}
			<p><strong>Budget:</strong> ₹{budget}</p>
		{/if}

		{#if bidding.length > 0}
			<p><strong>Bidders:</strong> {bidding.join(',')}</p>
		{/if}
	</div>
	<div class="job-card-footer">
		<button class="apply-btn">Apply Now</button>
	</div>
</a>

<style>
	.job-card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin-top: 2rem;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		width: 300px;
		min-height: 350px;
	}

	.job-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}

	.job-card-header {
		margin-bottom: 20px;
	}

	.job-card-header h3 {
		font-size: 1.5rem;
		margin: 0;
		color: #333;
	}

	.job-card-header p {
		font-size: 1rem;
		color: #555;
		margin-top: 8px;
	}

	.apply-btn {
		background-color: #4caf50;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}

	.apply-btn:hover {
		background-color: #45a049;
	}
</style>
