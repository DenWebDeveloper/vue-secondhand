<template>
    <div class="vh-100 d-flex flex-column justify-content-between align-items-center">
        <Header class="w-100"></Header>
        <div class="container mt-4">
            <div class="row  align-items-center">
                <div class="col-10 col-lg-6 offset-1 offset-lg-3">
                    <login-form></login-form>
                </div>
            </div>
        </div>
        <Footer class="w-100"></Footer>
    </div>
</template>

<script>
	import Header from '../components/Header'
	import Footer from '../components/Footer'
	import LoginForm from '../components/LoginForm'

	export default {
		name: 'Auth',
		components: {
			Header,
			Footer,
			LoginForm,
		}
	}
</script>

<style scoped>
    .vh-100 {
        min-height: 100vh;
    }
</style>