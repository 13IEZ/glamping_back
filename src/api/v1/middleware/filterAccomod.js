const AccommodationFilter = require('../models/AccommodationFilter');
const Accommodation = require('../models/Accommodation');
const { filterArrAccomod, sortArrAscAccomod, sortArrDescAccomod } = require('../../../utils');

const filterAccomod = async (req, res, next) => {
  const getOptionValue = (option, key) => {
    const priceSort = { priceAsc: 'asc', priceDesc: 'desc' };
    const roominessFilter = { roominess1: '1', roominess2: '2', roominess3: '3', roominess4: '4', roominess5: '5' };
    const seasonFilter = { seasonSummer: 'summer', seasonWinter: 'winter', seasonAll: 'all' };
    switch (option) {
      case 'price':
        return priceSort[`${key}`];
      case 'roominess':
        return roominessFilter[`${key}`];
      case 'season':
        return seasonFilter[`${key}`];
      case 'factory':
        return key.slice(key.indexOf('_') + 1);
      case 'category':
        return key.slice(key.indexOf('_') + 1);
      default:
        break;
    }
  };

  const optionsArr = ['price', 'roominess', 'season', 'factory', 'category'];
  const queryArr = JSON.parse(req.query.queryStr);

  if (!req.query.queryStr) {
    totalFiltered = await Accommodation.find().populate({ path: 'productId' });
    await AccommodationFilter.deleteMany();
    await AccommodationFilter.insertMany(totalFiltered);
    next;
  }

  try {
    let prevFilterResult = await Accommodation.find().populate({ path: 'productId' });
    let currentFiltered = [];
    let totalFiltered = [];

    optionsArr
      .filter(option => option !== 'price')
      .forEach(option => {
        let key;
        if (option === 'category' || option === 'factory') {
          key = option + 'Id';
        } else {
          key = option;
        }

        const queryFilteredArr = queryArr.filter(item => item.includes(option));

        if (queryFilteredArr.length > 0) {
          totalFiltered = [];
          queryFilteredArr.forEach(item => {
            currentFiltered = filterArrAccomod(prevFilterResult, key, getOptionValue(option, item));
            totalFiltered = totalFiltered.concat(currentFiltered);
          });
          prevFilterResult = [...totalFiltered];
        }
      });

    optionsArr
      .filter(option => option === 'price')
      .forEach(option => {
        totalFiltered = [...prevFilterResult];
        const queryFilteredArr = queryArr.filter(item => item.includes(option));
        req.sortOrder = 'none';
        if (queryFilteredArr.length > 0) {
          queryFilteredArr.forEach(item => {
            if (getOptionValue(option, item) === 'asc') {
              totalFiltered = sortArrAscAccomod(totalFiltered, 'price');
            } else {
              totalFiltered = sortArrDescAccomod(totalFiltered, 'price');
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

module.exports = filterAccomod;
