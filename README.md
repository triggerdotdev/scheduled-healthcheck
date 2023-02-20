## ✨ Trigger.dev Scheduled Healthcheck

This repo contains a [Scheduled](https://docs.trigger.dev/triggers/scheduled) Trigger that will run every 5 minutes and send a Slack message if a website url returns a non-200 response:

```ts
new Trigger({
  // Give your Trigger a stable ID
  id: "scheduled-healthcheck",
  name: "Scheduled Healthcheck",
  // Trigger every 5 minutes, see https://docs.trigger.dev/triggers/scheduled
  on: scheduleEvent({
    rateOf: { minutes: 5 },
  }),
  // The run functions gets called every 5 minutes
  async run(event, ctx) {
    // Fetch the website using generic fetch, see https://docs.trigger.dev/functions/fetch
    const response = await ctx.fetch("🧑‍⚕️", WEBSITE_URL, {
      method: "GET",
      retry: {
        enabled: false, // Disable retrying
      },
    });

    // If the website is down (or we are in a test run), send a message to Slack
    if (!response.ok || ctx.isTest) {
      // Post a message to Slack, see https://docs.trigger.dev/integrations/apis/slack/actions/post-message
      await slack.postMessage("🤒", {
        channelName: "health-checks",
        text: `😭 ${WEBSITE_URL} is down!`,
      });
    }
  },
}).listen();
```

## ✍️ Customize

- You can set the website url by defining the `WEBSITE_URL` environment variable.
- Customize the Slack message and channel name.
- Update the frequency (you can go as frequent as once per minute)

Be sure to check out more over on our [docs](https://docs.trigger.dev)

## 🚀 Deploy

We've made it really easy to deploy this repo to Render.com, if you don't already have a Node.js server to host your triggers.

[Render.com](https://render.com) is a super-fast way to deploy webapps and servers (think of it like a modern Heroku)

<a href="https://render.com/deploy?repo=https://github.com/triggerdotdev/scheduled-healthcheck">
  <img width="144px" src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>

> **Note** Make sure you use your "live" trigger.dev API Key when deploying to a server

## 💻 Run locally

First, in your terminal of choice, clone the repo and install dependencies:

```sh
git clone https://github.com/triggerdotdev/scheduled-healthcheck.git
cd scheduled-healthcheck
npm install
```

Then execute the following command to create a `.env` file with your development Trigger.dev API Key:

```sh
echo "TRIGGER_API_KEY=<APIKEY>" >> .env
```

And finally you are ready to run the process:

```sh
npm run dev
```

You should see a message output in your terminal like the following:

```
[trigger.dev]  ✨ Connected and listening for events [scheduled-healthcheck]
```

## 🧪 Test it

After successfully running this template locally, head over to your [Trigger.dev Dashboard](https://app.trigger.dev) and you should see your newly created workflow:

![workflow list](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/ad020b75-f46c-412b-7b86-9b4ae99e9300/width=1200)

Click on the workflow in the list and then click on the "Test your workflow" button, where you will be able to simulate a scheduled event:

![workflow test](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/4c50afac-56e0-4671-c807-51c05f55e500/width=1200)

Since we setup our workflow to always post to Slack in a test run, after clicking "Run Test" you'll see a message requiring Slack authentication to continue:

![connect to slack](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/61a33e5c-1981-4905-bbdb-f81943c84f00/width=1200)

Once you authenticate your Slack workspace, the run will pickup where it left off and post the message:

![workflow run complete](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/5b9061a4-1fa7-4b4d-7969-e9578adc0700/width=1200)

Head over to slack to see your newly created message:

![slack message](https://imagedelivery.net/3TbraffuDZ4aEf8KWOmI_w/3995efef-d460-46d5-6973-6f8ad884a600/width=1200)
