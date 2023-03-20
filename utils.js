const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args); // it takes all the arguments when we passed in and able to track with apply method
         // func(arg1,arg2,arg3) // this method totally same with the above func
      }, delay);
    };
  };
