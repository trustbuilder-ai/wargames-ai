### <ins>Startup Credit Links</ins>

- [AWS Startup Credits](https://aws.amazon.com/startups/credits?lang=en-US)
- [Google Cloud Startup Program](https://cloud.google.com/startup/apply?utm_source=google&utm_medium=cpc&utm_campaign=FY21-Q1-global-demandgen-website-cs-startup_program_mc)
<br>
<br>

### <ins>Technical Requirements</ins>

- **Business account(s)** on cloud platform.

- **User data storage:**
  - User identity stored on backend (even if just anon + cookie initially).
  - User resource consumption tracking. Quantifiable units (e.g., LLM tokens, compute, storage). Does not all need to be visible to user.
  - User workspace revisions: point-in-time workspace state and LLM-context tracking to give best chance at issue reproduction.  
    *(Note: platform complexity not specified/implied).*

- **LLM:**
  - API self-hosted (e.g., Llama, DeepSeek) or remote (OpenRouter, OpenAI, Grok, Anthropic, etc).

- **Landing page**
  - High quality landing page.
 
- **Platform interface**
  - e.g., at least prompt window
   
<br>
<br>

### <ins>Candidate Tech Stack</ins>

#### Administration and Company Credentials

- AWS IAM for RBAC admin account management in AWS console. Root account seldom if ever used.
- AWS Secrets for vendor API keys, etc.

#### LLMs

- Use remote-hosted LLM APIs for initial deployment (lower minimum cost).

#### Platform Frontend

- Bolt or Lovable for UI/landing.
- As yet undetermined service for hosting landing page.  
  GitHub Pages could work for landing to keep costs down, then e.g., redirect to `platform.BIZ_URL`, or `auth.BIZ_URL`, etc.

#### Platform Backend

- CDK for infrastructure-defining code and deployment.
- AWS Cognito for user account login interface, credential management, etc. No minimum cost.
- DynamoDB for user data storage. No minimum cost.
- As yet undetermined AWS service for platform hosting.  
  Strong candidate is AWS ECS for containerized deployments.
