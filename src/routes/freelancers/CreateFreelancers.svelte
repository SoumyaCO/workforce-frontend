<script>
	let formData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		skills: '',
		bio: '',
		portfolioUrl: '',
		hourlyRate: ''
	};

	let message = '';

	const handleSubmit = () => {
		if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
			message = 'Please fill in all required fields.';
			return;
		}

		console.log('Form Data Submitted:', formData);

		formData = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			skills: '',
			bio: '',
			portfolioUrl: '',
			hourlyRate: ''
		};
		message = 'Account created successfully!';
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<h2>Create Freelancing Account</h2>

	<label for="firstName">First Name:</label>
	<input type="text" id="firstName" bind:value={formData.firstName} required />

	<label for="lastName">Last Name:</label>
	<input type="text" id="lastName" bind:value={formData.lastName} required />

	<label for="email">Email:</label>
	<input type="email" id="email" bind:value={formData.email} required />

	<label for="password">Password:</label>
	<input type="password" id="password" bind:value={formData.password} required />

	<label for="skills">Skills (comma separated):</label>
	<input type="text" id="skills" bind:value={formData.skills} />

	<label for="bio">Bio:</label>
	<textarea id="bio" bind:value={formData.bio}></textarea>

	<label for="portfolioUrl">Portfolio URL:</label>
	<input type="url" id="portfolioUrl" bind:value={formData.portfolioUrl} />

	<label for="hourlyRate">Hourly Rate ($):</label>
	<input type="number" id="hourlyRate" bind:value={formData.hourlyRate} />

	<button type="submit">Create Account</button>

	{#if message}
		<div class="message">{message}</div>
	{/if}
</form>

<style>
	form {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	label {
		display: block;
		margin-bottom: 10px;
	}

	input,
	textarea {
		width: 100%;
		padding: 8px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		background-color: #4caf50;
		color: white;
		padding: 10px 15px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #45a049;
	}

	.message {
		margin-top: 10px;
		color: #ff0000;
	}
</form>
