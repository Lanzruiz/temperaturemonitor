var express = require('express')
var router = express.Router()

var TenantController = require('../controllers/tenant.controller');
var tenantController = new CaseController();
router.get('/list', tenantController.list);
router.post('/add', tenantController.add);
router.delete('/delete', tenantController.delete);

/* 
@see http://restcookbook.com/Resources/asynchroneous-operations/
and https://www.adayinthelifeof.nl/2011/06/02/asynchronous-operations-in-rest/

The following call will return:
HTTP/1.1 202 Accepted
Location: /backup/queue/12345
 */
router.get('/backup', tenantController.backup);

/*
This call will return progress information. Once the backup is ready for download it will
return a 303 and a location header for the download URL for the backup.
*/
router.get('/backup/queue', tenantController.backupQueue);
router.get('/backup/download', tenantController.backupQueue);
router.get('/backup/notify/email', tenantController.backupNotifyEmail);
router.put('/backup/restore/upload', tenantController.restoreUpload);
router.put('/backup/restore/download', tenantController.restoreUpload);
router.put('/activate', tenantController.activate);
router.put('/deactivate', tenantController.deactivate);
router.put('/update', tenantController.update);

// Export the Router
module.exports = router;
