<template>
    <div id="app">
        <el-container>
            <div style="padding: 10px; width: 100%">
                <router-view></router-view>
            </div>
        </el-container>
    </div>
</template>

<script>
	import * as types from './store/actions.types'

	export default {
		name: 'App',
		beforeMount() { // Інформація використовується в header тому завантажуємо в корні проекта
			this.$store.dispatch(types.GET_BASE_INFO)
		}
	}
</script>