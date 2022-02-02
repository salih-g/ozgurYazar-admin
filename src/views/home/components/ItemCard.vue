<template>
	<div class="mb-4">
		<div class="list-group">
			<router-link
				:to="`/edit/${content._id}`"
				class="list-group-item list-group-item-action flex-column align-items-start active"
			>
				<div class="d-flex w-100 justify-content-between">
					<h5>{{ content.title }}</h5>
					<small> days ago</small>
				</div>
				<p class="desc" v-html="content.desc"></p>
			</router-link>
			<div class="published">
				<input
					class="form-check-input"
					type="checkbox"
					id="flexCheckDefault"
					:checked="content.published"
				/>
				/>
				<label class="form-check-label" for="flexCheckDefault">Paylas </label>
			</div>
		</div>
		<pre>{{ content }}</pre>
	</div>
</template>

<script>
export default {
	name: 'ItemCard',
	props: {
		content: Object,
	},
};
</script>

<style scoped>
.desc {
	font-style: italic;
	font-weight: 400;
	font-size: 18px;
	font-family: 'Roboto Condensed', sans-serif;

	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 10;
	-webkit-box-orient: vertical;
}
.published {
	margin-left: 5px;
	margin-bottom: 5px;
	color: white;
}
</style>
