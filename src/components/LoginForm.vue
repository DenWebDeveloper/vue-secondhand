<template>
    <form class="login-form__form p-3">
        <h3 class="h2 m-0 my-3">Вхід</h3>
        <div class="form-group">
            <label for="userEmail">Логін</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text"><i class="fas fa-user"></i></div>
                </div>
                <input v-model="email" class="form-control" id="userEmail" type="text" name="email"
                       aria-describedby="emailHelp"
                       placeholder="Введіть свою почту" required="">
            </div>
        </div>
        <div class="form-group">
            <label for="userPassword">Пароль</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text"><i class="fas fa-key"></i></div>
                </div>
                <input v-model="password" class="form-control" id="userPassword" type="password" name="password"
                       placeholder="Введіть свій пароль"
                       required="">
            </div>
        </div>
        <div v-if="err" class="alert alert-danger" role="alert">
            {{errMessage}}
        </div>
        <button @click.prevent="login" class="btn btn-success" type="submit">Увійти</button>
    </form>
</template>

<script>
	import index from '../api/api'
	import Cookies from 'js-cookie'

	export default {
		name: 'LoginForm',
		data() {
			return {
				email: 'Admin',
				password: 'Admin',
				err: false,
				errMessage: ''
			}
		},
		methods: {
			login() {
				index.get('/tokens', {
					params: {
						username: this.email,
						password: this.password
					}
				}).then(res => {
					Cookies.set('token', res.data)
					this.err = false
					this.errMessage = ''
					this.$router.push({name: 'home'})
				}).catch((err) => {
					this.err = true
					this.errMessage = err.response.data.errorMessage
				})
			}
		}
	}
</script>

<style scoped>

</style>