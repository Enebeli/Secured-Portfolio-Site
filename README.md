# Secured-Portfolio-Site
Developer Portfolio & Project Showcase — Secure Web Application---
This is a secure, HTTPS-enabled web application that showcases a developer’s portfolio, skills, and projects. It’s designed with a security-first architecture, proper caching strategies, and modern web development best practices.

How to Run the App Locally---

Clone the Repository
git clone https://github.com/your-username/portfolio-app.git
cd portfolio-app

Install Dependencies
npm install

Start the HTTPS Server
node server.js

Visit the App
Open your browser and go to:
https://localhost:3000

Note: If you're using a self-signed certificate, accept your browser’s security warning.

SSL Certificate ---

For local development, I used OpenSSL to generate a self-signed SSL certificate. This allows encrypted HTTPS communication during testing.

Why OpenSSL?----

-Quick to set up

-Ideal for local environments

-No domain or external validation required

SSL Files used:---

ssl/cert.pem

ssl/key.pem

These files are used in the HTTPS server configuration to serve the application securely.

Secure HTTP Headers with Helmet

The app uses Helmet middleware to set important HTTP security headers including:

Content-Security-Policy (helps prevent cross-site scripting by controlling resource loading)

X-Frame-Options (prevents clickjacking)

X-Content-Type-Options (disables MIME sniffing)

Strict-Transport-Security (enforces HTTPS for future requests)

Helmet is configured globally in the server.js file.

Caching Strategy---

To balance performance and security, caching is applied selectively using Cache-Control headers.

Routes and caching policies:---

/ (Homepage): no-store (no caching)

/projects (Project showcase): cache for 5 minutes with stale-while-revalidate

/blog (Developer blog): cache for 5 minutes with stale-while-revalidate

/contact (Contact form): no-store (no caching)

Sensitive data, such as user input forms, are never cached.

Routes Implemented---

/ – Homepage

/projects – Lists developer projects

/blog – Blog and tutorials section

/contact – Contact form

Lessons Learned---

OpenSSL makes local HTTPS setup straightforward, but for production use a trusted certificate authority like Let’s Encrypt.

Content Security Policy headers need careful configuration — if too strict, they can block needed scripts or styles.

Caching improves app speed but must never cache sensitive user data.

Designing modular routes and security policies early helps with future app scalability.

What’s Next (Phase 2)---

Implement user registration and secure login

Add role-based access control (e.g. admin features)

Use bcrypt for password hashing

Protect private routes with session or token-based authentication

Project Summary---

Built as part of a multi-phased security project focusing on real-world practices like HTTPS, secure headers, and caching strategies.