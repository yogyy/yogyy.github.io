import { Repo } from "./repo-react";
import type { Endpoints } from "@octokit/types";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type Repos = Endpoints["GET /users/{username}/repos"]["response"]["data"];
export function Repos() {
  const { data, isLoading } = useSWR<Repos>(
    "https://api.github.com/users/yogyy/repos?per_page=6&sort=pushed",
    fetcher,
  );

  return (
    <div className="my-8">
      <h1 className="text-base">latest code i've push to github.</h1>
      <ul className="gallery relative mt-2 columns-1 gap-0 space-y-3 sm:columns-2">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <li key={i} className="px-0 sm:px-2">
                <Skeleton className="box h-[96.39px] w-full" />
              </li>
            ))
          : data?.map((repo) => (
              <Repo key={repo.id} repo={repo} className="px-0 sm:px-2" />
            ))}
      </ul>
    </div>
  );
}