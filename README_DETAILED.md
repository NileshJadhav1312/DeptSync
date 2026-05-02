# DeptSync: Department Data Management & Research Tracking
## Comprehensive Project Documentation (SDLC, SRS, Design & Testing)

---

## 1. Introduction

### 1.1 Brief Description
**DeptSync** is a state-of-the-art, centralized **Department Data Management System (DDMS)** specifically engineered for the modern academic landscape. At its core, the platform serves as a digital ecosystem that bridges the communication gap between three primary stakeholders: **Students, Faculty (Teachers), and Department Administrators**. 

The system moves beyond simple data entry by implementing a "Synchronization Engine" that tracks the entire lifecycle of an academic contribution. Whether it is a peer-reviewed journal publication, a government-funded grant, a registered patent, or a student-led research project, DeptSync digitizes the submission, verification, and archival process. By creating a unified "Source of Truth," the platform eliminates the need for redundant paperwork and ensures that the department's intellectual capital is preserved and easily accessible for career progression and institutional audits.

### 1.2 Problem Statement
The current administrative processes in many academic departments are plagued by systemic inefficiencies. This project identifies and addresses three critical pain points:

*   **Fragmented Data Ecosystems (Data Inconsistency)**: Research data is often scattered across personal spreadsheets, email threads, and various Google Forms. This fragmentation leads to "Data Silos," where a single research paper might have different metadata recorded in two separate places, making it impossible to establish an accurate departmental repository.
*   **Approval Bottlenecks (Operational Delays)**: Without a centralized workflow, the path from student submission to faculty approval is manual and non-transparent. Faculty members are often overwhelmed with physical files or unorganized digital links, leading to significant delays in verifying contributions, which can negatively impact student portfolios and performance reviews.
*   **Accreditation Reporting Burden (Strategic Impact)**: Periodic institutional audits (such as **NAAC, NIRF, and NBA**) require comprehensive, verified data on research output. Manually aggregating this data from hundreds of students and faculty members every year is an error-prone and labor-intensive task that diverts valuable time away from teaching and research.

### 1.3 Objectives
To resolve the aforementioned challenges, DeptSync is guided by the following technical and operational objectives:
*   **Automated Lifecycle Management**: To implement a robust workflow that automates the transition of a record from "Draft" to "Pending Approval" to "Verified/Approved," ensuring accountability at every stage.
*   **Real-Time Data Visualization**: To provide role-specific dashboards that transform raw data into actionable insights, such as contribution counts, approval ratios, and research area distributions.
*   **Strict Schema Standardization**: To enforce a standardized data format for all contribution types (e.g., ISSN/ISBN validation for journals, filing dates for patents), ensuring that the database is high-quality and "audit-ready."
*   **Seamless Report Generation**: To empower administrators with a "One-Click" logic for exporting verified data into formats required for institutional reporting and accreditation.
*   **Digital Proof Repository**: To provide a secure cloud-based storage system where every data entry is backed by a verifiable PDF or image proof, eliminating the need for physical file maintenance.

### 1.4 Scope and Limitations
**Project Scope:**
The system is designed as a modular framework covering the most critical academic contributions:
*   **Research Modules**: Full CRUD support and approval logic for Journal Publications, Conference Papers, Patents, Copyrights, Book Chapters, Grants, and Professional Consultancies.
*   **Academic Milestones**: Management of Major/Mini Technical Projects, Student Achievements, and Departmental Activities.
*   **Role-Specific Workspaces**: Distinct interfaces for Students (Submission), Teachers (Review/Coordination), and Admins (Analytics/Global View).

**Project Limitations:**
While DeptSync provides a comprehensive management layer, the current version has defined boundaries:
*   **Manual Verification**: Verification of "Supporting Documents" still requires human oversight by a Teacher/Coordinator; the system does not yet utilize AI-based document verification.
*   **Third-Party API Integration**: Direct synchronization with external databases (like **Scopus, Web of Science, or Google Scholar**) is currently out of scope and planned for future releases.
*   **Plagiarism Detection**: The system handles the management of data but does not perform internal plagiarism checks on uploaded documents.
*   **External Payments**: While it tracks Consultancy revenue, it does not process financial transactions directly.

---

## 2. SDLC Model Selection & Rationale

### 2.1 Chosen SDLC Model: Agile (Scrum)
The development of DeptSync was executed using the **Agile Scrum** framework. This methodology was selected to handle the complexity of multi-role synchronization and the evolving nature of academic data requirements. The project was divided into **2-week Sprints**, each culminating in a functional increment of the platform.

Key Scrum ceremonies implemented included:
*   **Sprint Planning**: Defining the "Definition of Done" (DoD) for research modules like Journals and Patents.
*   **Daily Stand-ups**: Ensuring synchronization between frontend components (React) and backend API development (Node.js).
*   **Sprint Reviews**: Demonstrating progress to faculty stakeholders to ensure the "Approval Workflow" matched real-world departmental hierarchies.

