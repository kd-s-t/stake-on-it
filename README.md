<div align="center"> 
	<img src="./public/horizontal.png" />
</div>

# Stake On It - AWS Q App

TypeScript app with AWS Q integration for market predictions and analysis.

<div align="center"> 
	<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" /> 
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> 
	<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" /> 
</div>

<div align="center"> 
	<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" /> 
	<img src="https://img.shields.io/badge/AWS_Bedrock-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" /> 
	<img src="https://img.shields.io/badge/AWS_Q-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" /> 
</div>

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure AWS credentials:
```bash
cp .env.example .env
# Edit .env with your AWS credentials
```

3. Start the app:
```bash
npm run dev
```

The application will be available at http://localhost:3003

## Features

- **AWS Q Integration**: Query AWS Q service for insights
- **News**: Latest market news and updates
- **Market Predictions**: AI-powered market analysis
- **Stakes**: Track your betting positions
- **Profile**: User settings and preferences

## API Routes

### POST /api/aws-q
Query AWS Q service for AI-powered insights and analysis.

**Headers:**
- `Content-Type: application/json`
- `x-api-key: <your-api-key>`

**Request Body:**
```json
{
  "prompt": "Your question or prompt for AWS Q"
}
```

**Response:**
```json
{
  "result": "AI-generated response from AWS Q"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## How We Leveraged AWS AI Tools

This project was built using **Amazon Q Developer** as part of the AWS Global Vibe: AI Coding Hackathon 2025.

**Amazon Q Developer:**
- Used Amazon Q Developer for TypeScript conversion and refactoring across all components
- Leveraged Q Developer's multi-step agentic coding capabilities to build the AWS Bedrock integration
- Utilized Q Developer for code suggestions and debugging the market prediction system
- Used Q Developer's conversational AI to design the unified API structure

## Usage

1. Navigate through the app using the top navigation
2. Use the AWS Q integration on the home page to ask questions
3. Explore different sections for market insights and predictions