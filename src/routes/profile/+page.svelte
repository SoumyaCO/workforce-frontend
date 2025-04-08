<script lang="ts">
	let freelancer: {
		id: number;
		name: string;
		email: string;
		skills: string[];
		portfolioURL: string;
		hourlyRate: number;
		rating: number;
		createdAt: string;
		department: string;
		profilePhoto: string;
		bio?: string;
	};

	// Sample data
	freelancer = {
		id: 1,
		name: 'Amit Sharma',
		email: 'Sharma.Amit@gamil.com',
		skills: ['JavaScript', 'Svelte', 'Node.js', 'HTML', 'CSS', 'TypeScript'],
		portfolioURL: 'https://johndoe.com',
		hourlyRate: 50,
		rating: 4.2,
		createdAt: '2023-10-01',
		department: 'Web Development',
		profilePhoto: '/images/profile_1.png',
		bio: 'Experienced Web Development professional with years of experience helping clients build robust and scalable solutions.'
	};

	let isEditing = false;
	let editedFreelancer = { ...freelancer };
	let newSkill = '';

	function toggleEdit() {
		isEditing = !isEditing;
		if (isEditing) {
			editedFreelancer = { ...freelancer };
		}
	}

	function saveProfile() {
		freelancer = { ...editedFreelancer };
		isEditing = false;
	}

	function addSkill() {
		if (newSkill.trim() && !editedFreelancer.skills.includes(newSkill.trim())) {
			editedFreelancer.skills = [...editedFreelancer.skills, newSkill.trim()];
			newSkill = '';
		}
	}

	function removeSkill(skillToRemove: string) {
		editedFreelancer.skills = editedFreelancer.skills.filter((skill) => skill !== skillToRemove);
	}
</script>

