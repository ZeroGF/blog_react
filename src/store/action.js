import http from "../config/http";

export default getArticleList = (params) => {
  http
    .get("/api/articles", {
      params: { pageSize: params.pageSize, currentPage: params.currentPage },
    })
    .then((res) => {
      if (res.status === 1) {
        const action = {
          type: "GET_LIST",
          value: res.data,
        };
        store.dispatch(action);
      }
    });
};
