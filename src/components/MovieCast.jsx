import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "../components/MovieCast.module.css";

export default function MovieCast() {
  const { id } = useParams();
  const [cast, setCast] = useState([]);

  async function getCast() {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmU5NzhkYmVmOWFjNGEwMTI2MzkyZWQ5Y2M2ZGIzZCIsIm5iZiI6MTc0NTY5NjE5NS42MDMwMDAyLCJzdWIiOiI2ODBkMzVjM2Y3NjlmMGFmNmE4MGYzNzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F-xt6rj4PA6tcuBgHrt96Q6pmZlq8GT5fpDgYmIYMD0";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);
      setCast(response.data.cast);
    } catch (error) {}
  }

  useEffect(() => {
    getCast();
  }, [id]);

  const mainCast = cast.slice(0, 5);

  return (
    <ul className={css.castList}>
      {mainCast.map((actor) => (
        <li key={actor.id} className={css.actorItem}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              width="140"
            />
            <div className={css.actorDetails}>
              <p className={css.actorAccent} style={{ fontWeight: "bold" }}>
                {actor.name}
              </p>
              <p>
                <span className={css.actorAccent}>Character:</span>
                {actor.character}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
