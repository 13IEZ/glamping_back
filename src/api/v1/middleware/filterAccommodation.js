const AccommodationFilter = require('../models/AccommodationFilter');
const Accommodation = require('../models/Accommodation');
const { filterArray, sortArrayDesc, sortArrayAsc } = require('../../../utilsAccommodation');

const filterAccommodation = async (req, res, next) => {
  const getOptionValue = (option, key) => {
    const rentSort = { rentAsc: 'asc', rentDesc: 'desc' };
    switch (option) {
      case 'rent':
        return rentSort[`${key}`];
      default:
        break;
    }
  };

  const optionsArr = ['rent', 'roominess', 'season', 'category'];
  const queryArr = JSON.parse(req.query.queryStr);

  if (!req.query.queryStr) {
    totalFiltered = Accommodation.find({})
    await AccommodationFilter.deleteMany();
    await AccommodationFilter.insertMany(totalFiltered);
    next;
  }

  try {
    let prevFilterResult = await Accommodation.find({})
    let currentFiltered = [];
    let totalFiltered = [];

    optionsArr
      .filter(option => option !== 'rent')
      .forEach(option => {
        let key;
        if (option === 'category') {
          key = option + 'Id';
        } else {
          key = option;
        }

        const queryFilteredArr = queryArr.filter(item => item.includes(option));

        if (queryFilteredArr.length > 0) {
          totalFiltered = [];
          queryFilteredArr.forEach(item => {
            currentFiltered = filterArray(prevFilterResult, key, getOptionValue(option, item));
            totalFiltered = totalFiltered.concat(currentFiltered);
          });
          prevFilterResult = [...totalFiltered];
        }
      });

    optionsArr
      .filter(option => option === 'rent')
      .forEach(option => {
        totalFiltered = [...prevFilterResult];
        const queryFilteredArr = queryArr.filter(item => item.includes(option));
        req.sortOrder = 'none';
        if (queryFilteredArr.length > 0) {
          queryFilteredArr.forEach(item => {
            if (getOptionValue(option, item) === 'asc') {
              totalFiltered = sortArrayAsc(totalFiltered, 'rent');
            } else {
              totalFiltered = sortArrayDesc(totalFiltered, 'rent');
            }
          });
        }
      });

    await AccommodationFilter.deleteMany();
    await AccommodationFilter.insertMany(totalFiltered);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = filterAccommodation;
