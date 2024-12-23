import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import type { Endpoints } from "@octokit/types";
import colors from "@/constants/colors.json";
import { Fork, Repo as RepoIcon, Star } from "./icons/repo-icons";

type RepoType = Endpoints["GET /users/{username}/repos"]["response"]["data"];
export function Repos() {
  const { data, isLoading } = useSWR<RepoType>(
    "https://api.github.com/users/yogyy/repos?per_page=6&sort=pushed",
    fetcher,
  );

  return (
    <div className="my-4">
      <h1 className="my-2 text-base">latest code i've push to github.</h1>
      <ul className="grid w-full grid-cols-1 gap-y-4 sm:grid-cols-2">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <li key={i} className="px-0 sm:px-2">
                <Skeleton className="box h-[96.39px] w-full" />
              </li>
            ))
          : data?.map((repo) => <Repo key={repo.id} repo={repo} />)}
      </ul>
    </div>
  );
}

function Repo({ repo }: { repo: RepoType[number] }) {
  const color = Object.values(colors).find(
    (lang) => lang.url === `https://github.com/trending?l=${repo.language}`,
  );

  return (
    <li className="w-full px-0 sm:px-2" aria-label="repostory">
      <div className="box flex-1 overflow-hidden p-3">
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center [&>*]:fill-[#8b949e]">
            <div className="flex items-center [&>svg]:mr-1.5">
              <RepoIcon />
              <a
                href={repo.html_url}
                className="text-link mr-1 break-words font-[GeistMedium] text-[14px] hover:underline">
                {repo.name}
              </a>
              <span className="inline rounded-[2em] border border-[#30363d] p-[.11em_.5em] text-[11px] leading-4">
                {repo.private ? "Private" : "Public"}
              </span>
            </div>
          </div>
          <p className="mb-auto mt-2 inline-flex text-[13px]">
            {repo.description}
          </p>
          <p className="mt-2 inline-flex items-center text-xs leading-4">
            <span className="mr-3 inline-flex gap-1">
              <span
                className="repo-language-color"
                style={{ backgroundColor: `${color?.color}` }}></span>
              <span>{repo.language}</span>
            </span>
            {repo.stargazers_count! >= 1 && (
              <a
                href={`${repo.html_url}/stargazers`}
                target="_blank"
                className="flex items-center justify-end gap-1 [&>svg]:fill-[#8b949e]">
                <Star />
                {repo.stargazers_count}
              </a>
            )}
            {repo.forks_count! >= 1 && (
              <a
                href={`${repo.html_url}/forks`}
                target="_blank"
                className="ml-4 flex items-center justify-center gap-1 [&>svg]:fill-[#8b949e]">
                <Fork />
                {repo.forks_count}
              </a>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
