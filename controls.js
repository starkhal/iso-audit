// ISO 27002:2022 — Organizational (5), People (6), Physical (7) controls
// Questions reverse-engineered from the typical audit evidence for each control,
// grounded in the AFKLM "NEW ISMS" document (sections 5, 6, 7).
// Each question is a yes/no/partial/na item. "weight" lets critical items count more.
// A control is conformant when its weighted score >= passThreshold (default 0.8).

const CONTROLS = [
  // ============ SECTION 5 — ORGANIZATIONAL ============
  {
    id: "5-1", section: 5, title: "Policies for information security",
    intent: "A documented, approved information security policy exists, is communicated, and is reviewed regularly.",
    questions: [
      { id: "5-1-q1", text: "Is there a documented information security policy that has been formally approved by senior management / the board?", weight: 2 },
      { id: "5-1-q2", text: "Has the policy been published and communicated to all staff, contractors and relevant third parties?", weight: 1 },
      { id: "5-1-q3", text: "Is the policy reviewed at planned intervals (e.g. annually) and after significant changes?", weight: 1 },
      { id: "5-1-q4", text: "Does the policy define information security objectives and assign roles/responsibilities (e.g. management, CISO, employees)?", weight: 1 },
      { id: "5-1-q5", text: "Is there a documented process for approving and recording exceptions/deviations from the policy?", weight: 1 },
    ],
  },
  {
    id: "5-2", section: 5, title: "Information security roles and responsibilities",
    intent: "Security roles and responsibilities are defined, documented and allocated, including in job descriptions.",
    questions: [
      { id: "5-2-q1", text: "Are information security responsibilities defined and documented (e.g. in job descriptions or role profiles)?", weight: 2 },
      { id: "5-2-q2", text: "Have sensitive/security-relevant positions been identified, with specific recruitment or vetting criteria?", weight: 1 },
      { id: "5-2-q3", text: "Is there a defined process (involving HR, Legal, IT/Security) to validate and approve security roles?", weight: 1 },
      { id: "5-2-q4", text: "Are roles and responsibilities reviewed and updated when business or regulatory changes occur?", weight: 1 },
    ],
  },
  {
    id: "5-3", section: 5, title: "Segregation of duties",
    intent: "Conflicting duties and areas of responsibility are segregated to reduce risk of misuse.",
    questions: [
      { id: "5-3-q1", text: "Have conflicting duties (e.g. development vs. production, request vs. approval) been identified?", weight: 2 },
      { id: "5-3-q2", text: "Are these conflicting duties segregated between different people, so no single person controls a whole critical process?", weight: 2 },
      { id: "5-3-q3", text: "Is least-privilege access enforced so each actor only has the authorizations needed for their tasks?", weight: 1 },
      { id: "5-3-q4", text: "Where full segregation isn't possible, are compensating controls (logging, monitoring, dual authorization) in place?", weight: 1 },
    ],
  },
  {
    id: "5-4", section: 5, title: "Management responsibilities",
    intent: "Management requires all personnel and third parties to apply security per established policies.",
    questions: [
      { id: "5-4-q1", text: "Does management formally require employees, contractors and third parties to follow security policies?", weight: 2 },
      { id: "5-4-q2", text: "Are new joiners and third parties briefed by line management on their security responsibilities?", weight: 1 },
      { id: "5-4-q3", text: "Are staff provided with the means/awareness training to meet the policy requirements?", weight: 1 },
      { id: "5-4-q4", text: "Does management drive continuous improvement using incident and audit findings?", weight: 1 },
    ],
  },
  {
    id: "5-5", section: 5, title: "Contact with authorities",
    intent: "Appropriate contacts with relevant authorities are established and maintained.",
    questions: [
      { id: "5-5-q1", text: "Have the relevant authorities (regulators, national CERT/security authority, sector bodies) been identified?", weight: 2 },
      { id: "5-5-q2", text: "Are contacts with these authorities documented with named responsible parties?", weight: 1 },
      { id: "5-5-q3", text: "Is there a defined procedure for contacting/reporting to authorities during a security incident?", weight: 2 },
      { id: "5-5-q4", text: "Are these contacts reviewed and kept up to date periodically?", weight: 1 },
    ],
  },
  {
    id: "5-6", section: 5, title: "Contact with special interest groups",
    intent: "Contacts with security forums and professional associations are maintained.",
    questions: [
      { id: "5-6-q1", text: "Does the organization participate in relevant security interest groups, forums or ISACs?", weight: 1 },
      { id: "5-6-q2", text: "Is participation used to receive early warnings, advisories and best practices?", weight: 1 },
      { id: "5-6-q3", text: "Is there a named owner (e.g. CISO) responsible for maintaining these memberships?", weight: 1 },
    ],
  },
  {
    id: "5-7", section: 5, title: "Threat intelligence",
    intent: "Threat information is collected, analyzed and used to inform protective measures.",
    questions: [
      { id: "5-7-q1", text: "Is threat intelligence collected from credible sources (government, industry, vendors)?", weight: 2 },
      { id: "5-7-q2", text: "Is the intelligence analyzed (strategic / tactical / operational) and turned into actionable measures?", weight: 1 },
      { id: "5-7-q3", text: "Are findings fed back into risk assessments and the risk treatment plan?", weight: 1 },
      { id: "5-7-q4", text: "Is the threat intelligence process reviewed and updated regularly?", weight: 1 },
    ],
  },
  {
    id: "5-8", section: 5, title: "Information security in project management",
    intent: "Security is integrated into project management throughout the lifecycle.",
    questions: [
      { id: "5-8-q1", text: "Is a security risk assessment performed at project initiation and throughout the project lifecycle?", weight: 2 },
      { id: "5-8-q2", text: "Are security requirements defined and formally approved by the business owner for new/changed systems?", weight: 1 },
      { id: "5-8-q3", text: "Do high-risk projects undergo security review/testing before deployment?", weight: 1 },
      { id: "5-8-q4", text: "Are residual risks formally accepted before go-live?", weight: 1 },
    ],
  },
  {
    id: "5-9", section: 5, title: "Inventory of information and other associated assets",
    intent: "An accurate, up-to-date asset inventory with assigned owners is maintained.",
    questions: [
      { id: "5-9-q1", text: "Is there a maintained inventory of information and associated assets (physical, digital, cloud)?", weight: 2 },
      { id: "5-9-q2", text: "Does every asset have an assigned owner?", weight: 2 },
      { id: "5-9-q3", text: "Is the inventory reviewed and updated at planned intervals (e.g. yearly)?", weight: 1 },
      { id: "5-9-q4", text: "Are assets classified and protected according to their criticality?", weight: 1 },
    ],
  },
  {
    id: "5-10", section: 5, title: "Acceptable use of information and other associated assets",
    intent: "Rules for acceptable use and handling of assets are defined, documented and implemented.",
    questions: [
      { id: "5-10-q1", text: "Is there a documented acceptable use policy for information and assets?", weight: 2 },
      { id: "5-10-q2", text: "Have the acceptable use rules been communicated to all users (staff, contractors, third parties)?", weight: 1 },
      { id: "5-10-q3", text: "Are handling rules differentiated by classification level?", weight: 1 },
      { id: "5-10-q4", text: "Where live data is used for testing, is it authorized and protected (e.g. anonymized) and securely erased afterwards?", weight: 1 },
    ],
  },
  {
    id: "5-11", section: 5, title: "Return of assets",
    intent: "All organizational assets are returned upon termination or change of employment/contract.",
    questions: [
      { id: "5-11-q1", text: "Is there a documented process to recover all assets when employment/contract ends or changes?", weight: 2 },
      { id: "5-11-q2", text: "Is asset return verified against the asset inventory and recorded (e.g. signed return sheet)?", weight: 1 },
      { id: "5-11-q3", text: "Is organizational data securely erased from personally-owned or purchased equipment?", weight: 1 },
    ],
  },
  {
    id: "5-12", section: 5, title: "Classification of information",
    intent: "Information is classified by value, legal/regulatory needs, sensitivity and criticality.",
    questions: [
      { id: "5-12-q1", text: "Is there a documented classification scheme (e.g. levels for confidentiality/integrity/availability)?", weight: 2 },
      { id: "5-12-q2", text: "Is classification applied consistently across all departments?", weight: 1 },
      { id: "5-12-q3", text: "Is the asset owner accountable for classifying their information?", weight: 1 },
      { id: "5-12-q4", text: "Are the highest classification levels restricted to authorized approvers?", weight: 1 },
    ],
  },
  {
    id: "5-13", section: 5, title: "Labelling of information",
    intent: "Procedures for labelling information per the classification scheme are implemented.",
    questions: [
      { id: "5-13-q1", text: "Are there documented procedures for labelling information according to the classification scheme?", weight: 2 },
      { id: "5-13-q2", text: "Do information assets carry a label (physical or digital) indicating ownership/classification?", weight: 1 },
      { id: "5-13-q3", text: "Are handling procedures defined for each classification level?", weight: 1 },
    ],
  },
  {
    id: "5-14", section: 5, title: "Information transfer",
    intent: "Information is protected during transfer within and outside the organization.",
    questions: [
      { id: "5-14-q1", text: "Are transfer rules/agreements defined for electronic, physical and verbal information transfer?", weight: 2 },
      { id: "5-14-q2", text: "Is data encrypted in transit using approved secure protocols (e.g. TLS)?", weight: 2 },
      { id: "5-14-q3", text: "Are integrity controls (e.g. checksums, digital signatures) used where appropriate?", weight: 1 },
      { id: "5-14-q4", text: "Are staff made aware of the risks of unintended verbal/visual disclosure (calls, public areas, meetings)?", weight: 1 },
    ],
  },
  {
    id: "5-15", section: 5, title: "Access control",
    intent: "Access is granted on least-privilege using defined rules (RBAC/ABAC) and monitored.",
    questions: [
      { id: "5-15-q1", text: "Is there a documented access control policy based on least privilege and need-to-know?", weight: 2 },
      { id: "5-15-q2", text: "Is there a formal request/approval process before access is granted?", weight: 2 },
      { id: "5-15-q3", text: "Is access revoked promptly when no longer needed (role change, departure, system retirement)?", weight: 2 },
      { id: "5-15-q4", text: "Are access rights reviewed periodically?", weight: 1 },
      { id: "5-15-q5", text: "Are access activities logged and monitored for anomalies?", weight: 1 },
    ],
  },
  {
    id: "5-16", section: 5, title: "Identity management",
    intent: "Identities are managed through their full lifecycle with unique IDs.",
    questions: [
      { id: "5-16-q1", text: "Does each actor (human and non-human) have a unique identity managed centrally?", weight: 2 },
      { id: "5-16-q2", text: "Are there documented processes for creating, updating and deactivating accounts?", weight: 2 },
      { id: "5-16-q3", text: "Are account lifecycle actions logged for audit?", weight: 1 },
      { id: "5-16-q4", text: "Are identities and their permissions reviewed periodically?", weight: 1 },
    ],
  },
  {
    id: "5-17", section: 5, title: "Authentication information",
    intent: "Authentication information is protected, and strong authentication is enforced.",
    questions: [
      { id: "5-17-q1", text: "Is multi-factor authentication enforced for privileged accounts and critical systems?", weight: 2 },
      { id: "5-17-q2", text: "Are credentials stored securely (e.g. salted hashing, encryption — never plaintext or hardcoded)?", weight: 2 },
      { id: "5-17-q3", text: "Is there a strong password policy (complexity, reuse restrictions) aligned with recognized best practice?", weight: 1 },
      { id: "5-17-q4", text: "Is there a secure password reset/recovery process requiring identity verification?", weight: 1 },
    ],
  },
  {
    id: "5-18", section: 5, title: "Access rights",
    intent: "Access rights are provisioned, reviewed and revoked under a structured framework.",
    questions: [
      { id: "5-18-q1", text: "Are access rights granted based on documented roles and business need (RBAC)?", weight: 2 },
      { id: "5-18-q2", text: "Are periodic access reviews/recertifications conducted for all actors?", weight: 2 },
      { id: "5-18-q3", text: "Is privileged access managed and monitored (e.g. PAM, separate admin accounts)?", weight: 2 },
      { id: "5-18-q4", text: "Are break-glass/emergency accounts controlled and used only with formal approval?", weight: 1 },
    ],
  },
  {
    id: "5-19", section: 5, title: "Information security in supplier relationships",
    intent: "Supplier relationships are governed by agreements with security requirements.",
    questions: [
      { id: "5-19-q1", text: "Do suppliers with access to information sign agreements defining security responsibilities?", weight: 2 },
      { id: "5-19-q2", text: "Is supplier due diligence performed before onboarding (e.g. certifications, audit reports)?", weight: 1 },
      { id: "5-19-q3", text: "Is supplier security compliance reviewed periodically (e.g. annually)?", weight: 1 },
      { id: "5-19-q4", text: "Do agreements define incident reporting obligations and the right to audit?", weight: 1 },
    ],
  },
  {
    id: "5-20", section: 5, title: "Addressing information security in supplier agreements",
    intent: "Supplier agreements include all relevant security requirements.",
    questions: [
      { id: "5-20-q1", text: "Do supplier contracts include defined minimum security requirements (encryption, access control, etc.)?", weight: 2 },
      { id: "5-20-q2", text: "Do contracts cover compliance with applicable laws/standards, incident reporting and right to audit?", weight: 1 },
      { id: "5-20-q3", text: "Do contracts define data retention, return and secure deletion on termination?", weight: 1 },
      { id: "5-20-q4", text: "Are roles for contract responsibility/administration and security advice clearly assigned?", weight: 1 },
    ],
  },
  {
    id: "5-21", section: 5, title: "Managing information security in the ICT supply chain",
    intent: "Security risks across the ICT supply chain are managed.",
    questions: [
      { id: "5-21-q1", text: "Is a risk assessment performed before engaging ICT suppliers?", weight: 2 },
      { id: "5-21-q2", text: "Do contracts address incident reporting, access control, monitoring and consequences for non-compliance?", weight: 1 },
      { id: "5-21-q3", text: "Is third-party security compliance monitored continuously and reviewed at least annually?", weight: 1 },
      { id: "5-21-q4", text: "Do third parties performing production interventions require formal prior authorization?", weight: 1 },
    ],
  },
  {
    id: "5-22", section: 5, title: "Monitoring, review and change management of supplier services",
    intent: "Changes to supplier services are monitored, reviewed and managed.",
    questions: [
      { id: "5-22-q1", text: "Are changes to supplier services and critical systems reviewed and tested before deployment?", weight: 2 },
      { id: "5-22-q2", text: "Are supplier service levels and security controls monitored on an ongoing basis?", weight: 1 },
      { id: "5-22-q3", text: "Is there a shared responsibility model agreed with suppliers (esp. cloud)?", weight: 1 },
      { id: "5-22-q4", text: "Are modifications to vendor-supplied software controlled and documented?", weight: 1 },
    ],
  },
  {
    id: "5-23", section: 5, title: "Information security for use of cloud services",
    intent: "A framework governs the secure use of cloud services across their lifecycle.",
    questions: [
      { id: "5-23-q1", text: "Are security requirements defined for selecting and using cloud services?", weight: 2 },
      { id: "5-23-q2", text: "Are roles/responsibilities documented in a shared responsibility model with the provider?", weight: 1 },
      { id: "5-23-q3", text: "Are provider security assurances obtained and reviewed (e.g. ISO 27001 or equivalent)?", weight: 1 },
      { id: "5-23-q4", text: "Is there a defined exit strategy ensuring secure data return or deletion?", weight: 1 },
    ],
  },
  {
    id: "5-24", section: 5, title: "Information security incident management planning and preparation",
    intent: "A structured incident management process with roles and responsibilities is established.",
    questions: [
      { id: "5-24-q1", text: "Is there a documented incident management process with defined roles and responsibilities?", weight: 2 },
      { id: "5-24-q2", text: "Are staff trained on their incident response roles?", weight: 1 },
      { id: "5-24-q3", text: "Are regulatory/contractual reporting obligations integrated into the process?", weight: 1 },
      { id: "5-24-q4", text: "Are response capabilities tested (e.g. drills, simulations) and improved over time?", weight: 1 },
    ],
  },
  {
    id: "5-25", section: 5, title: "Assessment and decision on information security events",
    intent: "Events are assessed, categorized and prioritized to decide if they are incidents.",
    questions: [
      { id: "5-25-q1", text: "Are there documented criteria to assess and categorize security events?", weight: 2 },
      { id: "5-25-q2", text: "Are detected events logged and triaged (e.g. false positive, minor event, potential incident)?", weight: 1 },
      { id: "5-25-q3", text: "Is there a defined escalation path when an event is classified as a potential incident?", weight: 1 },
      { id: "5-25-q4", text: "Are assessment criteria reviewed and refined periodically?", weight: 1 },
    ],
  },
  {
    id: "5-26", section: 5, title: "Response to information security incidents",
    intent: "Incidents are responded to per documented procedures.",
    questions: [
      { id: "5-26-q1", text: "Is there a documented response procedure covering containment, eradication and recovery?", weight: 2 },
      { id: "5-26-q2", text: "Can staff report incidents through a standardized channel/form?", weight: 1 },
      { id: "5-26-q3", text: "Are response activities logged and incidents documented for audit/compliance?", weight: 1 },
      { id: "5-26-q4", text: "Are escalation and external communication responsibilities defined (incl. regulators where required)?", weight: 1 },
    ],
  },
  {
    id: "5-27", section: 5, title: "Learning from information security incidents",
    intent: "Lessons learned are captured and applied to improve controls.",
    questions: [
      { id: "5-27-q1", text: "Is a post-incident review (lessons learned / root-cause analysis) conducted after major incidents?", weight: 2 },
      { id: "5-27-q2", text: "Are improvement actions documented and tracked to completion?", weight: 1 },
      { id: "5-27-q3", text: "Are findings shared with relevant stakeholders and fed into risk assessments?", weight: 1 },
    ],
  },
  {
    id: "5-28", section: 5, title: "Collection of evidence",
    intent: "Evidence is collected and preserved in a forensically sound manner.",
    questions: [
      { id: "5-28-q1", text: "Is there a documented process for collecting and preserving evidence (incl. chain of custody)?", weight: 2 },
      { id: "5-28-q2", text: "Are trained personnel and appropriate forensic tools/methods used?", weight: 1 },
      { id: "5-28-q3", text: "Does evidence handling comply with applicable legal and regulatory requirements?", weight: 1 },
    ],
  },
  {
    id: "5-29", section: 5, title: "Information security during disruption",
    intent: "Security controls remain effective during disruptive events.",
    questions: [
      { id: "5-29-q1", text: "Are security requirements embedded in business continuity and disaster recovery plans?", weight: 2 },
      { id: "5-29-q2", text: "Are access control and authentication maintained during disruptions?", weight: 1 },
      { id: "5-29-q3", text: "Is IT/security infrastructure designed with redundancy, failover and secure backups?", weight: 1 },
      { id: "5-29-q4", text: "Are disruption scenarios exercised so staff know how to act?", weight: 1 },
    ],
  },
  {
    id: "5-30", section: 5, title: "ICT readiness for business continuity",
    intent: "ICT continuity and recovery capabilities are planned, tested and maintained.",
    questions: [
      { id: "5-30-q1", text: "Is there a business continuity / IT continuity / disaster recovery framework with RTOs and RPOs?", weight: 2 },
      { id: "5-30-q2", text: "Is a Business Impact Analysis performed to prioritize critical processes and systems?", weight: 1 },
      { id: "5-30-q3", text: "Are backups maintained, geographically separated, and tested at least annually?", weight: 2 },
      { id: "5-30-q4", text: "Are continuity/recovery plans tested regularly with follow-up actions documented?", weight: 1 },
    ],
  },
  {
    id: "5-31", section: 5, title: "Legal, statutory, regulatory and contractual requirements",
    intent: "Applicable requirements are identified, documented and kept up to date.",
    questions: [
      { id: "5-31-q1", text: "Is there a maintained register of applicable legal, regulatory and contractual requirements?", weight: 2 },
      { id: "5-31-q2", text: "Are responsibilities for meeting each requirement clearly assigned?", weight: 1 },
      { id: "5-31-q3", text: "Is the register reviewed and updated to reflect changing obligations?", weight: 1 },
    ],
  },
  {
    id: "5-32", section: 5, title: "Intellectual property rights",
    intent: "Compliance with IP rights, incl. software licensing, is ensured.",
    questions: [
      { id: "5-32-q1", text: "Is there a procedure to ensure software is properly licensed and used per vendor agreements?", weight: 2 },
      { id: "5-32-q2", text: "Are periodic audits conducted to verify licensing/copyright compliance?", weight: 1 },
      { id: "5-32-q3", text: "Are staff made aware of IP obligations and the consequences of misuse?", weight: 1 },
    ],
  },
  {
    id: "5-33", section: 5, title: "Protection of records",
    intent: "Records are protected from loss, destruction and falsification per requirements.",
    questions: [
      { id: "5-33-q1", text: "Are record types identified with defined retention periods and storage media?", weight: 2 },
      { id: "5-33-q2", text: "Are controls in place to protect records from loss, destruction and falsification?", weight: 1 },
      { id: "5-33-q3", text: "Is personal data retained no longer than necessary, in line with privacy law?", weight: 1 },
    ],
  },
  {
    id: "5-34", section: 5, title: "Privacy and protection of PII",
    intent: "Personal data is protected in line with GDPR and applicable privacy laws.",
    questions: [
      { id: "5-34-q1", text: "Are responsibilities for privacy assigned (e.g. DPO / privacy officers / legal)?", weight: 2 },
      { id: "5-34-q2", text: "Are Data Protection Impact Assessments (DPIA/DTIA) performed for high-risk processing?", weight: 1 },
      { id: "5-34-q3", text: "Is there a breach notification process meeting required timeframes (e.g. 72h under GDPR)?", weight: 2 },
      { id: "5-34-q4", text: "Are processes in place for data subjects to exercise their rights (access, erasure, etc.)?", weight: 1 },
      { id: "5-34-q5", text: "Are cross-border data transfers assessed with appropriate safeguards?", weight: 1 },
    ],
  },
  {
    id: "5-35", section: 5, title: "Independent review of information security",
    intent: "The ISMS is independently reviewed at planned intervals or after major changes.",
    questions: [
      { id: "5-35-q1", text: "Are independent reviews/audits of the ISMS conducted at planned intervals?", weight: 2 },
      { id: "5-35-q2", text: "Are reviewers independent of the activities they audit?", weight: 1 },
      { id: "5-35-q3", text: "Are findings reported to management and corrective actions tracked?", weight: 1 },
    ],
  },
  {
    id: "5-36", section: 5, title: "Compliance with policies, rules and standards",
    intent: "Compliance with security policies and standards is regularly checked.",
    questions: [
      { id: "5-36-q1", text: "Are managers accountable for compliance with security policies in their area?", weight: 1 },
      { id: "5-36-q2", text: "Are systems checked regularly for compliance with security standards (incl. technical checks)?", weight: 2 },
      { id: "5-36-q3", text: "Are non-compliances recorded and corrective actions reviewed by management?", weight: 1 },
    ],
  },
  {
    id: "5-37", section: 5, title: "Documented operating procedures",
    intent: "Operating procedures are documented, maintained and available to those who need them.",
    questions: [
      { id: "5-37-q1", text: "Are operating procedures documented for key IT activities (backup, restore, incident handling, maintenance, etc.)?", weight: 2 },
      { id: "5-37-q2", text: "Are responsibilities assigned for creating, reviewing and updating these procedures?", weight: 1 },
      { id: "5-37-q3", text: "Are procedures stored securely and available to authorized personnel?", weight: 1 },
    ],
  },

  // ============ SECTION 6 — PEOPLE ============
  {
    id: "6-1", section: 6, title: "Screening",
    intent: "Background verification checks are performed per laws, regulations and ethics.",
    questions: [
      { id: "6-1-q1", text: "Are background verification checks performed on candidates before employment?", weight: 2 },
      { id: "6-1-q2", text: "Is screening depth scaled to the sensitivity of the role (standard / enhanced / strict)?", weight: 1 },
      { id: "6-1-q3", text: "Is periodic re-screening performed for sensitive roles?", weight: 1 },
      { id: "6-1-q4", text: "Is candidate consent obtained and screening data handled per privacy law?", weight: 1 },
    ],
  },
  {
    id: "6-2", section: 6, title: "Terms and conditions of employment",
    intent: "Employment terms state information security responsibilities.",
    questions: [
      { id: "6-2-q1", text: "Do employment contracts/terms explicitly state information security responsibilities?", weight: 2 },
      { id: "6-2-q2", text: "Do they include confidentiality obligations and consequences of breaches?", weight: 1 },
      { id: "6-2-q3", text: "Do they apply to contractors and third-party personnel as relevant?", weight: 1 },
    ],
  },
  {
    id: "6-3", section: 6, title: "Information security awareness, education and training",
    intent: "Staff receive appropriate awareness, education and training.",
    questions: [
      { id: "6-3-q1", text: "Do all staff receive security awareness training at onboarding?", weight: 2 },
      { id: "6-3-q2", text: "Are there regular refreshers (e.g. annual) and updates when threats change?", weight: 1 },
      { id: "6-3-q3", text: "Is role-based training provided (e.g. secure coding for developers, privacy for HR)?", weight: 1 },
      { id: "6-3-q4", text: "Is training effectiveness measured (completion rates, phishing simulations, quizzes)?", weight: 1 },
    ],
  },
  {
    id: "6-4", section: 6, title: "Disciplinary process",
    intent: "A fair, documented process handles security policy violations.",
    questions: [
      { id: "6-4-q1", text: "Is there a documented disciplinary process for security policy violations?", weight: 2 },
      { id: "6-4-q2", text: "Is it communicated to staff and applied fairly and consistently?", weight: 1 },
      { id: "6-4-q3", text: "Does it align with labor laws and involve defined roles (HR, Legal, Security)?", weight: 1 },
    ],
  },
  {
    id: "6-5", section: 6, title: "Responsibilities after termination or change of employment",
    intent: "Security responsibilities, access and assets are managed on termination/change.",
    questions: [
      { id: "6-5-q1", text: "Is access promptly revoked or adjusted when employment ends or changes?", weight: 2 },
      { id: "6-5-q2", text: "Are assets returned and confidentiality obligations enforced after departure?", weight: 1 },
      { id: "6-5-q3", text: "On role change, is access (incl. privileged) reassessed and duties securely transferred?", weight: 1 },
    ],
  },
  {
    id: "6-6", section: 6, title: "Confidentiality or non-disclosure agreements",
    intent: "NDAs are in place for those handling sensitive information.",
    questions: [
      { id: "6-6-q1", text: "Are confidentiality/NDA agreements signed by staff and third parties with access to sensitive data?", weight: 2 },
      { id: "6-6-q2", text: "Do NDAs define what is confidential and remain in effect beyond the relationship?", weight: 1 },
      { id: "6-6-q3", text: "Are NDAs reviewed by legal and are breaches addressed?", weight: 1 },
    ],
  },
  {
    id: "6-7", section: 6, title: "Remote working",
    intent: "Security measures protect information during remote working.",
    questions: [
      { id: "6-7-q1", text: "Is MFA required for remote access to organizational systems?", weight: 2 },
      { id: "6-7-q2", text: "Are remote-access devices required to meet security policy (encryption, anti-malware, compliance checks)?", weight: 1 },
      { id: "6-7-q3", text: "Is least-privilege access enforced for remote workers?", weight: 1 },
      { id: "6-7-q4", text: "Are remote-access sessions logged and monitored for anomalies?", weight: 1 },
    ],
  },
  {
    id: "6-8", section: 6, title: "Information security event reporting",
    intent: "Security events (incl. lost/stolen devices) are reported in a timely manner.",
    questions: [
      { id: "6-8-q1", text: "Is there a defined channel for staff to report security events promptly?", weight: 2 },
      { id: "6-8-q2", text: "Are staff trained to recognize and report security events, incl. lost/stolen devices?", weight: 1 },
      { id: "6-8-q3", text: "Does reporting align with regulatory breach-notification obligations (e.g. NIS2, GDPR)?", weight: 1 },
      { id: "6-8-q4", text: "Is a confidential reporting channel available where possible?", weight: 1 },
    ],
  },

  // ============ SECTION 7 — PHYSICAL ============
  {
    id: "7-1", section: 7, title: "Physical security perimeters",
    intent: "Physical perimeters protect IT infrastructure and sensitive assets.",
    questions: [
      { id: "7-1-q1", text: "Are physical security perimeters defined around facilities holding sensitive/IT assets?", weight: 2 },
      { id: "7-1-q2", text: "Are areas classified (e.g. critical / work / public) with security measures matched to each?", weight: 1 },
      { id: "7-1-q3", text: "Are data centers/IT rooms protected with layered controls (badges, biometrics, CCTV)?", weight: 1 },
      { id: "7-1-q4", text: "Are perimeters reviewed periodically, including for outsourced/partner facilities?", weight: 1 },
    ],
  },
  {
    id: "7-2", section: 7, title: "Physical entry",
    intent: "Secure areas are protected by appropriate entry controls.",
    questions: [
      { id: "7-2-q1", text: "Is access to secure areas restricted to authorized personnel, granted on least privilege?", weight: 2 },
      { id: "7-2-q2", text: "Are visitors registered, identified, badged and escorted in restricted areas?", weight: 1 },
      { id: "7-2-q3", text: "Are access lists reviewed regularly (e.g. monthly) and unnecessary access revoked?", weight: 1 },
      { id: "7-2-q4", text: "Are entry/access logs maintained and reviewed for anomalies?", weight: 1 },
    ],
  },
  {
    id: "7-3", section: 7, title: "Securing offices, rooms and facilities",
    intent: "Physical security controls protect offices, rooms and facilities.",
    questions: [
      { id: "7-3-q1", text: "Are offices/rooms holding sensitive information physically secured (locks, cabinets, safes)?", weight: 2 },
      { id: "7-3-q2", text: "Are secure areas designed to limit visibility of their purpose and contents?", weight: 1 },
      { id: "7-3-q3", text: "Are intruder detection systems installed and tested where appropriate?", weight: 1 },
      { id: "7-3-q4", text: "Are hazardous/flammable materials kept away from critical areas?", weight: 1 },
    ],
  },
  {
    id: "7-4", section: 7, title: "Physical security monitoring",
    intent: "Critical areas are monitored to detect unauthorized access and threats.",
    questions: [
      { id: "7-4-q1", text: "Are critical areas monitored (e.g. CCTV, alarms, patrols) proportionate to risk?", weight: 2 },
      { id: "7-4-q2", text: "Are monitoring systems tested, maintained and reviewed for effectiveness?", weight: 1 },
      { id: "7-4-q3", text: "Is surveillance data protected, access-logged, and retained per legal requirements?", weight: 1 },
      { id: "7-4-q4", text: "Is there a process to investigate and respond to alarms/alerts?", weight: 1 },
    ],
  },
  {
    id: "7-5", section: 7, title: "Protecting against physical and environmental threats",
    intent: "Protection against fire, flood, and other environmental/man-made threats.",
    questions: [
      { id: "7-5-q1", text: "Are environmental risks (fire, flood, seismic, etc.) assessed for facilities?", weight: 2 },
      { id: "7-5-q2", text: "Are fire detection and suppression systems installed, tested and maintained?", weight: 2 },
      { id: "7-5-q3", text: "Are water/leak detection and evacuation measures in place for critical rooms?", weight: 1 },
      { id: "7-5-q4", text: "Are regular inspections (e.g. thermographic) and housekeeping performed?", weight: 1 },
    ],
  },
  {
    id: "7-6", section: 7, title: "Working in secure areas",
    intent: "Measures and rules govern working within secure areas.",
    questions: [
      { id: "7-6-q1", text: "Is access to secure areas limited to authorized personnel based on need?", weight: 2 },
      { id: "7-6-q2", text: "Are unauthorized personnel supervised at all times in secure areas?", weight: 1 },
      { id: "7-6-q3", text: "Is use of recording/personal devices restricted unless authorized?", weight: 1 },
      { id: "7-6-q4", text: "Are activities in secure areas logged and reviewed?", weight: 1 },
    ],
  },
  {
    id: "7-7", section: 7, title: "Clear desk and clear screen",
    intent: "Clear desk and clear screen rules are adopted and enforced.",
    questions: [
      { id: "7-7-q1", text: "Is there a clear desk policy requiring sensitive papers/media to be secured when unattended?", weight: 2 },
      { id: "7-7-q2", text: "Is automatic screen locking enforced after a period of inactivity?", weight: 1 },
      { id: "7-7-q3", text: "Are sensitive documents removed from printers promptly and securely disposed of?", weight: 1 },
      { id: "7-7-q4", text: "Are staff trained on clear desk/screen, with compliance reviewed?", weight: 1 },
    ],
  },
  {
    id: "7-8", section: 7, title: "Equipment siting and protection",
    intent: "Equipment is sited/protected to reduce environmental and access risks.",
    questions: [
      { id: "7-8-q1", text: "Is environmental/access risk considered when siting equipment and facilities?", weight: 2 },
      { id: "7-8-q2", text: "Is sensitive equipment kept out of high-risk locations (e.g. basements, top floors) where applicable?", weight: 1 },
      { id: "7-8-q3", text: "Is critical equipment distributed/redundant to reduce impact of localized disasters?", weight: 1 },
    ],
  },
  {
    id: "7-9", section: 7, title: "Security of assets off-premises",
    intent: "Off-site equipment is protected with documented measures.",
    questions: [
      { id: "7-9-q1", text: "Are there documented rules for protecting equipment used or transported off-site?", weight: 2 },
      { id: "7-9-q2", text: "Is off-site equipment encrypted and access-protected (strong auth, least privilege)?", weight: 2 },
      { id: "7-9-q3", text: "Is equipment never left unattended in public places, with staff accountable for it?", weight: 1 },
      { id: "7-9-q4", text: "Is sensitive equipment taken off-site recorded in a register and updated on return?", weight: 1 },
    ],
  },
  {
    id: "7-10", section: 7, title: "Storage media",
    intent: "Storage media is managed and disposed/reused securely across its lifecycle.",
    questions: [
      { id: "7-10-q1", text: "Are there documented procedures for managing removable media (incl. encryption)?", weight: 2 },
      { id: "7-10-q2", text: "Is data securely removed or media destroyed before disposal/reuse (not just standard delete)?", weight: 2 },
      { id: "7-10-q3", text: "Is media securely stored, access-controlled and transported with accountability?", weight: 1 },
      { id: "7-10-q4", text: "Are disposal logs/certificates of destruction maintained?", weight: 1 },
    ],
  },
  {
    id: "7-11", section: 7, title: "Supporting utilities",
    intent: "Equipment is protected from utility failures (power, cooling, telecoms).",
    questions: [
      { id: "7-11-q1", text: "Is critical equipment protected against power failure (e.g. UPS, redundant feeds)?", weight: 2 },
      { id: "7-11-q2", text: "Are backup generators available and tested for prolonged outages where applicable?", weight: 1 },
      { id: "7-11-q3", text: "Are environmental controls (air-conditioning, temperature alarms) in place for critical areas?", weight: 1 },
      { id: "7-11-q4", text: "Are telecommunications links protected and, for critical equipment, redundant?", weight: 1 },
    ],
  },
  {
    id: "7-12", section: 7, title: "Cabling security",
    intent: "Power and telecom cabling is protected from interception and damage.",
    questions: [
      { id: "7-12-q1", text: "Is cabling protected from interception and damage (e.g. underground/protected routes, locked rooms)?", weight: 2 },
      { id: "7-12-q2", text: "Are power and communication cables segregated to prevent interference?", weight: 1 },
      { id: "7-12-q3", text: "Is cabling routed away from public areas and environmental hazards (e.g. water pipes)?", weight: 1 },
    ],
  },
  {
    id: "7-13", section: 7, title: "Equipment maintenance",
    intent: "Equipment is maintained to ensure availability, integrity and reliability.",
    questions: [
      { id: "7-13-q1", text: "Is equipment maintained per supplier instructions and documented procedures?", weight: 2 },
      { id: "7-13-q2", text: "Is maintenance performed only by authorized/qualified personnel, with access controlled?", weight: 1 },
      { id: "7-13-q3", text: "Are maintenance activities logged and logs reviewed for anomalies?", weight: 1 },
      { id: "7-13-q4", text: "Is data protected during maintenance (e.g. when systems are offline or parts replaced)?", weight: 1 },
    ],
  },
  {
    id: "7-14", section: 7, title: "Secure disposal or re-use of equipment",
    intent: "Equipment with storage media is verified clean before disposal or reuse.",
    questions: [
      { id: "7-14-q1", text: "Is all equipment containing storage media checked to remove/overwrite sensitive data before disposal/reuse?", weight: 2 },
      { id: "7-14-q2", text: "Are storage devices physically destroyed or rendered unreadable (not standard delete)?", weight: 2 },
      { id: "7-14-q3", text: "Are disposal/reuse activities logged and an inventory of disposed equipment maintained?", weight: 1 },
      { id: "7-14-q4", text: "Is owner approval required to destroy Secret/Confidential information?", weight: 1 },
    ],
  },
];

