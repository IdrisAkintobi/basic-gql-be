import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const UsersDb = model("User", UserSchema);
