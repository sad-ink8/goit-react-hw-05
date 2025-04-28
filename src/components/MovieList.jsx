import { Link, useLocation } from "react-router-dom";
import css from "../components/MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.item}>
          <div className={css.movieWrapper}>
            <Link to={`/movies/${id}`} state={location}>
              <div className={css.imgWrapper}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  width="200"
                  className={css.img}
                />
              </div>

              <div className={css.title}>{title}</div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
