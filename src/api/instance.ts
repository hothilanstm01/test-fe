import axios from "axios";
import { appConfigs } from "../appConfig";

const url = "https://dummyjson.com";
export const instance = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
  },
});
