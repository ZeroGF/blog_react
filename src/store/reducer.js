//文章列表
const defaultState = {
  pageSize: 10,
  currentPage: 1,
  total: 0,
  list: [],
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "GET_LIST":
      let newState = JSON.parse(JSON.stringify(state)); //深度拷贝state
      newState.list = action.value.list;
      newState.total = action.value.count;
      return newState;
    default:
      return state;
  }
};
