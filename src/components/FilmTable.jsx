import { useEffect, useState } from "react";

function FilmTable() {
    const [films, setFilms] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 20;

    const fetchFilms = async () => {
        try {
            const res = await fetch(
                `https://voiceco.de/sakila/films?limit=${limit}&offset=${offset}`
            );
            const data = await res.json();
            setFilms(data);
        } catch (err) {
            console.error("API fetch error:", err);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, [offset]);

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
                        </tr>
                    </thead>
                    <tbody>
                        {films.map((film) => (
                            <tr key={film.film_id}>
                                <td>{film.film_id}</td>
                                <td>{film.title}</td>
                                <td>{film.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="join grid grid-cols-2 mt-4">
                <button
                    className="btn join-item btn-outline"
                    disabled={offset === 0}
                    onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
                >
                    Previous page
                </button>
                <button
                    className="btn join-item btn-outline"
                    onClick={() => setOffset((prev) => prev + limit)}
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default FilmTable;