<template>
    <el-container direction="vertical" class="groups bg-white">
        <el-row type="flex" align="middle">
            <el-col :span="4">
                <h2>Групи</h2>
            </el-col>
            <el-col :span="5">
                <el-button @click="createGroup" type="primary" size="small" icon="el-icon-plus" round>Cтворити групу
                </el-button>
            </el-col>
            <el-col :span="5">
                <el-checkbox v-model="allGroups">Показати всі групи</el-checkbox>
            </el-col>
        </el-row>
        <groups-tree :groups="groups" @edit-group="editGroup"/>
        <groups-dialog
                v-bind:visible.sync="dialog.visible"
                :groupInfo.sync="dialog.group"
                @update-group="getGroups"
        />
    </el-container>
</template>

<script>
	import GroupsDialog from '../components/GroupsDialog'
	import GroupsTree from '../components/GroupsTree'

	export default {
		name: 'Groups',
		components: {
			GroupsDialog,
			GroupsTree
		},
		data() {
			return {
				activeCollapse: '',
				allGroups: false,
				groups: [],
				dialog: {
					visible: false,
					group: {}
				}
			}
		},
		watch: {
			allGroups() {
				this.getGroups()
			}
		},
		beforeMount() {
			this.getGroups()
		},
		methods: {
			getGroups() {
				let params = {
					isTopLevelGroup: true
				}
				if (this.allGroups) params = {}

				this.$api.get('/groups', {
					params
				}).then(res => {
					this.groups = res.data
					this.activeCollapse = ''
				}).catch(err => {
					this.activeCollapse = ''
					this.$notify({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
				})
			},
			createGroup() {
				this.dialog = {
					visible: true,
					group: {}
				}
			},
			editGroup(group) {
				this.dialog = {
					visible: true,
					group
				}
            }
		}
	}
</script>

<style scoped lang="scss">
    .groups {
        padding: 10px;
    }
</style>