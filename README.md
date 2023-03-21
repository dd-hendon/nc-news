# NC News API

## Project Summary

The back end of a news aggregate website. Serves topics, articles, users and comments. Consumers of the API can retrieve, post, edit and delete data.

Current features:

- Topics, users and articles can all be served as arrays
- Articles can be sorted and ordered with queries
- Articles can be served by id
- Articles can be updated with votes
- Arrays of comments for each article can be served by article id
- Comments can be served by id
- Comments can be created and must be associated with an article id
- Comments can be deleted

## Hosted Version

~~https://nc-news-ddhendon.herokuapp.com/api~~ (Down due to Heroku removal of free tier)

## Clone and Install

Clone the repository into a local folder.
` git clone https://github.com/dd-hendon/nc-news-back-end.git`

Make sure node is installed up to the required version (see below). Make use of `node -v` if unsure of your current version.

Run `npm i` to install all project and development dependencies.

Make sure to create the local databases by running the setup script (`npm run setup-dbs`). Then seed them with data (`npm run seed`).

To test the app use the included test suite (jest and supertest) by entering `npm t app` in the project root. Be aware husky will prevent any commits via a hook if any tests fail.

## Local Environment Setup

This is to connect to local versions of the databases. 

First find and make a note of the development and test database names in /db/setup.sql.

Then create two files in the project root folder.

- `.env.development`
- `.env.test`

Set the contents of these files as follows, using the specific local database names found in setup.sql

In `.env.development`:
- PGDATABASE=_local development database_

In `.env.test`:
- PGDATABASE=_local test database_

## Version Requirements

- node v17.2.0
- npm 8.4.0
- node-postgres ^8.7.3
- postgres 14.2

## Front End utilising this API
- Deployed Site ~~https://nc-news-dd-hendon.netlify.app/~~ (Down due to Heroku removal of free tier)
- Repo https://github.com/dd-hendon/nc-news-front-end
