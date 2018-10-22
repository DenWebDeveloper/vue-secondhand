<template>
    <el-container class="global-container">
        <Header/>
        <el-container direction="horizontal" class="main-container">
            <el-aside width="200px" class="bg-white">
                <el-menu :router="true">
                    <el-menu-item index="orders"  :route="{name:'home'}">
                        <i class="el-icon-goods"></i>
                        <span>Замовлення</span>
                    </el-menu-item>
                    <el-menu-item index="groups" :route="{name:'groups'}">
                        <i class="el-icon-document"></i>
                        <span>Групи</span>
                    </el-menu-item>
                    <el-menu-item index="settings" :route="{name:'settings'}">
                        <i class="el-icon-setting"></i>
                        <span>Налаштування</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
	import Header from '../components/Header'
	import Footer from '../components/Footer'

	export default {
		name: 'Main',
		components: {Header}
	}
</script>

<style scoped>
    .main {
        padding: 0;
        padding-left: 10px;
    }

    .global-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .main-container {
        align-items: flex-start;
        max-width: 1400px;
        width: 100%;
        margin: 0 auto;
    }
</style>