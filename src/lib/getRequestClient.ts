import Client, { Local } from "./client";

const getRequestClient = (token?: string) => {
  return new Client(Local, {
    auth: { authorization: token || "" },
  });
};

export default getRequestClient;
