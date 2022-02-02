<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
		<div class="container-fluid">
			<router-link to="/">
				<div class="navbar-brand">Özgür Yazar | Admin</div>
			</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto" v-if="isLoggedIn">
					<li class="nav-item">
						<router-link class="nav-link active" to="/new"
							>Yeni kitap
							<span class="visually-hidden">(current)</span>
						</router-link>
					</li>
				</ul>
				<div class="d-flex" v-if="isLoggedIn">
					<button class="btn btn-secondary my-2 my-sm-0" @click="logout">
						Cikis
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'Navbar',
	computed: {
		...mapGetters('auth', ['isLoggedIn']),
	},
	methods: {
		...mapActions('auth', ['logout']),
	},
};
</script>
