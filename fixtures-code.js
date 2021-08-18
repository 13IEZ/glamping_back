const { nanoid } = require('nanoid');

const User = require('./src/api/v1/models/User');
const Location = require('./src/api/v1/models/Location');
const Product = require('./src/api/v1/models/Product');
const Category = require('./src/api/v1/models/Category');
const Review = require('./src/api/v1/models/Review');
const Pich = require('./src/api/v1/models/Pich');
const Accommodation = require('./src/api/v1/models/Accommodation');
const Factory = require('./src/api/v1/models/Factory');
const Reservation = require('./src/api/v1/models/Reservation');

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
      await db.dropCollection('factories');
      await db.dropCollection('reservations');
    } catch (err) {
      console.log('Collections were not presented. Skipping drop');
    }

    const [geokupol, polimer, jetysu, tentland, iveco, dethl, leader, aprofile] = await Factory.create(
      { title: 'ТОО «Геокупол»' },
      { title: 'ТОО «Полимер»' },
      { title: 'СПК «Жетысу»' },
      { title: 'ТОО «TentLand»' },
      { title: 'Iveco Vehicles' },
      { title: 'DETHLEFFS' },
      { title: 'TOO «Leader Stroy KZ»' },
      { title: 'TOO «А-Профиль»' }
    );

    const [tent, frameHouse, dome, yurt, product, trailer, motorHome, other] = await Category.create(
      { title: 'Тенты' },
      { title: 'Каркасные дома' },
      { title: 'Купола' },
      { title: 'Юрты' },
      { title: 'Модули' },
      { title: 'Трейлеры' },
      { title: 'Автодома' },
      { title: 'Другое' }
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
      frameHouse1,
      frameHouse2,
      frameHouse3,
      trailler1,
      trailler2,
      trailler3,
      motoHome1,
      motoHome2,
      motoHome3,
      geokupol4,
      geokupol1,
      geokupol2,
      geokupol3,
      aleut,
      yurta,
      yurta1,
      yurta2,
      yurta3,
      belltent,
      belltent2,
      belltent3,
    ] = await Product.create(
      {
        title: 'Каркасный дом-1',
        categoryId: frameHouse._id,
        userId: userUser._id,
        season: 'all',
        preview: 'karkasnii-dom-foto-1.jpg',
        rating: 4,
        image: ['karkasnii-dom-foto-1.jpg', 'karkasnii-dom-foto-2.jpg'],
        roominess: 9,
        description:
          'Каркасный дом — это быстровозводимая конструкция, в которой все несущие элементы связаны между собой. Каркасное домостроение является основным ' +
          'типом[источник не указан 1136 дней] малоэтажного строительства в Скандинавии, Финляндии, Германии, США, Канаде и Японии. Каркасная технология ' +
          'является самой энергоэффективной[источник не указан 1136 дней] так как стены, полы и кровля практически полностью заполняются утеплителем. ' +
          'Каркасные дома в Европе и Скандинавии строили еще с 11 века в виде фахверков. Технология в том виде, которой мы ее знаем сейчас - появилась в ' +
          'начале 19 века в США. По этой технологии строились и продолжают возводиться не только частные дома, но и трёх-, и четырёхэтажные большие ' +
          'многофункциональные здания. Законодательством Японии и ряда европейских стран предусмотрено строительство каркасных домов высотой до 7-ми ' +
          'этажей[источник не указан 1136 дней].',
        price: 40000000,
        published: true,
        factoryId: leader._id,
      },

      {
        title: 'Каркасный дом-2',
        categoryId: frameHouse._id,
        userId: userUser._id,
        season: 'all',
        preview: 'karkasnii-dom-foto-3.jpg',
        rating: 5,
        image: ['karkasnii-dom-foto-3.jpg', 'karkasnii-dom-foto-4.jpg'],
        roominess: 7,
        description:
          'Каркасный дом — это быстровозводимая конструкция, в которой все несущие элементы связаны между собой. Каркасное домостроение является основным ' +
          'типом[источник не указан 1136 дней] малоэтажного строительства в Скандинавии, Финляндии, Германии, США, Канаде и Японии. Каркасная технология ' +
          'является самой энергоэффективной[источник не указан 1136 дней] так как стены, полы и кровля практически полностью заполняются утеплителем. ' +
          'Каркасные дома в Европе и Скандинавии строили еще с 11 века в виде фахверков. Технология в том виде, которой мы ее знаем сейчас - появилась в ' +
          'начале 19 века в США. По этой технологии строились и продолжают возводиться не только частные дома, но и трёх-, и четырёхэтажные большие ' +
          'многофункциональные здания. Законодательством Японии и ряда европейских стран предусмотрено строительство каркасных домов высотой до 7-ми ' +
          'этажей[источник не указан 1136 дней].',
        price: 50000000,
        published: true,
        factoryId: aprofile._id,
      },

      {
        title: 'Каркасный дом-3',
        categoryId: frameHouse._id,
        userId: testUser._id,
        season: 'all',
        preview: 'karkasnii-dom-foto-5.jpg',
        rating: 5,
        image: ['karkasnii-dom-foto-5.jpg', 'karkasnii-dom-foto-6.jpg'],
        roominess: 8,
        description:
          'Каркасный дом — это быстровозводимая конструкция, в которой все несущие элементы связаны между собой. Каркасное домостроение является основным ' +
          'типом[источник не указан 1136 дней] малоэтажного строительства в Скандинавии, Финляндии, Германии, США, Канаде и Японии. Каркасная технология ' +
          'является самой энергоэффективной[источник не указан 1136 дней] так как стены, полы и кровля практически полностью заполняются утеплителем. ' +
          'Каркасные дома в Европе и Скандинавии строили еще с 11 века в виде фахверков. Технология в том виде, которой мы ее знаем сейчас - появилась в ' +
          'начале 19 века в США. По этой технологии строились и продолжают возводиться не только частные дома, но и трёх-, и четырёхэтажные большие ' +
          'многофункциональные здания. Законодательством Японии и ряда европейских стран предусмотрено строительство каркасных домов высотой до 7-ми ' +
          'этажей[источник не указан 1136 дней].',
        price: 60000000,
        published: true,
        factoryId: aprofile._id,
      },

      {
        title: 'Кемпер-1',
        categoryId: trailer._id,
        userId: userUser._id,
        season: 'all',
        preview: 'trailer1.jpg',
        rating: 3,
        image: ['trailer1.jpg', 'trailer2.jpg'],
        roominess: 4,
        description:
          'Автодо́м (также ке́мпер, автода́ча, карава́н) — автомобиль с жилым помещением в фургоне, либо отдельным в виде прицепа (трейлера), ' +
          'либо совмещённым с самим автомобилем. Прототипом домов на колёсах и их начальным вариантом являются передвижные повозки — фургоны древних ' +
          'людей, которые вели кочевой образ жизни и занимались скотоводством, в том числе и разведением лошадей. Чаще всего производители используют ' +
          'шасси лёгких грузовиков и устанавливают на него жилой модуль. Кабина автомобиля при этом связана проходом с жилым помещением. ' +
          'На современном этапе производства автодомов применяются технологии, позволяющие создавать полностью интегрированный автодом. ' +
          'Снаружи он становится похож не на машину с жилым фургоном, а на автобус. Чаще всего в автодоме установлены места для сидения, ' +
          'которые на стоянках трансформируются в спальные места. Имеется туалет, душ, газовая плита, холодильник, газовое отопление, кондиционер, ' +
          'шкафы для предметов, освещения',
        price: 2500000,
        published: true,
        factoryId: dethl._id,
      },

      {
        title: 'Кемпер-2',
        categoryId: trailer._id,
        userId: userUser._id,
        season: 'all',
        preview: 'trailer3.jpg',
        rating: 4,
        image: ['trailer3.jpg', 'trailer4.jpg'],
        roominess: 3,
        description:
          'Автодо́м (также ке́мпер, автода́ча, карава́н) — автомобиль с жилым помещением в фургоне, либо отдельным в виде прицепа (трейлера), ' +
          'либо совмещённым с самим автомобилем. Прототипом домов на колёсах и их начальным вариантом являются передвижные повозки — фургоны древних ' +
          'людей, которые вели кочевой образ жизни и занимались скотоводством, в том числе и разведением лошадей. Чаще всего производители используют ' +
          'шасси лёгких грузовиков и устанавливают на него жилой модуль. Кабина автомобиля при этом связана проходом с жилым помещением. ' +
          'На современном этапе производства автодомов применяются технологии, позволяющие создавать полностью интегрированный автодом. ' +
          'Снаружи он становится похож не на машину с жилым фургоном, а на автобус. Чаще всего в автодоме установлены места для сидения, ' +
          'которые на стоянках трансформируются в спальные места. Имеется туалет, душ, газовая плита, холодильник, газовое отопление, кондиционер, ' +
          'шкафы для предметов, освещения',
        price: 3500000,
        published: true,
        factoryId: dethl._id,
      },

      {
        title: 'Кемпер-3',
        categoryId: trailer._id,
        userId: testUser._id,
        season: 'all',
        preview: 'trailer5.jpg',
        rating: 5,
        image: ['trailer5.jpg', 'trailer6.jpg'],
        roominess: 5,
        description:
          'Автодо́м (также ке́мпер, автода́ча, карава́н) — автомобиль с жилым помещением в фургоне, либо отдельным в виде прицепа (трейлера), ' +
          'либо совмещённым с самим автомобилем. Прототипом домов на колёсах и их начальным вариантом являются передвижные повозки — фургоны древних ' +
          'людей, которые вели кочевой образ жизни и занимались скотоводством, в том числе и разведением лошадей. Чаще всего производители используют ' +
          'шасси лёгких грузовиков и устанавливают на него жилой модуль. Кабина автомобиля при этом связана проходом с жилым помещением. ' +
          'На современном этапе производства автодомов применяются технологии, позволяющие создавать полностью интегрированный автодом. ' +
          'Снаружи он становится похож не на машину с жилым фургоном, а на автобус. Чаще всего в автодоме установлены места для сидения, ' +
          'которые на стоянках трансформируются в спальные места. Имеется туалет, душ, газовая плита, холодильник, газовое отопление, кондиционер, ' +
          'шкафы для предметов, освещения',
        price: 4500000,
        published: true,
        factoryId: dethl._id,
      },

      {
        title: 'Автодом-1',
        categoryId: motorHome._id,
        userId: userUser._id,
        season: 'all',
        preview: 'autohouse1.jpg',
        rating: 3,
        image: ['autohouse1.jpg', 'autohouse2.jpg'],
        roominess: 4,
        description:
          'Автодо́м (также ке́мпер, автода́ча, карава́н) — автомобиль с жилым помещением в фургоне, либо отдельным в виде прицепа (трейлера), ' +
          'либо совмещённым с самим автомобилем. Прототипом домов на колёсах и их начальным вариантом являются передвижные повозки — фургоны древних ' +
          'людей, которые вели кочевой образ жизни и занимались скотоводством, в том числе и разведением лошадей. Чаще всего производители используют ' +
          'шасси лёгких грузовиков и устанавливают на него жилой модуль. Кабина автомобиля при этом связана проходом с жилым помещением. ' +
          'На современном этапе производства автодомов применяются технологии, позволяющие создавать полностью интегрированный автодом. ' +
          'Снаружи он становится похож не на машину с жилым фургоном, а на автобус. Чаще всего в автодоме установлены места для сидения, ' +
          'которые на стоянках трансформируются в спальные места. Имеется туалет, душ, газовая плита, холодильник, газовое отопление, кондиционер, ' +
          'шкафы для предметов, освещения',
        price: 25000000,
        published: true,
        factoryId: iveco._id,
      },

      {
        title: 'Автодом-2',
        categoryId: motorHome._id,
        userId: userUser._id,
        season: 'all',
        preview: 'autohouse3.jpg',
        rating: 4,
        image: ['autohouse3.jpg', 'autohouse4.jpg'],
        roominess: 4,
        description:
          'Автодо́м (также ке́мпер, автода́ча, карава́н) — автомобиль с жилым помещением в фургоне, либо отдельным в виде прицепа (трейлера), ' +
          'либо совмещённым с самим автомобилем. Прототипом домов на колёсах и их начальным вариантом являются передвижные повозки — фургоны древних ' +
          'людей, которые вели кочевой образ жизни и занимались скотоводством, в том числе и разведением лошадей. Чаще всего производители используют ' +
          'шасси лёгких грузовиков и устанавливают на него жилой модуль. Кабина автомобиля при этом связана проходом с жилым помещением. ' +
          'На современном этапе производства автодомов применяются технологии, позволяющие создавать полностью интегрированный автодом. ' +
          'Снаружи он становится похож не на машину с жилым фургоном, а на автобус. Чаще всего в автодоме установлены места для сидения, ' +
          'которые на стоянках трансформируются в спальные места. Имеется туалет, душ, газовая плита, холодильник, газовое отопление, кондиционер, ' +
          'шкафы для предметов, освещения',
        price: 35000000,
        published: true,
        factoryId: iveco._id,
      },

      {
        title: 'Автодом-3',
        categoryId: motorHome._id,
        userId: testUser._id,
        season: 'all',
        preview: 'autohouse5.jpg',
        rating: 5,
        image: ['autohouse5.jpg', 'autohouse6.jpg'],
        roominess: 5,
        description:
          'Автодо́м (также ке́мпер, автода́ча, карава́н) — автомобиль с жилым помещением в фургоне, либо отдельным в виде прицепа (трейлера), ' +
          'либо совмещённым с самим автомобилем. Прототипом домов на колёсах и их начальным вариантом являются передвижные повозки — фургоны древних ' +
          'людей, которые вели кочевой образ жизни и занимались скотоводством, в том числе и разведением лошадей. Чаще всего производители используют ' +
          'шасси лёгких грузовиков и устанавливают на него жилой модуль. Кабина автомобиля при этом связана проходом с жилым помещением. ' +
          'На современном этапе производства автодомов применяются технологии, позволяющие создавать полностью интегрированный автодом. ' +
          'Снаружи он становится похож не на машину с жилым фургоном, а на автобус. Чаще всего в автодоме установлены места для сидения, ' +
          'которые на стоянках трансформируются в спальные места. Имеется туалет, душ, газовая плита, холодильник, газовое отопление, кондиционер, ' +
          'шкафы для предметов, освещения',
        price: 45000000,
        published: true,
        factoryId: iveco._id,
      },

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
        factoryId: geokupol._id,
      },

      {
        title: 'Геокупол-1',
        categoryId: dome._id,
        userId: userUser._id,
        season: 'summer',
        preview: 'geo1.jpg',
        rating: 3,
        image: ['geo1.jpg', 'geo2.jpg'],
        roominess: 4,
        description:
          'Геодезический купол (геокупол, геодом) — сферическое архитектурное сооружение, ' +
          'собранное из стержней, образующих геодезическую структуру, благодаря которой сооружение в целом ' +
          'обладает хорошими несущими качествами. Геодезический купол является несущей сетчатой оболочкой.',
        price: 1600000,
        published: true,
        factoryId: geokupol._id,
      },

      {
        title: 'Геокупол-2',
        categoryId: dome._id,
        userId: testUser._id,
        season: 'summer',
        preview: 'geo3.jpg',
        rating: 3,
        image: ['geo3.jpg', 'geo4.jpg'],
        roominess: 5,
        description:
          'Геодезический купол (геокупол, геодом) — сферическое архитектурное сооружение, ' +
          'собранное из стержней, образующих геодезическую структуру, благодаря которой сооружение в целом ' +
          'обладает хорошими несущими качествами. Геодезический купол является несущей сетчатой оболочкой.',
        price: 1700000,
        published: true,
        factoryId: geokupol._id,
      },

      {
        title: 'Геокупол-3',
        categoryId: dome._id,
        userId: testUser._id,
        season: 'summer',
        preview: 'geo5.jpg',
        rating: 3,
        image: ['geo5.jpg', 'geo6.jpg'],
        roominess: 6,
        description:
          'Геодезический купол (геокупол, геодом) — сферическое архитектурное сооружение, ' +
          'собранное из стержней, образующих геодезическую структуру, благодаря которой сооружение в целом ' +
          'обладает хорошими несущими качествами. Геодезический купол является несущей сетчатой оболочкой.',
        price: 1800000,
        published: true,
        factoryId: geokupol._id,
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
        factoryId: polimer._id,
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
        factoryId: jetysu._id,
      },
      {
        title: 'Юрта-1',
        categoryId: yurt._id,
        userId: userUser._id,
        season: 'all',
        preview: 'yurta1.jpg',
        rating: 3,
        image: ['yurta1.jpg', 'yurta2.jpg'],
        roominess: 4,
        description: 'Юрта — переносное каркасное жилище с войлочным покрытием у тюркских и монгольских кочевников.',
        price: 499000,
        published: true,
        factoryId: jetysu._id,
      },
      {
        title: 'Юрта-2',
        categoryId: yurt._id,
        userId: userUser._id,
        season: 'summer',
        preview: 'yurta3.jpg',
        rating: 5,
        image: ['yurta3.jpg', 'yurta4.jpg'],
        roominess: 4,
        description: 'Юрта — переносное каркасное жилище с войлочным покрытием у тюркских и монгольских кочевников.',
        price: 599000,
        published: true,
        factoryId: jetysu._id,
      },
      {
        title: 'Юрта-3',
        categoryId: yurt._id,
        userId: adminUser._id,
        season: 'all',
        preview: 'yurta5.jpeg',
        rating: 5,
        image: ['yurta5.jpg', 'yurta6.jpeg'],
        roominess: 7,
        description: 'Юрта — переносное каркасное жилище с войлочным покрытием у тюркских и монгольских кочевников.',
        price: 699000,
        published: true,
        factoryId: jetysu._id,
      },
      {
        title: 'Белл тент',
        categoryId: tent._id,
        userId: userUser._id,
        season: 'summer',
        preview: 'belltent1.jpg',
        rating: 5,
        image: ['belltent1.jpg', 'belltent2.jpg'],
        roominess: 3,
        description:
          'Белл тент — это палатка для проживания, путешествий или отдыха. ' +
          'Дизайн белл тента представляет собой простую конструкцию, поддерживающую всю палатку центральным шестом.',
        price: 300000,
        published: true,
        factoryId: tentland._id,
      },
      {
        title: 'Белл тент-2',
        categoryId: tent._id,
        userId: testUser._id,
        season: 'summer',
        preview: 'belltent3.jpg',
        rating: 3,
        image: ['belltent3.jpg', 'belltent4.jpg'],
        roominess: 4,
        description:
          'Белл тент — это палатка для проживания, путешествий или отдыха. ' +
          'Дизайн белл тента представляет собой простую конструкцию, поддерживающую всю палатку центральным шестом.',
        price: 400000,
        published: true,
        factoryId: tentland._id,
      },
      {
        title: 'Белл тент-3',
        categoryId: tent._id,
        userId: testUser._id,
        season: 'summer',
        preview: 'belltent5.jpg',
        rating: 4,
        image: ['belltent5.jpg', 'belltent6.jpg'],
        roominess: 5,
        description:
          'Белл тент — это палатка для проживания, путешествий или отдыха. ' +
          'Дизайн белл тента представляет собой простую конструкцию, поддерживающую всю палатку центральным шестом.',
        price: 500000,
        published: true,
        factoryId: tentland._id,
      }
    );

    const [
      balkash,
      alakol,
      beskaynar,
      borovoe,
      balkash2,
      alakol2,
      beskaynar2,
      borovoe2,
      balkash3,
      alakol3,
      beskaynar3,
      borovoe3,
      balkash4,
      alakol4,
      beskaynar4,
      borovoe4,
      balkash5,
      alakol5,
      beskaynar5,
      borovoe5,
      balkash6,
      alakol6,
      beskaynar6,
      borovoe6,
      balkash7,
      alakol7,
      beskaynar7,
      borovoe7,
      balkash8,
      alakol8,
      beskaynar8,
      borovoe8,
      balkash9,
      alakol9,
    ] = await Location.create(
      {
        title: 'Location1 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [45.684758, 69.738521],
      },
      {
        title: 'Location2 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [47.684758, 60.738521],
      },
      {
        title: 'Location3 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [47.684758, 79.738521],
      },
      {
        title: 'Location4 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [44.684758, 76.738521],
      },
      {
        title: 'Location5 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [42.684758, 67.738521],
      },
      {
        title: 'Location6 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [51.684758, 71.738521],
      },
      {
        title: 'Location7 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [44.684758, 69.738521],
      },
      {
        title: 'Location8 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [47.684758, 61.738521],
      },
      {
        title: 'Location9 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [48.684758, 79.738521],
      },
      {
        title: 'Location10 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.684758, 74.738521],
      },
      {
        title: 'Location11 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [45.684758, 76.738521],
      },
      {
        title: 'Location12 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [42.684758, 66.738521],
      },
      {
        title: 'Location13 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [50.684758, 72.738521],
      },
      {
        title: 'Location14 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [44.684758, 77.738521],
      },
      {
        title: 'Location15 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [42.151234, 75.543456],
      },
      {
        title: 'Location16 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [44.255678, 75.997895],
      },
      {
        title: 'Location17 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [43.684758, 75.738521],
      },
      {
        title: 'Location18 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.155678, 72.941234],
      },
      {
        title: 'Location19 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.144758, 76.438521],
      },
      {
        title: 'Location20 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.151234, 76.513456],
      },
      {
        title: 'Location21 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [43.145678, 76.941234],
      },
      {
        title: 'Location22 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.255678, 76.997895],
      },
      {
        title: 'Location23 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.194758, 76.718521],
      },
      {
        title: 'Location24 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.161234, 76.543456],
      },
      {
        title: 'Location25 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [43.115678, 76.841234],
      },
      {
        title: 'Location26 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.125678, 76.917895],
      },
      {
        title: 'Location27 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.194758, 76.748521],
      },
      {
        title: 'Location28 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.131234, 76.523456],
      },
      {
        title: 'Location29 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [43.125678, 76.841234],
      },
      {
        title: 'Location30 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.385678, 76.977895],
      },
      {
        title: 'Location31 Title',
        region: 'Beskaynar',
        image: ['beskaynar1.jpeg', 'beskaynar2.jpeg', 'beskaynar3.jpeg'],
        square: '1320',
        description:
          'Земля в собственности! Сдам 13,2 га (1320 соток) в пос. Бескайнар (бывш. Горный Садовод). Участок граничит с комплексом Табаган" на протяжении -155 м, длина более -1000 м. Магистральный газ и свет проходят по участку, подводят государственное водоснабжение.',
        rent: '13000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.684758, 76.738521],
      },
      {
        title: 'Location32 Title',
        region: 'Borovoe',
        image: ['borovoe1.jpg', 'borovoe2.jpg'],
        square: '50',
        description:
          'Участок в прекрасном месте Боровое. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '8000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.151234, 76.543456],
      },
      {
        title: 'Location33 Title',
        region: 'Balkash',
        image: ['balkash1.jpeg', 'balkash2.jpeg'],
        square: '800',
        description:
          'Сдам в аренду земельный участок. Целевое назначение крестьянское хозяйство на берегу озера залив Чубартюбек.',
        rent: '5000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: userUser._id,
        coords: [43.155678, 76.931234],
      },
      {
        title: 'Location34 Title',
        region: 'Alakol',
        image: ['alakol1.jpeg', 'alakol2.jpeg', 'alakol3.jpeg'],
        square: '50',
        description:
          'Участок на берегу уникального целебного озера Алаколя в поселке Коктума. В районе автивное развитие инфраструктуры туристической деятельности, от озера 500 метров',
        rent: '9000',
        status: true,
        electricity: true,
        water: true,
        road: true,
        published: true,
        owner: testUser._id,
        coords: [43.285678, 76.997895],
      }
    );

    const [pichgeo, pichtent, pichyurta, pichyurtalux] = await Pich.create(
      {
        title: 'Боровое Тент',
        description: 'Участок "Боровое Тент" ' + 'отличное место для восстановления сил и энергии!',
        image: ['geo1.png', 'geo2.jpeg'],
        number: 1,
        locationId: borovoe._id,
        free: false,
        published: true,
        rent: 50000,
        preview: 'geo1.png',
      },
      {
        title: 'Боровое Геокупол',
        description:
          'Проведите неповторимые выходные в самом лоне природы на свежем воздухе на участке "Боровое Геокупол"! Рядом лес, речка, богатый сбор грибов гарантируем.',
        image: ['belltent1.jpg', 'belltent2.jpg'],
        number: 2,
        locationId: borovoe._id,
        free: true,
        published: true,
        rent: 40000,
        preview: 'belltent1.jpg',
      },
      {
        title: 'Боровое Юрта',
        description: 'Красота гор и озера, все у ваших ног на участке "Боровое Юрта"!',
        image: ['yurta1.jpeg', 'yurta2.jpeg'],
        number: 3,
        locationId: borovoe._id,
        free: true,
        published: true,
        rent: 30000,
        preview: 'yurta1.jpeg',
      },
      {
        title: 'Боровое Юрта Люкс',
        description:
          'На участке "Боровое Юрта Люкс" в сервис входят звезды, горы и посиделки у костра, свежий шашлык на вертеле, жареные молодые барашки и элитное вино столетней выдержки.',
        image: ['yurta1.jpeg', 'yurta2.jpeg', 'yurta3.jpeg'],
        number: 4,
        locationId: borovoe._id,
        free: true,
        published: true,
        rent: 30000,
        preview: 'yurta2.jpeg',
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
        rating: 5,
      },
      {
        title: 'Боровое Геокупол',
        description:
          'Проведите неповторимые выходные в самом лоне природы на свежем воздухе! Рядом лес, речка, богатый сбор грибов гарантируем.',
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
        rating: 4,
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
        rating: 4,
      },
      {
        title: 'Боровое Юрта Люкс',
        description:
          'В сервис входят звезды, горы и посиделки у костра, свежий шашлык на вертеле, жареные молодые барашки и элитное вино столетней выдержки.',
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
        rating: 5,
      }
    );

    const [borovoetentreserv, borovoegeoreserv, borovoeyurtareserv, borovoeyurtaluxreserv] = await Reservation.create(
      {
        accommodation: borovoetent._id,
        startDate: '2021-09-03',
        endDate: '2021-09-10',
        user: userUser._id,
      },
      {
        accommodation: borovoetent._id,
        startDate: '2021-08-25',
        endDate: '2021-08-30',
        user: userUser._id,
      },
      {
        accommodation: borovoegeo._id,
        startDate: '2021-08-27',
        endDate: '2021-09-05',
        user: userUser._id,
      },
      {
        accommodation: borovoegeo._id,
        startDate: '2021-09-10',
        endDate: '2021-09-20',
        user: userUser._id,
      },
      {
        accommodation: borovoeyurta._id,
        startDate: '2021-08-10',
        endDate: '2021-08-25',
        user: userUser._id,
      },
      {
        accommodation: borovoeyurta._id,
        startDate: '2021-09-02',
        endDate: '2021-09-10',
        user: userUser._id,
      },
      {
        accommodation: borovoeyurtalux._id,
        startDate: '2021-08-28',
        endDate: '2021-09-16',
        user: userUser._id,
      },
      {
        accommodation: borovoeyurtalux._id,
        startDate: '2021-09-20',
        endDate: '2021-09-25',
        user: userUser._id,
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
      {
        pros: 'Отлично провели выходные',
        cons: 'Далеко от дороги, много комаров',
        review: 'В целом отдых удался на славу! Природа, озеро, а закат просто волшебный!',
        date: new Date(2021, 7, 6),
        rating: 5,
        user: userUser._id,
        accommodation: borovoetent._id,
      },
      {
        pros: 'Как-то не очень',
        review: 'Тесно и жарко было',
        date: new Date(2021, 6, 7),
        rating: 1,
        user: testUser._id,
        accommodation: borovoetent._id,
      },
      {
        pros: 'Всем все понравилось',
        review: 'Прикольно так',
        date: new Date(2021, 7, 6),
        rating: 5,
        user: userUser._id,
        accommodation: borovoetent._id,
      },
      {
        pros: 'Тихо, красиво, комфортно',
        review: 'Рекомендую',
        date: new Date(2021, 7, 6),
        rating: 5,
        user: userUser._id,
        accommodation: borovoetent._id,
      },
      {
        pros: 'Очень даже неплохо',
        review: 'Хорошее место',
        date: new Date(2021, 7, 4),
        rating: 4,
        user: userUser._id,
        accommodation: borovoegeo._id,
      },
      {
        pros: 'Тихое место',
        review: 'Все понравилось, комфортно',
        date: new Date(2021, 6, 1),
        rating: 3,
        user: testUser._id,
        accommodation: borovoegeo._id,
      },
      {
        pros: 'Вдали от шума',
        review: 'Очень романтично',
        date: new Date(2021, 6, 1),
        rating: 4,
        user: testUser._id,
        accommodation: borovoegeo._id,
      },
      {
        review: 'Красивые места',
        date: new Date(2021, 6, 1),
        rating: 4,
        user: testUser._id,
        accommodation: borovoegeo._id,
      },
      {
        review: 'Детям понравилось',
        date: new Date(2021, 8, 4),
        rating: 4,
        user: userUser._id,
        accommodation: borovoeyurta._id,
      },
      {
        pros: 'Недалеко от озера',
        review: 'Еще приедем',
        date: new Date(2021, 6, 1),
        rating: 4,
        user: testUser._id,
        accommodation: borovoeyurta._id,
      },
      {
        pros: 'Много красивых мест',
        review: 'Вернемся обязательно',
        date: new Date(2021, 6, 1),
        rating: 5,
        user: testUser._id,
        accommodation: borovoeyurta._id,
      },
      {
        review: 'Понравилось',
        date: new Date(2021, 6, 1),
        rating: 4,
        user: testUser._id,
        accommodation: borovoeyurta._id,
      },
      {
        review: 'Отдохнули хорошо',
        date: new Date(2021, 6, 4),
        rating: 5,
        user: userUser._id,
        accommodation: borovoeyurtalux._id,
      },
      {
        cons: 'Вода холодная, купаться невозможно',
        review: 'Надо брать теплую одежду на вечер',
        date: new Date(2021, 4, 7),
        rating: 3,
        user: testUser._id,
        accommodation: borovoeyurtalux._id,
      },
      {
        cons: 'Комары замучали',
        review: 'Берите спрей от насекомых',
        date: new Date(2021, 4, 7),
        rating: 3,
        user: testUser._id,
        accommodation: borovoeyurtalux._id,
      },
      {
        cons: 'Скучно',
        review: 'Заняться было не чем',
        date: new Date(2021, 4, 7),
        rating: 3,
        user: testUser._id,
        accommodation: borovoeyurtalux._id,
      }
    );

    db.close();
  });
};

module.exports = fixApply;
