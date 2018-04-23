# Tweets

## Overview

Tweets is a single page application that allow you to tweet your thoughts, ideas or anything you feel like sharing with the followers. Follow and manage what you want to see.

## Start application

Clone this repository into your local machine.

Change the `src/config.js` file with your credentials.  

```
cd to_project_directory
npm install
npm start
```


Wait for the client dependencies to be installed and
visit `http://127.0.0.1:3000` not the regular `localhost:3000` in your browser.


## Functionality

### API

* POST `api/auth/request_token`
* POST `api/auth/login`
* POST `api/auth/authenticate`
* POST `api/auth/logout`
* GET  `api/users/:username`
* GET  `api/users/:username/followers`
* GET  `api/users/:username/follow_suggestions`
* GET  `api/users/:username/following`
* GET  `api/users/:username/tweets`
* POST `api/users/:username/tweet`
* POST `api/users/:username/follow`
* POST `api/users/:username/unfollow`
* GET  `api/tweets/:id`
* POST `api/tweets/:id`
* POST `api/tweets/:id/like`
* DELETE `api/tweets/:id`
* GET  `api/hashtags/trending`
* GET  `api/hashtags/:tag/tweets`
* POST `api/comments/tweet/:tweetId`
* POST `api/comments/:commentId/reply`
* GET  `api/comments/tweet/:tweetId`
* GET  `api/comments/:commentId/reply`

#### Login

* User can login using Twitter authentication.
* authentication persists across different tabs and for a returning user.

#### Following

* User should be logged in to follow any user.
* User can get suggestions based on who they follow.
* User can follow upto 1000 users.

#### Followers

* No limit on no of followers a user can have.

#### Tweeting

* User should be logged in to perform any actions.
* User can create, like, comment , share on twitter and delete any tweet.

#### Liking

* User can like any tweet the see.

#### Commenting

* User should be logged in to comment.
* User can comment on any tweet.
* User can reply to comments.

#### Sharing

* User can share any tweet they see.


#### Hashtags

* User can use hashtags in their tweets.
* Hashtags are linked in tweets while displaying.

#### NewFeed

* User gets news feed based on their activity and the activity of the users they follow.
