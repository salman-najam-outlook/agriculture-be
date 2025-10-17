const mongoose = require('mongoose');

const unitListSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        abbr: { type: String, default: null },
        unit_category: { type: mongoose.Schema.Types.ObjectId, ref: "unitCategory", required: true },
        factor: { type: mongoose.Types.Decimal128, default: null },
        is_default:{type:Boolean, default:false},
        deletedAt: { type: Date, default: null }
      },
      { timestamps: true }
)
const unitList = mongoose.model('unitList', unitListSchema);
module.exports = unitList