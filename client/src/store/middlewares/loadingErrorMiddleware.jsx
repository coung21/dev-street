
import { startLoading, finishLoading, setError, resetError, setMessage } from '../slices/loadingErrorSlice';

const loadingErrorMiddleware = (store) => (next) => (action) => {
  const { type } = action;

  if (type.endsWith('/pending')) {
    store.dispatch(startLoading());
  }

  if (type.endsWith('/fulfilled') || type.endsWith('/rejected')) {
    store.dispatch(finishLoading());
  }

  if(type.endsWith('/rejected')){
    store.dispatch(setMessage(action.error.message))
    store.dispatch(setError())
    setTimeout(() => {
      store.dispatch(resetError())
    }, 3000)
  }
  return next(action);
};

export default loadingErrorMiddleware;
