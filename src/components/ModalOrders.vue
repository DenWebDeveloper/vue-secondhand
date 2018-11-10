<template>
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
            <el-select v-if="activeOrderInfo.paymentType === 'card'" v-model="activeOrderInfo.isPayed" class="ml-10">
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
</template>

<script>
	export default {
		name: 'ModalOrders',
		data() {
			return {
				order: {},
				orderInfo:{},
				dialogVisible: false
			}
		},
		methods: {
			closeDialogOrder() {
				this.order = {}
				this.orderInfo = {}
				this.dialogVisible = false
			}
		}
	}
</script>