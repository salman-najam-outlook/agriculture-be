const mongoose = require('mongoose');

const unitCategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        label: { type: String, default: null },
        saas_id:{ 
            type:Number, 
            validate: {
                validator: Number.isInteger, 
                message: "Quantity must be an integer value."
            },    
        default:null},
        deletedAt: { type: Date, default: null }
     },
    { timestamps: true }
)

const unitCategory = mongoose.model('unitCategory', unitCategorySchema);
module.exports = unitCategory