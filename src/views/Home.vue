<template>
	<div>
		<h1 class="text-center mb-5">İçerikler</h1>
		<div class="items">
			<div class="row">
				<div
					class="col-lg-6 col-md-12 mb-4 mb-lg-0"
					v-for="(content, index) in contents"
					:key="index"
				>
					<ItemCard :content="content" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ItemCard from './home/components/ItemCard.vue';

export default {
	name: 'Home',
	components: {
		ItemCard,
	},
	data() {
		return {
			localContents: [],
		};
	},
	async created() {
		await this.getContents();
	},
	computed: {
		...mapState('content', ['contents']),
	},
	methods: {
		...mapActions('content', ['getContents']),
	},
};
</script>

<style scoped>
.items {
	width: 90%;
	margin: 0 auto;
}
</style>
