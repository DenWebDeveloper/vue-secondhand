<template>
    <div>
        <Header></Header>
        <main>
            <div class="container-fluid my-3">
                <div class="row">
                    <div class="col-md-3">
                        <div class="list-group">
                            <a class="list-group-item disabled list-group-item-action">
                                Замовлення:
                            </a>
                            <router-link :to="{name:'ordersActive'}" active-class="active"
                                         class="list-group-item sub-list-group-item-action list-group-item-action">
                                Aктивні
                            </router-link>
                            <router-link :to="{name:'ordersNotActive'}"
                                         class="list-group-item sub-list-group-item-action list-group-item-action">
                                Не активні
                            </router-link>
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
                            <toggle-button :value="true"
                                           :width="120"
                                           class="toggle-button"
                                           :labels="{checked: 'Активні', unchecked: 'Неактивні'}"/>
                            <form class="needs-validation ml-auto" novalidate>
                                <div class="form-group d-flex">
                                    <input type="text" placeholder="Пошук..." class="form-control" required>
                                    <button type="submit" class="btn btn-outline-dark">Пошук</button>
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
                            <tr v-for="item in orders" :key="item.id">
                                <th scope="row">{{item.userId}}</th>
                                <td>{{item.clientName}}</td>
                                <td>{{item.clientEmail}}</td>
                                <td>{{item.clientTelephone}}</td>
                                <td>{{item.isPayed}}</td>
                                <td>@mdo</td>
                            </tr>
                            </tbody>
                        </table>
                        <paginate :page-count="20"
                                  container-class="pagination"
                                  page-class="page-item"
                                  next-class="page-item"
                                  prev-class="page-item"
                                  page-link-class="page-link"
                                  next-link-class="page-link"
                                  prev-link-class="page-link">
                        </paginate>
                        <!--:click-handler="clickCallback"-->
                    </div>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
	import Header from '../components/Header'
	import Footer from '../components/Footer'
	import Paginate from 'vuejs-paginate'
	import api from '../api/api'

	export default {
		name: 'Home',
		components: {
			Header,
			Footer,
			Paginate
		},
		data() {
			return {
				orders: []
			}
		},
		beforeCreate() {
			api.get('/orders', {}).then(res => {
				this.orders = res.data
			})
		}
	}
</script>

<style scoped>
    .p-20 {
        padding: 20px;
    }

    .bg-white {
        background-color: #fff;
    }
</style>