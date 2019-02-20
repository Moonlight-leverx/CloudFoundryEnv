jQuery.sap.registerPreloadedModules({version:"2.0",name:"user_display/Component-preload",modules:{"user_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device"],function(t,e){"use strict";return t.extend("user_display.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments)}})});',"user_display/controller/Display.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("user_display.controller.Detail",{onInit:function(){var e=this.byId("details");this._oList=e},onSelectionChange:function(e){var t=this.getView().byId("details");this._item=t.getSelectedItem().getBindingContext("users").getObject()},onRefresh:function(e){this._oList.getBinding("items").refresh()},onCreate:function(e){var t=new sap.m.Dialog({title:"Add User",type:"Message",content:[new sap.ui.layout.VerticalLayout({width:"350px",content:[new sap.ui.layout.HorizontalLayout({content:[new sap.m.Label({width:"100px",design:"Bold",text:"User ID:"}).addStyleClass("popup_label"),new sap.m.Input("UserID_inp",{width:"230px",value:"ID will generated automatically",editable:!1})]}),new sap.ui.layout.HorizontalLayout({content:[new sap.m.Label({width:"100px",design:"Bold",text:"User Name:"}).addStyleClass("popup_label"),new sap.m.Input("UserName_inp",{value:"",width:"230px"})]})]})],beginButton:new sap.m.Button({text:"Save",type:"Accept",press:function(){var e=sap.ui.getCore().byId("UserName_inp").getValue(),a={};a={usid:"",name:e};var n=new sap.ui.model.odata.v2.ODataModel("https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata",!0);n.create("/Users",a),n.setRefreshAfterChange(!1),t.close()}}),endButton:new sap.m.Button({text:"Cancel",type:"Reject",press:function(){t.close()}}),afterClose:function(){t.destroy()}});t.open()},onUpdate:function(e){var t=this._item,a=t.usid,n=t.name,s=new sap.m.Dialog({title:"Change User",type:"Message",content:[new sap.ui.layout.VerticalLayout({width:"350px",content:[new sap.ui.layout.HorizontalLayout({content:[new sap.m.Label({width:"100px",design:"Bold",text:"User ID:"}).addStyleClass("popup_label"),new sap.m.Input("UserID_inp",{width:"230px",value:a,editable:!1})]}),new sap.ui.layout.HorizontalLayout({content:[new sap.m.Label({width:"100px",design:"Bold",text:"User Name:"}).addStyleClass("popup_label"),new sap.m.Input("UserName_inp",{value:n,width:"230px"})]})]})],beginButton:new sap.m.Button({text:"Save",type:"Accept",press:function(){var e=sap.ui.getCore().byId("UserID_inp").getValue(),t=sap.ui.getCore().byId("UserName_inp").getValue(),a={};a={usid:e,name:t};var n=new sap.ui.model.odata.ODataModel("https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata",!1);sap.ui.getCore().setModel(n),sap.ui.getCore().getModel().update("/Users(\'"+e+"\')",a,null,function(){sap.m.MessageToast.show("Updated successfully",{duration:3e3})},function(){sap.m.MessageToast.show("Update failed",{duration:3e3})}),n.setRefreshAfterChange(!1),s.close()}}),endButton:new sap.m.Button({text:"Cancel",type:"Reject",press:function(){s.close()}}),afterClose:function(){s.destroy()}});s.open()},onDelete:function(e){var t=this._item,a=t.usid,n={async:!0,crossDomain:!0,url:"https://p2001079623trial-df43r34-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/user/user.xsjs?userid="+a,method:"DELETE",headers:{"content-type":"application/json"},processData:!1};$.ajax(n).done(function(e){sap.m.MessageToast.show("Deleted",{duration:2e3})})}})});',"user_display/view/Display.view.xml":'<mvc:View controllerName="user_display.controller.Display"\r\n  xmlns="sap.m"\r\n  xmlns:l="sap.ui.layout"\r\n  xmlns:mvc="sap.ui.core.mvc"><Shell><App><pages><Page><Panel id="PeopleDetailPanel" headerText="Details" class="sapUiResponsiveMargin" width="auto"><content><l:HorizontalLayout><l:content><Button text="Refresh" press="onRefresh" icon="sap-icon://refresh" class="sapUiTinyMargin ref_btn"><layoutData><FlexItemData growFactor="1" /></layoutData></Button><Button text="Edit" press="onUpdate" icon="sap-icon://edit" class="sapUiTinyMargin edit_btn"><layoutData><FlexItemData growFactor="1" /></layoutData></Button><Button text="Create" type="Accept" press="onCreate" icon="sap-icon://add" class="sapUiTinyMargin create_btn"><layoutData><FlexItemData growFactor="1" /></layoutData></Button><Button text="Delete" press="onDelete" type="Reject" icon="sap-icon://delete" class="sapUiTinyMargin del_btn"><layoutData><FlexItemData growFactor="1" /></layoutData></Button></l:content></l:HorizontalLayout><Table id="details" items = "{path: \'users>/Users\'}" mode="SingleSelect" selectionChange="onSelectionChange"><columns><Column id="userIdColumn"><Text text="{i18n>userIdText}" /></Column><Column id="userNameColumn"><Text text="{i18n>userNameText}" /></Column><Column id="userCreateTS"><Text text="{i18n>createUserTS}" /></Column><Column id="userUpdateTS"><Text text="{i18n>updateUserTS}" /></Column></columns><items><ColumnListItem><cells><Label text="{users>usid}" /></cells><cells><Label text="{users>name}" /></cells><cells><Label text="{users>ts_create}" /></cells><cells><Label text="{users>ts_update}" /></cells></ColumnListItem></items></Table></content></Panel></Page></pages></App></Shell></mvc:View>\r\n',"user_display/i18n/i18n.properties":"userIdText = User ID\r\nuserNameText = User Name\r\ncreateUserTS = Created\r\nupdateUserTS = Updateds\r\nappTitle = user_display\r\nappDescription = User Display Table\r\n","user_display/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"user_display","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"mainService":{"uri":"https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.platform.cf":{"oAuthScopes":["dev!b10746.dev.view","dev!b10746.dev.edit"]},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"user_display.view.Display","type":"XML","async":true,"id":"display"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"user_display.i18n.i18n"}},"users":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}}}},"resources":{}}'}});