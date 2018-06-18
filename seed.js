const { db, Gardener, Plot, Vegetable } = require('./models');

db.sync( {force: true} )
  .then( () => {
    return Vegetable.bulkCreate([
      {name: 'Tomatoe', color: 'red', planted_on: new Date() },
      {name: 'Cucumber' , color: 'green', planted_on: new Date() },
      {name: 'Potatoe' , color: 'yellow', planted_on: new Date() }
    ], { returning: true });
  }).then (createdVegetables => {
    console.log("Vegies", createdVegetables);
    return Gardener.bulkCreate([
      {name: 'Tom', age: 35 , favoriteVegetableId: createdVegetables[0].id },
      {name: 'Sam' , age: 48 , favoriteVegetableId: createdVegetables[1].id },
      {name: 'Michael' , age: 60 , favoriteVegetableId: createdVegetables[2].id }
    ], { returning: true });
  }).then (createdGardeners => {
    return Plot.bulkCreate([
      {size: 10 , shaded: true , gardenerId: createdGardeners[0].id },
      {size: 15 , shaded: false , gardenerId: createdGardeners[1].id },
      {size: 35 , shaded: true , gardenerId: createdGardeners[2].id }
    ], { returning: true });
  }).catch(err => {
    console.log(err);
  })
  .finally( () => {
    db.close();
  });

