import { useEffect, useState } from "react";
import FilmTable from "./components/FilmTable";
import FilmEditor from "./components/FilmEditor";

function App() {
  // --------- FORM STATES ----------
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [extraFields, setExtraFields] = useState([]);

  // --------- FILM EDITOR STATE ----------
  const [filmsForEditor, setFilmsForEditor] = useState([]);
  const [filmsLoading, setFilmsLoading] = useState(false);
  const [filmsError, setFilmsError] = useState("");
  const [selectedFilmId, setSelectedFilmId] = useState(null);

  // fetch first 20 films for the editor select
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setFilmsLoading(true);
      setFilmsError("");
      try {
        const res = await fetch(
          "https://voiceco.de/sakila/films?limit=20&offset=0",
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // HAL: liste _embedded.films içinde
        const list = json?._embedded?.films ?? [];
        setFilmsForEditor(list);
      } catch (e) {
        if (e.name !== "AbortError") setFilmsError(e.message ?? "Unknown error");
      } finally {
        setFilmsLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  // --------- VALIDATION ----------
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  };

  // --------- FORM SUBMIT ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    console.log({ name, surname, email, message, extraFields });
    alert("Form submitted!");
  };

  // --------- EXTRA FIELDS ----------
  const handleAddField = (type) => {
    setExtraFields([...extraFields, { type, value: "" }]);
  };
  const handleExtraChange = (index, value) => {
    const updated = [...extraFields];
    updated[index].value = value;
    setExtraFields(updated);
  };

  // --------- FILM EDITOR SAVE ----------
  const handleSaveFilm = (film) => {
    console.log("Edited film payload:", film);
    alert("Film changes prepared (logged to console).");
  };

  const selectedFilm = filmsForEditor.find(
    (f) => String(f.film_id) === String(selectedFilmId)
  );

  return (
    <main className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Almira Form</h1>
      <div className="divider"></div>

      {/* --- FORM --- */}
      <form className="card bg-base-100 shadow-xl p-6" onSubmit={handleSubmit}>
        {/* Name */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Name</legend>
          <input
            type="text"
            placeholder="John"
            className={`input input-bordered w-full ${errors.name ? "input-error" : "input-primary"
              }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <span className="text-error text-sm">{errors.name}</span>
          )}
        </fieldset>

        {/* Surname */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Surname</legend>
          <input
            type="text"
            placeholder="Doe"
            className="input input-bordered input-primary w-full"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            placeholder="example@mail.com"
            className={`input input-bordered w-full ${errors.email ? "input-error" : "input-primary"
              }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-error text-sm">{errors.email}</span>
          )}
        </fieldset>

        {/* Message */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Message</legend>
          <textarea
            className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : "textarea-primary"
              }`}
            placeholder="Type something here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && (
            <span className="text-error text-sm">{errors.message}</span>
          )}
        </fieldset>

        {/* Extra Fields */}
        {extraFields.map((field, index) => (
          <fieldset key={index} className="fieldset mb-4">
            <legend className="fieldset-legend">Extra Field {index + 1}</legend>
            {field.type === "text" ? (
              <input
                type="text"
                placeholder={`Extra ${index + 1}`}
                className="input input-bordered input-accent w-full"
                value={field.value}
                onChange={(e) => handleExtraChange(index, e.target.value)}
              />
            ) : (
              <select
                className="select select-bordered w-full"
                value={field.value}
                onChange={(e) => handleExtraChange(index, e.target.value)}
              >
                <option value="">Select Yes/No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            )}
          </fieldset>
        ))}

        {/* Buttons to add fields */}
        <button
          type="button"
          className="btn btn-secondary w-full mb-2"
          onClick={() => handleAddField("text")}
        >
          + Add Text Field
        </button>
        <button
          type="button"
          className="btn btn-accent w-full mb-2"
          onClick={() => handleAddField("select")}
        >
          + Add Yes/No Field
        </button>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>

      {/* --- FILM TABLE --- */}
      <FilmTable />

      {/* --- FILM EDITOR --- */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-3">🎬 Film Editor</h2>
        <select
          className="select select-bordered w-full mb-4"
          value={selectedFilmId || ""}
          onChange={(e) => setSelectedFilmId(e.target.value)}
          disabled={filmsLoading}
        >
          <option value="">-- Select a film --</option>
          {filmsForEditor.map((f) => (
            <option key={f.film_id} value={f.film_id}>
              {f.film_id} — {f.title}
            </option>
          ))}
        </select>

        {filmsError && <p className="text-red-500">{filmsError}</p>}

        {selectedFilm && (
          <FilmEditor film={selectedFilm} onSave={handleSaveFilm} />
        )}
      </section>
    </main>
  );
}

export default App;