<template>
	<div class="mb-4">
		<div class="list-group">
			<router-link
				:to="`/edit/${content._id}`"
				class="list-group-item list-group-item-action flex-column align-items-start active"
			>
				<div class="d-flex w-100 justify-content-between">
					<h5>{{ content.title }}</h5>

					<small>{{ new Date(content.createdAt).toLocaleDateString() }} </small>
				</div>
				<p class="desc" v-html="content.desc"></p>
				<small>{{ content.published ? 'Paylaşıldı' : 'Paylaşılmadı' }} </small>
			</router-link>
		</div>
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
