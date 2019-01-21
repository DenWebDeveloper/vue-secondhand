(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d4e322a"],{"0da4":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{title:(t.productDialog.create?"Створити":"Оновити")+" продукт",visible:t.productDialog.visible,"close-on-click-modal":!1,"append-to-body":"",width:"90%"},on:{"update:visible":function(e){t.$set(t.productDialog,"visible",e)},close:t.resetDialogs,open:t.checkLoadGroups}},[i("el-form",{ref:"productForm",attrs:{model:t.product,"label-width":"150px","label-position":"top"}},[i("el-row",{attrs:{type:"flex",justify:"space-between"}},[i("el-col",{attrs:{span:14}},[i("el-form-item",{attrs:{rules:t.requiredInputRule,label:"Ім'я",prop:"name"}},[i("el-input",{attrs:{disabled:t.readOnly},model:{value:t.product.name,callback:function(e){t.$set(t.product,"name","string"===typeof e?e.trim():e)},expression:"product.name"}})],1),i("el-form-item",{attrs:{prop:"type"}},[i("el-checkbox",{attrs:{disabled:t.readOnly},model:{value:t.product.isVisible,callback:function(e){t.$set(t.product,"isVisible",e)},expression:"product.isVisible"}},[t._v("Показати товар на сайті")])],1),i("el-form-item",{attrs:{prop:"groupId",label:"Назва групи",rules:[{required:!0,message:"Виберіть групу",trigger:["blur","change"]}]}},[i("el-select",{attrs:{disabled:t.readOnly,filterable:"",clearable:"",placeholder:"Виберіть групу"},model:{value:t.product.groupId,callback:function(e){t.$set(t.product,"groupId",e)},expression:"product.groupId"}},t._l(t.allGroups,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),i("el-form-item",{attrs:{rules:t.requiredInputRule,label:"Ціна",prop:"price"}},[i("el-input",{attrs:{disabled:t.readOnly,type:"number"},model:{value:t.product.price,callback:function(e){t.$set(t.product,"price","string"===typeof e?e.trim():e)},expression:"product.price"}})],1),i("el-form-item",{attrs:{rules:t.requiredInputRule,label:"Короткий опис",prop:"shortDescription"}},[i("el-input",{attrs:{disabled:t.readOnly},model:{value:t.product.shortDescription,callback:function(e){t.$set(t.product,"shortDescription","string"===typeof e?e.trim():e)},expression:"product.shortDescription"}})],1),i("el-form-item",{attrs:{rules:t.requiredInputRule,label:"Опис",prop:"description"}},[i("el-input",{attrs:{type:"textarea",disabled:t.readOnly},model:{value:t.product.description,callback:function(e){t.$set(t.product,"description","string"===typeof e?e.trim():e)},expression:"product.description"}})],1),i("fieldset",[i("legend",[t._v("Детальні характеристики")]),t._l(t.product.productValues,function(e,o){return i("el-form-item",{key:o,staticStyle:{"margin-bottom":"4px"}},[i("div",{staticClass:"detail-params"},[i("el-input",{staticStyle:{margin:"5px"},attrs:{disabled:t.readOnly},model:{value:e.key,callback:function(i){t.$set(e,"key",i)},expression:"item.key"}}),i("el-input",{staticStyle:{margin:"5px"},attrs:{disabled:t.readOnly},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"item.value"}}),i("el-button",{staticStyle:{margin:"5px"},attrs:{type:"danger"},on:{click:function(i){i.preventDefault(),t.removeCharacteristic(e)}}},[t._v("Видалити\n                                ")])],1)])}),i("el-button",{staticStyle:{"margin-left":"auto",display:"block","margin-right":"3px","min-width":"107px"},attrs:{type:"success"},on:{click:function(e){return e.preventDefault(),t.addCharacteristic(e)}}},[t._v("Додати\n                        ")])],2)],1),i("el-col",{attrs:{span:9,offset:1}},[i("el-upload",{staticStyle:{width:"100%"},attrs:{disabled:t.readOnly,action:"/api/products/"+t.product.id+"/images","on-remove":t.handleRemove,"file-list":t.productFilesList,headers:t.headers,multiple:"",drag:"","list-type":"picture"}},[i("i",{staticClass:"el-icon-upload"}),i("div",{staticClass:"el-upload__text"},[t._v("Drop file here or "),i("em",[t._v("click to upload")])]),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("jpg/png files")])])],1)],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.resetDialogs}},[t._v("Закрити вікно")]),i("el-button",{attrs:{type:"danger"},on:{click:t.deleteProduct}},[t._v("Видалити")]),i("el-button",{attrs:{type:"success"},on:{click:t.submitProduct}},[t._v(t._s(t.productDialog.create?"Створити":"Оновити")+"\n            ")])],1)],1),i("el-dialog",{attrs:{width:"80%",title:"Створкння продукту. Виберіть групу",center:"",visible:t.groupDialog.visible},on:{open:t.checkLoadGroups,"update:visible":function(e){t.$set(t.groupDialog,"visible",e)}}},[i("el-row",{attrs:{type:"flex",justify:"center"}},[i("el-form",{ref:"groupsForm",attrs:{model:t.product,"label-width":"120px"}},[i("el-form-item",{attrs:{prop:"groupId",label:"Назва групи",rules:t.requiredInputRule}},[i("el-select",{attrs:{filterable:"",clearable:"",placeholder:"Виберіть групу"},model:{value:t.product.groupId,callback:function(e){t.$set(t.product,"groupId",e)},expression:"product.groupId"}},t._l(t.allGroups,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.groupDialog={visible:!1}}}},[t._v("Закрити")]),i("el-button",{attrs:{type:"primary",disabled:!Boolean(t.product.groupId)},on:{click:t.openProductDialog}},[t._v("Далі\n            ")])],1)],1)],1)},r=[],a=i("c93e"),n=i("90e8"),c=i("a78e"),s=i.n(c),l={description:"",groupId:"",id:"",imagePath:null,isActive:!0,isVisible:!1,itemCount:0,name:"",price:0,productValues:[],shortDescription:""},u={name:"ProductsDialog",data:function(){return{headers:{Authorization:s.a.get("token")},requiredInputRule:[{required:!0,message:"Заповніть поле",trigger:["blur","change"]}],allGroups:[],productFilesList:[],readOnly:!1,groupDialog:{visible:!1},productDialog:{visible:!1,create:!1},product:Object(a["a"])({},l)}},created:function(){n["a"].$on("editProduct",this.editProduct),n["a"].$on("createProduct",this.createProduct)},beforeDestroy:function(){n["a"].$off("editProduct",this.editProduct),n["a"].$off("createProduct",this.createProduct)},methods:{uploadError:function(t){this.$notifyError({msg:t}),this.$refs.upload.clearFiles()},getAllGroups:function(){var t=this;this.$api("/groups").then(function(e){t.allGroups=e.data}).catch(function(e){t.$set(t.productDialog,"visible",!1),t.$set(t.groupDialog,"visible",!1),t.$notifyError({msg:"Не вдалось завантажити список усіх груп. ".concat(e.messages)})})},resetDialogs:function(){var t=this;this.productFilesList=[],this.readOnly=!1,this.groupDialog={visible:!1},this.productDialog={visible:!1,create:!1},this.product=Object(a["a"])({},l),this.$nextTick(function(){t.$refs["productForm"].clearValidate(),t.$refs["groupsForm"].clearValidate()})},addCharacteristic:function(){this.product.productValues.push({key:"",value:""})},removeCharacteristic:function(t){var e=this.product.productValues.indexOf(t);-1!==e&&this.product.productValues.splice(e,1)},submitProduct:function(){var t=this;this.$refs["productForm"].validate(function(e){if(!e)return!1;t.$api.put("/products/".concat(t.product.id),t.product).then(function(){n["a"].$emit("reloadTableProducts"),t.$notifySuccess(),t.resetDialogs()}).catch(function(e){t.$notifyError({msg:"Не вдалося зберегти. ".concat(e.message)})})})},deleteProduct:function(){var t=this;this.$confirm("Ви впевнені що бажаєте видалити?").then(function(){t.$api.delete("/products/".concat(t.product.id)).then(function(){t.resetDialogs(),n["a"].$emit("reloadTableProducts")}).catch(function(e){t.$notifyError({msg:"Не вдалося видалити продукт. ".concat(e.message)})})})},openProductDialog:function(){var t=this;this.$api.post("/products",{groupId:this.product.groupId,name:"Новий продукт"}).then(function(e){t.$set(t.productDialog,"visible",!0),t.product=e.data}).catch(function(e){t.$notifyError({msg:"Не вдалось завантажити. ".concat(e.message)})}).finally(function(){t.$set(t.groupDialog,"visible",!1)})},checkLoadGroups:function(){this.allGroups.length||this.getAllGroups()},getImages:function(){var t=this;this.$api("/products/".concat(this.product.id,"/images")).then(function(e){t.productFilesList=e.data.map(function(e){return Object(a["a"])({},e,{url:"\n                        /api/products/".concat(t.product.id,"/images/").concat(e.id,"/content\n                        ")})})}).catch(function(e){t.$notifyError({msg:"Не вдалось завантажити список картинок ".concat(e)})})},handleRemove:function(t,e){var i=this;this.$api.delete("/products/".concat(this.product.id,"/images/").concat(t.id)).then(function(){i.productFilesList=e}).catch(function(t){i.$notifyError({msg:"Сталась помилка. ".concat(t)})})},createProduct:function(){this.groupDialog={visible:!0},this.$set(this.productDialog,"create",!0)},editProduct:function(t,e){e&&(this.readOnly=!0),this.productDialog={visible:!0,create:!1},this.product=t,this.getImages()}}},d=u,p=(i("63af"),i("2877")),f=Object(p["a"])(d,o,r,!1,null,null,null);f.options.__file="ProductsDialog.vue";e["a"]=f.exports},"18c0":function(t,e,i){},"1bfa":function(t,e,i){"use strict";var o=i("3e9a"),r=i.n(o);r.a},"3e9a":function(t,e,i){},"402e":function(t,e,i){"use strict";var o=i("6450"),r=i.n(o);r.a},"63af":function(t,e,i){"use strict";var o=i("18c0"),r=i.n(o);r.a},6450:function(t,e,i){},6838:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{border:"",data:t.modeLoadedGroup?t.loadedGroup:t.products}},[i("el-table-column",{attrs:{align:"center",label:"Фото"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{attrs:{src:"/api/products/"+t.row.id+"/images/"+t.row.imageId+"/content",width:"100%",alt:"Photo product"}})]}}])}),i("el-table-column",{attrs:{align:"center",label:"Код продукту"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t.getFullCode(e.row.productCode)))])]}}])}),i("el-table-column",{attrs:{align:"center",label:"Ім'я"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),i("el-table-column",{attrs:{align:"center",label:"Ціна"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.price))])]}}])}),i("el-table-column",{attrs:{align:"center",label:"Короткий опис"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.shortDescription))])]}}])}),t.modeLoadedGroup?t._e():i("el-table-column",{attrs:{align:"center",label:""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini"},on:{click:function(i){t.editProduct(e.$index,e.row)}}},[t._v("Відкрити товар\n                ")])]}}])})],1),t.modeLoadedGroup?t._e():i("el-pagination",{staticClass:"mt-10",attrs:{"current-page":t.pagination.current,"page-sizes":[5,10,20,30,40],"page-size":t.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:t.pagination.counts},on:{"size-change":t.sizeChangePagination,"current-change":t.currentChangePagination,"update:currentPage":function(e){t.$set(t.pagination,"current",e)}}})],1)},r=[],a=i("c93e"),n=i("b012"),c=i("90e8"),s={name:"ProductsTable",props:{activeProducts:{type:Boolean,default:!0},textSearch:{type:String},loadedGroup:{type:Array,required:!1}},data:function(){return{products:[],loading:!1,pagination:{size:5,counts:0,current:1}}},computed:{startPositionPaginate:function(){return this.pagination.current*this.pagination.size-this.pagination.size},modeLoadedGroup:function(){return Array.isArray(this.loadedGroup)}},created:function(){c["a"].$on("reloadTableProducts",this.getProducts),this.debouncedGetProducts=Object(n["debounce"])(this.getProducts,1e3)},beforeMount:function(){this.getProducts()},mounted:function(){this.$watch(function(t){return[t.pagination.size,t.pagination.current,t.pagination.counts,t.activeProducts,t.textSearch]},this.debouncedGetProducts)},beforeDestroy:function(){c["a"].$off("reloadTableProducts",this.getProducts)},methods:{getProducts:function(){var t=this;if(!this.modeLoadedGroup){var e={isVisible:this.activeProducts};this.textSearch.length&&(e=Object(a["a"])({},e,{filter:this.textSearch})),this.loading=!0,this.$api.get("/products",{params:Object(a["a"])({startPosition:this.startPositionPaginate,numberOfItems:this.pagination.size},e)}).then(function(e){t.products=e.data}).catch(function(e){t.$notifyError({msg:"Обновіть сторінку. ".concat(e)})}).finally(function(){t.loading=!1}),this.$api("products/count",{params:e}).then(function(e){t.$set(t.pagination,"counts",e.data)}).catch(function(e){t.$notifyError({msg:"Обновіть сторінку. ".concat(e)})}).finally(function(){t.loading=!1})}},editProduct:function(t,e){c["a"].$emit("editProduct",e)},sizeChangePagination:function(t){this.$set(this.pagination,"size",t)},currentChangePagination:function(t){this.$set(this.pagination,"current",t)},getFullCode:function(t){for(var e=String(t).length,i="",o=0;o<9-e;o++)i+="0";return i+String(t)}}},l=s,u=(i("402e"),i("2877")),d=Object(u["a"])(l,o,r,!1,null,"30f7d73a",null);d.options.__file="ProductsTable.vue";e["a"]=d.exports},"90e8":function(t,e,i){"use strict";var o=i("2b0e");e["a"]=new o["default"]},b012:function(t,e){function i(t,e,i){var o,r,a,n,c;function s(){var l=Date.now()-n;l<e&&l>=0?o=setTimeout(s,e-l):(o=null,i||(c=t.apply(a,r),a=r=null))}null==e&&(e=100);var l=function(){a=this,r=arguments,n=Date.now();var l=i&&!o;return o||(o=setTimeout(s,e)),l&&(c=t.apply(a,r),a=r=null),c};return l.clear=function(){o&&(clearTimeout(o),o=null)},l.flush=function(){o&&(c=t.apply(a,r),a=r=null,clearTimeout(o),o=null)},l}i.debounce=i,t.exports=i},e6dc:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-container",{staticClass:"bg-white home",attrs:{direction:"vertical"}},[i("h2",{staticClass:"home_title"},[t._v("Товари")]),i("el-row",{attrs:{type:"flex"}},[i("el-col",[i("el-form",{attrs:{inline:!0,size:"mini"}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"Пошук...",required:""},model:{value:t.filter.text,callback:function(e){t.$set(t.filter,"text","string"===typeof e?e.trim():e)},expression:"filter.text"}},[i("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1),i("el-form-item",[i("el-switch",{attrs:{"active-text":"Активні","inactive-text":"Неактивні"},model:{value:t.filter.activeProducts,callback:function(e){t.$set(t.filter,"activeProducts",e)},expression:"filter.activeProducts"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-plus",round:""},on:{click:t.createProduct}},[t._v("\n                        Додати товар\n                    ")])],1)],1)],1)],1),i("products-table",{attrs:{activeProducts:t.filter.activeProducts,textSearch:t.filter.text}}),i("products-dialog")],1)},r=[],a=(i("cadf"),i("551c"),i("097d"),i("90e8")),n=i("0da4"),c=i("6838"),s={name:"Home",components:{ProductsDialog:n["a"],ProductsTable:c["a"]},data:function(){return{filter:{text:"",activeProducts:!0}}},methods:{createProduct:function(){a["a"].$emit("createProduct")}}},l=s,u=(i("1bfa"),i("2877")),d=Object(u["a"])(l,o,r,!1,null,"46cc316d",null);d.options.__file="Products.vue";e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-7d4e322a.0283a16b.js.map