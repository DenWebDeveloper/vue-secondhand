<template>
    <main>
        <div class="container-fluid my-3">
            <div class="row">
                <div class="col-md-3">
                    <div class="list-group">
                        <a class="list-group-item disabled list-group-item-action">
                            Замовлення:
                        </a>
                        <router-link :to="{name:'users'}" class="list-group-item list-group-item-action">
                            Користувачі
                        </router-link>
                        <router-link :to="{name:'groups'}" href="#" class="list-group-item list-group-item-action">
                            Групи
                        </router-link>
                        <router-link :to="{name:'products'}" href="#"
                                     class="list-group-item list-group-item-action">
                            Товари
                        </router-link>
                    </div>
                </div>
                <div class="col-md-9 bg-white pt-2">
                    <h2>Замовлення</h2>
                    <hr>
                    <div class="d-flex align-items-center">
                        <toggle-button v-model="isActive"
                                       :width="120"
                                       class="toggle-button"
                                       :labels="{checked: 'Активні', unchecked: 'Неактивні'}"/>
                        <form class="needs-validation ml-auto" novalidate>
                            <div class="form-group d-flex">
                                <input v-model="searchInput" type="text" placeholder="Пошук..." class="form-control"
                                       required>
                                <button @click.prevent="search" type="submit" class="btn btn-outline-dark">Пошук
                                </button>
                            </div>
                        </form>
                    </div>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Замовник</th>
                            <th scope="col">Email</th>
                            <th scope="col">Номер телефону</th>
                            <th scope="col">Ціна</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in orders" :key="item.id" @click="clickOrder(item.id)">
                            <th scope="row">{{item.orderNumber}}</th>
                            <td>{{item.clientName}}</td>
                            <td>{{item.clientEmail}}</td>
                            <td>{{item.clientTelephone}}</td>
                            <td>{{item.price}}</td>
                            <td>@mdo</td>
                        </tr>
                        </tbody>
                    </table>
                    <paginate
                            v-model="paginateNum"
                            :page-count="pageCounts"
                            container-class="pagination"
                            page-class="page-item"
                            next-class="page-item"
                            prev-class="page-item"
                            page-link-class="page-link"
                            next-link-class="page-link"
                            prev-link-class="page-link">
                    </paginate>
                </div>
            </div>
            <modal-order></modal-order>
        </div>
    </main>
</template>

<script>
	import Paginate from 'vuejs-paginate'
	import ModalOrder from '../components/ModalOrder'
	import api from '../api/api'

	export default {
		name: 'Home',
		components: {
			Paginate,
			ModalOrder
		},
		data() {
			return {
				orders: [],
				counts: 0,
				searchInput: '',
				paginateNum: 1,
				numberOfItems: 5,
				isActive: true,
			}
		},
		computed: {
			pageCounts() {
				return Math.ceil(this.counts / this.numberOfItems)
			},
			startPositionPaginate() {// (2*4) - 4 = 6
				return (this.paginateNum * this.numberOfItems) - this.numberOfItems
			}
		},
		beforeMount() {
			this.getOrders()
		},
		mounted() {
			this.$watch(vm => [vm.isActive, vm.paginateNum], () => {
				this.getOrders()
			})
		},
		methods: {
			getOrders(searchParams = {}) {
				const params = {
					isActive: Number(this.isActive),
					...searchParams
				}
				api.get('/orders', {
					params: {
						startPosition: this.startPositionPaginate,
						numberOfItems: this.numberOfItems,
						...params
					}
				}).then(res => {
					this.orders = res.data
				})
				api.get('orders/count', {params}).then(res => {
					this.counts = res.data
				})
			},
			search() {
				const filterSearchText = this.searchInput.trim().length === 0 ? {} : {filter: this.searchInput}
				this.getOrders(filterSearchText)
			},
			clickOrder(orderId) {
				this.$modal.show('modal-order', {id: orderId})
			}
		}
	}
</script>

<style scoped>
    .table tr:hover {
        cursor: pointer;
        box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.45)
    }

    .bg-white {
        background-color: #fff;
    }
</style>