import { useEffect, useRef, useState } from "react";
import type { BooksQueryParams } from "../../models/book";

interface Props {
  onApply: (params: BooksQueryParams) => void;
}

export default function BookFilters({ onApply }: Props) {
  const [form, setForm] = useState<BooksQueryParams>({
    pageIndex: 1,
    pageSize: 6,
    search: "",
    category: "",
    language: "",
    isBorrowed: "",
    sort: "titleAsc",
  });

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filterMenuRef = useRef<HTMLDivElement | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const applyFilters = (nextForm: BooksQueryParams) => {
    setForm(nextForm);
    onApply(nextForm);
  };

  const updateAvailability = (value: string) => {
    const nextForm = {
      ...form,
      isBorrowed: value,
      pageIndex: 1,
    };

    applyFilters(nextForm);
    setShowFilterMenu(false);
  };

  const updateSort = (value: string) => {
    const nextForm = {
      ...form,
      sort: value,
      pageIndex: 1,
    };

    applyFilters(nextForm);
    setShowSortMenu(false);
  };

  const handleSearch = () => {
    onApply({
      ...form,
      pageIndex: 1,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (filterMenuRef.current && !filterMenuRef.current.contains(target)) {
        setShowFilterMenu(false);
      }

      if (sortMenuRef.current && !sortMenuRef.current.contains(target)) {
        setShowSortMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="book-toolbar">
      <div className="book-toolbar-row">
        <div className="book-search-wrapper">
          <input
            className="book-search-input"
            placeholder="Търси по заглавие"
            value={form.search || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                search: e.target.value,
                pageIndex: 1,
              }))
            }
          />
          <button
            className="icon-button"
            onClick={handleSearch}
            type="button"
            title="Търсене"
            aria-label="Търсене"
          >
            <i className="bi bi-search"></i>
          </button>
        </div>

        <div className="book-toolbar-actions">
          <div className="menu-wrapper" ref={filterMenuRef}>
            <button
              className="gold-icon-outline-btn with-text"
              type="button"
              title="Филтри"
              aria-label="Филтри"
              onClick={() => {
                setShowFilterMenu((prev) => !prev);
                setShowSortMenu(false);
              }}
            >
              <i className="bi bi-filter"></i>
              <span className="gold-btn-text">Наличност</span>
            </button>

            {showFilterMenu && (
              <div className="menu-panel">
                <button
                  type="button"
                  className={`menu-option-button ${(form.isBorrowed || "") === "" ? "active" : ""}`}
                  onClick={() => updateAvailability("")}
                >
                  Всички
                </button>

                <button
                  type="button"
                  className={`menu-option-button ${form.isBorrowed === "false" ? "active" : ""}`}
                  onClick={() => updateAvailability("false")}
                >
                  Само налични
                </button>

                <button
                  type="button"
                  className={`menu-option-button ${form.isBorrowed === "true" ? "active" : ""}`}
                  onClick={() => updateAvailability("true")}
                >
                  Само заети
                </button>
              </div>
            )}
          </div>

          <div className="menu-wrapper" ref={sortMenuRef}>
            <button
              className="gold-icon-outline-btn with-text"
              type="button"
              title="Сортиране"
              aria-label="Сортиране"
              onClick={() => {
                setShowSortMenu((prev) => !prev);
                setShowFilterMenu(false);
              }}
            >
              <i className="bi bi-arrow-down-up"></i>
              <span className="gold-btn-text">Сортиране</span>
            </button>

            {showSortMenu && (
              <div className="menu-panel">
                <button
                  type="button"
                  className={`menu-option-button ${form.sort === "titleAsc" ? "active" : ""}`}
                  onClick={() => updateSort("titleAsc")}
                >
                  Заглавие A-Z
                </button>

                <button
                  type="button"
                  className={`menu-option-button ${form.sort === "titleDesc" ? "active" : ""}`}
                  onClick={() => updateSort("titleDesc")}
                >
                  Заглавие Z-A
                </button>

                <button
                  type="button"
                  className={`menu-option-button ${form.sort === "yearAsc" ? "active" : ""}`}
                  onClick={() => updateSort("yearAsc")}
                >
                  Година ↑
                </button>

                <button
                  type="button"
                  className={`menu-option-button ${form.sort === "yearDesc" ? "active" : ""}`}
                  onClick={() => updateSort("yearDesc")}
                >
                  Година ↓
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}