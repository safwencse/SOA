# Person Management Dashboard

A clean, modern React dashboard for managing Person entities through a REST API. This single-page application provides a user-friendly interface for performing all CRUD operations on person data.

## Features

- Full CRUD operations (Create, Read, Update, Delete)
- Real-time REST API integration
- Responsive design (desktop, tablet, mobile)
- Form input validation
- Loading indicators and success/error messages
- Built-in API endpoint reference

## Quick Start

### Prerequisites

- Node.js v14 or higher
- npm or yarn
- Tomcat server running on port 8080
- REST API deployed at http://localhost:8080/TP4/persons

### Installation

Clone the repository and install dependencies:
 
npm install  
npm start  

Make sure your backend is running:
- Start Tomcat
- Deploy the TP4 web application
- Verify the API is accessible at http://localhost:8080/TP4/persons

Open the application in your browser:
http://localhost:3000

## API Configuration

The application uses the following REST endpoints:

GET /persons → Fetch all persons  
POST /persons → Create a new person  
PUT /persons/{id} → Update an existing person  
DELETE /persons/{id} → Delete a person  

### Example Requests

Create Person (POST):
{
  "name": "John Doe",
  "age": 30
}

Update Person (PUT):
{
  "name": "Jane Smith",
  "age": 28
}

## How to Use

Adding a person:
- Enter name and age
- Click "Create Person"
- The person appears instantly in the list

Editing a person:
- Click "Edit"
- Modify fields
- Click "Update Person"

Deleting a person:
- Click "Delete"
- Confirm deletion

Refreshing data:
- Click "Refresh" to reload data

## Troubleshooting

CORS error:
Add this annotation to your Java REST controller:
@CrossOrigin(origins = "http://localhost:3000")

API connection failed:
- Ensure Tomcat is running on port 8080
- Verify TP4 is deployed
- Test http://localhost:8080/TP4/persons directly

Form issues:
- Name and Age are required
- Age must be a positive number

## Project Structure

src/
    components/
        Header.js
        Hero.js
        Features.js
        CRUDSection.js
        Footer.js
services/
    api.js
App.js
App.css
