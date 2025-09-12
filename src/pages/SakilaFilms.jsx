// src/pages/SakilaFilms.jsx
import { useState } from "react";
import FilmTable from "../components/FilmTable";
import FilmEditor from "../components/FilmEditor";

function SakilaFilms() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaveFilm = async (draft) => {
    try {
      const id = draft.film_id;
      const res = await fetch(`https://voiceco.de/sakila/films/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error(`PATCH failed: HTTP ${res.status}`);
      const saved = await res.json();
      setSelectedFilm(saved);
      setRefreshKey((k) => k + 1);
      alert("Film güncellendi.");
    } catch (err) {
      console.error(err);
      alert(`Kaydetme hatası: ${err.message}`);
    }
  };

  return (
    <main className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">🎬 Sakila Films</h1>

      <FilmTable onEdit={(film) => setSelectedFilm(film)} refreshKey={refreshKey} />

      {selectedFilm && (
        <section className="mt-10">
          <FilmEditor film={selectedFilm} onSave={handleSaveFilm} />
        </section>
      )}
    </main>
  );
}

export default SakilaFilms;