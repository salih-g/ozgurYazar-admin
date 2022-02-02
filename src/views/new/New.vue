<template>
	<div class="new container">
		<div>
			<div class="published">
				<input
					class="form-check-input"
					type="checkbox"
					id="flexCheckDefault"
					v-model="newContent.published"
				/>
				/>
				<label class="form-check-label" for="flexCheckDefault"> Paylas </label>
			</div>
			<div class="titleDesc">
				<div class="title">
					<label class="col-form-label col-form-label-lg mt-4" for="inputLarge"
						>Kitap ismi:</label
					>
					<input
						class="form-control form-control-lg"
						type="text"
						placeholder="İsimsiz kitap"
						v-model="newContent.title"
						required
					/>
				</div>
				<div class="desc">
					<label class="col-form-label col-form-label-lg mt-4" for="desc-editor"
						>Özet:</label
					>
					<VueEditor
						class="editor"
						id="desc-editor"
						v-model="newContent.desc"
					/>
				</div>
				<form class="newSection mb-4">
					<label class="col-form-label" for="inputDefault">Bölüm ismi:</label>
					<input
						type="text"
						class="form-control mb-4 w-30"
						placeholder="İsimsiz bölüm"
						v-model="newContent.sectionName"
						required
					/>
				</form>
				<button
					class="btn btn-lg btn-primary"
					@click.prevent="createContent(newContent)"
				>
					Kitabı kaydet
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	name: 'New',
	components: {
		VueEditor,
	},
	data() {
		return {
			newContent: {
				title: '',
				desc: '',
				published: false,
				sectionName: '',
			},
		};
	},

	methods: {
		...mapActions('content', ['createContent']),
	},
};
</script>

<style scoped>
.new {
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
