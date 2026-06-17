// ============================================================================
// CLAUSE 8 — TECHNOLOGICAL CONTROLS (34 controls)
// ----------------------------------------------------------------------------
// Audience: technical respondent (IT / security). Questions are calibrated to
// the evidence a technical auditor would request — more precise than clauses 5/6/7.
// Same object shape as the existing CONTROLS entries: { id, section, title,
// intent, questions:[{ id, text, weight }] }.
//
// HOW TO INTEGRATE (give this to Claude Code):
//  1. These 34 objects belong in the SAME `CONTROLS` array, appended after 7-14.
//  2. Add section 8 to SECTION_META:
//       8: { name: "Technological controls", iso: "ISO 27002:2022 — Clause 8" }
//  3. The tab loop in renderTabs() iterates [5,6,7] — change it to [5,6,7,8].
//  4. The report loop in renderReport() also iterates [5,6,7] — change to [5,6,7,8].
//  Nothing else changes: scoring, weights ("key" = weight 2), Yes/Partial/No/N/A,
//  and the 80% conformance threshold all work identically.
// ============================================================================

const CONTROLS_CLAUSE_8 = [
  {
    id: "8-1", section: 8, title: "User endpoint devices",
    intent: "Endpoint devices accessing organizational data are securely configured, managed and protected.",
    questions: [
      { id: "8-1-q1", text: "Are endpoint devices centrally managed and enforced to a defined secure baseline (e.g. via MDM/UEM)?", weight: 2 },
      { id: "8-1-q2", text: "Is endpoint protection deployed (anti-malware, EDR/IDS-IPS) on devices accessing organizational data?", weight: 2 },
      { id: "8-1-q3", text: "Is disk encryption enforced on endpoints (data-at-rest), and data-in-transit encrypted?", weight: 1 },
      { id: "8-1-q4", text: "Are conditional/contextual access policies applied (device compliance, location, MFA) before granting access?", weight: 1 },
      { id: "8-1-q5", text: "Are BYOD and contractor devices subject to defined, approved security conditions before access?", weight: 1 },
    ],
  },
  {
    id: "8-2", section: 8, title: "Privileged access rights",
    intent: "Allocation and use of privileged access is restricted, controlled, monitored and audited.",
    questions: [
      { id: "8-2-q1", text: "Is privileged access granted only through a formal authorization process (owner approval, least privilege)?", weight: 2 },
      { id: "8-2-q2", text: "Is MFA enforced for all privileged accounts, human and non-human?", weight: 2 },
      { id: "8-2-q3", text: "Are privileged accounts reviewed periodically (e.g. at least monthly) and de-provisioned promptly on change/departure?", weight: 2 },
      { id: "8-2-q4", text: "Are all privileged actions (requests, approvals, usage) logged and monitored, with alerts on anomalies?", weight: 1 },
      { id: "8-2-q5", text: "Do service/technical accounts have identified owners and are they not shared with human users?", weight: 1 },
    ],
  },
  {
    id: "8-3", section: 8, title: "Information access restriction",
    intent: "Access to information and application functions is restricted per the access control policy.",
    questions: [
      { id: "8-3-q1", text: "Is access denied by default and granted only on explicit authorization from the information/data owner?", weight: 2 },
      { id: "8-3-q2", text: "Are technical isolation mechanisms used (ACLs, firewall rules, segmentation, whitelisting, MDM/VDI)?", weight: 1 },
      { id: "8-3-q3", text: "Are access attempts logged and reviewed for anomalies?", weight: 1 },
      { id: "8-3-q4", text: "Are inactive access rights revoked promptly (e.g. within one month)?", weight: 1 },
    ],
  },
  {
    id: "8-4", section: 8, title: "Access to source code",
    intent: "Access to source code and build/config files is restricted, controlled and logged.",
    questions: [
      { id: "8-4-q1", text: "Is source code held in a version control system with strict, role-based access control?", weight: 2 },
      { id: "8-4-q2", text: "Are changes peer-reviewed and approved before merge to production-ready branches?", weight: 2 },
      { id: "8-4-q3", text: "Are development, test and production environments isolated, with developers lacking direct production access?", weight: 1 },
      { id: "8-4-q4", text: "Are access and modifications to source code logged, monitored and protected from tampering?", weight: 1 },
      { id: "8-4-q5", text: "Are source code repositories backed up with integrity checks, and restores tested?", weight: 1 },
    ],
  },
  {
    id: "8-5", section: 8, title: "Secure authentication",
    intent: "Secure authentication technologies and procedures are implemented based on access restrictions.",
    questions: [
      { id: "8-5-q1", text: "Is MFA (or equivalent strength) enforced for human, non-human and privileged accounts?", weight: 2 },
      { id: "8-5-q2", text: "Where passwords are used, do they follow recognized best practice (e.g. NIST) and are they hashed+salted?", weight: 1 },
      { id: "8-5-q3", text: "Is adaptive/contextual authentication applied (location, device health, behavior, time)?", weight: 1 },
      { id: "8-5-q4", text: "Do non-human actors use strong credentials (certificates, API keys) rather than shared/generic ones?", weight: 1 },
      { id: "8-5-q5", text: "Are authentication events logged, with alerts on repeated failures or anomalies?", weight: 1 },
    ],
  },
  {
    id: "8-6", section: 8, title: "Capacity management",
    intent: "Resource use is monitored and tuned, with projections of future capacity needs.",
    questions: [
      { id: "8-6-q1", text: "Is resource utilization (storage, network, compute) continuously monitored and logged?", weight: 2 },
      { id: "8-6-q2", text: "Is capacity planning performed using historical trends and demand projections (incl. autoscaling where relevant)?", weight: 1 },
      { id: "8-6-q3", text: "Are capacity-related SLAs defined and compliance reviewed?", weight: 1 },
      { id: "8-6-q4", text: "Are capacity planning processes reviewed periodically and improved?", weight: 1 },
    ],
  },
  {
    id: "8-7", section: 8, title: "Protection against malware",
    intent: "Detection, prevention and recovery controls protect against malware, plus user awareness.",
    questions: [
      { id: "8-7-q1", text: "Is real-time anti-malware/endpoint protection deployed across endpoints, servers and relevant systems?", weight: 2 },
      { id: "8-7-q2", text: "Is malware detection integrated with centralized monitoring (e.g. SIEM) and threat intelligence?", weight: 1 },
      { id: "8-7-q3", text: "Is patch management in place to keep systems current against known vulnerabilities?", weight: 2 },
      { id: "8-7-q4", text: "Are users given awareness on recognizing and reporting malware threats?", weight: 1 },
      { id: "8-7-q5", text: "Are malware protection mechanisms periodically tested and validated?", weight: 1 },
    ],
  },
  {
    id: "8-8", section: 8, title: "Management of technical vulnerabilities",
    intent: "Technical vulnerabilities are identified, assessed, prioritized and remediated in defined timeframes.",
    questions: [
      { id: "8-8-q1", text: "Are systems regularly scanned for vulnerabilities using automated tools?", weight: 2 },
      { id: "8-8-q2", text: "Are vulnerabilities risk-prioritized and remediated within defined SLAs (e.g. critical within set timeframes)?", weight: 2 },
      { id: "8-8-q3", text: "Is risk-based penetration testing performed periodically?", weight: 1 },
      { id: "8-8-q4", text: "Is remediation verified and documented, with exceptions formally approved (e.g. by CISO)?", weight: 1 },
    ],
  },
  {
    id: "8-9", section: 8, title: "Configuration management",
    intent: "Hardware, software, services and networks are configured securely and consistently.",
    questions: [
      { id: "8-9-q1", text: "Are secure configuration baselines / hardening standards defined for systems, networks and applications?", weight: 2 },
      { id: "8-9-q2", text: "Are configuration changes authorized, documented and version-controlled?", weight: 1 },
      { id: "8-9-q3", text: "Are configurations monitored for drift from approved baselines, with alerts/remediation?", weight: 2 },
      { id: "8-9-q4", text: "Are configuration changes tested and validated before deployment?", weight: 1 },
    ],
  },
  {
    id: "8-10", section: 8, title: "Information deletion",
    intent: "Information is securely deleted when no longer required, and deletion is verified.",
    questions: [
      { id: "8-10-q1", text: "Are secure deletion methods used (wiping, cryptographic erasure, overwriting, destruction) per media/sensitivity?", weight: 2 },
      { id: "8-10-q2", text: "Is deletion integrated into data lifecycle/retention policies (incl. GDPR right to erasure)?", weight: 1 },
      { id: "8-10-q3", text: "Are deletion activities logged and periodically verified for effectiveness?", weight: 1 },
      { id: "8-10-q4", text: "Do suppliers/processors apply equivalent deletion measures per contract?", weight: 1 },
    ],
  },
  {
    id: "8-11", section: 8, title: "Data masking",
    intent: "Masking, pseudonymization and anonymization protect sensitive data from exposure.",
    questions: [
      { id: "8-11-q1", text: "Is sensitive data masked, pseudonymized or anonymized in non-production/exposed contexts (e.g. test, analytics)?", weight: 2 },
      { id: "8-11-q2", text: "Is the masking/anonymization approach aligned with regulatory requirements (e.g. GDPR)?", weight: 1 },
      { id: "8-11-q3", text: "Is the effectiveness of these techniques tested and documented, with access logged?", weight: 1 },
    ],
  },
  {
    id: "8-12", section: 8, title: "Data leakage prevention",
    intent: "DLP measures protect sensitive information from unauthorized exfiltration or exposure.",
    questions: [
      { id: "8-12-q1", text: "Are DLP controls deployed across endpoints, network and cloud to detect/block unauthorized data transfers?", weight: 2 },
      { id: "8-12-q2", text: "Is data classified so DLP rules can be applied according to sensitivity?", weight: 1 },
      { id: "8-12-q3", text: "Are potential leakage events logged, alerted on, and investigated?", weight: 1 },
      { id: "8-12-q4", text: "Is DLP effectiveness regularly reviewed and policies updated?", weight: 1 },
    ],
  },
  {
    id: "8-13", section: 8, title: "Information backup",
    intent: "Backups of information, software and configurations are created, protected and tested.",
    questions: [
      { id: "8-13-q1", text: "Are backups performed on a defined schedule matching data criticality (e.g. daily for critical data)?", weight: 2 },
      { id: "8-13-q2", text: "Are backups encrypted (in transit and at rest) and protected by access controls + MFA?", weight: 2 },
      { id: "8-13-q3", text: "Are immutable and/or offsite/air-gapped copies maintained for critical data?", weight: 1 },
      { id: "8-13-q4", text: "Are restores tested regularly and results documented, incl. malware scanning of backups?", weight: 2 },
      { id: "8-13-q5", text: "Are retention periods defined and backup systems protected from clock tampering?", weight: 1 },
    ],
  },
  {
    id: "8-14", section: 8, title: "Redundancy of information processing facilities",
    intent: "Critical processing facilities have redundancy to meet availability requirements.",
    questions: [
      { id: "8-14-q1", text: "Are systems requiring redundancy identified by availability classification, with RTO/RPO defined?", weight: 2 },
      { id: "8-14-q2", text: "Are redundancy mechanisms implemented (clustering, failover, redundant links, UPS/generators)?", weight: 2 },
      { id: "8-14-q3", text: "Are redundancy mechanisms tested regularly and aligned with DR/BC plans?", weight: 1 },
      { id: "8-14-q4", text: "Do cloud deployments use redundancy (multi-region/availability zones) verified against requirements?", weight: 1 },
    ],
  },
  {
    id: "8-15", section: 8, title: "Logging",
    intent: "Logs of activities, exceptions and events are produced, protected and retained.",
    questions: [
      { id: "8-15-q1", text: "Are security-relevant events logged across networks, systems, applications and endpoints?", weight: 2 },
      { id: "8-15-q2", text: "Are logs protected against tampering and unauthorized access/deletion (incl. by admins)?", weight: 2 },
      { id: "8-15-q3", text: "Are logs centralized, time-synchronized, and retained for a defined period (e.g. 6–12 months)?", weight: 1 },
      { id: "8-15-q4", text: "Are logs reviewed by personnel independent of the monitored activity?", weight: 1 },
      { id: "8-15-q5", text: "Are administrator and operator activities logged?", weight: 1 },
    ],
  },
  {
    id: "8-16", section: 8, title: "Monitoring activities",
    intent: "Networks, systems and applications are monitored in real time for anomalies and incidents.",
    questions: [
      { id: "8-16-q1", text: "Is continuous real-time monitoring in place across systems, networks, endpoints and cloud?", weight: 2 },
      { id: "8-16-q2", text: "Is monitoring data fed into a SIEM with analytics/anomaly detection to generate alerts?", weight: 2 },
      { id: "8-16-q3", text: "Is monitoring integrated with incident response so alerts trigger timely action?", weight: 1 },
      { id: "8-16-q4", text: "Is monitoring data protected (integrity, restricted access) and reviewed regularly?", weight: 1 },
    ],
  },
  {
    id: "8-17", section: 8, title: "Clock synchronization",
    intent: "System clocks are synchronized to an approved accurate time source.",
    questions: [
      { id: "8-17-q1", text: "Are clocks of systems and logging devices synchronized to a reliable source (e.g. NTP/PTP/UTC)?", weight: 2 },
      { id: "8-17-q2", text: "Is the ability to change system clocks restricted to authorized admins and logged?", weight: 1 },
      { id: "8-17-q3", text: "Are time-sync failures/drift monitored and alerted on?", weight: 1 },
    ],
  },
  {
    id: "8-18", section: 8, title: "Use of privileged utility programs",
    intent: "Use of utility programs that can override controls is restricted and monitored.",
    questions: [
      { id: "8-18-q1", text: "Is use of privileged utility programs restricted to authorized roles and explicitly approved?", weight: 2 },
      { id: "8-18-q2", text: "Is their use logged and monitored, with alerts on unauthorized attempts?", weight: 1 },
      { id: "8-18-q3", text: "Are unnecessary privileged utilities removed/disabled to reduce attack surface?", weight: 1 },
    ],
  },
  {
    id: "8-19", section: 8, title: "Installation of software on operational systems",
    intent: "Software installation on operational systems is controlled and authorized.",
    questions: [
      { id: "8-19-q1", text: "Is software installed on operational systems only after formal approval (change management) and testing?", weight: 2 },
      { id: "8-19-q2", text: "Is installation restricted to authorized IT personnel / suppliers (normal users cannot install freely)?", weight: 2 },
      { id: "8-19-q3", text: "Is a list of approved software maintained, with installations logged and audited?", weight: 1 },
      { id: "8-19-q4", text: "Are technical controls (e.g. application whitelisting) used to block unauthorized software?", weight: 1 },
    ],
  },
  {
    id: "8-20", section: 8, title: "Networks security",
    intent: "Networks and network devices are secured, managed and controlled.",
    questions: [
      { id: "8-20-q1", text: "Are networks secured with defined policies, access controls and authentication (not implicit trust)?", weight: 2 },
      { id: "8-20-q2", text: "Is network traffic monitored in real time for anomalies and unauthorized access?", weight: 1 },
      { id: "8-20-q3", text: "Is network traffic encrypted (incl. internal east-west where applicable)?", weight: 1 },
      { id: "8-20-q4", text: "Are network security controls tested and validated regularly?", weight: 1 },
    ],
  },
  {
    id: "8-21", section: 8, title: "Security of network services",
    intent: "Security requirements for network services are defined, monitored and enforced.",
    questions: [
      { id: "8-21-q1", text: "Are minimum security requirements defined for all network services (encryption, auth, segmentation)?", weight: 2 },
      { id: "8-21-q2", text: "Are network service providers assessed before contracting and reviewed periodically?", weight: 1 },
      { id: "8-21-q3", text: "Is data in transit encrypted end-to-end across network services?", weight: 1 },
      { id: "8-21-q4", text: "Are network service activities logged centrally with defined incident response procedures?", weight: 1 },
    ],
  },
  {
    id: "8-22", section: 8, title: "Segregation of networks",
    intent: "Groups of services, users and systems are segregated on networks.",
    questions: [
      { id: "8-22-q1", text: "Are networks segmented into zones (e.g. production, test, dev, admin) with controlled inter-zone access?", weight: 2 },
      { id: "8-22-q2", text: "Are firewalls/VLANs/ACLs (and micro-segmentation where relevant) used to restrict lateral movement?", weight: 2 },
      { id: "8-22-q3", text: "Is third-party/vendor access isolated under the same segmentation policies?", weight: 1 },
      { id: "8-22-q4", text: "Is segmentation effectiveness reviewed/tested (e.g. via penetration testing)?", weight: 1 },
    ],
  },
  {
    id: "8-23", section: 8, title: "Web filtering",
    intent: "Access to external websites is controlled to reduce exposure to malicious content.",
    questions: [
      { id: "8-23-q1", text: "Is web filtering in place to block malicious, phishing and unauthorized sites (e.g. SWG/proxy/DNS filtering)?", weight: 2 },
      { id: "8-23-q2", text: "Is web traffic logged and monitored, with filtering extended to remote/mobile users?", weight: 1 },
      { id: "8-23-q3", text: "Is there a formal approval/exception process and periodic review of filtering policies?", weight: 1 },
    ],
  },
  {
    id: "8-24", section: 8, title: "Use of cryptography",
    intent: "Rules for cryptography and key management are defined and implemented.",
    questions: [
      { id: "8-24-q1", text: "Is there a cryptography policy defining approved algorithms and where encryption is required?", weight: 2 },
      { id: "8-24-q2", text: "Is data encrypted at rest and in transit using approved standards?", weight: 2 },
      { id: "8-24-q3", text: "Is there a key management process (generation, storage, rotation, revocation, destruction)?", weight: 2 },
      { id: "8-24-q4", text: "Are cryptographic practices reviewed/audited and updated against emerging vulnerabilities?", weight: 1 },
    ],
  },
  {
    id: "8-25", section: 8, title: "Secure development lifecycle",
    intent: "Rules for secure development of software and systems are defined and applied.",
    questions: [
      { id: "8-25-q1", text: "Is security integrated across the SDLC (requirements, design, build, test, deploy, maintain)?", weight: 2 },
      { id: "8-25-q2", text: "Are development, test and production environments separated and controlled?", weight: 1 },
      { id: "8-25-q3", text: "Are secure development standards (e.g. OWASP, NIST, ISO/IEC 27034) referenced and followed?", weight: 1 },
      { id: "8-25-q4", text: "Do outsourced developers contractually adhere to the same secure development rules?", weight: 1 },
    ],
  },
  {
    id: "8-26", section: 8, title: "Application security requirements",
    intent: "Security requirements are identified and approved when developing or acquiring applications.",
    questions: [
      { id: "8-26-q1", text: "Are application security requirements defined and approved at design/purchase based on risk and regulation?", weight: 2 },
      { id: "8-26-q2", text: "Do they cover access control (RBAC, least privilege, MFA) and secure API/integration?", weight: 1 },
      { id: "8-26-q3", text: "Is security testing (SAST/DAST/pen test) performed before and after deployment?", weight: 1 },
      { id: "8-26-q4", text: "For purchased apps, are security criteria and clauses included in supplier selection/contracts?", weight: 1 },
    ],
  },
  {
    id: "8-27", section: 8, title: "Secure system architecture and engineering principles",
    intent: "Secure engineering principles are established and applied across the system lifecycle.",
    questions: [
      { id: "8-27-q1", text: "Are secure-by-design / secure-by-default principles documented and applied (e.g. Zero Trust, defense in depth)?", weight: 2 },
      { id: "8-27-q2", text: "Are recognized frameworks (ISO/IEC 27034, OWASP, NIST) used to define security controls in architecture?", weight: 1 },
      { id: "8-27-q3", text: "Are segmentation, least-privilege and hardening embedded in system design?", weight: 1 },
      { id: "8-27-q4", text: "Are architectures reviewed (security reviews, threat modeling, testing) before and during operation?", weight: 1 },
    ],
  },
  {
    id: "8-28", section: 8, title: "Secure coding",
    intent: "Secure coding principles are applied to software development.",
    questions: [
      { id: "8-28-q1", text: "Are secure coding standards adopted (e.g. OWASP, NIST SSDF, ISO/IEC 27034)?", weight: 2 },
      { id: "8-28-q2", text: "Do developers receive secure coding training?", weight: 1 },
      { id: "8-28-q3", text: "Are SAST/DAST and software composition analysis used to detect vulnerabilities in code and dependencies?", weight: 2 },
      { id: "8-28-q4", text: "Are input/output validation and code reviews performed before deploying to production?", weight: 1 },
    ],
  },
  {
    id: "8-29", section: 8, title: "Security testing in development and acceptance",
    intent: "Security testing is integrated into development and acceptance before deployment.",
    questions: [
      { id: "8-29-q1", text: "Is security testing performed at multiple SDLC stages (design, dev, test, deploy)?", weight: 2 },
      { id: "8-29-q2", text: "Are SAST, DAST and/or penetration testing used against defined security requirements?", weight: 2 },
      { id: "8-29-q3", text: "Are security acceptance criteria defined, with identified vulnerabilities resolved before go-live?", weight: 1 },
      { id: "8-29-q4", text: "Is security testing automated within DevSecOps/CI-CD pipelines where applicable?", weight: 1 },
    ],
  },
  {
    id: "8-30", section: 8, title: "Outsourced development",
    intent: "Outsourced development adheres to secure development requirements and is monitored.",
    questions: [
      { id: "8-30-q1", text: "Do outsourced development contracts mandate secure development standards and compliance obligations?", weight: 2 },
      { id: "8-30-q2", text: "Is supplier security posture assessed via due diligence before engagement?", weight: 1 },
      { id: "8-30-q3", text: "Is externally developed software security-tested (SAST/DAST/pen test) before acceptance?", weight: 2 },
      { id: "8-30-q4", text: "Is outsourced development activity monitored, with incident reporting obligations defined?", weight: 1 },
    ],
  },
  {
    id: "8-31", section: 8, title: "Separation of development, test and production environments",
    intent: "Development, test and production environments are separated.",
    questions: [
      { id: "8-31-q1", text: "Are development, test and production environments physically/logically separated?", weight: 2 },
      { id: "8-31-q2", text: "Do developers/testers lack direct access to production (access approved and logged when needed)?", weight: 2 },
      { id: "8-31-q3", text: "Is real production data kept out of test environments unless masked/anonymized and authorized?", weight: 1 },
      { id: "8-31-q4", text: "Is cross-environment access restricted, justified, temporary and logged?", weight: 1 },
    ],
  },
  {
    id: "8-32", section: 8, title: "Change management",
    intent: "Changes to systems and applications are formally controlled.",
    questions: [
      { id: "8-32-q1", text: "Do changes follow a documented process (assessment, approval, testing, deployment, rollback, review)?", weight: 2 },
      { id: "8-32-q2", text: "Are changes risk-assessed and authorized by relevant stakeholders (incl. security for sensitive changes)?", weight: 2 },
      { id: "8-32-q3", text: "Are changes tested in a separate environment before production?", weight: 1 },
      { id: "8-32-q4", text: "Are rollback plans documented and changes logged and version-controlled?", weight: 1 },
    ],
  },
  {
    id: "8-33", section: 8, title: "Test information",
    intent: "Test information is selected, protected and managed to prevent exposure.",
    questions: [
      { id: "8-33-q1", text: "Is synthetic or masked/anonymized data used for testing rather than raw production data?", weight: 2 },
      { id: "8-33-q2", text: "When production data is used, does it keep the same security classification and controls as production?", weight: 2 },
      { id: "8-33-q3", text: "Is access to test data restricted to authorized personnel and its usage logged?", weight: 1 },
      { id: "8-33-q4", text: "Is production-sourced test data securely deleted after testing?", weight: 1 },
    ],
  },
  {
    id: "8-34", section: 8, title: "Protection of information systems during audit testing",
    intent: "Audit and testing activities are controlled to avoid disrupting systems or exposing data.",
    questions: [
      { id: "8-34-q1", text: "Are audit/test activities pre-approved by the CISO and system owners, with a risk assessment beforehand?", weight: 2 },
      { id: "8-34-q2", text: "Is testing performed in isolated environments where possible, or read-only on production with data masked?", weight: 1 },
      { id: "8-34-q3", text: "Is access during audits/tests time-bound, logged and monitored?", weight: 1 },
      { id: "8-34-q4", text: "Is a rollback plan in place and system stability/security verified after the activity?", weight: 1 },
    ],
  },
];