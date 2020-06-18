sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/UIComponent"
], function(Controller, JSONModel, UIComponent) {
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
		
		_updateModel: function(isbn, title, author, year, edition, language, category, available) {
			var oModel = this.getOwnerComponent().getModel("books");
			var elementPath = this.getView().getElementBinding("books").getPath();
			
			var isbnPath = elementPath + "/isbn";
			var titlePath = elementPath + "/title";
			var authorPath = elementPath + "/author";
			var yearPath = elementPath + "/year";
			var editionPath = elementPath + "/edition";
			var languagePath = elementPath + "/language";
			var categoryPath = elementPath + "/category";
			var availablePath = elementPath + "/availbale";
		
			var isbnProperty = oModel.getProperty(isbnPath);
			var titleProperty = oModel.getProperty(titlePath);
			var authorProperty = oModel.getProperty(authorPath);
			var yearProperty = oModel.getProperty(yearPath);
			var editionProperty = oModel.getProperty(editionPath);
			var languageProperty = oModel.getProperty(languagePath);
			var categoryProperty = oModel.getProperty(categoryPath);
			var availableProperty = Number(oModel.getProperty(availablePath));
		
			oModel.setProperty(isbnProperty + isbn);
			oModel.setProperty(titleProperty + title);
			oModel.setProperty(authorProperty + author);
			oModel.setProperty(yearProperty + year);
			oModel.setProperty(editionProperty + edition);
			oModel.setProperty(languageProperty + language);
			oModel.setProperty(categoryProperty + category);
			oModel.setProperty(availableProperty + available);
			
		},
		
		onSaveBook: function() {
			var isbn = this.getView().byId("isbn")._lastValue;
		    var title = this.getView().byId("title")._lastValue; 
			var author = this.getView().byId("author")._lastValue; 
			var year = this.getView().byId("year")._lastValue; 
			var edition = this.getView().byId("edition")._lastValue; 
			var publisher = this.getView().byId("publisher")._lastValue; 
			var language = this.getView().byId("language").getSelectedItem().getText();
			var category = this.getView().byId("category").getSelectedItem().getText(); 
			var available = this.getView().byId("available_count")._lastValue; 
				
			this._updateModel(isbn, title, author, year, edition, publisher, language, category, available);	
		}

	});
});