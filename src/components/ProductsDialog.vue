<template>
    <div>
        <el-dialog
                :title="`${productDialog.create?'Створити':'Оновити'} продукт`"
                :visible.sync="productDialog.visible"
                @close="resetDialogs"
                @open="checkLoadGroups"
                width="90%">
            <el-form :model="product" ref="productForm" label-width="150px" label-position="top">
                <el-row type="flex" justify="space-between">
                    <el-col :span="14">
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Ім'я" prop="name">
                            <el-input v-model.trim="product.name"/>
                        </el-form-item>
                        <el-form-item prop="type">
                            <el-checkbox v-model="product.isVisible">Показати товар на сайті</el-checkbox>
                        </el-form-item>
                        <el-form-item
                                prop="groupId"
                                label="Назва групи"
                                :rules="[{ required: true, message: 'Виберіть групу', trigger: ['blur','change']}]">
                            <el-select v-model="product.groupId"
                                       filterable clearable placeholder="Виберіть групу">
                                <el-option
                                        v-for="item in allGroups"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Ціна" prop="price">
                            <el-input v-model.trim="product.price"/>
                        </el-form-item>
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Короткий опис" prop="shortDescription">
                            <el-input v-model.trim="product.shortDescription"/>
                        </el-form-item>
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Опис" prop="description">
                            <el-input type="textarea" v-model.trim="product.description"/>
                        </el-form-item>
                        <fieldset>
                            <legend>Детальні характеристики</legend>
                            <el-form-item
                                    v-for="(item, index) in product.productValues"
                                    :label="'Детальна характеристика ' + (index + 1)"
                                    :key="index">
                                <el-input v-model="item.name"></el-input>
                                <el-input style="margin-top:5px" v-model="item.value"></el-input>
                                <el-button type="danger" style="margin-top:5px"
                                           @click.prevent="removeCharacteristic(item)">Видалити
                                </el-button>
                            </el-form-item>
                            <el-button type="success" style="margin-left: auto;display: block;"
                                       @click.prevent="addCharacteristic">Додати
                            </el-button>
                        </fieldset>

                    </el-col>
                    <el-col :span="9" :offset="1">
                        <el-upload
                                style="width: 100%"
                                :action="`http://acgproduct-001-site1.gtempurl.com/api/products/${product.id}/images`"
                                :on-remove="handleRemove"
                                :file-list="productFilesList"
                                multiple
                                drag
                                list-type="picture">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                            <div class="el-upload__tip" slot="tip">jpg/png files</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetDialogs">Закрити вікно</el-button>
                <el-button type="danger" @click="deleteProduct">Видалити</el-button>
                <el-button type="success" @click="submitProduct">{{productDialog.create?'Створити':'Оновити'}}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
                width="80%"
                title="Створкння продукту. Виберіть групу"
                center
                @open="checkLoadGroups"
                :visible.sync="groupDialog.visible">
            <el-row type="flex" justify="center">
                <el-form :model="product" ref="groupsForm" label-width="120px">
                    <el-form-item
                            prop="groupId"
                            label="Назва групи"
                            :rules="requiredInputRule">
                        <el-select v-model="product.groupId"
                                   filterable clearable placeholder="Виберіть групу">
                            <el-option
                                    v-for="item in allGroups"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="groupDialog = {visible:false}">Закрити</el-button>
                <el-button type="primary" :disabled="!Boolean(product.groupId)" @click="openProductDialog">Далі
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
	import bus from '../helpers/bus'

	const modelProduct = {
		description: '',
		groupId: '',
		id: '',
		imagePath: null,
		isActive: true,
		isVisible: false,
		itemCount: 0,
		name: '',
		price: 0,
		productValues: [],
		shortDescription: '',
	}

	export default {
		name: 'ProductsDialog',
		data() {
			return {
				requiredInputRule: [{required: true, message: 'Заповніть поле', trigger: ['blur', 'change']}],

				allGroups: [],
				productFilesList: [],

				groupDialog: {
					visible: false
				},
				productDialog: {
					visible: false,
					create: false
				},

				product: {...modelProduct}
			}
		},
		created() {
			bus.$on('editProduct', this.editProduct)
			bus.$on('createProduct', this.createProduct)
		},
		methods: {
			// used

			uploadError(err) {
				this.$notifyError({msg: err})
				this.$refs.upload.clearFiles()
			},
			/**
			 *
			 */
			getAllGroups() {
				this.$api('/groups').then(res => {
					this.allGroups = res.data
				}).catch(err => {
					this.$set(this.productDialog, 'visible', false)
					this.$set(this.groupDialog, 'visible', false)
					this.$notifyError({msg: `Не вдалось завантажити список усіх груп. ${err.messages}`})
				})
			},

			resetDialogs() {
				this.productFilesList = []
				this.groupDialog = {
					visible: false
				}
				this.productDialog = {
					visible: false,
					create: false
				}

				this.product = {...modelProduct}

				this.$nextTick(() => {
					this.$refs['productForm'].clearValidate()
					this.$refs['groupsForm'].clearValidate()
				})
			},
			/**
			 * Detail characteristic
			 */
			addCharacteristic() {
				this.product.productValues.push({
					name: '',
					value: ''
				})
			},

			removeCharacteristic(item) {
				const index = this.product.productValues.indexOf(item)
				if (index !== -1) {
					this.product.productValues.splice(index, 1)
				}
			},
			/**
			 *  Product actions
			 */
			submitProduct() {
				this.$refs['productForm'].validate(valid => {
					if (!valid) return false
					this.$api.put(`/products/${this.product.id}`, this.product).then(() => {
						bus.$emit('reloadTableProducts')
						this.$notifySuccess()
						this.resetDialogs()
					}).catch(err => {
						this.$notifyError({msg: `Не вдалося зберегти. ${err.message}`})
					})
				})
			},
			deleteProduct() {
				this.$confirm('Ви впевнені що бажаєте видалити?').then(() => {
					this.$api.delete(`/products/${this.product.id}`).then(() => {
						this.resetDialogs()
						bus.$emit('reloadTableProducts')
					}).catch(err => {
						this.$notifyError({msg: `Не вдалося видалити продукт. ${err.message}`})
					})
				})
			},
			/**
			 *  Hook product dialog
			 */
			openProductDialog() {
				this.$api.post('/products', {
					groupId: this.product.groupId,
					name: 'Новий продукт'
				}).then(res => {
					this.$set(this.productDialog, 'visible', true)
					this.product = res.data
				}).catch(err => {
					this.$notifyError({msg: `Не вдалось завантажити. ${err.message}`})
				}).finally(() => {
					this.$set(this.groupDialog, 'visible', false)
				})
			},
			/**
			 *  -------
			 */
			checkLoadGroups() {
				if (!this.allGroups.length) this.getAllGroups()
			},
			/**
			 * Upload
			 */
			getImages() {
				this.$api(`/products/${this.product.id}/images`).then(res => {
					//TODO змінити url перед сборкою
					this.productFilesList = res.data.map(item => {
						return {
							...item, url: `
                        http://acgproduct-001-site1.gtempurl.com/api/products/${this.product.id}/images/${item.id}/content
                        `
						}
					})
				}).catch(err => {
					this.$notifyError({msg: `Не вдалось завантажити список картинок ${err}`})
				})
			},
			handleRemove(file, fileList) {
				this.$api.delete(`/products/${this.product.id}/images/${file.id}`).then(() => {
					this.productFilesList = fileList
				}).catch(err => {
					this.$notifyError({msg: `Сталась помилка. ${err}`})
				})
			},
			/**
			 * Init mode(create or not create) dialog
			 */
			createProduct() {
				this.groupDialog = {
					visible: true,
				}
				this.$set(this.productDialog, 'create', true)
			},
			editProduct(product) {
				this.productDialog = {
					visible: true,
					create: false
				}
				this.product = product
				this.getImages()
			},
		}
	}
</script>

<style>
    .el-upload {
        width: 100%;
    }

    .el-upload-dragger {
        width: 100%;
    }
</style>
