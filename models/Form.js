const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  formData: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Form", FormSchema);
