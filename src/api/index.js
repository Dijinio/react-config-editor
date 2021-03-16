import axios from "axios";

const url =
  "https://71x3eni3og.execute-api.us-west-2.amazonaws.com/testcase/process";

const headers = { Authorization: "Basic SuperKey" };

export const fetchConfig = () => axios.get(url, { headers });

export const postConfig = (config) => axios.post(url, config, { headers });
