import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import css from "../css/HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  async function getTrendingMovies() {
    try {
      const url = "https://api.themoviedb.org/3/trending/movie/day";
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmU5NzhkYmVmOWFjNGEwMTI2MzkyZWQ5Y2M2ZGIzZCIsIm5iZiI6MTc0NTY5NjE5NS42MDMwMDAyLCJzdWIiOiI2ODBkMzVjM2Y3NjlmMGFmNmE4MGYzNzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F-xt6rj4PA6tcuBgHrt96Q6pmZlq8GT5fpDgYmIYMD0";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);

      setMovies(response.data.results);
    } catch (error) {}
  }

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={css.header}>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
