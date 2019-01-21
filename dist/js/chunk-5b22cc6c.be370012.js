(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b22cc6c"],{"05c4":function(t,e,o){"use strict";var i=o("925d"),n=o.n(i);n.a},2621:function(t,e){e.f=Object.getOwnPropertySymbols},"357b":function(t,e,o){"use strict";var i=o("4cf0"),n=o.n(i);n.a},"402e":function(t,e,o){"use strict";var i=o("6450"),n=o.n(i);n.a},"4cf0":function(t,e,o){},"52a7":function(t,e){e.f={}.propertyIsEnumerable},"57bf":function(t,e,o){},6450:function(t,e,o){},6838:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{border:"",data:t.modeLoadedGroup?t.loadedGroup:t.products}},[o("el-table-column",{attrs:{align:"center",label:"Фото"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("img",{attrs:{src:"/api/products/"+t.row.id+"/images/"+t.row.imageId+"/content",width:"100%",alt:"Photo product"}})]}}])}),o("el-table-column",{attrs:{align:"center",label:"Код продукту"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(t.getFullCode(e.row.productCode)))])]}}])}),o("el-table-column",{attrs:{align:"center",label:"Ім'я"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.name))])]}}])}),o("el-table-column",{attrs:{align:"center",label:"Ціна"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.price))])]}}])}),o("el-table-column",{attrs:{align:"center",label:"Короткий опис"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.shortDescription))])]}}])}),t.modeLoadedGroup?t._e():o("el-table-column",{attrs:{align:"center",label:""},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini"},on:{click:function(o){t.editProduct(e.$index,e.row)}}},[t._v("Відкрити товар\n                ")])]}}])})],1),t.modeLoadedGroup?t._e():o("el-pagination",{staticClass:"mt-10",attrs:{"current-page":t.pagination.current,"page-sizes":[5,10,20,30,40],"page-size":t.pagination.size,layout:"total, sizes, prev, pager, next, jumper",total:t.pagination.counts},on:{"size-change":t.sizeChangePagination,"current-change":t.currentChangePagination,"update:currentPage":function(e){t.$set(t.pagination,"current",e)}}})],1)},n=[],r=o("c93e"),s=o("b012"),a=o("90e8"),u={name:"ProductsTable",props:{activeProducts:{type:Boolean,default:!0},textSearch:{type:String},loadedGroup:{type:Array,required:!1}},data:function(){return{products:[],loading:!1,pagination:{size:5,counts:0,current:1}}},computed:{startPositionPaginate:function(){return this.pagination.current*this.pagination.size-this.pagination.size},modeLoadedGroup:function(){return Array.isArray(this.loadedGroup)}},created:function(){a["a"].$on("reloadTableProducts",this.getProducts),this.debouncedGetProducts=Object(s["debounce"])(this.getProducts,1e3)},beforeMount:function(){this.getProducts()},mounted:function(){this.$watch(function(t){return[t.pagination.size,t.pagination.current,t.pagination.counts,t.activeProducts,t.textSearch]},this.debouncedGetProducts)},beforeDestroy:function(){a["a"].$off("reloadTableProducts",this.getProducts)},methods:{getProducts:function(){var t=this;if(!this.modeLoadedGroup){var e={isVisible:this.activeProducts};this.textSearch.length&&(e=Object(r["a"])({},e,{filter:this.textSearch})),this.loading=!0,this.$api.get("/products",{params:Object(r["a"])({startPosition:this.startPositionPaginate,numberOfItems:this.pagination.size},e)}).then(function(e){t.products=e.data}).catch(function(e){t.$notifyError({msg:"Обновіть сторінку. ".concat(e)})}).finally(function(){t.loading=!1}),this.$api("products/count",{params:e}).then(function(e){t.$set(t.pagination,"counts",e.data)}).catch(function(e){t.$notifyError({msg:"Обновіть сторінку. ".concat(e)})}).finally(function(){t.loading=!1})}},editProduct:function(t,e){a["a"].$emit("editProduct",e)},sizeChangePagination:function(t){this.$set(this.pagination,"size",t)},currentChangePagination:function(t){this.$set(this.pagination,"current",t)},getFullCode:function(t){for(var e=String(t).length,o="",i=0;i<9-e;i++)o+="0";return o+String(t)}}},l=u,c=(o("402e"),o("2877")),p=Object(c["a"])(l,i,n,!1,null,"30f7d73a",null);p.options.__file="ProductsTable.vue";e["a"]=p.exports},"696f":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-container",{staticClass:"bg-white",staticStyle:{padding:"10px"},attrs:{direction:"vertical"}},[o("el-row",{attrs:{type:"flex",align:"middle"}},[o("el-col",{attrs:{span:4}},[o("h2",[t._v("Групи")])]),o("el-col",{attrs:{span:5}},[o("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-plus",round:""},on:{click:t.createGroup}},[t._v("Cтворити групу\n            ")])],1),o("el-col",{attrs:{span:5}},[o("el-checkbox",{model:{value:t.allGroupsVisible,callback:function(e){t.allGroupsVisible=e},expression:"allGroupsVisible"}},[t._v("Показати всі групи")])],1)],1),t.allGroupsVisible?o("groups-all-list",{attrs:{visible:t.allGroupsVisible}}):o("groups-tree"),o("groups-dialog",{attrs:{visible:t.dialog.visible,groupInfo:t.dialog.group},on:{"update:visible":function(e){t.$set(t.dialog,"visible",e)},"update:groupInfo":function(e){t.$set(t.dialog,"group",e)}}})],1)},n=[],r=(o("cadf"),o("551c"),o("097d"),o("90e8")),s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{attrs:{title:(t.isCreate?"Створити":"Оновити")+" групу",visible:t.visible,"close-on-click-modal":!1,"before-close":t.handleClose,width:"90%"},on:{open:t.handleOpen}},[o("el-form",{ref:"groupForm",attrs:{model:t.group,"label-width":"150px"}},[o("el-row",{attrs:{type:"flex",justify:"space-between"}},[o("el-col",{attrs:{span:14}},[o("el-form-item",{attrs:{prop:"name",label:"Назва групи",rules:{required:!0,message:"Поле не може бути пустим",trigger:"blur"}}},[o("el-input",{model:{value:t.group.name,callback:function(e){t.$set(t.group,"name",e)},expression:"group.name"}})],1),o("el-form-item",[o("el-checkbox",{model:{value:t.group.isTopLevelGroup,callback:function(e){t.$set(t.group,"isTopLevelGroup",e)},expression:"group.isTopLevelGroup"}},[t._v("Група вищого рівня(основне меню)\n                    ")])],1),o("el-form-item",[o("el-checkbox",{model:{value:t.group.isVisible,callback:function(e){t.$set(t.group,"isVisible",e)},expression:"group.isVisible"}},[t._v("Видима (показувати на сайті)")])],1),o("el-form-item",{attrs:{label:"Батьківська група"}},[o("el-select",{attrs:{filterable:"",clearable:"",placeholder:"Виберіть групу"},model:{value:t.group.parentGroupId,callback:function(e){t.$set(t.group,"parentGroupId",e)},expression:"group.parentGroupId"}},t._l(t.filterAllGroup,function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),o("el-form-item",{attrs:{prop:"shortDescription",label:"Короткий опис",rules:{required:!0,message:"Поле не може бути пустим",trigger:"blur"}}},[o("el-input",{model:{value:t.group.shortDescription,callback:function(e){t.$set(t.group,"shortDescription",e)},expression:"group.shortDescription"}})],1),o("el-form-item",{attrs:{prop:"description",label:"Опис",rules:{required:!0,message:"Поле не може бути пустим",trigger:"blur"}}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.group.description,callback:function(e){t.$set(t.group,"description",e)},expression:"group.description"}})],1)],1),o("el-col",{attrs:{span:10}},[o("el-form-item",[t.imgId&&!t.visibleGroup?o("el-button",{staticStyle:{"margin-bottom":"10px"},on:{click:function(e){t.visibleGroup=!0}}},[t._v("Додати картинку\n                    ")]):t._e(),!t.imgId||t.visibleGroup?o("el-upload",{ref:"upload",staticClass:"group-uploader",attrs:{"on-success":t.uploadSuccess,"on-error":t.uploadError,limit:1,headers:t.headers,accept:"image/*",drag:"",action:"/api/groups/image/"+t.group.id}},[o("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("Limit:1 photo")]),o("i",{staticClass:"el-icon-plus group-uploader-icon"})]):t._e(),t.imgId?o("img",{staticClass:"group-img-preview",attrs:{src:"/api/groups/"+t.group.id+"/images/"+t.imgId+"/content",alt:"Preview"}}):t._e()],1)],1)],1)],1),o("products-table",{attrs:{"loaded-group":t.group.products}}),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:t.handleClose}},[t._v("Закрити вікно")]),o("el-button",{attrs:{type:"danger"},on:{click:t.deleteForceGroup}},[t._v("Примусове видалення")]),o("el-button",{attrs:{type:"warning"},on:{click:t.deleteGroup}},[t._v("Видалити")]),o("el-button",{attrs:{type:"success"},on:{click:t.submitForm}},[t._v(t._s(t.isCreate?"Створити":"Оновити"))])],1)],1)},a=[],u=o("c93e"),l=(o("7f7f"),o("f751"),o("a78e")),c=o.n(l),p=o("6838"),d={name:"GroupsDialog",components:{ProductsTable:p["a"]},props:{visible:Boolean,groupInfo:Object},data:function(){return{headers:{Authorization:c.a.get("token")},imgId:null,allGroups:[],visibleGroup:!1,group:{id:"",name:"",description:"",shortDescription:"",isTopLevelGroup:!0,isVisible:!0,parentGroupId:""},subDialog:{visible:!1,group:{}}}},watch:{"group.isTopLevelGroup":function(t){t&&this.$set(this.group,"parentGroupId","")},"group.parentGroupId":function(t){null!==t&&this.$set(this.group,"isTopLevelGroup",0===t.length)}},computed:{isCreate:function(){return"undefined"===typeof this.groupInfo.id},filterAllGroup:function(){var t=this;return this.allGroups.filter(function(e){return e.id!==t.group.id})}},methods:{getAllGroups:function(){var t=this;this.$api("/groups").then(function(e){t.allGroups=e.data}).catch(function(e){t.handleClose(),t.$notifyError({errMsg:"Не вдалось завантажити список усіх груп. ".concat(e.messages)})})},getImgId:function(t){var e=this;this.$api("/groups/".concat(t,"/images")).then(function(t){if(0===t.data.length)return null;e.imgId=t.data[0].id})},handleOpen:function(){var t=this;this.imgId=null,this.isCreate?this.$api.post("/groups",{name:"Нова група"}).then(function(e){t.group=e.data,t.getImgId(e.data.id)}).catch(function(e){t.$notify.error({title:"Сталась помилка",message:"Обновіть сторінку. ".concat(e),duration:0})}):(this.group=Object.assign({},this.groupInfo),this.getImgId(this.groupInfo.id)),this.getAllGroups(),this.$nextTick(function(){t.$refs["groupForm"].clearValidate(),t.$refs.upload.clearFiles()})},submitForm:function(){var t=this;this.$refs["groupForm"].validate(function(e){if(!e)return!1;var o=t.group,i=o.name,n=o.description,r=o.parentGroupId,s=o.shortDescription,a=o.isTopLevelGroup,u=o.isVisible,l=o.isActive;t.$api.put("/groups/".concat(t.group.id),{name:i,description:n,parentGroupId:r,isTopLevelGroup:a,isVisible:u,isActive:l,shortDescription:s}).then(function(){t.$notify({title:"Все добре :)",message:"Всі данні збережені",type:"success"}),t.handleClose()})})},uploadError:function(t){this.$notifyError({errMsg:t}),this.$refs.upload.clearFiles()},uploadSuccess:function(){var t=this;this.$api("/groups/".concat(this.group.id,"/images")).then(function(e){t.imgId=e.data[0].id,t.$refs.upload.clearFiles()})},handleClose:function(t){this.$emit("update:visible",!1),r["a"].$emit("updateGroups"),this.$emit("update:groupInfo",{}),"function"===typeof t&&t()},toggleVisibleGroup:function(){var t=this,e=this.group.isVisible;this.$api.put("/groups/".concat(this.group.id),Object(u["a"])({},this.group,{isVisible:!e})).then(function(){t.handleClose()})},deleteGroup:function(){var t=this;this.$confirm("Ви впевнені що бажаєте видалити?").then(function(){t.$api.delete("/groups/".concat(t.group.id)).then(function(){t.handleClose(),t.$notify({title:"Успішно",message:"Група була видалена",duration:3e3,type:"success"})}).catch(function(e){t.$notify.error({title:"Сталась помилка",message:"Можливо група не була видалена. ".concat(e),duration:0})})})},deleteForceGroup:function(){var t=this;this.$confirm("Ви впевнені що бажаєте видалити групу і також всі групи, які від неї залежні?").then(function(){t.$api.delete("/groups/".concat(t.group.id),{params:{IsForceDelete:!0}}).then(function(){t.handleClose(),t.$notify({title:"Успішно",message:"Прупи успішно були видалені",duration:3e3,type:"success"})}).catch(function(e){t.$notify.error({title:"Сталась помилка",message:"Можливо групи не були видалені. ".concat(e),duration:0})})})}}},g=d,f=(o("6d47"),o("2877")),h=Object(f["a"])(g,s,a,!1,null,null,null);h.options.__file="GroupsDialog.vue";var m=h.exports,b=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-collapse",{staticClass:"groups-collapse",attrs:{accordion:""},model:{value:t.activeCollapse,callback:function(e){t.activeCollapse=e},expression:"activeCollapse"}},t._l(t.groups,function(e){return o("groups-three-item",{key:e.id,attrs:{group:e,open:t.activeCollapse===e.id,name:e.id}})}))},v=[],G=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-collapse-item",{attrs:{name:t.name}},[o("template",{slot:"title"},[o("el-row",{staticClass:"groups__collapse-row",attrs:{type:"flex",justify:"space-between"}},[o("el-col",{attrs:{span:1}},[o("i",{staticClass:"el-icon-caret-bottom"})]),o("el-col",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.group.name))]),o("el-col",{attrs:{span:2}},[o("el-button",{staticClass:"groups__edit",attrs:{type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(e){e.stopPropagation(),t.editGroup(t.group)}}})],1)],1)],1),t.open?[t.subGroups.loading?o("div",[o("strong",[t._v("Loading...")])]):o("div",[0!==t.subGroups.groups.length?[o("el-collapse",{staticClass:"collapse",attrs:{accordion:""},model:{value:t.activeCollapse,callback:function(e){t.activeCollapse=e},expression:"activeCollapse"}},t._l(t.subGroups.groups,function(e){return o("groups-tree-item",{key:e.id,attrs:{group:e,open:t.activeCollapse===e.id,name:e.id}})}))]:o("div",[o("strong",[t._v("Пігрупи не знайдено")])])],2)]:t._e()],2)},_=[],y={name:"GroupsTreeItem",components:{GroupsTreeItem:k},data:function(){return{activeCollapse:"",subGroups:{loading:!1,groups:[]}}},props:{group:{type:Object,require:!0},name:{type:String,require:!0},open:{type:Boolean,require:!0}},watch:{open:{handler:function(t){t&&this.getGroups()},immediate:!0}},methods:{getGroups:function(){var t=this;this.$set(this.subGroups,"loading",!0),this.$api.get("/groups/".concat(this.name,"/groups")).then(function(e){t.subGroups={loading:!1,groups:e.data}}).catch(function(e){t.$notifyError({errMsg:"Обновіть сторінку. ".concat(e)})})},editGroup:function(t){r["a"].$emit("editGroup",t)}}},$=y,C=(o("357b"),Object(f["a"])($,G,_,!1,null,"3fcb02f8",null));C.options.__file="GroupsTreeItem.vue";var k=C.exports,w={name:"GroupsTree",components:{GroupsThreeItem:k},data:function(){return{activeCollapse:"",groups:[]}},beforeMount:function(){this.getGroups()},created:function(){r["a"].$on("updateGroups",this.getGroups)},beforeDestroy:function(){r["a"].$off("updateGroups",this.getGroups)},methods:{getGroups:function(){var t=this;this.$api.get("/groups",{params:{isTopLevelGroup:!0}}).then(function(e){t.groups=e.data,t.activeCollapse=""}).catch(function(e){t.activeCollapse="",t.$notify({title:"Сталась помилка",message:"Обновіть сторінку. ".concat(e),duration:0})})},editGroup:function(t){this.emit("edit-group",t)}}},I=w,x=(o("05c4"),Object(f["a"])(I,b,v,!1,null,null,null));x.options.__file="GroupsTree.vue";var P=x.exports,T=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"all-groups"},t._l(t.groups,function(e){return o("li",{key:e.id,staticClass:"all-groups__items"},[o("div",{staticClass:"all-groups__name"},[t._v(t._s(e.name))]),o("el-button",{staticClass:"groups__edit",attrs:{type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(o){o.stopPropagation(),t.editGroup(e)}}})],1)}))},S=[],j={name:"GroupsAllList",props:{visible:{type:Boolean,required:!0}},data:function(){return{groups:[],loaded:!1}},beforeMount:function(){this.loaded||this.getAllGroups()},methods:{getAllGroups:function(){var t=this;this.$api.get("/groups/").then(function(e){t.groups=e.data,t.loaded=!0}).catch(function(e){t.$notifyError({errMsg:"Обновіть сторінку. ".concat(e)})})},editGroup:function(t){r["a"].$emit("editGroup",t)}}},O=j,L=(o("9c35"),Object(f["a"])(O,T,S,!1,null,"5e54cb5e",null));L.options.__file="GroupsAllList.vue";var D=L.exports,V={name:"Groups",components:{GroupsDialog:m,GroupsTree:P,GroupsAllList:D},data:function(){return{allGroupsVisible:!1,dialog:{visible:!1,group:{}}}},created:function(){r["a"].$on("editGroup",this.editGroup)},beforeDestroy:function(){r["a"].$off("editGroup",this.editGroup)},methods:{createGroup:function(){this.dialog={visible:!0,group:{}}},editGroup:function(t){this.dialog={visible:!0,group:t}}}},z=V,E=Object(f["a"])(z,i,n,!1,null,null,null);E.options.__file="Groups.vue";e["default"]=E.exports},"6d47":function(t,e,o){"use strict";var i=o("57bf"),n=o.n(i);n.a},7333:function(t,e,o){"use strict";var i=o("0d58"),n=o("2621"),r=o("52a7"),s=o("4bf8"),a=o("626a"),u=Object.assign;t.exports=!u||o("79e5")(function(){var t={},e={},o=Symbol(),i="abcdefghijklmnopqrst";return t[o]=7,i.split("").forEach(function(t){e[t]=t}),7!=u({},t)[o]||Object.keys(u({},e)).join("")!=i})?function(t,e){var o=s(t),u=arguments.length,l=1,c=n.f,p=r.f;while(u>l){var d,g=a(arguments[l++]),f=c?i(g).concat(c(g)):i(g),h=f.length,m=0;while(h>m)p.call(g,d=f[m++])&&(o[d]=g[d])}return o}:u},"8e1a":function(t,e,o){},"90e8":function(t,e,o){"use strict";var i=o("2b0e");e["a"]=new i["default"]},"925d":function(t,e,o){},"9c35":function(t,e,o){"use strict";var i=o("8e1a"),n=o.n(i);n.a},b012:function(t,e){function o(t,e,o){var i,n,r,s,a;function u(){var l=Date.now()-s;l<e&&l>=0?i=setTimeout(u,e-l):(i=null,o||(a=t.apply(r,n),r=n=null))}null==e&&(e=100);var l=function(){r=this,n=arguments,s=Date.now();var l=o&&!i;return i||(i=setTimeout(u,e)),l&&(a=t.apply(r,n),r=n=null),a};return l.clear=function(){i&&(clearTimeout(i),i=null)},l.flush=function(){i&&(a=t.apply(r,n),r=n=null,clearTimeout(i),i=null)},l}o.debounce=o,t.exports=o},f751:function(t,e,o){var i=o("5ca1");i(i.S+i.F,"Object",{assign:o("7333")})}}]);
//# sourceMappingURL=chunk-5b22cc6c.be370012.js.map