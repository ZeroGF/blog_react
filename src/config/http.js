import axios from "axios";
import { Modal, Button } from "antd";
import storage from "./storage";

//创建
const http = axios.create({
  baseURL: "http://127.0.0.1:1234",
});

//请求拦截
http.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => {
    return Promise.error(error);
  }
);
//响应拦截
http.interceptors.response.use(
  async (response) => {
    await handleResponseSuccess(response.data);
    return response.data;
  },
  async (error) => {
    await handleResponseError(error);
    return false;
  }
);
//处理响应错误
async function handleResponseSuccess(data) {
  if (data && data.status == 201) {
    await Modal.error({
      content: data.msg,
      title: "error",
    });
  }
}
//处理错误响应
async function handleResponseError(error) {
  if (error.response && error.response.status === 400) {
    await Modal.error({
      title: "错误提示",
      content: error.response.data.message,
    });
  } else {
    await Modal.error({
      title: "错误提示",
      content: `服务器遇到了一些问题，请稍后再试。${
        error.response ? "错误码：" + error.response.status : ""
      }`,
    });
  }
}
export default http;
