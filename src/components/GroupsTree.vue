<template>
    <el-collapse class="groups-collapse" accordion v-model="activeCollapse">
        <groups-three-item
                v-for="group in groups"
                :group="group"
                :open="activeCollapse === group.id"
                :name="group.id"
                :key="group.id"/>
    </el-collapse>
</template>

<script>
	import bus from '../helpers/bus'

	import GroupsThreeItem from './GroupsTreeItem'
	export default {
		name: 'GroupsTree',
		components: {
			GroupsThreeItem
		},
		data() {
			return {
				activeCollapse: '',
				groups: []
			}
		},
		beforeMount() {
			this.getGroups()
		},
		created() {
			bus.$on('updateGroups', this.getGroups)
		},
		beforeDestroy() {
			bus.$off('updateGroups', this.getGroups)
		},
		methods: {
			getGroups() {
				this.$api.get('/groups', {
					params: {
						isTopLevelGroup: true
					}
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
			editGroup(group) {
				this.emit('edit-group', group)
			},
		}
	}
</script>

<style lang="scss">
    .groups-collapse {
        .el-collapse-item__arrow {
            display: none;
        }
    }
</style>
