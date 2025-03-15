<script lang="ts">
	export let id: number;
	export let name: string;
	export let email: string;
	export let skills: string[];
	export let portfolioURL: string;
	export let hourlyRate: number;
	export let createdAt: string;
	export let department: string;
	export let profilePhoto: string;
</script>

<div class="card">
	<img src={profilePhoto} alt={`${name}'s profile photo`} class="profile-photo" />
	<div class="details">
		<h2>{name}</h2>
		<p><strong>ID:</strong> {id}</p>
		<p><strong>Email:</strong> {email}</p>
		<p><strong>Skills:</strong> {skills.join(', ')}</p>
		<p>
			<strong>Portfolio URL:</strong>
			<a href={portfolioURL} target="_blank" class="portfolio-link">{portfolioURL}</a>
		</p>
		<p><strong>Hourly Rate:</strong> <span class="hourly-rate">₹{hourlyRate}</span></p>
		<p><strong>Created At:</strong> {createdAt}</p>
		<p><strong>Department:</strong> <span class="department">{department}</span></p>
	</div>
</div>

<style>
	.card {
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		padding: 20px;
		background-color: #ffffff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	.profile-photo {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-right: 20px;
		object-fit: cover;
		border: 3px solid #007bff;
	}

	.details {
		flex: 1;
	}

	h2 {
		margin: 0 0 12px;
		font-size: 1.5rem;
		color: #333;
	}

	p {
		margin: 6px 0;
		font-size: 0.95rem;
		color: #555;
	}

	strong {
		color: #333;
	}

	.portfolio-link {
		color: #007bff;
		text-decoration: none;
	}

	.portfolio-link:hover {
		text-decoration: underline;
	}

	.hourly-rate {
		color: #28a745;
		font-weight: bold;
	}

	.department {
		color: #dc3545;
		font-weight: bold;
	}
</style>
