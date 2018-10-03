<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
	import Header from './components/Header'
	import Footer from './components/Footer'

	export default {
		name: 'App',
		components: {
			Header,
			Footer,
		},
	}
</script>

<style scoped>
    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>