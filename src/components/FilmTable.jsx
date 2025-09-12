import { useEffect, useState } from "react";

export default function FilmTable({ onEdit, refreshKey = 0 }) {
  const [films, setFilms] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`https://voiceco.de/sakila/films?limit=${limit}&offset=${offset}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list = json?._embedded?.films ?? [];
        if (!ignore) setFilms(list);
      } catch (e) {
        if (!ignore) setFilms([]);
        console.error(e);
      }
    })();
    return () => { ignore = true; };
  }, [offset, refreshKey]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this film?")) return;
    try {
      await fetch(`https://voiceco.de/sakila/films/${id}`, { method: "DELETE" });
      setFilms(films.filter(f => f.film_id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <section className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">🎬 Sakila Films</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th className="w-56">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films.map((f) => (
              <tr key={f.film_id}>
                <td>{f.film_id}</td>
                <td>{f.title}</td>
                <td>{f.description}</td>
                <td>
                  <div>
                    <button className="btn btn-sm btn-primary mr-2" onClick={() => onEdit?.(f)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(f.film_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join grid grid-cols-2 mt-4">
        <button className="btn join-item btn-outline" disabled={offset === 0}
          onClick={() => setOffset(p => Math.max(p - limit, 0))}>Previous page</button>
        <button className="btn join-item btn-outline"
          onClick={() => setOffset(p => p + limit)}>Next</button>



      </div>
    </section >
  );
}
