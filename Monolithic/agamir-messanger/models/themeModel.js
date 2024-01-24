import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    themeUser: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
      default: [],
    },
    name: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: "#000000",
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    backgroundImg: {
      type: String,
      default: "",
    },
    frontFamily: {
      type: String,
      default: "",
    },
    frontSize: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Theme = mongoose.models.Theme || mongoose.model("Theme", themeSchema);

export default Theme;
