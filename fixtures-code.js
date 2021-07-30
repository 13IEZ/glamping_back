const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');

const User = require('./src/api/v1/models/User');
const Location = require('./src/api/v1/models/Location');
const Product = require('./src/api/v1/models/Product');
const Category = require('./src/api/v1/models/Category');
const Review = require('./src/api/v1/models/Review');
const Pich = require('./src/api/v1/models/Pich');

const fixApply = db => {
  db.once('open', async () => {
    try {
      await db.dropCollection('locations');
      await db.dropCollection('products');
      await db.dropCollection('users');
      await db.dropCollection('reviews');
      await db.dropCollection('categories');
      await db.dropCollection('pich');
    } catch (err) {
      console.log('Collections were not presented. Skipping drop');
    }

    const [tent, frameHouse, dome, yurt, product, trailer, motorHome, other] = await Category.create(
      {
        title: 'Тенты',
      },
      {
        title: 'Каркасные дома',
      },
      {
        title: 'Купола',
      },
      {
        title: 'Юрты',
      },
      {
        title: 'Модули',
      },
      {
        title: 'Трейлеры',
      },
      {
        title: 'Автодома',
      },
      {
        title: 'Другое',
      }
    );

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

    const [geokupol4, aleut, yurta, belltent] = await Product.create(
      {
        title: 'Геокупол-4',
        categoryId: dome._id,
        userId: userUser._id,
        season: 'summer',
        preview: 'geo1.png',
        rating: 3,
        image: ['geo1.png', 'geo2.jpeg'],
        roominess: 3,
        description:
          'Геодезический купол (геокупол, геодом) — сферическое архитектурное сооружение, ' +
          'собранное из стержней, образующих геодезическую структуру, благодаря которой сооружение в целом ' +
          'обладает хорошими несущими качествами. Геодезический купол является несущей сетчатой оболочкой.',
        price: 1500000,
        published: true,
        factory: 'Компания «Геокупол»',
      },
      {
        title: 'Алеут',
        categoryId: dome._id,
        userId: userUser._id,
        season: 'all',
        preview: 'modul1.jpeg',
        rating: 4,
        image: ['modul1.jpeg', 'modul2.jpeg'],
        roominess: 4,
        description:
          'В модуле комфортно жить и зимой, и летом. Композитные материалы стен и ' +
          'уникальная конструкция витража и окон хорошо сохраняют тепло. «Алеут» состоит из двух ' +
          'блоков — примерно по 1,5 тонны каждый. Дом легко разобрать, а затем снова собрать.',
        price: 5000000,
        published: true,
        factory: 'Компания «Полимер»',
      },
      {
        title: 'Юрта',
        categoryId: yurt._id,
        userId: adminUser._id,
        season: 'all',
        preview: 'yurta1.jpeg',
        rating: 5,
        image: ['yurta1.jpeg', 'yurta2.jpeg', 'yurta3.jpeg'],
        roominess: 7,
        description: 'Юрта — переносное каркасное жилище с войлочным покрытием у тюркских и монгольских кочевников.',
        price: 399000,
        published: true,
        factory: 'СПК «Жетысу»',
      },
      {
        title: 'Белл тент',
        categoryId: tent._id,
        userId: testUser._id,
        season: 'summer',
        preview: 'belltent1.jpg',
        rating: 2,
        image: ['belltent1.jpg', 'belltent2.jpg'],
        roominess: 3,
        description:
          'Белл тент — это палатка для проживания, путешествий или отдыха. Дизайн белл тента представляет собой простую конструкцию, поддерживающую всю палатку центральным шестом.',
        price: 300000,
        published: true,
        factory: 'ТОО «TentLand»',
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
        product: aleut._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Все было здорово, рекомендую',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        product: geokupol4._id,
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

    const [orbita, ecohause, borovoelux, beskaynarlux] = await Pich.create(
      {
        title: 'Орбита',
        number: 2,
        productId: geokupol4._id,
        locationId: balkash._id,
        roominess: 3,
        rating: 5,
        season: 'summer',
        image: ['geo1.png', 'geo2.jpeg'],
        preview: 'geo1.png',
        rent: 60000,
        free: false,
        startDate: '01/08/21',
        endDate: '15/08/21',
        userId: userUser._id,
        description:
          'Отличное место для восстановления сил и энергии!',
        published: true
      },
      {
        title: 'Экохаус',
        number: 1,
        productId: belltent._id,
        locationId: alakol._id,
        roominess: 2,
        rating: 4,
        season: 'summer',
        image: ['belltent1.jpg', 'belltent2.jpg'],
        preview: 'belltent1.jpg',
        rent: 50000,
        free: true,
        userId: testUser._id,
        description:
          'Проведите неповторимые выходные в самом лоне природы!',
        published: true
      },
      {
        title: 'Боровое Люкс',
        number: 3,
        productId: yurta._id,
        locationId: borovoe._id,
        roominess: 2,
        rating: 4,
        season: 'summer',
        image: ['yurta1.jpeg', 'yurta2.jpeg', 'yurta3.jpeg'],
        preview: 'yurta1.jpeg',
        rent: 80000,
        free: true,
        userId: testUser._id,
        description:
          'Красота гор и озера, все у ваших ног!',
        published: true
      },
      {
        title: 'Бескайнар Люкс',
        number: 3,
        productId: yurta._id,
        locationId: beskaynar._id,
        roominess: 2,
        rating: 5,
        season: 'summer',
        image: ['yurta1.jpeg', 'yurta2.jpeg', 'yurta3.jpeg'],
        preview: 'yurta1.jpeg',
        rent: 75000,
        free: true,
        userId: testUser._id,
        description:
          'Звезды,горы и посиделки у костра!',
        published: true
      }
    );

    db.close();
  });
};

module.exports = fixApply;
