# Copilot Instructions

## Project Overview
This project uses npm for package management and vitest for testing.

## Guidelines for Copilot
1. Follow the existing coding style and conventions used in the project.
2. Ensure compatibility with npm and vitest when suggesting or generating code.
3. Prioritize performance and maintainability in all code suggestions.
4. Adhere to the project's folder structure and organization.
5. Ensure client-facing templates and views are accessible, such as using ARIA markup

## Testing
- All new features or changes should include corresponding tests
- For unit tests, use `vitest`
- Add UI tests using `jsdom`, `@testing-library/jest-dom`, and `@testing-library/react`
- Break test suites into relatively small files for maintainability and focus
- Run tests frequently to ensure no regressions are introduced
- Ensure test coverage improves by checking the output of `@vitest/coverage-v8`

## Package Management
- Use npm for installing, updating, or removing dependencies.
- Ensure the `package.json` file is updated appropriately when making changes to dependencies.
