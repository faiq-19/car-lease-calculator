# KnowledgeCity Take-Home Assignment: Original Prompt and Assistant Response

## 1. Original prompt

```text
Hi, you need to build a car lease calculator, we will divide this into phases and each phase's output is stored along with the chat's transcript that includes my prompt's and the output you generate (make sure to strip any API keys or sensitive data from the transcript) or if antigravity/gemini let's us download this chat's transcript then that is also a good option.

We work on one phase at a time we will never start second phase unless I approve and mark the current phase as completed. You can ask me questions any time when working on a Phase to clear requirements from your side.

You will never run any direct/indirect DB commands to apply the migration files, you will never run any DB reset commands, you will never run any git write commands you are only allowed to run git and database read commands.

You will create a .gemini folder and there you will store the decisions/output of each phase in a separate folder, you will also create a progress file to keep in track of what you've been doing and what's completed.

One of the important things is to keep this entire project free of any subscription or paid service from development to deployment should be done free and it's source code should be easy to setup on any user machine.

You will be doing a lot of research on this project so you should use the internet and official docs as much as you can, browse reddit posts and other forums so you have real data.

Here's what we need to do for each phase:
PHASE 0:
I will setup github repo and set the origin of this local repo. This will be done on my side. 

PHASE 1:
You will research on a car lease calculator web-app, you will return me the input parameters and output parameters and everything there is to know about a car-leasing calculator, this is a requirement-research share your findings with me once I approve we move to next phase. 

PHASE 2:
You will research on the best framework, database and other tools that would be the best fit for our case, the goal is to keep everything minimal and complete and easier to setup on any new machine, you will also research on our deployment configuration.

PHASE 3:
For this phase we will be researching on how we will implement the business-requirements on code how many pages and api routes we will create how many commits we will make in git, what will be the content of each commit, what database tables and policies we would require, what would be our seed data or test data, the setup of github workflows and test cases, you will also research on user authentication and user roles. You will also investigate on what error/edge cases we can have and how we handle them properly by providing error messages. You will also setup the gitignore file

PHASE 4:
This phase is the acutal code implementation we did on our research based on all phases, you will complete the entire code implementation in this phase, you will do testing and you will make the app work on local machine seamlessly.

PHASE 4.1:
You will review all the changes you done and find any security vulnerabilities, dead code, badly written code logic, and you will finally do the entire code review along with testing.

PHASE 5:
This is the deployment phase, you will provide me the instruction to deploy this app free on some hosting service, you will also setup the repo so that it can be setup on any machine without any issues.

This is it.

PHASE 4:
This phase the documentation setup and transcript setup, you will create a readme file that inculdes all the necessary instruction for this repo and it's setup and what it do. For the transcript you will be updating for each prompt but in this phase make sure it is fully updated based on this chat or any other chat, make sure no API key or sensitive data is being exposed in any kind of document. Further more you need to create 3 more specific documents:
- App roles: it answers who uses the app
- Jobs to be done: it answers why they use it?
- User Stores with acceptance criteria: it answers how the app help them get the job done
Please ask me details for each doc type once we are at this phase, make the docuements and other files in this repo are properly orgnized
```

## 2. Assistant response

I actually like your prompt. And I don't think you should turn it into some corporate-looking technical specification. The conversational approach is part of what makes it good: you're treating the AI as a development partner, establishing boundaries, and making decisions together instead of throwing a one-line request at it.

However, after comparing it against the KnowledgeCity assignment, I'd make some important changes.

# 1. Does your prompt satisfy the assignment?

<badge color="warning">Partially complete</badge>

Your prompt covers most of the workflow, but it doesn't explicitly guarantee every submission requirement.

| KnowledgeCity requirement | Your prompt |
|---|---|
| Working browser calculator | <badge color="success">Covered</badge> |
| AI coding tool writes the code | <badge color="success">Covered</badge> |
| Complete source code | <badge color="success">Covered</badge> |
| README with setup instructions | <badge color="warning">Incomplete</badge> |
| Full AI session transcript | <badge color="warning">Needs correction</badge> |
| App Roles | <badge color="success">Covered</badge> |
| Jobs To Be Done | <badge color="success">Covered</badge> |
| User Stories and acceptance criteria | <badge color="warning">Needs detail</badge> |
| Implementation status for every story | <badge color="danger">Missing</badge> |
| Error handling and edge cases | <badge color="success">Covered</badge> |
| Final package structure | <badge color="warning">Incomplete</badge> |
| HR confirmation and submission email | <badge color="danger">Missing</badge> |

