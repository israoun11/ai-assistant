AI Assistant API

A backend application that connects a Node.js and Express API to Google’s Gemini API to generate AI-powered responses.

Features

* AI-powered question answering using the Gemini API
* REST API endpoint for submitting questions
* Input validation for empty or invalid questions
* Environment variables for API key management
* Error handling for API failures

Tech Stack

* Node.js
* Express.js
* Google Gemini API
* dotenv
* Postman

Getting Started

1. Install dependencies

npm install

2. Configure environment variables

Create a .env file in the project root:

GEMINI_API_KEY=your_api_key_here

Never commit your actual API key to GitHub.

3. Start the server

node server.js

The server runs at http://localhost:5000.

API Endpoint

POST /ask

Request body:

{
  "question": "Explain React in simple words."
}

Example response:

{
  "answer": "..."
}

Empty questions return a 400 Bad Request response.

Security

The Gemini API key is stored in an environment variable and is not exposed in frontend code.