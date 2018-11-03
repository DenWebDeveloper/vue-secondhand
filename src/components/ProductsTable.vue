<template>
    <el-table
            border
            :size="tableSize"
            v-loading="loadingOrderTable"
            :data="products"
            style="width: 100%">
        <el-table-column align="center" label="#">
            <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Замовник">
            <template slot-scope="scope">
                <span>{{ scope.row.clientName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Email">
            <template slot-scope="scope">
                <span>{{ scope.row.clientEmail}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Номер телефону">
            <template slot-scope="scope">
                <span>{{ scope.row.clientTelephone}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Ціна">
            <template slot-scope="scope">
                <span>{{ scope.row.price}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="openOrder(scope.$index, scope.row)">Відкрити замовлення
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
	export default {
		name: 'ProductsTable',
		props: {
			tableSize: {
				require: true,
				type: String
			},
			loadingOrderTable: {
				require: true,
				type: Boolean
			}
		},
		beforeMount() {
			this.getProducts()
		},
		methods: {
			getProducts(searchParams = {}) {
				const params = {
					isActive: this.activeSearch,
					...searchParams
				}
				this.loadingOrderTable = true
				this.$api.get('/products', {
					params: {
						startPosition: this.startPositionPaginate,
						numberOfItems: this.sizePagination,
						...params
					}
				}).then(res => {
					this.products = res.data
					this.loadingOrderTable = false
				}).catch(err => {
					this.$notify({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
					this.loadingOrderTable = false
				})

				this.loadingOrderTable = true
				this.$api.get('products/count', {params}).then(res => {
					this.countsPages = res.data
				}).catch(err => {
					this.$notify({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
					this.loadingOrderTable = false
				})
			},
		}
	}
</script>

<style scoped>

</style>