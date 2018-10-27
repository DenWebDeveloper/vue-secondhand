<template>
    <el-dialog
            :title="`${isCreate?'Створити':'Оновити'} групу`"
            :visible="visible"
            :before-close="handleClose"
            @open="handleOpen"
            width="90%">
        <el-form :model="group" ref="groupForm" label-width="150px">
            <el-row type="flex" justify="space-between">
                <el-col :span="14">
                    <el-form-item
                            prop="name"
                            label="Назва групи"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'blur'}">
                        <el-input v-model="group.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Батьківська група">
                        <el-select v-model="group.parentGroupId"
                                   :disabled="group.isTopLevelGroup"
                                   filterable clearable placeholder="Виберіть групу">
                            <el-option
                                    v-for="item in filterAllGroup"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            prop="shortDescription"
                            label="Короткий опис"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'blur'}">
                        <el-input v-model="group.shortDescription"></el-input>
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
                        <el-checkbox
                                v-model="group.isTopLevelGroup"
                                :disabled="parseInt(group.parentGroupId)">Група вищого рівня(основне меню)
                        </el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="group.visibleMenu">Видима (показувати у меню)</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                                :thumbnail-mode="true"
                                class="group-uploader"
                                :on-success="uploadSuccess"
                                :limit="1"
                                :action="`http://acgproduct-001-site1.gtempurl.com/api/images/${group.id}/groups`">
                            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb. Limit:1
                                photo
                            </div>
                            <i class="el-icon-plus group-uploader-icon"></i>
                        </el-upload>
                        <img v-if="imgLoad"
                             :src="`http://temppostasp-001-site1.atempurl.com//images/groups/${group.id}`"
                             alt="">
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Закрити вікно</el-button>
            <el-button type="warning" @click="toggleVisibleGroup">{{group.isVisible?'Приховати':'Показати'}}</el-button>
            <el-button type="danger" @click="deleteGroup">Видалити</el-button>
            <el-button type="success" @click="submitForm">{{isCreate?'Створити':'Оновити'}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
	export default {
		name: 'GroupsDialog',
		props: {
			visible: Boolean,
			groupInfo: Object
		},
		data() {
			return {
				imgLoad: '',
				allGroups: [],
				group: {
					id: '',
					name: '',
					description: '',
					shortDescription: '',
					isTopLevelGroup: true,
					visibleMenu: true,
					parentGroupId: ''
				},
				subDialog: {
					visible: false,
					group: {}
				}
			}
		},
		computed: {
			isCreate() {
				return typeof this.groupInfo.id === 'undefined'
			},
			filterAllGroup() {
				return this.allGroups.filter(item => {
					return item.id !== this.group.id
				})
			}
		},
		methods: {
			getAllGroups() {
				this.$api('/groups').then(res => {
					this.allGroups = res.data
				}).catch(err => {
					this.$notify.error({
						title: 'Сталась помилка',
						message: `Не вдалось завантажити список усіх груп. ${err.messages}`,
						duration: 0
					})
				})
			},
			handleOpen() {
				if (this.isCreate) {
					this.$api.post('/groups', {
						name: 'Нова група',
						isTopLevelGroup: 1,
					}).then(res => {
						console.log(res.data)
						this.group = res.data
						window.z = this
						this.$api(`/groups/${res.data.id}/images`)

					}).catch(err => {
						this.$notify.error({
							title: 'Сталась помилка',
							message: `Обновіть сторінку. ${err}`,
							duration: 0
						})
					})
				} else {
					this.group = this.groupInfo
				}
				this.getAllGroups()
				this.$refs['groupForm'].resetFields()
			},
			submitForm() {
				this.$refs['groupForm'].validate((valid) => {
					if (!valid) return false
					const {name, description, parentGroupId, isTopLevelGroup, isVisible, isActive} = this.group
					this.$api.put(`/groups/${this.group.id}`, {
						name, description,
						parentGroupId,
						isTopLevelGroup: Number(isTopLevelGroup),
						isVisible: Number(isVisible),
						isActive: Number(isActive),
					}).then(() => {
						this.$emit('update:visible', false)
						this.$emit('update-group')
					})
				})
			},
			uploadSuccess() {
				this.imgLoad = true
			},
			handleClose(done) {
				this.$emit('update:visible', false)
				this.$emit('update-group')
				this.$emit('update:groupInfo', {})
				if (typeof done === 'function') {
					done()
				}
			},
			toggleVisibleGroup() {
				const {isVisible} = this.group
				this.$api.put(`/groups/${this.group.id}`, {
					isVisible: !isVisible
				}).then(() => {
					this.$emit('update:visible', false)
					this.$emit('update-group')
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

    .group-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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