const {nanoid} = require('nanoid');

const User = require('./src/api/v1/models/User');
const Location = require('./src/api/v1/models/Location');
const Product = require('./src/api/v1/models/Product');
const Category = require('./src/api/v1/models/Category');
const Review = require('./src/api/v1/models/Review');
const Pich = require('./src/api/v1/models/Pich');
const Accommodation = require('./src/api/v1/models/Accommodation');


const fixApply = db => {
  db.once('open', async () => {
    try {
      await db.dropCollection('locations');
      await db.dropCollection('products');
      await db.dropCollection('users');
      await db.dropCollection('reviews');
      await db.dropCollection('categories');
      await db.dropCollection('piches');
      await db.dropCollection('accommodations');
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

    const [
      balkash, alakol, beskaynar, borovoe,
      balkash2, alakol2, beskaynar2, borovoe2,
      balkash3, alakol3, beskaynar3, borovoe3,
      balkash4, alakol4, beskaynar4, borovoe4,
      balkash5, alakol5, beskaynar5, borovoe5,
      balkash6, alakol6, beskaynar6, borovoe6,
      balkash7, alakol7, beskaynar7, borovoe7,
      balkash8, alakol8, beskaynar8, borovoe8,
      balkash9, alakol9
    ] = await Location.create(
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [45.684758, 69.738521],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [47.684758, 60.738521],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [47.684758, 79.738521],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [44.684758, 76.738521],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [42.684758, 67.738521],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [51.684758, 71.738521],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [44.684758, 69.738521],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [47.684758, 61.738521],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [48.684758, 79.738521],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.684758, 74.738521],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [45.684758, 76.738521],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [42.684758, 66.738521],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [50.684758, 72.738521],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [44.684758, 77.738521],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [42.151234, 75.543456],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [44.255678, 75.997895],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [43.684758, 75.738521],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.155678, 72.941234],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.144758, 76.438521],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.151234, 76.513456],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [43.145678, 76.941234],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.255678, 76.997895],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.194758, 76.718521],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.161234, 76.543456],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [43.115678, 76.841234],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.125678, 76.917895],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.194758, 76.748521],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.131234, 76.523456],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [43.125678, 76.841234],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.385678, 76.977895],
      },
      {
        title: 'Beskaynar', image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'], square: '1320',
        description: 'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.684758, 76.738521],
      },
      {
        title: 'Borovoe', image: ['borovoe1.jpg', 'borovoe2.jpg'], square: '50',
        description: 'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.151234, 76.543456],
      },
      {
        title: 'Balkash', image: ['balkash1.jpeg', 'balkash2.jpeg'], square: '800',
        description: 'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000', status: true, electricity: true, water: true, road: true, published: true, owner: userUser._id,
        coords: [43.155678, 76.931234],
      },
      {
        title: 'Alakol', image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'], square: '50',
        description: 'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000', status: true, electricity: true, water: true, road: true, published: true, owner: testUser._id,
        coords: [43.285678, 76.997895],
      },
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
          'Белл тент — это палатка для проживания, путешествий или отдыха. ' +
          'Дизайн белл тента представляет собой простую конструкцию, поддерживающую всю палатку центральным шестом.',
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
        pros: 'Отличная природа',
        cons: 'Далеко от дороги, много комаров',
        review: 'В целом отдых удался на славу! Природа, озеро, а закат просто волшебный!',
        date: new Date(2021, 7, 6),
        rating: 5,
        user: userUser._id,
        location: balkash._id,
      },
      {
        pros: 'Пустошь',
        cons: 'Далеко от дороги, много комаров',
        review: 'Так себе место! В основном пустошь и озеро!',
        date: new Date(2021, 7, 6),
        rating: 3,
        user: userUser._id,
        location: balkash._id,
      },
      {
        pros: 'Ужасное место',
        cons: 'Далеко от дороги, много комаров',
        review: 'Ужасное место! Голая земля',
        date: new Date(2021, 7, 6),
        rating: 2,
        user: userUser._id,
        location: balkash._id,
      },
      {  
        pros: 'Отличная природа',
        cons: 'Нет интернета',
        review: 'Все хорошо, нам понравилось, был бы еще интернет, вообще бы там остались жить',
        date: new Date(2021, 9, 8),
        rating: 5,
        user: testUser._id,
        location: alakol._id,
      },
      {  
        pros: 'Нет света и подъезда',
        cons: 'Нет интернета',
        review: 'Все хорошо, нам понравилось, был бы еще интернет, вообще бы там остались жить',
        date: new Date(2021, 8, 8),
        rating: 2,
        user: testUser._id,
        location: alakol._id,
      },
      {  
        pros: 'Отличная природа',
        cons: 'Нет интернета',
        review: 'Все хорошо, нам понравилось, был бы еще интернет, вообще бы там остались жить',
        date: new Date(2021, 7, 8),
        rating: 3,
        user: testUser._id,
        location: alakol._id,
      },
      {  
        pros: 'Отличная природа',
        cons: 'Нет интернета',
        review: 'Все хорошо, нам понравилось, был бы еще интернет, вообще бы там остались жить',
        date: new Date(2021, 8, 8),
        rating: 5,
        user: testUser._id,
        location: alakol._id,
      },
      {
        pros: 'Хороший модуль',
        review: 'Хороший модуль, просторный',
        date: new Date(2021, 4, 8),
        rating: 5,
        user: userUser._id,
        product: aleut._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Отличный модуль, комфортабельный',
        date: new Date(2021, 5, 8),
        rating: 4,
        user: userUser._id,
        product: aleut._id,
      },
      {
        pros: 'Тесно, неудобно',
        review: 'Модуль, тесный, неудобный',
        date: new Date(2021, 2, 8),
        rating: 2,
        user: userUser._id,
        product: aleut._id,
      },
      {
        pros: 'Удобно',
        review: 'Терпимо, своих денег стоит',
        date: new Date(2021, 6, 8),
        rating: 4,
        user: userUser._id,
        product: aleut._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Отличная вещь для летнего отдыха',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: userUser._id,
        product: geokupol4._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Все было здорово, рекомендую',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: userUser._id,
        product: geokupol4._id,
      },
      {
        pros: 'Тесно, неудобно',
        review: 'Модуль, тесный, неудобныйо',
        date: new Date(2021, 6, 7),
        rating: 2,
        user: userUser._id,
        product: geokupol4._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Неудобный в сборке и разборке',
        date: new Date(2021, 6, 7),
        rating: 3,
        user: userUser._id,
        product: geokupol4._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Отличная вещь для летнего отдыха',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        product: yurta._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Все было здорово, рекомендую',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        product: yurta._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Вместительная, удобная в эксплуатации, стоит своих денего',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        product: yurta._id,
      },
      {
        pros: 'Неудобная',
        review: 'Неудобная в сборке и разборке',
        date: new Date(2021, 6, 7),
        rating: 3,
        user: testUser._id,
        product: yurta._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Отличная вещь для летнего отдыха',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        product: belltent._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Все было здорово, рекомендую',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        product: belltent._id,
      },
      {
        pros: 'Комфортабельно',
        review: 'Вместительный, удобный в эксплуатации, стоит своих денего',
        date: new Date(2021, 6, 7),
        rating: 5,
        user: testUser._id,
        product: belltent._id,
      },
      {
        pros: 'Неудобный',
        review: 'Неудобный в сборке и разборке',
        date: new Date(2021, 6, 7),
        rating: 1,
        user: testUser._id,
        product: belltent._id,
      },
    );

  const [pichgeo, pichtent, pichyurta, pichyurtalux] = await Pich.create(
    {
      title: 'Боровое Тент',
      description:
        'Отличное место для восстановления сил и энергии!',
      image: ['geo1.png', 'geo2.jpeg'],
      number: 1,
      locationId: borovoe._id,
      free: false,
      published: true,
      rent: 50000,
      preview: 'geo1.png'
    },
    {
      title: 'Боровое Геокупол',
      description:
        'Проведите неповторимые выходные в самом лоне природы на свежем воздухе! Рядом лес, речка, богатый сбор грибов гарантируем.',
      image: ['belltent1.jpg', 'belltent2.jpg'],
      number: 2,
      locationId: borovoe._id,
      free: true,
      published: true,
      rent: 40000,
      preview: 'belltent1.jpg'
    },
    {
      title: 'Боровое Юрта',
      description:
        'Красота гор и озера, все у ваших ног!',
      image: ['yurta1.jpeg', 'yurta2.jpeg'],
      number: 3,
      locationId: borovoe._id,
      free: true,
      published: true,
      rent: 30000,
      preview: 'yurta1.jpeg'
    },
    {
      title: 'Боровое Юрта Люкс',
      description:
        'В сервис входят звезды, горы и посиделки у костра, свежий шашлык на вертеле, жареные молодые барашки и элитное вино столетней выдержки.',
      image: ['yurta1.jpeg', 'yurta2.jpeg', 'yurta3.jpeg'],
      number: 4,
      locationId: borovoe._id,
      free: true,
      published: true,
      rent: 30000,
      preview: 'yurta2.jpeg'
    }
   );

    const [borovoetent, borovoegeo, borovoeyurta, borovoeyurtalux] = await Accommodation.create(
      {
        title: 'Боровое Тент',
        description: 'Отличное место для восстановления сил и энергии!',
        image: ['borovoetent1.jpeg', 'borovoetent2.jpeg', 'borovoetent3.jpeg', 'borovoetent4.jpeg'],
        productId: geokupol4._id,
        pichId: pichgeo._id,
        startDate: '01/08/21',
        endDate: '15/08/21',
        rent: '10000',
        status: false,
        userId: userUser._id,
        published: true,
        preview: 'borovoetent1.jpeg',
        rating: 5
      },

      {
        title: 'Боровое Геокупол',
        description: 'Проведите неповторимые выходные в самом лоне природы на свежем воздухе! Рядом лес, речка, богатый сбор грибов гарантируем.',
        image: ['borovoegeo1.jpeg', 'borovoegeo2.jpeg', 'borovoegeo3.jpeg', 'borovoegeo4.jpeg'],
        number: 1,
        productId: belltent._id,
        pichId: pichtent._id,
        startDate: '01/08/21',
        endDate: '15/08/21',
        rent: '15000',
        status: false,
        userId: userUser._id,
        published: true,
        preview: 'borovoegeo1.jpeg',
        rating: 4
      },
      {
        title: 'Боровое Юрта',
        description: 'Красота гор и озера, все у ваших ног!',
        image: ['borovoeyurta1.jpeg', 'borovoeyurta2.jpeg', 'borovoeyurta3.jpeg', 'borovoeyurta4.jpeg'],
        number: 3,
        productId: yurta._id,
        pichId: pichyurta._id,
        startDate: '01/08/21',
        endDate: '15/08/21',
        rent: '45000',
        status: false,
        userId: userUser._id,
        published: true,
        preview: 'borovoeyurta2.jpeg',
        rating: 4
      },
      {
        title: 'Боровое Юрта Люкс',
        description: 'В сервис входят звезды, горы и посиделки у костра, свежий шашлык на вертеле, жареные молодые барашки и элитное вино столетней выдержки.',
        image: ['borovoeyurtalux1.jpeg', 'borovoeyurtalux2.jpeg', 'borovoeyurtalux3.jpeg', 'borovoeyurtalux4.jpeg'],
        number: 3,
        productId: yurta._id,
        pichId: pichyurtalux._id,
        startDate: '01/08/21',
        endDate: '15/08/21',
        rent: '95000',
        status: false,
        userId: userUser._id,
        published: true,
        preview: 'borovoeyurtalux1.jpeg',
        rating: 5
      }
    );

    db.close();
  });
};

module.exports = fixApply;
