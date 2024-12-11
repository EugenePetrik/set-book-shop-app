## BookShop Application

### Technologies Back-end

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Swagger](https://swagger.io/)

### Installation

- Install [Node.js](https://nodejs.org/en/) LTS version

- Check that Node.js is installed

```bash
node -v
```

- Check that package manager npm is installed

```bash
npm -v
```

- Install global project dependencies

```bash
npm install
```

- Install back-end dependencies

```bash
cd backend && npm install && cd -
```

### Run application

- Run back-end application in production mode

```bash
cd backend && npm start
```

- Run back-end application in development mode

```bash
cd backend && npm run server
```

### Environment Configuration

- Back-end application

Create a file named `.env` in the backend directory and include all necessary configurations as shown below.

```bash
NODE_ENV=
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=
JWT_COOKIE_EXPIRE=
```
