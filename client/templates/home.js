/*global Session Template Incidents moment $ _ L Mapbox*/

var mapLeaflet = null

Template.home.onCreated(function () {
  var self = this
  self.autorun(function () {
    self.subscribe('getActiveIncidents')
    self.subscribe('userStatus')
    self.subscribe('getStations')
  })
})

Template.home.events({
  'click .close': function () {
    Session.setPersistent('closedWelcomeBanner', true)
  }
})

Template.home.helpers({
  incidents: function () {
    return Incidents.find({}, {
      sort: {
        receivedAt: -1
      }
    })
  },
  showBanner: function () {
    if (Session.get('closedWelcomeBanner')) {
      return false
    } else {
      return true
    }
  }
})

Template.incidentMap.rendered = function () {
  var markerColor
  var markerSymbol
  var markerTitle
  var incidentMarkers = { 'type': 'FeatureCollection', 'features': [] }

  this.autorun(function () {
    if (Mapbox.loaded()) {

      L.mapbox.accessToken = 'pk.eyJ1IjoiY29tYnNjcCIsImEiOiJ6M2p2c3VvIn0.6H2Bq8Q_iEQLYYv7pG3Quw'
      mapLeaflet = L.mapbox.map('map', 'combscp.l64kadkd', {})
      mapLeaflet.scrollWheelZoom.disable()

      Stations.find({}).observe({
        added: function (doc) {
          var name, tagline, dept, html, unitId, apparatus
          unitId = ''
          name = '<b>Station #' + doc.identifier + ' - ' + doc.name + '</b>'
          tagline = '<em>"' + doc.tagLine + '"</em>'
          dept = doc.fireDept + '<br>'

          _.each(doc.units, function (unit) {
            unitId = unitId + ' ' + unit
          })
          unitId.trim()

          apparatus = '<h5 style="margin-top: 5px; margin-bottom: 10px;"><small>Apparatus</small><br><div style="padding-top: 2px;">' + unitId + '</div></h5>'

          if (doc.tagLine === null) {
            html = dept + name + apparatus
          } else {
            html = dept + name + '<br>' + tagline + apparatus
          }

          L.marker(
            [doc.location.coordinates[1], doc.location.coordinates[0]], {
              title: doc.name,
              icon: L.divIcon({
                className: 'stationicon',
                iconSize: [15, 15],
                'html': doc.identifier
              })
            }
          ).addTo(mapLeaflet).bindPopup(html)
        }
      })

      var incidents = L.mapbox.featureLayer().addTo(mapLeaflet)
      var query = Incidents.find()
      query.observe({
        added: function (doc) {
          if (doc.type === 'MEDICAL') {
            markerTitle = 'Medic Response - #' + doc.incidentno
            markerColor = '#3097d1'
            markerSymbol = 'hospital'
          } else if (doc.type === 'STRUCTURE FIRE') {
            markerTitle = 'Structure Fire - #' + doc.incidentno
            markerColor = '#B20A31'
            markerSymbol = 'fire-station'
          } else if (doc.type === 'FIRE ALARM') {
            markerTitle = 'Fire Alarm - #' + doc.incidentno
            markerColor = '#F44B36'
            markerSymbol = 'triangle'
          } else if (doc.type === 'MOTOR VEHICLE COLLISION') {
            markerTitle = 'Motor Vehicle Incident - #' + doc.incidentno
            markerColor = '#FF7919'
            markerSymbol = 'triangle-stroked'
          } else {
            markerTitle = 'Incident#' + doc.incidentno
            markerColor = '#FF7919'
            markerSymbol = 'triangle-stroked'
          }

          incidentMarkers.features.push(
            {
              'type': 'Feature',
              'incidentno': doc.incidentno,
              'properties': {
                'title': markerTitle,
                'marker-color': markerColor,
                'marker-symbol': markerSymbol,
                'marker-size': 'medium'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [doc.longitude, doc.latitude]
              }
            }
          )
          incidents.setGeoJSON(incidentMarkers)
        },
        removed: function (oldDocument) {
          mapLeaflet.eachLayer(function (layer) {
            if ('_latlng' in layer) {
              if (layer._latlng.lat === parseFloat(oldDocument.latitude) && layer._latlng.lng === parseFloat(oldDocument.longitude)) {
                mapLeaflet.removeLayer(layer)
                incidentMarkers.features = _.without(incidentMarkers.features, _.findWhere(incidentMarkers.features, {'incidentno': oldDocument.incidentno}))
                incidents.setGeoJSON(incidentMarkers)
              }
            }
          })
        }
      })
    }
  })
}

