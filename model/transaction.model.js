const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    TransactionId: {
      type: Number,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "name of transaction is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    phone: {
      type: String,
    },
    amount: {
      type: String,
      required: [true, "amount is required"],
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["RWF"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending",
    },
    paymentGateway: {
      type: String,
      required: [true, "payment gateway is required"],
      enum: ["flutterwave"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionsSchema);
