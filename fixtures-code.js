const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');

const User = require('./src/api/v1/models/User');
const Location = require('./src/api/v1/models/Location');
const Module = require('./src/api/v1/models/Module');
const Review = require('./src/api/v1/models/Review');

const fixApply = db => {
  db.once('open', async () => {
    try {
      await db.dropCollection('locations');
      await db.dropCollection('modules');
      await db.dropCollection('users');
      await db.dropCollection('reviews');
    } catch (err) {
      console.log('Collections were not presented. Skipping drop');
    }
    const [userUser, adminUser, testUser] = await User.create(
      {
        username: 'user',
        userSurname: 'surname',
        password: 'user',
        token: nanoid(),
        role: 'user',
        phone: '+77777777777',
        email: 'user@user.com',
      },
      {
        username: 'admin',
        userSurname: 'surname',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
        phone: '+77777777771',
        email: 'admin@admin.com',
      },
      {
        username: 'test',
        userSurname: 'surname',
        password: 'test',
        token: nanoid(),
        role: 'user',
        phone: '+77777777772',
        email: 'test@test.com',
      }
    );

    const [balkash, alakol, beskaynar, borovoe] = await Location.create(
      {
        title: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение ' +
          'крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
      },
      {
        title: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. ' +
          'В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
      },
      {
        title: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. ' +
          'Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, ' +
          'длина более -1000 м. Магистральный газ и свет проходят по участку, ' +
          'подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
      },
      {
        title: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. ' +
          'В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
      }

    );

    const [geokupol4, aleut, yurta, belltent] = await Module.create(
      {
        title: 'Геокупол-4',
        type: 'геокупол',
        image: ['geo1.png', 'geo2.jpeg'],
        roominess: 3,
        year: '2020',
        description:
          'Геодезический купол (геокупол, геодом) — сферическое архитектурное сооружение, ' +
          'собранное из стержней, образующих геодезическую структуру, благодаря которой сооружение в целом ' +
          'обладает хорошими несущими качествами. Геодезический купол является несущей сетчатой оболочкой.',
        number: 1,
        series: '00001',
        color: 'white',
        price: 1500000,
        rent: 15000,
        status: true,
        published: true,
        factory: userUser._id,
      },
      {
        title: 'Алеут',
        type: 'модуль (полимер)',
        image: ['modul1.jpeg', 'modul2.jpeg'],
        roominess: 3,
        year: '2021',
        description:
          'В модуле комфортно жить и зимой, и летом. Композитные материалы стен и ' +
          'уникальная конструкция витража и окон хорошо сохраняют тепло. «Алеут» состоит из двух ' +
          'блоков — примерно по 1,5 тонны каждый. Дом легко разобрать, а затем снова собрать.',
        number: 2,
        series: '000022',
        color: 'white',
        price: 5000000,
        rent: 25000,
        status: true,
        published: true,
        factory: testUser._id,
      },
      {
        title: 'Юрта',
        type: 'тент',
        image: ['yurta1.jpeg', 'yurta2.jpeg', 'yurta3.jpeg'],
        roominess: 3,
        year: '2018',
        description: 'Юрта — переносное каркасное жилище с войлочным покрытием у тюркских и монгольских кочевников.',
        number: 3,
        series: '0003',
        color: 'white',
        price: 399000,
        rent: 5000,
        status: true,
        published: true,
        factory: userUser._id,
      },
      {
        title: 'Белл тент',
        type: 'тент',
        image: ['belltent1.jpg', 'belltent2.jpg'],
        roominess: 3,
        year: '2021',
        description: 'Белл тент — это палатка для проживания, путешествий или отдыха. Дизайн белл тента представляет собой простую конструкцию, поддерживающую всю палатку центральным шестом.',
        number: 2,
        series: '0008',
        color: 'white',
        price: 300000,
        rent: 4000,
        status: true,
        published: true,
        factory: userUser._id,
      } 
    );

    await Review.create(
      {
        pros: 'Отличная природа',
        cons: 'Далеко от дороги, много комаров',
        review: 'В целом отдых удался на славу! Природа, озеро, а закат просто волшебный!',
        date: new Date(2021, 7, 6),
        rating: 5,
        user: userUser._id,
        location: balkash._id,
      },
      {
        review: 'Хороший модуль, просторный',
        date: new Date(2021, 5, 8),
        rating: 4,
        user: userUser._id,
        module: aleut._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Все было здорово, рекомендую',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        module: geokupol4._id,
      },
      {
        cons: 'Нет интернета',
        review: 'Все хорошо, нам понравилось, был бы еще интернет, вообще бы там остались жить',
        date: new Date(2021, 8, 8),
        rating: 5,
        user: testUser._id,
        location: alakol._id,
      }
    );

    db.close();
  });
};

module.exports = fixApply;
