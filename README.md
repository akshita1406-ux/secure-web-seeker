# TASK-2: Web Application Vulnerability Scanner

A modern web-based tool to identify common vulnerabilities in web applications.

## 🔍 Overview

This vulnerability scanner helps identify common security vulnerabilities in web applications, including:

- **SQL Injection** - Detection of SQL injection vulnerabilities in forms and URL parameters
- **Cross-Site Scripting (XSS)** - Identification of reflected and stored XSS vulnerabilities
- **Cross-Site Request Forgery (CSRF)** - Detection of missing CSRF protection
- **Security Headers** - Analysis of missing or misconfigured security headers
- **Sensitive Data Exposure** - Detection of exposed sensitive information
- **Insecure Direct Object References (IDOR)** - Identification of access control issues

## 🚀 Features

- Clean, intuitive web interface
- Real-time scanning progress visualization
- Detailed vulnerability reports with severity ratings
- Remediation recommendations
- Export scan results

## 🛠️ Technology Stack

**Frontend (This Repository):**
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/UI components

**Backend Scanner (Python-based):**
For the actual scanning functionality, you would integrate with a Python backend using:
- `requests` - HTTP library for making web requests
- `beautifulsoup4` - HTML parsing and analysis
- `re` - Regular expressions for pattern matching
- `urllib` - URL parsing utilities

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/web-vulnerability-scanner.git

# Navigate to project directory
cd web-vulnerability-scanner

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔒 Disclaimer

This tool is intended for educational purposes and authorized security testing only. Always obtain proper authorization before scanning any web application. Unauthorized scanning of systems you don't own or have permission to test is illegal.

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
