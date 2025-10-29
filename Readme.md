# AWS SAM Baseline Project

A clean, modular, and production-ready foundation for serverless applications using **AWS SAM** and **Node.js**.

> ✅ Built per user story:  
> _"Establish AWS SAM Project Baseline with Clean Modular Structure"_

---

## 📁 Project Structure
aws-sam-baseline/


├── template.yaml # Root SAM infrastructure (infra only)
├── samconfig.toml # Environment-specific deployment config
├── README.md # This file
├── src/
│ ├── functions/ # Lambda function handlers (business logic)
│ │ └── ping/ # Example: GET /ping
│ └── shared/ # Shared utilities (e.g., response formatters)
├── events/ # Sample event payloads for local testing
└── tests/ # Local test scripts (e.g., test-ping-local.sh)


### Key Principles
- **Separation of concerns**: Infrastructure (`template.yaml`) ≠ business logic (`src/`)
- **Modular**: Ready for nested stacks (e.g., `infra/api.yaml`, `infra/db.yaml`)
- **Portable**: Works on Linux, macOS, Windows (PowerShell/WSL)
- **CI/CD-ready**: Fully scriptable with `sam build` and `sam deploy`

---

## ▶️ Local Development

### Prerequisites
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) configured (`aws configure`)
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Node.js 20.x

### Commands

```bash
# Validate template
sam validate

# Build application
sam build

# Test locally (HTTP API)
sam local start-api
curl http://127.0.0.1:3000/ping

# Test with event payload
sam local invoke PingFunction -e events/ping-event.json

# Run local test script
./tests/test-ping-local.sh


☁️ Deployment
First-Time Deploy (creates S3 bucket)
bash


1
sam deploy --guided
Follow prompts to set stack name, region, and save config. 

Subsequent Deploys
bash


1
sam deploy
Deploy to Other Environments
bash


1
2
# Example: staging
sam deploy --parameter-overrides EnvironmentName=staging
Output
After deploy, SAM outputs:



1
PingApiUrl = https://<id>.execute-api.<region>.amazonaws.com/Prod/ping/
Test it:

bash


1
curl https://<id>.execute-api.<region>.amazonaws.com/Prod/ping/
🧩 Extensibility
Add New Functions
Create src/functions/<name>/app.js
Add to template.yaml:
yaml


1
2
3
4
5
6
7
8
9
10
11
⌄
⌄
⌄
⌄
⌄
NewFunction:
  Type: AWS::Serverless::Function
  Properties:
    CodeUri: ./
    Handler: src/functions/<name>/app.lambdaHandler
    Events:
      Api:
        Type: Api
        Properties:
          Path: /<path>
          Method: get
Use Nested Stacks (for large apps)
Create infra/api.yaml, then reference in root template.yaml:

yaml


1
2
3
4
5
⌄
⌄
⌄
Resources:
  ApiStack:
    Type: AWS::Serverless::Application
    Properties:
      Location: infra/api.yaml
Add Real Dependencies (e.g., axios)
Create src/functions/ping/package.json
Run npm install axios
SAM will bundle node_modules automatically

