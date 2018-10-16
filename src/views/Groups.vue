<template>
    <el-container direction="vertical" class="groups bg-white">
        <el-row type="flex" align="middle">
            <el-col :span="4">
                <h2>Групи</h2>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" size="small" icon="el-icon-plus" round>Cтворити групу</el-button>
            </el-col>
        </el-row>
        <el-collapse accordion @change="changeOpenGroup">
            <el-collapse-item v-for="(group,index) in groups" :name="index" :key="group.id">
                <template slot="title">
                    <el-row type="flex" justify="space-between">
                        <el-col>{{group.name}}</el-col>
                        <el-col :span="2">
                            <el-button type="primary" icon="el-icon-edit" circle></el-button>
                        </el-col>
                    </el-row>
                </template>
                <div v-if="group.subGroupLoad">
                    <div v-for="subGroup in group.subGroups" :key="subGroup.id">
                        {{subGroup.name}}
                    </div>
                </div>
                <div v-else>
                    <strong>Loading...</strong>
                </div>
            </el-collapse-item>
        </el-collapse>
        <el-dialog
                title="Створити групу"
                :visible.sync="dialogVisibleOrder"
                width="90%">
            <el-form label-width="120px">
                <el-row type="flex" justify="space-between">
                    <el-col :span="11">
                        <el-form-item label="Назва групи">
                            <el-input v-model="tempCreateGroup.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Назва підгрупи">
                            <el-input v-model="tempCreateGroup.subName"></el-input>
                        </el-form-item>
                        <el-form-item label="Опис">
                            <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-upload
                                class="group-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/">
                            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                            <i class="el-icon-plus group-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogOrder">Приховати</el-button>
                <el-button @click="rejectOrder" icon="el-icon-close" type="danger">Видалити</el-button>
                <el-button @click="resolveOrder" icon="el-icon-check" type="success">Створити</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
	import index from '../api/api'

	export default {
		name: 'Home',
		data() {
			return {
				groups: [],
				tempCreateGroup: {
					name: '',
					subName: '',
					description: ''
				},
				dialogVisibleOrder: true
			}
		},
		beforeMount() {
			this.getGroups()
		},
		methods: {
			getGroups() {
				index.get('/groups', {
					params: {
						isTopLevelGroup: 1
					}
				}).then(res => {
					this.groups = res.data
				}).catch(err => {
					this.$notify({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
				})
			},
			changeOpenGroup(val) {
				if (!String(val).length) return
				const groups = this.groups.slice()
				const activeGroup = groups[val]

				if (activeGroup.subGroupLoad) return
				index.get(`/groups/${activeGroup.parentGroupId}/groups/`).then(res => {
					activeGroup.subGroupLoad = true
					activeGroup.subGroups = res.data
					this.groups = groups
				}).catch(err => {
					this.$notify({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
				})
			}
		}
	}
</script>

<style>
    .groups {
        padding: 10px;
    }

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