
const {validParam, generateId, sendErrorResponse, sendSuccessResponse, capitalize, trimCollection} = require('../../helpers/utility');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const ObjectId = require('mongodb').ObjectId;

exports.orders = (req, res) => {
    
    Order.find({}, function (err, result) {
        if(err)
        {
            console.log(err);
            return sendErrorResponse(res, {}, 'Something went wrong, Please try again');
        }

        if(result != null){
            return sendSuccessResponse(res, result, 'Here you go!');

        }else{
            return sendErrorResponse(res, {}, 'No orders found');

        } 
    });


}


exports.place = (req, res) => {
    let required = [
        {name: 'name', type: 'string'},
        {name: 'price', type: 'string'},
        {name: 'address', type: 'string'},
    ];

    req.body = trimCollection(req.body);
    const body = req.body;
    
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

        let nOrder      = new Order();
        nOrder.name      = body.name;
        nOrder.price     = body.price;
        nOrder.address     = body.address;
        nOrder.status     =  "Pending";
        nOrder.user      = req.payload.data.email;
        nOrder.orderId  = generateId(4);
      
        nOrder.save((err) => {
            console.log(err);
            if (err) {
                return sendErrorResponse(res, err, 'Something went wrong');
            }
            return sendSuccessResponse(res, '', `Your Order has been placed! Your Order Id is ${nOrder.orderId}`);
         });

}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}


}

exports.cancel = (req, res) => {
    let required = [
        {name: 'id', type: 'string'},
       
    ];

    req.body = trimCollection(req.body);
    const body = req.body;
    
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

        Order.findOne({orderId: body.id}, (err, result) => 
        {
            if (err)
            {
                console.log(err);
                return sendErrorResponse(res, {}, 'Something went wrong, please try again');
            }
            if (result) {
                if(result.status !== "processing"){

                  
                    
                    Order.updateOne(
                        { orderId: body.id}, {
                        $set: {
                            status:"cancelled",
                        },
                    }, (err, updated) => {
                      
                        if (err) {
                            console.log(err);
                            return sendErrorResponse(res, {}, 'Something went wrong, please try again');
                        }

                            return sendSuccessResponse(res, {}, 'Your Order has been cancelled');
                       
                    });

                }else{
                    return sendErrorResponse(res, {}, 'Sorry, it\'s too late to cancel this order ');
                }



            }else{
                return sendErrorResponse(res, {}, 'We can\'t seem to find that order, please check the Id ');
            }
        });


}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}


}
