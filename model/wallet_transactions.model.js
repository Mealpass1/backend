const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletTransactionsSchema = new Schema(
  {
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isInFlow: {
      type: Boolean,
      // default: false
    },
    paymentMethod: {
      type: String,
      default: "flutterwave",
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["RWF"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "successful", "failed"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("WalletTransaction", WalletTransactionsSchema);
