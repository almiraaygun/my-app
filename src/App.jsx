function App() {
  return (
    <main style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h1> Almira Form </h1>

      <form>
        <div style={{ marginBottom: "1rem" }}>
          <label>
             Name: <br />
            <input type="text" placeholder="John " />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
             Surname: <br />
            <input type="text" placeholder=" Doe" />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email: <br />
            <input type="email" placeholder="example@mail.com" />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Message: <br />
            <textarea placeholder="Type something here..."></textarea>
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default App