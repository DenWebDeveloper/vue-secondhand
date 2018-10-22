<template>
    <el-form ref="authForm" :rules="rules" label-width="90px" :model="authForm" class="auth-form">
        <el-form-item label="Email" prop="email">
            <el-input v-model="authForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
            <el-input v-model="authForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitAuthForm">Увійти</el-button>
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
					email: 'Admin',
					password: 'Admin'
				},
				rules: {
					email: [
						//{type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']},
						{required: true, message: 'Please input email address', trigger: 'blur'},
					],
					password: [
						{required: true, message: 'Please input password', trigger: 'blur'},
					]
				}
			}
		},
		methods: {
			submitAuthForm() {
				this.$refs['authForm'].validate( valid => {
					if(!valid) return false
					this.$api.get('/tokens', {
						params: {
							username: this.authForm.email,
							password: this.authForm.password
						}
					}).then(res => {
						Cookies.set('token', res.data)
						this.$router.push({name: 'home'})
					}).catch(err => {
						this.$notify({
							title: 'Помилка',
							message: err.response.data.errorMessage,
							duration: 6000
						})
					})
				})
			}
		}
	}
</script>

<style scoped>
    .auth-form {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
        max-width: 500px;
        margin: 0 auto;
        padding: 25px 20px 1px 0;
    }
</style>