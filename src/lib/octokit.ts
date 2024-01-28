import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.gh_token,
});

// remove config for testing

export default octokit;
