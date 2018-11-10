<template>
    <el-collapse-item :name="name">
        <template slot="title">
            <el-row class="groups__collapse-row" type="flex"
                    justify="space-between">
                <el-col :span="1">
                    <i class="el-icon-caret-bottom"></i>
                </el-col>
                <el-col style="font-weight: bold">{{group.name}}</el-col>
                <el-col :span="2">
                    <el-button
                            class="groups__edit"
                            @click.stop="editGroup(group)"
                            type="primary" icon="el-icon-edit" circle></el-button>
                </el-col>
            </el-row>
        </template>
        <template v-if="open">
            <div v-if="!subGroups.loading">
                <template v-if="subGroups.groups.length !== 0">
                    <el-collapse class="collapse" accordion v-model="activeCollapse">
                        <groups-tree-item
                                v-for="subGroup in subGroups.groups"
                                :group="subGroup"
                                :open="activeCollapse === subGroup.id"
                                :name="subGroup.id"
                                :key="subGroup.id"/>
                    </el-collapse>
                </template>
                <div v-else>
                    <strong>Пігрупи не знайдено</strong>
                </div>
            </div>
            <div v-else>
                <strong>Loading...</strong>
            </div>
        </template>
    </el-collapse-item>
</template>

<script>
	import GroupsTreeItem from './GroupsTreeItem'
	import bus from '../helpers/bus'
	// поставити watch на відкритість групи і якщо буде true  то завантажити осналльний список
	export default {
		name: 'GroupsTreeItem',
		components: {
			GroupsTreeItem
		},
		data() {
			return {
				activeCollapse: '',
				subGroups: {
					loading: false,
					groups: []
				}
			}
		},
		props: {
			group: {
				type: Object,
				require: true
			},
			name: {
				type: String, // id group
				require: true
			},
			open: {
				type: Boolean,
				require: true
			},
		},
		watch: {
			open: {
				handler(val) {
					if (val) this.getGroups()
				},
				immediate: true
			}
		},
		methods: {
			getGroups() {
				this.$set(this.subGroups, 'loading', true)
				this.$api.get(`/groups/${this.name}/groups`).then(res => {
					this.subGroups = {
						loading: false,
						groups: res.data
					}
				}).catch(err => {
					this.$notifyError({
						errMsg: `Обновіть сторінку. ${err}`,
					})
				})
			},
			editGroup(group) {
				bus.$emit('editGroup', group)
			}
		}
	}
</script>

<style scoped>
    .collapse {
        margin-left: 15px;
    }
</style>