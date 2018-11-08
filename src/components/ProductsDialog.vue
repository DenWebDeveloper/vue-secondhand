<template>
    <div>
        <el-dialog
                :title="`${create?'Створити':'Оновити'} групу`"
                :visible="visibleProduct"
                :before-close="handleClose"
                @open="handleOpenGroupsGialog"
                width="90%"
                append-to-body>
            <el-form :model="product" ref="productForm" label-width="150px">
                <el-row type="flex" justify="space-between">
                    <el-col :span="14">
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Ім'я" prop="name">
                            <el-input v-model.trim="product.name"/>
                        </el-form-item>
                        <el-form-item prop="type">
                            <el-checkbox v-model="product.isActive">Показати товар на сайті</el-checkbox>
                        </el-form-item>
                        <el-form-item
                                prop="groupId"
                                label="Назва групи"
                                :rules="[{ required: true, message: 'Виберіть групу', trigger: ['blur','change']}]">
                            <el-select v-model="product.groupId"
                                       filterable clearable placeholder="Виберіть групу">
                                <el-option
                                        v-for="item in allGroups"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Ціна" prop="price">
                            <el-input v-model.trim="product.price"/>
                        </el-form-item>
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Короткий опис" prop="shortDescription">
                            <el-input v-model.trim="product.shortDescription"/>
                        </el-form-item>
                        <el-form-item
                                :rules="requiredInputRule"
                                label="Опис" prop="description">
                            <el-input type="textarea" v-model.trim="product.description"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-button v-if="imgId && !visibleGroup" style="margin-bottom: 10px"
                                   @click="visibleGroup = true">Додати картинку
                        </el-button>
                        <el-upload
                                class="upload-demo"
                                :action="`http://acgproduct-001-site1.gtempurl.com/api/products/${product.id}/images`"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="productFilesList"
                                list-type="picture">
                            <el-button size="small" type="primary">Click to upload</el-button>
                            <div slot="tip">jpg/png files</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">Закрити вікно</el-button>
                <el-button v-if="!create" type="warning" @click="toggleVisibleGroup">
                    {{group.isVisible?'Приховати':'Показати'}}
                </el-button>
                <el-button type="danger" @click="deleteGroup">Видалити</el-button>
                <el-button type="success" @click="submitForm">{{create?'Створити':'Оновити'}}</el-button>
            </div>
        </el-dialog>
        <el-dialog
                width="80%"
                title="Створкння продукту. Виберіть групу"
                center
                @close="handleCloseGroupsGialog"
                @open="handleOpenGroupsGialog"
                :visible="visible">
            <el-row type="flex" justify="center">
                <el-form :model="product" ref="dynamicValidateForm" label-width="120px">
                    <el-form-item
                            prop="groupId"
                            label="Назва групи"
                            :rules="[{ required: true, message: 'Виберіть групу', trigger: ['blur','change']}]">
                        <el-select v-model="product.groupId"
                                   filterable clearable placeholder="Виберіть групу">
                            <el-option
                                    v-for="item in allGroups"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseGroupsGialog">Закрити</el-button>
                <el-button type="primary" :disabled="!Boolean(product.groupId)" @click="openMainDialog">Далі
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import bus from '../helpers/bus'

    export default {
        name: 'ProductsDialog',
        props: {
            visible: {
                type: Boolean,// перше модальне вікно з групами
                required: true
            },
            create: {
                type: Boolean,
                required: true
            },
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                requiredInputRule: [{required: true, message: 'Заповніть поле', trigger: ['blur', 'change']}],
                imgId: null,
                allGroups: [],
                subGroups: [],
                productFilesList: [],
                visibleProduct: false,
                product: {
                    description: '',
                    groupId: '',
                    id: '',
                    imagePath: null,
                    isActive: true,
                    isVisible: false,
                    itemCount: 0,
                    name: '',
                    price: 0,
                    productGroupModel: null,
                    productValues: [],
                    shortDescription: '',
                },
            }
        },
        watch: {
            'product.subGroup': function (val) {
                if (val.length !== 0) this.getSubGroups()
            }
        },
        beforeMount() {
            this.getImages()
        },
        methods: {
            // used
            getAllGroups() {
                this.$api('/groups').then(res => {
                    this.allGroups = res.data
                }).catch(err => {
                    this.$notifyError({errMsg: `Не вдалось завантажити список усіх груп. ${err.messages}`})
                })
            },
            getSubGroups() {
                this.$api(`/groups/${this.parentGroupId}/groups`).then(res => {
                    this.allGroupsTopLevel = res.data
                }).catch(err => {
                    this.$notifyError({errMsg: `Не вдалось завантажити список підгруп. ${err.messages}`})
                })
            },
            getImgId(productId) {
                this.$api(`/groups/${productId}/images`).then(res => {
                    if (res.data.length === 0) return null
                    this.imgId = res.data[0].id
                })
            },
            handleOpen(create = true) {
                this.imgId = null
                if (create) {
                    this.$api.post('/groups', {
                        name: 'Нова група'
                    }).then(res => {
                        this.group = res.data
                        this.getImgId(res.data.id)
                    }).catch(err => {
                        this.$notify.error({
                            title: 'Сталась помилка',
                            message: `Обновіть сторінку. ${err}`,
                            duration: 0
                        })
                    })
                } else {
                    this.group = Object.assign({}, this.productInfo)

                    this.getImgId(this.groupInfo.id)
                }
                this.getAllGroups()
                this.$nextTick(() => {
                    this.$refs['productForm'].clearValidate()
                    this.$refs.upload.clearFiles()
                })
            },
            submitForm() {
                this.$refs['groupForm'].validate((valid) => {
                    if (!valid) return false
                    const {name, description, parentGroupId, shortDescription, isTopLevelGroup, isVisible, isActive} = this.group
                    this.$api.put(`/groups/${this.group.id}`, {
                        name, description,
                        parentGroupId,
                        isTopLevelGroup: isTopLevelGroup,
                        isVisible: isVisible,
                        isActive: isActive,
                        shortDescription,
                    }).then(() => {
                        this.$notify({
                            title: 'Все добре :)',
                            message: 'Всі данні збережені',
                            type: 'success'
                        })
                        this.handleClose()
                    })
                })
            },
            uploadError(err) {
                this.$notifyError({errMsg: err})
                this.$refs.upload.clearFiles()
            },
            uploadSuccess() {
                this.$api(`/groups/${this.group.id}/images`).then(res => {
                    this.imgId = res.data[0].id
                    this.$refs.upload.clearFiles()
                })
            },
            handleClose(done) {
                this.$emit('update:visible', false)
                bus.$emit('updateGroups')
                this.$emit('update:groupInfo', {})
                if (typeof done === 'function') {
                    done()
                }
            },
            toggleVisibleGroup() {
                const {isVisible} = this.group
                this.$api.put(`/groups/${this.group.id}`, {
                    ...this.group, ...{isVisible: !isVisible}
                }).then(() => {
                    this.handleClose()
                })
            },
            deleteGroup() {
                this.$api.delete(`/groups/${this.group.id}`).then(() => {
                    this.$emit('update:visible', false)
                    this.$emit('update:groupInfo', {})
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
            },
            openMainDialog() {
                this.$api.post('/products', {
                    groupId: this.product.groupId,
                    name: 'Новий продукт'
                }).then(res => {
                    this.handleCloseGroupsGialog()
                    this.visibleProduct = true
                    this.product = res.data
                }).catch(err => {
                    this.$notifyError({errMsg: `Не вдалось завантажити. ${err.message}`})
                }).finally(() => {
                    this.handleCloseGroupsGialog()
                })
            },
            //used
            handleOpenGroupsGialog() {
                if (!this.allGroups.length) this.getAllGroups()
            },
            handleCloseGroupsGialog() {
                this.$emit('update:visible', false)
            },
            /**
             * Upload
             */
            getImages() {
                this.$api(`/api/products/${this.produt.id}/images`).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$notifyError({msg: `Не вдалось завантажити список картинок ${err}`})
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>

<style lang="scss">
    .button-edit:hover {
        font-weight: bold;
    }

    .group-img-preview {
        width: 100%;
    }

    .group-uploader .el-upload-dragger {
        width: 100%;
    }

    .group-uploader .el-upload {
        width: 100%;
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