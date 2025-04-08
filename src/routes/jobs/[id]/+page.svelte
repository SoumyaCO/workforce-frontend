<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// id from url
	let id: number;
	$: id = parseInt($page.params.id);

	// Dummy job details for testing
	let jobDetails = {
		title: 'Senior Frontend Developer (React/TypeScript)',
		description: `We're looking for an experienced frontend developer to join our team building cutting-edge web applications. You'll be working with React, TypeScript, and modern CSS to create beautiful, performant user interfaces.

Requirements:
- Experience with state management (Redux, Context API)
- Knowledge of modern CSS (Flexbox, Grid, CSS-in-JS)
- Familiarity with RESTful APIs and GraphQL
- Experience with testing frameworks (Jest, React Testing Library)`,
		budget: 85000,
		recruiter_id: 'TechCorp HR',
		deadline: '2025-12-10',
		skills: ['React', 'TypeScript', 'CSS', 'Redux', 'GraphQL']
	};

	// Dummy bidders data
	let bidders = [
		{
			id: 1,
			name: 'Alex Johnson',
			avatar: 'AJ',
			bidAmount: 80000,
			rating: 4.8,
			comment: 'I have 6 years experience with React and TypeScript.'
		},
		{
			id: 2,
			name: 'Sarah Williams',
			avatar: 'SW',
			bidAmount: 82000,
			rating: 4.5,
			comment: 'worked on similar projects.'
		},
		{
			id: 3,
			name: 'Michael Chen',
			avatar: 'MC',
			bidAmount: 78000,
			rating: 4.9,
			comment: 'Available to start immediately.'
		}
	];

	let loading = false;
	let error = null;
	let showBidForm = false;
	let bidAmount = '';
	let bidComment = '';

	function handleBid() {
		showBidForm = true;
	}

	function submitBid() {
		if (!bidAmount) return;

		// adding new bid to the list
		const newBid = {
			id: bidders.length + 1,
			name: 'You',
			avatar: 'YO',
			bidAmount: parseInt(bidAmount),
			rating: null,
			comment: bidComment
		};

		bidders = [...bidders, newBid];
		showBidForm = false;
		bidAmount = '';
		bidComment = '';

		alert(`Your bid of ₹${newBid.bidAmount.toLocaleString()} has been submitted!`);
	}

	// job details from backend
	onMount(async () => {
		try {
			loading = true;
			const response = await fetch(`http://localhost:8080/api/jobs/${id}`, {
				method: 'GET',
				credentials: 'include'
			});
			if (!response.ok) {
				throw new Error('Failed to fetch job details');
			}
			jobDetails = await response.json();
		} catch (err) {
			console.error('Error fetching job details:', err);
		} finally {
			loading = false;
		}
	});

	// format date
	function formatDate(dateString: string) {
		if (!dateString) return 'No deadline';
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	}
</script>

