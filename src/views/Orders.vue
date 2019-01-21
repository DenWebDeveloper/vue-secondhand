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
                <el-form-item label="Статус замовлення">
                    <el-select v-model="orderStatus" class="ml-10">
                        <el-option label="Нове замовлення" value="Created">
                            <el-tag style="width: 100%">Нове замовлення</el-tag>
                        </el-option>
                        <el-option label="Активний" value="Active">
                            <el-tag style="width: 100%" type="info">Активний</el-tag>
                        </el-option>
                        <el-option label="Отримано" value="Received">
                            <el-tag style="width: 100%" type="info">Отримано</el-tag>
                        </el-option>
                        <el-option label="Відхиленно" value="Rejected">
                            <el-tag style="width: 100%" type="danger">Відхиленно</el-tag>
                        </el-option>
                        <el-option label="Виконано" value="Completed">
                            <el-tag style="width: 100%" type="success">Виконано</el-tag>
                        </el-option>
                        <el-option label="Відправлено клієнту" value="SendToClient">
                            <el-tag style="width: 100%" type="success">Відправлено клієнту</el-tag>
                        </el-option>
                    </el-select>
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
                class="orders-table"
                :size="tableSize"
                v-loading="loadingOrderTable"
                :data="orders"
                :row-class-name="tableRowClassName"
                style="">
            <el-table-column align="center" label="Код замовлення">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderNumber}}</span>
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
            <el-table-column width="120px" align="center" label="Номер телефону">
                <template slot-scope="scope">
                    <span>{{ scope.row.clientTelephone}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Ціна">
                <template slot-scope="scope">
                    <span>{{ scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="Дата створення">
                <template slot-scope="scope">
                    <span>{{new Date(scope.row.createdOn).toLocaleDateString()}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Статус">
                <template slot-scope="scope">
                    <span>{{getTypeOrderStatus(scope.row.orderStatus)}}</span>
                </template>
            </el-table-column>
            <el-table-column width="190" align="center" label="Дії">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="openOrder(scope.row)">Відкрити замовлення
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
        <orders-dialog/>
    </el-container>
</template>

<script>
	import bus from '../helpers/bus'
	import OrdersDialog from '../components/OrdersDialog'

	export default {
		name: 'Home',
		components: {
			OrdersDialog
		},
		data() {
			return {
				loadingOrderTable: false,
				orders: [],
				orderStatus: 'Created',
				countsPages: 0,
				searchInput: '',
				currentPage: 1,
				sizePagination: 5,
				activeSearch: true,
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
			this.$watch(vm => [vm.activeSearch,vm.orderStatus, vm.sizePagination, vm.currentPage], () => {
				this.getOrders()
			})
			bus.$on('update-orders', this.getOrders)
		},
		beforeDestroy() {
			bus.$off('update-orders', this.getOrders)
		},
		methods: {
			tableRowClassName: function ({row}) {
				const status = row.orderStatus
				if (status === 0) {
					return 'warning-row'
				} else if (status === 4) {
					return 'success-row'
				}
				return ''
			},
			getTypeOrderStatus(status) {
				const statuses = {
					0: 'Нове замовлення',
					1: 'Активний',
					2: 'Отримано',
					3: 'Відхиленно',
					4: 'Виконано',
					5: 'Відправлено клієнту',
				}
				return statuses[status]
			},
			getOrders(searchParams = {}) {
				const params = {
					isActive: this.activeSearch,
					orderType: this.orderStatus,
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
					this.$notifyError({msg: err.message})
					this.loadingOrderTable = false
				})

				this.loadingOrderTable = true
				this.$api.get('orders/count', {params}).then(res => {
					this.countsPages = res.data
				}).catch(err => {
					this.$notifyError({msg: err.message})
					this.loadingOrderTable = false
				})
			},
			search() {
				const filterSearchText = this.searchInput.trim().length === 0 ? {} : {filter: this.searchInput}
				this.getOrders(filterSearchText)
			},
			openOrder(order) {
				bus.$emit('open-order-dialog', order)
			},
			sizeChangePagination(val) {
				this.sizePagination = val
			},
			currentChangePagination(val) {
				this.currentPage = val
			},
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
</style>

<style>
    .orders-table .warning-row {
        background: rgba(255, 166, 0, 0.12);
    }

    .orders-table .success-row {
        background: rgba(91, 254, 0, 0.4);
    }
</style>
