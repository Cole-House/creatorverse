import { useState } from "react";
import { supabase } from "../client";

const AddCreator = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  async function addCreator(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { error } = await supabase.from("creators").insert([
      {
        name,
        url,
        description,
        imageURL: imageURL || null,
      },
    ]);

    if (error) {
      console.error("Error adding creator:", error);
      alert("There was a problem adding the creator.");
      return;
    }

    alert("Creator added successfully!");

    // Clear the form after successful insert
    setName("");
    setUrl("");
    setDescription("");
    setImageURL("");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-2 text-center text-4xl font-bold">Add a Creator</h1>

        <p className="mb-10 text-center text-slate-300">
          Add a new creator to the CreatorVerse.
        </p>

        <form
          onSubmit={addCreator}
          className="space-y-6 rounded-3xl bg-slate-900/80 p-8 shadow-xl"
        >
          <div>
            <label htmlFor="name" className="mb-2 block font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label htmlFor="url" className="mb-2 block font-medium">
              URL
            </label>

            <input
              id="url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={5}
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label htmlFor="imageURL" className="mb-2 block font-medium">
              Image URL
              <span className="ml-2 text-sm text-slate-400">Optional</span>
            </label>

            <input
              id="imageURL"
              type="url"
              value={imageURL}
              onChange={(event) => setImageURL(event.target.value)}
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition-transform duration-200 hover:scale-[1.02] hover:bg-slate-100"
          >
            Add Creator +
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddCreator;
