const main = (): void => {
  const message = createMessage({ to: "World", message: "Hello" });
  Logger.log(message);
};

const createMessage = (message: Message): string => {
  return `${message.message}, ${message.to}!`;
};

export default { main };
