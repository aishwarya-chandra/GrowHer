mkdir -p backend/config backend/controllers backend/middleware backend/models backend/routes
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv

in .env file
MONGO_URI=mongodb://localhost:27017/growher_db

npm install
node server.js
