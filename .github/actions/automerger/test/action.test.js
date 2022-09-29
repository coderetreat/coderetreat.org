const core = require("@actions/core");
const github = require("@actions/github");
const verifier = require("../verifier");

jest.mock("@actions/core");
jest.mock("@actions/github");

describe("GitHub action automerger", () => {
  test("Happy Path", async () => {
    const octokitMock = setupOctokitMock();

    await whenPullRequestActionTriggered();

    expect(core.setFailed).not.toHaveBeenCalled();
    expect(octokitMock.graphql).toHaveBeenCalledWith(
      expect.stringContaining("mergePullRequest"),
      expect.objectContaining({
        mergeParams: {
          pullRequestId: default_rest_pulls_get.data.node_id,
          commitHeadOid: default_rest_commit_get.data.node_id,
        },
      })
    );
  });
  /*
  onlyOneFileHasBeenChanged,
    noDeletionsTakePlace,
    theFileIsInDataEvents,
    theFileEndsInJson,
    theFileMatchesSomeRegexThatsProbablyWrong,
    theFileNeedsToBeValidJson,
    allNetlifyStatusChecksAreSuccessfulOrNeutral,
    ourTestStatusCheckWasSuccessful,
    thePullRequestAuthorHasPreviouslyMergedPullRequests,
*/

  test("NOPE: onlyOneFileHasBeenChanged", async () => {
    const octokitMock = setupOctokitMock({
      rest_pulls_listFiles: {
        ...default_rest_pulls_listFiles,
        data: [
          ...default_rest_pulls_listFiles.data,
          ...default_rest_pulls_listFiles.data,
        ],
      },
    });
    await whenPullRequestActionTriggered();
    expectActionFailedDidNotMergeWithMessage(
      "Only one file should be changed at once",
      octokitMock
    );
  });

  test("NOPE: noDeletionsTakePlace", async () => {
    const octokitMock = setupOctokitMock({
      rest_pulls_listFiles: {
        ...default_rest_pulls_listFiles,
        data: [
          {
            ...default_rest_pulls_listFiles.data[0],
            deletions: 1,
          },
        ],
      },
    });
    await whenPullRequestActionTriggered();
    expectActionFailedDidNotMergeWithMessage("No deletions", octokitMock);
  });

  // This suppresses the error message to console.
  // Disable this code if necessary for debugging.
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // Make test calls independent:
  // Otherwise, error calls accumulate, preventing correct matching of error message
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const default_rest_pulls_get = require("./fake_pull_request.json");
  const default_rest_search_issuesAndPullRequests = require("./fake_list_pull_requests_by_author.json");
  const default_rest_checks_listForRef = require("./fake_commit_check_runs.json");
  const default_rest_pulls_listFiles = require("./fake_pull_request_files.json");
  const default_rest_repos_getContent = require("./fake_repos_getcontent.json");
  const default_rest_commit_get = require("./fake_commit.json");

  function setupOctokitMock({
    rest_pulls_get = default_rest_pulls_get,
    rest_pulls_listFiles = default_rest_pulls_listFiles,
    rest_repos_getContent = default_rest_repos_getContent,
    rest_checks_listForRef = default_rest_checks_listForRef,
    rest_search_issuesAndPullRequests = default_rest_search_issuesAndPullRequests,
    rest_commit_get = default_rest_commit_get,
  } = {}) {
    const octokitMock = {
      graphql: jest.fn(),
      rest: {
        repos: {
          getContent: jest.fn().mockResolvedValue(rest_repos_getContent),
          getCommit: jest.fn().mockResolvedValue(rest_commit_get),
        },
        pulls: {
          get: jest.fn().mockResolvedValue(rest_pulls_get),
          listFiles: jest.fn().mockResolvedValue(rest_pulls_listFiles),
          merge: jest.fn().mockResolvedValue(undefined),
        },
        checks: {
          listForRef: jest.fn().mockResolvedValue(rest_checks_listForRef),
        },
        search: {
          issuesAndPullRequests: jest
            .fn()
            .mockResolvedValue(rest_search_issuesAndPullRequests),
        },
      },
    };
    github.getOctokit.mockReturnValue(octokitMock);
    return octokitMock;
  }

  async function whenPullRequestActionTriggered() {
    github.context = {
      payload: {
        number: default_rest_pulls_get.data.number,
      },
    };

    await verifier();
  }

  function expectActionFailedDidNotMergeWithMessage(errorMessage, octokitMock) {
    expect(octokitMock.graphql).not.toHaveBeenCalled();
    expect(core.setFailed).toHaveBeenNthCalledWith(1, errorMessage);
  }
});
