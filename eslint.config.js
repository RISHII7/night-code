import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/out/**",
      "**/coverage/**",
      "packages/database/generated/**",
      "**/*.d.ts",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // `any` is a deliberate escape hatch, not a default. Warn rather than
      // error so a legitimate, commented use doesn't block a build.
      "@typescript-eslint/no-explicit-any": "warn",

      // Unused args prefixed with `_` are intentional (e.g. required-by-signature).
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // The terminal client is React. The exhaustive-deps rule is not optional
  // here: a stale closure in the command menu silently executed the wrong
  // command, which is exactly the class of bug this rule catches.
  {
    files: ["packages/cli/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "error",
    },
  },

  // The server may log deliberately.
  {
    files: ["packages/server/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },

  // Config files run in Node and may use CommonJS-isms.
  {
    files: ["*.config.{js,ts}", "*.config.*.{js,ts}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
