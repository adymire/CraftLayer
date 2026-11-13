import { z } from "zod";

const slugSchema = z
  .string()
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const skillFrontmatterSchema = z
  .object({
    name: slugSchema,
    description: z.string().trim().min(1).max(1024),
  })
  .passthrough();

export const skillRegistryEntrySchema = z
  .object({
    id: slugSchema,
    name: z.string().trim().min(1),
    description: z.string().trim().min(1).max(1024),
    category: slugSchema,
    version: z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/),
    path: z.string().min(1),
    tags: z.array(slugSchema),
    agents: z.array(slugSchema),
    dependencies: z.array(slugSchema),
    relatedSkills: z.array(slugSchema),
    status: z.enum(["draft", "published"]),
    license: z.string().trim().min(1),
    lastReviewed: z.iso.date(),
  })
  .strict();

export const skillRegistrySchema = z
  .object({
    schemaVersion: z.literal(1),
    skills: z.array(skillRegistryEntrySchema),
  })
  .strict()
  .superRefine((registry, context) => {
    const seen = new Set<string>();

    registry.skills.forEach((skill, index) => {
      if (seen.has(skill.id)) {
        context.addIssue({
          code: "custom",
          path: ["skills", index, "id"],
          message: `Duplicate skill id "${skill.id}"`,
        });
      }
      seen.add(skill.id);

      if (skill.path !== `skills/${skill.id}`) {
        context.addIssue({
          code: "custom",
          path: ["skills", index, "path"],
          message: `Expected path "skills/${skill.id}"`,
        });
      }

      for (const [field, references] of [
        ["dependencies", skill.dependencies],
        ["relatedSkills", skill.relatedSkills],
      ] as const) {
        const referenceSet = new Set<string>();
        references.forEach((reference, referenceIndex) => {
          if (reference === skill.id) {
            context.addIssue({
              code: "custom",
              path: ["skills", index, field, referenceIndex],
              message: "A skill cannot reference itself",
            });
          }
          if (referenceSet.has(reference)) {
            context.addIssue({
              code: "custom",
              path: ["skills", index, field, referenceIndex],
              message: `Duplicate ${field} reference "${reference}"`,
            });
          }
          referenceSet.add(reference);
        });
      }
    });
  });

export const claudePluginManifestSchema = z
  .object({
    name: slugSchema,
    displayName: z.string().trim().min(1),
    version: z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/),
    description: z.string().trim().min(1),
    author: z.object({ name: z.string().trim().min(1) }).passthrough(),
    skills: z
      .array(z.string().regex(/^\.\/skills\/[a-z0-9]+(?:-[a-z0-9]+)*$/)),
  })
  .passthrough();

export const claudeMarketplaceSchema = z
  .object({
    name: slugSchema,
    owner: z.object({ name: z.string().trim().min(1) }).passthrough(),
    plugins: z
      .array(
        z
          .object({
            name: slugSchema,
            source: z.literal("./"),
          })
          .passthrough(),
      )
      .min(1),
  })
  .passthrough();

export type SkillFrontmatter = z.infer<typeof skillFrontmatterSchema>;
export type SkillRegistryEntry = z.infer<typeof skillRegistryEntrySchema>;
export type SkillRegistry = z.infer<typeof skillRegistrySchema>;
export type ClaudePluginManifest = z.infer<typeof claudePluginManifestSchema>;
export type ClaudeMarketplace = z.infer<typeof claudeMarketplaceSchema>;
