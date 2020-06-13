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
			},
			onAddBook: function () {
				var oModel = this.getOwnerComponent().getModel("books");
				
				var isbn = sap.ui.getCore().byId("isbn").getValue();
				var title = sap.ui.getCore().byId("title").getValue();
				var author = sap.ui.getCore().byId("author").getValue();
				var edition = sap.ui.getCore().byId("edition").getValue();
				var publisher = sap.ui.getCore().byId("publisher").getValue();
				var language = sap.ui.getCore().byId("language").getValue();
				var category = sap.ui.getCore().byId("category").getValue();
				var available_count = sap.ui.getCore().byId("available_count").getValue();
				
			    oModel.push(isbn, title, author, edition, publisher, language, category, available_count );
			}
	});
});