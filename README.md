# Department of Examinations UI demo

A static, frontend-only recreation of the public Department of Examinations website and examination-results flow.

This project does not connect to the government service, submit or store entered NIC/index values, or return genuine examination results. The result sheet uses clearly marked fictional demonstration data.

## Pages

- `dist/index.html` - landing page
- `dist/examresults.html` - examination search form and local CAPTCHA
- `dist/result.html` - responsive fictional result sheet

## Run locally

From the project directory:

```powershell
python -m http.server 4173 --directory dist
```

Then open `http://localhost:4173`.

## Deploy on Vercel

Import this repository into Vercel. The included `vercel.json` configures the site automatically:

- Framework: Other / static
- Build command: none
- Output directory: `dist`

Every push to the connected production branch can trigger a new deployment.
