<template>
    <el-container style="display: flex;justify-content: center;">
        <el-form :model="info" :rules="rules" ref="infoForm" label-width="175px" class="bg-white info-form">
            <el-form-item label="Ім'я" prop="name">
                <el-input :value="info.name" @input="handleInput('name', $event)"></el-input>
            </el-form-item>
            <!--<el-form-item label="Розташування" prop="location">
                <el-input :value="info.location" @input="handleInput('location', $event)"></el-input>
            </el-form-item>-->
            <el-form-item label="Розташування на карті" prop="mapLocation">
                <el-input :value="info.mapLocation" @input="handleInput('mapLocation', $event)"></el-input>
                <div class="input-tip">Підказка: Широта<strong style="color: #000">;</strong>Довгота</div>
            </el-form-item>
            <el-form-item label="Телефони" prop="telephones">
                <el-input :value="info.telephones" @input="handleInput('telephones', $event)"></el-input>
                <div class="input-tip">Якщо хочете ввести декілька телефонів розділіть їх "<strong style="color: #000">;</strong>"</div>
                <div class="input-tip">Наприклад: 064337744;063557788</div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitInfoForm">Зберегти</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
	import {mapGetters} from 'vuex'
	import * as types from '../store/actions.types'

	export default {
		name: 'Settings',
		data() {
			return {
				rules: {
					name: [
						{required: true, message: 'Введіть ім\'я', trigger: 'change'},
					],
					location: [
						{required: true, message: 'Введіть розташування', trigger: 'change'}
					],
					mapLocation: [
						{required: true, message: 'Введіть розташування на карті', trigger: 'change'}
					],
					telephones: [
						{required: true, message: 'Введіть номер телефону', trigger: 'change'}
					]
				}
			}
		},
		computed: {
			...mapGetters({
				info: 'getBaseInfo'
			})
		},
		methods: {
			handleInput(name, val) {
				const info = {...this.info, [name]:val}
				this.$store.commit(types.SET_BASE_INFO, {info})
			},
			submitInfoForm() {
				this.$refs['infoForm'].validate((valid) => {
					if (!valid) return false
					this.$store.dispatch(types.SET_BASE_INFO, this.info).then(() => {
						this.$notify({
							title: 'Все добре :)',
							message: 'Дані збережені',
							duration: 4000,
							type: 'success'
						})
					}).catch(err => {
						this.$notifyError({errMsg:err.message})
					})
				})
			}
		}
	}
</script>

<style scoped>
    .info-form {
        border: 1px solid #ccc;
        border-radius: 10px;
        max-width: 600px;
        margin: 0 auto;
        padding: 25px 20px 1px 20px;
    }
    .input-tip {
        margin-top: 2px;
        letter-spacing: 1px;
        line-height: 1;
        color: #858585;
        font-size: 13px;
    }
</style>
<style>
    .info-form input {
        font-family: "Roboto","Arial",sans-serif !important;
        font-size: 15px;
        letter-spacing: 1px;
    }
</style>
