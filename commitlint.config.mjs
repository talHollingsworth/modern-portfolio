// Conventional Commits (feat:, fix:, docs:, chore:, ...). Merge commits and reverts are
// ignored by default. The body line limit is relaxed so Co-authored-by trailers and
// pasted URLs never fail the check.
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};
