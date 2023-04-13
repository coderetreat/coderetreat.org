const core = require("@actions/core");
const github = require("@actions/github");

const assertTrue = (cond, message) => {
  if (!cond) throw new Error(message);
};

module.exports = async () => {
  const GITHUB_TOKEN =
    core.getInput("GITHUB_TOKEN") || process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(GITHUB_TOKEN);

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

    const allNetlifyStatusChecksAreSuccessfulOrNeutral = ({ statusChecks }) => {
      const isNotNetlify = (run) => run.app.slug !== "netlify";

      assertTrue(
        statusChecks.data.check_runs.every(
          (run) =>
            isNotNetlify(run) ||
            (run.status === "completed" &&
              (run.conclusion === "success" || run.conclusion === "neutral"))
        ),
        "All status checks need to have been completed and be either success or neutral"
      );
    };

    const ourTestStatusCheckWasSuccessful = ({ statusChecks }) => {
      assertTrue(
        statusChecks.data.check_runs.some(
          (run) =>
            run.name === "run_unit_and_data_validation_tests" &&
            run.status === "completed" &&
            run.conclusion === "success"
        )
      );
    };

    const thePullRequestAuthorHasPreviouslyMergedPullRequests = async ({
      pullRequest,
    }) => {
      const userLogin = pullRequest.data.user.login;
      assertTrue(userLogin.length > 0);

      const allPullRequestsByUser =
        await octokit.rest.search.issuesAndPullRequests({
          state: "closed",
          q: `repo:coderetreat/coderetreat.org type:pr is:merged author:"${userLogin}"`,
        });
      assertTrue(
        allPullRequestsByUser.data.items.length > 0,
        "The user needs to have previous contributions"
      );
    };

    const allAssertions = [
      onlyOneFileHasBeenChanged,
      noDeletionsTakePlace,
      theFileIsInDataEvents,
      theFileEndsInJson,
      theFileMatchesSomeRegexThatsProbablyWrong,
      theFileNeedsToBeValidJson,
      allNetlifyStatusChecksAreSuccessfulOrNeutral,
      ourTestStatusCheckWasSuccessful,
      thePullRequestAuthorHasPreviouslyMergedPullRequests,
    ];

    for (let assertion of allAssertions) {
      await assertion({
        pullRequest,
        files,
        statusChecks,
      });
    }

    const commit = await octokit.rest.repos.getCommit({
      owner: baseParams.owner,
      repo: baseParams.repo,
      ref: pullRequest.data.head.sha,
    });
    console.log(JSON.stringify(commit, undefined, 2));

    // Why GraphQL?  Octokit.rest call does not appear to work correctly!
    await octokit.graphql(
      `
      mutation DoTheAutomaticMerge($mergeParams: MergePullRequestInput!) {
        mergePullRequest(input: $mergeParams) { clientMutationId }
      }`,
      {
        mergeParams: {
          pullRequestId: pullRequest.data.node_id,
          expectedHeadOid: pullRequest.data.head.sha,
        },
      }
    );
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
};
