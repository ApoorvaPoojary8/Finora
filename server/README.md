# Finora Backend

REST API for Finora, an expense tracker that manages income and expense transactions and calculates financial summaries.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript

## Features

- Create income and expense transactions
- Retrieve transaction history
- Calculate total income, expenses, and net savings
- Delete transactions
- Validate incoming transaction data
- Handle API errors consistently

## Project Structure

```text
server/
├── controllers/
│   └── transactionController.js
├── middleware/
│   └── errorHandler.js
├── models/
│   └── Transaction.js
├── routes/
│   └── transactionRoutes.js
├── tests/
│   ├── transactionValidator.test.js
│   └── errorHandler.test.js
├── utils/
│   └── validateTransaction.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file based on `.env.example` and set your MongoDB Atlas connection string.

### 3. Start the development server

```bash
npm run dev
```

The API runs at `http://localhost:5000` by default.

### 4. Run tests

```bash
npm test
```

## API Contract

Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server status |
| POST | `/api/transactions` | Create a transaction |
| GET | `/api/transactions` | List transactions |
| GET | `/api/transactions/summary` | Get financial totals |
| DELETE | `/api/transactions/:id` | Delete a transaction |

### Create a transaction

`POST /api/transactions`

Request body:

```json
{
  "description": "Monthly salary",
  "amount": 25000.50,
  "type": "income",
  "category": "Salary",
  "date": "2026-10-23"
}
```

The `amount` field is expressed in rupees and must be positive, with at most two decimal places.

Valid transaction types: `income`, `expense`.

Valid categories: `Salary`, `Freelance`, `Investments`, `Food`, `Transport`, `Shopping`, `Bills`, `Education`, `Healthcare`, `Other`.

Successful creation returns HTTP `201`.

### List transactions

`GET /api/transactions`

Returns a transaction count and transaction array, sorted by date descending. Amounts are returned in rupees.

### Get financial summary

`GET /api/transactions/summary`

Example response:

```json
{
  "totalIncome": 25000.5,
  "totalExpenses": 1500,
  "netSavings": 23500.5
}
```

### Delete a transaction

`DELETE /api/transactions/:id`

- `200`: Transaction deleted
- `400`: Invalid transaction ID
- `404`: Transaction not found

## Database Model

The Transaction model contains:

- `description`: required string, maximum 120 characters
- `amount`: positive safe integer stored in paise
- `type`: `income` or `expense`
- `category`: one of the supported categories
- `date`: transaction date
- `createdAt` and `updatedAt`: automatically maintained timestamps

## Error Responses

Validation failures return HTTP `400`. Unexpected server errors return HTTP `500`. Duplicate-key errors return HTTP `409`.

## Security Notes

- Keep database credentials in `.env`.
- Do not commit `.env` or other secrets.
- Configure allowed frontend origins through `CLIENT_URL`.

## Status

Backend implementation is in progress. Verify MongoDB connectivity and run the API tests before considering the backend production-ready.
