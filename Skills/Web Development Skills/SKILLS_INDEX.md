# OrisTrade Web Development Skills Index

Skills sourced from:
- `peterbamuhigire/skills-web-dev` (GitHub)
- `mintuz/claude-plugins` (GitHub)
- `alirezarezvani/claude-skills` (GitHub)

All files located in `/Users/andy/Documents/OrisTrade/Skills/`

---

## JavaScript (`Skills/javascript/`)
| File | What It Covers |
|------|---------------|
| `javascript-modern.md` | ES6+ patterns — async/await, fetch wrapper, destructuring, Optional chaining, generators, WeakMap, Proxy/Reflect, debounce/throttle |
| `javascript-advanced.md` | Closures, prototype chains, ES6 classes, `this` binding, event loop, memory management, Temporal Dead Zone |
| `javascript-patterns.md` | Reusable design patterns for JS: factory, observer, singleton, strategy |

## TypeScript (`Skills/typescript/`)
| File | What It Covers |
|------|---------------|
| `typescript-mastery.md` | Full TypeScript: generics, utility types, conditional types, decorators, strict mode |
| `typescript-design-patterns.md` | TS-specific patterns: discriminated unions, type guards, mapped types |
| `mintuz-typescript-strict.md` | Schema-first development, strict typing, Zod validation patterns |

## React / Next.js (`Skills/react-nextjs/`)
| File | What It Covers |
|------|---------------|
| `react-development.md` | React fundamentals: hooks, context, state management, component architecture |
| `react-patterns.md` | Advanced React: compound components, render props, HOCs, custom hooks |
| `nextjs-app-router.md` | Next.js 14 App Router: layouts, Server Components, static export, routing |
| `mintuz-react.md` | React testing, component design, visual iteration |
| `tdd-testing.md` | TDD approach for React — test-first development, React Testing Library |

## CSS / Tailwind (`Skills/css-tailwind/`)
| File | What It Covers |
|------|---------------|
| `tailwind-css.md` | Tailwind utilities, responsive design, dark mode, component classes |
| `mintuz-tailwind.md` | Tailwind patterns for production — design system tokens, component extraction |

## API / Backend (`Skills/api-backend/`)
| File | What It Covers |
|------|---------------|
| `api-design-first.md` | API-first design: OpenAPI spec, versioning, RESTful principles |
| `api-error-handling.md` | Consistent error formats, status codes, client/server error patterns |
| `nodejs-development.md` | Node.js patterns: streams, workers, Cloudflare Workers compatibility |

## Database / PostgreSQL / Supabase (`Skills/database-postgresql/`)
| File | What It Covers |
|------|---------------|
| `postgresql-fundamentals.md` | PostgreSQL essentials — tables, queries, constraints, RLS (Row Level Security) |
| `postgresql-performance.md` | Indexes, query optimization, EXPLAIN ANALYZE, connection pooling |

## Auth / Security (`Skills/auth-security/`)
| File | What It Covers |
|------|---------------|
| `dual-auth-rbac.md` | Role-based access control: admin + member roles, session management, Supabase RLS |
| `vibe-security.md` | Security checklist: prepared statements, CSRF, input validation, rate limiting |
| `web-app-security-audit.md` | Security audit process: OWASP top 10, headers, XSS, SQL injection |

## AI / LLM Integration (`Skills/ai-llm/`)
| File | What It Covers |
|------|---------------|
| `ai-web-apps.md` | Next.js + Vercel AI SDK: streaming, multi-provider factory, structured output, Zod |
| `ai-prompt-engineering.md` | Prompt patterns: chain-of-thought, few-shot, system prompts, output formatting |

## UX / Design (`Skills/ux-design/`)
| File | What It Covers |
|------|---------------|
| `webapp-gui-design.md` | Intro to GUI design skill (see sections folder for full content) |
| `webapp-gui-design-sections/` | 10 detailed sections: architecture, components, interface design, SaaS UX |
| `form-ux-design.md` | Form design: validation UX, error states, progressive disclosure |

