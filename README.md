# Server of the PWA Bonsapp

Developed with the framework Express.js and using the following middlewares and npm packages:
- bcrptjs (Salt hash for user passwords).
- body-parser (Parsing middleware).
- cookie-parser (Populate cookies for persisten sessions).
- es6-promisify (Convert Callback based functions to EM6 promises).
- passport.js (Authentication Middleware).
- passport-local (Auth Method used).
- sequelize (ORM to connect with the PostgreSQL managed Database).

# Starting the Dev Server

- Clone the repo with: `git clone https://github.com/SamuelVera/dosPiNovenos-Bonsapp-Server.git`.
- Run `npm i` with a cmd console inside the folder of the cloned repo.
- Run `npm run nodemon` to get the dev server on.
- Server will be on listening in the localhost port 5000.
- To dev Client need to be on. Client Repo: https://github.com/SamuelVera/dosPiNovenos-Bonsapp-Client.
