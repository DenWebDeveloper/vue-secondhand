<template>
    <div>
        <el-table
                border
                v-loading="loading"
                :data="modeLoadedGroup?loadedGroup:products"
                style="width: 100%">
            <el-table-column align="center" label="Фото">
                <template slot-scope="scope">
                    <img :src="`/api/products/${scope.row.id}/images/${scope.row.imageId}/content`" width="100%" alt="Photo product">
                </template>
            </el-table-column>
            <el-table-column align="center" label="Код продукту">
                <template slot-scope="scope">
                    <span>{{ getFullCode(scope.row.productCode) }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Ім'я">
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Ціна">
                <template slot-scope="scope">
                    <span>{{ scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Короткий опис">
                <template slot-scope="scope">
                    <span>{{ scope.row.shortDescription}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="" v-if="!modeLoadedGroup">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="editProduct(scope.$index, scope.row)">Відкрити товар
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-if="!modeLoadedGroup"
                class="mt-10"
                @size-change="sizeChangePagination"
                @current-change="currentChangePagination"
                :current-page.sync="pagination.current"
                :page-sizes="[5,10, 20, 30, 40]"
                :page-size="pagination.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.counts">
        </el-pagination>
    </div>
</template>

<script>
	import {debounce} from 'debounce'
	import bus from '../helpers/bus'

	export default {
		name: 'ProductsTable',
		props: {
			activeProducts: {
				type: Boolean,
				default: true
			},
			textSearch: {
				type: String,
			},
			loadedGroup: {
				type: Array,
				required: false,
			}
		},
		data() {
			return {
				products: [],
				loading: false,

				pagination: {
					size: 5,
					counts: 0,
					current: 1
				}
			}
		},
		computed: {
			startPositionPaginate() {// (2*4) - 4 = 6
				return (this.pagination.current * this.pagination.size) - this.pagination.size
			},

			modeLoadedGroup: function () {
				return Array.isArray(this.loadedGroup)
			}
		},
		created() {
			bus.$on('reloadTableProducts', this.getProducts)

			this.debouncedGetProducts = debounce(this.getProducts, 1000)
		},
		beforeMount() {
			this.getProducts()
		},
		mounted() {
			this.$watch(vm =>
				[
					vm.pagination.size,
					vm.pagination.current,
					vm.pagination.counts,
					vm.activeProducts,
					vm.textSearch
				], this.debouncedGetProducts)
		},
		beforeDestroy() {
			bus.$off('reloadTableProducts', this.getProducts)
		},
		methods: {
			/**
			 * Products
			 */
			getProducts() {
				if (this.modeLoadedGroup) return
				let params = {
					isVisible: this.activeProducts,
				}

				if (this.textSearch.length) {
					params = {...params, filter: this.textSearch}
				}

				this.loading = true

				this.$api.get('/products', {
					params: {
						startPosition: this.startPositionPaginate,
						numberOfItems: this.pagination.size,
						...params
					}
				}).then(res => {
					this.products = res.data
				}).catch(err => {
					this.$notifyError({
						msg: `Обновіть сторінку. ${err}`,
					})
				}).finally(() => {
					this.loading = false
				})

				this.$api('products/count', {
					params
				}).then(res => {
					this.$set(this.pagination, 'counts', res.data)
				}).catch(err => {
					this.$notifyError({
						msg: `Обновіть сторінку. ${err}`,
					})
				}).finally(() => {
					this.loading = false
				})
			},
			editProduct(index, row) {
				bus.$emit('editProduct', row)
			},
			/**
			 * Pagination
			 */
			sizeChangePagination(val) {
				this.$set(this.pagination, 'size', val)
			},
			currentChangePagination(val) {
				this.$set(this.pagination, 'current', val)
			},
			getFullCode(code) {
				const length = String(code).length
				let  zeros = ''
				for (let i = 0; i < 9 - length; i++) {
					zeros += '0'
				}
				return zeros + String(code)
			}
		}
	}
</script>

<style scoped>

</style>
