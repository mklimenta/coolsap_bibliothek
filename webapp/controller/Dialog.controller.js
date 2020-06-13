sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("net.bounceme.monkeyCoolSAP-Bibliothek.controller.Dialog", {
		
		 	onInit: function () {
				var sPath = $.sap.getModulePath("net.bounceme.monkeyCoolSAP-Bibliothek", "/model/books.json");
				var oModel = new sap.ui.model.json.JSONModel(sPath);
				this.getView().setModel(oModel);
			}
	});
});