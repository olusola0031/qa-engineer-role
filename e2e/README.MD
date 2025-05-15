# Todo App E2E Tests

## Handling Flakiness

- We use Playwright’s built-in auto-waiting for elements and assertions to ensure tests only proceed when UI is ready.
- Explicit waits are avoided where possible to reduce flakiness.
- Each test runs independently with proper setup and teardown.
- Network and UI interactions are awaited properly to avoid race conditions.

## Reporting Test Failures

- Playwright test runner generates detailed HTML and JSON reports with screenshots and trace files on failure.
- CI systems can collect and display these reports to quickly diagnose issues.
- Failed tests output error logs and stack traces in console for debugging.

## Integration with CI

- Tests run headlessly in the CI pipeline on every push or pull request.
- Fast feedback on test results helps catch regressions early.
- Pass/fail status gate keeps the main branch stable.
- Test artifacts are archived for audit and debugging.
