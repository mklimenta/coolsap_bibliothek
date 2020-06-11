sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("net.bounceme.monkeyCoolSAP-Bibliothek.controller.BookDetails", {

		onInit: function() {
			var sPath = $.sap.getModulePath("net.bounceme.monkeyCoolSAP-Bibliothek", "/model/books.json");
			var oModel = new sap.ui.model.json.JSONModel(sPath);
			this.getView().setModel(oModel);
		},

		onBorrow: function(oEvent) {
			var oModel = this.getView().getModel();
			var availablePath = "/books/0/available_count";
			var lentPath = "/books/0/lent_count";
			oModel.setProperty(availablePath, oModel.getProperty(availablePath) + 1);
			oModel.setProperty(lentPath, oModel.getProperty(lentPath) - 1);
		},

		onReturn: function(oEvent) {
			var oModel = this.getView().getModel();
			var availablePath = "/books/0/available_count";
			var lentPath = "/books/0/lent_count";
			oModel.setProperty(availablePath, oModel.getProperty(availablePath) - 1);
		    oModel.setProperty(lentPath, oModel.getProperty(lentPath) + 1);
		}
	});
});