### 2.2 Justification

#### 2.2.1 Requirement Flexibility (Handling Uncertainty)
In an academic environment, the data fields required for research can vary significantly between departments (e.g., Computer Science vs. Mechanical Engineering). Traditional Waterfall models would have required a frozen "Requirement Specification" which is impractical for a dynamic DDMS.
*   **Technical Agility**: Using Agile allowed us to refine our **Mongoose schemas** iteratively. For instance, we initially focused on basic Journal fields but later realized the need for specialized indexing tags (Scopus/UGC Care) and quartile rankings. Agile enabled these database migrations without disrupting the existing codebase.

#### 2.2.2 Speed to Market (MVP Approach)
The primary goal was to provide immediate value to the department. We adopted a **Minimum Viable Product (MVP)** strategy:
*   **Core Sprints**: The first three sprints were dedicated to building the "Journal Publication" and "Major Project" modules, as these represent the highest volume of data in any academic cycle.
*   **Incremental Expansion**: By launching the core MVP, the department could begin digitizing the most critical records while the development team worked on secondary modules like "Consultancies" and "Copyrights" in subsequent sprints. This ensured that the platform was "live" and generating data within weeks rather than months.

#### 2.2.3 User-Centric Feedback Loop
A Department Data Management system is only effective if it is easy for non-technical faculty and busy students to use. 
*   **Iterative Design**: After each sprint, we conducted usability testing with a pilot group of students and teachers. Feedback on the "Review Modal" and "Submission Forms" led to significant UI refinements—such as adding drag-and-drop support for proofs and simplifying the multi-step patent submission process. This feedback loop ensured that the final product was intuitive and required minimal training for the end-users.

#### 2.2.4 Risk Management (Fail-Fast Logic)
Agile’s incremental delivery acts as a natural risk mitigation tool. 
*   **Early Issue Detection**: By delivering features in small increments, we identified a critical structural risk early in the project: the **"Inconsistent Ownership Mapping"** (where some legacy records used `studentId` while newer ones used `createdById`). 
*   **Resolution Strategy**: Because this was caught in an early sprint review, we were able to refactor the backend controllers to use a **Polymorphic Query Pattern ($or query)** across all modules. If we had used a Waterfall approach, this inconsistency might only have been discovered during the final integration phase, leading to a massive and expensive redesign of the data layer. 
*   **Continuous Quality**: Continuous integration and regular testing at the end of each sprint ensured that the "Sync Logic" between students and teachers remained robust as more research modules were added.

---

## 3. Requirement Analysis (SRS)

### 3.1 Functional Requirements

#### Module 1: User Authentication & Profile (Identity Management)
The system implements a multi-tenant authentication strategy to distinguish between different academic roles.
*   **FR1.1: Role-Based Access Control (RBAC)**: Using **JSON Web Tokens (JWT)**, the system enforces strict authorization. 
    *   **Students** have access only to their own submissions and classroom activities.
    *   **Teachers** can access department-wide data for review but are restricted from administrative settings.
    *   **Admins** have full system visibility, including user management and data audits.
*   **FR1.2: Department-Specific Logic**: To prevent data contamination, the system uses unique **Department UIDs**. Students must join a department and an academic classroom using unique codes, ensuring that their research contributions are correctly mapped to their respective faculty coordinators.

#### Module 2: Research Management (The Contribution Engine)
This is the core data-ingestion layer of DeptSync.
*   **FR2.1: Specialized Submission Forms**: Each research type (Journal, Patent, Copyright, Grant) has a tailored form that enforces specific academic metadata (e.g., ISSN/ISBN for journals, Application Numbers for patents).
*   **FR2.2: Advanced Indexing Support**: The system provides native support for categorizing publications based on global standards such as **Scopus, IEEE, and UGC Care**, allowing for accurate quartile (Q1-Q4) and impact factor tracking.
*   **FR2.3: Evidence-Based Validation**: Every entry requires the upload of a **Supporting Document (Proof)**. The system manages these as cloud-stored assets, ensuring that faculty can verify the validity of a claim without physical paperwork.

#### Module 3: Academic Management (Project & Milestone Tracking)
This module tracks the practical application of technical knowledge.
*   **FR3.1: Academic Project Categorization**: Supports tracking of **Major Projects, Mini Projects, and Research Internships**, capturing abstracts, guide names, and funding details.
*   **FR3.2: Relational Member Mapping**: For group projects, the system allows for the identification of all team members. This relational data ensures that a single project is correctly attributed to multiple student portfolios simultaneously.

