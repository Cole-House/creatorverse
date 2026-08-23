import { useEffect, useState } from "react";
import { supabase } from "../client";
import type { Creator } from "../types/Creator";
import { Link } from "react-router";

type ViewCreatorProps = {
  id: string;
};

const ViewCreator = ({ id }: ViewCreatorProps) => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

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

      setCreator(data);
      setLoading(false);
    }

    getCreator();
  }, [id]);

  if (loading) {
    return <p>Loading creator...</p>;
  }

  if (!creator) {
    return <p>Creator not found.</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Space background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#312e81_0%,_transparent_35%),radial-gradient(circle_at_bottom_right,_#581c87_0%,_transparent_30%),linear-gradient(to_bottom,_#020617,_#0f172a)]" />

      {/* Decorative planet glow */}
      <div className="absolute top-24 right-16 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-700 opacity-20 blur-sm" />

      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-cyan-500 opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center rounded-3xl bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-2xl p-8 md:p-12">
          {/* Creator Image */}
          <div className="flex justify-center">
            <img
              src={creator.imageURL}
              alt={creator.name}
              className="w-full max-w-md aspect-square object-cover rounded-3xl shadow-xl border border-white/10"
            />
          </div>

          {/* Creator Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-purple-300 mb-2">
                Featured Creator
              </p>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {creator.name}
              </h1>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed">
              {creator.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={creator.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition-transform duration-200 hover:scale-105 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Visit Creator
              </a>

              <Link
                to={`/creators/${creator.id}/edit`}
                aria-label={`Edit ${creator.name}`}
                title="Edit creator"
                className="
                  inline-flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  border
                  border-white/20
                  transition-all
                  duration-200
                  hover:scale-110
                  hover:bg-white/20
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-300
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewCreator;
