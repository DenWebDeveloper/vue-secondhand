<template>
    <el-dialog
            title="Створити групу"
            :visible="visible"
            :before-close="handleClose"
            @open="handleOpen"
            width="90%">
        <el-form :model="group" ref="groupForm" label-width="150px">
            <el-row type="flex" justify="space-between">
                <el-col :span="17">
                    <el-form-item
                            prop="name"
                            label="Назва групи"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'change'}">
                        <el-input v-model="group.name"></el-input>
                    </el-form-item>
                    <el-form-item
                            v-for="(item, index) in group.subGroups"
                            :label="'Назва підгрупи ' + (index + 1)"
                            :key="item.key"
                            :prop="'subGroups.' + index + '.value'"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'change'}">
                        <el-input v-model="item.value">
                            <template slot="append">
                                <el-button @click.prevent="removeSubGroup(index)">Видалити</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click.prevent="addSubGroup()">Додати підгрупу</el-button>
                    </el-form-item>
                    <el-form-item
                            prop="description"
                            label="Опис"
                            :rules="{ required: true, message: 'Поле не може бути пустим', trigger: 'change'}">
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
            <el-button @click="submitForm">Зберегти</el-button>
            <el-button @click="handleClose">Приховати</el-button>
        </div>
    </el-dialog>
</template>

<script>
	export default {
		name: 'GroupsModal',
		props: {
			visible: Boolean,
			create: Boolean
		},
		data() {
			return {
				imgLoad: '',
				group: {
					id: '',
					name: '',
					subGroups: [
						{
							key: new Date().toString(),
							value: ''
						}
					],
					description: ''
				},
			}
		},
		methods: {
			handleOpen() {
				if (this.group.id.length !== 0) return
				this.$api.post('/groups', {name: 'Нова група', isTopLevelGroup: 1}).then(res => {
					this.$set(this.group, 'id', res.data.id)
				}).catch( err =>{
					this.$notify.error({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
                })
			},
			addSubGroup() {
				this.group.subGroups.push({
					key: new Date().toString(),
					value: ''
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
					})
				})
			},
			uploadSuccess() {
				this.imgLoad = true
			},
			handleClose(done) {
				this.$emit('update:visible', false)
				if (typeof done === 'function') {
					done()
				}
			}
		}
	}
</script>

<style>
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
</style>