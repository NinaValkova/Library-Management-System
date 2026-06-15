import "../../styles/home_page/About.css";

export default function About() {
  return (
    <section id="about-section" className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-md-6">
          <div id="about-image"></div>
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">За библиотеката</h2>
          <p className="text-muted">
            Библиотеката предлага достъп до книги, търсене,
            и проследяване на историята на всеки потребител.
          </p>
          <p className="text-muted">
            Можете да откривате нови заглавия, да разглеждате подробности за книгите
            и да управлявате заеманията си.
          </p>
        </div>
      </div>
    </section>
  );
}