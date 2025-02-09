const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cacheController');

router.post('/', cacheController.storeCache);
router.get('/:key', cacheController.getCache);
router.delete('/:key', cacheController.deleteCache);

module.exports = router;
