/*global Meteor Incidents UserStatus Counts*/

Meteor.publish('getActiveIncidents', function () {
  Counts.publish(this, 'ActiveIncidents', Incidents.find({
    status: 'Active'
  }), {noReady: true})

  return Incidents.find({
    status: 'Active'
  }, {
    sort: {
      receivedAt: -1
    }
  })
})

Meteor.publish(null, function () {
  var d = new Date()
  d = d.setHours(0, 0, 0, 0)
  // console.log(d)
  Counts.publish(this, 'getIncidentsToday', Incidents.find({
    receivedAt: {
      '$gt': d
    }
  }))
})

Meteor.publish('userStatus', function () {
  Counts.publish(this, 'ActiveUsers', UserStatus.connections.find(), {noReady: true})

  return [Meteor.users.find({
    'status.online': true
  }, {
    fields: {
      status: 1,
      username: 1
    }
  }), UserStatus.connections.find()]
})

Meteor.publish('getStations', function () {
  return Stations.find()
})