<main class="profile-page">
	<div class="profile-header">
		<div class="profile-avatar">
			{#if isEditing}
				<div class="avatar-edit">
					<img src={editedFreelancer.profilePhoto} alt="{editedFreelancer.name}'s profile photo" />
					<button class="edit-photo-btn">Change Photo</button>
				</div>
			{:else}
				<img src={freelancer.profilePhoto} alt="{freelancer.name}'s profile photo" />
			{/if}
		</div>
		<div class="profile-heading">
			{#if isEditing}
				<input type="text" bind:value={editedFreelancer.name} class="edit-input" />
				<input type="text" bind:value={editedFreelancer.department} class="edit-input" />
			{:else}
				<h1>{freelancer.name}</h1>
				<h2>{freelancer.department} Specialist</h2>
			{/if}
			<div class="rating-badge">
				<span class="stars" style="--rating: {freelancer.rating}"></span>
				<span class="rating-value">{freelancer.rating.toFixed(1)}</span>
				<span class="reviews">(24 reviews)</span>
			</div>
		</div>
		<div class="profile-actions">
			{#if isEditing}
				<button class="btn-save" on:click={saveProfile}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
						<polyline points="17 21 17 13 7 13 7 21"></polyline>
						<polyline points="7 3 7 8 15 8"></polyline>
					</svg>
					Save Profile
				</button>
				<button class="btn-cancel" on:click={toggleEdit}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
					Cancel
				</button>
			{:else}
				<button class="btn-edit" on:click={toggleEdit}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
						<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
					</svg>
					Edit Profile
				</button>
				<a href={freelancer.portfolioURL} class="btn-portfolio" target="_blank">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
						<polyline points="15 3 21 3 21 9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
					View Portfolio
				</a>
			{/if}
		</div>
	</div>

	<div class="profile-content">
		<section class="profile-section about-section">
			<h3>About Me</h3>
			{#if isEditing}
				<textarea bind:value={editedFreelancer.bio} class="edit-textarea" rows="4"></textarea>
			{:else}
				<p>{freelancer.bio}</p>
			{/if}
		</section>
		<section class="profile-section skills-section">
			<h3>Skills & Expertise</h3>
			{#if isEditing}
				<div class="skills-edit">
					<div class="skills-grid">
						{#each editedFreelancer.skills as skill}
							<div class="skill-item">
								<span class="skill-name">{skill}</span>
								<button class="remove-skill" on:click={() => removeSkill(skill)}>×</button>
							</div>
						{/each}
					</div>
					<div class="add-skill">
						<input type="text" bind:value={newSkill} placeholder="Add new skill" />
						<button class="btn-add" on:click={addSkill}> Add </button>
					</div>
				</div>
			{:else}
				<div class="skills-grid">
					{#each freelancer.skills as skill}
						<div class="skill-item">
							<span class="skill-name">{skill}</span>
							<div class="skill-level">
								<div class="skill-level-bar"></div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		<section class="profile-section pricing-section">
			<h3>Pricing</h3>
			<div class="pricing-cards">
				<div class="pricing-card">
					<h4>Hourly Rate</h4>
					{#if isEditing}
						<div class="price">
							₹<input
								type="number"
								bind:value={editedFreelancer.hourlyRate}
								class="rate-input"
							/>/hour
						</div>
					{:else}
						<div class="price">₹{freelancer.hourlyRate}<span>/hour</span></div>
					{/if}
					<ul class="features">
						<li>Flexible hours</li>
						<li>Pay as you go</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</main>

<style>
	:global(body) {
		background-color: #f7f7f7;
		background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 15px 15px;
		color: #000000;
	}

	.profile-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
		background-color: #f8f7f7;
		border-radius: 12px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
		margin-top: 2rem;
		margin-bottom: 2rem;
		border: 1px solid #e0e0e0;
	}

	.profile-header {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		align-items: center;
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e0e0e0;
	}

	.profile-avatar img {
		width: 160px;
		height: 160px;
		border-radius: 50%;
		object-fit: cover;
		border: 5px solid #ffffff;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.profile-heading h1 {
		font-size: 2.5rem;
		margin: 0 0 0.5rem;
		color: #000000;
		font-weight: 600;
		letter-spacing: -0.5px;
	}

	.profile-heading h2 {
		font-size: 1.2rem;
		margin: 0 0 1rem;
		color: #555555;
		font-weight: 400;
	}

	.rating-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.stars {
		--percent: calc(var(--rating) / 5 * 100%);
		display: inline-block;
		font-size: 1.2rem;
		font-family: Times;
		line-height: 1;
	}

	.stars::before {
		content: '★★★★★';
		letter-spacing: 3px;
		background: linear-gradient(90deg, #ffb400 var(--percent), #dddddd var(--percent));
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.rating-value {
		font-weight: bold;
		color: #ff9500;
	}

	.reviews {
		color: #777777;
		font-size: 0.9rem;
	}

	.profile-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 200px;
	}

	.btn-edit,
	.btn-save,
	.btn-cancel,
	.btn-portfolio,
	.btn-add {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.8rem 1.5rem;
		border-radius: 8px;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		font-weight: 500;
		border: none;
	}

	.btn-edit {
		background-color: #417f89;
		color: white;
		box-shadow: 0 2px 5px rgba(74, 107, 255, 0.1);
	}

	.btn-edit:hover {
		background-color: #46569b;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(74, 107, 255, 0.15);
	}

	.btn-save {
		background-color: #10b981;
		color: white;
		box-shadow: 0 2px 5px rgba(16, 185, 129, 0.1);
	}

	.btn-save:hover {
		background-color: #0d9f6e;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(16, 185, 129, 0.15);
	}

	.btn-cancel {
		background-color: transparent;
		color: #f43f5e;
		border: 1px solid #f43f5e;
	}

	.btn-cancel:hover {
		background-color: rgba(244, 63, 94, 0.05);
		transform: translateY(-2px);
	}

	.btn-portfolio {
		background-color: transparent;
		color: #4a6bff;
		border: 1px solid #4a6bff;
		text-decoration: none;
		box-shadow: 0 2px 5px rgba(74, 107, 255, 0.1);
	}

	.btn-portfolio:hover {
		background-color: rgba(74, 107, 255, 0.05);
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(74, 107, 255, 0.15);
	}

	.profile-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	.profile-section h3 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		color: #000000;
		position: relative;
		padding-bottom: 0.5rem;
		font-weight: 600;
	}

	.profile-section h3::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 50px;
		height: 3px;
		background-color: #4a6bff;
		border-radius: 3px;
	}

	.edit-input {
		width: 100%;
		padding: 0.75rem;
		margin-bottom: 0.75rem;
		font-size: 1rem;
		font-family: inherit;
		border: 1px solid #dddddd;
		border-radius: 6px;
		background-color: #ffffff;
		color: #000000;
		transition:
			border-color 0.3s,
			box-shadow 0.3s;
	}

	.edit-input:focus {
		outline: none;
		border-color: #46569b;
		box-shadow: 0 0 0 3px rgba(74, 107, 255, 0.1);
	}

	.edit-textarea {
		width: 100%;
		padding: 1rem;
		font-size: 1rem;
		font-family: inherit;
		border: 1px solid #dddddd;
		border-radius: 6px;
		resize: vertical;
		min-height: 120px;
		background-color: #ffffff;
		color: #000000;
		transition:
			border-color 0.3s,
			box-shadow 0.3s;
	}

	.edit-textarea:focus {
		outline: none;
		border-color: #46569b;
		box-shadow: 0 0 0 3px rgba(74, 107, 255, 0.1);
	}

	.avatar-edit {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.edit-photo-btn {
		background-color: #ffffff;
		color: #555555;
		border: 1px solid #dddddd;
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.3s;
	}

	.edit-photo-btn:hover {
		background-color: #f7f7f7;
		border-color: #cccccc;
	}

	.about-section p {
		line-height: 1.7;
		margin-bottom: 1rem;
		color: #333333;
		font-size: 1.05rem;
	}
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
		margin: 1rem 0;
	}

	.skill-item {
		display: flex;
		align-items: center;
		background: #baecc6;
		color: #0f7241;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
		border: 1px solid #c6f6d5;
		cursor: pointer;
		transition: all 0.5s ease;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.skill-item:hover {
		background: #27c373;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-color: #4b3959;
	}

	.skill-item:active {
		transform: translateY(0);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.skill-name {
		font-weight: 600;
		font-size: 0.95rem;
		letter-spacing: 0.5px;
		padding: 0 0.25rem;
		margin-right: 0.5rem;
	}

	.skills-edit .skills-grid {
		gap: 1rem;
	}

	.skills-edit .skill-item {
		padding: 0.75rem 1.25rem;
		justify-content: space-between;
		background: #edf2f7;
		border-color: #e2e8f0;
		color: #4a5568;
	}

	.skills-edit .skill-item:hover {
		background: #e2e8f0;
		color: #4a5568;
		border-color: #cbd5e0;
	}

	.remove-skill {
		background: none;
		border: none;
		color: #ff3b30;
		font-size: 1.2rem;
		cursor: pointer;
		margin-left: 8px;
		transition: transform 0.2s;
		text-shadow: none;
		z-index: 1;
	}

	.remove-skill:hover {
		transform: scale(1.2);
		color: #ff1a1a;
	}

	.add-skill {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 15px;
	}

	.add-skill input {
		flex: 1;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		border: 1px solid #dddddd;
		font-size: 1rem;
		background-color: #ffffff;
		color: #000000;
		transition:
			border-color 0.3s,
			box-shadow 0.3s;
	}

	.add-skill input:focus {
		outline: none;
		border-color: #46569b;
		box-shadow: 0 0 0 3px rgba(74, 107, 255, 0.1);
	}

	.add-skill .btn-add {
		background-color: #46cad4;
		color: white;
		padding: 0.75rem 1.25rem;
		border-radius: 8px;
		font-weight: 500;
		box-shadow: 0 2px 5px rgba(74, 107, 255, 0.1);
	}

	.add-skill .btn-add:hover {
		background-color: #3a5bef;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(74, 107, 255, 0.15);
	}

	.rate-input {
		width: 80px;
		padding: 0.5rem;
		text-align: center;
		border: 1px solid #dddddd;
		border-radius: 6px;
		background-color: #ffffff;
		color: #000000;
		font-size: 1rem;
		margin: 0 0.25rem;
	}

	.rate-input:focus {
		outline: none;
		border-color: #4861cd;
		box-shadow: 0 0 0 3px rgba(74, 107, 255, 0.1);
	}

	.pricing-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.pricing-card {
		background-color: #f7f7f7;
		padding: 2rem;
		border-radius: 12px;
		text-align: center;
		transition:
			transform 0.3s,
			box-shadow 0.3s;
		border: 1px solid #e0e0e0;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
	}

	.pricing-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		border-color: #4a6bff;
	}

	.pricing-card h4 {
		font-size: 1.3rem;
		margin-top: 0;
		margin-bottom: 1rem;
		color: #000000;
	}

	.price {
		font-size: 2.2rem;
		font-weight: 700;
		margin: 1.5rem 0;
		color: #673080;
	}

	.price span {
		font-size: 1rem;
		font-weight: normal;
		color: #777777;
	}

	.features {
		list-style: none;
		padding: 0;
		text-align: left;
		margin-top: 1.5rem;
	}

	.features li {
		margin-bottom: 0.75rem;
		position: relative;
		padding-left: 1.75rem;
		color: #555555;
	}

	.features li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #673080;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		.profile-header {
			flex-direction: column;
			text-align: center;
		}

		.profile-actions {
			width: 100%;
			flex-direction: row;
			justify-content: center;
			flex-wrap: wrap;
		}

		.rating-badge {
			justify-content: center;
		}

		.profile-avatar img {
			width: 140px;
			height: 140px;
		}
	}

	@media (max-width: 480px) {
		.profile-page {
			padding: 1.5rem;
		}

		.profile-heading h1 {
			font-size: 2rem;
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}

		.pricing-cards {
			grid-template-columns: 1fr;
		}
	}
</style>
