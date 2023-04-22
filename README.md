# MediumWatcher
## Use Github Actions to watch your Medium Feed and post to Twitter and LinkedIn without the need for a database

Check the runs here: https://github.com/FagnerMartinsBrack/medium-watcher/actions

It uses an InMemory EventBus with EventEmitter which you can use to subscribe other providers to the medium post events.

You can add more providers by creating a new listener:

```javascript
eventEmitter.addListener('NEW_POST', (postDetails) => {
  sendToNewProvider(postDetails);
});
```

### How to use it

Fork this project, add your own environment variables to Github Actions and to the `dev-environment.sh` hidden file to be able to run this locally:

```sh
export LINKEDIN_CLIENT_ID=
export LINKEDIN_ACCESS_TOKEN=
export LINKEDIN_PERSON_ID=

export TWITTER_CONSUMER_KEY=
export TWITTER_CONSUMER_SECRET=
export TWITTER_ACCESS_TOKEN=
export TWITTER_ACCESS_TOKEN_SECRET=
export TEST_MODE=true
```

Wait for cron execution (which checks for a new post every hour) or run it manually:

```
npm run broadcast
```

To generate a new Twitter Access Token, run:

```
npm run twitter:generate-access-token
```

Follow the console prompts.

To generate a LinkedIn Access Token, do it manually:

https://www.linkedin.com/developers/tools/oauth?clientId={your_app_client_id}

## Test Integration

To test Twitter integration locally, run the following command:

```
npm run twitter:create-test-post
```

To test LinkedIn integration locally, run the following command:

```
npm run linkedin:create-test-post
```

----

Let me know if you have issues and please help improve the documentation by creating PRs so others can use it too!

What it needs more work with:

[ ] - Automate LinkedIn token refresh. Today it lasts 60 days after you run manually to get an access token and it doesn't refresh (which will make the token valid for a year)

[ ] - Requires your Medium post to not be scheduled near the 30th minute of the CronJob. For example, it may not trigger notifications if the post is scheduled to be published at 08:30 and the CronJob runs at 09:30, given it may delay by up to 5 minutes to start and then it will be too late to consider the post as a new post.

[ ] - Support pulling Medium feed in a variable cadence other than the static "every 1 hour"

[ ] - Support more than one post published in an hour. Currently it only supports notifying one post every hour.

[ ] - Differentiate posts from comments so to notify only posts. Is it possible?

[ ] - Support more providers to notify other than Twitter and LinkedIn

[ ] - Allow for a customised message on every provider. Right now the message is "I just published {post}".
