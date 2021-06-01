import { v4 as uuid } from "uuid";

type ISignRequestData = {
  email: string;
  password: string;
};

interface IReturn {
  token: string;
  user: {
    name: string;
    email: string;
    avatar_url: string;
  };
}

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signRequest(data?: ISignRequestData): Promise<IReturn> {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "elias alexandre",
      email: "eliasallex@gmail.com",
      avatar_url: "https://github.com/eliasallex.png",
    },
  };
}
