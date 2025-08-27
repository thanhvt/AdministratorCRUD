module.exports = {
  extends: ["@banking/config/eslint-preset"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
