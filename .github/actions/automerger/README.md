# Auto merger for _data/events/ Pull Requests

A github action that automatically merges a Pull Request if...

## Conditions

- The pull Request refers to main as the target branch
- only a new event has been added to `/_data/events`
    - the Pull Request only affects one single (new) file
    - that file is a `.json` file in `/_data/events`
- all status checks are green (implies that the file in `/_data/events/` is a JSON containing a validated event)
- there is an approve list for github users for which automerge is enabled
    - based on whether we've merged one of their pull requests before
    - `gh pr list -R github.com/coderetreat/coderetreat.org --state=merged -L 10 --json "author"`

## Actions

- It merges the pull request

## Example

`gh pr list -R github.com/coderetreat/coderetreat.org --state=merged -L 10 --json "author,state,statusCheckRollup,files"`

- `.files.length === 1`
- `.files[0].deletions === 0`
- `.files[0].path.startsWith('_data/events/')`
- `.files[0].path.endsWith('.json');
- `.files[0].path.test(/^_data\/events\/\d+/[^\/]+\.json$/)` ???
- `.statusCheckRollup.every(check => check.conclusion === "SUCCESS")`
- `.statusCheckRollup.some(check => check.name === "test")`


