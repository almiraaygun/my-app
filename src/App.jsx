function App() {
  return (
    <main className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Almira Form</h1>
      <div className="divider"></div>

      <form className="card bg-base-100 shadow-xl p-6">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="John" className="input input-bordered w-full" />
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input type="text" placeholder="John" className="input input-bordered w-full" />
        </fieldset>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Surname</span>
          </label>
          <input type="text" placeholder="Doe" className="input input-bordered w-full" />
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Surname</legend>
          <input type="text" placeholder="Doe" className="input input-bordered w-full" />
        </fieldset>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="example@mail.com" className="input input-bordered input-primary w-full" />
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" placeholder="example@mail.com" className="input input-bordered input-primary w-full" />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Message</legend>
          <textarea className="textarea textarea-bordered w-full" placeholder="Type something here..."></textarea>
        </fieldset>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea className="textarea textarea-bordered w-full" placeholder="Type something here..."></textarea>
        </div>


        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </main>
  )
}

export default App