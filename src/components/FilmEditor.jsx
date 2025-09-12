import { useState } from "react";

export default function FilmEditor({ film, onSave }) {
  const [title, setTitle] = useState(film?.title || "");
  const [description, setDescription] = useState(film?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const draft = {
      film_id: film.film_id,
      title: title.trim(),
      description: description.trim(),
    };

    onSave(draft);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow p-4 space-y-4"
    >
      <h3 className="text-lg font-bold">Edit Film #{film.film_id}</h3>
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Save
      </button>
    </form>
  );
}