const SECTION_META = {
  5: { name: "Organizational controls", iso: "ISO 27002:2022 — Clause 5" },
  6: { name: "People controls", iso: "ISO 27002:2022 — Clause 6" },
  7: { name: "Physical controls", iso: "ISO 27002:2022 — Clause 7" },
};

/* ---------------- state ---------------- */
const STORE = {}; // questionId -> 'yes'|'no'|'part'|'na'
const openCards = new Set(); // ctrl ids currently expanded
let activeSection = 5;

const SCORE = { yes: 1, part: 0.5, no: 0, na: null };
const PASS = 0.8;

/* ---------------- scoring ---------------- */
function controlResult(ctrl) {
  let got = 0, max = 0, answered = 0, naCount = 0;
  const gaps = []; // {text, type:'no'|'part'}
  ctrl.questions.forEach(q => {
    const a = STORE[q.id];
    if (!a) return;
    answered++;
    if (a === 'na') { naCount++; return; }
    got += SCORE[a] * q.weight;
    max += q.weight;
    if (a === 'no') gaps.push({ text: q.text, type: 'no' });
    else if (a === 'part') gaps.push({ text: q.text, type: 'part' });
  });
  const scored = answered - naCount;
  const pct = max > 0 ? got / max : null;
  let status = 'pending';
  if (answered === 0) status = 'pending';
  else if (scored === 0) status = 'na';
  else if (pct >= PASS) status = 'ok';
  else if (pct > 0) status = 'part';
  else status = 'no';
  return { status, pct, gaps, answered, total: ctrl.questions.length, naCount };
}

