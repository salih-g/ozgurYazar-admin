<template>
	<div class="edit container">
		<div class="row">
			<div class="">
				<div class="published">
					<input
						class="form-check-input"
						type="checkbox"
						id="flexCheckDefault"
						:checked="content.published"
					/>
					/>

					<label class="form-check-label" for="flexCheckDefault">
						Paylas
					</label>
				</div>

				<div class="titleDesc">
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
					<form class="newSection mb-4">
						<label class="col-form-label" for="inputDefault">Bölüm ismi:</label>
						<input
							type="text"
							class="form-control mb-4 w-30"
							placeholder="İsimsiz bölüm"
							v-model="content.sectionName"
							required
						/>
						<button
							class="btn btn-lg btn-primary mb-4"
							@click.prevent="
								createSection({
									_id: content._id,
									sectionName: content.sectionName,
									published: content.published,
								})
							"
						>
							Yeni bölüm ekle
						</button>
					</form>
					<button class="btn btn-lg btn-primary" @click.prevent="createContent">
						Kitabi kaydet
					</button>
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
									/>
								</div>
							</div>
							<router-link :to="`/new/${section._id}`" class="link">
								<p class="title">{{ section.title }}</p>
							</router-link>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';

export default {
	name: 'Edit',
	components: {
		VueEditor,
	},
	data() {
		return {
			content: {},
		};
	},
	created() {
		this.getContentById(this.$route.params.id).then((r) => {
			this.content = r.data;
		});
	},
	computed: {},
	methods: {
		...mapActions('content', ['getContentById', 'createSection']),
	},
};
</script>

<style scoped>
.edit {
	width: 90%;
	margin: 0 auto;

	text-align: center;
}

.published {
	position: absolute;
	right: 20px;
	top: 75px;
}
.form-check-label {
	margin-left: 20px;
}
.titleDesc {
	text-align: left;
}
.newSection {
	display: flex;
	flex-direction: column;
}
</style>
