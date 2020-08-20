const sleep = async (ms: number) =>
  new Promise<boolean>(resolve => setTimeout(() => resolve(true), ms));

export default { sleep };
