const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormResponseSchema = new Schema({
  formId: {
    type: [Schema.Types.ObjectId],
    ref: "Form",
  },
  formResponseData: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FormResponse", FormResponseSchema);
