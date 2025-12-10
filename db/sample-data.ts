import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "John Doe",
      email: "admin@example.com",
      password: hashSync("password", 10),
      role: "admin",
    },
    {
      name: "Jane Doe",
      email: "user@example.com",
      password: hashSync("password", 10),
      role: "user",
    },
  ],
};

export default sampleData;
