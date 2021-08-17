import { WebClient } from '@slack/web-api';

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const defaultConversationId = 'C02AA60HD3P';

export const sendMessage = (message, chanelId = defaultConversationId) => {
  const res = web.chat.postMessage({ channel: chanelId, text: message });
  return res;
}

export const sendMessageSync = async (message, chanelId = defaultConversationId) => {
  const res = await web.chat.postMessage({ channel: chanelId, text: message });
  return res;
}
