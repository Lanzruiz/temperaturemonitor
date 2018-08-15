var mongoDbConnection = require('../../app').mongoDbConnection;
var util = require('util');
var DashboardService = require('../../services/dashboard.service');
var AppError = require('../../models/appError.model');

class DashboardController {
    constructor() {
        this.dashboardService = new DashboardService();
    }

    listWidget(req, res) {
        try {
            this.dashboardService.listWidget().then( (widgets) => {
                return res.status(200).json(widgets);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.WIDGET_LIST_QUERY_INVALID) {
                    return res.status(404).json(
                        {code: error.code, message: "The widget was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json("An internal server error has occurred");            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("An internal server error has occurred");
        }  
    }

    listWidgetTypes(req, res) {
        try {
            this.dashboardService.listWidgetTypes().then( (widgetTypes) => {
                return res.status(200).json(widgetTypes);
            }).catch( (error) => {
                if (error instanceof AppError) {
                    return res.status(404).json(
                        {code: error.code, message: "The Widgets type was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json("An internal server error has occurred");            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("An internal server error has occurred");
        } 
    }

    addWidget(req, res) {
         try {
            console.log(req.body);
            var widget = req.body.comment;
            this.dashboardService.addWidget(widget).then( (widgetId) => {
                console.log('added widget');
                return res.status(200).json({widgetId});
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.WIDGET_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The widget data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.WIDGET_ALREADY_EXISTS) {
                    return res.status(409).json(
                        {code: error.code, message: "The widget already exists"});
                } else {
                    console.log(error);
                    return res.status(500).json("An internal server error has occurred");            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("An internal server error has occurred");
        }   
    }

    editWidget(req, res) {
        try {
            var widgetId = req.swagger.params.widgetId.value;
            console.log(req.body);
            var jsonPatch = req.body;
            this.dashboardService.editWidget(widgetId,jsonPatch).then( () => {
                console.log('updated widget');
                return res.status(200).json("successful operation, widget updated");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.WIDGET_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The widget data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.WIDGET_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The widget was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json("An internal server error has occurred");            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("An internal server error has occurred");
        }
    }

    deleteWidget(req, res) {
         try {
            var widgetId = req.swagger.params.widgetId.value;
            this.dashboardService.deleteWidget(widgetId).then( () => {
                console.log('Tenant deleted');
                return res.status(200).json("successful operation, tenant deleted");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.WIDGET_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The tenant was not found"});
                } else {
                    console.log(error);
                    return res.status(500).json("An internal server error has occurred");            
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("An internal server error has occurred");
        }
    }

    moveWidget(req, res) {
        return res.status(500).json("Not yet implemented");
    }


}

var dashboardController = new DashboardController();
module.exports = {
    listWidget: function(req, res) { dashboardController.listWidget(req, res); },
    addWidget: function(req, res) { dashboardController.addWidget(req, res); },
    editWidget: function(req, res) { dashboardController.editWidget(req, res); },
    deleteWidget: function(req, res) { dashboardController.deleteWidget(req, res); },
    moveWidget: function(req, res) { dashboardController.moveWidget(req, res); },
    listWidgetTypes: function(req, res) { dashboardController.listWidgetTypes(req, res); }
};