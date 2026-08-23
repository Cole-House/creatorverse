import { useEffect, useState } from "react";
import { supabase } from "../client";

type EditCreatorProps = {
  id: string;
};

const EditCreator = ({ id }: EditCreatorProps) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [loading, setLoading] = useState(true);

  // Fetch the existing creator when the page loads
  useEffect(() => {
    async function getCreator() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        setLoading(false);
        return;
      }

      // Load existing creator values into the form state
      setName(data.name);
      setUrl(data.url);
      setDescription(data.description);
      setImageURL(data.imageURL || "");

      setLoading(false);
    }

    getCreator();
  }, [id]);

  // Update creator in Supabase
  async function updateCreator(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const { error } = await supabase
      .from("creators")
      .update({
        name,
        url,
        description,
        imageURL: imageURL || null,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating creator:", error);
      alert("There was a problem updating the creator.");
      return;
    }

    alert("Creator updated successfully!");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-lg text-slate-300">
          Loading creator...
        </p>
      </main>
    );
  }

  async function deleteCreator() {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error);
      alert("There was a problem deleting the creator.");
      return;
    }

    alert("Creator deleted successfully!");

    // Return to the home page
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Space background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#312e81_0%,_transparent_35%),radial-gradient(circle_at_bottom_right,_#581c87_0%,_transparent_30%),linear-gradient(to_bottom,_#020617,_#0f172a)]" />

      {/* Decorative glows */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-700 opacity-20 blur-sm" />

      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-cyan-500 opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-sm text-purple-300 mb-3">
            CreatorVerse
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Edit Creator
          </h1>

          <p className="mt-4 text-slate-300">
            Update this creator's information.
          </p>
        </header>

        <form
          onSubmit={updateCreator}
          className="space-y-6 rounded-3xl bg-slate-900/70 backdrop-blur-md border border-white/10 p-8 shadow-2xl"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-medium"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white border border-white/10 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* URL */}
          <div>
            <label
              htmlFor="url"
              className="block mb-2 font-medium"
            >
              URL
            </label>

            <input
              id="url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white border border-white/10 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              required
              rows={5}
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white border border-white/10 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageURL"
              className="block mb-2 font-medium"
            >
              Image URL
              <span className="ml-2 text-sm text-slate-400">
                Optional
              </span>
            </label>

            <input
              id="imageURL"
              type="url"
              value={imageURL}
              onChange={(event) =>
                setImageURL(event.target.value)
              }
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white border border-white/10 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Update button */}
          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition-transform duration-200 hover:scale-[1.02] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="
              w-full
              rounded-full
              border
              border-red-500/50
              px-6
              py-3
              font-semibold
              text-red-400
              transition-all
              duration-200
              hover:bg-red-500/10
              hover:border-red-400
              hover:text-red-300
            "
          >
            Delete Creator
          </button>
        </form>
        {showDeleteModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-6">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center shadow-2xl">
              
              <h2 className="text-2xl font-bold text-white mb-3">
                Delete Creator
              </h2>

              <p className="text-slate-300 mb-8">
                Are you sure you want to delete this creator?
              </p>

              <div className="flex items-center justify-center gap-6">
                
                {/* YES */}
                <button
                  type="button"
                  onClick={deleteCreator}
                  className="
                    rounded-full
                    bg-red-600
                    px-8
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:bg-red-500
                    hover:scale-105
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-400
                  "
                >
                  Yes, Delete
                </button>

                {/* NO */}
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="
                    text-slate-300
                    underline
                    underline-offset-4
                    transition-colors
                    hover:text-white
                  "
                >
                  No
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default EditCreator;