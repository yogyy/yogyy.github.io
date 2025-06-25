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
      <ol className="flex flex-wrap">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <li
                key={i}
                className="mb-4 w-full px-0 sm:w-1/2 sm:min-w-[272px] sm:px-2">
                <Skeleton className="box h-[96.39px] w-full" />
              </li>
            ))
          : data?.map((repo) => <Repo key={repo.id} repo={repo} />)}
      </ol>
    </div>
  );
}

function Repo({ repo }: { repo: RepoType[number] }) {
  const color = Object.values(colors).find(
    (lang) => lang.url === `https://github.com/trending?l=${repo.language}`,
  );

  return (
    <li
      className="mb-4 h-full w-full shrink-0 px-0 sm:w-1/2 sm:px-2"
      aria-label="repostory"
      onClick={() => console.log(repo)}>
      <div className="box flex-1 overflow-hidden p-3">
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center [&>*]:fill-[#8b949e]">
            <div className="flex items-center [&>svg]:mr-1.5">
              <RepoIcon />
              <a
                href={repo.html_url}
                className="mr-1 break-words text-sm font-medium text-link hover:underline">
                {repo.name}
              </a>
              <span className="inline rounded-[2em] border border-[#30363d] p-[.11em_.5em] text-[11px] font-semibold capitalize leading-4">
                {repo.visibility}
              </span>
            </div>
          </div>
          <div className="mt-2 flex-1">
            <p className="inline-flex text-[13px]">{repo.description}</p>
          </div>
          <p className="mt-2 inline-flex items-center text-xs leading-4">
            <span className="mr-3 inline-block">
              <span
                className="repo-language-color"
                style={{ backgroundColor: `${color?.color}` }}></span>
              <span> {repo.language}</span>
            </span>
            {repo.stargazers_count! >= 1 && (
              <a
                href={`${repo.html_url}/stargazers`}
                target="_blank"
                className="flex items-center justify-end gap-1">
                <Star className="fill-[#8b949e]" />
                {repo.stargazers_count}
              </a>
            )}
            {repo.forks_count! >= 1 && (
              <a
                href={`${repo.html_url}/forks`}
                target="_blank"
                className="ml-4 flex items-center justify-center gap-1">
                <Fork className="fill-[#8b949e]" />
                {repo.forks_count}
              </a>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
