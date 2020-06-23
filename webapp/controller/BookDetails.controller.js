sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(Controller, JSONModel, UIComponent, History, MessageToast) {
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
			this._toggleButtonActive();
		},

		onBorrow: function(oEvent) {
			this._updateModel(-1, +1);
			this._toggleButtonActive();
			MessageToast.show("Book borrowed");
		},

		onReturn: function(oEvent) {
			this._updateModel(+1, -1);
			this._toggleButtonActive();
			MessageToast.show("Book returned");
		},

		_updateModel: function(available, lent) {
			var oModel = this.getOwnerComponent().getModel("books");
			var elementPath = this.getView().getElementBinding("books").getPath();
			var availablePath = elementPath + "/available_count";
			var lentPath = elementPath + "/lent_count";
			var availableProperty = Number(oModel.getProperty(availablePath));
			var lentProperty = Number(oModel.getProperty(lentPath));
			if ((availableProperty + available) >= 0 && (lentProperty + lent) >= 0) {
				oModel.setProperty(availablePath, availableProperty + available);
				oModel.setProperty(lentPath, lentProperty + lent);
			}
		},
		
		_toggleButtonActive: function() {
		    var oModel = this.getOwnerComponent().getModel("books");
			var elementPath = this.getView().getElementBinding("books").getPath();
			var availablePath = elementPath + "/available_count";
			var lentPath = elementPath + "/lent_count";
			var availableProperty = Number(oModel.getProperty(availablePath));
			var lentProperty = Number(oModel.getProperty(lentPath));
			var borrowBtn = this.getView().byId("borrowBtn");
			var returnBtn = this.getView().byId("returnBtn");
			
		    if(availableProperty <= 0) {
		        borrowBtn.setEnabled(false);
		        returnBtn.setEnabled(true);
		    } else
		    if(lentProperty <= 0) {
		        borrowBtn.setEnabled(true);
		        returnBtn.setEnabled(false);
		    } else {
		        borrowBtn.setEnabled(true);
		        returnBtn.setEnabled(true);
		    }
		},
	
		onEntryPress: function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("edit", {
				bookId: window.encodeURIComponent(oItem.getBindingContext("books").getPath().substr(1))
			});	
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