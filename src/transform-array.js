const CustomError = require("../extensions/custom-error");


module.exports = function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error();
  }

  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string") {
      newArr.push(arr[i]);
    } else {
      switch (arr[i]) {
        case "--discard-next":
          i++;
          break;
        case "--discard-prev":
          if (arr[i - 2] !== "--discard-next") {
            newArr.pop();
          }
          break;
        case "--double-next":
          if (arr.length - 1 > i) {
            newArr.push(arr[i + 1]);
          }
          break;
        case "--double-prev":
          if (newArr.length > 0 && arr[i - 2] !== "--discard-next") {
            newArr.push(arr[i - 1]);
          }
          break;
        default:
          newArr.push(arr[i]);
      }
    }
  }

  return newArr;
};
