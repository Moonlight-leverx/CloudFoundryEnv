sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("user_display.controller.Detail", {
		onInit: function () {
			/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);*/
			var oList = this.byId("details");
			this._oList = oList;
		},
		onSelectionChange: function(oEvent) {
			this._item = oEvent.getSource().getBindingContext().getObject(users);
			// var oSelectedItem = oEvent.getParameter("listItem");
			// this._item = oSelectedItem.getBindingContext().getObject();
			// this._item = JSON.stringify(oEvent.getSource().getSelectedItem().getBindingContext().getObject());
			// console.log(_item);
			// var oSelectedItem = sap.ui.getCore().byId("details").getSelectedItems(); 
 			// var _item = oSelectedItem[0];
 			// var cells = _item.getCells();
			// var oPname = cells[0].getText();
			// console.log(oPname); 
		},
		onRefresh: function (oEvent) {
			this._oList.getBinding("items").refresh();
		},
		onCreate: function (oEvent) {
			var count = this.getView().byId("details").getItems().length;
			console.log(count);
			var NewUserID = count + 1;
			var dialog = new sap.m.Dialog({
				title: "Add User",
				type: "Message",
				content: [
					new sap.ui.layout.VerticalLayout({
						width: "140px",
						content: [
							new sap.ui.layout.HorizontalLayout({
								content: [
									new sap.m.Label({
										width: "100px",
										design: "Bold",
										text: "User ID:",
									}).addStyleClass("popup_label"),
									new sap.m.Input("UserID", {
										value: NewUserID,
										editable: false
									})
								]
							}),
							new sap.ui.layout.HorizontalLayout({
								content: [
									new sap.m.Label({
										width: "100px",
										design: "Bold",
										text: "User Name:"
									}).addStyleClass("popup_label"),
									new sap.m.Input("UserName", {})
								]
							})


						]
					})
				],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function () {
						var sUserID = sap.ui.getCore().byId("UserID").getValue();
						var sUserName = sap.ui.getCore().byId("UserName").getValue();

						var oObject = {};
						oObject = {
							"usid": sUserID,
							"name": sUserName
						};

						var sServiceUrl = "https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata";
						
						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
						oModel.create("/Users", oObject);

						oModel.setRefreshAfterChange(false);

						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		onUpdate: function (oEvent) {
			var oUser = this._item;
			var oUserID = oUser.usid;
			var oUserName = oUser.name;

			var dialog = new sap.m.Dialog({
				title: "Change User",
				type: "Message",
				content: [
					new sap.ui.layout.VerticalLayout({
						width: "140px",
						content: [
							new sap.ui.layout.HorizontalLayout({
								content: [
									new sap.m.Label({
										width: "100px",
										design: "Bold",
										text: "User ID:",
									}).addStyleClass("popup_label"),
									new sap.m.Input("UserID", {
										value: oUserID,
										editable: false
									})
								]
							}),
							new sap.ui.layout.HorizontalLayout({
								content: [
									new sap.m.Label({
										width: "100px",
										design: "Bold",
										text: "User Name:"
									}).addStyleClass("popup_label"),
									new sap.m.Input("UserName", {
										value: oUserName
									})
								]
							})
						]
					})
				],
				// content: [new sap.ui.layout.HorizontalLayout({
				// 	content: [
				// 		new sap.ui.layout.VerticalLayout({
				// 			width: "140px",
				// 			content: [
				// 				new sap.m.Label({
				// 					text: "User ID"
				// 				}),
				// 				new sap.m.Label({
				// 					text: "User Name:"
				// 				})
				// 			]
				// 		}),
				// 		new sap.ui.layout.VerticalLayout({
				// 			content: [
				// 				new sap.m.Input("UserID", {
				// 					value: oUserID,
				// 					editable: false
				// 				}),
				// 				new sap.m.Input("UserName", {
				// 					value: oUserName
				// 				})
				// 			]
				// 		})
				// 	]
				// })],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function () {
						var sUserID = sap.ui.getCore().byId("UserID").getValue();
						var sUserName = sap.ui.getCore().byId("UserName").getValue();

						var oObject = {};
						oObject = {
							"usid": sUserID,
							"name": sUserName
						};
	
						var sPath = "/Users('" + sUserID + "')";
						var sServiceUrl = "https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata";

						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
						oModel.update(sPath, oObject);

						oModel.setRefreshAfterChange(false);
	
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		onDelete: function(oEvent) {
			 var oUser = this._item;	
			 var oUserID = oUser.usid;
			 var sPath = "/OrgUnits('" + oUserID + "')";
			 var sServiceUrl = "https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata";
	
			 var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			 oModel.remove(sPath);
	
			 oModel.setRefreshAfterChange(false);
		 },
		/*_onObjectMatched: function (oEvent) {
			this.byId("PeopleDetailPanel").
			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "people"
			}
			);
			console.log(this.byId("PeopleDetailPanel").getBindingContext('people'));
		},
		onNavBack: function () {
			var oHistory, sPreviousHash;
	  
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
	  
			if (sPreviousHash !== undefined) {
			  window.history.go(-1);
			} else {
			  this.getRouter().navTo("appHome", {}, true);
			}
		  }*/
	});
});