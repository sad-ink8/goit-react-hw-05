import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";
import css from "../css/MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = event.target.elements.search.value;
    setSearchParams({ search });
    event.target.reset();
  };

  async function getMovies() {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmU5NzhkYmVmOWFjNGEwMTI2MzkyZWQ5Y2M2ZGIzZCIsIm5iZiI6MTc0NTY5NjE5NS42MDMwMDAyLCJzdWIiOiI2ODBkMzVjM2Y3NjlmMGFmNmE4MGYzNzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F-xt6rj4PA6tcuBgHrt96Q6pmZlq8GT5fpDgYmIYMD0";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {}
  }

  useEffect(() => {
    if (search) {
      getMovies();
    }
  }, [search]);

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input name="search" className={css.input} />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
