## BookShop API

### Technologies

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

- Install project dependencies

```bash
npm install
```

### Environment Configuration

Create a file named `.env` in the backend directory and include all necessary configurations as shown below.

```bash
NODE_ENV=
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=
JWT_COOKIE_EXPIRE=
```

### Run server

- Development mode

```bash
npm run server
```

- Production mode

```bash
npm run start
```

### Seed development database

```bash
npm run seed:destroy
```

```bash
npm run seed:import
```

### Swagger Docs

- Access the Swagger UI at `/api-docs` to see the interactive API documentation

### Testing

- Run unit tests

```bash
npm run test:unit
```

- Run integration tests

```bash
npm run test:integration
```
