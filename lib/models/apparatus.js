Apparatuses = new Mongo.Collection('apparatuses')
Apparatus = Astro.Class({
  name: 'Apparatus',
  collection: Apparatuses,
  transform: true,
  fields: {
    identifier: 'string',
    description: 'string',
    stationId: 'string'
  }
})

//
// {
//   identifier: 'E12',
//   description: 'Engine',
//   stationId: '1291hfn3n2bb2'
// }
// 
