import { model, Schema, Document } from "mongoose";

interface IMovie extends Document {
  name: string;
  kp_id: string;
}

const MovieSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  kp_id: {
    type: String,
  },
});

const MovieModel = model<IMovie>("Movie", MovieSchema);

export { MovieModel, IMovie };
