<script lang="ts">
	let jobDetails: {
		title: string;
		description?: string;
		budget?: Float64Array;
		recruiter: string;
		deadline?: Date;
		bidding?: Array<string>;
	} = $props();
</script>

<div>
	<h3>{jobDetails.title}</h3>
	<p>{jobDetails.description}</p>
	<h6>{jobDetails.recruiter}</h6>
</div>
