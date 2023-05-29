# Encurtador de links - Back-end NoSQL

Comandos de criação do Banco:

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );
```

```
CREATE TABLE sessions (
	id SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	token TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
```

```
CREATE TABLE links (
	id SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	"shortUrl" TEXT NOT NULL,
	url TEXT NOT NULL,
	visits INTEGER NOT NULL DEFAULT 0
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
```
