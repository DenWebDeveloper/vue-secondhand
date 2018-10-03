<template>
    <modal name="modal-order" width="60%" :scrollable="true" height="auto" @before-open="beforeOpen">
        <div class="order-modal p-2">
            <div class="row pl-2 pr-2">
                <div class="col-md-6">
                    <h3>Замовлення №{{order.orderNumber}}</h3>
                </div>
                <div class="col-md-6 text-right">
                    <h3>
                        <span>Статус</span>
                        <span v-if="order.isActive" class="badge badge-success ml-1">Активний</span>
                        <span v-else class="badge badge-danger">Не активний</span>
                    </h3>
                </div>
            </div>
            <hr class="mt-1">
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped">
                        <tbody>
                        <tr>
                            <th>Назва</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <td>Кількість</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>Розмір</td>
                            <td>@twitter</td>
                        </tr>
                        <tr>
                            <td>Колір</td>
                            <td>@twitter</td>
                        </tr>
                        <tr>
                            <td>Ціна</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
	import api from '../api/api'

	export default {
		name: 'ModalOrder',
		data() {
			return {
				order: {}
			}
		},
		methods: {
			beforeOpen(event) {
				api.get(`orders/${event.params.id}`).then(res => {
					this.order = res.data
				})
			}
		}
	}
</script>

<style scoped>
    .order-modal {

    }
</style>