# playwrightrepo


Use --project command line option to run a single project.

npx playwright test --project=firefox

Running 1 test using 1 worker

  ✓ [firefox] › example.spec.ts:3:1 › basic test (2s)

  ====================================================================================
  Command line
Following are the usual command line patterns. Learn more about the command line.

Run all the tests

//npx playwright test

Run a single test file

npx playwright test tests/todo-page.spec.ts

Run a set of test files

npx playwright test tests/todo-page/ tests/landing-page/

Run files that have my-spec or my-spec-2 in the file name

npx playwright test my-spec my-spec-2

Run the test with the title

npx playwright test -g "add a todo item"

Run tests in headed browsers

npx playwright test --headed

Run tests in a particular configuration (project)

npx playwright test --project=firefox

Disable parallelization

npx playwright test --workers=1

Choose a reporter

npx playwright test --reporter=dot

Run in debug mode with Playwright Inspector

npx playwright test --debug

Ask for help

npx playwright test --help