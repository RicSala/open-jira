import mongoose from "mongoose";

const { model, Schema } = mongoose;

const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "Status must be pending, in-progress or finished",
    },
    required: true,
    default: "pending",
  },
  createdAt: {
    type: Number,
  },
});

// TODO: Review: why do we need to check if the model already exists?
//
console.log("MONGOOSE:", mongoose.models);

const EntryModel = mongoose.models.Entry || model("Entry", entrySchema);

export default EntryModel;