function overall() {
  let done = 0, totalQ = 0;
  CONTROLS.forEach(c => {
    totalQ += c.questions.length;
    c.questions.forEach(q => { if (STORE[q.id]) done++; });
  });
  return { done, totalQ, ratio: totalQ ? done / totalQ : 0 };
}

/* ---------------- render: tabs ---------------- */
function renderTabs() {
  const tabs = document.getElementById('tabs');
  tabs.innerHTML = '';
  [5, 6, 7].forEach(s => {
    const inSec = CONTROLS.filter(c => c.section === s);
    let answered = 0;
    inSec.forEach(c => c.questions.forEach(q => { if (STORE[q.id]) answered++; }));
    let totalQ = 0;
    inSec.forEach(c => totalQ += c.questions.length);
    const t = document.createElement('button');
    t.className = 'tab' + (s === activeSection ? ' active' : '');
    t.innerHTML = `<b>Clause ${s}</b> · ${SECTION_META[s].name} <span class="pill">${answered}/${totalQ}</span>`;
    t.onclick = () => {
      activeSection = s;
      renderTabs();
      renderControls();
      window.scrollTo({ top: document.getElementById('tabs').offsetTop - 60 });
    };
    tabs.appendChild(t);
  });
}

/* ---------------- render: controls ---------------- */
function renderControls() {
  const host = document.getElementById('controls');
  host.innerHTML = '';
  CONTROLS.filter(c => c.section === activeSection).forEach(ctrl => {
    const r = controlResult(ctrl);
    const card = document.createElement('div');
    card.className = 'ctrl' + (openCards.has(ctrl.id) ? ' open' : '');
    card.id = 'ctrl-' + ctrl.id;

    const badgeText = { pending: 'Not answered', ok: 'Conformant', no: 'Non-conformant', part: 'Partial', na: 'N/A' }[r.status];
    const head = document.createElement('div');
    head.className = 'ctrl-head';
    head.innerHTML = `
      <span class="cid">${ctrl.id.replace('-', '.')}</span>
      <div class="ctrl-meta">
        <h3>${ctrl.title}</h3>
        <p>${ctrl.intent}</p>
      </div>
      <div class="ctrl-status">
        <span class="badge ${r.status}">${badgeText}</span>
        <span class="chev">▶</span>
      </div>`;
    head.onclick = (e) => {
      if (e.target.closest('.opt')) return;
      card.classList.toggle('open');
      if (card.classList.contains('open')) openCards.add(ctrl.id);
      else openCards.delete(ctrl.id);
    };
    card.appendChild(head);

    const body = document.createElement('div');
    body.className = 'ctrl-body';
    ctrl.questions.forEach(q => {
      const row = document.createElement('div');
      row.className = 'q';
      const sel = STORE[q.id];
      const wlabel = q.weight > 1 ? `<span class="w">key</span>` : '';
      row.innerHTML = `<div class="q-text">${q.text}${wlabel}</div>`;
      const opts = document.createElement('div');
      opts.className = 'opts';
      [['yes', 'Yes'], ['part', 'Partial'], ['no', 'No'], ['na', 'N/A']].forEach(([val, lbl]) => {
        const b = document.createElement('button');
        b.className = 'opt' + (sel === val ? ' sel-' + val : '');
        b.textContent = lbl;
        b.setAttribute('aria-pressed', sel === val);
        b.onclick = () => { STORE[q.id] = (STORE[q.id] === val ? undefined : val); refresh(); };
        opts.appendChild(b);
      });
      row.appendChild(opts);
      body.appendChild(row);
    });
    card.appendChild(body);
    host.appendChild(card);
  });
}

