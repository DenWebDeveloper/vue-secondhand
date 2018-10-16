<template>
    <div id="app">
        <el-container class="global-container">
            <el-header>Header</el-header>
            <div style="padding: 10px">
                <router-view></router-view>
            </div>
            <el-footer>Footer</el-footer>
        </el-container>
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
    .global-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>