## Marketing — YouTube & Paid Ads (`Skills/marketing/`)
| File | What It Covers |
|------|---------------|
| `video-content-strategist.md` | **Primary YouTube skill** — channel strategy, niche positioning, SEO keyword research, long-form script structure (hook/body/CTA), Shorts pipeline, 90-day launch plan, CTR anti-patterns |
| `paid-ads.md` | YouTube/Google/Meta/LinkedIn campaign strategy — audience targeting, ROAS/CPA goals, video ad structure (0-3s hook → 30s CTA), CTR optimization levers |
| `ad-creative.md` | High-CTR ad copy production — hooks, headlines, bulk variations, platform-specific formats, creative testing framework |
| `campaign-analytics.md` | Multi-touch attribution, funnel conversion analysis, ROAS/CPA/CTR measurement and diagnosis |
| `marketing-psychology.md` | 70+ mental models for persuasion — cognitive bias, loss aversion, social proof, scarcity — applied to ad copy and CTR |
| `copywriting.md` | Landing page copy that matches ad messaging — headline formulas, CTAs, post-click conversion |

## Performance (`Skills/performance/`)
| File | What It Covers |
|------|---------------|
| `frontend-performance.md` | Core Web Vitals, lazy loading, bundle splitting, image optimization |

## Python (`Skills/python/`)
| File | What It Covers |
|------|---------------|
| `senior-data-scientist.md` | A/B testing, statistical modeling, Pandas/NumPy/Scikit-learn, XGBoost, MLflow — trading signal analysis & experiment design |
| `senior-data-engineer.md` | ETL/ELT pipelines, Airflow, dbt, Kafka, data quality, batch vs streaming — trade data ingestion |
| `senior-backend.md` | Python backend patterns: REST API scaffolding, DB migrations, load testing scripts |

### Python Scripts (`Skills/python/scripts/`)
| File | What It Does |
|------|-------------|
| `api_scaffolder.py` | Generate route handlers + TypeScript types from OpenAPI spec or DB schema |
| `database_migration_tool.py` | Analyze DB schema, detect changes, generate migration files with rollback |
| `api_load_tester.py` | Load test API endpoints — concurrency, duration, latency stats |
| `data_quality_validator.py` | Validate data pipelines — null checks, schema drift, freshness monitoring |
| `etl_performance_optimizer.py` | Profile and optimize ETL/ELT performance bottlenecks |
| `pipeline_orchestrator.py` | Orchestrate multi-step data pipelines with dependency management |

---

## Quick Reference — OrisTrade Stack Mapping

| OrisTrade Need | Skill Files to Read |
|---------------|---------------------|
| Building a new page (Next.js) | `react-nextjs/nextjs-app-router.md`, `react-nextjs/react-development.md` |
| Styling with Tailwind | `css-tailwind/tailwind-css.md`, `css-tailwind/mintuz-tailwind.md` |
| TypeScript types | `typescript/typescript-mastery.md` |
| Supabase queries | `database-postgresql/postgresql-fundamentals.md` |
| Auth + RLS | `auth-security/dual-auth-rbac.md` |
| Cloudflare Worker API | `api-backend/api-design-first.md`, `api-backend/api-error-handling.md` |
| Security review | `auth-security/web-app-security-audit.md`, `auth-security/vibe-security.md` |
| Performance audit | `performance/frontend-performance.md` |
| Trading UI/UX | `ux-design/webapp-gui-design-sections/09-interface-design.md` |
| Trading signal data analysis | `python/senior-data-scientist.md` |
| Automation scripts / data pipelines | `python/senior-data-engineer.md`, `python/scripts/pipeline_orchestrator.py` |
| DB migration scripts | `python/scripts/database_migration_tool.py` |
| YouTube channel launch | `marketing/video-content-strategist.md` |
| YouTube ads / high CTR | `marketing/paid-ads.md` + `marketing/ad-creative.md` + `marketing/marketing-psychology.md` |
| Measure ad performance | `marketing/campaign-analytics.md` |
