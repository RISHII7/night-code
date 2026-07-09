/**
 * Conventional Commits enforcement.
 *
 * Applied to commit messages locally (via the commit-msg hook) and to pull
 * request titles in CI, because PRs into `develop` are squash-merged and the
 * title becomes the commit message on the trunk.
 *
 * See CONTRIBUTING.md for the full convention and examples.
 */

/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // a new feature
        "fix", // a bug fix
        "docs", // documentation only
        "style", // formatting; no code behavior change
        "refactor", // behavior-preserving restructuring
        "perf", // performance improvement
        "test", // adding or correcting tests
        "build", // build system or dependencies
        "ci", // CI/CD configuration
        "chore", // tooling, config, housekeeping
        "revert", // reverting a previous commit
      ],
    ],
    "scope-enum": [
      2,
      "always",
      ["cli", "server", "database", "shared", "docs", "ci", "deps", "release", "repo"],
    ],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [2, "always"],
  },
};
