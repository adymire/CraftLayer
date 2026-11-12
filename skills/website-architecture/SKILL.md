---
name: website-architecture
description: Organize a website's routes, content hierarchy, navigation, and shared page patterns around user intent.
---

# Website Architecture

## When to use

Use when planning or changing a multi-page website, navigation model,
content taxonomy, or route structure.

## When not to use

Do not impose a marketing-site sitemap on an application or change URLs
without considering compatibility, search indexing, and existing links.

## Inputs and assumptions

Identify audiences, tasks, content types, current routes, ownership,
localization, SEO requirements, and existing navigation analytics.

## Workflow

1. Inventory pages, routes, content, and user entry points.
2. Group content by user mental model and task rather than internal org
   charts.
3. Define a primary navigation model and page hierarchy; keep labels
   recognizable and specific.
4. Map related content and cross-links; identify orphan pages and
   duplicated routes.
5. Preserve stable URLs where practical; plan redirects for intentional
   changes.
6. Define reusable page templates only where information structure is
   genuinely shared.
7. Validate navigation with representative tasks and narrow-screen layout.

## Decision rules

- Navigation labels describe destinations, not slogans.
- Keep high-frequency tasks easy to find.
- Breadcrumbs reflect hierarchy only when that hierarchy is meaningful.
- Avoid deep nesting and duplicate paths to the same canonical content.

## Example

For product docs, distinguish “Guides,” “API reference,” and “Concepts”
when users arrive with different jobs. Do not bury API endpoints inside a
promotional feature hierarchy.

## Common failures

- Navigation mirroring internal team structure.
- Too many equal-level choices or vague labels.
- Removing routes without redirects or link review.

## Validation

Test primary user tasks, labels, route uniqueness, internal links,
responsive navigation, and compatibility for changed URLs.