The assignment specifically requires the README to state prerequisites, exact installation and startup commands, test commands, AI tool and model, manual code changes, and assumptions. <FileCite ref_id="turn0file0" />

It also requires every user story to identify its associated job, and every job to identify its associated role. Acceptance criteria should be testable, preferably using Given/When/Then, and stories must have an Implemented or Not implemented status. <FileCite ref_id="turn0file0" />

# 2. Important improvements I'd make

## A. Don't overengineer the calculator

This is probably my biggest concern.

Your Phase 3 currently includes:

- Database tables and policies.
- Authentication and user roles.
- API routes.
- Seed data.
- GitHub workflows.
- Multiple commits.

What exactly does a car lease calculator need a database for?

Unless you're planning to let users register, save multiple financing plans, compare them across devices, and retrieve historical calculations, you probably don't need one.

A calculator can be entirely client-side.

The same applies to authentication. KnowledgeCity's definition of App Roles describes the people using the application, not necessarily technical authorization roles such as Admin and Customer.

**My recommendation:** Let Gemini investigate whether a database or authentication is actually necessary. Its default should be to avoid them unless a real requirement justifies them.

This is a product engineering assessment, not a competition to see how many technologies we can fit into one repository.

## B. Move product documentation before implementation

Your current plan creates the three product documents at the very end.

I'd change this.

In Phase 3, Gemini should create the initial versions of:

1. `app-roles.md`
2. `jobs-to-be-done.md`
3. `user-stories.md`

These should guide the implementation in Phase 4.

After implementation, Gemini should update the status of each story based on actual testing.

That way, you're demonstrating that you can translate user needs into requirements and then verify whether the software satisfies them.

## C. Define the financial model properly

A car lease calculator isn't necessarily just:

`Monthly installment = Car price / Number of months`

There are several financial variables that can change the calculation considerably.

For example:

- Vehicle price.
- Down payment.
- Financing amount.
- Annual interest or profit rate.
- Financing tenure.
- Processing fees.
- Insurance or Takaful.
- Residual or balloon payment.
- Monthly installment.
- Total amount payable.

You also need to distinguish between different financing calculation methods.

For example, conventional reducing-balance financing and Islamic Ijarah arrangements shouldn't automatically be treated as identical.

Your Phase 1 should investigate the available models, identify the intended audience and market, document their formulas, and recommend a suitable MVP.

Don't let Gemini randomly choose a formula and build an entire application around it.

## D. Correct the transcript instructions

There's a particularly important detail here.

KnowledgeCity requires the actual conversation, including your prompts and the AI's responses. They specifically say that a summary does not count and that nothing should be changed apart from removing passwords, API keys and tokens. <FileCite ref_id="turn0file0" />

For Gemini CLI, the current documented export command is:

```text
/chat share transcripts/session-01.md
```

Gemini CLI automatically saves session histories, including prompts, responses and tool executions. Its session retention also has a configurable expiry, so don't rely on automatic storage as your only backup. <Cite refs={["turn336469search0","turn336469search1","turn336469search6"]}/>

I'd export after each working session and preserve the original conversation.

Also, if you use Antigravity instead of Gemini CLI, verify its export method separately.

## E. Fix your phase numbering

You have two Phase 4 entries.

I'd organize it like this:

| Phase | Purpose |
|---|---|
| 0 | Repository setup |
| 1 | Product and financial research |
| 2 | Technology and architecture research |
| 3 | Product specification and implementation planning |
| 4 | Actual development |
| 4.1 | Code review, security and testing |
| 5 | Deployment |
| 6 | Documentation and final packaging |

One more thing: your restriction against Git write commands conflicts slightly with planning commits. That's easily resolved: Gemini can propose a commit plan, but you execute the commits yourself.

---

# 3. My revised version of your prompt

I've retained your conversational style, your phase-based workflow, your restrictions and your original intentions. I've mainly added missing requirements and removed unnecessary assumptions.

## Revised prompt

# KnowledgeCity Take-Home Assignment: Car Lease Calculator

