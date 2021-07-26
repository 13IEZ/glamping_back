const sortArrAsc = (arr, fieldName) => {
  let result;
  const prop = fieldName;
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
};

const sortArrDesc = (arr, fieldName) => {
  let result;
  const prop = fieldName;
  result = arr.sort(function (a, b) {
    if (a[`${prop}`] < b[`${prop}`]) {
      return 1;
    }
    if (a[`${prop}`] > b[`${prop}`]) {
      return -1;
    }
    return 0;
  });
  return result;
};

module.exports = { sortArrAsc, sortArrDesc };
