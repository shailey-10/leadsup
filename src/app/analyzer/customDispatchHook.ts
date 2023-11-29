// dispatchUtils.js

import store from "../redux/store";

export const customDispatch = (action: any) => {
  store.dispatch(action);
};
