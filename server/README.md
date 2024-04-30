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

- Add the needed variables in the `.env` file, for example:

```
DB_USER=user
DB_PASSWORD=password
DB_HOST="localhost:5432/postgres"
```

2. Run api:

```Bash
make
```
