import axios from "axios";
import { config } from "dotenv";
config();
console.log(process.env.ACCESS_TOKEN, process.env.LOG_API_URL);
const logEvent = async (stack, level, logPackage, message) => {
  try {
    const payload = {
      stack,
      level,
      package: logPackage,
      message,
    };
    const headers = {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };
    const res = await axios.post(`${process.env.LOG_API_URL}`, payload, {
      headers,
    });
    console.log(`[LOG-SUCCESS] ${res.data.message} (${res.data.logID})`);
  } catch (error) {
    console.error("[LOG-ERROR]", error.response?.data || error.message);
  }
};

export default logEvent;
