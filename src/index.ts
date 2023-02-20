import { Trigger, scheduleEvent } from "@trigger.dev/sdk";
import * as slack from "@trigger.dev/slack";

const WEBSITE_URL = process.env.WEBSITE_URL ?? "https://trigger.dev";

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
        channelName: "website-health-check",
        text: `😭 ${WEBSITE_URL} is down!`,
      });
    }
  },
}).listen();
