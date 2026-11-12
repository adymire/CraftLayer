# Skill evaluations

These are human-run evaluation cases, not an automated benchmark and not
evidence that a skill has passed. Use them to check whether a coding agent
follows the skill's workflow on realistic tasks.

For each case, review whether the response:

1. Identifies user intent and inspects existing constraints before proposing
   changes.
2. Uses the skill's decision rules rather than applying a generic template.
3. Preserves existing functionality and handles relevant failure states.
4. Gives concrete acceptance checks and reports uncertainty accurately.
5. Avoids fabricated data, unsupported claims, and unnecessary dependencies.

Record model/agent, skill revision, task prompt, observed output, defects,
and reviewer decision before changing a registry entry to `published`.
Do not treat scores from different agents or tasks as directly comparable
without a controlled evaluation design.
