Incidents = new Mongo.Collection('incidents', { idGeneration : 'MONGO' })
Incident = Astro.Class({
  name: 'Incident',
  collection: Incidents,
  transform: false,
  fields: {
    incidentno: 'number',
    status: 'string',
    type: 'string',
    createdAt: 'date',
    receivedAt: 'date',
    clearedAt: 'date',
    latitude: 'string',
    longitude: 'string',
    location: 'string',
    locationStreetOnly: 'string',
    city: 'string',
    locationGrid: 'string',
    fireTac: 'string',
    'units': {
      type: 'array',
      default: []
    },
    'units.$': {
      type: 'object',
      default: {}
    },
    'units.$.apparatus': 'string',
    'units.$.status': 'string',
    'units.$.dispatchedAt': 'date',
    'units.$.enrouteAt': 'date',
    'units.$.onsceneAt': 'date',
    'units.$.clearedAt': 'date'
  }
})
