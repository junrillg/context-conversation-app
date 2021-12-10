class MessageService {
  public parseMessage(message: string): string {
    const contextOne = message.search(/Hello|Hi/g);
    const contextTwo = message.search(/Goodbye|bye/g);
    const contextMatch = {
      [contextOne]: 'Welcome to StationFive.',
      [contextTwo]: 'Thank you, see you around.',
    };

    const index = Math.min(...[contextTwo, contextOne].filter(index => index !== -1));

    return contextMatch[index] ?? 'Sorry, I don’t understand.';
  }
}

export default MessageService;
