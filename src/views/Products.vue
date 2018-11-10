<template>
    <el-container direction="vertical" class="bg-white home">
        <h2 class="home_title">Товари</h2>
        <el-row type="flex">
            <el-col>
                <el-form :inline="true" size="mini">
                    <el-form-item>
                        <el-input
                                placeholder="Пошук..."
                                v-model.trim="filter.text"
                                required>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-switch
                                v-model="filter.activeProducts"
                                active-text="Активні"
                                inactive-text="Неактивні">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="createProduct" type="primary" size="small" icon="el-icon-plus" round>
                            Додати товар
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <products-table
                :activeProducts="filter.activeProducts"
                :textSearch="filter.text"
        />
        <products-dialog/>
    </el-container>
</template>

<script>
	import bus from '../helpers/bus'

	import Paginate from 'vuejs-paginate'
	import ProductsDialog from '../components/ProductsDialog'
	import ProductsTable from '../components/ProductsTable'

	export default {
		name: 'Home',
		components: {
			Paginate,
			ProductsDialog,
			ProductsTable
		},
		data() {
			return {
				filter: {
					text: '',
					activeProducts: true
				},
			}
		},
		methods: {
			createProduct() {
				bus.$emit('createProduct')
			}
		}
	}
</script>

<style scoped>
    .home {
        padding: 10px;
    }

    .home_title {
        margin: 10px 0;
    }

    .mt-10 {
        margin-top: 10px;
    }

    .ml-10 {
        margin-left: 10px;
    }


</style>