<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth/auth-client';
	import { getUser } from '../../user.remote';

	interface SignUpForm {
		username: string;
		email: string;
		password: string;
		password_confirm: string;
	}

	let error = $state<string>();
	let formData = $state<SignUpForm>({
		username: '',
		email: '',
		password: '',
		password_confirm: ''
	});

	async function signup(e: SubmitEvent) {
		e.preventDefault();

		if (
			!formData ||
			!formData.username ||
			!formData.email ||
			!formData.password ||
			!formData.password_confirm
		) {
			error = 'All fields are required';
			return;
		}

		if (formData.password !== formData.password_confirm) {
			error = "Passwords don't match";
			return;
		}

		if (formData.password.length < 8) {
			error = 'Password must be at least 8 characters long';
			return;
		}

		await authClient.signUp.email(
			{ email: formData.email, password: formData.password, name: formData.username },
			{
				onSuccess: async () => {
					getUser().refresh();
					goto(resolve('/'));
				}
			}
		);
	}
</script>

<h1>Sign Up</h1>

<div class="signup">
	<form onsubmit={signup}>
		<div class="row">
			<label>
				Username:
				<input type="text" bind:value={formData.username} placeholder="Username" />
			</label>
		</div>
		<div class="row">
			<label>
				Email:
				<input type="email" bind:value={formData.email} placeholder="Email" />
			</label>
		</div>
		<div class="row">
			<label>
				Password:
				<input type="password" bind:value={formData.password} placeholder="Password" />
			</label>
		</div>
		<div class="row">
			<label>
				Confirm Password:
				<input
					type="password"
					bind:value={formData.password_confirm}
					placeholder="Password Confirm"
				/>
			</label>
		</div>
		{#if error}
			<p style:color="var(--red);">{error}</p>
		{/if}
		<button type="submit">Sign Up</button>
	</form>
</div>

<p>
	Already have an account? <a href={resolve('/auth/login')}>Login</a>
</p>
