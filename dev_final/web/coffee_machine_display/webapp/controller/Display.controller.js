sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";
  return Controller.extend("coffee_machine_display.controller.Detail", {

    onInit: function() {
      /*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);*/
      var oList = this.byId("details");
      this._oList = oList;
    },

    onSelectionChange: function(oEvent) {
      var oTable = this.getView().byId("details");
      this._item = oTable.getSelectedItem().getBindingContext("coffee_machines").getObject();
    },

    onRefresh: function(oEvent) {
      this._oList.getBinding("items").refresh();
    },

    onCreate: function(oEvent) {
      var dialog = new sap.m.Dialog({
        title: "Add Coffee Machine",
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
                    text: "Coffee Machine ID:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("cmid_inp", {
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
                    text: "Brand:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("brand_inp", {
                    value: "",
                    width: "230px"
                  })
                ]
              }),
              new sap.ui.layout.HorizontalLayout({
                content: [
                  new sap.m.Label({
                    width: "100px",
                    design: "Bold",
                    text: "Ncups:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("ncups_inp", {
                    width: "230px",
                    value: ""
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
            var sBrand = sap.ui.getCore().byId("brand_inp").getValue();
			var sNcups = sap.ui.getCore().byId("ncups_inp").getValue();
			
			if(!checkInput(sNcups)) return;
			
            var oObject = {};
            oObject = {
              "cmid": "",
              "name": sBrand,
              "ncups": sNcups
            };

            var sServiceUrl = "https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata";

            var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			
			oModel.create("/CoffeeMachines", oObject, {
        		success : function(oData, oResponse) {
        			sap.m.MessageToast.show(" Created " );
        		},
    			error : function(oError) {
        			sap.m.MessageToast.show(" Creation failed" );
			    }
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
    onUpdate: function(oEvent) {
      var oCM = this._item;
      var oCMID = oCM.cmid;
      var oBrand = oCM.name;
      var oNcups = oCM.ncups;

      var dialog = new sap.m.Dialog({
        title: "Change Coffee Machine",
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
                    text: "Coffee Machine ID:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("cmid_inp", {
                    width: "230px",
                    value: oCMID,
                    editable: false
                  })
                ]
              }),
              new sap.ui.layout.HorizontalLayout({
                content: [
                  new sap.m.Label({
                    width: "100px",
                    design: "Bold",
                    text: "Brand:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("brand_inp", {
                    value: oBrand,
                    width: "230px"
                  })
                ]
              }),
              new sap.ui.layout.HorizontalLayout({
                content: [
                  new sap.m.Label({
                    width: "100px",
                    design: "Bold",
                    text: "Ncups:"
                  }).addStyleClass("popup_label"),
                  new sap.m.Input("ncups_inp", {
                    width: "230px",
                    value: oNcups
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
            var sCMID = sap.ui.getCore().byId("cmid_inp").getValue();
            var sBrand = sap.ui.getCore().byId("brand_inp").getValue();
            var sNcups = sap.ui.getCore().byId("ncups_inp").getValue();
			
			if(!checkInput(sNcups)) return;
			
            var oObject = {};
            oObject = {
              "cmid": sCMID,
              "name": sBrand,
              "ncups": sNcups,
              "ts_update": null,
              "ts_create": null
            };

            var oModel = new sap.ui.model.odata.ODataModel("https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata", true);
            sap.ui.getCore().setModel(oModel);

            sap.ui.getCore().getModel().update("/CoffeeMachines('" + sCMID + "')", oObject, null, function() {
              sap.m.MessageToast.show("Updated ", { duration: 3000 });
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
      var oCM = this._item;
      var oCMID = oCM.cmid;

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://p2001079623trial-df43r34-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/coffeemachine/coffeemachine.xsjs?cmid=" + oCMID,
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
      //var sPath = "/CoffeeMachines('" + oCMID + "')";
      //var sServiceUrl = "https://p2001079623trial-df43r34-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/dev.xsodata";

      //var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
      //console.log(oModel);
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

 function checkInput(param) {
	if (isNaN(parseFloat(param))) {
		sap.m.MessageToast.show(" Ncups must contain only digits!" );
		return false;
	}
	if (param < 1 || param > 9) {
		sap.m.MessageToast.show(" Ncups must be greater than 1 and less than 9" );
		return false;
	} 
	return true;
}
