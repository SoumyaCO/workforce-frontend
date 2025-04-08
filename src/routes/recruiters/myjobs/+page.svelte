<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let activesection: 'posted' | 'running' | 'completed' | null = null;
	$: {
		//'$:' reactive Statement auto re runs when its dependencies change urlParams  primary dependency
		const urlParams = new URLSearchParams($page.url.search); // geting URL's query parameters using URLSearchParams
		const section = urlParams.get('section') as 'posted' | 'running' | 'completed' | null;

		// Only update from URL if valid
		if (section && ['posted', 'running', 'completed'].includes(section)) {
			activesection = section;
		} else if (!section) {
			activesection = null;
		}
	}

	const toggleSection = (section: typeof activesection) => {
		// toggle: close if already open, open if closed
		let newSection: string | null;
		if (activesection === section) {
			newSection = null;
		} else {
			newSection = section;
		}
		goto(newSection ? `/recruiters/myjobs/?section=${newSection}` : '/recruiters/myjobs/', {
			replaceState: true
		});
	};

	// Sample data
	const postedJobs = [
		{
			id: 1,
			title: 'Frontend Developer',
			postedDate: '2023-05-15',
			applicants: 24,
			status: 'Reviewing'
		},
		{
			id: 2,
			title: 'UX Designer',
			postedDate: '2023-05-20',
			applicants: 15,
			status: 'discussing'
		}
	];

	const runningJobs = [
		{
			id: 3,
			title: 'Backend Engineer',
			postedDate: '2023-04-10',
			applicants: 42,
			status: 'running'
		}
	];

	const completedJobs = [
		{
			id: 4,
			title: 'Backend developer',
			postedDate: '2023-01-05',
			completedDate: '2023-03-15',
			hired: 1,
			status: 'completed'
		},
		{
			id: 5,
			title: 'DevOps Specialist',
			postedDate: '2022-11-20',
			completedDate: '2023-02-10',
			hired: 0,
			status: 'Closed'
		}
	];
</script>

