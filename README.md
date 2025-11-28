<div align="center"> 
	<img src="./public/horizontal.png" />
</div>

# Stake On It

A prediction market platform for cryptocurrency price movements, combining real-time market data, AI-powered analysis, and news aggregation to enable informed staking decisions.

## Overview

Stake On It is a full-stack web application that democratizes cryptocurrency market predictions by providing users with AI-generated market analysis, real-time news feeds, and a gamified staking system. Users can stake on whether cryptocurrency prices will go up or down based on comprehensive market insights powered by OpenAI, CoinGecko, and NewsAPI integrations.

### Problem Statement

Cryptocurrency markets are volatile and complex, making it difficult for users to make informed predictions. Traditional prediction platforms lack real-time data integration, AI-powered analysis, and user-friendly interfaces that combine multiple data sources.

### Solution

Stake On It addresses this by:
- **AI-Powered Predictions**: Leveraging OpenAI to analyze market data and news, generating detailed predictions with calculated odds
- **Real-Time Data Integration**: Combining CoinGecko for market data and NewsAPI for relevant cryptocurrency news
- **User-Friendly Staking**: Simple interface for users to stake on predictions with transparent odds and potential winnings
- **Comprehensive Tracking**: Users can monitor their stakes, balance, and performance history

### Impact

- Makes cryptocurrency market predictions accessible to users of all experience levels
- Provides educational value through AI-generated analysis and market insights
- Enables data-driven decision making through multi-source data aggregation
- Creates an engaging platform for learning about cryptocurrency markets

<div align="center" style="margin-bottom: 20px;"> 
	<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" /> 
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" /> 
</div>

<div align="center" style="margin-bottom: 20px;"> 
	<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> 
	<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" /> 
</div>

<div align="center" style="margin-bottom: 20px;"> 
	<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /> 
</div>

<div align="center" style="margin-bottom: 20px;"> 
	<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" /> 
	<img src="https://img.shields.io/badge/TheNewsAPI-FF6B35?style=for-the-badge&logo=rss&logoColor=white" /> 
</div>

<div align="center" style="margin-bottom: 20px;"> 
	<img src="https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" /> 
	<img src="https://img.shields.io/badge/AWS_Q-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" /> 
	<img src="https://img.shields.io/badge/Kiro-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" /> 
	<img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" /> 
</div>


## Setup

### Prerequisites
- Node.js >= 22.0.0
- npm >= 10.0.0
- PostgreSQL database
- AWS S3 bucket (for crypto icons, optional)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/stakeonit

# Authentication
JWT_SECRET=your-secret-key-here

# OpenAI (for market predictions)
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-3.5-turbo

# NewsAPI (for cryptocurrency news)
THENEWS_API_KEY=your-newsapi-key

# AWS S3 (for crypto icons)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Server
PORT=3003
```

3. Initialize the database:
```bash
npm run db:init
npm run db:migrate
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3003

### Production Build

```bash
npm run build
npm start
```

## Features

### Core Functionality
- **AI-Powered Market Predictions**: Real-time cryptocurrency predictions with UP/DOWN odds calculated from market volatility and AI analysis
- **News Feed**: Aggregated cryptocurrency news from NewsAPI with intelligent caching and refresh controls
- **Staking System**: Place stakes on market predictions with transparent odds and potential winnings tracking
- **User Management**: Secure authentication, balance management, and transaction history
- **Real-Time Updates**: Live market data integration via CoinGecko API

### Technical Features
- **TypeScript**: Full type safety across the entire codebase
- **Modular Architecture**: Clean separation of concerns with feature-based modules
- **State Management**: Redux Toolkit for global state management
- **Responsive UI**: Material-UI components with Framer Motion animations
- **Database Operations**: PostgreSQL with parameterized queries and transaction support
- **API Integration**: OpenAI for predictions, CoinGecko for market data, NewsAPI for news

## Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Framework**: Material-UI (MUI) v7, Framer Motion
- **State Management**: Redux Toolkit
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Authentication**: JWT tokens
- **External APIs**: OpenAI, CoinGecko, NewsAPI
- **Storage**: AWS S3 (for crypto icons)

### Project Structure
```
stake-on-it/
├── components/        # Reusable UI components
├── lib/              # Core utilities and integrations
│   ├── coingecko/    # Market data integration
│   ├── newsapi/      # News aggregation
│   ├── openapi/      # OpenAI integration
│   ├── database/     # Database operations
│   ├── redux/        # State management
│   └── s3/           # AWS S3 integration
├── modules/          # Feature modules
│   ├── auth/         # Authentication
│   ├── home/         # Home page
│   ├── market/       # Market predictions
│   ├── news/         # News feed
│   ├── stakes/       # Staking system
│   └── profile/      # User profile
└── pages/            # Next.js pages and API routes
```

### Architecture Details

#### Frontend Architecture
- **Next.js Pages Router**: Server-side rendering and static generation
- **Component-Based**: Modular React components with TypeScript
- **State Management**: Redux Toolkit for global state (user auth, balance)
- **Local State**: React hooks for component-level state
- **Styling**: Material-UI theme system with custom styling
- **Animations**: Framer Motion for smooth UI transitions

#### Backend Architecture
- **API Routes**: Next.js API routes for backend logic
- **Database Layer**: Abstraction layer for PostgreSQL operations
- **Authentication**: JWT-based authentication with secure password hashing
- **Caching**: In-memory caching for predictions and news to reduce API calls
- **Error Handling**: Comprehensive error handling with user-friendly messages

