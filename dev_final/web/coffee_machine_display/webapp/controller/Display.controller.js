sap.ui.define([
  "sap/ui/core/mvc/Controller",
   "sap/ui/core/Fragment",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
], function(Controller, Fragment, JSONModel, Filter, FilterOperator) {
  "use strict";
  return Controller.extend("coffee_machine_display.controller.Detail", {

    onInit: function() {
      this._images = [
      	"https://bit.ly/2SpyQlp",
      	"https://bit.ly/2H20WBi",
      	"https://bit.ly/2GHGCFP",
      	"https://bit.ly/2Tgw7PE"
      ]
      /*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);*/
      
      var oList = this.byId("details");
      this._oList = oList;
      this.setNull();

	  var oCarouselContainer = {
				screenSizes : [
					"350px",
					"450px",
					"550px",
					"650px",
					"750px"
				]
			};
	  var oScreenSizesModel = new JSONModel(oCarouselContainer);
	  this.getView().setModel(oScreenSizesModel, "ScreenSizesModel");
	  this._setNumberOfImagesInCarousel(3);
    },
    
    setNull: function() {
    	this._item = null;
    },
    
    closeDialog: function() {
    	this.getView().byId('createDialog').close();
    },

    onSelectionChange: function(oEvent) {
      var oTable = this.getView().byId("details");
      this._item = oTable.getSelectedItem().getBindingContext("coffee_machines").getObject();
    },

    onRefresh: function(oEvent) {
      this._oList.getBinding("items").refresh();
    },
    
    onCancelButton: function() {
    	var model = this.getView().getModel("coffee_machine");
    	model.setData({});
		this.closeDialog();
    },
    
    onSaveButton: function() {
    	var model = this.getView().getModel("coffee_machine");
    	var obj = model.getData();
	    var oModel = this.getView().getModel("coffee_machines");

    	if (this._item === null) {
			delete obj.ts_update;
			delete obj.ts_create;
			if(!checkInput(obj.ncups)) return;
	    	oModel.create("/CoffeeMachines", obj, {
                merge: false,
                success: function () {
                    sap.m.MessageToast.show(" Created " );
                },
                error: function () {
                    sap.m.MessageToast.show(" Creation failed" );
                }
            });
            this.closeDialog();
            this.setNull();
    	} else {
    		if(!checkInput(obj.ncups)) return;
			oModel.update("/CoffeeMachines('" + obj.cmid + "')", obj, {
                merge: false,
                success: function () {
                    sap.m.MessageToast.show(" Updated " );
                },
                error: function () {
                    sap.m.MessageToast.show(" Update failed " );
                }
            });
            model.setData({});
            this.setNull();
            this.getView().byId("createDialog").close();
    	}
    },

    onCreate: function(oEvent) {
    		this.setNull();
            var view = this.getView();
            if (!view.byId("createDialog")) {
                Fragment.load({
                    id: view.getId(),
                    name: "coffee_machine_display.view.createDialog",
                    controller: this
                }).then(function (oDialog) {
                    view.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                view.byId("createDialog").open();
            }
    },
    
    onUpdate: function(oEvent) {
    	if (this._item === null) {
    		sap.m.MessageToast.show(" To change the Coffee Machine, you must select the line" );
    		return;
    	}
    	var model = this.getView().getModel("coffee_machine");
    	model.setProperty("/cmid", this._item.cmid);
    	model.setProperty("/name", this._item.name);
    	model.setProperty("/ncups", this._item.ncups);
    	model.setProperty("/ts_update", null);
    	model.setProperty("/ts_create", null);

    	var view = this.getView();
            if (!view.byId('createDialog')) {
                Fragment.load({
                    id: view.getId(),
                    name: 'coffee_machine_display.view.createDialog',
                    controller: this
                }).then(function (oDialog) {
                    view.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                view.byId('createDialog').open();
            }
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
    },
    
    onSliderMoved: function (oEvent) {
		var origingalHeight = 650;
		var screenSizesJSON = this.getView().getModel("ScreenSizesModel").getData();
		var iValue = oEvent.getParameter("value");
		var screenWidth = screenSizesJSON.screenSizes[Number(iValue) - 1];
		var oCarouselContainer = this.byId("carouselContainer");
		oCarouselContainer.setWidth(screenWidth);
		var screenHeight = origingalHeight * parseFloat(screenWidth) / 1000;
		oCarouselContainer.setHeight(screenHeight + 'px');
	},

	_setNumberOfImagesInCarousel: function () {
		var number = this._images.length;
		
		if (!number || number < 1 || number > 9){
			return;
		}
		
		var oCarousel = this.byId("carousel");
		oCarousel.destroyPages();
		for (var i = 0; i < number; i++) {
			var imgId = "img" + (i + 1);
			var imgSrc = this._images[i];
			var img = new sap.m.Image(imgId, {
				src: imgSrc,
				densityAware: false,
				decorative: false
			});
			oCarousel.addPage(img);
			}
	},
	
    onAddImage: function() {
        var view = this.getView();
        if (!view.byId("addImage")) {
            Fragment.load({
                id: view.getId(),
                name: "coffee_machine_display.view.addImgDialog",
                controller: this
            }).then(function (oDialog) {
                view.addDependent(oDialog);
                oDialog.open();
            });
        } else {
            view.byId("addImage").open();
        }
    },
    
    onSaveImg: function() {
    	var model = this.getView().getModel("urlmodel");
    	var obj = model.getData();
    	this._images.push(obj.url);
    	this._setNumberOfImagesInCarousel();
    	this.getView().byId('addImage').close();
    },
	
	onCancelImg: function() {
		this.getView().byId('addImage').close();
	},
	
	onSuggest: function (event) {
		var oSource = event.getSource();
		var value = event.getSource().getValue();

		var filters = [];
		if (value) {
			filters = [
				new sap.ui.model.Filter([
					new sap.ui.model.Filter("cmid", function(sText) {
						return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("name", function(sDes) {
						return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					})
				], false)
			];
		}
		var oBinding = oSource.getBinding('suggestionItems');
		oBinding.filter(filters);
		oBinding.attachEventOnce('dataReceived', function() {
			oSource.suggest();
		});
	},
	
	isNumeric: function(oValue) {
      var tmp = oValue && oValue.toString();
      return !jQuery.isArray(oValue) && (tmp - parseFloat(tmp) + 1) >= 0;
    },
    
	onSearch: function (event) {
		var item = event.getParameter("suggestionItem");
		console.log(item);
		if (item) {
			sap.m.MessageToast.show(item.getDescription());
		}
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
