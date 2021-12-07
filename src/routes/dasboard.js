const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.js');

router.post('/dashboard', require('../middleware/middleware.js'), (req,res,next) => {
	console.log("new user for dashboard>>> ", req.user)
	res.json({
		data: req.user
	})
	
});
router.get('/dashboard/:userId', dashboardController.getUserById);
router.get('/dashboards/:kelas', dashboardController.getUserByKelas);
router.put('/dashboard/:user', dashboardController.updateData);

module.exports = router
