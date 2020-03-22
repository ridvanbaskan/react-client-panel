export const notifyUser = (message, messageType) => ({
  type: 'ALERT_USER',
  message,
  messageType
});