<div class="container">
	{#if loading}
		<div class="loading-spinner"></div>
	{:else if error}
		<div class="error-message">{error}</div>
	{:else}
		<article class="job-card">
			<header>
				<div class="job-header">
					<h1>{jobDetails.title}</h1>
					<div class="job-meta">
						<div class="budget-badge">
							<span class="budget">₹{jobDetails.budget.toLocaleString()}</span>
							<span class="budget-label">Budget</span>
						</div>
						<div class="deadline-badge">
							<i class="icon">⏳</i>
							<span>{formatDate(jobDetails.deadline)}</span>
						</div>
					</div>
				</div>

				<div class="skills-container">
					{#each jobDetails.skills as skill}
						<span class="skill-tag">{skill}</span>
					{/each}
				</div>
			</header>

			<div class="job-content">
				<section class="description">
					<h2>📝 Job Description</h2>
					<p>{jobDetails.description}</p>
				</section>

				<section class="recruiter-section">
					<h2>🧑‍💼 Recruiter Information</h2>
					<div class="recruiter-card">
						<div class="recruiter-avatar">
							{jobDetails.recruiter_id
								.split(' ')
								.map((word) => word[0])
								.join('')}
						</div>
						<div class="recruiter-details">
							<h3>{jobDetails.recruiter_id}</h3>
							<p>Tech Recruitment Specialist</p>
						</div>
					</div>
				</section>

				<section class="bids-section">
					<h2>💼 Current Bids ({bidders.length})</h2>
					<div class="bids-list">
						{#each bidders as bidder}
							<div class="bidder-card">
								<div class="bidder-avatar">{bidder.avatar}</div>
								<div class="bidder-info">
									<div class="bidder-header">
										<h3>{bidder.name}</h3>
										{#if bidder.rating}
											<span class="rating">⭐{bidder.rating}</span>
										{/if}
									</div>
									<div class="bid-amount">₹{bidder.bidAmount.toLocaleString()}</div>
									{#if bidder.comment}
										<p class="bid-comment">"{bidder.comment}"</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</section>
			</div>

			<footer class="job-footer">
				{#if !showBidForm}
					<button class="bid-button" on:click={handleBid}> ₹ Place Your Bid </button>
				{:else}
					<div class="bid-form">
						<h3>Submit Your Bid</h3>
						<div class="form-group">
							<label for="bidAmount">Your Bid Amount (₹)</label>
							<input
								type="number"
								id="bidAmount"
								bind:value={bidAmount}
								placeholder="Enter your bid amount"
							/>
						</div>
						<div class="form-group">
							<label for="bidComment">Comment (Optional)</label>
							<textarea
								id="bidComment"
								bind:value={bidComment}
								placeholder="Add any relevant information about your bid"
							></textarea>
						</div>
						<div class="form-actions">
							<button class="cancel-button" on:click={() => (showBidForm = false)}>Cancel</button>
							<button class="submit-button" on:click={submitBid}>Submit Bid</button>
						</div>
					</div>
				{/if}
			</footer>
		</article>
	{/if}
</div>

<style>
	:global(body) {
		background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 15px 15px;
		background-color: #f5f7fa;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
		color: #2d3748;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
	}

	.container {
		max-width: 900px;
		margin: 2rem auto;
		padding: 0 1.5rem;
	}

	.job-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		padding: 2rem;
		margin-bottom: 2rem;
		transition: all 0.3s ease;
	}

	.job-card:hover {
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.job-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 1.75rem;
		color: #1a365d;
		margin: 0;
		font-weight: 700;
		line-height: 1.3;
		max-width: 70%;
	}

	.job-meta {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.budget-badge {
		background: #f5f3ff;
		border: 1px solid #ddd6fe;
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		text-align: center;
	}

	.budget {
		font-weight: 700;
		color: #7c3aed;
		font-size: 1.1rem;
		display: block;
	}

	.budget-label {
		font-size: 0.75rem;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.deadline-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		color: #dd6b20;
		font-size: 0.9rem;
	}

	.skills-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.5rem 0;
	}

	.skill-tag {
		background: #f0fff4;
		color: #2f855a;
		padding: 0.35rem 0.75rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 500;
		border: 1px solid #c6f6d5;
	}

	.job-content {
		margin-top: 1.5rem;
	}

	h2 {
		font-size: 1.25rem;
		color: #2d3748;
		margin: 1.5rem 0 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.description p {
		color: #4a5568;
		font-size: 1.05rem;
		line-height: 1.7;
		white-space: pre-line;
	}

	.recruiter-section {
		margin-top: 2rem;
	}

	.recruiter-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: #f8fafc;
		border-radius: 8px;
		padding: 1rem;
		border: 1px solid #edf2f7;
	}

	.recruiter-avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #7c3aed;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.1rem;
	}

	.recruiter-details h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #1a365d;
	}

	.recruiter-details p {
		margin: 0.25rem 0 0;
		color: #718096;
		font-size: 0.9rem;
	}

	.bids-section {
		margin-top: 2.5rem;
	}

	.bids-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.bidder-card {
		display: flex;
		gap: 1rem;
		background: white;
		border-radius: 8px;
		padding: 1rem;
		border: 1px solid #e2e8f0;
		transition: all 0.2s ease;
	}

	.bidder-card:hover {
		border-color: #cbd5e0;
		transform: translateY(-2px);
	}

	.bidder-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #ecc94b;
		color: #744210;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		flex-shrink: 0;
	}

	.bidder-info {
		flex-grow: 1;
	}

	.bidder-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}

	.bidder-header h3 {
		margin: 0;
		font-size: 1rem;
		color: #2d3748;
	}

	.rating {
		background: #f0fff4;
		color: #38a169;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.bid-amount {
		font-weight: 700;
		color: #2b6cb0;
		font-size: 1.05rem;
		margin-bottom: 0.5rem;
	}

	.bid-comment {
		color: #4a5568;
		font-size: 0.9rem;
		margin: 0.5rem 0 0;
		font-style: italic;
	}

	.job-footer {
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid #edf2f7;
	}

	.bid-button {
		background: #7c3aed;
		color: white;
		border: none;
		padding: 0.875rem 1.75rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
	}

	.bid-button:hover {
		background: #6d28d9;
		transform: translateY(-1px);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.bid-button:active {
		transform: translateY(0);
	}

	.bid-form {
		background: #f8fafc;
		border-radius: 8px;
		padding: 1.5rem;
		border: 1px solid #e2e8f0;
	}
	.bid-amount {
		font-weight: 700;
		color: #7c3aed;
		font-size: 1.05rem;
		margin-bottom: 0.5rem;
	}
	.bid-form h3 {
		margin-top: 0;
		color: #2d3748;
		font-size: 1.2rem;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		color: #4a5568;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #cbd5e0;
		border-radius: 6px;
		font-family: inherit;
		font-size: 1rem;
	}

	.form-group textarea {
		min-height: 100px;
		resize: vertical;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 1rem;
	}

	.cancel-button {
		background: #e2e8f0;
		color: #4a5568;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.cancel-button:hover {
		background: #cbd5e0;
	}

	.submit-button {
		background: #48bb78;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.submit-button:hover {
		background: #38a169;
	}

	@media (max-width: 768px) {
		.job-header {
			flex-direction: column;
			gap: 1rem;
		}

		h1 {
			max-width: 100%;
			font-size: 1.5rem;
		}

		.job-meta {
			flex-direction: row;
			width: 100%;
		}

		.budget-badge,
		.deadline-badge {
			flex: 1;
		}
	}

	@media (max-width: 480px) {
		.job-card {
			padding: 1.5rem;
		}

		.form-actions {
			flex-direction: column;
		}

		.cancel-button,
		.submit-button {
			width: 100%;
		}
	}
</style>
