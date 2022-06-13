const core = require("@actions/core");
const github = require("@actions/github");
const verifier = require("../verifier");

jest.mock("@actions/core");
jest.mock("@actions/github");

test("Happy Path", async () => {
  github.context = {
    payload: {
      number: 795,
    },
  };
  const octokitMock = {
    rest: {
      repos: {
        getContent: jest
          .fn()
          .mockResolvedValue(require("./fake_repos_getcontent.json")),
      },
      pulls: {
        get: jest.fn().mockResolvedValue(require("./fake_pull_request.json")),
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

  await verifier();
  expect(core.setFailed).not.toHaveBeenCalled();
  expect(octokitMock.rest.pulls.merge).toHaveBeenCalledWith({
    owner: "coderetreat",
    repo: "coderetreat.org",
    pull_number: 795,
  });
});
