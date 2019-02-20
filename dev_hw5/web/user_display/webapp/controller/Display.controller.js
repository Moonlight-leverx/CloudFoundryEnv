sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";
  return Controller.extend("user_display.controller.Detail", {

    onInit: function() {
      /*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);*/
      var oList = this.byId("details");
      this._oList = oList;
    },

    onSelectionChange: function(oEvent) {
      var oTable = this.getView().byId("details");
      this._item = oTable.getSelectedItem().getBindingContext("users").getObject();
    },

    onRefresh: function(oEvent) {
      this._oList.getBinding("items").refresh();
    },

    onCreate: function(oEvent) {
      var dialog = new sap.m.Dialog({
        title: "Add User",
        type: "Message",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "350px",
            content: [
              new sap.ui.layout.HorizontalLayout({
                content: [
                  new sap.m.Label({
                    width: "100px",
                    design: "Bold",
                    text: "User ID:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("UserID_inp", {
                    width: "230px",
                    value: "ID will generated automatically",
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
                  new sap.m.Input("UserName_inp", {
                    value: "",
                    width: "230px"
                  })
                ]
              })
            ]
          })
        ],
        beginButton: new sap.m.Button({
          text: "Save",
          type: "Accept",
          press: function() {
            var sUserName = sap.ui.getCore().byId("UserName_inp").getValue();

            var oObject = {};
            oObject = {
              "usid": "",
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
          type: "Reject",
          press: function() {
            dialog.close();
          }
        }),
        afterClose: function() {
          dialog.destroy();
        }
      });
      dialog.open();
    },
    onUpdate: function(oEvent) {
      var oUser = this._item;
      var oUserID = oUser.usid;
      var oUserName = oUser.name;

      var dialog = new sap.m.Dialog({
        title: "Change User",
        type: "Message",
        content: [
          new sap.ui.layout.VerticalLayout({
            width: "350px",
            content: [
              new sap.ui.layout.HorizontalLayout({
                content: [
                  new sap.m.Label({
                    width: "100px",
                    design: "Bold",
                    text: "User ID:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("UserID_inp", {
                    width: "230px",
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
                  new sap.m.Input("UserName_inp", {
                    value: oUserName,
                    width: "230px"
                  })
                ]
              })
            ]
          })
        ],
        beginButton: new sap.m.Button({
          text: "Save",
          type: "Accept",
          press: function() {
            var sUserID = sap.ui.getCore().byId("UserID_inp").getValue();
            var sUserName = sap.ui.getCore().byId("UserName_inp").getValue();

            var oObject = {};
            oObject = {
              "usid": sUserID,
              "name": sUserName,
              "ts_update": null,
              "ts_create": null
            };

            var oModel = new sap.ui.model.odata.ODataModel("https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata", false);
            sap.ui.getCore().setModel(oModel);

            sap.ui.getCore().getModel().update("/Users('" + sUserID + "')", oObject, null, function() {
              sap.m.MessageToast.show("Updated successfully", { duration: 3000 });
            }, function() {
              sap.m.MessageToast.show("Update failed", { duration: 3000 });
            });

            oModel.setRefreshAfterChange(false);

            dialog.close();
          }
        }),
        endButton: new sap.m.Button({
          text: "Cancel",
          type: "Reject",
          press: function() {
            dialog.close();
          }
        }),
        afterClose: function() {
          dialog.destroy();
        }
      });
      dialog.open();
    },

    onDelete: function(oEvent) {
      var oUser = this._item;
      var oUserID = oUser.usid;

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://p2001079623trial-df43r34-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/user/user.xsjs?userid=" + oUserID,
        "method": "DELETE",
        "headers": {
          "content-type": "application/json"
        },
        "processData": false
      };
      $.ajax(settings).done(function(response) {
        sap.m.MessageToast.show("Deleted", { duration: 2000 });
      });

      /*This way is not working*/
      //var sPath = "/Users('" + oUserID + "')";
      //var sServiceUrl = "https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata";

      //var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
      //oModel.remove(sPath);

      //oModel.setRefreshAfterChange(false);
    }
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
