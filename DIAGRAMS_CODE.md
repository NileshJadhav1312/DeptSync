# UML Diagrams Code: DeptSync Project
This file contains the **Mermaid.js** source code for all UML diagrams associated with the DeptSync Department Management system.

### How to Generate Diagrams:
1.  **Mermaid Live Editor**: Copy the code below and paste it into [Mermaid.live](https://mermaid.live/).
2.  **VS Code**: Install the "Mermaid Preview" extension to see these diagrams directly in your editor.
3.  **GitHub**: These code blocks will automatically render as diagrams when pushed to a GitHub repository in a `.md` file.

---

### 4.1 Use Case Diagram
**Purpose**: Illustrates the functional requirements and the actors (Student, Teacher, Admin) interacting with the system.

```mermaid
useCaseDiagram
    actor "Student" as S
    actor "Teacher (Coordinator)" as T
    actor "Admin" as A

    package "DeptSync Core System" {
        usecase "Join Classroom" as UC1
        usecase "Submit Research (Journal/Patent)" as UC2
        usecase "View Personal Stats" as UC3
        usecase "Review Submission Queue" as UC4
        usecase "Approve/Reject Research" as UC5
        usecase "Manage Department Users" as UC6
        usecase "Generate NAAC/NIRF Analytics" as UC7
    }

    S --> UC1
    S --> UC2
    S --> UC3

    T --> UC4
    T --> UC5
    T --> UC1 : Manages

    A --> UC6
    A --> UC7
```

---

### 4.2 Class Diagram
**Purpose**: Shows the static structure of the system, including data models and their relationships.

```mermaid
classDiagram
    class User {
        +String userId
        +String name
        +String email
        +String role
        +login()
        +updateProfile()
    }
    class Student {
        +String prnNumber
        +String className
        +String departmentId
        +joinClassroom()
    }
    class Teacher {
        +String employeeId
        +String designation
        +reviewSubmission()
    }
    class ResearchEntry {
        +String title
        +String status
        +String proofUrl
        +Date createdAt
        +submit()
    }
    class Journal {
        +String journalName
        +String issn
        +String indexing
    }
    class Project {
        +String projectType
        +String[] members
        +String guideName
    }

    User <|-- Student
    User <|-- Teacher
    Student "1" -- "0..*" ResearchEntry : creates
    Teacher "1" -- "0..*" ResearchEntry : reviews
    ResearchEntry <|-- Journal
    ResearchEntry <|-- Project
```

---

### 4.3 Sequence Diagram
**Purpose**: Visualizes the step-by-step logic of the Research Approval process.

```mermaid
sequenceDiagram
    participant S as Student
    participant B as Backend API
    participant DB as MongoDB
    participant T as Teacher

    S->>B: POST /api/journals/create (Metadata + Proof)
    B->>DB: Save Record (status: "Pending")
    B-->>S: Return Success Message
    
    T->>B: GET /api/journals/pending
    B->>DB: Query { status: "Pending", departmentId: T.deptId }
    DB-->>B: Return List
    B-->>T: Render Review Queue
    
    T->>B: PATCH /api/journals/review/:id (Status: "Approved")
    B->>DB: Update Record
    B-->>T: Return Updated Record
    B-->>S: WebSocket Notify (Status Change)
```

---

### 4.4 Activity Diagram
**Purpose**: Outlines the logical flow of a student submitting an academic contribution.

```mermaid
stateDiagram-v2
    [*] --> FillForm
    FillForm --> ValidateFields: Click Submit
    ValidateFields --> ShowError: Fields Missing/Invalid
    ShowError --> FillForm
    ValidateFields --> UploadProof: Valid
    UploadProof --> SaveToDB: Success
    SaveToDB --> PendingState: Status = Pending
    PendingState --> TeacherReview
    TeacherReview --> Approved: Data Validated
    TeacherReview --> Rejected: Data Incorrect
    Approved --> UpdateStats: Increment Counters
    Rejected --> NotifyStudent: Require Re-upload
    NotifyStudent --> FillForm
    UpdateStats --> [*]
```

---

### 4.5 State Diagram
**Purpose**: Defines the lifecycle states of a research record from creation to approval.

```mermaid
stateDiagram-v2
    [*] --> Draft: User starts form
    Draft --> Pending: User submits
    Pending --> UnderReview: Teacher opens modal
    UnderReview --> Approved: Teacher clicks Approve
    UnderReview --> Rejected: Teacher clicks Reject
    Rejected --> Draft: User edits record
    Approved --> Verified: Admin audits data
    Verified --> [*]
```

---

### 4.6 Deployment Diagram
**Purpose**: Shows the physical architecture and deployment environment.

```mermaid
graph TD
    subgraph "Client Side (Frontend)"
        Browser[Web Browser / PWA]
    end

    subgraph "Cloud Hosting (Render/AWS)"
        LB[Load Balancer / Nginx]
        Server[Node.js / Express Server]
        Auth[JWT Service]
    end

    subgraph "External Services"
        S3[Cloudinary / S3 Storage - PDF Proofs]
        SMTP[SendGrid - Email Alerts]
    end

    subgraph "Database Cluster (MongoDB Atlas)"
        DB[(PostgreSQL / MongoDB)]
        Cache[(Redis - Session Cache)]
    end

    Browser -- HTTPS/TLS --> LB
    LB --> Server
    Server --> Auth
    Server --> S3
    Server --> SMTP
    Server --> DB
    Server --> Cache
```
