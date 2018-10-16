<template>
    <el-form ref="authForm" :rules="rules" label-width="120px" v-model="authForm">
        <el-form-item label="Email" prop="email">
            <el-input v-model="authForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
            <el-input v-model="authForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitAuthForm">Create</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
	import Cookies from 'js-cookie'

	export default {
		name: 'Auth',
		data() {
			return {
				authForm: {
					email: '',
					password: ''
				},
				rules: {
					email: [
						{required: true, message: 'Please input email address', trigger: 'blur'},
						{type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']}
					],
					password: [
						{required: true, message: 'Please input password', trigger: 'blur'},
					]
				}
			}
		},
		methods: {
			submitAuthForm() {
				this.$api.get('/tokens', {
					params: {
						username: this.email,
						password: this.password
					}
				}).then(res => {
					Cookies.set('token', res.data)
					this.$router.push({name: 'home'})
				}).catch(err => {
					this.$notify({
						title: 'Помилка',
						message: err.response.data.errorMessage,
						duration: 0
					})
				})
			}
		}
	}
</script>

<style scoped>

</style>