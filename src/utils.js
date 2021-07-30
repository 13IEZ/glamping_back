const sortArrAsc = (arr, fieldName) => {
  let result;
  //`${prop}` для того чтобы устранить ошибку безопасности
  // Generic Object Injection Sink  security/detect-object-injection
  const prop = fieldName;
  if (fieldName === 'price') {
    result = arr.sort(function (a, b) {
      if (Number(a.price) < Number(b.price)) {
        return -1;
      }
      if (Number(a.price) > Number(b.price)) {
        return 1;
      }
      return 0;
    });
    return result;
  } else {
    result = arr.sort(function (a, b) {
      if (a[`${prop}`] < b[`${prop}`]) {
        return -1;
      }
      if (a[`${prop}`] > b[`${prop}`]) {
        return 1;
      }
      return 0;
    });
    return result;
  }
};

const sortArrDesc = (arr, fieldName) => {
  let result;
  const prop = fieldName;
  if (fieldName === 'price') {
    result = arr.sort(function (a, b) {
      if (Number(a.price) < Number(b.price)) {
        return 1;
      }
      if (Number(a.price) > Number(b.price)) {
        return -1;
      }
      return 0;
    });
  } else {
    result = arr.sort(function (a, b) {
      if (a[`${prop}`] < b[`${prop}`]) {
        return 1;
      }
      if (a[`${prop}`] > b[`${prop}`]) {
        return -1;
      }
      return 0;
    });
  }
  return result;
};

module.exports = { sortArrAsc, sortArrDesc };
