<template>
    <el-dialog
            :title="`${isCreate?'Створити':'Оновити'} групу`"
            :visible="visible"
            :before-close="handleClose"
            @open="handleOpen"
            width="90%">
        <el-form :model="group" ref="productForm" label-width="150px">
            <el-row type="flex" justify="space-between">
                <el-col :span="14">
                    <el-form-item label="Назва групи" prop="nameGroup">
                        <el-select v-model="product.nameGroupTopLevel"
                                   filterable clearable placeholder="Виберіть групу">
                            <el-option
                                    v-for="item in allGroupsTopLevel"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Назва підгрупи" prop="nameSubGroup">
                        <el-select v-model="product.subGroup"
                                   :disabled="product.nameGroupTopLevel.length === 0"
                                   filterable clearable placeholder="Виберіть групу">
                            <el-option
                                    v-for="item in subGroups"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            prop="name"
                            label="Назва товару"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'blur'}">
                        <el-input v-model="group.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Розмір">
                        <el-select v-model="group.parentGroupId"
                                   :disabled="group.isTopLevelGroup"
                                   filterable clearable placeholder="Виберіть розмір">
                            <el-option
                                    v-for="item in filterAllGroup"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Колір">
                        <el-select v-model="group.parentGroupId"
                                   :disabled="group.isTopLevelGroup"
                                   filterable clearable placeholder="Виберіть розмір">
                            <el-option
                                    v-for="item in filterAllGroup"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            prop="description"
                            label="Ціна"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'blur'}">
                        <el-input type="textarea" v-model="group.description"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="description"
                            label="Опис"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'blur'}">
                        <el-input type="textarea" v-model="group.description"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item>
                        <el-button v-if="imgId && !visibleGroup" style="margin-bottom: 10px"
                                   @click="visibleGroup = true">Додати картинку
                        </el-button>
                        <el-upload
                                v-if="!imgId || visibleGroup"
                                class="group-uploader"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :limit="1"
                                accept="image/*"
                                ref="upload"
                                drag
                                :action="`http://acgproduct-001-site1.gtempurl.com/api/groups/image/${group.id}`">
                            <div slot="tip" class="el-upload__tip">Limit:1 photo</div>
                            <i class="el-icon-plus group-uploader-icon"></i>
                        </el-upload>
                        <img v-if="imgId"
                             class="group-img-preview"
                             :src="`http://acgproduct-001-site1.gtempurl.com/api/groups/${group.id}/images/${imgId}/content`"
                             alt="Preview">
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Закрити вікно</el-button>
            <el-button v-if="!isCreate" type="warning" @click="toggleVisibleGroup">
                {{group.isVisible?'Приховати':'Показати'}}
            </el-button>
            <el-button type="danger" @click="deleteGroup">Видалити</el-button>
            <el-button type="success" @click="submitForm">{{isCreate?'Створити':'Оновити'}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
	import {bus} from '../helpers/bus'

	export default {
		name: 'ProductsDialog',
		props: {
			visible: {
				type: Boolean,
				required: true
			},
			productInfo: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				imgId: null,
				allGroupsTopLevel: [],
				subGroups: [],

				allGroups: [],
				visibleGroup: false,
				product: {
					nameGroupTopLevel: '',
					subGroup: ''
				}
			}
		},
		computed: {
			isCreate() {
				return typeof this.productInfo.id === 'undefined'
			}
		},
		watch: {
			'product.subGroup': function (val) {
				if (val.length !== 0) this.getSubGroups()
			}
		},
		methods: {
			getAllGroups() {
				this.$api('/groups', {
					params: {
						isTopLevelGroup: true
					}
				}).then(res => {
					this.allGroupsTopLevel = res.data
				}).catch(err => {
					this.handleClose()
					this.$notifyError({errMsg: `Не вдалось завантажити список усіх груп. ${err.messages}`})
				})
			},
			getSubGroups() {
				this.$api(`/groups/${this.parentGroupId}/groups`).then(res => {
					this.allGroupsTopLevel = res.data
				}).catch(err => {
					this.$notifyError({errMsg: `Не вдалось завантажити список підгруп. ${err.messages}`})
				})
			},
			getImgId(productId) {
				this.$api(`/groups/${productId}/images`).then(res => {
					if (res.data.length === 0) return null
					this.imgId = res.data[0].id
				})
			},
			handleOpen() {
				this.imgId = null
				if (this.isCreate) {
					this.$api.post('/groups', {
						name: 'Нова група'
					}).then(res => {
						this.group = res.data
						this.getImgId(res.data.id)
					}).catch(err => {
						this.$notify.error({
							title: 'Сталась помилка',
							message: `Обновіть сторінку. ${err}`,
							duration: 0
						})
					})
				} else {
					this.group = Object.assign({}, this.productInfo)

					this.getImgId(this.groupInfo.id)
				}
				this.getAllGroups()
				this.$nextTick(() => {
					this.$refs['productForm'].clearValidate()
					this.$refs.upload.clearFiles()
				})
			},
			submitForm() {
				this.$refs['groupForm'].validate((valid) => {
					if (!valid) return false
					const {name, description, parentGroupId, shortDescription, isTopLevelGroup, isVisible, isActive} = this.group
					this.$api.put(`/groups/${this.group.id}`, {
						name, description,
						parentGroupId,
						isTopLevelGroup: isTopLevelGroup,
						isVisible: isVisible,
						isActive: isActive,
						shortDescription,
					}).then(() => {
						this.$notify({
							title: 'Все добре :)',
							message: 'Всі данні збережені',
							type: 'success'
						})
						this.handleClose()
					})
				})
			},
			uploadError(err) {
				this.$notifyError({errMsg: err})
				this.$refs.upload.clearFiles()
			},
			uploadSuccess() {
				this.$api(`/groups/${this.group.id}/images`).then(res => {
					this.imgId = res.data[0].id
					this.$refs.upload.clearFiles()
				})
			},
			handleClose(done) {
				this.$emit('update:visible', false)
				bus.$emit('updateGroups')
				this.$emit('update:groupInfo', {})
				if (typeof done === 'function') {
					done()
				}
			},
			toggleVisibleGroup() {
				const {isVisible} = this.group
				this.$api.put(`/groups/${this.group.id}`, {
					...this.group, ...{isVisible: !isVisible}
				}).then(() => {
					this.handleClose()
				})
			},
			deleteGroup() {
				this.$api.delete(`/groups/${this.group.id}`).then(() => {
					this.$emit('update:visible', false)
					this.$emit('update:groupInfo', {})
					this.$emit('update-group')
					this.$notify({
						title: 'Успішно',
						message: 'Група була видалена',
						duration: 3000,
						type: 'success'
					})
				}).catch(err => {
					this.$notify.error({
						title: 'Сталась помилка',
						message: `Можливо група не була видалена. ${err}`,
						duration: 0
					})
				})
			}
		}
	}
</script>

<style lang="scss">
    .button-edit:hover {
        font-weight: bold;
    }

    .group-img-preview {
        width: 100%;
    }

    .group-uploader .el-upload-dragger {
        width: 100%;
    }

    .group-uploader .el-upload {
        width: 100%;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .group-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .group-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .group {
        width: 178px;
        height: 178px;
        display: block;
    }

    .el-input-group__append {
        border: none;

        .group__button-append--danger.el-button {
            color: #fff;
            background-color: #f56c6c;
            border: 1px solid #f56c6c;
            border-radius: 0 4px 4px 0;

            &:hover {
                background-color: darken(#f56c6c, 20%);
            }
        }

        .group__button-append--warning.el-button {
            color: #fff;
            background-color: #e6a23c;
            border-color: #e6a23c;

            &:hover {
                background-color: darken(#e6a23c, 10%);
            }
        }
    }
</style>