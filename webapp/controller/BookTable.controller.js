sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function(Controller, JSONModel, Filter, FilterOperator, Fragment) {
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
		
    	_getDialog : function () {
        	if (!this._oDialog) {
            	this._oDialog = sap.ui.xmlfragment("net.bounceme.monkeyCoolSAP-Bibliothek.view.NewBookDialog", this);
        		this.getView().addDependent(this._oDialog);
        	}
        	return this._oDialog;
    	},
      
    	onOpenDialog : function () {
        	this._getDialog().open();
    	},
      
    	onCloseDialog : function () {
        	this._getDialog().close();
    	},
    	
    	onAddBook: function () {
				var oModel = this.getOwnerComponent().getModel("books");
				var isbn = sap.ui.getCore().byId("isbn")._lastValue; 
				var title = sap.ui.getCore().byId("title")._lastValue; 
				var author = sap.ui.getCore().byId("author")._lastValue; 
				var year = sap.ui.getCore().byId("year")._lastValue; 
				var edition = sap.ui.getCore().byId("edition")._lastValue; 
				var publisher = sap.ui.getCore().byId("publisher")._lastValue; 
				var language = sap.ui.getCore().byId("language").getSelectedItem().getText();; 
				var category = sap.ui.getCore().byId("category").getSelectedItem().getText();; 
				var available_count = sap.ui.getCore().byId("available_count")._lastValue; 
			
				var model = this.getOwnerComponent().getModel("books");
				var localdata = model.getData();
				var jsonString = JSON.stringify(localdata);
				
				var moreData = [];
				var oneMoreEntity= {};

				oneMoreEntity['isbn']= isbn;
				oneMoreEntity['title']= title;
				oneMoreEntity['author']= author;
				oneMoreEntity['year']= year;
				oneMoreEntity['edition']= edition;
				oneMoreEntity['publisher']= publisher;
				oneMoreEntity['language']= language;
				oneMoreEntity['category']= category;
				oneMoreEntity['available_count']= available_count;
				oneMoreEntity['lent_count']= 0;
				
				localdata.books.push(oneMoreEntity);
				
				model.setData(localdata, true);
				/* eslint no-console: "error" */
				console.log(model.getData());
		
				this._getDialog().close();
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