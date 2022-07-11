const core = require("@actions/core");
const github = require("@actions/github");
const verifier = require("../verifier");
const pull_request_json = require("./fake_pull_request.json");

jest.mock("@actions/core");
jest.mock("@actions/github");

test("Happy Path", async () => {
  const pull_request_json = require("./fake_pull_request.json");
  const octokitMock = {
    graphql: jest.fn(),
    rest: {
      repos: {
        getContent: jest
          .fn()
          .mockResolvedValue(require("./fake_repos_getcontent.json")),
      },
      pulls: {
        get: jest.fn().mockResolvedValue(pull_request_json),
        listFiles: jest
          .fn()
          .mockResolvedValue(require("./fake_pull_request_files.json")),
        merge: jest.fn().mockResolvedValue(),
      },
      checks: {
        listForRef: jest
          .fn()
          .mockResolvedValue(require("./fake_commit_check_runs.json")),
      },
      search: {
        issuesAndPullRequests: jest
          .fn()
          .mockResolvedValue(
            require("./fake_list_pull_requests_by_author.json")
          ),
      },
    },
  };
  github.getOctokit.mockReturnValue(octokitMock);

  github.context = {
    payload: {
      number: pull_request_json.data.number,
    },
  };

  await verifier();
  expect(core.setFailed).not.toHaveBeenCalled();
  expect(octokitMock.graphql).toHaveBeenCalledWith(
    expect.stringContaining('mergePullRequest'),
    expect.objectContaining({ mergeParams: {"pullRequestId" : pull_request_json.data.node_id } })
  );
});
