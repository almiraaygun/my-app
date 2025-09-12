// src/pages/SakilaFilms.jsx
import { useState } from "react";
import FilmTable from "../components/FilmTable";
import FilmEditor from "../components/FilmEditor";

function SakilaFilms() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  // page alerts
  const [notice, setNotice] = useState(null); // { type: 'success'|'error', text: string }

  const handleSaveFilm = async (draft) => {
    setNotice(null);
    try {
      const id = draft.film_id;
      const res = await fetch(`https://voiceco.de/sakila/films/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error(`PATCH failed: HTTP ${res.status}`);

      const saved = await res.json();
      setSelectedFilm(saved);
      setRefreshKey((k) => k + 1);
      setNotice({ type: "success", text: "Film başarıyla güncellendi." });
      // hide after 3s
      setTimeout(() => setNotice(null), 3000);
    } catch (err) {
      console.error(err);
      setNotice({ type: "error", text: `Kaydetme hatası: ${err.message}` });
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <span>🎬</span>
          <span>Sakila Films</span>
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Listeden bir filmi düzenlemek için <span className="font-medium">Edit</span>'e tıklayın. Sağdaki panelde başlık ve açıklamayı güncelleyebilirsiniz.
        </p>
      </header>

      {/* Alerts */}
      {notice && (
        <div className={`alert ${notice.type === "success" ? "alert-success" : "alert-error"} mb-4`}>
          <span>{notice.text}</span>
        </div>
      )}

      {/* Two-column layout: table left, editor right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Table card */}
        <section className="md:col-span-2">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-0">
              <FilmTable onEdit={(film) => setSelectedFilm(film)} refreshKey={refreshKey} />
            </div>
          </div>
        </section>

        {/* Sticky editor card */}
        <aside className="md:col-span-1 md:sticky md:top-6">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              {!selectedFilm ? (
                <div className="text-sm opacity-70">
                  Tablodan <b>Edit</b>'e tıklayın; seçtiğiniz film burada açılacak.
                </div>
              ) : (
                <>
                  <h2 className="card-title text-lg">Edit Film #{selectedFilm.film_id}</h2>
                  <FilmEditor film={selectedFilm} onSave={handleSaveFilm} />
                  <div className="mt-2 flex gap-2 justify-end">
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedFilm(null)}>
                      Kapat
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => setRefreshKey((k) => k + 1)}>
                      Yenile
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default SakilaFilms;