SELECT 'CREATE DATABASE blueprints'
WHERE NOT EXISTS (
        SELECT
        FROM pg_database
        WHERE datname = 'blueprints'
    ) \ gexec \ c blueprints CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name varchar,
        password varchar
    );
INSERT INTO users(name, password)
SELECT 'test',
    '$2b$10$t3tcUZjpwS7/dZZGaFYGXeWmh4DveAHvoXpvAD7dUfFSfaIH13NKW'
WHERE NOT EXISTS (
        SELECT name
        FROM users
        WHERE name = 'test'
    );