Hi, we're going to build a car lease calculator web application. I want us to divide the entire project into phases and work through them one at a time.

The idea is that we research, make decisions, document everything, and then implement what we've agreed upon. I don't want us rushing into writing code without understanding what we're building.

## General instructions and rules

1. We will work on one phase at a time. We will NEVER start the next phase unless I review the current phase, approve it, and explicitly mark it as completed.

2. You can ask me questions whenever you need clarification about requirements, decisions or assumptions. Don't make important product or technical decisions silently. When something is unclear, bring it to my attention.

3. At the beginning of the project, create a `.gemini` folder. Inside it, maintain separate folders for phase-related notes and decisions. Each phase should have its own documentation containing research, findings, decisions, assumptions and open questions.

4. Maintain a `PROGRESS.md` file inside `.gemini` to keep track of what we're doing, what has been completed, the current phase and what's still pending. Update it as we progress.

5. Keep the entire project free from paid subscriptions, paid APIs and paid services. Development, local execution and the ability to set up the application on another machine must not depend on paid services, API keys or cloud infrastructure.

6. Research properly before making recommendations. Prioritize official documentation, financial institutions, trustworthy sources and relevant technical documentation. You can also research Reddit discussions and other forums to understand real-world experiences, but distinguish personal opinions from verified information. Include source links and dates in your research documents. Never invent sources or facts.

7. Keep the application as simple as possible while meeting the actual requirements. Don't introduce a database, authentication, API routes or additional infrastructure just because they're common in other applications. First establish whether they solve a genuine user problem. Explain and get my approval before introducing unnecessary complexity.

8. You will write the application code through the AI coding tool. I will review your work and may provide feedback or make manual changes. Any manual changes I make must be documented in the README.

9. You must never run Git write commands. You may use Git read-only commands to inspect the repository, history and changes. I will handle commits, pushes, branches and other Git operations myself. You can propose a commit plan, but never execute it.

10. Database access is read-only. Never run commands or queries that modify a database, apply migrations, reset databases, seed data or otherwise change database state. If the architecture requires a database, propose the schema and migration plan for my review, but do not execute it.

11. Never execute destructive shell commands or overwrite existing work without my approval.

12. Keep the code, architecture and documentation understandable. Don't introduce unnecessary abstractions, dependencies or features.

## PHASE 0: Repository setup

I will create the GitHub repository and initialize the local repository myself. I will also configure the remote origin.

You should inspect the existing repository and understand its current structure once I have completed the setup.

Do not modify the Git configuration or execute any Git write commands.

## PHASE 1: Product and financial research

For this phase, research the requirements of a car lease calculator.

I want to understand the actual financial model before we decide what to build.

Research the following:

- Who would use this calculator and what problem are they trying to solve?
- What types of car leasing and financing calculations are commonly used?
- What input parameters are required?
- What output parameters should the calculator provide?
- What financial formulas and calculation methods are used?
- How do different interest or profit calculation methods affect monthly installments?
- How do down payments, financing tenure, processing fees, insurance, Takaful and residual or balloon payments affect the results?
- What validation rules should apply to the inputs?
- What edge cases and calculation errors should we consider?
- What are the common features available in existing car lease calculators?
- Which features are essential for our first version and which can be considered future improvements?

Also investigate the target market, currency and financing assumptions. Don't assume that all countries or financing products use the same calculation method.

For every calculation method you recommend, explain its formula and provide a worked example so we can verify the result independently.

Separate the findings into:
- Essential MVP requirements.
- Optional features.
- Future improvements.

At the end of this phase, present your findings and recommendations. Do not start Phase 2 until I review and approve everything.

## PHASE 2: Technology and architecture research

Now that we have established what we're building, research the best technology stack for this particular application.

Consider:

- Frontend framework.
- Backend requirements, if any.
- Database requirements, if any.
- Libraries and dependencies.
- Calculation and validation logic.
- Testing framework.
- Development environment.
- Application hosting and deployment options.
- GitHub integration and workflows.

The objective is to keep everything minimal, maintainable, easy to understand and simple to set up on another machine.

I want the entire development and deployment process to remain free.

Research the available free hosting options and their limitations, including whether they require an account, API keys or external services.

Don't introduce a database or authentication unless there is a genuine requirement. Explain why we need them before recommending them.

