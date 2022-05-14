<template>
	<div class="new container">
		<div>
			<h1>Yeni icerik olustur.</h1>
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
			<div class="title-desc">
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

					<textarea-autosize v-model="newContent.desc" />
				</div>
				<form class="new-section mb-4">
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
					Kitabi kaydet
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'New',

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
.title-desc {
	text-align: left;
}
.new-section {
	display: flex;
	flex-direction: column;
}

textarea {
	width: 100%;
	height: 150px;
	padding: 20px 60px;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	resize: none;
}
</style>
