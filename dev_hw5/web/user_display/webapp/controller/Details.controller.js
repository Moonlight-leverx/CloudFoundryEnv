sap.ui.define([
	"sap/ui/demo/wt/controller/BaseController",
	"sap/m/MessageBox"
], function (AppController, MessageBox) {
	"use strict";
	return AppController.extend("user_display.controller.Details", {
		onInit: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").id),
				model: "People"
            }
            );
		}
	});
});