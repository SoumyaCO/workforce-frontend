<script lang="ts">
	// create recruiter
	let name: string|undefined = $state()
	let email: string|undefined = $state()
	let password: string|undefined = $state()
	let company_name: string|undefined = $state()
	
	let type: 'text' | 'password' = $state('password')

	function onchange() {
		type = type == 'password' ? 'text' : 'password'
	}

	async function onclick() {
		try {
			let res = await fetch(`http://localhost:8080/api/recruiters`, {
				method: 'POST',
				mode: 'no-cors',
				body: JSON.stringify({
					name: name,
					email: email,
					password: password,
					company_name: company_name
				})
			});
			console.log('res:\n', res.json());
		} catch (error) {
			console.log('Error: \n', error);
		}
	}
</script>

<div class="user-profile-form">
	<h2>User Profile</h2>
	<div class="form-group">
		<label for="name">Name</label>
		<input type="text" id="name" placeholder="Enter your name"  bind:value={name}/>
	</div>

	<div class="form-group">
		<label for="email">Email ID</label>
		<input type="email" id="email" placeholder="Enter your email"  bind:value={email}/>
	</div>

	<div class="form-group">
		<label for="company">Company Name</label>
		<input type="text" id="company" placeholder="Enter your company name" bind:value={company_name}/>
	</div>

	<div class="form-group">
		<label for="companyId">Passsword</label>
		<input {type} id="password" placeholder="Password" bind:value={password}/>
	</div>

	<br />
	<input type="checkbox" {onchange} /> See password
	<br />

	<button class="submit-btn" {onclick}>Submit</button>
</div>

<style>
	.user-profile-form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: teal;
		width: 100%;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		width: 300px;
	}

	.form-group {
		margin-bottom: 15px;
	}

	.form-group label {
		display: block;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.form-group input {
		width: 100%;
		padding: 10px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.form-group input:focus {
		border-color: #007bff;
		outline: none;
	}

	.submit-btn {
		width: 100%;
		padding: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.submit-btn:hover {
		background-color: #0056b3;
	}
</style>
