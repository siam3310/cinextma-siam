"use client";

import MoviePosterCard from "@/components/sections/Movie/Cards/Poster";
import SectionTitle from "@/components/ui/other/SectionTitle";
import Carousel from "@/components/ui/wrapper/Carousel";
import { QueryList } from "@/types";
import { Link } from "@heroui/react";
import { Movie } from "tmdb-ts/dist/types";

// Demo data - bypassing React Query entirely to test if rendering works
const demoMovies: Movie[] = [
  { id: 550, title: "Fight Club", poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" } as any,
  { id: 278, title: "The Shawshank Redemption", poster_path: "/q6725aR8Zs4IwWvn0ja0O6f3KsP.jpg" } as any,
  { id: 238, title: "The Godfather", poster_path: "/3bhkrj58Vtu7enYsRolD1fmnbvV.jpg" } as any,
  { id: 240, title: "The Godfather Part II", poster_path: "/hWXwMwx0fHXNQoDu8BdXQWAFu1.jpg" } as any,
  { id: 424, title: "Schindler's List", poster_path: "/sF1U4ZippQeaA8fp1csplash.jpg" } as any,
  { id: 129, title: "Spirited Away", poster_path: "/39wmItQLFBRM3Ojedoch9sBXUScT.jpg" } as any,
];

const MovieHomeList: React.FC<QueryList<Movie>> = ({ name, param }) => {
  return (
    <section className="min-h-[250px] md:min-h-[300px]">
      <div className="z-3 flex flex-col gap-2">
        <div className="flex grow items-center justify-between">
          <SectionTitle>{name}</SectionTitle>
          <Link
            size="sm"
            href={`/discover?type=${param}`}
            isBlock
            color="foreground"
            className="rounded-full"
          >
            See All &gt;
          </Link>
        </div>
        <Carousel>
          {demoMovies.map((movie) => (
            <div
              key={movie.id}
              className="embla__slide flex min-h-fit max-w-fit items-center px-1 py-2"
            >
              <MoviePosterCard movie={movie} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default MovieHomeList;
