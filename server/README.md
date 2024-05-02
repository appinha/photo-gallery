# Usage

1. Install dependencies:

```Bash
make install
```

2. Create database:

- Open Docker
- Run the command below (changing `user` and `password` values to your own):

```Bash
docker run --name photo_gallery-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

3. Add the needed variables in the `.env` file, for example:

```
APP_SECRET_KEY="app_secret_key"

DB_USER="user"
DB_PASSWORD="password"
DB_HOST="localhost:5432/postgres"

JWT_ALGORITHM="HS256"
JWT_SECRET_KEY="jwt_secret_key"

USER_ADMIN_USERNAME="admin"
USER_ADMIN_PASSWORD="123"
```

4. Run api:

```Bash
make
```

5. Run linter:

```Bash
make lint
```

5. Run formatter:

```Bash
make format
```
