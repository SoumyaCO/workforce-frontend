<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	interface Candidate {
		id: string;
		name: string;
		title?: string;
		avatar?: string;
		appliedDate: string;
		skills?: string[];
		status: 'pending' | 'approved' | 'denied';
	}

	let jobId: string = '';
	let jobTitle: string = '';
	let candidates: Candidate[] = [];
	let isLoading: boolean = true;
	let error: string | null = null;

	onMount(async () => {
		// dummy data
		jobId = '123';
		jobTitle = 'Senior Frontend Developer (React)';

		// Dummy candidates data
		candidates = [
			{
				id: '1',
				name: 'Amit Sharma',
				title: 'Frontend Developer',
				avatar: '/images/profile_1.png',
				appliedDate: '2023-05-15',
				skills: ['React', 'TypeScript', 'Svelte', 'CSS'],
				status: 'pending'
			},
			{
				id: '2',
				name: 'Sandeep Das',
				title: 'UI Engineer',
				avatar: '/images/profile_2.jpg',
				appliedDate: '2023-05-18',
				skills: ['JavaScript', 'HTML5', 'CSS3', 'UX Design'],
				status: 'pending'
			},
			{
				id: '3',
				name: 'Priya Desai',
				title: 'Full Stack Developer',
				avatar: '/images/profile_3.jpg',
				appliedDate: '2023-05-20',
				skills: ['React', 'Node.js', 'Express', 'MongoDB'],
				status: 'pending'
			}
		];

		isLoading = false;

		/*
		const pathParts = window.location.pathname.split('/');
		const id = pathParts[pathParts.length - 1];

		if (!id) {
			error = 'Job ID not found';
			isLoading = false;
			return;
		}

		jobId = id;

		try {
			const response = await fetch(`/api/jobs/${jobId}/candidates`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (!data.jobTitle || !Array.isArray(data.candidates)) {
				throw new Error('Invalid response format');
			}

			jobTitle = data.jobTitle;
			candidates = data.candidates.map((candidate: any) => ({
				...candidate,
				status: candidate.status || 'pending'
			}));

			isLoading = false;
		} catch (err) {
			isLoading = false;
		}
		*/
	});

	const updateCandidateStatus = async (candidateId: string, newStatus: 'approved' | 'denied') => {
		// for demo i just updated the local state
		candidates = candidates.map((candidate) =>
			candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
		);

		if (newStatus === 'approved') {
			approveCandidate(candidateId);
		} else if (newStatus === 'denied') {
			deniedCandidate(candidateId);
		}
		// API call:
		/*
		try {
			const response = await fetch(`/api/jobs/${jobId}/candidates/${candidateId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ status: newStatus })
			});

			if (!response.ok) {
				throw new Error(`Failed to update status: ${response.status}`);
			}

			candidates = candidates.map((candidate) =>
				candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
			);
		} catch (err) {
			console.error('Failed to update candidate status:', err);
		}
		*/
	};

	const approveCandidate = (candidateId: string) => {
		alert(`Candidate ${candidateId} Approved for the job  ${jobId} `);
	};

	const deniedCandidate = (candidateId: string) => {
		alert(`Candidate ${candidateId} Denaied for the job  ${jobId} `);
	};
</script>

<div class="manage-candidates-container">
	<h1>Manage Candidates for: {jobTitle}</h1>

	{#if isLoading}
		<div class="loading-spinner">Loading candidates...</div>
	{:else}
		<div class="candidates-list">
			{#each candidates as candidate (candidate.id)}
				<div class="candidate-card">
					<button
						class="candidate-header"
						on:click={() => goto(`/freelancers/${candidate.id}`)}
						type="button"
					>
						<img
							src={candidate.avatar}
							alt={`Profile picture of ${candidate.name}`}
							class="candidate-avatar"
						/>
						<div class="candidate-info">
							<h3>{candidate.name}</h3>
							<p>{candidate.title}</p>
						</div>
					</button>

					<div class="candidate-details">
						<p><strong>Applied:</strong> {candidate.appliedDate}</p>
						<p><strong>Skills:</strong> {candidate.skills?.join(', ')}</p>
						<p>
							<strong>Status:</strong>
							<span
								class="status-badge"
								class:approved={candidate.status === 'approved'}
								class:denied={candidate.status === 'denied'}
								class:pending={candidate.status === 'pending'}
							>
								{candidate.status}
							</span>
						</p>
					</div>

					<div class="candidate-actions">
						<button
							class="action-button approve"
							on:click={() => updateCandidateStatus(candidate.id, 'approved')}
							disabled={candidate.status === 'approved'}
						>
							Approve
						</button>
						<button
							class="action-button deny"
							on:click={() => updateCandidateStatus(candidate.id, 'denied')}
							disabled={candidate.status === 'denied'}
						>
							Deny
						</button>
						<button class="action-button view" on:click={() => goto(`/message/${candidate.id}`)}>
							Message
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 20px 20px;
		background-color: #f7f7f7;
		min-height: 100vh;
	}
	.manage-candidates-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 30px;
		color: #333;
	}

	.candidates-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 20px;
	}

	.loading-spinner {
		text-align: center;
		padding: 40px;
		font-size: 18px;
		color: #666;
	}

	.candidate-card {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 16px;
		background: #fdfefe;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s;
	}

	.candidate-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.candidate-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 12px;
		cursor: pointer;
	}

	.candidate-avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
	}

	.candidate-header h3 {
		margin: 0;
		font-size: 18px;
		color: #333;
	}

	.candidate-header p {
		margin: 4px 0 0;
		font-size: 14px;
		color: #666;
	}

	.candidate-details {
		margin-bottom: 16px;
		font-size: 14px;
		color: #555;
	}

	.candidate-details p {
		margin: 8px 0;
	}

	.status-badge {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 12px;
		color: white;
		font-size: 12px;
		margin-left: 6px;
	}

	.status-badge.pending {
		background-color: #ff9800;
	}

	.status-badge.approved {
		background-color: #4caf50;
	}

	.status-badge.denied {
		background-color: #f44336;
	}

	.candidate-actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.action-button {
		padding: 8px 12px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		transition: background-color 0.2s;
	}

	.action-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.action-button.approve {
		background-color: #4caf50;
		color: white;
	}

	.action-button.approve:not(:disabled):hover {
		background-color: #3d8b40;
	}

	.action-button.deny {
		background-color: #f44336;
		color: white;
	}

	.action-button.deny:not(:disabled):hover {
		background-color: #d32f2f;
	}

	.action-button.view {
		background-color: #2196f3;
		color: white;
	}

	.action-button.view:hover {
		background-color: #0b7dda;
	}
</style>
