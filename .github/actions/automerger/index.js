const core = require("@actions/core");
const github = require("@actions/github");

const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
const octokit = github.getOctokit(GITHUB_TOKEN);

try {
  const params = {
    owner: "coderetreat",
    repo: "coderetreat.org",
    pull_number:
      github.context.payload.number ||
      github.context.payload.inputs?.pull_request,
  };
  console.log({ params });
  
  console.log(await octokit.rest.pulls.get(params));
} catch (error) {
  core.setFailed(error.message);
}
