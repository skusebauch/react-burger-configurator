import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-configurator.firebaseio.com/",
});

export default instance;
