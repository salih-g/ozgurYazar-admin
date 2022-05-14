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
					Bölümü güncelle
				</button>
			</div>
			<div class="delete">
				<button
					class="btn btn-lg btn-danger"
					@click.prevent="onDeleteSection()"
				>
					Bölümü sil
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
					<div class="col-form-label col-form-label-lg text-center">
						Sayfa Sayısı: {{ Math.floor(words / 500) + 1 }} | Kelime:
						{{ words }}
					</div>
					<textarea-autosize v-model="section.content" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

import router from '../../router';
import api from '../../api';

export default {
	name: 'SectionEdit',

	data() {
		return {
			section: {},
		};
	},
	async created() {
		await this.onFetchSectionById(this.$route.params.id);
	},
	computed: {
		words() {
			return this.section.content.split(' ').length - 1;
		},
	},
	methods: {
		...mapActions('content', ['updateSection', 'deleteSection']),

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

		async onDeleteSection() {
			await this.deleteSection(this.section._id).then(() => router.push('/'));
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
.delete {
	position: absolute;
	right: 20px;
	top: 165px;
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

textarea {
	width: 100%;
	min-height: 500px;
	padding: 20px 60px;
	border: 2px solid !important;
	border-radius: 4px;
	font-size: 16px;
	resize: none;
}
</style>
