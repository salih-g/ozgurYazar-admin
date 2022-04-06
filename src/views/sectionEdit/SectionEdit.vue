<template>
	<div class="sectionEdit container">
		<div>
			<h1>Bölümü düzenle.</h1>
			<div class="published">
				<input
					class="form-check-input"
					type="checkbox"
					id="flexCheckDefault"
					:checked="section.published"
					v-model="section.published"
				/>
				/>
				<label class="form-check-label" for="flexCheckDefault"> Paylas </label>
			</div>
			<div class="save">
				<button
					class="btn btn-lg btn-primary"
					@click.prevent="onUpdateSection()"
				>
					Bölümü kaydet
				</button>
			</div>
			<div class="title-content">
				<div class="title">
					<label class="col-form-label col-form-label-lg mt-4" for="inputLarge"
						>Bölüm ismi:</label
					>
					<input
						class="form-control form-control-lg"
						type="text"
						placeholder="İsimsiz kitap"
						v-model="section.title"
						required
					/>
				</div>
				<div class="desc">
					<label class="col-form-label col-form-label-lg mt-4" for="desc-editor"
						>İçerik:</label
					>
					<VueEditor
						class="editor"
						id="desc-editor"
						v-model="section.content"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { mapActions } from 'vuex';
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
		...mapActions('content', ['updateSection']),

		async onFetchSectionById(id) {
			this.section = await (await api.fetchSectionById(id)).data;
		},

		async onUpdateSection() {
			this.section = await this.updateSection({
				_id: this.section._id,
				title: this.section.title,
				content: this.section.content,
				published: this.section.published,
			});
		},
	},
};
</script>

<style scoped>
.sectionEdit {
	width: 90%;
	margin: 0 auto;

	text-align: center;
}
.save {
	position: absolute;
	right: 20px;
	top: 100px;
}
.published {
	position: absolute;
	right: 20px;
	top: 75px;
}
.form-check-label {
	margin-left: 20px;
}
.title-content {
	text-align: left;
}
.new-section {
	display: flex;
	flex-direction: column;
}
</style>
