
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
let OrderSchema = new Schema({
    
    name: String,
    price: Number,
    user: String,
    address : String,
    status : String,
    orderId: String,
   
    created: {type: Date, require:true, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);
