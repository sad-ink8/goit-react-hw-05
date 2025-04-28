import { useState, useEffect, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import css from "../css/MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const backLinkHref = location.state ?? "/";

  async function getDetails() {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}`;
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmU5NzhkYmVmOWFjNGEwMTI2MzkyZWQ5Y2M2ZGIzZCIsIm5iZiI6MTc0NTY5NjE5NS42MDMwMDAyLCJzdWIiOiI2ODBkMzVjM2Y3NjlmMGFmNmE4MGYzNzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F-xt6rj4PA6tcuBgHrt96Q6pmZlq8GT5fpDgYmIYMD0";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);

      setMovie(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <Link to={backLinkHref} className={css.backLink}>
        Go Back
      </Link>
      <div className={css.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width="200"
          className={css.poster}
        />
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.overview}>{movie.overview}</p>
        <p className={css.genres}>
          <span className={css.span}>Genres:</span>
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>

      <nav className={css.navigation}>
        <NavLink to="cast" className={buildLinkClass}>
          Main cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
