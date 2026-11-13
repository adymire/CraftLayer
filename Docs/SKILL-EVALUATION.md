# Core skill evaluation guide

The cases in `evals/` are human-run behavior checks, not benchmark results.
They help reviewers decide whether a skill consistently guides an agent
toward the requested outcome while respecting the project's constraints.
Passing structural validation alone does not publish or certify a skill.

## Run a case

1. Select the skill and case from the relevant JSON file in `evals/`.
2. Use a fresh conversation with the skill installed or otherwise loaded.
3. Give the agent the task exactly as written, together with only the
   repository context needed to perform it.
4. Do not coach the agent toward the expected points during its first
   response.
5. Compare the response to every `expected` and `mustNot` item.
6. Save the model/tool version, date, case, observed evidence, and result in
   the review or pull request. Never describe a case as passed unless it was
   actually run.

## Score each case

Mark each expected behavior **met**, **partly met**, or **missed**. Any
`mustNot` behavior that occurs is a failure, even if the answer also
contains good recommendations.

- **Pass:** every expected behavior is met and no prohibited behavior occurs.
- **Needs revision:** an expected behavior is partly met or missed, but the
  response remains safe and recoverable.
- **Fail:** a `mustNot` behavior occurs, the answer contradicts a core
  constraint, or it would cause a materially harmful or misleading result.

Include a short quote or concrete response evidence for each non-pass item.
Do not score writing style in place of task behavior.

## Revise and re-run

When a case needs revision:

1. Identify the missing instruction or ambiguity in the skill.
2. Make the smallest change that addresses the cause rather than adding
   general text.
3. Re-run the failed case and at least one adjacent case to check for
   regressions.
4. Record the result and remaining limitation.

Keep all eight core skills in `draft` until their cases, content, source
attribution, and license review are complete. One successful model run is
evidence for that case, not a general quality guarantee.
