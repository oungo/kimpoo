import type { NextApiRequest } from 'next';

export default function handler(req: NextApiRequest) {
  fetch(`${process.env.SLACK_WEBHOOK_URL}`, {
    method: req.method,
    body: JSON.stringify({ text: req.body.errorMessage }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.error(`Failed to log error.\n${error}`);
  });
}
