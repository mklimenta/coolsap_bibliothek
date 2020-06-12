sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/UIComponent"
], function(Controller, JSONModel, UIComponent) {
	"use strict";

	return Controller.extend("net.bounceme.monkeyCoolSAP-Bibliothek.controller.BookDetails", {

		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").bookId),
				model: "books"
			});
		},

		onBorrow: function(oEvent) {
			this._updateModel(-1, +1);
		},

		onReturn: function(oEvent) {
			this._updateModel(+1, -1);
		},

		_updateModel: function(available, lent) {
			var oModel = this.getOwnerComponent().getModel("books");
			var elementPath = this.getView().getElementBinding("books").getPath();
			var availablePath = elementPath + "/available_count";
			var lentPath = elementPath + "/lent_count";
			var availableProperty = oModel.getProperty(availablePath);
			var lentProperty = oModel.getProperty(lentPath);
			if ((availableProperty + available) >= 0 && (lentProperty + lent) >= 0) {
				oModel.setProperty(availablePath, availableProperty + available);
				oModel.setProperty(lentPath, lentProperty + lent);
				return;
			}
		}
	});
});