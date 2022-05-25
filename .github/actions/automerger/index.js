const core = require("@actions/core");
const github = require("@actions/github");

const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN") || process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(GITHUB_TOKEN);

const assertTrue = (cond, message) => {
  if (!cond) throw new Error(message);
};

(async () => {
  try {
    const baseParams = {
      owner: "coderetreat",
      repo: "coderetreat.org",
      pull_number:
        github.context.payload.number ||
        github.context.payload.inputs?.pull_request ||
        process.env.GITHUB_PR_NUMBER,
    };
    const pullRequest = await octokit.rest.pulls.get(baseParams);
    const files = await octokit.rest.pulls.listFiles(baseParams);
    const statusChecks = await octokit.rest.checks.listForRef({
      ...baseParams,
      ref: pullRequest.data.head.sha,
    });
    console.log(statusChecks.data.check_runs);

    const onlyOneFileHasBeenChanged = ({ files }) =>
      assertTrue(
        files.data.length == 1,
        "Only one file should be changed at once"
      );

    const noDeletionsTakePlace = ({ files }) =>
      assertTrue(
        files.data.every((file) => file.deletions === 0),
        "No deletions"
      );

    const theFileIsInDataEvents = ({ files }) =>
      assertTrue(
        files.data.every((file) => file.filename.startsWith("_data/events/")),
        "The file must be in _data/events/"
      );

    const theFileEndsInJson = ({ files }) =>
      assertTrue(
        files.data.every((file) => file.filename.endsWith(".json")),
        "The file must end with .json"
      );

    const theFileMatchesSomeRegexThatsProbablyWrong = ({ files }) =>
      assertTrue(
        files.data.every((file) =>
          /^_data\/events\/[^\/]+\.json$/.test(file.filename)
        ),
        "The file must match our regex"
      );

    const theFileNeedsToBeValidJson = async ({ files }) => {
      for (let file of files.data) {
        const contentRequest = await octokit.rest.repos.getContent({
          ...baseParams,
          path: file.filename,
          ref: pullRequest.data.head.sha,
        });
        const content = Buffer.from(
          contentRequest.data.content,
          "base64"
        ).toString();
        JSON.parse(content);
      }
    };

    const allStatusChecksAreSuccessful = ({ statusChecks }) =>
      assertTrue(
        statusChecks.data.check_runs.every(
          (run) => run.status === "completed" && run.conclusion === "success"
        ),
        "All status checks need to have passed"
      );

    const ourTestStatusCheckHasRunToo = ({ statusChecks }) =>
      assertTrue(
        statusChecks.data.check_runs.some((run) => run.name === "test")
      );

    const allAssertions = [
      onlyOneFileHasBeenChanged,
      noDeletionsTakePlace,
      theFileIsInDataEvents,
      theFileEndsInJson,
      theFileMatchesSomeRegexThatsProbablyWrong,
      theFileNeedsToBeValidJson,
      allStatusChecksAreSuccessful,
      ourTestStatusCheckHasRunToo,
    ];

    for (let assertion of allAssertions) {
      await assertion({
        pullRequest,
        files,
        statusChecks,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
