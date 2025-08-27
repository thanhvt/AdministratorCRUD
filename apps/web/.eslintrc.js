module.exports = {
  extends: ["@banking/config/eslint-preset", "next/core-web-vitals"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
