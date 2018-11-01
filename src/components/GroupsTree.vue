<template>
    <el-collapse accordion v-model="activeCollapse" @change="changeOpenGroup">
        <el-collapse-item v-for="(group,index) in groups" :name="index" :key="group.id">
            <template slot="title">
                <el-row :class="`${!group.isTopLevelGroup && 'not-top-group'}`" class="groups__collapse-row" type="flex"
                        justify="space-between">
                    <el-col :span="1">
                        <i class="el-icon-caret-bottom"></i>
                    </el-col>
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
                    <el-row class="groups__collapse-row groups__collapse-row--inner" type="flex"
                            justify="space-between">
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
</template>

<script>
	export default {
		name: 'GroupsTree',
		props: {
			groups: {
				type: Object,
				require: true
			}
		},
		methods: {
			changeOpenGroup(val) {
				if (!String(val).length) return
				const groups = this.groups.slice()
				const activeGroup = groups[val]

				if (activeGroup.subGroupLoad) return
				this.$api.get(`/groups/${activeGroup.id}/groups/`).then(res => {
					activeGroup.subGroupLoad = true
					activeGroup.subGroups = res.data
					this.groups = groups
				}).catch(err => {
					this.$notify.error({
						title: 'Сталась помилка',
						message: `Обновіть сторінку. ${err}`,
						duration: 0
					})
				})
			},
			editGroup(group) {
				this.emit('edit-group', group)
			}
		}
	}
</script>

<style lang="scss" scoped>
    .groups__edit {
        opacity: 0;

    }

    .not-top-group {
        position: relative;
        &:before {
            content: '';
            position: absolute;
            width: 5px;
            top: 0;
            display: block;
            left: 0;
            bottom: 0;
            background-color: #409eff;
        }
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