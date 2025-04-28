import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import css from "./App.module.css";

const Navigation = lazy(() => import("./Navigation"));
const HomePage = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("../components/MovieCast"));
const MovieReviews = lazy(() => import("../components/MovieReviews"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function App() {
  return (
    <div className={css.appWrapper}>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