<div class="jobs-page">
	<div class="jobs-header">
		<h1>My Jobs</h1>
	</div>

	<div class="jobs-container">
		<!-- Posted Jobs -->
		<div class="jobs-section">
			<div class="section-header {activesection === 'posted' ? 'active' : ''}">
				<button
					class="section-toggle"
					on:click={() => toggleSection('posted')}
					aria-expanded={activesection === 'posted'}
					aria-controls="posted-section"
				>
					<span class="section-title">Posted Jobs ({postedJobs.length})</span>
					<span class="section-icon" aria-hidden="true">
						{activesection === 'posted' ? '▼' : '▶'}
					</span>
				</button>
			</div>

			{#if activesection === 'posted'}
				<div class="section-content">
					{#if postedJobs.length === 0}
						<div class="empty-state">
							<p>You haven't posted any jobs yet.</p>
							<button class="post-job-button" on:click={() => goto('/recruiters/jobs/new')}>
								Post a New Job
							</button>
						</div>
					{:else}
						<div class="jobs-grid">
							{#each postedJobs as job}
								<div class="job-card">
									<div class="job-header">
										<h3>{job.title}</h3>
										<span class="job-status {job.status.toLowerCase()}">{job.status}</span>
									</div>
									<div class="job-details">
										<p><strong>Posted:</strong> {job.postedDate}</p>
									</div>
									<div class="job-stats">
										<span class="applicants">👥 {job.applicants} applicants</span>
									</div>
									<div class="job-actions">
										<button
											class="action-button view"
											on:click={() => goto(`/recruiters/myjobs/${job.id}`)}
										>
											View Details
										</button>
										<button
											class="action-button edit"
											on:click={() => goto(`/recruiters/myjobs/${job.id}/edit`)}
										>
											Edit
										</button>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Running Jobs  -->
		<div class="jobs-section">
			<button
				class="section-header {activesection === 'running' ? 'active' : ''}"
				on:click={() => toggleSection('running')}
			>
				<span class="section-title">Running Jobs ({runningJobs.length})</span>
				<span class="section-icon">{activesection === 'running' ? '▼' : '▶'}</span>
			</button>

			{#if activesection === 'running'}
				<div class="section-content">
					{#if runningJobs.length === 0}
						<div class="empty-state">
							<p>You don't have any jobs in progress.</p>
						</div>
					{:else}
						<div class="jobs-grid">
							{#each runningJobs as job}
								<div class="job-card">
									<div class="job-header">
										<h3>{job.title}</h3>
										<span class="job-status {job.status.toLowerCase()}">{job.status}</span>
									</div>
									<div class="job-details">
										<p><strong>Posted:</strong> {job.postedDate}</p>
									</div>
									<div class="job-stats">
										<span class="applicants">👥 {job.applicants} applicants</span>
									</div>
									<div class="job-actions">
										<button
											class="action-button view"
											on:click={() => goto(`/recruiters/myjobs/${job.id}`)}
										>
											View Details
										</button>
										<button
											class="action-button manage"
											on:click={() => goto(`/recruiters/myjobs/${job.id}/candidates`)}
										>
											Manage Candidates
										</button>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Completed Jobs  -->
		<div class="jobs-section">
			<button
				class="section-header {activesection === 'completed' ? 'active' : ''}"
				on:click={() => toggleSection('completed')}
			>
				<span class="section-title">Completed Jobs ({completedJobs.length})</span>
				<span class="section-icon">{activesection === 'completed' ? '▼' : '▶'}</span>
			</button>

			{#if activesection === 'completed'}
				<div class="section-content">
					{#if completedJobs.length === 0}
						<div class="empty-state">
							<p>You haven't completed any jobs yet.</p>
							<p>Completed jobs will appear when the job is fully submited.</p>
						</div>
					{:else}
						<div class="jobs-grid">
							{#each completedJobs as job}
								<div class="job-card">
									<div class="job-header">
										<h3>{job.title}</h3>
										<span class="job-status {job.status.toLowerCase()}">{job.status}</span>
									</div>
									<div class="job-details">
										<p><strong>Posted:</strong> {job.postedDate}</p>
										<p><strong>Completed:</strong> {job.completedDate}</p>
									</div>
									<div class="job-stats">
										{#if job.hired > 0}
											<span class="hired">✅ Hired {job.hired} candidate</span>
										{:else}
											<span class="not-hired">❌ No hires</span>
										{/if}
									</div>
									<div class="job-actions">
										<button
											class="action-button view"
											on:click={() => goto(`/recruiters/jobs/${job.id}`)}
										>
											View Details
										</button>
										<button
											class="action-button repost"
											on:click={() => goto(`/recruiters/jobs/new?template=${job.id}`)}
										>
											Repost
										</button>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(body) {
		background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 20px 20px;
		background-color: #f7f7f7;
		min-height: 100vh;
	}

	.jobs-page {
		padding: 2rem;
		max-width: 1100px;
		margin: 0 auto;
		font-family: 'Arial', sans-serif;
	}

	.jobs-container {
		background: #c1d8c3;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	.jobs-header h1 {
		font-size: 2.5rem;
		color: #333;
		margin-bottom: 3rem;
		position: relative;
		display: inline-block;
	}

	.jobs-header h1::after {
		content: '';
		border-radius: 50px;
		position: absolute;
		left: 0;
		bottom: -0.5rem;
		width: 70%;
		height: 3.5px;
		background-color: rgb(88, 87, 87);
	}

	.jobs-section {
		border-bottom: 1px solid #c1d8c3;
	}

	.section-header {
		width: 100%;
		padding: 1.2rem 1.5rem;
		background: #f8f9fa;
		border: none;
		display: flex;
		align-items: center;
		cursor: pointer;
		transition: background-color 0.2s;
		text-align: left;
	}

	.section-toggle {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		text-align: left;
		transition: background-color 0.2s;
	}

	.section-toggle:hover {
		background: #e9ecef;
	}

	.section-toggle.active {
		background: #e9ecef;
		font-weight: bold;
	}

	.section-title {
		font-size: 1.2rem;
		color: #333;
		flex-grow: 1;
	}

	.section-icon {
		font-size: 0.9rem;
		color: #666;
		margin-left: 1rem;
	}
	.section-header:hover {
		background: #e9ecef;
	}

	.section-header.active {
		background: #e9efeb;
		font-weight: bold;
	}

	.section-title {
		font-size: 1.2rem;
		color: #333;
	}

	.section-icon {
		font-size: 0.9rem;
		color: #666;
	}

	.section-content {
		padding: 1.5rem;
		background: #fbfaf7;
		animation: fadeIn 0.3s ease-out;
	}

	.empty-state {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	.jobs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.job-card {
		border: 1px solid #918686;
		border-radius: 8px;
		padding: 1.2rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.job-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.job-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.8rem;
	}

	.job-header h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #333;
	}

	.job-status {
		font-size: 0.8rem;
		padding: 0.3rem 0.6rem;
		border-radius: 12px;
		font-weight: bold;
	}

	.job-status.reviewing {
		background: #fff3cd;
		color: #856404;
	}

	.job-status.accepting {
		background: #d4edda;
		color: #155724;
	}

	.job-status.discussing {
		background: #cce5ff;
		color: #004085;
	}
	.job-status.running {
		background: #d4edda;
		color: #155724;
	}
	.job-status.completed {
		background: #d4edda;
		color: #155724;
	}

	.job-status.closed {
		background: #f8d7da;
		color: #721c24;
	}

	.job-details {
		margin-bottom: 1rem;
	}

	.job-details p {
		margin: 0.3rem 0;
		font-size: 0.9rem;
		color: #555;
	}

	.job-stats {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.applicants,
	.interviews,
	.hired,
	.not-hired {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.hired {
		color: #28a745;
	}

	.not-hired {
		color: #dc3545;
	}

	.job-actions {
		display: flex;
		gap: 0.8rem;
	}

	.action-button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
		transition: background-color 0.2s;
	}

	.action-button.view {
		background: #f8f9fa;
		color: #333;
	}

	.action-button.view:hover {
		background: #e9ecef;
	}

	.action-button.edit {
		background: #ffc107;
		color: #212529;
	}

	.action-button.edit:hover {
		background: #e0a800;
	}

	.action-button.manage {
		background: #17a2b8;
		color: white;
	}

	.action-button.manage:hover {
		background: #138496;
	}

	.action-button.repost {
		background: #6c757d;
		color: white;
	}

	.action-button.repost:hover {
		background: #5a6268;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.jobs-page {
			padding: 1rem;
		}

		.jobs-header h1 {
			font-size: 2rem;
		}

		.jobs-grid {
			grid-template-columns: 1fr;
		}

		.job-actions {
			flex-direction: column;
		}

		.action-button {
			width: 100%;
		}
	}
</style>
