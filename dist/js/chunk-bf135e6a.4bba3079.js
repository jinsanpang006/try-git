(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf135e6a"],{"162e":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout-container"},[n("el-container",[n("el-aside",{attrs:{width:t.isCollapse?"64px":"200px"}},[n("div",{staticClass:"logo",class:{minLogo:t.isCollapse}}),n("el-menu",{attrs:{"background-color":"#002033",router:"","default-active":t.$route.path,collapse:t.isCollapse,"collapse-transition":!1,"text-color":"#fff","active-text-color":"#ffd04b"}},[n("el-menu-item",{attrs:{index:"/"}},[n("i",{staticClass:"el-icon-s-home"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("首页")])]),n("el-menu-item",{attrs:{index:"/articles"}},[n("i",{staticClass:"el-icon-document"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("内容管理")])]),n("el-menu-item",{attrs:{index:"/pictures"}},[n("i",{staticClass:"el-icon-picture"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("素材管理")])]),n("el-menu-item",{attrs:{index:"/add-article"}},[n("i",{staticClass:"el-icon-s-promotion"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("发布文章")])]),n("el-menu-item",{attrs:{index:"/comment"}},[n("i",{staticClass:"el-icon-chat-dot-round"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("评论管理")])]),n("el-menu-item",{attrs:{index:"/fans"}},[n("i",{staticClass:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("粉丝管理")])]),n("el-menu-item",{attrs:{index:"/settings"}},[n("i",{staticClass:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("个人设置")])])],1)],1),n("el-container",[n("el-header",{staticClass:"my-header"},[n("div",{staticClass:"left",on:{click:function(e){t.isCollapse=!t.isCollapse}}},[n("i",{class:t.isCollapse?"el-icon-s-fold":"el-icon-s-unfold"}),n("span",[t._v("江苏传智播客科技教育有限公司")])]),n("el-dropdown",[n("div",{staticClass:"avatar-wrap"},[n("img",{staticClass:"avatar",attrs:{src:t.user.photo,alt:""}}),n("span",[t._v(t._s(t.user.name))]),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[t._v("设置")]),n("el-dropdown-item",{nativeOn:{click:function(e){return t.del(e)}}},[t._v("退出")])],1)],1)],1),n("el-main",[n("router-view")],1)],1)],1)],1)},a=[],o=(n("b0c0"),n("c24f")),i=n("5d2d"),l={name:"Layout",data:function(){return{isCollapse:!1,user:{name:"",photo:""}}},created:function(){var t=this;Object(o["a"])().then((function(e){t.user=e.data.data,t.$eventBus.$on("uploadName",(function(e){t.user.name=e})),t.$eventBus.$on("uploadImage",(function(e){t.user.photo=e}))}))},methods:{del:function(){var t=this;Object(i["a"])(),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){console.log(t.$route),t.$router.push("/login"),t.$message({type:"success",message:"成功退出!"})})).catch((function(){t.$message({type:"info",message:"不退了"})}))}}},r=l,c=(n("493e"),n("2877")),u=Object(c["a"])(r,s,a,!1,null,"7f77dbd0",null);e["default"]=u.exports},"493e":function(t,e,n){"use strict";var s=n("5473"),a=n.n(s);a.a},5473:function(t,e,n){},b0c0:function(t,e,n){var s=n("83ab"),a=n("9bf2").f,o=Function.prototype,i=o.toString,l=/^\s*function ([^ (]*)/,r="name";s&&!(r in o)&&a(o,r,{configurable:!0,get:function(){try{return i.call(this).match(l)[1]}catch(t){return""}}})},c24f:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return i})),n.d(e,"c",(function(){return l}));var s=n("b775"),a=function(t,e){return Object(s["a"])({method:"post",url:"/mp/v1_0/authorizations",data:{mobile:t,code:e}})},o=function(){return Object(s["a"])({method:"get",url:"/mp/v1_0/user/profile"})},i=function(t){return Object(s["a"])({method:"PATCH",url:"/mp/v1_0/user/profile",data:t})},l=function(t){return Object(s["a"])({method:"patch",url:"/mp/v1_0/user/photo",data:t})}}}]);
//# sourceMappingURL=chunk-bf135e6a.4bba3079.js.map