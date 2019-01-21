<template>
    <el-container style="display: flex;justify-content: center;">
        <el-form ref="infoForm" :model="parameters" label-width="175px" class="bg-white parameters"
                 label-position="top">
            <el-row :gutter="20">
                <el-col :span="24"><h4 style="margin-bottom: 0;">Посилання на соціальні мережі</h4></el-col>
                <el-col :span="12">
                    <el-form-item
                            label="Instagram" prop="name">
                        <el-input v-model="parameters['socials-instagram'].value"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                            label="Facebook" prop="name">
                        <el-input v-model="parameters['socials-facebook'].value"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                            label="Twitter" prop="name">
                        <el-input v-model="parameters['socials-twitter'].value"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                            label="Telegram" prop="name">
                        <el-input v-model="parameters['socials-telegram'].value"
                                  placeholder="Посилання на канал чи на чат"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <hr>
            <el-row :gutter="20">
                <el-col :span="24"><h4 style="margin-bottom: 0;">Сторінка: Про нас</h4></el-col>
                <el-col :span="24">
                    <el-form-item label="Опис" prop="name">
                        <el-input
                                v-model="parameters['about-us-descriptions'].value"
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 9}">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <hr>
            <el-row :gutter="20">
                <el-col :span="24"><h4 style="margin-bottom: 0;">Сторінка:Доставка і Оплата</h4></el-col>
                <el-col :span="24">
                    <el-form-item label="Підзаголовок" prop="name">
                        <el-input
                                v-model="parameters['delivery-subtitle'].value"
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <h5 style="margin-bottom: 0;">Розділ:Оплата. Короткі описи</h5>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Наложеним платежем" prop="name">
                        <el-input
                                v-model="parameters['delivery-section-pay-billed-payment'].value"
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Банківською карткою" prop="name">
                        <el-input
                                v-model="parameters['delivery-section-pay-bank-card'].value"
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Готівкою" prop="name">
                        <el-input
                                v-model="parameters['delivery-section-pay-cash'].value"
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <h5 style="margin-bottom: 0;">Розділ:Доставка. Короткі описи</h5>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="У відділеннях Нова Пошта" prop="name">
                        <el-input
                                v-model="parameters['delivery-section-delivery-new-post'].value"
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="У відділеннях Укпошта" prop="name">
                        <el-input
                                v-model="parameters['delivery-section-delivery-ua-post'].value"
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Кур'єром" prop="name">
                        <el-input
                                v-model="parameters['delivery-section-delivery-courier'].value"
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <hr>
            <el-row :gutter="20">
                <el-col :span="24"><h4 style="margin-bottom: 0;">Графік роботи</h4></el-col>
                <el-col :span="12">
                    <el-form-item label="Перша стрічка" prop="name">
                        <el-input
                                v-model="parameters['schedule-first-line'].value"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Друга стрічка" prop="name">
                        <el-input v-model="parameters['schedule-second-line'].value"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <hr>
            <el-row :gutter="20">
                <el-col :span="24"><h4 style="margin-bottom: 0;">Інше</h4></el-col>
                <el-col :span="12">
                    <el-form-item label="Email" prop="name">
                        <el-input v-model="parameters['email'].value"/>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-button type="success" @click="submitInfoForm" style="margin-bottom: 10px;">Зберегти</el-button>
                </el-col>
            </el-row>
        </el-form>
    </el-container>
</template>

<script>
	export default {
		name: 'Parameters',
		data() {
			return {
				parameters: {
					'socials-instagram': {},
					'socials-facebook': {},
					'socials-telegram': {},
					'socials-twitter': {},
					'about-us-descriptions': {},
					'delivery-subtitle': {},
					'delivery-section-pay-billed-payment': {},
					'delivery-section-pay-bank-card': {},
					'delivery-section-pay-cash': {},
					'delivery-section-delivery-new-post': {},
					'delivery-section-delivery-ua-post': {},
					'delivery-section-delivery-courier': {},
					'schedule-first-line': {},
					'schedule-second-line': {},
					'email': {},
				},
				loaded: false
			}
		},
		created() {
			if (!this.loaded) return this.getParameters()
		},
		methods: {
			submitInfoForm() {
				const requests = Object.keys(this.parameters).map(key => {
					const item = this.parameters[key]
					return this.$api.put(`/portal-parameters/${item.id}`, {value: item.value, key})
				})
				Promise.all(requests).then(() => {
					this.$notifySuccess()
				}).catch(err => {
					this.$notifyError({msg: err.message})
				})
			},
			getParameters() {
				this.$api('/portal-parameters').then(({data}) => {
					const parameters = data.reduce((acc, curr) => {
						acc[curr.key] = {
							id: curr.id,
							value: curr.value
						}
						return acc
					}, {})
					this.parameters = {...this.parameters, ...parameters}
				})
			},
		}
	}
</script>

<style scoped>
    .parameters {
        border: 1px solid #ccc;
        border-radius: 10px;
        margin: 0 auto;
        width: 100%;
        padding: 25px 20px 1px 20px;
    }

    hr {
        overflow: visible; /* For IE */
        padding: 0;
        border: none;
        border-top: medium double #333;
        color: #333;
        text-align: center;
    }

    hr:after {
        content: "§";
        display: inline-block;
        position: relative;
        top: -0.7em;
        font-size: 1.5em;
        padding: 0 0.25em;
        background: white;
    }
</style>

<style>
    .parameters .el-form-item__label {
        padding: 0 !important;
    }
</style>
