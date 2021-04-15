interface DeferredPromise<T> extends Promise<T> {
  resolve(arg: any);
  reject(err: any);
}

export const deferred = (args: { timeout?: number; id?: any }): DeferredPromise<any> => {
  args = args || {};

  const { timeout } = args;

  let resolve;
  let reject;
  let timeoutId;

  const promise: any = new Promise((resolver, rejector) => {
    resolve = resolver;
    reject = rejector;
  });

  promise.resolve = (arg) => {
    clearTimeout(timeoutId);
    resolve(arg);
  };

  promise.reject = (arg) => {
    clearTimeout(timeoutId);
    reject(arg);
  };

  if (typeof timeout === 'number') {
    const id = args.id || 'anonymous';
    timeoutId = setTimeout(() => reject({ reason: `timeout (${timeout}) reached on "${id}"` }), timeout);
  }

  return promise;
};
