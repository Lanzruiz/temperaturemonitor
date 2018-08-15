var express = require('express')
var router = express.Router()

var UserController = require('../controllers/user.controller');
var userController = new CaseController();
router.post('/add', userController.add);
router.get('/list', userController.list);
router.put('/activate', userController.activate);
router.put('/deactivate', userController.deactivate);
router.put('/update', userController.update);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.delete('/2fa/delete', userController.delete2FA);
router.get('/2fa/new', userController.new2FA);
router.post('/2fa/activate', userController.activate2FA);
router.post('/2fa/verify', userController.verify2FA);
router.get('/password/reset', userController.passwordResetMatch);
router.post('/password/reset/createToken', userController.passwordCreateToken);
router.get('/password/reset/checkToken', userController.passwordResetCheckToken);
router.put('/password/reset/change', userController.passwordResetChange);
router.get('/permission/list', userController.listPermissions);
router.post('/permission/add', userController.addPermission);
router.delete('/permission/delete', userController.deletePermission);
// Export the Router
module.exports = router;
