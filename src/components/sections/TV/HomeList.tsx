"use client";

import TvShowHomeCard from "@/components/sections/TV/Cards/Poster";
import SectionTitle from "@/components/ui/other/SectionTitle";
import Carousel from "@/components/ui/wrapper/Carousel";
import { QueryList } from "@/types";
import { Link } from "@heroui/react";
import { TV } from "tmdb-ts/dist/types";

// Demo data - bypassing React Query entirely to test if rendering works
const demoShows: TV[] = [
  { id: 1399, name: "Breaking Bad", poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" } as any,
  { id: 1668, name: "Friends", poster_path: "/f496cm9ePpsUWcEBC6FOq28FF0x.jpg" } as any,
  { id: 1402, name: "The Office", poster_path: "/askg3SMvhqEl4OL52YuvjO3GXoH.jpg" } as any,
  { id: 1404, name: "Game of Thrones", poster_path: "/u3bVoque7qBmNg10qoFY05gIO1.jpg" } as any,
  { id: 1419, name: "The Crown", poster_path: "/rLa4vCJM9mM1Ej5BqRHYggrxZJ2.jpg" } as any,
  { id: 2488, name: "Stranger Things", poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" } as any,
];

const TvShowHomeList: React.FC<QueryList<TV>> = ({ name, param }) => {
  return (
    <section className="min-h-[250px] md:min-h-[300px]">
      <div className="z-3 flex flex-col gap-2">
        <div className="flex grow items-center justify-between">
          <SectionTitle color="warning">{name}</SectionTitle>
          <Link
            size="sm"
            href={`/discover?type=${param}&content=tv`}
            isBlock
            color="foreground"
            className="rounded-full"
          >
            See All &gt;
          </Link>
        </div>
        <Carousel>
          {demoShows.map((tv) => (
            <div
              key={tv.id}
              className="embla__slide flex min-h-fit max-w-fit items-center px-1 py-2"
            >
              <TvShowHomeCard tv={tv} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TvShowHomeList;
