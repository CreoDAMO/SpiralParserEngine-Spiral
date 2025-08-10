# Navigation Menu
CreoDAMO
SpiralParserEngine_Vite

Code
Issues
Pull requests
Actions
Projects
Wiki
Security
1
Insights
Settings
Dependabot alerts #1
esbuild enables any website to send any requests to the development server and read the response #1
 Open Opened yesterday on esbuild (npm) · package-lock.json
Dependabot cannot update to the required version
One or more other dependencies require a version that is incompatible with this update.

Transitive dependency esbuild 0.18.20 is introduced via
drizzle-kit 0.31.4  ...  esbuild 0.18.20
Package
Affected versions
Patched version
esbuild
(npm)
<= 0.24.2
0.25.0
Summary
esbuild allows any websites to send any request to the development server and read the response due to default CORS settings.

Details
esbuild sets Access-Control-Allow-Origin: * header to all requests, including the SSE connection, which allows any websites to send any request to the development server and read the response.

https://github.com/evanw/esbuild/blob/df815ac27b84f8b34374c9182a93c94718f8a630/pkg/api/serve_other.go#L121
https://github.com/evanw/esbuild/blob/df815ac27b84f8b34374c9182a93c94718f8a630/pkg/api/serve_other.go#L363

Attack scenario:

The attacker serves a malicious web page (http://malicious.example.com).
The user accesses the malicious web page.
The attacker sends a fetch('http://127.0.0.1:8000/main.js') request by JS in that malicious web page. This request is normally blocked by same-origin policy, but that's not the case for the reasons above.
The attacker gets the content of http://127.0.0.1:8000/main.js.
In this scenario, I assumed that the attacker knows the URL of the bundle output file name. But the attacker can also get that information by

Fetching /index.html: normally you have a script tag here
Fetching /assets: it's common to have a assets directory when you have JS files and CSS files in a different directory and the directory listing feature tells the attacker the list of files
Connecting /esbuild SSE endpoint: the SSE endpoint sends the URL path of the changed files when the file is changed (new EventSource('/esbuild').addEventListener('change', e => console.log(e.type, e.data)))
Fetching URLs in the known file: once the attacker knows one file, the attacker can know the URLs imported from that file
The scenario above fetches the compiled content, but if the victim has the source map option enabled, the attacker can also get the non-compiled content by fetching the source map file.

PoC
Download reproduction.zip
Extract it and move to that directory
Run npm i
Run npm run watch
Run fetch('http://127.0.0.1:8000/app.js').then(r => r.text()).then(content => console.log(content)) in a different website's dev tools.
image

Impact
Users using the serve feature may get the source code stolen by malicious websites.

@dependabot dependabot bot opened this yesterday
Alert metadata
Severity
Moderate
/ 10
CVSS v3 base metrics
Attack vector
Network
Attack complexity
High
Privileges required
None
User interaction
Required
Scope
Unchanged
Confidentiality
High
Integrity
None
Availability
None
CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N
Tags
Development dependency Patch available
Weaknesses
WeaknessCWE-346
CVE ID
No CVE
GHSA ID
GHSA-67mh-4wv8-2f99
See advisory in GitHub Advisory Database
See all of your affected repositories
See something to contribute?
Suggest improvements for this advisory on the GitHub Advisory Database.
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact
Manage cookies
Do not share my personal information
esbuild enables any website to send any requests to the development server and read the response · Dependabot alert #1 · CreoDAMO/SpiralParserEngine_Vite 