#### Data Flow
1. **Market Predictions**: NewsAPI → OpenAI → Database → Frontend
2. **Market Data**: CoinGecko → Frontend (real-time)
3. **User Actions**: Frontend → API Routes → Database → Frontend
4. **News Feed**: NewsAPI → Cache → Database → Frontend

### Key Integrations
- **OpenAI**: Generates market predictions based on news and market data
- **CoinGecko**: Provides real-time cryptocurrency prices and market data
- **NewsAPI**: Aggregates relevant cryptocurrency news articles
- **AWS S3**: Stores and serves cryptocurrency icons

## How We Leveraged AWS AI Tools

This project was built using **Amazon Q Developer** and **Kiro** as part of the AWS Global Vibe: AI Coding Hackathon 2025.

Started with AWS Q Developer + VS Code, then transitioned to using **Kiro + Q Developer** together. Used both tools for TypeScript conversion, refactoring, multi-step agentic coding, code suggestions, debugging, and conversational AI assistance throughout development.

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "balance": 0.00
  }
}
```

#### POST `/api/auth/login`
Authenticate and login a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "balance": 100.00
  }
}
```

### Market Predictions

#### GET `/api/market-predictions`
Get AI-generated market predictions for cryptocurrencies.

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "coin": "BTC",
      "symbol": "btc",
      "name": "Bitcoin",
      "price": 45000,
      "change24h": 2.5,
      "analysis": "Detailed analysis...",
      "upOdds": 1.85,
      "downOdds": 2.10,
      "image": "https://..."
    }
  ],
  "source": "openai",
  "cached": false
}
```

### News Feed

#### GET `/api/news`
Get latest cryptocurrency news articles.

**Response:**
```json
{
  "news": [
    {
      "title": "Bitcoin reaches new high",
      "description": "...",
      "url": "https://...",
      "publishedAt": "2025-11-24T10:00:00Z"
    }
  ]
}
```

### Stakes

#### GET `/api/all-stakes`
Get all stakes (requires authentication).

**Response:**
```json
[
  {
    "id": 1,
    "market_id": "btc",
    "prediction": "up",
    "amount": 50.00,
    "odds": 1.85,
    "potential_winnings": 92.50,
    "status": "active",
    "created_at": "2025-11-24T10:00:00Z",
    "up_bet_count": 5,
    "down_bet_count": 2
  }
]
```

#### POST `/api/place-bet`
Place a bet on a market prediction (requires authentication).

**Request Body:**
```json
{
  "marketId": "btc",
  "prediction": "up",
  "amount": 50.00,
  "odds": 1.85,
  "analysis": "Analysis text..."
}
```

**Response:**
```json
{
  "success": true,
  "stake": {
    "id": 1,
    "amount": 50.00,
    "potential_winnings": 92.50
  }
}
```

### User Management

#### GET `/api/user-stats`
Get user statistics (requires authentication).

**Response:**
```json
{
  "totalStakes": 10,
  "activeStakes": 5,
  "totalWinnings": 150.00,
  "totalDeposits": 200.00
}
```

#### POST `/api/deposit`
Deposit funds to user account (requires authentication).

**Request Body:**
```json
{
  "amount": 100.00
}
```

**Response:**
```json
{
  "success": true,
  "newBalance": 150.00
}
```

## Database Schema

### Tables

#### `users`
Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| email | VARCHAR(255) | Unique user email |
| name | VARCHAR(255) | User's full name |
| password | VARCHAR(255) | Hashed password |
| balance | DECIMAL(10,2) | User's account balance |
| created_at | TIMESTAMP | Account creation timestamp |

#### `stakes`
Stores market prediction stakes created by users.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | Foreign key to users |
| market_id | VARCHAR(255) | Cryptocurrency identifier |
| prediction | TEXT | Prediction direction (up/down) |
| amount | DECIMAL(10,2) | Staked amount |
| odds | DECIMAL(5,2) | Betting odds |
| potential_winnings | DECIMAL(10,2) | Potential winnings amount |
| status | VARCHAR(50) | Stake status (active/expired) |
| created_at | TIMESTAMP | Stake creation timestamp |

#### `bets`
Stores individual bets placed on stakes.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | Foreign key to users |
| stake_id | INTEGER | Foreign key to stakes |
| market_id | VARCHAR(255) | Cryptocurrency identifier |
| prediction | TEXT | Bet direction (up/down) |
| amount | DECIMAL(10,2) | Bet amount |
| odds | DECIMAL(5,2) | Betting odds |
| potential_winnings | DECIMAL(10,2) | Potential winnings |
| created_at | TIMESTAMP | Bet creation timestamp |

#### `transactions`
Stores all financial transactions (deposits, withdrawals, winnings).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | Foreign key to users |
| type | VARCHAR(50) | Transaction type |
| amount | DECIMAL(10,2) | Transaction amount |
| description | TEXT | Transaction description |
| created_at | TIMESTAMP | Transaction timestamp |

#### `market_predictions`
Stores AI-generated market predictions (JSONB format).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| data | JSONB | Prediction data array |
| created_at | TIMESTAMP | Prediction timestamp |

#### `news`
Stores aggregated news articles (JSONB format).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| data | JSONB | News article data |
| created_at | TIMESTAMP | News timestamp |

### Relationships
- `users` → `stakes` (one-to-many)
- `users` → `bets` (one-to-many)
- `users` → `transactions` (one-to-many)
- `stakes` → `bets` (one-to-many)

## Usage

1. Navigate through the app using the top navigation
2. Explore different sections for market insights and predictions
3. Track your stakes and manage your profile