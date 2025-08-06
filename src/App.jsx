import React, { useState, useMemo } from "react";
import {
  Download,
  Clock,
  DollarSign,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  AlertTriangle,
  CheckCircle,
  Server,
  Shield,
  Database,
} from "lucide-react";

const App = () => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const securityControls = [
    // SECRETS MANAGEMENT
    {
      id: 1,
      category: "Secrets Management",
      control: "Ensure secrets are stored securely with access control protection",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 18000,
      costMonthly: 3500,
      costJustification: "AWS Secrets Manager, AWS Systems Manager Parameter Store, setup costs (₹18,000 one-time)",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research AWS Secrets Manager pricing and features (2h)",
            "Setup AWS Secrets Manager in AP-South-1 region (2h)",
            "Configure IAM policies and roles for secret access (2h)",
            "Create service role for Django application (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Install boto3 and AWS SDK in Django (1h)",
            "Create AWS Secrets Manager client configuration (2h)",
            "Update Django settings for secrets integration (2h)",
            "Create helper functions for secret retrieval (2h)",
            "Write unit tests for secret management (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Migrate database passwords to Secrets Manager (2h)",
            "Migrate API keys and tokens to Secrets Manager (2h)",
            "Update environment configuration (1h)",
            "Test application with AWS Secrets Manager (2h)",
            "Create secret rotation procedures using Lambda (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Deploy to staging EC2 environment (2h)",
            "Perform integration testing (3h)",
            "Create documentation and runbooks (2h)",
            "Deploy to production EC2 instances (1h)",
          ],
        },
      ],
    },
    {
      id: 2,
      category: "Secrets Management",
      control: "Ensure access to secrets are accorded least privilege",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with IAM roles",
      dailyBreakdown: [],
    },
    {
      id: 3,
      category: "Secrets Management",
      control: "Ensure secrets used in production are not reused in non-production",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with separate AWS accounts",
      dailyBreakdown: [],
    },
    {
      id: 4,
      category: "Secrets Management",
      control: "Perform source code review to ensure secrets are not hardcoded",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 6000,
      costMonthly: 800,
      costJustification: "git-secrets, TruffleHog setup, CodeCommit hooks, developer training",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup git-secrets and TruffleHog for secret scanning (2h)",
            "Scan entire codebase in CodeCommit for hardcoded secrets (3h)",
            "Create list of found secrets and remediation plan (2h)",
            "Update .gitignore and pre-commit hooks (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Remove hardcoded secrets from codebase (4h)",
            "Update code to use AWS Secrets Manager/Parameter Store (2h)",
            "Configure automated secret scanning in CodeBuild (1h)",
            "Document secret management guidelines (1h)",
          ],
        },
      ],
    },

    // VULNERABILITY MANAGEMENT
    {
      id: 5,
      category: "Vulnerability Management",
      control: "Vulnerability management processes in place",
      currentStatus: "No",
      totalDays: 5,
      totalHours: 40,
      costOneTime: 25000,
      costMonthly: 6000,
      costJustification: "AWS Inspector, AWS Security Hub, third-party scanning tools (Qualys/Rapid7)",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research vulnerability scanning tools for AWS (2h)",
            "Setup AWS Inspector for EC2 and ECR vulnerability assessment (3h)",
            "Configure AWS Security Hub as central dashboard (2h)",
            "Integrate with existing CloudWatch monitoring (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Install dependency scanning tools (Snyk, npm audit, safety) (2h)",
            "Configure OWASP Dependency Check in CodeBuild (2h)",
            "Setup automated vulnerability tracking in Security Hub (2h)",
            "Create vulnerability database using RDS (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Run initial comprehensive vulnerability scan on EC2 instances (2h)",
            "Analyze and categorize findings by severity in Security Hub (3h)",
            "Create prioritized remediation roadmap (2h)",
            "Setup automated scanning schedule using EventBridge (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Remediate critical vulnerabilities using Systems Manager Patch Manager (6h)",
            "Update packages and dependencies on EC2 instances (2h)",
          ],
        },
        {
          day: 5,
          hours: 8,
          tasks: [
            "Remediate high-priority vulnerabilities (4h)",
            "Create vulnerability management SOP (2h)",
            "Setup SNS alerting and notification system (1h)",
            "Train development team on AWS security processes (1h)",
          ],
        },
      ],
    },
    {
      id: 6,
      category: "Vulnerability Management",
      control: "Security testing (VA/PT) before commissioning",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 120000,
      costMonthly: 0,
      costJustification: "External penetration testing service (₹80-120K), AWS security assessment tools",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research and select penetration testing vendor familiar with AWS (3h)",
            "Prepare AWS environment for testing with proper IAM permissions (2h)",
            "Create testing scope document including EC2, RDS, S3 buckets (2h)",
            "Setup dedicated VPC and security groups for testing (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Coordinate with external pen testing team (2h)",
            "Monitor testing progress and provide AWS access (2h)",
            "Conduct internal vulnerability assessment using AWS tools (4h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Review penetration testing report thoroughly (3h)",
            "Prioritize findings and create detailed remediation plan (3h)",
            "Begin fixing critical and high-priority AWS security issues (2h)",
          ],
        },
      ],
    },
    {
      id: 7,
      category: "Vulnerability Management",
      control: "Remediate findings from security testing rated medium and above",
      currentStatus: "No",
      totalDays: 7,
      totalHours: 56,
      costOneTime: 15000,
      costMonthly: 2000,
      costJustification: "Developer time for fixes, AWS security tools, ongoing monitoring costs",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Categorize all medium+ findings by impact and effort (2h)",
            "Create detailed remediation plan with AWS service timelines (2h)",
            "Setup tracking system using AWS Systems Manager Compliance (2h)",
            "Begin fixing critical SQL injection vulnerabilities in RDS (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Continue fixing critical vulnerabilities in Django application (6h)",
            "Test fixes in development EC2 environment (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Fix high-priority XSS vulnerabilities in React frontend (5h)",
            "Implement input validation and sanitization (2h)",
            "Update React components with security headers (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Fix authentication and session management issues (4h)",
            "Implement proper password hashing with bcrypt (2h)",
            "Update Django authentication middleware (2h)",
          ],
        },
        {
          day: 5,
          hours: 8,
          tasks: [
            "Fix medium-priority findings (5h)",
            "Update error handling to prevent information disclosure (2h)",
            "Implement security headers using Application Load Balancer (1h)",
          ],
        },
        {
          day: 6,
          hours: 8,
          tasks: [
            "Comprehensive testing of all fixes (4h)",
            "Security regression testing (2h)",
            "Update documentation in S3/GitHub (2h)",
          ],
        },
        {
          day: 7,
          hours: 8,
          tasks: [
            "Deploy fixes to staging EC2 Auto Scaling Group (2h)",
            "Final security validation testing (3h)",
            "Deploy to production with CloudWatch monitoring (2h)",
            "Update security baseline documentation (1h)",
          ],
        },
      ],
    },
    {
      id: 8,
      category: "Vulnerability Management",
      control: "Security configurations hardened based on approved standards",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 12000,
      costMonthly: 2500,
      costJustification: "AWS Config rules, Systems Manager compliance, hardening automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research security hardening standards (CIS AWS Benchmarks, AWS Security Best Practices) (2h)",
            "Create security configuration baseline using AWS Config (3h)",
            "Develop hardening scripts using Systems Manager Run Command (2h)",
            "Test hardening on staging EC2 instances (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement OS-level security hardening on EC2 instances (4h)",
            "Configure application security settings in Elastic Beanstalk (2h)",
            "Setup configuration compliance monitoring with AWS Config (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Configure security groups and NACLs hardening (3h)",
            "Implement S3 bucket security hardening (2h)",
            "Setup RDS security hardening and encryption (2h)",
            "Test security group configurations (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Validate all security configurations with AWS Config Rules (3h)",
            "Create configuration management procedures (2h)",
            "Document security baseline and procedures (2h)",
            "Schedule regular compliance checks using AWS Config (1h)",
          ],
        },
      ],
    },
    {
      id: 9,
      category: "Vulnerability Management",
      control: "System Security Acceptance Test (SSAT) carried out",
      currentStatus: "No",
      totalDays: 5,
      totalHours: 40,
      costOneTime: 35000,
      costMonthly: 0,
      costJustification: "SSAT procedures, AWS security testing tools, external validation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research SSAT requirements for AWS deployments (2h)",
            "Create SSAT test plan for EC2, RDS, S3, and networking (3h)",
            "Setup SSAT testing environment in isolated VPC (2h)",
            "Prepare SSAT documentation templates (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Execute security control effectiveness tests (6h)",
            "Document test results in AWS Systems Manager documents (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Perform penetration testing validation (4h)",
            "Execute vulnerability assessment validation (3h)",
            "Test incident response procedures with GuardDuty (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Validate access controls and IAM policies (3h)",
            "Test data protection and encryption (KMS, EBS, S3) (3h)",
            "Validate logging and monitoring (CloudTrail, CloudWatch) (2h)",
          ],
        },
        {
          day: 5,
          hours: 8,
          tasks: [
            "Compile comprehensive SSAT report (4h)",
            "Present findings to stakeholders (2h)",
            "Create remediation plan for any failures (2h)",
          ],
        },
      ],
    },

    // DATA PROTECTION
    {
      id: 10,
      category: "Data Protection",
      control: "Ensure all data flows are identified within System and with external System",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with VPC Flow Logs",
      dailyBreakdown: [],
    },
    {
      id: 11,
      category: "Data Protection",
      control: "Data classification in accordance with government guide",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 12000,
      costMonthly: 1500,
      costJustification: "Data classification tools, RDS schema updates, S3 bucket tagging automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Study government data classification guidelines (2h)",
            "Inventory all data types in RDS and S3 (3h)",
            "Map existing data to classification levels (2h)",
            "Document current data flow diagrams using AWS tools (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Design data classification schema for Django models (3h)",
            "Create RDS database migrations for classification fields (2h)",
            "Implement classification logic in Django models (3h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Update React components to display classification (4h)",
            "Implement access controls based on classification using IAM (3h)",
            "Create admin interface for classification management (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Test classification system thoroughly (3h)",
            "Create data classification procedures and training (2h)",
            "Document implementation and usage guidelines (2h)",
            "Train team on classification requirements (1h)",
          ],
        },
      ],
    },
    {
      id: 12,
      category: "Data Protection",
      control: "Only Official-Open, Official-Close and RESTRICTED data hosted in Cloud",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with data classification",
      dailyBreakdown: [],
    },
    {
      id: 13,
      category: "Data Protection",
      control: "Ensure data is isolated (Database instance, Tenant isolation)",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 15000,
      costMonthly: 5000,
      costJustification: "Separate RDS instances, VPC isolation, additional compute resources",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design multi-tenant isolation architecture in AWS (3h)",
            "Setup separate RDS instances per tenant in different AZs (3h)",
            "Configure VPC isolation and security groups (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement tenant-aware Django models (4h)",
            "Update all database queries for tenant isolation (3h)",
            "Test data isolation thoroughly with RDS (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Update React frontend for tenant context (3h)",
            "Implement tenant-based access controls with IAM (3h)",
            "Setup Application Load Balancer routing (2h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Performance test isolated architecture (2h)",
            "Configure CloudWatch monitoring for tenants (2h)",
            "Document isolation implementation (2h)",
            "Test failover scenarios (2h)",
          ],
        },
      ],
    },
    {
      id: 14,
      category: "Data Protection",
      control: "Data segregation measures between tenants in place",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 18000,
      costMonthly: 3000,
      costJustification: "Multi-tenant architecture development, RDS segregation, Lambda functions",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design tenant segregation architecture (3h)",
            "Plan RDS database schema for tenant separation (3h)",
            "Create tenant management system design (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement tenant-aware data models in Django (5h)",
            "Create tenant context middleware (2h)",
            "Setup tenant-specific RDS connections (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Update all API endpoints for tenant awareness (4h)",
            "Implement tenant-based data filtering (3h)",
            "Create tenant management interface (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Comprehensive testing of tenant segregation (4h)",
            "Performance testing with multiple tenants using CloudWatch (2h)",
            "Document tenant segregation procedures (2h)",
          ],
        },
      ],
    },
    {
      id: 15,
      category: "Data Protection",
      control: "Data in transit encrypted across untrusted network",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with ALB SSL/TLS and VPC",
      dailyBreakdown: [],
    },
    {
      id: 16,
      category: "Data Protection",
      control: "Classified data cryptographically protected at rest",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 10000,
      costMonthly: 2500,
      costJustification: "AWS KMS, RDS encryption, S3 server-side encryption, EBS encryption",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Enable RDS encryption at rest with AWS KMS (3h)",
            "Configure S3 server-side encryption with KMS (2h)",
            "Setup customer-managed keys in KMS (2h)",
            "Test encryption functionality and performance (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement field-level encryption for sensitive data using Django (5h)",
            "Update Django models with encrypted fields (2h)",
            "Test encrypted data operations and queries (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Configure EBS volume encryption for EC2 instances (2h)",
            "Verify all encryption is working correctly (2h)",
            "Create key rotation procedures and schedules (2h)",
            "Performance test encrypted vs unencrypted operations (2h)",
          ],
        },
      ],
    },
    {
      id: 17,
      category: "Data Protection",
      control: "Data-in-motion processes protected with encryption and access controls",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "AWS DataSync, backup encryption, S3 Transfer Acceleration",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Identify all data-in-motion processes (backup, migration, replication) (2h)",
            "Configure encrypted backup procedures using AWS Backup (3h)",
            "Setup secure data migration processes with DataSync (2h)",
            "Test encrypted data movement (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement access controls for data movement with IAM (3h)",
            "Setup monitoring for data-in-motion activities with CloudTrail (2h)",
            "Create secure data transfer procedures (2h)",
            "Document data-in-motion security measures (1h)",
          ],
        },
      ],
    },
    {
      id: 18,
      category: "Data Protection",
      control: "Secure erasure of classified data at end of lifecycle",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 6000,
      costMonthly: 800,
      costJustification: "S3 lifecycle policies, Lambda functions for secure deletion, automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Define data lifecycle and retention policies (2h)",
            "Implement secure data deletion procedures using S3 lifecycle (3h)",
            "Setup automated data lifecycle management with Lambda (2h)",
            "Test secure deletion processes (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create data retention schedule automation with EventBridge (3h)",
            "Implement deletion verification and logging with CloudTrail (2h)",
            "Setup lifecycle monitoring and reporting with CloudWatch (2h)",
            "Document secure erasure procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 19,
      category: "Data Protection",
      control: "Cryptographic keys secured in FIPS 140-2 Level 2 compliant system",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 20000,
      costMonthly: 8000,
      costJustification: "AWS CloudHSM (FIPS 140-2 Level 3), KMS Premium features, compliance setup",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research FIPS 140-2 Level 2 requirements for AWS (2h)",
            "Setup AWS CloudHSM cluster in AP-South-1 (4h)",
            "Configure FIPS-compliant key storage (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Migrate existing keys to CloudHSM (4h)",
            "Implement key lifecycle management (2h)",
            "Setup key rotation procedures (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Validate FIPS compliance of all keys (3h)",
            "Create key management procedures (2h)",
            "Document FIPS implementation (2h)",
            "Train team on FIPS requirements (1h)",
          ],
        },
      ],
    },
    {
      id: 20,
      category: "Data Protection",
      control: "Production data not used in non-production or desensitised",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with separate AWS accounts",
      dailyBreakdown: [],
    },
    {
      id: 21,
      category: "Data Protection",
      control: "Data access rights based on least privilege throughout lifecycle",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with IAM policies",
      dailyBreakdown: [],
    },
    {
      id: 22,
      category: "Data Protection",
      control: "Classified data remains in AP-South region to mitigate jurisdictional risks",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 1500,
      costJustification: "AWS region compliance, data migration, geo-blocking setup",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Audit current data locations across AWS regions (2h)",
            "Configure all AWS services to use AP-South-1 region only (3h)",
            "Plan data migration from other regions if needed (2h)",
            "Setup geo-compliance monitoring with Config (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Execute data migration to AP-South-1 region (4h)",
            "Validate all data is within AP-South-1 (2h)",
            "Configure geo-blocking for data access using WAF (1h)",
            "Document geo-compliance procedures (1h)",
          ],
        },
      ],
    },

    // INCIDENT MANAGEMENT
    {
      id: 23,
      category: "Incident Management",
      control: "Contractual agreements for AWS incident notification established",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 0,
      costJustification: "Legal review, AWS Support plan upgrades, SLA definition",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Review current AWS Enterprise Support agreement (3h)",
            "Draft incident notification requirements (2h)",
            "Define SLA requirements for AWS incident response (2h)",
            "Prepare AWS support plan enhancement proposals (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Negotiate incident notification procedures with AWS (4h)",
            "Finalize AWS Health Dashboard integration (2h)",
            "Setup incident communication channels with SNS (1h)",
            "Document contractual obligations (1h)",
          ],
        },
      ],
    },
    {
      id: 24,
      category: "Incident Management",
      control: "Incident management policy and procedure developed",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "AWS incident management tools, ServiceNow integration, training",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research NIST incident response frameworks for cloud (2h)",
            "Draft comprehensive incident management policy (4h)",
            "Define incident classification levels and severity matrix (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create detailed incident response procedures for AWS (4h)",
            "Setup incident tracking using AWS Systems Manager Incident Manager (2h)",
            "Define roles, responsibilities, and escalation paths (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Create incident communication templates and SNS topics (2h)",
            "Setup automated incident notification system (3h)",
            "Conduct tabletop incident response exercise (2h)",
            "Finalize documentation and get stakeholder approval (1h)",
          ],
        },
      ],
    },
    {
      id: 25,
      category: "Incident Management",
      control: "Security incidents reported to GIROC timely",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 5000,
      costMonthly: 800,
      costJustification: "GIROC integration setup, automated reporting tools, Lambda functions",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research GIROC reporting requirements (2h)",
            "Setup automated incident reporting to GIROC using Lambda (3h)",
            "Create incident categorization for GIROC (2h)",
            "Test GIROC reporting system (1h)",
          ],
        },
      ],
    },
    {
      id: 26,
      category: "Incident Management",
      control: "SIRM/SIRO report incidents to GIROC per approved plan",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 0,
      costJustification: "Process documentation, training, Step Functions workflow setup",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Define SIRM/SIRO roles and responsibilities (2h)",
            "Create incident escalation procedures using Step Functions (3h)",
            "Setup SIRM/SIRO notification workflows with SNS (2h)",
            "Document reporting procedures (1h)",
          ],
        },
      ],
    },

    // PHYSICAL & ENVIRONMENTAL PROTECTION
    {
      id: 27,
      category: "Physical Security",
      control: "Physical and environmental protection policy developed",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 4000,
      costMonthly: 0,
      costJustification: "Policy development, AWS datacenter security verification, documentation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research AWS physical security standards and SOC reports (2h)",
            "Draft physical and environmental protection policy (4h)",
            "Define facility access controls for on-premises components (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create environmental monitoring procedures (2h)",
            "Document emergency response procedures (3h)",
            "Review and finalize policy documentation (2h)",
            "Get stakeholder approval and dissemination (1h)",
          ],
        },
      ],
    },
    {
      id: 28,
      category: "Physical Security",
      control: "Physical access monitoring with incident response",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 0,
      costJustification: "AWS audit verification, documentation, compliance reporting",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Verify AWS datacenter physical security controls in AP-South (2h)",
            "Review AWS physical security audit reports and compliance docs (3h)",
            "Document physical security verification (2h)",
            "Create physical security monitoring procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 29,
      category: "Physical Security",
      control: "Physical access logs reviewed periodically",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 2000,
      costMonthly: 500,
      costJustification: "AWS CloudTrail physical access log analysis, monitoring automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup access to AWS physical access compliance reports (2h)",
            "Create physical access log review procedures (3h)",
            "Setup automated alerts for AWS security notifications (2h)",
            "Document log review schedule (1h)",
          ],
        },
      ],
    },
    {
      id: 30,
      category: "Physical Security",
      control: "AWS independently audited for datacenter security",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 0,
      costJustification: "AWS audit report verification, compliance documentation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Obtain AWS datacenter security audit reports for AP-South (2h)",
            "Verify compliance with ISO 27001, SOC 2 Type II standards (3h)",
            "Review third-party security certifications (2h)",
            "Document audit verification results (1h)",
          ],
        },
      ],
    },

    // SECURITY AWARENESS
    {
      id: 31,
      category: "Security Awareness",
      control: "AWS security awareness programs audited and effective",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "AWS provides comprehensive security training",
      dailyBreakdown: [],
    },
    {
      id: 32,
      category: "Security Awareness",
      control: "AWS demonstrates adherence to industry standards for training",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "AWS certifications and training programs available",
      dailyBreakdown: [],
    },

    // LOG MANAGEMENT & MONITORING
    {
      id: 33,
      category: "Log Management",
      control: "Log review process defined and implemented",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 15000,
      costMonthly: 8000,
      costJustification: "CloudWatch Logs, CloudTrail, Elasticsearch/OpenSearch, log ingestion costs",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup CloudWatch Logs for centralized logging (2h)",
            "Configure structured logging in Django application (3h)",
            "Setup centralized logging for React app using CloudFront (2h)",
            "Test log collection and ingestion (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create CloudWatch Insights queries for log analysis (4h)",
            "Setup automated log analysis and correlation (2h)",
            "Configure log retention policies in CloudWatch (1h)",
            "Create initial log monitoring dashboard (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Define comprehensive log review procedures (2h)",
            "Setup alerting for critical security events using CloudWatch Alarms (3h)",
            "Create automated log analysis reports (2h)",
            "Test alerting system with various scenarios (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Document log management procedures (3h)",
            "Train team on log review and analysis (2h)",
            "Setup automated daily/weekly log review schedule with Lambda (2h)",
            "Validate entire logging pipeline end-to-end (1h)",
          ],
        },
      ],
    },
    {
      id: 34,
      category: "Log Management",
      control: "Thresholds configured with alerts and follow-up",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 3000,
      costJustification: "CloudWatch Alarms, SNS notifications, Lambda automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Define security event thresholds (2h)",
            "Configure CloudWatch Alarms for security metrics (3h)",
            "Setup SNS alert routing and escalation (2h)",
            "Test basic alerting functionality (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create alert investigation procedures (3h)",
            "Setup automated alert acknowledgment system using Lambda (2h)",
            "Configure alert suppression and correlation (2h)",
            "Document alerting procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 35,
      category: "Log Management",
      control: "Log review frequency determined and approved",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 2000,
      costMonthly: 0,
      costJustification: "Documentation, approval process, EventBridge scheduling",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Define log review frequency requirements (2h)",
            "Create log review schedule using EventBridge (2h)",
            "Get stakeholder approval for review frequency (2h)",
            "Setup automated review reminders with SNS (1h)",
            "Document approved review procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 36,
      category: "Log Management",
      control: "Alert validations acknowledged by system owner",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 800,
      costJustification: "Step Functions workflow automation, DynamoDB tracking, SNS notifications",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Create alert acknowledgment workflow using Step Functions (3h)",
            "Setup system owner notification system with SNS (2h)",
            "Implement alert tracking and closure process with DynamoDB (2h)",
            "Test acknowledgment workflow (1h)",
          ],
        },
      ],
    },
    {
      id: 37,
      category: "Log Management",
      control: "Security events monitored for suspicious activities",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 18000,
      costMonthly: 6000,
      costJustification: "GuardDuty, Security Hub, CloudWatch analytics, threat detection",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup Amazon GuardDuty for threat detection (3h)",
            "Configure Security Hub as central security dashboard (2h)",
            "Define suspicious activity patterns (2h)",
            "Setup threat intelligence feeds (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create security event correlation rules in CloudWatch (4h)",
            "Setup automated threat response using Lambda (2h)",
            "Configure behavioral analysis for anomaly detection (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Test security monitoring with simulated events (3h)",
            "Fine-tune detection rules to reduce false positives (2h)",
            "Create security monitoring dashboard in CloudWatch (2h)",
            "Document monitoring procedures (1h)",
          ],
        },
      ],
    },

    // NETWORK SECURITY
    {
      id: 38,
      category: "Network Security",
      control: "Web Application Firewall (WAF) implemented",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 12000,
      costJustification: "AWS WAF v2, Application Load Balancer integration, rule management",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research AWS WAF v2 options and pricing for AP-South (1h)",
            "Setup AWS WAF v2 with Application Load Balancer (3h)",
            "Configure AWS Managed Rules (Core Rule Set, Known Bad Inputs) (3h)",
            "Test WAF functionality with basic attack simulations (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure custom WAF rules for application-specific threats (4h)",
            "Setup WAF logging and CloudWatch integration (2h)",
            "Test application functionality through WAF (1h)",
            "Document WAF configuration and maintenance procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 39,
      category: "Network Security",
      control: "Database Activity Monitoring (DAM) implemented",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 20000,
      costMonthly: 15000,
      costJustification: "RDS Performance Insights, Database Activity Streams, third-party DAM tools",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research DAM solutions for RDS PostgreSQL/MySQL (2h)",
            "Enable RDS Performance Insights and Enhanced Monitoring (2h)",
            "Configure Database Activity Streams with Kinesis (3h)",
            "Setup basic monitoring dashboards in CloudWatch (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure detailed audit policies for sensitive operations (3h)",
            "Setup alert rules for suspicious database activities (3h)",
            "Integrate with CloudWatch and create custom metrics (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Create comprehensive DAM dashboards (3h)",
            "Test alert functionality with simulated threats (2h)",
            "Document monitoring procedures and response plans (2h)",
            "Train team on DAM usage and incident response (1h)",
          ],
        },
      ],
    },

    // AUTHENTICATION CONTROLS
    {
      id: 40,
      category: "Authentication",
      control: "Implement MFA to strengthen authentication",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 12000,
      costMonthly: 1500,
      costJustification: "AWS Cognito, MFA device costs, development integration",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research MFA options (AWS Cognito, third-party providers) (2h)",
            "Setup AWS Cognito User Pool with MFA policies (3h)",
            "Configure MFA methods (SMS, TOTP, hardware tokens) (2h)",
            "Test basic MFA functionality (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Integrate MFA with Django authentication backend (4h)",
            "Update React frontend for MFA user flows (3h)",
            "Test MFA integration end-to-end (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Configure conditional access policies in Cognito (2h)",
            "Setup backup authentication methods (2h)",
            "User acceptance testing and UI improvements (2h)",
            "Create user documentation and help guides (1h)",
            "Deploy to production with monitoring (1h)",
          ],
        },
      ],
    },

    // CHANGE MANAGEMENT
    {
      id: 41,
      category: "Change Management",
      control: "AWS policies for change management developed",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 6000,
      costMonthly: 0,
      costJustification: "AWS Config rules, documentation, change tracking automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Review AWS change management best practices (2h)",
            "Assess current change management gaps (3h)",
            "Draft change management requirements for AWS resources (2h)",
            "Create change approval workflows using Step Functions (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Document change management procedures (3h)",
            "Setup change tracking using AWS Config (3h)",
            "Test change management workflow (1h)",
            "Train team on change procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 42,
      category: "Change Management",
      control: "Changes don't alter compliance to security requirements",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "AWS Config rules, compliance checking automation, Security Hub integration",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Create compliance validation checklist (2h)",
            "Setup automated compliance checking with AWS Config (3h)",
            "Define security requirement baselines (2h)",
            "Test compliance validation (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement change impact assessment automation (4h)",
            "Create compliance monitoring dashboard in Security Hub (2h)",
            "Document compliance validation procedures (2h)",
          ],
        },
      ],
    },
    {
      id: 43,
      category: "Change Management",
      control: "Developers follow established SDLC and release management",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 10000,
      costMonthly: 2000,
      costJustification: "CodePipeline, CodeBuild, CodeDeploy setup, training, automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Document current SDLC processes (2h)",
            "Define security gates in CodePipeline (3h)",
            "Create release management procedures (2h)",
            "Setup SDLC tracking with CodeCommit and CodeBuild (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement security checkpoints in CodePipeline (4h)",
            "Create code review guidelines for CodeCommit (2h)",
            "Setup automated testing gates with CodeBuild (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Train development team on AWS SDLC tools (3h)",
            "Test SDLC with sample releases (3h)",
            "Document SDLC procedures (2h)",
          ],
        },
      ],
    },

    // COMPLIANCE & AUDIT
    {
      id: 44,
      category: "Compliance",
      control: "AWS attained relevant certifications",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "AWS has ISO 27001, SOC 2, FedRAMP, and other certifications",
      dailyBreakdown: [],
    },
    {
      id: 45,
      category: "Compliance",
      control: "AWS audited by independent auditors",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "AWS provides regular audit reports and compliance documentation",
      dailyBreakdown: [],
    },
    {
      id: 46,
      category: "Compliance",
      control: "Rights to audit granted contractually",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 8000,
      costMonthly: 0,
      costJustification: "Legal review, AWS Enterprise Support agreement amendments",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Review current AWS Enterprise Agreement for audit rights (2h)",
            "Draft audit rights clauses specific to AWS services (3h)",
            "Negotiate with AWS for additional audit access if needed (2h)",
            "Finalize agreement amendments (1h)",
          ],
        },
      ],
    },
    {
      id: 47,
      category: "Compliance",
      control: "AWS audit reports made available to Government",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 800,
      costJustification: "Process setup, documentation, regular report collection and distribution",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup process to obtain AWS audit reports and compliance documents (2h)",
            "Create audit report repository in S3 (2h)",
            "Establish regular audit report collection schedule (2h)",
            "Document audit report procedures (2h)",
          ],
        },
      ],
    },
    {
      id: 48,
      category: "Compliance",
      control: "Implement monitoring for user activity visibility",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 20000,
      costMonthly: 8000,
      costJustification: "CloudTrail, VPC Flow Logs, GuardDuty, user behavior analytics",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup comprehensive CloudTrail logging for all AWS services (3h)",
            "Configure VPC Flow Logs for network activity monitoring (2h)",
            "Enable GuardDuty for behavioral analysis (2h)",
            "Test basic user activity monitoring (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure detailed activity monitoring policies (4h)",
            "Setup data access monitoring with CloudWatch (2h)",
            "Configure suspicious behavior detection rules (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Implement user behavior analytics with CloudWatch Insights (3h)",
            "Setup automated incident response workflows with Lambda (3h)",
            "Configure anomaly detection for user activities (2h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Create comprehensive monitoring dashboards (3h)",
            "Setup alerting and notification systems with SNS (2h)",
            "Train security team on monitoring tools (2h)",
            "Create user awareness materials (1h)",
          ],
        },
      ],
    },

    // RISK ASSESSMENT
    {
      id: 49,
      category: "Risk Assessment",
      control: "Security risk assessments prior to Cloud use",
      currentStatus: "No",
      totalDays: 5,
      totalHours: 40,
      costOneTime: 25000,
      costMonthly: 3000,
      costJustification: "AWS Well-Architected Review, external consultant, risk assessment tools",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research risk assessment frameworks (AWS Well-Architected, NIST) (2h)",
            "Identify all AWS services and dependencies (3h)",
            "Create comprehensive asset inventory using AWS Config (2h)",
            "Define risk assessment methodology (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Conduct threat modeling for AWS cloud architecture (4h)",
            "Identify vulnerabilities and attack vectors (2h)",
            "Assess likelihood and impact of identified risks (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Calculate risk ratings and prioritize findings (3h)",
            "Develop risk mitigation strategies using AWS services (3h)",
            "Create risk register and tracking system (2h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Document comprehensive risk assessment report (4h)",
            "Create risk management action plan (2h)",
            "Present findings to stakeholders (2h)",
          ],
        },
        {
          day: 5,
          hours: 8,
          tasks: [
            "Implement high-priority risk mitigations (4h)",
            "Setup ongoing risk monitoring procedures (2h)",
            "Schedule annual risk assessment reviews (1h)",
            "Finalize risk documentation (1h)",
          ],
        },
      ],
    },
    {
      id: 50,
      category: "Risk Assessment",
      control: "Risk assessment for 3rd parties and suppliers",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 15000,
      costMonthly: 1500,
      costJustification: "Third-party assessment tools, vendor questionnaires, ongoing monitoring",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Identify all third-party vendors and suppliers (3h)",
            "Create vendor risk assessment framework (3h)",
            "Develop vendor security questionnaires (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Conduct risk assessments for critical vendors (5h)",
            "Review vendor security certifications and AWS partnerships (2h)",
            "Document vendor risk profiles (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Create vendor risk monitoring procedures (3h)",
            "Setup vendor risk tracking system (3h)",
            "Define vendor risk acceptance criteria (2h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Document third-party risk management procedures (3h)",
            "Create vendor security requirements (2h)",
            "Setup ongoing vendor monitoring (2h)",
            "Train team on vendor risk management (1h)",
          ],
        },
      ],
    },

    // APPLICATION CHANGE MANAGEMENT
    {
      id: 51,
      category: "Application Change Management",
      control: "Agency defines change process for service/system",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with CodePipeline workflows",
      dailyBreakdown: [],
    },
    {
      id: 52,
      category: "Application Change Management",
      control: "Vulnerabilities remediated before production deployment",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 1500,
      costJustification: "CodeGuru, security scanning in CodeBuild, pipeline integration",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design security gates for CodePipeline (2h)",
            "Integrate SAST tools (CodeGuru Reviewer, SonarQube) in CodeBuild (3h)",
            "Setup DAST scanning in staging environment (2h)",
            "Configure pipeline to block on security findings (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement dependency vulnerability scanning with CodeGuru (2h)",
            "Setup security approval workflow using Step Functions (2h)",
            "Test security gates with various scenarios (3h)",
            "Document security deployment procedures (1h)",
          ],
        },
      ],
    },

    // PERSONNEL SECURITY
    {
      id: 53,
      category: "Personnel Security",
      control: "Personnel with classified data access are security cleared",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented through government clearance process",
      dailyBreakdown: [],
    },
    {
      id: 54,
      category: "Personnel Security",
      control: "Implement audit-verifiable access controls",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with IAM and CloudTrail",
      dailyBreakdown: [],
    },
    {
      id: 55,
      category: "Personnel Security",
      control: "Classified data encrypted at rest and in transit",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with KMS and TLS",
      dailyBreakdown: [],
    },
    {
      id: 56,
      category: "Personnel Security",
      control: "Unauthorised disclosure terms in employment contracts",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented in standard employment agreements",
      dailyBreakdown: [],
    },

    // NETWORK SECURITY (Additional Controls)
    {
      id: 57,
      category: "Network Security",
      control: "Network segregation implemented",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 15000,
      costMonthly: 4000,
      costJustification: "Multiple VPCs, Transit Gateway, Security Groups, NACLs, additional networking costs",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design network segmentation architecture with VPC (3h)",
            "Create multiple VPCs for different tiers (2h)",
            "Configure Security Groups and NACLs for isolation (2h)",
            "Test basic network isolation (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement micro-segmentation between services (4h)",
            "Setup Transit Gateway for controlled inter-VPC communication (2h)",
            "Configure service-to-service communication rules (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Implement identity-based network access with IAM (3h)",
            "Configure conditional access for network resources (2h)",
            "Setup network monitoring with VPC Flow Logs (2h)",
            "Test network access controls (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Fine-tune network policies (2h)",
            "Performance test segmented network (2h)",
            "Document network architecture and procedures (3h)",
            "Create network troubleshooting guides (1h)",
          ],
        },
      ],
    },
    {
      id: 58,
      category: "Network Security",
      control: "Network monitored with Intrusion Prevention Systems",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 25000,
      costMonthly: 12000,
      costJustification: "AWS Network Firewall, third-party IPS solutions, monitoring integration",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup AWS Network Firewall with IPS capabilities (4h)",
            "Configure intrusion detection and prevention rules (2h)",
            "Setup network traffic monitoring (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure custom IPS signatures (3h)",
            "Setup IPS alerting and notifications with SNS (2h)",
            "Integrate with CloudWatch and Security Hub for correlation (2h)",
            "Test IPS with simulated attacks (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Fine-tune IPS rules to reduce false positives (3h)",
            "Create IPS monitoring dashboard in CloudWatch (2h)",
            "Document IPS procedures (2h)",
            "Train team on IPS management (1h)",
          ],
        },
      ],
    },
    {
      id: 59,
      category: "Network Security",
      control: "API gateways with Authentication, Authorization, Payload inspection",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 12000,
      costMonthly: 8000,
      costJustification: "AWS API Gateway, Lambda authorizers, WAF integration, monitoring",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup AWS API Gateway for REST APIs (2h)",
            "Configure API authentication with Cognito/Lambda authorizers (3h)",
            "Setup API authorization rules and policies (2h)",
            "Test basic API gateway functionality (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement payload inspection and validation (4h)",
            "Configure rate limiting and throttling (2h)",
            "Setup API monitoring with CloudWatch and X-Ray (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Configure API security policies and WAF integration (3h)",
            "Setup API threat protection (2h)",
            "Test API security with various payloads (2h)",
            "Document API gateway procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 60,
      category: "Network Security",
      control: "Security monitoring mechanisms in place",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 25000,
      costMonthly: 15000,
      costJustification: "Security Hub, GuardDuty, CloudWatch, threat intelligence feeds",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup AWS Security Hub as central SIEM (3h)",
            "Configure data sources (CloudTrail, GuardDuty, Config) (2h)",
            "Setup threat intelligence feeds (2h)",
            "Test basic SIEM functionality (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create security monitoring rules and findings (4h)",
            "Configure automated threat detection with GuardDuty (2h)",
            "Setup incident response automation with Lambda (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Create security monitoring dashboards in CloudWatch (3h)",
            "Configure alerting and notifications with SNS (2h)",
            "Setup threat hunting workflows (2h)",
            "Test monitoring with simulated threats (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Fine-tune monitoring rules (2h)",
            "Create security monitoring procedures (3h)",
            "Train security team on AWS security tools (2h)",
            "Document monitoring procedures (1h)",
          ],
        },
      ],
    },

    // SECURITY REVIEWS & AUDITS
    {
      id: 61,
      category: "Security Reviews",
      control: "Periodic security reviews of policies and controls",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 15000,
      costMonthly: 4000,
      costJustification: "AWS Well-Architected reviews, external assessments, documentation updates",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Define security review schedule and scope (2h)",
            "Create security review templates and checklists (3h)",
            "Setup security review tracking system (2h)",
            "Plan first comprehensive security review (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Conduct comprehensive security policy review (4h)",
            "Review security control effectiveness using AWS tools (2h)",
            "Identify security gaps and improvements (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Create security improvement action plan (3h)",
            "Document security review findings (2h)",
            "Present findings to stakeholders (2h)",
            "Schedule regular security reviews (1h)",
          ],
        },
      ],
    },
    {
      id: 62,
      category: "Security Reviews",
      control: "Periodic security audits to ensure adherence",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 40000,
      costMonthly: 0,
      costJustification: "External security audit services, AWS compliance verification",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research and select external auditors with AWS expertise (3h)",
            "Define audit scope and requirements for AWS environment (2h)",
            "Prepare audit documentation and evidence (2h)",
            "Schedule audit activities (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Coordinate with external auditors (2h)",
            "Support audit evidence collection from AWS services (3h)",
            "Review audit findings and recommendations (2h)",
            "Plan audit remediation activities (1h)",
          ],
        },
      ],
    },

    // DATA MANAGEMENT
    {
      id: 63,
      category: "Data Management",
      control: "All data flows identified within and external systems",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 10000,
      costMonthly: 1500,
      costJustification: "VPC Flow Logs analysis, data flow mapping tools, ongoing maintenance",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Map all internal data flows using VPC Flow Logs (4h)",
            "Identify external system integrations (2h)",
            "Create data flow diagrams (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Document data processing activities (3h)",
            "Identify data sharing agreements needed (2h)",
            "Create data flow inventory (2h)",
            "Setup data flow monitoring with CloudWatch (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Validate data flow documentation (2h)",
            "Create data flow management procedures (3h)",
            "Setup data flow change tracking (2h)",
            "Document data flow procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 64,
      category: "Data Management",
      control: "Sensitive data identified",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with data classification",
      dailyBreakdown: [],
    },
    {
      id: 65,
      category: "Data Management",
      control: "Sensitive data classified per Information Sensitivity Framework",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 15000,
      costMonthly: 3000,
      costJustification: "Data classification tools, S3 tagging automation, framework implementation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Study Information Sensitivity Framework (2h)",
            "Map existing data to ISF categories (3h)",
            "Create data classification schema (2h)",
            "Plan classification implementation (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement data classification in Django models (4h)",
            "Create classification management interface (2h)",
            "Setup automated classification rules (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Update React frontend for classification display (3h)",
            "Implement classification-based access controls with IAM (3h)",
            "Test classification system (2h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Create classification procedures (2h)",
            "Train team on data classification (3h)",
            "Document ISF implementation (2h)",
            "Setup classification monitoring (1h)",
          ],
        },
      ],
    },
    {
      id: 66,
      category: "Data Management",
      control: "Data segregation measures between tenants",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with VPC and RDS isolation",
      dailyBreakdown: [],
    },
    {
      id: 67,
      category: "Data Management",
      control: "Data-in-motion protected with encryption and access controls",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with TLS and VPC",
      dailyBreakdown: [],
    },

    // ASSET MANAGEMENT
    {
      id: 68,
      category: "Asset Management",
      control: "Asset inventory maintained for Cloud services",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 12000,
      costMonthly: 3000,
      costJustification: "AWS Config, Systems Manager Inventory, automated discovery, maintenance",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup AWS Config for comprehensive resource discovery (2h)",
            "Configure Systems Manager Inventory for EC2 instances (3h)",
            "Document software and service dependencies (2h)",
            "Create initial asset database structure (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement automated asset discovery with Config Rules (3h)",
            "Setup asset classification and tagging strategy (2h)",
            "Create asset lifecycle management procedures (2h)",
            "Configure asset change notifications with EventBridge (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Create asset management dashboard in CloudWatch (3h)",
            "Setup EOL and expiry tracking (2h)",
            "Document asset management procedures (2h)",
            "Train team on asset management processes (1h)",
          ],
        },
      ],
    },
    {
      id: 69,
      category: "Asset Management",
      control: "Inventory updated annually with no EOL usage",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 2000,
      costJustification: "Automated scanning, EOL tracking, Systems Manager compliance",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup automated EOL scanning with Systems Manager (3h)",
            "Create EOL replacement procedures (2h)",
            "Configure EOL notifications and alerts with SNS (2h)",
            "Test EOL detection system (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create annual inventory update procedures (3h)",
            "Setup automated inventory reconciliation (2h)",
            "Document EOL management procedures (2h)",
            "Schedule regular inventory reviews with EventBridge (1h)",
          ],
        },
      ],
    },
    {
      id: 70,
      category: "Asset Management",
      control: "Track expiry dates for digital assets",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "Certificate Manager, license tracking, renewal automation with Lambda",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Inventory all certificates using AWS Certificate Manager (3h)",
            "Setup certificate expiry monitoring (2h)",
            "Create license tracking system (2h)",
            "Configure expiry notifications with SNS (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Setup automated renewal reminders with Lambda (3h)",
            "Create renewal procedures (2h)",
            "Test expiry tracking system (2h)",
            "Document certificate and license management (1h)",
          ],
        },
      ],
    },
    {
      id: 71,
      category: "Asset Management",
      control: "Catalogue of 3rd party system software",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 6000,
      costMonthly: 800,
      costJustification: "Systems Manager inventory, vendor tracking, documentation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Inventory all third-party software using Systems Manager (4h)",
            "Document software vendors and versions (2h)",
            "Create software catalogue database (2h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Setup software change tracking with Config (3h)",
            "Create software approval procedures (2h)",
            "Document software catalogue procedures (2h)",
            "Setup regular software reviews (1h)",
          ],
        },
      ],
    },

    // SERVICE LEVEL AGREEMENTS
    {
      id: 72,
      category: "Service Level Agreements",
      control: "Required SLAs stipulated in AWS agreements",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already covered under AWS Service Level Agreements",
      dailyBreakdown: [],
    },
    {
      id: 73,
      category: "Service Level Agreements",
      control: "Government Data properly defined within SLA",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 5000,
      costMonthly: 0,
      costJustification: "Legal review, SLA amendments for data definitions",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Review current AWS SLA data definitions (2h)",
            "Define government data categories in SLA context (3h)",
            "Negotiate SLA amendments with AWS if needed (2h)",
            "Document updated SLA terms (1h)",
          ],
        },
      ],
    },
    {
      id: 74,
      category: "Service Level Agreements",
      control: "Information security requirements covered by SLA",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 0,
      costJustification: "Legal review, security SLA development, AWS Enterprise Support",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Define security requirements for AWS SLA (3h)",
            "Create security SLA templates (2h)",
            "Review current AWS SLA security coverage (2h)",
            "Plan SLA security enhancements (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Negotiate security SLA terms with AWS (4h)",
            "Document security SLA requirements (2h)",
            "Setup SLA monitoring for security metrics (2h)",
          ],
        },
      ],
    },

    // INCIDENT RESPONSE SUPPORT
    {
      id: 75,
      category: "Incident Response Support",
      control: "Stakeholders informed of incident response limitations",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 0,
      costJustification: "Communication planning, documentation, stakeholder training",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Document incident response limitations for AWS cloud (2h)",
            "Create stakeholder communication plan (2h)",
            "Conduct stakeholder briefings (3h)",
            "Document limitations acknowledgment (1h)",
          ],
        },
      ],
    },
    {
      id: 76,
      category: "Incident Response Support",
      control: "Security logs available for incident investigation",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 4000,
      costJustification: "CloudTrail data events, long-term S3 storage, investigation tools",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup long-term log retention in S3 for investigations (3h)",
            "Create log access procedures for incident response (2h)",
            "Configure log export capabilities from CloudWatch (2h)",
            "Test log retrieval for investigation scenarios (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create incident investigation log packages (3h)",
            "Setup secure log transfer procedures (2h)",
            "Document log investigation procedures (2h)",
            "Train team on investigation support (1h)",
          ],
        },
      ],
    },

    // CRYPTOGRAPHIC KEY MANAGEMENT
    {
      id: 77,
      category: "Cryptographic Key Management",
      control: "Cryptographic Key Management process implemented",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 25000,
      costMonthly: 10000,
      costJustification: "AWS KMS, CloudHSM, key lifecycle management, automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design comprehensive key management architecture (3h)",
            "Setup AWS KMS with customer-managed keys (2h)",
            "Configure key lifecycle policies (2h)",
            "Test basic key management operations (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement key generation procedures (3h)",
            "Setup key rotation automation with Lambda (2h)",
            "Configure key backup and recovery (2h)",
            "Test key rotation procedures (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Implement key access controls with IAM (3h)",
            "Setup key usage monitoring and logging (2h)",
            "Configure key escrow procedures (2h)",
            "Test key access controls (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Create key management procedures (3h)",
            "Setup key management dashboards in CloudWatch (2h)",
            "Document key management processes (2h)",
            "Train team on key management (1h)",
          ],
        },
      ],
    },
    {
      id: 78,
      category: "Cryptographic Key Management",
      control: "Cryptographic algorithms per government standards",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "Algorithm compliance review, KMS configuration updates",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Review government cryptographic standards (2h)",
            "Audit current cryptographic implementations in AWS (3h)",
            "Identify non-compliant algorithms (2h)",
            "Plan algorithm updates (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Update algorithms to government compliant versions (4h)",
            "Test updated cryptographic implementations (2h)",
            "Document algorithm compliance (1h)",
            "Setup ongoing compliance monitoring (1h)",
          ],
        },
      ],
    },

    // AUTHENTICATION ADDITIONAL CONTROLS
    {
      id: 79,
      category: "Authentication",
      control: "Open standards used for authentication",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "Cognito advanced features, OAuth/OIDC setup, integration development",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research authentication standards (OAuth, OIDC, SAML) (2h)",
            "Design standards-based authentication architecture (3h)",
            "Setup OAuth 2.0/OIDC implementation with Cognito (2h)",
            "Test standards compliance (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Integrate standards-based auth with Django (4h)",
            "Update React frontend for standards-based flows (2h)",
            "Test authentication standards implementation (1h)",
            "Document standards compliance (1h)",
          ],
        },
      ],
    },
    {
      id: 80,
      category: "Authentication",
      control: "Account lockout policy enforced",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 500,
      costJustification: "Development time, ElastiCache Redis for session management",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design account lockout policy (thresholds, duration) (1h)",
            "Implement lockout logic in Django authentication (3h)",
            "Setup ElastiCache Redis for tracking failed attempts (2h)",
            "Add lockout status to React login component (1h)",
            "Test lockout functionality thoroughly (1h)",
          ],
        },
      ],
    },
    {
      id: 81,
      category: "Authentication",
      control: "CAPTCHA to stop bot brute force attacks",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 4000,
      costMonthly: 800,
      costJustification: "reCAPTCHA service, WAF bot control, implementation costs",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Research CAPTCHA solutions (reCAPTCHA, hCaptcha) (1h)",
            "Implement CAPTCHA in Django forms (3h)",
            "Add CAPTCHA to React login components (2h)",
            "Configure AWS WAF Bot Control (1h)",
            "Test CAPTCHA functionality (1h)",
          ],
        },
      ],
    },
    {
      id: 82,
      category: "Authentication",
      control: "Progressive login failure delays",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 3000,
      costMonthly: 500,
      costJustification: "Rate limiting implementation, ElastiCache for tracking",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design progressive delay algorithm (1h)",
            "Implement progressive delays in Django (3h)",
            "Setup ElastiCache Redis for delay tracking (2h)",
            "Update React frontend for delay indication (1h)",
            "Test progressive delay functionality (1h)",
          ],
        },
      ],
    },
    {
      id: 83,
      category: "Authentication",
      control: "Out-of-band login notifications",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "SES email service, SNS SMS, Lambda functions, monitoring",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup SES for email notifications and SNS for SMS (2h)",
            "Implement login notification logic with Lambda (3h)",
            "Create notification templates (2h)",
            "Test notification delivery (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure notification preferences (2h)",
            "Implement notification logging (2h)",
            "Setup suspicious login detection with GuardDuty (3h)",
            "Test notification system thoroughly (1h)",
          ],
        },
      ],
    },
    {
      id: 84,
      category: "Authentication",
      control: "Last login notifications upon application logon",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented in application",
      dailyBreakdown: [],
    },

    // BACKUP MANAGEMENT
    {
      id: 85,
      category: "Backup Management",
      control: "Critical data for backup identified",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 2000,
      costJustification: "AWS Backup, data classification, automation setup",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Inventory all data assets in RDS and S3 (3h)",
            "Classify data by criticality (2h)",
            "Define backup requirements per data type (2h)",
            "Create backup priority matrix (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure AWS Backup with automated scheduling (3h)",
            "Setup backup monitoring and verification (2h)",
            "Test critical data backup procedures (2h)",
            "Document backup identification procedures (1h)",
          ],
        },
      ],
    },
    {
      id: 86,
      category: "Backup Management",
      control: "Backup strategies aligned with RPO/RTO",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 3000,
      costJustification: "AWS Backup optimization, cross-region replication, monitoring",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Analyze current backup strategies vs RPO/RTO requirements (3h)",
            "Redesign backup frequency and retention policies (2h)",
            "Configure backup strategies per RPO requirements (2h)",
            "Test backup strategy compliance (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Setup backup monitoring for RPO compliance (3h)",
            "Create backup strategy documentation (2h)",
            "Configure backup alerting for RPO violations (2h)",
            "Validate backup strategy effectiveness (1h)",
          ],
        },
      ],
    },
    {
      id: 87,
      category: "Backup Management",
      control: "Backup data protected with encryption and access controls",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 3000,
      costJustification: "KMS encryption, IAM policies, backup security implementation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Configure backup encryption at rest with KMS (3h)",
            "Setup backup encryption in transit (2h)",
            "Configure backup access controls with IAM (2h)",
            "Test backup encryption (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement backup key management (3h)",
            "Setup backup access logging with CloudTrail (2h)",
            "Create backup security procedures (2h)",
            "Validate backup protection (1h)",
          ],
        },
      ],
    },
    {
      id: 88,
      category: "Backup Management",
      control: "Monitor backup jobs for completion",
      currentStatus: "No",
      totalDays: 1,
      totalHours: 8,
      costOneTime: 5000,
      costMonthly: 1500,
      costJustification: "CloudWatch monitoring, SNS alerts, backup job tracking",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup backup job monitoring with CloudWatch (3h)",
            "Configure backup completion alerts with SNS (2h)",
            "Create backup monitoring dashboard (2h)",
            "Test backup monitoring and alerting (1h)",
          ],
        },
      ],
    },
    {
      id: 89,
      category: "Backup Management",
      control: "Backup data kept offline for ransomware protection",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 15000,
      costMonthly: 5000,
      costJustification: "S3 Glacier Deep Archive, air-gap implementation, automation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup S3 Glacier Deep Archive for offline backup storage (3h)",
            "Configure air-gap backup procedures (2h)",
            "Implement automated offline backup rotation with Lambda (2h)",
            "Test offline backup functionality (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure offline backup monitoring (2h)",
            "Setup offline backup alerting (2h)",
            "Create offline backup procedures (2h)",
            "Test ransomware protection effectiveness (2h)",
          ],
        },
      ],
    },
    {
      id: 90,
      category: "Backup Management",
      control: "Annual data recoverability testing",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 1500,
      costJustification: "Testing procedures, validation automation, annual testing overhead",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Create annual recoverability testing plan (2h)",
            "Setup isolated recovery testing environment (3h)",
            "Develop comprehensive recovery test scenarios (2h)",
            "Plan testing schedule and resources (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Conduct initial comprehensive recovery test (4h)",
            "Validate data integrity and completeness (2h)",
            "Document testing procedures and results (1h)",
            "Schedule annual testing calendar with EventBridge (1h)",
          ],
        },
      ],
    },

    // HIGH AVAILABILITY
    {
      id: 91,
      category: "High Availability",
      control: "Deploy across multiple availability zones",
      currentStatus: "No",
      totalDays: 4,
      totalHours: 32,
      costOneTime: 25000,
      costMonthly: 12000,
      costJustification: "Multi-AZ RDS, ALB across AZs, Auto Scaling Groups, additional compute",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design multi-AZ architecture for AP-South region (3h)",
            "Plan resource distribution across 3 AZs (2h)",
            "Configure RDS Multi-AZ deployment (2h)",
            "Test basic multi-AZ connectivity (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Deploy EC2 Auto Scaling Groups across multiple AZs (4h)",
            "Configure Application Load Balancer for multi-AZ (2h)",
            "Setup AZ failover procedures (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Configure RDS read replicas across AZs (4h)",
            "Setup data synchronization and replication (2h)",
            "Test cross-AZ failover scenarios (2h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Performance test multi-AZ deployment (3h)",
            "Create AZ failover procedures and runbooks (2h)",
            "Document multi-AZ architecture (2h)",
            "Train team on AZ management (1h)",
          ],
        },
      ],
    },
    {
      id: 92,
      category: "High Availability",
      control: "Single point of failures identified and mitigated",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 15000,
      costMonthly: 3000,
      costJustification: "Architecture review, redundancy implementation, monitoring tools",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Conduct comprehensive AWS architecture review (4h)",
            "Identify all single points of failure (3h)",
            "Document SPOF findings and risk assessment (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Create SPOF mitigation plan (4h)",
            "Implement critical redundancy measures (3h)",
            "Setup SPOF monitoring with CloudWatch (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Test SPOF mitigation effectiveness (3h)",
            "Prioritize remaining SPOF remediation (2h)",
            "Document SPOF procedures and monitoring (2h)",
            "Create alerting for potential SPOFs (1h)",
          ],
        },
      ],
    },

    // SCALABILITY
    {
      id: 93,
      category: "Scalability",
      control: "Frontend scaling based on incoming requests",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 10000,
      costMonthly: 4000,
      costJustification: "CloudFront CDN, auto-scaling configuration, monitoring",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup CloudFront CDN for React application (3h)",
            "Configure frontend auto-scaling with ALB (2h)",
            "Setup request-based scaling triggers (2h)",
            "Test frontend scaling (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure CloudFront caching policies (2h)",
            "Setup frontend performance monitoring with CloudWatch (2h)",
            "Configure scaling thresholds and policies (2h)",
            "Document frontend scaling procedures (2h)",
          ],
        },
      ],
    },
    {
      id: 94,
      category: "Scalability",
      control: "Backend scaling (load-based and time-based)",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 15000,
      costMonthly: 6000,
      costJustification: "Auto Scaling Groups, SQS queues, Lambda functions, monitoring",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup SQS queues for job processing (2h)",
            "Configure queue-based Auto Scaling triggers (3h)",
            "Implement job processing auto-scaling (2h)",
            "Test queue-based scaling (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure time-based scaling schedules (3h)",
            "Setup predictive scaling based on CloudWatch metrics (2h)",
            "Configure scaling policies and thresholds (2h)",
            "Test time-based scaling (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Create scaling monitoring dashboards (2h)",
            "Setup scaling notifications with SNS (2h)",
            "Document backend scaling procedures (2h)",
            "Performance test scaling scenarios (2h)",
          ],
        },
      ],
    },
    {
      id: 95,
      category: "Scalability",
      control: "Monitor capacity metrics and upgrade as required",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 3000,
      costJustification: "CloudWatch detailed monitoring, capacity planning tools, alerting",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup comprehensive capacity monitoring (3h)",
            "Configure capacity threshold alerts (2h)",
            "Create capacity planning dashboards (2h)",
            "Test capacity monitoring (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement automated capacity reporting (3h)",
            "Setup capacity upgrade procedures (2h)",
            "Create capacity planning procedures (2h)",
            "Document capacity management (1h)",
          ],
        },
      ],
    },

    // DDOS & WEB PROTECTION
    {
      id: 96,
      category: "DDoS Protection",
      control: "DDoS protection mechanisms implemented",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 15000,
      costMonthly: 8000,
      costJustification: "AWS Shield Advanced, CloudFront, Route 53 protection",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Enable AWS Shield Advanced (2h)",
            "Configure CloudFront for DDoS protection (3h)",
            "Setup Route 53 health checks and failover (2h)",
            "Test basic DDoS protection (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure DDoS response team notifications (2h)",
            "Setup DDoS attack monitoring and alerts (3h)",
            "Create DDoS response procedures (2h)",
            "Test DDoS protection effectiveness (1h)",
          ],
        },
      ],
    },
    {
      id: 97,
      category: "DDoS Protection",
      control: "Bot attack mitigation measures",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 18000,
      costMonthly: 5000,
      costJustification: "WAF Bot Control, behavioral analysis, rate limiting",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup AWS WAF Bot Control (3h)",
            "Configure bot detection rules (2h)",
            "Implement CAPTCHA for suspicious behavior (2h)",
            "Test bot detection (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Configure behavioral analysis rules (3h)",
            "Setup rate limiting for suspicious patterns (2h)",
            "Implement progressive delays for bot-like behavior (2h)",
            "Test bot mitigation (1h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Fine-tune bot detection to reduce false positives (3h)",
            "Create bot mitigation dashboard (2h)",
            "Document bot protection procedures (2h)",
            "Train team on bot management (1h)",
          ],
        },
      ],
    },

    // DISASTER RECOVERY
    {
      id: 98,
      category: "Disaster Recovery",
      control: "Establish RPO and RTO aligned with AWS capabilities",
      currentStatus: "No",
      totalDays: 2,
      totalHours: 16,
      costOneTime: 8000,
      costMonthly: 1500,
      costJustification: "Business impact analysis, AWS service SLA alignment, documentation",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Conduct business impact analysis (3h)",
            "Define RPO and RTO requirements (2h)",
            "Review AWS service SLA capabilities (2h)",
            "Align RPO/RTO with AWS services (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Document RPO/RTO requirements (2h)",
            "Create recovery time monitoring (3h)",
            "Setup RPO/RTO compliance tracking (2h)",
            "Validate RPO/RTO with stakeholders (1h)",
          ],
        },
      ],
    },
    {
      id: 99,
      category: "Disaster Recovery",
      control: "Cross-region DR implementation",
      currentStatus: "No",
      totalDays: 8,
      totalHours: 64,
      costOneTime: 80000,
      costMonthly: 30000,
      costJustification: "Cross-region replication, duplicate infrastructure, data transfer costs",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Design cross-region DR architecture (Mumbai to Singapore) (3h)",
            "Plan cross-region data replication strategy (2h)",
            "Setup secondary region VPC infrastructure (2h)",
            "Create cross-region integration plan (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Setup RDS cross-region read replicas (4h)",
            "Configure S3 cross-region replication (2h)",
            "Test basic cross-region connectivity (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Deploy application infrastructure in DR region (5h)",
            "Configure Route 53 health checks and failover (2h)",
            "Test data synchronization (1h)",
          ],
        },
        {
          day: 4,
          hours: 8,
          tasks: [
            "Setup cross-region failover automation with Lambda (4h)",
            "Configure DNS failover routing (2h)",
            "Test automated failover (2h)",
          ],
        },
        {
          day: 5,
          hours: 8,
          tasks: [
            "Implement cross-region monitoring (3h)",
            "Configure cross-region alerting (2h)",
            "Setup cross-region backup procedures (2h)",
            "Test monitoring and alerting (1h)",
          ],
        },
        {
          day: 6,
          hours: 8,
          tasks: [
            "Conduct full cross-region DR test (4h)",
            "Validate application functionality in DR region (2h)",
            "Test data integrity across regions (2h)",
          ],
        },
        {
          day: 7,
          hours: 8,
          tasks: [
            "Create cross-region DR procedures (3h)",
            "Document cross-region architecture (2h)",
            "Train team on cross-region operations (2h)",
            "Create cross-region troubleshooting guide (1h)",
          ],
        },
        {
          day: 8,
          hours: 8,
          tasks: [
            "Final cross-region testing and validation (3h)",
            "Create cross-region maintenance procedures (2h)",
            "Setup regular cross-region testing schedule (2h)",
            "Document lessons learned and optimizations (1h)",
          ],
        },
      ],
    },

    // SYSTEM HARDENING
    {
      id: 100,
      category: "System Hardening",
      control: "Security patches implemented per timeframe",
      currentStatus: "No",
      totalDays: 3,
      totalHours: 24,
      costOneTime: 12000,
      costMonthly: 3000,
      costJustification: "Systems Manager Patch Manager, automation, testing procedures",
      dailyBreakdown: [
        {
          day: 1,
          hours: 8,
          tasks: [
            "Setup Systems Manager Patch Manager (2h)",
            "Configure patch groups and maintenance windows (3h)",
            "Create patch testing procedures (2h)",
            "Setup patch compliance monitoring (1h)",
          ],
        },
        {
          day: 2,
          hours: 8,
          tasks: [
            "Implement automated patch deployment (4h)",
            "Configure patch rollback procedures (2h)",
            "Setup patch compliance dashboard (2h)",
          ],
        },
        {
          day: 3,
          hours: 8,
          tasks: [
            "Test patch management system (3h)",
            "Create patch management procedures (2h)",
            "Setup patch reporting (2h)",
            "Train team on patch management (1h)",
          ],
        },
      ],
    },

    // INTEROPERABILITY
    {
      id: 101,
      category: "Interoperability",
      control: "Data uses open standards or exportable formats",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with JSON, CSV, XML formats",
      dailyBreakdown: [],
    },
    {
      id: 102,
      category: "Interoperability",
      control: "APIs support open and published standards",
      currentStatus: "Yes",
      totalDays: 0,
      totalHours: 0,
      costOneTime: 0,
      costMonthly: 0,
      costJustification: "Already implemented with REST API and OpenAPI specification",
      dailyBreakdown: [],
    },
  ];

  const filteredControls = useMemo(() => {
    return securityControls.filter((control) => {
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "pending" && control.currentStatus === "No") ||
        (filterStatus === "completed" && control.currentStatus === "Yes");

      const matchesSearch =
        control.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
        control.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchTerm]);

  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const exportToExcel = () => {
    const headers = [
      "Category",
      "Control",
      "Current Status",
      "Total Days",
      "Total Hours",
      "One-time Cost (INR)",
      "Monthly Cost (INR)",
      "Cost Justification",
      "Day",
      "Hours per Day",
      "Tasks",
    ];

    let csvContent = headers.join(",") + "\n";

    filteredControls.forEach((control) => {
      if (control.dailyBreakdown.length === 0) {
        const row = [
          `"${control.category}"`,
          `"${control.control}"`,
          control.currentStatus,
          control.totalDays || 0,
          control.totalHours || 0,
          control.costOneTime || 0,
          control.costMonthly || 0,
          `"${control.costJustification || ''}"`,
          "N/A",
          "N/A",
          "Already implemented",
        ];
        csvContent += row.join(",") + "\n";
      } else {
        control.dailyBreakdown.forEach((day, index) => {
          const row = [
            `"${control.category}"`,
            `"${control.control}"`,
            control.currentStatus,
            index === 0 ? (control.totalDays || 0) : "",
            index === 0 ? (control.totalHours || 0) : "",
            index === 0 ? (control.costOneTime || 0) : "",
            index === 0 ? (control.costMonthly || 0) : "",
            index === 0 ? `"${control.costJustification || ''}"` : "",
            day.day || "",
            day.hours || "",
            `"${(day.tasks || []).join("; ")}"`,
          ];
          csvContent += row.join(",") + "\n";
        });
      }
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "aws_security_implementation_plan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalStats = useMemo(() => {
    const total = filteredControls.reduce(
      (acc, control) => {
        acc.days += control.totalDays || 0;
        acc.hours += control.totalHours || 0;
        acc.oneTimeCost += control.costOneTime || 0;
        acc.monthlyCost += control.costMonthly || 0;
        return acc;
      },
      { days: 0, hours: 0, oneTimeCost: 0, monthlyCost: 0 }
    );

    return total;
  }, [filteredControls]);

  const categoryStats = useMemo(() => {
    const stats = {};
    filteredControls.forEach((control) => {
      if (!stats[control.category]) {
        stats[control.category] = { count: 0, pending: 0, days: 0, cost: 0 };
      }
      stats[control.category].count++;
      if (control.currentStatus === "No") {
        stats[control.category].pending++;
      }
      stats[control.category].days += control.totalDays || 0;
      stats[control.category].cost +=
        (control.costOneTime || 0) + (control.costMonthly || 0) * 12;
    });
    return stats;
  }, [filteredControls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Server className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  AWS Security Controls Implementation Tracker
                </h1>
                <p className="text-gray-600 text-sm">
                  Government compliance roadmap for React/Django/AWS AP-South
                </p>
              </div>
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download size={20} />
              <span className="font-medium">Export to Excel</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Days</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalStats.days}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min((totalStats.days / 400) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {Math.ceil(totalStats.days / 5)} weeks
              </span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Clock className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Hours</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalStats.hours}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min((totalStats.hours / 3200) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {Math.ceil(totalStats.hours / 160)} person-months
              </span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  One-time Cost
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(totalStats.oneTimeCost)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-green-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (totalStats.oneTimeCost / 8000000) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">Initial investment</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <DollarSign className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Monthly Cost
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(totalStats.monthlyCost)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-orange-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (totalStats.monthlyCost / 500000) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {formatCurrency(totalStats.monthlyCost * 12)}/year
              </span>
            </div>
          </div>
        </div>

        {/* AWS-specific Progress Overview */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            AWS Implementation Progress Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">High Priority</h3>
                  <p className="text-sm text-red-600">
                    Critical AWS security controls
                  </p>
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-red-800 mb-1">
                  {
                    filteredControls.filter(
                      (c) =>
                        [
                          "Network Security",
                          "Authentication",
                          "Data Protection",
                          "Cryptographic Key Management",
                        ].includes(c.category) && c.currentStatus === "No"
                    ).length
                  }
                </p>
                <p className="text-sm text-red-600">controls pending</p>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Shield className="text-yellow-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800">
                    Medium Priority
                  </h3>
                  <p className="text-sm text-yellow-600">
                    Important compliance
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-yellow-800 mb-1">
                  {
                    filteredControls.filter(
                      (c) =>
                        [
                          "Log Management",
                          "Backup Management",
                          "Incident Management",
                          "Asset Management",
                        ].includes(c.category) && c.currentStatus === "No"
                    ).length
                  }
                </p>
                <p className="text-sm text-yellow-600">controls pending</p>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Completed</h3>
                  <p className="text-sm text-green-600">Already implemented</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-800 mb-1">
                  {
                    securityControls.filter((c) => c.currentStatus === "Yes")
                      .length
                  }
                </p>
                <p className="text-sm text-green-600">
                  of {securityControls.length} controls
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {securityControls.length > 0 ? Math.round(
                  (securityControls.filter((c) => c.currentStatus === "Yes")
                    .length /
                    securityControls.length) *
                    100
                ) : 0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    securityControls.length > 0 ? (securityControls.filter((c) => c.currentStatus === "Yes")
                      .length /
                      securityControls.length) *
                    100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex items-center gap-3">
                <Filter className="text-gray-600" size={20} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-medium"
                >
                  <option value="all">
                    All Controls ({securityControls.length})
                  </option>
                  <option value="pending">
                    Pending (
                    {
                      securityControls.filter((c) => c.currentStatus === "No")
                        .length
                    }
                    )
                  </option>
                  <option value="completed">
                    Completed (
                    {
                      securityControls.filter((c) => c.currentStatus === "Yes")
                        .length
                    }
                    )
                  </option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Search controls or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Showing {filteredControls.length} of {securityControls.length}{" "}
              controls
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            AWS Service Category Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div
                key={category}
                className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <h4
                  className="font-semibold text-gray-800 mb-2 text-sm truncate"
                  title={category}
                >
                  {category}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{stats.count} controls</span>
                    <span className="font-medium text-red-600">
                      {stats.pending} pending
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{stats.days} days</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(stats.cost)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          stats.count > 0 ? ((stats.count - stats.pending) / stats.count) * 100 : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AWS-specific Information Box */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Server className="text-orange-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-800 mb-2">
                AWS AP-South (Mumbai) Deployment
              </h3>
              <div className="text-sm text-orange-700 space-y-2">
                <p>
                  This implementation plan is specifically designed for a normal web application 
                  (not SaaS) deployed on AWS in the AP-South-1 (Mumbai) region.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <strong>Key AWS Services:</strong>
                    <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                      <li>EC2 with Auto Scaling Groups</li>
                      <li>RDS Multi-AZ with encryption</li>
                      <li>CloudFront CDN</li>
                      <li>Application Load Balancer</li>
                      <li>S3 with lifecycle policies</li>
                      <li>KMS & CloudHSM for encryption</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Security Features:</strong>
                    <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                      <li>WAF with Bot Control</li>
                      <li>GuardDuty & Security Hub</li>
                      <li>CloudTrail & Config</li>
                      <li>Secrets Manager</li>
                      <li>Shield Advanced for DDoS</li>
                      <li>Systems Manager compliance</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3">
                  <strong>Estimated Total Investment:</strong> ₹12-18L one-time + ₹3-5L monthly 
                  for complete government compliance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls List */}
        <div className="space-y-4">
          {filteredControls.map((control) => (
            <div key={control.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div
                className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => toggleRow(control.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        {control.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        control.currentStatus === 'Yes' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {control.currentStatus === 'Yes' ? 'Implemented' : 'Pending'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {control.control}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-600 font-medium">Duration:</span>
                        <p className="font-semibold text-blue-800">
                          {control.totalDays > 0 ? `${control.totalDays} days (${control.totalHours}h)` : 'Already implemented'}
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-green-600 font-medium">One-time Cost:</span>
                        <p className="font-semibold text-green-800">{formatCurrency(control.costOneTime)}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <span className="text-orange-600 font-medium">Monthly Cost:</span>
                        <p className="font-semibold text-orange-800">{formatCurrency(control.costMonthly)}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-center">
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">Details:</span>
                          {expandedRows.has(control.id) ? 
                            <ChevronUp size={20} className="text-orange-600" /> : 
                            <ChevronDown size={20} className="text-orange-600" />
                          }
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 text-sm font-medium">AWS Services & Justification: </span>
                      <span className="text-gray-800 text-sm">{control.costJustification}</span>
                    </div>
                  </div>
                </div>
              </div>

              {expandedRows.has(control.id) && (
                <div className="border-t border-gray-200/50 p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30">
                  {control.dailyBreakdown.length > 0 ? (
                    <>
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Database className="text-orange-600" size={20} />
                        AWS Implementation Plan:
                      </h4>
                      <div className="grid gap-4">
                        {control.dailyBreakdown.map((day) => (
                          <div key={day.day} className="bg-white/80 p-4 rounded-xl border border-gray-200/50 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Day {day.day}
                              </span>
                              <span className="text-gray-600">
                                {day.hours} hours of focused AWS implementation
                              </span>
                              <span className="text-gray-500 text-sm">
                                (Full workday)
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {day.tasks.map((task, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <span className="w-2 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle size={20} />
                        <span className="font-semibold">Already Implemented</span>
                      </div>
                      <p className="text-green-700 mt-2">This control is already implemented in your current AWS environment.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Implementation Summary */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="text-orange-600" size={24} />
            AWS Implementation Status Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">
                Pending Implementation:{" "}
                {securityControls.filter((c) => c.currentStatus === "No").length}{" "}
                controls
              </h3>
              <p className="text-sm text-red-600 mb-1">
                Estimated time:{" "}
                {securityControls
                  .filter((c) => c.currentStatus === "No")
                  .reduce((acc, c) => acc + (c.totalDays || 0), 0)}{" "}
                days
              </p>
              <p className="text-sm text-red-600">
                Total investment:{" "}
                {formatCurrency(
                  securityControls
                    .filter((c) => c.currentStatus === "No")
                    .reduce(
                      (acc, c) => acc + (c.costOneTime || 0) + (c.costMonthly || 0) * 12,
                      0
                    )
                )}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">
                Already Implemented:{" "}
                {securityControls.filter((c) => c.currentStatus === "Yes").length}{" "}
                controls
              </h3>
              <p className="text-sm text-green-600">
                These AWS-native controls provide a solid security foundation to build upon.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                Implementation Progress:{" "}
                {securityControls.length > 0 ? Math.round(
                  (securityControls.filter((c) => c.currentStatus === "Yes")
                    .length /
                    securityControls.length) *
                    100
                ) : 0}
                %
              </h3>
              <p className="text-sm text-blue-600">
                {securityControls.filter((c) => c.currentStatus === "Yes").length}{" "}
                of {securityControls.length} controls completed
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
              <AlertTriangle size={20} />
              AWS-Specific Implementation Notes
            </h3>
            <div className="text-sm text-orange-700 space-y-2">
              <p>
                This comprehensive tracker covers {securityControls.length} security controls specifically 
                tailored for a React/Django application deployed on AWS AP-South infrastructure.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                  <strong>Removed from scope:</strong>
                  <ul className="list-disc list-inside ml-2 mt-1">
                    <li>SaaS-specific controls</li>
                    <li>Multi-tenant SaaS architecture</li>
                    <li>SaaS contract management</li>
                    <li>SaaS API management</li>
                  </ul>
                </div>
                <div>
                  <strong>AWS-optimized approach:</strong>
                  <ul className="list-disc list-inside ml-2 mt-1">
                    <li>Native AWS security services</li>
                    <li>AP-South region compliance</li>
                    <li>Cost-optimized architecture</li>
                    <li>Government data residency</li>
                  </ul>
                </div>
              </div>
              <p className="mt-3">
                <strong>Phase 1 Priority:</strong> Focus on Network Security, Data Protection, 
                and Authentication controls first (≈40% of total effort).
              </p>
              <p>
                <strong>Complete implementation timeline:</strong> 8-12 months with dedicated team, 
                ₹12-18L total investment for full government compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;