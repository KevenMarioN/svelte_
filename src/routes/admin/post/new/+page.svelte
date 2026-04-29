<script lang="ts">
	import { createPost } from '../../posts.remote';
</script>

<form {...createPost}>
	<div class="row">
		<label
			>Title: <br />
			<input {...createPost.fields.title.as('text')} />
		</label>
	</div>
	<div class="row">
		<label>
			Body: <br />
			<textarea {...createPost.fields.content.as('text')}></textarea>
		</label>
	</div>
	<button type="submit">Post</button>
</form>
