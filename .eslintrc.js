module.exports = {
  root: true,
  extends: ["@banking/config/eslint-preset"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    ".next/",
    "out/",
    "*.tsbuildinfo"
  ],
};
