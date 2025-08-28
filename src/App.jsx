import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [extraFields, setExtraFields] = useState([]); // 👈 ekstra field'lar için array

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

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

  const handleAddField = (type) => {
    let o={type:type,value:""} // yeni field objesi
    setExtraFields([...extraFields, o]); // yeni boş field ekle
  };

  let obj = {type:"select"}

  const handleExtraChange = (index, value) => {
    const updatedFields = [...extraFields];
    updatedFields[index].value = value;
    setExtraFields(updatedFields);
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Almira Form</h1>
      <div className="divider"></div>

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
          ></textarea>
          {errors.message && (
            <span className="text-error text-sm">{errors.message}</span>
          )}
        </fieldset>
        {/* Extra Fields */}
        {extraFields.map((field, index) => (
          <fieldset key={index} className="fieldset mb-4">
            <legend className="fieldset-legend">Extra Field {index + 1}</legend>
            <input
              type="text"
              placeholder={`Extra ${index + 1}`}
              className="input input-bordered input-accent w-full"
              value={field.value}
              onChange={(e) => handleExtraChange(index, e.target.value)}
            />
            <span>{ JSON.stringify(field) }</span>
          </fieldset>
        ))}
{/* 
        {extraFields.map((field, index) => (
          <fieldset key={index}>
            <legend>Extra Field {index + 1}</legend>

            {field.type === "text" ? (
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleExtraChange(index, e.target.value)}
              />
            ) : (
              <select
                value={field.value}
                onChange={(e) => handleExtraChange(index, e.target.value)}
              >
                <option value="">Select Yes/No</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            )}
          </fieldset>
        ))} */}

        {/* Add Field Button */}
        <button
          type="button"
          className="btn btn-secondary w-full mb-2"
          onClick={handleAddField}
        >
          + Add Field
        </button>

        {/* Add Select Button */}

        <button onClick={() => handleAddField("text")}className="btn btn-secondary w-full mb-2">+ Add Text Field </button>
        <button onClick={() => handleAddField("select")}className="btn btn-secondary w-full mb-2">+ Add Select Field </button>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;