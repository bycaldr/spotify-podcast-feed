# Spotify podcast feed

Simple web app showing feed of newest podcast episodes by your followed shows. You can check if there is new episode and open it in your Spotify app just with single click. There is no ambition to replace Spotify app.

## [Try now](https://spotify-podcast-feed.ey.r.appspot.com)
|||
|---|---|
|<img src="https://i.imgur.com/x0CEqU5.jpg" width="300" />|<img src="https://i.imgur.com/wa5aHk2.jpg" width="300" />|

## Privacy

Your data are not stored anywhere. No Analytics tools are used. Just very basic app using Spotify API.

## Development

### Dev scripts

```
# run client dev
$ yarn dev:client

# for API dev use VS Code launch.json debug entry
```

### Required .env config setup

```
# server/.env file
PORT=8080
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_SECRET=xxx
SPOTIFY_REDIRECT_URL=http://localhost:8081/login

JWT_SECRET=xxx
KOA_KEY=xxx
AUTH_COOKIE_KEY=auth

# client/.env file
API_LOCATION=http://localhost:8080/api
SENTRY_DSN=https://xxx.ingest.sentry.io/xxx
```
