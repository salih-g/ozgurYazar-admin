<template>
	<div class="login mt-3">
		<form class="loginForm text-center">
			<fieldset>
				<div
					class="alert alert-dismissible alert-danger"
					v-if="loginError != ''"
				>
					<strong>{{ loginError }}</strong>
				</div>

				<legend>Giris Yapın</legend>
				<div class="form-group">
					<label for="username" class="form-label mt-4">Username</label>
					<input
						type="username"
						class="form-control"
						id="username"
						placeholder="username"
						v-model="user.username"
					/>
				</div>
				<div class="form-group">
					<label for="password" class="form-label mt-4">Sifre</label>
					<input
						type="password"
						class="form-control"
						id="password"
						placeholder="sifre"
						v-model="user.password"
					/>
				</div>
				<button class="btn btn-primary mt-3" @click.prevent="login(user)">
					Giris
				</button>
			</fieldset>
		</form>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	name: 'Login',
	data() {
		return {
			user: {
				username: '',
				password: '',
			},
		};
	},
	computed: {
		...mapState('auth', ['loginError']),
	},
	methods: {
		...mapActions('auth', ['login']),
	},
};
</script>

<style scoped>
.login {
	width: 300px;
	margin: 0 auto;
}

@media only screen and (max-width: 300px) {
	.login {
		width: 90%;
	}
}
</style>
