# Contributing

Thank you so much for your help! thousands of people in Puerto Rico will have better access to food
because of your code!

## Adding code?

- Pick an [issue](https://github.com/TechForPR/chefsForPR/issues) from
the list that has nobody assigned to it
- Create a branch to work on your code, pushing to master or in general is disabled.
- Add your code, and constantly merge master to ensure your work sits on top of the latest version.
`git pull origin master -r`
- If required, add the appropiate tests.
- Verify that your code is working and it solves the requirements it aims to solve.
- Verify that you're not breaking any test, including the linter. `npm test`.
- Avoid drastic changes, like renaming routes or fields, your PR will get rejected if a change
that can't be justified is added.
- Make a [pull request](https://github.com/TechForPR/chefsForPR/compare) on github. We'll be notified
 but if you don't hear a response from us quickly, ping us in slack.
    - In your pull requests mention which issue are you closing, which steps you took, and tell others
what do they need to do to verify your changes. For example: 'Navigate to /food/request and a form should
appear asking for information about a request, and when the user submits the form the request should go to the
database'.
    - If new dependencies were added, mention which and why, so that the testers can install them.
    - If your code or improvement is not tied to an issue, please open an issue first so that others
are aware of your work.

## Reviewing Pull Requests?

- Checkout the open [pull requests](https://github.com/TechForPR/chefsForPR/pulls) on github,
and pull the code written by others.
- Run the tests and verify they pass
- Run the code and follow the test instructions, and verify that the code does what it says.
- Verify that the code is not drastically changing routes or models in a way that will affect users
or other developers, unless seriously justified.
- Comment on the pull request saying that you approve, or if disapproving, add comments and advice
for the coder. Remember to always be polite and positive, we're all volunteers working on the same
team.
