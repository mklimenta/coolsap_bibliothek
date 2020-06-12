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

            onPress: function() {
               /*eslint-disable no-console, no-alert */
                console.log("TestPress");
                var isbn = this.getView().byId("isbn").getValue();

            	var oModell = this.getView().getModel();
                  
                //get data array
                var aData = $.sap.getModulePath("net.bounceme.monkeyCoolSAP-Bibliothek", "/model/books.json");
                //push object to array
                aData.push({ isbn: isbn});
                //store updated array back into model
                oModell.setProperty("net.bounceme.monkeyCoolSAP-Bibliothek.model.books.json", aData);
            }
	});
});