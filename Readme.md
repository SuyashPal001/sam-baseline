# AWS SAM Baseline Project

A clean, modular, and secure foundation for serverless applications using **AWS SAM** and **Node.js**, with **multi-environment support** and **least-privilege IAM roles**.

> ✅ Built per user stories:  
> - _"Establish Multi-Environment Strategy for AWS SAM Project"_  
> - _"Configure Dedicated IAM Roles for Each Lambda Function"_

---

## 📁 Project Structure
 
profile
Qwen3-Max
1:53 pm
Absolutely! Here is your complete, production-ready README.md — updated to include both your multi-environment strategy and dedicated IAM roles.

Save this as README.md in your project root:

markdown


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
12
⌄
⌄
# AWS SAM Baseline Project

A clean, modular, and secure foundation for serverless applications using **AWS SAM** and **Node.js**, with **multi-environment support** and **least-privilege IAM roles**.

> ✅ Built per user stories:  
> - _"Establish Multi-Environment Strategy for AWS SAM Project"_  
> - _"Configure Dedicated IAM Roles for Each Lambda Function"_

---

## 📁 Project Structure

aws-sam-baseline/
<<<<<<< HEAD


├── template.yaml # Root SAM infrastructure (infra only)
├── samconfig.toml # Environment-specific deployment config
├── README.md # This file
=======
├── template.yaml # Infrastructure (SAM template)
├── samconfig.dev.toml # Dev environment config
├── samconfig.staging.toml # Staging config
├── samconfig.prod.toml # Production config
├── README.md
>>>>>>> b8dd450 (docs: add complete multi-env and IAM documentation)
├── src/
│ ├── functions/ # Lambda handlers (business logic)
│ │ └── ping/ # Example: GET /ping
│ └── shared/ # Shared utilities (e.g., response formatters)
├── events/ # Sample event payloads
└── tests/ # Local test scripts




### Key Principles
- **Separation of concerns**: Infrastructure (`template.yaml`) ≠ business logic (`src/`)
- **Environment isolation**: `dev`, `staging`, `prod` are fully independent
- **Security by default**: Each Lambda has its own least-privilege IAM role
- **Portable**: Works on Linux, macOS, Windows (PowerShell/WSL)

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


# Deploy dev
sam deploy --config-file samconfig.dev.toml

# Deploy staging
sam deploy --config-file samconfig.staging.toml

# Deploy prod
sam deploy --config-file samconfig.prod.toml


# Check role for ping function
ROLE_ARN=$(aws lambda get-function-configuration --function-name myapp-ping-dev --query 'Role' --output text)
echo "Role: $ROLE_ARN"

# List functions using this role (should be only one)
aws lambda list-functions --query "Functions[?Role=='$ROLE_ARN'].FunctionName"

# Inspect policy
ROLE_NAME=$(basename "$ROLE_ARN")
aws iam get-role-policy --role-name "$ROLE_NAME" --policy-name "$(aws iam list-role-policies --role-name "$ROLE_NAME" --query 'PolicyNames[0]' --output text)"


#how to add function 

NewFunction:
  Type: AWS::Serverless::Function
  Properties:
    Role: !GetAtt MyAppNewFunctionRole.Arn
    CodeUri: ./
    Handler: src/functions/<name>/app.lambdaHandler
    # ... events, etc.

MyAppNewFunctionRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument: { ... }
    Policies:
      - PolicyName: !Sub "${ProjectName}-NewFunctionPolicy-${EnvironmentName}"
        PolicyDocument: { ... }  # Only necessary permissions



#use of nested stacks

Resources:
  ApiStack:
    Type: AWS::Serverless::Application
    Properties:
      Location: infra/api.yaml


