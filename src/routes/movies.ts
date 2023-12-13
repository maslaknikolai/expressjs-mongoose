import { Router } from "express";
import { MovieModel, IMovie } from "../models/movie";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const movies: IMovie[] = await MovieModel.find().exec();
    return res.json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.post("/", async (req, res) => {
  try {
    const movie: IMovie = req.body;

    const isMovieExists = await MovieModel.findOne({
      name: movie.name,
    }).exec();

    if (isMovieExists) {
      return res
        .status(409)
        .json({ error: "There is already another movie with this name" });
    }

    const newMovie = await MovieModel.create(movie);
    return res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
