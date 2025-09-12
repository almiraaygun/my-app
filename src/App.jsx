import { Link, Routes, Route } from "react-router-dom";
import DynamicForm from "./pages/DynamicForm";
import SakilaFilms from "./pages/SakilaFilms";

export default function App() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <nav className="mb-6 flex gap-3">
        <Link className="btn btn-sm" to="/">Home</Link>
        <Link className="btn btn-sm btn-primary" to="/dynamic-form">Dynamic Form</Link>
        <Link className="btn btn-sm btn-secondary" to="/sakila-films">Sakila Films</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2 className="text-xl font-bold">Hoş geldin 👋</h2>} />
        <Route path="/dynamic-form" element={<DynamicForm />} />
        <Route path="/sakila-films" element={<SakilaFilms />} />
      </Routes>
    </div>
  );
}