<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth/auth-client';
	import { getUser } from '../../user.remote';

	interface LoginForm {
		email: string;
		password: string;
	}

	let error = $state<string>();
	let formData = $state<LoginForm>({
		email: '',
		password: ''
	});

	async function login(e: SubmitEvent) {
		e.preventDefault();

		if (!formData || !formData.email || !formData.password) {
			error = 'All fields are required';
			return;
		}

		if (formData.password.length < 8) {
			error = 'Password must be at least 8 characters long';
			return;
		}

		await authClient.signIn.email(
			{ email: formData.email, password: formData.password },
			{
				onSuccess: async () => {
					getUser().refresh();
					goto(resolve('/'));
				}
			}
		);
	}
</script>

<h1>Login</h1>

<div class="login">
	<form onsubmit={login}>
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
		{#if error}
			<p style:color="var(--red);">{error}</p>
		{/if}
		<button type="submit">Login</button>
	</form>
</div>

<p>
	Don't have an account? <a href={resolve('/auth/signup')}>Sign Up</a>
</p>
