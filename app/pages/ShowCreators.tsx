import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";
import type { Creator } from "../types/Creator";
import { Link } from "react-router";

const ShowCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    async function getCreators() {
      const { data, error } = await supabase.from("creators").select("*");

      console.log("Supabase data:", data);
      console.log("Supabase error:", error);

      if (error) {
        console.error(error);
        return;
      }

      setCreators(data || []);
    }

    getCreators();
  }, []);

  function displayCreators(data: Creator[]) {
    if (data.length === 0) {
      return (
        <p className="col-span-3 text-center text-lg text-slate-300">
          No creators found in the CreatorVerse yet.
        </p>
      );
    }

    return data.map((creator) => (
      <CreatorCard
        key={creator.id}
        id={creator.id}
        name={creator.name}
        url={creator.url}
        description={creator.description}
        imageURL={creator.imageURL}
      />
    ));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Planet / space background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#312e81_0%,_transparent_35%),radial-gradient(circle_at_bottom_right,_#581c87_0%,_transparent_30%),linear-gradient(to_bottom,_#020617,_#0f172a)]" />

      {/* Decorative planet */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-700 opacity-30 blur-sm" />

      {/* Decorative glow */}
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-cyan-500 opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* Page Title */}
        <header className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-purple-300 text-sm mb-4">
            Explore the universe of creators
          </p>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            Creator
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400">
              Verse
            </span>
          </h1>

          <p className="mt-6 text-slate-300 max-w-2xl mx-auto">
            Discover creators, educators, artists, and builders from across the
            digital universe.
          </p>
        </header>

        {/* Creator Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCreators(creators)}
        </section>
        <div className="mt-12 flex justify-center">
          <Link
            to="/new"
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-white
              px-8
              py-3
              text-base
              font-semibold
              text-slate-950
              shadow-lg
              shadow-purple-950/30
              transition-transform
              duration-200
              ease-out
              hover:scale-105
              hover:bg-slate-100
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-300
              focus:ring-offset-2
              focus:ring-offset-slate-950
            "
          >
            Add Creator +
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ShowCreators;
