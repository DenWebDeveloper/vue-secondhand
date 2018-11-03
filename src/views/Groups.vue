<template>
    <el-container direction="vertical" class="bg-white" style="padding: 10px">
        <el-row type="flex" align="middle">
            <el-col :span="4">
                <h2>Групи</h2>
            </el-col>
            <el-col :span="5">
                <el-button @click="createGroup" type="primary" size="small" icon="el-icon-plus" round>Cтворити групу
                </el-button>
            </el-col>
            <el-col :span="5">
                <el-checkbox v-model="allGroupsVisible">Показати всі групи</el-checkbox>
            </el-col>
        </el-row>
        <groups-all-list v-if="allGroupsVisible" :visible="allGroupsVisible"/>
        <groups-tree v-else/>
        <groups-dialog
                v-bind:visible.sync="dialog.visible"
                :groupInfo.sync="dialog.group"
        />
        <!--@update-group="getGroups"-->
    </el-container>
</template>

<script>
	import {bus} from '../helpers/bus'

	import GroupsDialog from '../components/GroupsDialog'
	import GroupsTree from '../components/GroupsTree'
	import GroupsAllList from '../components/GroupsAllList'

	export default {
		name: 'Groups',
		components: {
			GroupsDialog,
			GroupsTree,
			GroupsAllList
		},
		data() {
			return {
				allGroupsVisible: false,
				dialog: {
					visible: false,
					group: {}
				}
			}
		},
		created() {
			bus.$on('editGroup', this.editGroup)
		},
		methods: {
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