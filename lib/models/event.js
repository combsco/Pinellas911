Events = new Mongo.Collection('events')
Event = Astro.Class({
  name: 'Event',
  collection: Events,
  transform: true,
  fields: {
    type: 'string',
    properName: 'string',
    description: 'string'
  }
})

// {
//   type: 'MEDICAL',
//   properName: 'Medic Response',
//   description: 'Medical service call.'
// }
