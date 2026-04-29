<script lang="ts">
	import { page } from '$app/state';
	import { getPostBySlug } from '../../admin/posts.remote';

	const post = await getPostBySlug(page.params.slug!);
</script>

{#if post}
	<section>
		<h1 style:view-transition-name={`heading-${post.slug}`}>{post.title}</h1>
		<p>{post.content}</p>
	</section>
{/if}
