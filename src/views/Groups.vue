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
        </el-row>
        <el-collapse accordion @change="changeOpenGroup">
            <el-collapse-item v-for="(group,index) in groups" :name="index" :key="group.id">
                <template slot="title">
                    <el-row class="groups__collapse-row" type="flex" justify="space-between">
                        <el-col style="font-weight: bold">{{group.name}}</el-col>
                        <el-col :span="2">
                            <el-button
                                    class="groups__edit"
                                    @click="editGroup(group)"
                                    type="primary" icon="el-icon-edit" circle></el-button>
                        </el-col>
                    </el-row>
                </template>
                <div v-if="group.subGroupLoad">
                    <div v-for="subGroup in group.subGroups" :key="subGroup.id">
                        <el-row class="groups__collapse-row groups__collapse-row--inner" type="flex" justify="space-between">
                            <el-col>{{subGroup.name}}</el-col>
                            <el-col :span="2">
                                <el-button
                                        class="groups__edit"
                                        @click="editGroup(subGroup)"
                                        type="primary" icon="el-icon-edit" circle></el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div v-else>
                    <strong>Loading...</strong>
                </div>
            </el-collapse-item>
        </el-collapse>
        <groups-dialog
                v-bind:visible.sync="dialog.visible"
                :groupInfo.sync="dialog.group"
                @update-group="getGroups"
        />
    </el-container>
</template>

<script>
	import GroupsDialog from '../components/GroupsDialog'

	export default {
		name: 'Groups',
		components: {
			GroupsDialog
		},
		data() {
			return {
				groups: [],
				dialog: {
					visible: false,
					group: {}
				}
			}
		},
		beforeMount() {
			this.getGroups()
		},
		methods: {
			getGroups() {
				this.$api.get('/groups', {
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
				this.$api.get(`/groups/${activeGroup.parentGroupId}/groups/`).then(res => {
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

    .groups__edit {
        opacity: 0;

    }

    .groups__collapse-row {
        border: 1px solid #f0f0f0;
        padding-left: 15px;
        font-size: 15px;

        &--inner {
            display: flex;
            align-items: center;
            font-size: 16px;
        }

        &:hover {
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.13);
            cursor: pointer;
        }

        &:hover .groups__edit {
            opacity: 1;
        }
    }
</style>