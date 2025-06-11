# JobForYou

Tech Stack
  Backend: Node.js + Express + TypeScript + Sequelize + MySQL
  Frontend: React.js + TypeScript (create-react-app)
  ORM: Sequelize
  Authentication: JWT (có refresh token)

1. Install dependencies
   cd backend
   npm install

2. .env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=recruitment_db
   DB_PORT=3306

   PORT=5000
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret

3. Run development server
   npm run dev
