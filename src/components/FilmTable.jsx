import { useEffect, useState } from "react";

export default function FilmTable() {
  const [films, setFilms] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    const fetchFilms = async () => {
      const res = await fetch(`https://voiceco.de/sakila/films?limit=${limit}&offset=${offset}`);
      const data = await res.json();
      setFilms(data._embedded?.films || []);
    };
    fetchFilms();
  }, [offset]);

  return (
    <section className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">🎬 Sakila Films</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr><th>Id</th><th>Title</th><th>Description</th></tr>
          </thead>
          <tbody>
            {films.map(f => (
              <tr key={f.film_id}>
                <td>{f.film_id}</td><td>{f.title}</td><td>{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join grid grid-cols-2 mt-4">
        <button className="btn join-item btn-outline" disabled={offset===0}
          onClick={() => setOffset(p => Math.max(p - limit, 0))}>Previous page</button>
        <button className="btn join-item btn-outline"
          onClick={() => setOffset(p => p + limit)}>Next</button>
      </div>
    </section>
  );
}