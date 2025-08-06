SECURE PORTFOLIO WEB APPLICATION

A secure web portfolio app featuring user authentication, encrypted data storage, and protected user profiles.

## Getting Started

### Clone the repo
git clone https://github.com/Enebeli/Secured-Portfolio-Site
cd Secured-Portfolio-Site

### Install dependencies
npm install

### Create a .env file in the root with the following:
JWT_SECRET=your_jwt_secret  
REFRESH_SECRET=your_refresh_secret  
SESSION_SECRET=your_session_secret  
MONGO_URI=your_mongo_connection_string

### Run the server
npm run dev

Visit: https://localhost:3000

## Security Features

### Input Validation
All form inputs are validated using express-validator to ensure safe and proper user input. Rules include:
- Valid email formats
- Alphanumeric and length checks for names
- Length limits on bio
- Custom error handling

### Output Encoding
User-generated content such as bio and email are escaped and sanitized before rendering to prevent cross-site scripting (XSS). The `.escape()` method is used during validation and EJS templates use auto-escaping features.

### Encryption
Sensitive fields such as email and bio are encrypted before saving to the database using Node’s built-in crypto module. Data is decrypted only when needed for display in the UI.

### Dependency Management
Dependencies are managed via npm. Vulnerabilities are checked using:
npm audit

To auto-fix minor issues:
npm audit fix

To force fix all (including breaking changes):
npm audit fix --force

## Lessons Learned
- CSRF protection required properly placing cookie-parser before csurf middleware and making sure all forms include a valid token.
- Debugging database connection errors helped reinforce understanding of MongoDB connection strings and user authentication setup.
- Dealing with session handling and JWT token-based auth was challenging, especially in managing token expiration and refresh flows.
- Ensuring encryption and output encoding were applied correctly required careful testing and inspection of template rendering.

## Reflection
The most challenging vulnerability was Cross-Site Scripting (XSS), as it required both input validation and output encoding to be airtight. Also, getting CSRF protection to work with cookies and forms took debugging. In the future, tools like OWASP ZAP or Burp Suite could help automate vulnerability testing and improve the security posture of the app.

## Demo Video Checklist
- Demonstrate local login or SSO login
- Show successful profile viewing and updating
- Highlight secure storage of encrypted fields like email and bio
- Demonstrate session persistence and CSRF protection (e.g. failed request with missing token)

