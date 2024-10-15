const RbacController = require('../controllers/RbacController');
const router = require('express').Router();


router.post('/createOnePermission', RbacController.createOnePermission)
router.post('/createOneRole', RbacController.createOneRole)
router.get('/listPermissions', RbacController.listPermissions)
router.get('/listRoles', RbacController.listRoles)
router.get('/listPermissionsByRole/:id', RbacController.listPermissionsByRole)
router.post('/addRoleToUser', RbacController.addRoleToUser)
router.post('/addPermissionToRole', RbacController.addPermissionToRole)

module.exports = router;