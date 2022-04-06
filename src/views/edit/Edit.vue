<template>
	<div class="edit container">
		<div class="row">
			<div>
				<div class="published">
					<input
						class="form-check-input"
						type="checkbox"
						id="flexCheckDefault"
						:checked="content.published"
						v-model="content.published"
					/>
					/>

					<label class="form-check-label" for="flexCheckDefault">
						Paylas
					</label>
				</div>

				<div class="title-desc">
					<div class="title">
						<label
							class="col-form-label col-form-label-lg mt-4"
							for="inputLarge"
							>Kitap ismi:</label
						>
						<input
							class="form-control form-control-lg"
							type="text"
							placeholder="İsimsiz kitap"
							v-model="content.title"
							required
						/>
					</div>
					<div class="desc">
						<label
							class="col-form-label col-form-label-lg mt-4"
							for="desc-editor"
							>Özet:</label
						>
						<VueEditor class="editor" id="desc-editor" v-model="content.desc" />
					</div>
					<form class="new-section mb-4">
						<label class="col-form-label" for="inputDefault">Bölüm ismi:</label>
						<input
							type="text"
							class="form-control mb-4 w-30"
							placeholder="İsimsiz bölüm"
							v-model="sectionName"
							required
						/>
						<button
							class="btn btn-lg btn-primary mb-4"
							@click.prevent="createSectionHandler()"
							:disabled="!sectionName"
						>
							Yeni bölüm ekle
						</button>
					</form>
					<button
						class="btn btn-lg btn-primary"
						@click.prevent="updateContentHandler"
					>
						Kitabi Guncelle
					</button>
					<div class="delete">
						<button
							class="btn btn-lg btn-danger"
							@click.prevent="onDeleteBook()"
						>
							Kitabı sil
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-trash-2"
							>
								<polyline points="3 6 5 6 21 6"></polyline>
								<path
									d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
								></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div class="" v-for="(section, index) in content.sections" :key="index">
				<section class="mb-4 mt-4">
					<div class="list-group">
						<div class="list-group-item flex-column align-items-start">
							<div class="d-flex justify-content-between">
								<h5>Bölüm {{ index + 1 }}</h5>
								<div>
									Tamamlandi
									<input
										class="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										:checked="section.published"
										v-model="section.published"
										@click="
											updateSectionHandler(
												section._id,
												!section.published,
												section.title,
											)
										"
									/>
								</div>
							</div>
							<router-link :to="`/sections/${section._id}`" class="link">
								<p class="title">{{ section.title }}</p>
							</router-link>
						</div>
						<button
							type="button"
							class="btn btn-danger"
							@click="deleteSectionHandler(section._id)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="feather feather-trash-2"
							>
								<polyline points="3 6 5 6 21 6"></polyline>
								<path
									d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
								></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</button>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';

import router from '../../router';

export default {
	name: 'Edit',
	components: {
		VueEditor,
	},
	data() {
		return {
			content: {},
			sectionName: '',
		};
	},
	async created() {
		await this.getContentById(this.$route.params.id).then((r) => {
			this.content = r.data;
		});
	},
	methods: {
		...mapActions('content', [
			'getContentById',
			'createSection',
			'updateContent',
			'deleteContent',
			'updateSection',
			'deleteSection',
		]),

		async createSectionHandler() {
			this.content = await this.createSection({
				_id: this.content._id,
				sectionName: this.sectionName,
				published: false,
			});
		},

		async updateContentHandler() {
			this.content = await this.updateContent({
				_id: this.content._id,
				title: this.content.title,
				desc: this.content.desc,
				published: this.content.published,
			});
		},

		async updateSectionHandler(_id, published, title) {
			await this.updateSection({ _id, published, title });
		},

		async deleteSectionHandler(_id) {
			await this.deleteSection(_id).then(
				async () =>
					await this.getContentById(this.$route.params.id).then((r) => {
						this.content = r.data;
					}),
			);
		},

		async onDeleteBook() {
			await this.deleteContent(this.content._id).then(() => router.push('/'));
		},
	},
};
</script>

<style scoped>
.edit {
	width: 90%;
	margin: 0 auto;

	text-align: center;
}

.delete {
	position: absolute;
	left: 250px;
	bottom: 505px;
}
.published {
	position: absolute;
	right: 20px;
	top: 75px;
}
.form-check-label {
	margin-left: 20px;
}
.title-desc {
	text-align: left;
}
.new-section {
	display: flex;
	flex-direction: column;
}
</style>
