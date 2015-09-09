Stations = new Mongo.Collection('stations')
Station = Astro.Class({
  name: 'Station',
  collection: Stations,
  transform: true,
  fields: {
    name: 'string',
    tagLine: 'string',
    fireDept: 'string',
    identifier: 'number',
    location: {
      type: 'object',
      default: {}
    },
    'location.type': 'string',
    'location.coordinates': 'array',
    units: {
      type: 'array',
      default: []
    }
  }
})
// Lat        Long
// 27.8748961,-82.6548814

// {
//   name: 'Gateway',
//   tagLine: 'Guardians of the Gateway'
//   fireDept: 'St. Petersburg Fire & Rescue',
//   identifier: '13',
//   address: '11600 Roosevelt Blvd N',
//   city: 'St. Petersburg',
//   units: ['E13', 'T13']
// }
