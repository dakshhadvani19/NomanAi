# Comprehensive SEO Upgrade Plan for Outpera

**Context for Claude Code:**
This is a React Single Page Application (SPA) built with Vite and hosted on Vercel (`outpera.vercel.app`). 
Currently, searching for "Outpera" on Google yields results for "Opera" or "Oracle". This happens because "Outpera" is a new brand name with low domain authority, and Google's algorithm auto-corrects it to established brands. 

**Objective:**
Implement aggressive Technical and On-Page SEO to force Google to recognize "Outpera" as a distinct entity and rank it for its own brand name.

---

## Phase 1: Static Metadata Injection (`index.html`)
Since this is a Vite React app, the initial HTML payload must contain all critical SEO data before JavaScript loads.

**Tasks:**
1. **Title Tag:** Update the `<title>` to exactly: `Outpera | AI Automations & Voice Agents`
2. **Meta Description:** Add: `<meta name="description" content="Outpera specializes in AI automations, voice agents, and workflow optimization to scale your business. Book a free AI audit today.">`
3. **Keywords (Brand Enforcement):** Add: `<meta name="keywords" content="Outpera, Outpera AI, AI Automations, Voice Agents, Workflow Automation, AI Agency">`
4. **Canonical Tag:** Add: `<link rel="canonical" href="https://outpera.vercel.app/" />`
5. **Open Graph (OG) Tags:** Add `og:title`, `og:description`, `og:url`, and `og:type` ("website").
6. **Twitter Cards:** Add `twitter:card` (summary_large_image), `twitter:title`, and `twitter:description`.

## Phase 2: Schema.org Markup (JSON-LD)
Google needs structural data to understand that "Outpera" is a real company, not a typo of "Opera".

**Tasks:**
1. Inject a JSON-LD script into the `<head>` of `index.html` defining an `Organization` or `ProfessionalService`.
2. **Required JSON-LD Fields:**
   - `"@type"`: `"Organization"`
   - `"name"`: `"Outpera"`
   - `"alternateName"`: `"Outpera AI"`
   - `"url"`: `"https://outpera.vercel.app"`
   - `"description"`: `"Leading AI Automation and Voice Agent agency."`
   - `"founders"`: `[{ "@type": "Person", "name": "Tharun Naik" }, { "@type": "Person", "name": "Daksh Hadvani" }]`

## Phase 3: Dynamic SEO for React Routes
As an SPA, route changes don't refresh the `<head>`, which hurts SEO for subpages.

**Tasks:**
1. Install the `react-helmet-async` package.
2. Wrap the root application in `<HelmetProvider>`.
3. Add `<Helmet>` components to the following pages with unique metadata:
   - **HomePage:** `Title: Outpera | Automate Your Business with AI`
   - **AuditPage:** `Title: Outpera | Book Your Free AI Audit`
   - **RevenueSystemsPage:** `Title: Outpera | AI Revenue Systems & Workflows`

## Phase 4: Web Crawling Assets
Give Googlebot a map of the site.

**Tasks:**
1. Create `public/robots.txt` allowing all User-agents (`User-agent: *`, `Allow: /`).
2. Create `public/sitemap.xml` defining the exact URLs (`/`, `/audit`, `/revenue-systems`) with appropriate `<changefreq>` and `<priority>`.

## Phase 5: Content & Semantic HTML Optimization
Google reads text, not just code. The brand name must be established semantically.

**Tasks:**
1. Ensure the word "Outpera" is wrapped in an `<h1>` tag on the homepage.
2. Ensure there is natural paragraph text (`<p>`) describing "Outpera AI" so the crawler associates the brand with the industry.
3. Check all `<img>` tags and ensure they have `alt="Outpera AI Logo"`, etc.

---

## Final Step (For the User, after Deployment)
Once Claude implements these changes and they are deployed to Vercel, the user MUST:
1. Go to **Google Search Console** (GSC).
2. Add `https://outpera.vercel.app` as a property.
3. Submit the new `https://outpera.vercel.app/sitemap.xml`.
4. Type the URL into the inspection bar and click **"Request Indexing"**. 
*(This stops Google from guessing what Outpera is and forces it to read the new code).*
