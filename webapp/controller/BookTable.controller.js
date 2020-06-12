sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("net.bounceme.monkeyCoolSAP-Bibliothek.controller.BookTable", {

		onInit: function() {
			this.getView().setModel(this.getOwnerComponent().getModel("books"));
		},

		onFilterBooks: function(oEvent) {

			// build filter
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter({
					filters: [
						new Filter("title", FilterOperator.Contains, sQuery),
						new Filter("author", FilterOperator.Contains, sQuery)
					]
				}));
			}

			// filter binding
			var oList = this.byId("bookTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
		onEntryPress: function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				bookId: window.encodeURIComponent(oItem.getBindingContext("books").getPath().substr(1))
			});
		}

	});
});