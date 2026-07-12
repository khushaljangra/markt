import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please add a coupon code'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      required: true,
      enum: ['percentage', 'fixed'],
      default: 'percentage',
    },
    discountValue: {
      type: Number,
      required: [true, 'Please add a discount value'],
      min: [0, 'Discount value cannot be negative'],
    },
    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscount: {
      type: Number,
      default: null, // For percentage discounts, caps the maximum discount amount
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please specify an expiry date'],
    },
    usageLimit: {
      type: Number,
      default: null, // null means unlimited usage
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method to check if coupon is valid
couponSchema.methods.isValid = function (orderAmount = 0) {
  if (!this.isActive) return false;
  if (new Date() > this.expiryDate) return false;
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) return false;
  if (orderAmount < this.minOrderAmount) return false;
  return true;
};

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
