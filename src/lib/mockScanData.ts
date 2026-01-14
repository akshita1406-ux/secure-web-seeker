import { Vulnerability } from "@/components/VulnerabilityCard";

export const generateMockVulnerabilities = (url: string): Vulnerability[] => {
  const vulnerabilities: Vulnerability[] = [
    {
      id: "1",
      type: "SQL Injection",
      severity: "critical",
      title: "SQL Injection in Login Form",
      description: "The login form is vulnerable to SQL injection attacks. An attacker could bypass authentication or extract sensitive data from the database.",
      location: `${url}/login?username=admin'--`,
      remediation: "Use parameterized queries or prepared statements. Never concatenate user input directly into SQL queries. Implement input validation and sanitization.",
    },
    {
      id: "2",
      type: "XSS",
      severity: "high",
      title: "Reflected XSS in Search Parameter",
      description: "The search functionality reflects user input without proper sanitization, allowing execution of arbitrary JavaScript code in the victim's browser.",
      location: `${url}/search?q=<script>alert(1)</script>`,
      remediation: "Implement proper output encoding. Use Content Security Policy (CSP) headers. Sanitize all user input before rendering in the page.",
    },
    {
      id: "3",
      type: "Security Headers",
      severity: "medium",
      title: "Missing Content-Security-Policy Header",
      description: "The application does not implement a Content-Security-Policy header, which helps prevent XSS and data injection attacks.",
      location: url,
      remediation: "Implement a strict Content-Security-Policy header. Start with a restrictive policy and gradually loosen as needed.",
    },
    {
      id: "4",
      type: "CSRF",
      severity: "medium",
      title: "Missing CSRF Token in Forms",
      description: "The application's forms do not include CSRF tokens, making them vulnerable to cross-site request forgery attacks.",
      location: `${url}/account/settings`,
      remediation: "Implement CSRF tokens for all state-changing operations. Use the SameSite cookie attribute. Verify the Origin and Referer headers.",
    },
    {
      id: "5",
      type: "Security Headers",
      severity: "low",
      title: "X-Frame-Options Header Not Set",
      description: "The X-Frame-Options header is not set, which could allow the page to be embedded in iframes on malicious sites (clickjacking).",
      location: url,
      remediation: "Set X-Frame-Options header to DENY or SAMEORIGIN. Consider using the frame-ancestors directive in CSP as a modern alternative.",
    },
    {
      id: "6",
      type: "Information Disclosure",
      severity: "info",
      title: "Server Version Disclosed",
      description: "The server response headers reveal the web server version, which could help attackers identify known vulnerabilities.",
      location: url,
      remediation: "Configure the web server to suppress version information in response headers. Remove or obfuscate the Server header.",
    },
  ];

  // Randomly select 3-6 vulnerabilities
  const count = Math.floor(Math.random() * 4) + 3;
  return vulnerabilities.slice(0, count);
};
