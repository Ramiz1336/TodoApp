# Critical Project & Workflow Rules

## 1. Git Commit & Push Policy (STRICT & MANDATORY)

- **NEVER RUN `git commit` OR `git push`**:

  - The AI assistant must **NEVER** execute `git commit`, `git push`, or automated staging/committing commands.
  - The user will handle all committing and pushing manually.

- **WHAT THE ASSISTANT SHOULD DO INSTEAD**:
  - Make the necessary code edits cleanly.
  - Verify changes locally using `npm test` and `npm run build` (or `tsc`).
  - Report the exact changes made and summary of test/build verification results.
  - Leave the files in the working directory ready for the user to inspect, stage, commit, and push.