Template.incidentItem.rendered = function () {
  this.autorun(function () {
    $('#animation').on('change.livestamp', function (event, from, to) {
      event.preventDefault() // Stop the text from changing automatically
      $(this).fadeOut(function () {
        $(this).html(to).fadeIn()
      })
    }).livestamp()
  })
}
Template.incidentItem.helpers({
  type: function (type) {
    return this.type === type
  },
  getIncidentColor: function () {
    switch (this.type) {
      case 'MEDICAL':
        return '#3097d1'
      case 'STRUCTURE FIRE':
        return '#B20A31'
      case 'MOTOR VEHICLE COLLISION':
        return '#FF7919'
      default:
        return '#1e3948'
    }
  },
  getFireTac: function () {
    switch (this.fireTac) {
      case 'A':
        return 'Alpha'
      case 'B':
        return 'Bravo'
      case 'C':
        return 'Charlie'
      case 'D':
        return 'Delta'
      case 'E':
        return 'Echo'
      case 'F':
        return 'Foxtrot'
      case 'G':
        return 'Gulf'
      default:
        return this.fireTac
    }
  },
  getTimestamp: function () {
    var date = moment(this.receivedAt)
    return date.format()
  },
  getIncidentName: function () {
    switch (this.type) {
      case 'MEDICAL':
        return 'Medic Response'
      case 'MOTOR VEHICLE COLLISION':
        return 'Motor Vehicle Incident'
      case 'UNCONFIRMED STRUCTURE FIRE':
        return 'Unconfirmed Structure Fire'
      case 'CITIZEN ASSIST (FIRE)':
        return 'Citizen Assist'
      case 'ASSIST OTHER AGENCY (FIRE)':
        return 'Other Agency Assist'
      case 'ASSIST OTHER AGENCY (TRUCK)':
        return 'Other Agency Assist'
      case 'UNKNOWN':
        return 'Unknown Issue'
      case 'FUEL SPILL':
        return 'Fuel Spill'
      case 'OUTSIDE FIRE (ENGINE)':
        return 'Outside Fire'
      case 'SPECIAL EVENT (NO REPORT)':
        return 'Special Event'
      case 'SPECIAL DETAIL':
        return 'Special Detail'
      case 'FIRE ALARM':
        return 'Fire Alarm'
      case 'FIRE ALARM TEST':
        return 'Fire Alarm (Test)'
      case 'STRUCTURE FIRE':
        return 'Structure Fire'
      case 'ELEVATOR (ESCALATOR) RESCUE':
        return 'Elevator Rescue'
      case 'ELECTRICAL HAZARD (INSIDE)':
        return 'Electrical Hazard (Inside)'
      case 'ELECTRICAL HAZARD (OUTSIDE)':
        return 'Electrical Hazard (Outside)'
      case 'SMOKE INVESTIGATION (OUTSIDE)':
        return 'Smoke Investigation (Outside)'
      case 'GAS LEAK (CONFIRMED LEAK)':
        return 'Gas Leak (Confirmed)'
      case 'LACERATION':
        return 'Medic Response (Laceration)'
      case 'GAS ODOR (NATURAL/LP ODOR)':
        return 'Gas Odor (Natural/Propane)'
      case 'LANDING ZONE':
        return 'Helicopter Landing Zone'
      case 'VEHICLE FIRE':
        return 'Vehicle Fire'
      case 'HAZMAT EMERGENCY':
        return 'HAZMAT Emergency'
      case 'HAZMAT UPGRADE':
        return 'HAZMAT Emergency (Upgraded)'
      case 'HAZMAT INCIDENT':
        return 'HAZMAT Incident'
      case 'ODOR INVEST (STRANGE/UNKNOWN)':
        return 'Strange Odor Investigation'
      case 'ALERT 1':
        return 'Airport Alert 1'
      case 'ALERT 2':
        return 'Airport Alert 2'
      case 'ALERT 3':
        return 'Airport Alert 3'
      case 'ALERT 4':
        return 'Airport Alert 4'
      case 'STRUCTURE COLLAPSE':
        return 'Structure Collapse'
      case 'MARINE FIRE (LARGE / MARINA)':
        return 'Large Marina Fire'
      case 'BRUSH FIRE':
        return 'Brush Fire'
      case 'UNKNOWN PROBLEM':
        return 'Unknown Problem'
      default:
        return this.type
    }
  }
})
