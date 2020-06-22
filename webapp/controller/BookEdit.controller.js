sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(Controller, JSONModel, UIComponent, History, MessageToast) {
	"use strict";

	return Controller.extend("net.bounceme.monkeyCoolSAP-Bibliothek.controller.BookEdit", {
		
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("edit").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").bookId),
				model: "books"
			});
		},
		
		onSaveBook: function() {
			var isbn = this.getView().byId("isbn")._lastValue;
		    var title = this.getView().byId("title")._lastValue; 
			var author = this.getView().byId("author")._lastValue; 
			var year = this.getView().byId("year")._lastValue; 
			var edition = this.getView().byId("edition")._lastValue; 
			var publisher = this.getView().byId("publisher")._lastValue; 
			var language = this.getView().byId("language")._lastValue;
			var category = this.getView().byId("category")._lastValue; 
			var available = this.getView().byId("available_count")._lastValue; 
			
			var oModel = this.getOwnerComponent().getModel("books");
			var elementPath = this.getView().getElementBinding("books").getPath();
			
			oModel.setProperty(elementPath + "/isbn", isbn);
			oModel.setProperty(elementPath + "/title", title);
			oModel.setProperty(elementPath + "/author", author);
			oModel.setProperty(elementPath + "/year", year);
			oModel.setProperty(elementPath + "/edition", edition);
			oModel.setProperty(elementPath + "/publisher", publisher);
			oModel.setProperty(elementPath + "/language", language);
			oModel.setProperty(elementPath + "/category", category);
			oModel.setProperty(elementPath + "/available_count", available);
			
			MessageToast.show("Book saved");
			
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("detail", {
					bookId: window.encodeURIComponent(this.getView().getElementBinding("books").getPath().substr(1))
				});	
			}
		},
		
		onBack: function(oEvent){
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("overview");	
			}
		}

	});
});