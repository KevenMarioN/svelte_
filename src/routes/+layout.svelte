<script lang="ts">
	import { goto, onNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import { authClient } from '$lib/auth/auth-client';
	import '@drop-in/graffiti';
	import './style.css';
	import { getUser } from './user.remote';

	let { children } = $props();

	const user = $derived(await getUser());

	function logout() {
		authClient.signOut({
			fetchOptions: {
				onSuccess: async () => {
					await getUser().refresh();
					goto(resolve('/auth/login'));
				}
			}
		});
	}

	onNavigate((navigate) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigate.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<div class="layout-readable center split">
		<a href={resolve('/')}>Blog</a>
		{#if user.id}
			<div class="center">
				<button onclick={logout}>logout</button>
				<a href={resolve('/admin')}>Posts</a>
			</div>
		{:else if page.url.pathname !== '/auth/login' && page.url.pathname !== '/auth/signup'}
			<button onclick={() => goto(resolve('/auth/login'))}>login</button>
		{/if}
	</div>
</header>

<main class="layout-readable center">
	{@render children()}
</main>
