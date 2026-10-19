const sequelize = require('./db');
const Car = require('./models/Cars');

async function init() {
  try {
    await sequelize.sync({ force: true });
    console.log('Таблицы синхронизированы.');

    await Car.create(
        {
            brand: 'Mercedes',
            model: 'C63',
            year: 2016,
            price: 10000.0,
            isAvailable: true,
        },
    );
    await Car.create(
        {
            brand: 'Mercedes',
            model: 'E63',
            year: 2018,
            price: 15000.0,
            isAvailable: true,
        },
    );

    const cars = await Car.findAll();
    console.log('Все автомобили:', cars.map(u => u.toJSON()));

  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
  }
}

init();