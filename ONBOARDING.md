**Onboarding: WebdriverIO BDD Framework**

**Overview**: A WebdriverIO + Cucumber BDD test framework organized with Feature files (Gherkin), Page Objects, Step Definitions, and shared Support utilities. It provides standardized patterns for writing maintainable UI tests and produces Allure reports.

**Quick Links**:
- **Readme**: [README.md](README.md)
- **Config**: [wdio.conf.js](wdio.conf.js)
- **Scripts / deps**: [package.json](package.json)
- **Standards & conventions**: [CLAUDE.md](CLAUDE.md)

**Prerequisites**:
- Node.js (v18+ recommended) and `npm`
- Chrome browser (or ChromeDriver via Docker)
- Java (for Allure) when generating reports locally
- Optional: Docker and `docker-compose` for containerized runs

**Repository Structure (important files)**
- **features/**: Gherkin `.feature` files (user-facing scenarios).
- **features/pageobjects/**: Page object classes (extend `BasePage`). See [features/pageobjects/login.page.js](features/pageobjects/login.page.js)
- **features/step-definitions/**: Step implementations used by feature files. See [features/step-definitions/steps.js](features/step-definitions/steps.js)
- **features/support/**: Hooks, test-data and helpers. See [features/support/test-data.js](features/support/test-data.js) and [features/support/hooks.js](features/support/hooks.js)
- **wdio.conf.js**: Central WebdriverIO configuration and reporter setup.
- **package.json**: Scripts for running tests, linting and reports.
- **allure-results/** and **allure-report/**: Test artifacts and generated reports.

**How tests are organized**:
- Each feature file tests a single behavior; scenarios are small and focused.
- Page Objects encapsulate element locators and actions; they extend `BasePage`.
- Steps call Page Object methods and use assertions (`chai`).
- Shared test data lives in `features/support/test-data.js`.

**How to run tests (local)**
- Install dependencies:

```bash
npm install
```

- Run full suite:

```bash
npm test
```

- Run smoke tests:

```bash
npm run test:smoke
```

- Run regression:

```bash
npm run test:regression
```

- Run in debug mode (attach debugger):

```bash
npm run test:debug
```

- Generate and open Allure report:

```bash
npm run report:allure
```

**How to run tests (Docker)**

```bash
npm run test:docker
# or
docker-compose up
```

**Key configuration points**
- Base URL: configured via `.env` or `BASE_URL` environment variable; default in `wdio.conf.js`.
- Browser options and headless mode controlled by `HEADLESS` and `CHROME_ARGS`.
- Timeouts and retry settings read from environment variables (see `wdio.conf.js`).
- Cucumber tag filtering uses `TAGS` env or script `--grep` (see `package.json` scripts).

**Writing new tests — quick rules**
- Feature files: use plain user language, one behavior per scenario, tag scenarios appropriately (`@smoke`, `@regression`, `@login`).
- Page Objects: only locators + actions; avoid assertions inside page objects.
- Step Definitions: keep small, reuse page object methods, and avoid hardcoded selectors.
- Test data: put reusable values in `features/support/test-data.js`.
- Logging & screenshots: hooks capture screenshots on failure (see `features/support/hooks.js`).

**Developer workflow for a new scenario**
1. Add a feature file under `features/` with Gherkin scenarios.
2. Add/extend page object in `features/pageobjects/` if needed.
3. Implement step definitions in `features/step-definitions/` reusing existing steps where possible.
4. Add test data to `features/support/test-data.js` if new fixtures are required.
5. Run the scenario locally using `npm test -- --grep "@yourTag"`.
6. Generate Allure report if needed: `npm run report:allure`.

**Best practices & standards**
- Follow naming conventions in [CLAUDE.md](CLAUDE.md) (page objects, feature files, tags).
- Use data attributes for selectors (e.g., `[data-test="username"]`) to make selectors stable.
- Keep waits centralized in `BasePage` and avoid explicit sleeps.
- Add try/catch in page actions when capturing screenshots on failure.
- Run `npm run lint` and `npm run format` before committing.

**Troubleshooting (common issues)**
- Element not found: verify selector, increase `WAIT_FOR_TIMEOUT` or check page navigation.
- Port conflicts (Selenium): check `lsof -i :4444` and stop conflicting services.
- Allure errors: ensure Java installed and `allure` CLI available.

**Checklist for your first day**
- [ ] Clone repository and `npm install`.
- [ ] Run `npm test` and confirm at least one scenario runs.
- [ ] Open [features/login.feature](features/login.feature) and step through the scenario.
- [ ] Inspect `features/pageobjects/login.page.js` to learn Page Object patterns.
- [ ] Run `npm run lint` and `npm run format` to confirm code quality tools work.

**Where to get help / next steps**
- Read internal standards in [CLAUDE.md](CLAUDE.md).
- Open a GitHub issue for questions or raise in team channel for blockers.
- If you'd like, I can convert this doc into a short onboarding checklist PR and add more examples.

---
_File created: ONBOARDING.md_
