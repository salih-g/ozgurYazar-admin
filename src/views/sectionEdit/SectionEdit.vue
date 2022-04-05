<template>
	<div class="container">
		<input
			type="text"
			class="form-control mb-4 w-30"
			:placeholder="section.title"
			v-model="section.title"
			required
		/>
		<VueEditor class="editor" id="desc-editor" />
	</div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import api from '../../api';

export default {
	name: 'SectionEdit',
	components: {
		VueEditor,
	},
	data() {
		return {
			section: {},
		};
	},
	async created() {
		await this.onFetchSectionById(this.$route.params.id);
	},
	methods: {
		async onFetchSectionById(id) {
			await api.fetchSectionById(id).then((response) => {
				this.section = response.data;
				console.log(response.data);
			});
		},
	},
};
</script>

<style></style>
