<script>
	import { page } from '$app/state';
	let id = page.params.id;
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let recruiterInfo = {
		id: 0,
		name: '',
		email: '',
		company_name: '',
	}

	onMount(async () => {
		try {
			const response = await fetch(`http://localhost:8080/api/recruiters/${id}`, {
                "method": "GET",
                "credentials": "include",
            });
			if (!response.ok) {
				throw new Error('Failed to fetch job details');
			}
			recruiterInfo = await response.json();
			console.log("recruiterinfo", recruiterInfo)
		} catch (error) {
			console.error('Error in recruiter fetching', error);
			alert("You don't have account. Register here.")
			goto('/register');
		}
	});
	// fetch recruiters and show it here
</script>
<div class="container">
	<div class="details">
		<h2>{recruiterInfo.name}</h2>
		<p><strong>ID:</strong> {recruiterInfo.id}</p>
		<p><strong>Email:</strong> {recruiterInfo.email}</p>
		<p><strong>Company Name:</strong> {recruiterInfo.company_name}</p>
	</div>
</div>


<style>
	.container {
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%, -50%);
		width: fit-content;
		background-color:lavender;
		padding: 20px;
		margin: 10px;
		color:black;

		/* styling */
		border-radius: 5px;
		border: 2px solid black;
		box-shadow: gray 10px 10px 10px;
		transition:
			transform 0.5s ease,
			box-shadow 0.5s ease;
	}

	.container:hover {
		transform: translate(-49%, -49%);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}


	.details {
		flex: 1;
	}

	h2 {
		font-size: 3rem;
		margin: 0 0 12px;
		color: #333;
	}

	p {
		font-size: 1.8rem;
		margin: 6px 0;
		color: #555;
	}
	strong {
		color: #333;
	}
</style>