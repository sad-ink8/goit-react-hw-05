import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "../components/MovieReviews.module.css";

export default function MovieReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  async function getReviews() {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmU5NzhkYmVmOWFjNGEwMTI2MzkyZWQ5Y2M2ZGIzZCIsIm5iZiI6MTc0NTY5NjE5NS42MDMwMDAyLCJzdWIiOiI2ODBkMzVjM2Y3NjlmMGFmNmE4MGYzNzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F-xt6rj4PA6tcuBgHrt96Q6pmZlq8GT5fpDgYmIYMD0";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);
      setReviews(response.data.results);
    } catch (error) {}
  }

  useEffect(() => {
    getReviews();
  }, [id]);

  if (reviews.length === 0) return <p>We don`t have reviews for this movie</p>;

  return (
    <ul className={css.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={css.reviewItem}>
          <p className={css.reviewauthor}>{review.author}:</p>
          <p className={css.reviewContent}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
