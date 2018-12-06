<template>
    <el-container direction="vertical" class="bg-white home">
        <h2 class="home_title">Замовлення</h2>
        <div class="d-flex align-items-center">
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
        </div>
        <el-table
                border
                :size="tableSize"
                v-loading="loadingOrderTable"
                :data="orders"
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
            <el-table-column align="center" label="Дата створення">
                <template slot-scope="scope">
                    <span>{{new Date(scope.row.createdOn).toLocaleDateString()}}</span>
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
        <el-dialog
                title="Замовлення"
                :visible.sync="dialogVisibleOrder"
                width="90%">
            <el-row type="flex" align="middle">
                <el-col :span="18">
                    <h2>#{{activeOrderInfo.id}}</h2>
                </el-col>
                <el-col :span="6" style="text-align: right">
                    <el-tag v-if="activeSearch" type="success">Активний</el-tag>
                    <el-tag v-else type="danger">Неактивний</el-tag>
                </el-col>
            </el-row>
            <el-table
                    border
                    :data="activeOrder"
                    style="width: 100%">
                <el-table-column align="center" label="#">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Назва">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name || 'Назва товару'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Кількість">
                    <template slot-scope="scope">
                        <span>{{ scope.row.count}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Розмір">
                    <template slot-scope="scope">
                        <span>{{ scope.row.size || 'Розмір товару'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="Колір" label="Розмір">
                    <template slot-scope="scope">
                        <span>{{ scope.row.color || 'Колір товару'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Ціна">
                    <template slot-scope="scope">
                        <span>{{ scope.row.pricePerItem * scope.row.count}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--card  cashDelivery cash-->
            <div class="mt-10">
                Тип оплати:
                <el-tag v-if="activeOrderInfo.paymentType === 'card'">Картка</el-tag>
                <el-tag v-else-if="activeOrderInfo.paymentType === 'cashDelivery'" type="success">Наложний платіж
                </el-tag>
                <el-tag v-else-if="activeOrderInfo.paymentType === 'cash'">Готівка</el-tag>
                <el-tag v-else>Поле пусте</el-tag>
                <el-select v-if="activeOrderInfo.paymentType === 'card'" v-model="activeOrderInfo.isPayed"
                           class="ml-10">
                    <el-option
                            label="Оплачено"
                            :value="1">
                    </el-option>
                    <el-option
                            label="Чекає оплати"
                            :value="0">
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogOrder">Закрити</el-button>
                <el-button @click="rejectOrder" icon="el-icon-close" type="danger">Відхилити</el-button>
                <el-button @click="resolveOrder" icon="el-icon-check" type="success">Підтвердити</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
	import Paginate from 'vuejs-paginate'

	export default {
		name: 'Home',
		components: {
			Paginate,
		},
		data() {
			return {
				loadingOrderTable: false,
				orders: [],
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
			rejectOrder() {
				this.$api.put(`/orders/${this.activeOrder.id}`,{
					reject: true
				})
			},
			resolveOrder() {
				this.$api.put(`/orders/${this.activeOrder.id}`,{
					resolve: true
				})
			},
			getOrders(searchParams = {}) {
				const params = {
					isActive: this.activeSearch,
					...searchParams
				}
				this.loadingOrderTable = true
				this.$api.get('/orders', {
					params: {
						startPosition: this.startPositionPaginate,
						numberOfItems: this.sizePagination,
						...params
					}
				}).then(res => {
					this.orders = res.data
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
				this.$api.get('orders/count', {params}).then(res => {
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
				this.$api.get(`/orders/${id}/Items`).then(res => {
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
