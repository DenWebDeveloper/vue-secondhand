<template>
    <el-container direction="vertical" class="bg-white home">
        <h2 class="home_title">Товари</h2>
        <el-row type="flex">
            <el-col>
                <el-form :inline="true" size="mini">
                    <el-form-item>
                        <el-input
                                placeholder="Пошук..."
                                v-model="searchInput"
                                required>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.prevent="search">Пошук</el-button>
                    </el-form-item>
                    <el-form-item label="Розміри таблиці">
                        <el-select v-model="tableSize" placeholder="Розміри таблиці">
                            <el-option
                                    label="medium"
                                    value="medium">
                            </el-option>
                            <el-option
                                    label="small"
                                    value="small">
                            </el-option>
                            <el-option
                                    label="mini"
                                    value="mini">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-switch
                                v-model="activeSearch"
                                active-text="Активні"
                                inactive-text="Неактивні">
                        </el-switch>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col>
                <el-button @click="createProduct" type="primary" size="small" icon="el-icon-plus" round>
                    Додати товар
                </el-button>
            </el-col>
        </el-row>
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
        <el-pagination
                class="mt-10"
                @size-change="sizeChangePagination"
                @current-change="currentChangePagination"
                :current-page.sync="currentPage"
                :page-sizes="[5,10, 20, 30, 40]"
                :page-size="sizePagination"
                layout="total, sizes, prev, pager, next, jumper"
                :total="countsPages">
        </el-pagination>
        <products-dialog
                v-bind:visible.sync="dialog.visible"
                :productInfo.sync="dialog.product"
        />
    </el-container>
</template>

<script>
	import Paginate from 'vuejs-paginate'
	import ProductsDialog from '../components/ProductsDialog'

	export default {
		name: 'Home',
		components: {
			Paginate,
			ProductsDialog
		},
		data() {
			return {
				dialog: {
					visible: false,
					product: {}
				},
				loadingOrderTable: false,
				products: [],
				countsPages: 0,
				searchInput: '',
				currentPage: 1,
				sizePagination: 5,
				activeSearch: true,
				activeOrder: {},
				activeOrderInfo: {},
				tableSize: 'small',
				dialogVisibleOrder: false
			}
		},
		computed: {
			startPositionPaginate() {// (2*4) - 4 = 6
				return (this.currentPage * this.sizePagination) - this.sizePagination
			}
		},
		beforeMount() {
			this.getOrders()
		},
		mounted() {
			this.$watch(vm => [vm.activeSearch, vm.sizePagination, vm.currentPage], () => {
				this.getOrders()
			})
		},
		methods: {
			createProduct() {
				this.dialog = {
					visible: true,
					product: {}
				}
			},
			editProduct(product) {
				this.dialog = {
					visible: true,
					product
				}
			},
			search() {
				const filterSearchText = this.searchInput.trim().length === 0 ? {} : {filter: this.searchInput}
				this.getOrders(filterSearchText)
			},
			openOrder(index, order) {
				const {id, paymentType, isPayed} = order
				this.activeOrderInfo = {
					id,
					paymentType,
					isPayed,
					_index: index
				}
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				this.$api.get(`/products/${id}/Items`).then(res => {
					loading.close()
					this.dialogVisibleOrder = true
					this.activeOrder = res.data
				}).catch(err => {
					this.$notify({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
					loading.close()
				})
			},
			sizeChangePagination(val) {
				this.sizePagination = val
			},
			currentChangePagination(val) {
				this.currentPage = val
			},
			closeDialogOrder() {
				this.activeOrder = {}
				this.activeOrderInfo = {}
				this.dialogVisibleOrder = false
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