/* ---------------- render: report ---------------- */
function renderReport() {
  const host = document.getElementById('report');
  const results = CONTROLS.map(c => ({ c, r: controlResult(c) }));
  const ok = results.filter(x => x.r.status === 'ok').length;
  const part = results.filter(x => x.r.status === 'part').length;
  const no = results.filter(x => x.r.status === 'no').length;
  const na = results.filter(x => x.r.status === 'na').length;
  const pending = results.filter(x => x.r.status === 'pending').length;
  const assessed = ok + part + no;
  const confPct = assessed ? Math.round(ok / assessed * 100) : 0;

  let html = `
    <div class="report-head">
      <h2>Conformance results</h2>
      <p>${assessed} of ${CONTROLS.length} controls assessed · ${na} marked N/A · ${pending} still unanswered.</p>
    </div>
    <div class="scorecards">
      <div class="score ok"><div class="n">${ok}</div><div class="l">Conformant</div></div>
      <div class="score part"><div class="n">${part}</div><div class="l">Partial</div></div>
      <div class="score no"><div class="n">${no}</div><div class="l">Non-conformant</div></div>
      <div class="score"><div class="n">${confPct}%</div><div class="l">Conformance rate</div></div>
    </div>`;

  if (assessed === 0 && na === 0) {
    html += `<div class="empty">No answers yet. Go back and complete the questionnaire to generate your report.</div>`;
    host.innerHTML = html;
    return;
  }

  [5, 6, 7].forEach(s => {
    const rows = results.filter(x => x.c.section === s && x.r.status !== 'pending');
    if (!rows.length) return;
    html += `<div class="rsec">Clause ${s} · ${SECTION_META[s].name}</div>`;
    const order = { no: 0, part: 1, na: 2, ok: 3 };
    rows.sort((a, b) => order[a.r.status] - order[b.r.status] || a.c.id.localeCompare(b.c.id, undefined, { numeric: true }));
    rows.forEach(({ c, r }) => {
      const pct = r.pct == null ? null : Math.round(r.pct * 100);
      const barColor = r.status === 'ok' ? 'var(--ok)' : r.status === 'part' ? 'var(--accent)' : r.status === 'na' ? 'var(--na)' : 'var(--no)';
      html += `<div class="rrow">
        <div class="rrow-head">
          <span class="cid">${c.id.replace('-', '.')}</span>
          <span class="t">${c.title}</span>
          ${pct == null ? '<span class="pct">N/A</span>' :
          `<span class="bar"><i style="width:${pct}%;background:${barColor}"></i></span><span class="pct">${pct}%</span>`}
          <span class="badge ${r.status}">${{ ok: 'Conformant', no: 'Non-conformant', part: 'Partial', na: 'N/A' }[r.status]}</span>
        </div>`;
      if (r.gaps.length) {
        const nos = r.gaps.filter(g => g.type === 'no');
        const parts = r.gaps.filter(g => g.type === 'part');
        html += `<div class="gaps">`;
        if (nos.length) {
          html += `<div class="lab" style="color:var(--no)">Not in place</div><ul>`;
          nos.forEach(g => html += `<li><span class="mk"><i class="dot no"></i></span>${g.text}</li>`);
          html += `</ul>`;
        }
        if (parts.length) {
          html += `<div class="lab" style="color:var(--accent)">Partially in place</div><ul>`;
          parts.forEach(g => html += `<li><span class="mk"><i class="dot part"></i></span>${g.text}</li>`);
          html += `</ul>`;
        }
        html += `</div>`;
      } else if (r.status === 'ok') {
        html += `<div class="nogaps">✓ All in-scope points satisfied.</div>`;
      } else if (r.status === 'na') {
        html += `<div class="nogaps" style="color:var(--na)">Marked entirely out of scope.</div>`;
      }
      html += `</div>`;
    });
  });

  html += `<div style="margin:30px 0"><button class="btn" id="btnBack">← Back to questionnaire</button></div>`;
  host.innerHTML = html;
  document.getElementById('btnBack').onclick = showAssess;
}

/* ---------------- view switching ---------------- */
function showReport() {
  document.getElementById('assess').style.display = 'none';
  document.getElementById('report').style.display = 'block';
  renderReport();
  window.scrollTo({ top: 0 });
}

function showAssess() {
  document.getElementById('report').style.display = 'none';
  document.getElementById('assess').style.display = 'block';
  window.scrollTo({ top: 0 });
}

/* ---------------- refresh ---------------- */
function refresh() {
  renderTabs();
  renderControls();
  const o = overall();
  document.getElementById('meterFill').style.right = (100 - o.ratio * 100) + '%';
}

/* ---------------- init ---------------- */
document.getElementById('btnReport').onclick = showReport;
document.getElementById('btnReset').onclick = () => {
  if (confirm('Clear all answers?')) { for (const k in STORE) delete STORE[k]; refresh(); }
};
renderTabs();
renderControls();
document.getElementById('meterFill').style.right = '100%';
