# EZ-Rx-ID Frontend

This is the frontend for EZ-Rx-ID, a React-based web application that allows users to upload pill images and receive predictions.

## 🔧 Setup and Installation

### 1 **Clone the Repository**
If you haven't already cloned the frontend repository, do so by running:

git clone https://github.com/DouglasRollman/frontend

cd frontend

### 2 Install Dependencies
Ensure you have Node.js installed. Then, run:

npm install

### 3 Start the React App

npm start
The app should now be running at http://localhost:3000/.

## Configuration
### Environment Variables

Create a .env file in the frontend/ directory and add:

REACT_APP_SUPABASE_URL=your-supabase-url

REACT_APP_SUPABASE_ANON_KEY=your-anon-key

Replace the placeholders with your actual Supabase credentials. Contact Douglas.rollman07@myhunter.cuny.edu for access to the accompanying database and envriomental variables. 