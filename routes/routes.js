const express = require('express');
const router = express.Router()
const ContactController = require('../controllers/ContactController');

router.route("/").get(ContactController.listAll).post(ContactController.create);
router.route("/:id").put(ContactController.update).delete(ContactController.delete);
router.route('/create').get(ContactController.showCreateForm);
router.route("/:id/edit").get(ContactController.showUpdateForm);
module.exports = router;