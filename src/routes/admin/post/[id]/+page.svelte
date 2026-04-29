<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import * as v from 'valibot';
	import { getPostByID, updatePost } from '../../posts.remote';

	if (!v.UUID_REGEX.test(page.params.id!)) {
		throw error(400, 'Invalid format param');
	}

	const post = await getPostByID(page.params.id!);
	if (!post) {
		throw error(404, 'Not found');
	}
</script>

<form {...updatePost}>
	<div class="row">
		<label>
			ID:
			<br />
			<input {...updatePost.fields.id.as('text')} value={post.id} readonly />
		</label>
	</div>
	<div class="row">
		<label>
			Title:
			<br />
			<input {...updatePost.fields.title.as('text')} value={post.title} />
		</label>
	</div>
	<div class="row">
		<label>
			Body:
			<br />
			<textarea {...updatePost.fields.content.as('text')} value={post.content}></textarea>
		</label>
	</div>
	<button type="submit">Update</button>
</form>
