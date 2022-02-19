# Northcoders News API

## Project Summary

A basic reddit clone. Featuring topics, articles, users and comments. Consumers of the API can retrieve, post, edit and delete.

Current features:

- Topics, users and articles can all be served as arrays
- Articles can be served by their own id
- Articles can be updated with votes
- Arrays of comments for each article can be served by article id
- Comments can be served by their own id
- Comments can be created and must be associated with an article id
- Comments can be deleted

## Hosted Version

https://nc-news-ddhendon.herokuapp.com/api

## Clone and Install

Clone the repository into a local folder. Make sure node is installed up to the required version. If unsure make use of `node -v`.

Run `npm i` to install all project and development dependencies.

Make sure to create the local databases by running the setup script (`npm run setup-dbs`). Then seed them with data (`npm run seed`).

To test the app use the included test suite (jest and supertest) by entering `npm t app` in the project root. Be aware husky will prevent any commits via a hook if any tests fail.

## Local Environment Setup

To connect to local versions of the databases create two files in the project root folder.

- `.env.development`
- `.env.test`

The contents of these files should be set to:

- PGDATABASE=_local development database_
- PGDATABASE=_local test database_

In `.env.development` and `.env.test` respectively.

## Version Requirements

- node v17.2.0
- npm 8.4.0
- node-postgres ^8.7.3
- postgres 14.2