#### Module 4: Approval Workflow (The Synchronization Logic)
This module manages the state transitions of academic data.
*   **FR4.1: Aggregated Pending Queues**: Teachers are presented with a "Review Queue" filtered by their department and classroom. This prevents "Information Overload" and ensures they only see submissions relevant to them.
*   **FR4.2: Feedback & Decision Interface**: Faculty can approve or reject submissions. In case of rejection, the system enforces a "Coordinator Comment" requirement, providing students with clear feedback for revision.
*   **FR4.3: Real-Time Synchronization**: Status changes (Pending -> Approved) are instantly reflected on the student dashboard through efficient state management, eliminating the need for manual follow-ups.

#### Module 5: Admin Panel & Analytics (Institutional Oversight)
*   **FR5.1: Aggregated Reporting**: Admins can generate department-wide summaries. The system uses MongoDB aggregation pipelines to calculate totals for publications, patents, and projects, which are essential for **NAAC and NIRF accreditation**.
*   **FR5.2: System Governance**: Admins can manage the user lifecycle (activating/deactivating accounts) and configure department-wide parameters like academic years and designation options.

### 3.2 Non-functional Requirements

*   **3.2.1 Security (Data Protection)**:
    *   **Encryption**: All passwords are encrypted using **Bcrypt** with a salt factor of 10.
    *   **Session Management**: Stateless JWT authentication ensures that user sessions are secure and scalable across multiple server instances.
*   **3.2.2 Performance (Scalability)**:
    *   **Indexing Strategy**: We implement compound indexes on `departmentId` and `studentId` fields in MongoDB, ensuring that dashboard queries remain sub-second even as the database grows to thousands of records.
    *   **Data Retrieval**: Use of `Lean()` in Mongoose queries to bypass document hydration for read-only operations, significantly reducing memory overhead.
*   **3.2.3 Usability (Human-Centered Design)**:
    *   **Responsive UI**: Built with **Tailwind CSS**, the interface adapts seamlessly from mobile devices (for quick status checks) to large desktop monitors (for detailed data review).
    *   **Design System**: A professional color palette and the **Inter** typography ensure high readability and a premium "Enterprise" feel.
*   **3.2.4 Reliability (Data Integrity)**:
    *   **Atomic Operations**: The system uses Mongoose middleware and pre-save hooks to ensure that data is validated against the schema before being committed to the database.
    *   **Fail-Safe Querying**: Implementation of robust error handling in the API layer ensures that database connection issues or malformed requests do not result in "Zombie Records" or partial data saving.

---

## 4. System Design (UML)

### 4.1 Use Case Diagram
```mermaid
useCaseDiagram
    actor "Student" as S
    actor "Teacher" as T
    actor "Admin" as A

    S --> (Submit Journal/Patent)
    S --> (Join Classroom)
    S --> (View Approval Status)

    T --> (Review Submissions)
    T --> (Approve/Reject Research)
    T --> (Manage Classroom)

    A --> (View Dept Analytics)
    A --> (Manage Users)
```

### 4.2 Class Diagram
```mermaid
classDiagram
    class User {
        +String name
        +String email
        +String role
    }
    class Student {
        +String prnNumber
        +String className
    }
    class Journal {
        +String title
        +String journalName
        +String approvalStatus
    }
    class Project {
        +String title
        +String projectType
    }
    User <|-- Student
    Student "1" -- "0..*" Journal
    Student "1" -- "0..*" Project
```

### 4.3 Sequence Diagram (Approval Flow)
```mermaid
sequenceDiagram
    participant S as Student
    participant B as Backend API
    participant T as Teacher

    S->>B: Post Research Data (Status: Pending)
    B-->>T: Update Pending List
    T->>B: Review & Set Status (Approved)
    B-->>S: Notify Approval
```

---

## 5. GUI Design

### 5.1 Login Page: Minimalist interface with role selection.
### 5.2 Research Submission: Multi-step forms for complex data like Patents.
### 5.3 Student Dashboard: Card-based statistics showing counts of approved vs pending items.
### 5.4 Teacher Review: Detailed modal views for comparing student data with uploaded proofs.

---

## 6. Software Quality Assurance Plan

*   **Testing Strategy**: Unit testing for backend controllers and Integration testing for the end-to-end submission flow.
*   **Tools**: Postman for API testing, Jest for logic validation.
*   **Metrics**: Code coverage target of 85% for core business logic.

---

## 7. Integration of Modern SE Trends

*   **Cloud Computing**: Hosted on modern cloud platforms (Render/AWS) with MongoDB Atlas.
*   **DevOps**: CI/CD pipelines via GitHub Actions for automated deployment.
*   **AI/ML**: Potential integration for auto-extracting metadata from research paper PDFs.
*   **PWA**: Frontend optimized for offline-first viewing of student profiles.

---

## 8. Conclusion and Future Scope

DeptSync successfully digitizes the academic contribution lifecycle. Future updates will include automated report generation for NIRF/NAAC and direct API integrations with Scopus for automated publication verification.
