<template>
    <el-dialog
            :title="`${isCreate?'Створити':'Оновити'} групу`"
            :visible="visible"
            :before-close="handleClose"
            @open="handleOpen"
            append-to-body
            width="90%">
        <el-form :model="group" ref="groupForm" label-width="150px">
            <el-row type="flex" justify="space-between">
                <el-col :span="17">
                    <el-form-item
                            prop="name"
                            label="Назва групи"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'blur'}">
                        <el-input v-model="group.name"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="description"
                            label="Опис"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'blur'}">
                        <el-input type="textarea" v-model="group.description"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-upload
                            :thumbnail-mode="true"
                            class="group-uploader"
                            :on-success="uploadSuccess"
                            :limit="1"
                            :action="`http://temppostasp-001-site1.atempurl.com/api/images/${group.id}/groups`">
                        <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb. Limit:1
                            photo
                        </div>
                        <i class="el-icon-plus group-uploader-icon"></i>
                    </el-upload>
                    <img v-if="imgLoad" :src="`http://temppostasp-001-site1.atempurl.com//images/groups/${group.id}`"
                         alt="">
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Приховати вікно</el-button>
            <el-button type="danger" @click="deleteGroup">Видалити</el-button>
            <el-button type="success" @click="submitForm">{{isCreate?'Створити':'Оновити'}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
	export default {
		name: 'SubGroupsDialog',
		props: {
			visible: Boolean,
			parentGroup: Object,
			groupInfo: Object
		},
		data() {
			return {
				imgLoad: '',
				group: {
					id: '',
					name: '',
					subGroups: [],
					description: ''
				},
			}
		},
		computed: {
			isCreate() {
				return this.groupInfo.id === 'undefined'
			}
		},
		methods: {
			handleOpen() {
				if (true) {/*this.isCreate*/
					window.z = this
					this.$api.post(`/groups/${this.parentGroup.id}/groups`, {name: 'Нова підгрупа', isTopLevelGroup: 1}).then(res => {
						this.$set(this.group, 'id', res.data.id)
					}).catch(err => {
						this.$notify.error({
							title: 'Сталась помилка',
							message: `Обновіть сторінку. ${err}`,
							duration: 0
						})
					})
				} else {
					this.group = this.parentGroup
				}
				this.$refs['groupForm'].resetFields()
			},
			addSubGroup() {
				this.group.subGroups.push({
					key: new Date().toString(),// значення ключа не відправляється на сервер. Він використовується у сложбових цілях
					name: ''
				})
			},
			removeSubGroup(index) {
				this.group.subGroups.splice(index, 1)
			},
			submitForm() {
				this.$refs['groupForm'].validate((valid) => {
					if (!valid) return false
					const {name, description} = this.group
					this.$api.put(`/groups/${this.group.id}`, {
						name, description
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
				this.$emit('update:parentGroup', {})
				if (typeof done === 'function') {
					done()
				}
			},
			deleteGroup() {
				this.$api.delete(`/groups/${this.group.id}`).then(() => {
					this.$emit('update:visible', false)
					this.$emit('update:parentGroup', {})
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