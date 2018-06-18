const { db, Gardener, Plot, Vegetable } = require('./models');

db.sync( {force: true} )
  .then( () => {
    return Vegetable.bulkCreate([
      {name: 'Tomatoe', color: 'red' , planted_on: new Date() },
      {name: 'Cucumber' , color: 'green' , planted_on: new Date() },
      {name: 'Potatoe' , color: 'yellow' , planted_on: new Date()}
    ]);
  }).then (vegetables => {
    console.log("Vegies", vegetables);
    return Gardener.bulkCreate([
      {name: 'Tom', age: 35 , favoriteVegetableId: vegetables[0].id },
      {name: 'Sam' , age: 48 , favoriteVegetableId: vegetables[1].id },
      {name: 'Michael' , age: 60 , favoriteVegetableId: vegetables[2].id }
    ]);
  }).then (gardeners => {
    return Plot.bulkCreate([
      {size: 10 , shaded: true , gardenerId: gardeners[0].id },
      {size: 15 , shaded: false , gardenerId: gardeners[1].id },
      {size: 35 , shaded: true , gardenerId: gardeners[2].id }
    ]);
  }).catch(err => {
    console.log(err);
  })
  .finally( () => {
    db.close();
  });

