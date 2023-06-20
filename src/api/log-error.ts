const logError = (error: Error) => {
  fetch('/api/error', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ errorMessage: error.message }),
    // eslint-disable-next-line no-console
  }).catch((error) => console.error(`Failed to log error. ${error}`));
};

export default logError;
