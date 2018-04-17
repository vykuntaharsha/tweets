# Tweets

## Overview

Tweets is a single page application that allow you to tweet your thoughts, ideas or anything you feel like sharing with the followers. Follow and manage what you want to see.

## Start application

clone this repository into your local machine.
```
cd to_project_directory
npm install
npm start
```
wait for the client dependencies to be installed and
visit `http://127.0.0.1:3000` not the regular `localhost:3000` in your browser.

## Functionality

#### Login

* User can login using Twitter authentication.
* authentication persists across different tabs and for a returning user.

### API

* POST `api/auth/request_token`
* POST `api/auth/login`
* POST `api/auth/authenticate`
* POST `api/auth/logout`
* GET  `api/users/:username`
* GET  `api/users/:username/notifications`
* GET  `api/users/:username/followers`
* GET  `api/users/:username/follower_requests`
* GET  `api/users/:username/follow_suggestions`
* GET  `api/users/:username/following`
* GET  `api/users/:username/tweets`
* POST `api/users/:username/tweet`
* POST `api/users/:username/follow`
* PUT  `api/users/:username/follow`
* GET  `api/users?username=[username]`
* GET  `api/tweets/:id`
* GET  `api/tweets/:id/replies`
* POST `api/tweets/:id/reply`
* POST `api/tweets/:id/like`
* POST `api/tweets/:id/retweet`
* DELETE `api/tweets/:id`
* PUT  `api/tweets/:id`
* GET  `api/hashtags/trending`
* GET  `api/hashtags/:id/tweets`
* GET  `api/hashtags?tag=[hashtag]`