At the end of this phase, recommend one architecture and technology stack. Explain the reasoning behind your decisions and document the alternatives you considered.

Wait for my approval before starting Phase 3.

## PHASE 3: Product specification and implementation planning

This is where we translate our research into an actual development plan.

We will define the complete application structure and document the requirements before implementation.

Research and establish:

1. What pages and components the application needs.
2. What API routes, if any, are genuinely required.
3. How the application will be structured.
4. How financial calculations will be implemented.
5. How inputs will be validated.
6. How errors and edge cases will be handled.
7. What tests we need to write.
8. What sample data and test cases we need.
9. What GitHub workflows are useful for this project.
10. What should be included in `.gitignore`.
11. A proposed Git commit plan, including the purpose and contents of each commit. Remember that I will execute the actual Git operations.

Also investigate security, accessibility, responsive design and browser compatibility.

### Product documents

During this phase, create the initial versions of the following three documents:

**1. App Roles (`app-roles.md`)**

This document answers who uses the application.

Each role should follow this format:

"A [role] is [who this person is and their situation]. They can [what they see and do in the app]. They must never [what the app must prevent]."

Only include restrictions that actually apply.

**2. Jobs To Be Done (`jobs-to-be-done.md`)**

This document explains why people use the application.

Each job should follow this format:

"When [situation], I want to [motivation], so I can [expected outcome]."

Each job must identify the role it belongs to.

A job should describe what the person needs to accomplish, not simply mention an application feature or button.

**3. User Stories with Acceptance Criteria (`user-stories.md`)**

This document explains how the application helps users accomplish their jobs.

Each story should follow this format:

"As a [role], I want [capability], so that [benefit]."

Every story must reference the job it serves.

Include specific, testable acceptance criteria, preferably using:

- Given [starting state]
- When [action]
- Then [observable result]

Cover normal scenarios, invalid inputs, boundary values, very large and very small numbers, and recovery after errors.

Every user story must have a status:
- Implemented
- Not implemented

At this point, all stories should initially be marked Not implemented. We will update their status only after the relevant functionality has been developed and tested.

Remember that App Roles describe the people using the application. They do not automatically mean we need technical user authentication or administrator permissions.

### Completion of Phase 3

Present the complete product specification, technical architecture, test plan and implementation plan.

I will review everything before we move into development.

## PHASE 4: Actual implementation

This is where we start writing code based on the decisions and approved requirements from the previous phases.

Follow the implementation plan we agreed upon.

A few important points:

- Implement only approved requirements.
- Don't introduce unapproved features or dependencies.
- Keep the application easy to set up and run locally.
- Follow the agreed architecture and coding conventions.
- Handle invalid inputs and errors properly.
- Write automated tests for the important calculation logic and functionality.
- Make sure the application works in current versions of Chrome, Edge, Firefox and Safari.
- Don't claim that a feature works until you have actually tested it.
- Document any assumptions or implementation decisions that arise during development.

Once the implementation is complete, demonstrate how to run the application and execute its tests.

Do not proceed to Phase 4.1 until I have reviewed the implementation.

## PHASE 4.1: Code review, security review and testing

Review the entire project, including the changes you made during implementation.

Look for:

- Security vulnerabilities.
- Incorrect financial calculation logic.
- Incorrect input validation.
- Unhandled exceptions.
- Dead or unused code.
- Unnecessary dependencies.
- Poorly structured or duplicated code.
- Performance issues.
- Accessibility problems.
- Inconsistent UI behaviour.
- Missing test coverage.

Run the available tests again and add or improve tests wherever necessary.

Fix the problems you identify, then provide a final review report explaining what you found and what you changed.

Do not proceed until I approve the review.

## PHASE 5: Deployment

Research and recommend a free hosting option for the application.

The deployment must not introduce a paid dependency.

Provide the exact instructions required to deploy the application and configure the repository for the deployment process.

The application must continue to work locally without relying on the deployed version or any cloud service.

A public URL is welcome, but local execution remains the primary requirement.

Do not deploy anything or make changes to external services without my approval.

## PHASE 6: Documentation and final packaging

This is the final phase. We will prepare the complete submission package for KnowledgeCity.

### 1. README

Create a README.md in the repository root containing:

