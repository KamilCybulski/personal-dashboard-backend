# Personal Dashboard backend

## Dev environment
Create `.env` file in the root directory and populate it as follows:
```
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=somepassword
POSTGRES_DB=postgres

JWT_SECRET=somesecret

FRONTEND_BASE_URL=http://localhost:8080
```

Run
```bash
docker-compose up
```

Api will be available at http://localhost:3000

If at any point you need to install additional libraries, run
```bash
docker-compose up --build -V
```


