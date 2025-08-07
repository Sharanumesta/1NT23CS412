import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        try {
          new URL(v);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: "Invalid URL",
    },
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 6,
  },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
