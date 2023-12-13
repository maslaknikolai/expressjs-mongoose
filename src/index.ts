import "./lib/db";
import express from "express";
import movies from "./routes/movies";


const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ message: "Please visit /movies to view all the movies" });
});

app.use("/movies", movies);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
