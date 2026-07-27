"use client";

import TvShowHomeCard from "@/components/sections/TV/Cards/Poster";
import SectionTitle from "@/components/ui/other/SectionTitle";
import Carousel from "@/components/ui/wrapper/Carousel";
import { QueryList } from "@/types";
import { Link, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { kebabCase } from "string-ts";
import { TV } from "tmdb-ts/dist/types";

const TvShowHomeList: React.FC<QueryList<TV>> = ({ query, name, param }) => {
  const key = kebabCase(name) + "-list";
  const { data, isPending } = useQuery({
    queryFn: query,
    queryKey: [key],
  });

  return (
    <section id={key} className="min-h-[250px] md:min-h-[300px]">
      {isPending || !data ? (
        <div className="flex w-full flex-col gap-5">
          <div className="flex grow items-center justify-between">
            <Skeleton className="h-7 w-40 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-[250px] rounded-lg md:h-[300px]" />
        </div>
      ) : (
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
            {data?.results && Array.isArray(data.results) && data.results.length > 0 ? (
              data.results.map((tv) => (
                <div
                  key={tv.id}
                  className="embla__slide flex min-h-fit max-w-fit items-center px-1 py-2"
                >
                  <TvShowHomeCard tv={tv} />
                </div>
              ))
            ) : (
              <div className="text-foreground-500 py-8">No TV shows available</div>
            )}
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default TvShowHomeList;
