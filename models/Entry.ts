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
  },
  createdAt: {
    type: Number,
  },
});

// This is to avoid the error: OverwriteModelError: Cannot overwrite `Entry` model once compiled.
// because once the model is compiled, it cannot be recompiled.
const EntryModel = mongoose.models.Entry || model("Entry", entrySchema);

export default EntryModel;
