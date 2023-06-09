import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "user",
    email: "test@gmail.com",
    password: "test",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
