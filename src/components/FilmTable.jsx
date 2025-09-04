import { useEffect, useState } from "react";

export default function FilmTable() {
  const [films, setFilms] = useState([]);     // hep dizi tutacağız
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const limit = 20;

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://voiceco.de/sakila/films?limit=${limit}&offset=${offset}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // Teşhis için bakmak istersen: console.log(json);

        // JSON farklı şekillerde gelebilir; daima DİZİYE indir:
        const list =
          Array.isArray(json) ? json :
          Array.isArray(json?.data) ? json.data :
          Array.isArray(json?.rows) ? json.rows :
          Array.isArray(json?.items) ? json.items :
          [];

        setFilms(list);          // <-- artık garanti dizi
      } catch (e) {
        if (e.name !== "AbortError") setError(String(e));
        setFilms([]);            // güvenli boş dizi
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [offset]);

  // Render emniyeti
  const rows = Array.isArray(films) ? films : [];

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">🎬 Sakila Films</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={3}>
                  <span className="loading loading-spinner loading-sm mr-2" />
                  Loading…
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={3} className="text-error">Error: {error}</td>
              </tr>
            )}

            {!loading && !error && rows.length === 0 && (
              <tr>
                <td colSpan={3}>No films found.</td>
              </tr>
            )}

            {!loading && !error && rows.map((film) => (
              <tr key={film.film_id ?? film.id}>
                <td>{film.film_id ?? film.id}</td>
                <td className="font-medium">{film.title}</td>
                <td className="max-w-[48rem] truncate">{film.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="join grid grid-cols-2 mt-4">
        <button
          className="btn join-item btn-outline"
          disabled={offset === 0 || loading}
          onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
        >
          Previous
        </button>
        <button
          className="btn join-item btn-outline"
          disabled={loading || rows.length < limit /* son sayfa olasılığı */}
          onClick={() => setOffset((prev) => prev + limit)}
        >
          Next
        </button>
      </div>
    </section>
  );
}