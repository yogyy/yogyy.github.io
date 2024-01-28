import { cn } from "@/lib/utils";
import type { Endpoints } from "@octokit/types";
import colors from "@/lib/colors.json";
import { Fork, Grab, Repo as RepoIcon, Star } from "./icons";
interface RepoProps extends React.LiHTMLAttributes<HTMLLIElement> {
  repo: Endpoints["GET /users/{username}/repos"]["response"]["data"][number];
}
export default function Repo(props: RepoProps) {
  const { className, repo } = props;
  const color = Object.values(colors).find(
    (lang) => lang.url === `https://github.com/trending?l=${repo.language}`,
  );
  return (
    <li className={cn("h-full w-full", className)}>
      <div
        className={cn("box h-fit p-3 text-[#8b949e]")}
        aria-label="repostory">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 items-center [&>*]:fill-[#8b949e]">
            <div className="flex flex-1 items-center [&>svg]:mr-1.5">
              <RepoIcon />
              <a
                href={repo.url}
                className="mr-1 break-words text-[14px] font-semibold text-[#58a6ff] hover:underline">
                {repo.name}
              </a>
              <span className="inline rounded-[2em] border border-[#30363d] p-[.12em_.5em] text-[11px] leading-4">
                {repo.private ? "Private" : "Public"}
              </span>
            </div>
            <div className="hover:cursor-grab">
              <Grab />
            </div>
          </div>
          <p className="mt-2 inline-flex text-xs">{repo.description}</p>
          <p className="mt-2 inline-flex items-center text-xs">
            <span className="mr-3 inline-flex gap-1">
              <span
                className="repo-language-color"
                style={{ backgroundColor: `${color?.color}` }}></span>
              <span>{repo.language}</span>
            </span>
            {repo.stargazers_count! >= 1 && (
              <a
                href={repo.stargazers_url}
                target="_blank"
                className="flex items-center justify-end gap-1 [&>svg]:fill-[#8b949e]">
                <Star />
                {repo.stargazers_count}
              </a>
            )}
            {repo.forks_count! >= 1 && (
              <a
                href={repo.forks_url}
                target="_blank"
                className="ml-4 flex items-center justify-end gap-1 [&>svg]:fill-[#8b949e]">
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
