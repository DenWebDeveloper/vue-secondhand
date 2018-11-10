<template>
    <ul class="all-groups">
        <li v-for="group in groups" class="all-groups__items" :key="group.id">
            <div class="all-groups__name">{{group.name}}</div>
            <el-button
                    class="groups__edit"
                    @click.stop="editGroup(group)"
                    type="primary" icon="el-icon-edit" circle></el-button>
        </li>
    </ul>
</template>

<script>
	import bus from '../helpers/bus'

	export default {
		name: 'GroupsAllList',
		props: {
			visible: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				groups: [],
				loaded: false
			}
		},
		beforeMount() {
			if (!this.loaded) this.getAllGroups()
		},
		methods: {
			getAllGroups() {
				this.$api.get('/groups/').then(res => {
					this.groups = res.data
					this.loaded = true
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

<style scoped lang="scss">
    .all-groups {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .all-groups__items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        margin-bottom: 5px;
        box-shadow: 0 0 0 #fff;
        border: 1px solid #ccc;
    }
</style>