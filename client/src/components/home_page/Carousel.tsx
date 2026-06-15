import { Link } from "react-router-dom";
import "../../styles/home_page/Carousel.css";

export default function Carousel() {
  return (
    <section id="hero-section" className="container py-4">
      <div
        id="homeCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
        </div>

        <div className="carousel-inner rounded shadow overflow-hidden">
          <div className="carousel-item active">
            <div id="slide1" className="hero-slide d-flex flex-column justify-content-center align-items-center text-center text-white px-4">
              <div className="hero-overlay bg-dark bg-opacity-50 p-4 rounded">
                <h1 className="display-5 fw-bold">Добре дошли в библиотеката!</h1>
                <p className="lead mb-4">
                  Разгледайте каталога, заемайте книги и следете историята си.
                </p>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div id="slide2" className="hero-slide d-flex flex-column justify-content-center align-items-center text-center text-white px-4">
              <div className="hero-overlay bg-dark bg-opacity-50 p-4 rounded">
                <h2 className="display-6 fw-bold">Открий нови заглавия!</h2>
                <p className="lead mb-4">
                  Търсете книги по заглавие, автор и наличност.
                </p>
                <Link to="/books" className="btn btn-light btn-lg">
                  Виж каталога
                </Link>
              </div>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}