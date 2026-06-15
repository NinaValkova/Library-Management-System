export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5>Контакти</h5>
            <p className="mb-1">Библиотека</p>
            <p className="mb-1">София, България</p>
            <p className="mb-1">Email: library@example.com</p>
          </div>

          <div className="col-md-4">
            <h5>Полезни връзки</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-white text-decoration-none">Начало</a></li>
              <li><a href="#home" className="text-white text-decoration-none">За нас</a></li>
              <li><a href="#home" className="text-white text-decoration-none">Каталог</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Изготвил</h5>
            <p className="mb-1">Име: Нина Вълкова</p>
            <p className="mb-1">Телефон: +359 000 000 000</p>
          </div>
        </div>

        <hr className="my-4" />
        <p className="mb-0 text-center">
          © 2026 Библиотека. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}