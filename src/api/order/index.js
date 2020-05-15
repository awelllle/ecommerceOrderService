
const {validParam, sendErrorResponse, sendSuccessResponse} = require('../../helpers/utility');
let router = require('express').Router();
let controller = require('./controller');



router.post('/orders', controller.orders);

router.post('/place', controller.place);
router.post('/cancel', controller.cancel);


module.exports = router;