sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("net.bounceme.monkeyCoolSAP-Bibliothek.controller.BookTable", {

		onInit: function() {
			var oViewModel = new JSONModel();
			this.getView().setModel(oViewModel, "view");
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
		
    	_getDialog : function () {
        	if (!this._oDialog) {
            	this._oDialog = sap.ui.xmlfragment("net.bounceme.monkeyCoolSAP-Bibliothek.view.Dialog", this);
        		this.getView().addDependent(this._oDialog);
         }
         return this._oDialog;
      },
      
      onOpenDialog : function () {
         this._getDialog().open();
      },
      
      onCloseDialog : function () {
         this._getDialog().close();
      }
	});
});