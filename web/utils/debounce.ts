<<<<<<< HEAD
export const debounce = <F extends (...args: any) => any>(func: F, waitFor = 1000) => {
  let timeout: NodeJS.Timeout;
  // let data;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, waitFor);
=======
export const debounce = (fn: Function, ms = 600) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
>>>>>>> fba64ba99eb7d279f138ce8cca6a67086b9b066b
  };
};
