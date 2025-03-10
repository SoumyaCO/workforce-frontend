<script lang="ts">
	// let profileDetails: {
	//     id: number,
	//     name: string,
	//     email: string,
	//     companyName: string,
	//     createAt: Date,
	//     UpdatedAt: Date
	// } = $props()

	let readonly = $state(true);
	let displaySaveButton = $state('display: none');

	function editProfile() {
		readonly = false;
		displaySaveButton = 'display: block';
	}

	async function saveProfile() {
		// update profile then hide the save button
		displaySaveButton = 'display: none';
		readonly = true;
	}

	/* 
----------------------
[photo] fullname [edit]
email createdAt
company Name
-----------------------
jobs
[side scrolling cards]
[card 1] [card 2] [card 3]
----------------------
*/
</script>

<div class="user-profile-form">
	<h2>User Profile</h2>
	<div class="form-group">
		<label for="name">Name</label>
		<input type="text" id="name" placeholder="Enter your name" />
	</div>

	<div class="form-group">
		<label for="email">Email ID</label>
		<input type="email" id="email" placeholder="Enter your email" />
	</div>

	<div class="form-group">
		<label for="company">Company Name</label>
		<input type="text" id="company" placeholder="Enter your company name" />
	</div>

	<div class="form-group">
		<label for="companyId">Company ID</label>
		<input type="text" id="companyId" placeholder="Enter your company ID" />
	</div>

	<button class="submit-btn">Submit</button>
</div>

<style>
	.user-profile-form {
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
		background-color:teal;
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
