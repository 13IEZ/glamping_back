const filterArray = (arr, fieldName, fieldValue) => {
    let result;
    const prop = fieldName;
    // if (fieldName === 'roominess' && fieldValue > 4) {
    //   return arr.filter(arrItem => arrItem[`${prop}`] > 4);
    // }
    result = arr.filter(arrItem => arrItem[`${prop}`] == fieldValue);
    return result;
  };
  
  const sortArrayAsc = (arr, fieldName) => {
    let result;
    //`${prop}` для того чтобы устранить ошибку безопасности
    // Generic Object Injection Sink  security/detect-object-injection
    const prop = fieldName;
    if (fieldName === 'rent') {
      result = arr.sort(function (a, b) {
        if (Number(a.rent) < Number(b.rent)) {
          return -1;
        }
        if (Number(a.rent) > Number(b.rent)) {
          return 1;
        }
        return 0;
      });
      return result;
    } 
    else {
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
  
  const sortArrayDesc = (arr, fieldName) => {
    let result;
    const prop = fieldName;
    if (fieldName === 'rent') {
      result = arr.sort(function (a, b) {
        if (Number(a.rent) < Number(b.rent)) {
          return 1;
        }
        if (Number(a.rent) > Number(b.rent)) {
          return -1;
        }
        return 0;
      });
    }
    else {
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
  
  module.exports = { filterArray, sortArrayDesc, sortArrayAsc };
  