- What the application does.
- Who the application is for.
- Why we chose this type of calculator.
- Main features.
- Technology stack.
- Prerequisites.
- Exact installation and startup commands.
- Exact commands for running tests.
- How to build the application, if applicable.
- How to deploy it, if applicable.
- Which AI coding tool and model were used.
- Any code changes I made manually.
- Assumptions and limitations.

A developer should be able to follow the README on a clean machine and run the application without needing a paid account, API key or cloud service.

### 2. Product documents

Finalize and review the three documents created in Phase 3:

- `docs/app-roles.md`
- `docs/jobs-to-be-done.md`
- `docs/user-stories.md`

Update the implementation status of every user story based on actual testing.

Do not mark a story Implemented unless its acceptance criteria are satisfied by the running application.

### 3. AI session transcripts

The AI session transcript is an important part of this assessment.

I need the complete conversation between us, including my prompts and your responses, from the beginning to the end of every session.

Do not generate a summary and present it as a transcript.

Use the AI coding tool's official export functionality. When using Gemini CLI, export the session using its chat-sharing functionality, for example:

`/chat share transcripts/session-01.md`

If we work across multiple sessions, preserve each session separately.

Before submission, redact passwords, API keys and access tokens where necessary. Do not otherwise rewrite, summarize or modify the original conversation.

We should also export and preserve transcripts throughout development rather than relying entirely on the tool's automatic session storage.

### 4. Final repository structure

Organize the project in a way that is easy to understand and review.

The submission should follow this general structure:

```text
firstname-lastname-calculator/
├── README.md
├── src/
├── docs/
│   ├── app-roles.md
│   ├── jobs-to-be-done.md
│   └── user-stories.md
├── transcripts/
│   ├── session-01.md
│   └── session-02.md
├── .gemini/
│   ├── PROGRESS.md
│   └── phases/
├── .gitignore
└── package.json
```

Adjust the structure according to the technology stack we actually select. Do not include unnecessary folders or generated dependencies such as `node_modules`, virtual environments or build output.

The `.gemini` folder should contain our internal phase records and progress information. The required submission documents and transcripts must remain in their proper locations and must not exist only inside `.gemini`.

### 5. Final verification

Before declaring the assignment complete:

- Verify the application works on a clean local setup.
- Verify the README instructions.
- Run the complete test suite.
- Check that all three product documents are present.
- Check that all implemented stories match the actual application.
- Check that all session transcripts are present and complete.
- Check that no API keys, passwords or access tokens are exposed.
- Check that the repository does not contain unnecessary generated files.

Finally, prepare a submission checklist for me.

KnowledgeCity also requires me to confirm receipt of the assignment and provide an expected submission date. The final submission email must include the repository or Google Drive link, live application URL if available, AI tools and models used, and approximately how long I spent.

Remind me about these communication requirements when we reach final packaging.

---

That's everything.

I want us to be deliberate about this project. Don't rush, don't make assumptions where clarification is needed, and don't add complexity without a reason.

We will research, discuss, make decisions, document them, implement them and verify the results.

**One phase at a time. I approve before we move forward.**

# 4. A few final recommendations

There are three things I'd particularly like you to take away.

**1. Don't artificially introduce backend engineering.**

Your strength is backend and AI engineering, but this assignment is evaluating product thinking too. Recognizing that a calculator doesn't need a database or authentication can actually demonstrate better engineering judgment than adding them.

**2. Export transcripts frequently.**

Don't wait until Phase 6. At the end of every Gemini CLI session, export it. The documented `/chat share` command supports Markdown and JSON exports. <Link url="https://geminicli.com/docs/reference/commands/" title="Gemini CLI command documentation"/>.

**3. Contact HR now.**

One timing detail: your assignment says to confirm receipt and provide an expected submission date when you receive it. That's something to do now, not at Phase 6. The final submission email comes later.

---

## My verdict

<badge color="success">Ready after these adjustments</badge>

Your original prompt had the right philosophy. The revised version makes it more aligned with what KnowledgeCity wants to evaluate:

- You understand the user before building.
- You research the financial domain before choosing formulas.
- You establish measurable requirements before coding.
- You direct an AI agent rather than blindly accepting its output.
- You verify that the implementation matches the requirements.
- You deliver proper documentation and evidence of your work.