# Secured-Portfolio-Site
Developer Portfolio & Project Showcase — Secure Web Application---
This is a secure, HTTPS-enabled web application that showcases a developer’s portfolio, skills, and projects. It’s designed with a security-first architecture, proper caching strategies, and modern web development best practices.

How to Run the App Locally---

Clone the Repository
git clone https://github.com/your-username/portfolio-app.git

Install Dependencies
npm install

Start the HTTPS Server
node server.js

Visit the App
Open your browser and go to:
https://localhost:3000

Note: If you're using a self-signed certificate, accept your browser’s security warning.

 Part A: Reflection – Authentication Method
For authentication, I implemented both local login using email and password and third-party SSO with Google OAuth 2.0. I chose local auth to give users full control over their credentials, and Google SSO to provide a fast, convenient login experience using accounts people already trust. I hashed passwords using bcrypt before storing them in the database to prevent raw password exposure. I stored access tokens in HttpOnly cookies to reduce the risk of XSS attacks. Google was selected for its strong documentation, security features, and user familiarity.

 Part B: Reflection – Access Control System
I implemented a Role-Based Access Control (RBAC) system with two roles: “User” and “Admin.” These roles are stored in the database and included in JWT payloads. Middleware checks both the token and the user’s role to restrict access to protected routes like /admin, /profile, and /dashboard. The biggest challenge was keeping the system both secure and simple — I wanted to ensure fine-grained control without overcomplicating the structure. I opted for two core roles to balance usability and scalability.

Part C: Reflection – Token Management Strategy
I used JSON Web Tokens (JWT) for session management. To balance security and usability, I issued short-lived access tokens (15 minutes) and longer-lived refresh tokens (7 days). Tokens are stored in secure, HttpOnly, SameSite=Strict cookies to reduce exposure to XSS and CSRF attacks. I created a /refresh endpoint that issues new access tokens using a valid refresh token, allowing users to stay logged in without frequent re-authentication. This approach helped improve both the user experience and overall session security.

Part D: Reflection – Security Risk Mitigation
I addressed multiple session-related security risks. Cookies were secured with HttpOnly, Secure, and SameSite=Strict flags to prevent theft. I added CSRF protection using csurf middleware and rate limiting to reduce brute-force login attacks. I also protected against account enumeration by returning generic error messages for invalid login attempts. Session fixation is prevented through secure cookie management and short-lived JWTs. These measures strengthened the app’s overall security posture while keeping user experience smooth and intuitive.


Built as part of a multi-phased security project focusing on real-world practices like HTTPS, secure headers, and caching strategies.
