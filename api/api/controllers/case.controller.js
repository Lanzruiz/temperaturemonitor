var mongoDbConnection = require('../../app').mongoDbConnection;
var util = require('util');
var CaseService = require('../../services/case.service');
var AppError = require('../../models/appError.model');

class CaseController {
    constructor() {
        this.caseService = new CaseService();
    }

    listCases(req, res) {
          try {
            var caseFilterSortQuery = req.body.caseFilterSortQuery;
            this.caseService.listCases(caseFilterSortQuery).then( (cases) => {
                return res.status(200).json(cases);
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.CASE_LIST_QUERY_INVALID) {
                    return res.status(404).json(
                        {code: error.code, message: "The case was not found"});
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

    addComment(req, res) {
        try {
            console.log(req.body);
            var caseId = req.body.caseId;
            var comment = req.body.comment;
            this.caseService.addComment(caseId, comment).then( (commentId) => {
                console.log('added comment');
                return res.status(200).json({commentId});
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.CASE_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The comment data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.CASE_ALREADY_EXISTS) {
                    return res.status(409).json(
                        {code: error.code, message: "The comment already exists"});
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

    editComment(req, res) {
        try {
            console.log(req.body);
            var comment = req.body;
            this.caseService.editComment(comment).then( () => {
                console.log('updated comment');
                return res.status(200).json("successful operation, comment updated");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.CASE_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The comment data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.CASE_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The comment was not found"});
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

    uploadAttachment(req, res) {
        try {
            console.log(req.body);
            var caseId = req.body.caseId;
            var attachment = req.body.attachment;
            this.caseService.uploadAttachment(caseId,attachment).then( (attachmentId) => {
                console.log('uploaded attachment');
                return res.status(200).json({attachmentId});
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.CASE_DATA_INVALID) {
                    return res.status(400).json(
                        {code: error.code, message: "The comment data posted was not valid"});
                } else if (error instanceof AppError && error.code == AppError.CASE_ALREADY_EXISTS) {
                    return res.status(409).json(
                        {code: error.code, message: "The comment already exists"});
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

    deleteAttachment(req, res) {
        try {
            var attachmentId = req.swagger.params.attachmentId.value;
            this.caseService.deleteAttachment(attachmentId).then( () => {
                console.log('Attachment deleted');
                return res.status(200).json("successful operation, attachment deleted");
            }).catch( (error) => {
                if (error instanceof AppError && error.code == AppError.CASE_NOT_FOUND) {
                    return res.status(404).json(
                        {code: error.code, message: "The case was not found"});
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

    processStep(req, res) {
    	return res.status(500).json(
            {code: AppError.NOT_IMPLEMENTED, message: "This API call has not yet been implemented"});  
    }
}

var caseController = new CaseController();
module.exports = {
    listCases: function(req, res) { caseController.listCases(req, res); },
    addComment: function(req, res) { caseController.addComment(req, res); },
    editComment: function(req, res) { caseController.editComment(req, res); },
    uploadAttachment: function(req, res) { caseController.uploadAttachment(req, res); },
    deleteAttachment: function(req, res) { caseController.deleteAttachment(req, res); },
    processStep: function(req, res) { caseController.processStep(req, res); }
};