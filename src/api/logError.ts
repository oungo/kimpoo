const logError = (error: Error) => {
  fetch('/api/logError', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ error }),
    // eslint-disable-next-line no-console
  }).catch((error) => console.error(`Failed to log error. ${error}`));
};

export default logError;
