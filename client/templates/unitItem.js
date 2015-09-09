/*global Template $*/

Template.unitItem.rendered = function () {
  this.autorun(function () {
    $('[data-toggle="popover"]').popover({trigger: 'hover focus', html: true})
  })
}

Template.unitItem.helpers({
  status: function (status) {
    return this.status === status
  },
  getApparatusName: function () {
    var unitId
    var unit

    // SUNSTAR
    if (/^\d{3}$/.test(this.apparatus) === true) {
      unitId = this.apparatus.match(/\d+/)[0]
      return 'SUNSTAR Paramedics #' + unitId
    } else if (/^\d{3}BA$/.test(this.apparatus) === true) {
      unitId = this.apparatus.match(/\d+/)[0]
      return 'SUNSTAR Paramedics #' + unitId + ' - Bariatric'
    } else if (this.apparatus.substring(0, 2) === 'SS' & /^\d{3}$/.test(this.apparatus.substring(2, 5)) === true) {
      unitId = this.apparatus.substring(2, 5)
      return 'SUNSTAR Paramedics #' + unitId + ' - Supervisor'
    }

    // Pinellas County Sheriff's Department
    if (/^[a-z]{1}\d{1,2}[A-Z]{0,1}$/.test(this.apparatus) === true || /^[a-z]{1}[A-Z]{1,2}\d{1,2}[A-Z]{0,1}$/.test(this.apparatus) === true) {
      return 'Pinellas County Sheriff\'s Department'
    }

    // Fire Department
    if (/^[A-Z]{1,4}\d{1,2}$/.test(this.apparatus) === true) {
      unit = this.apparatus.replace(/\d{1,2}/, '')
      unitId = this.apparatus.match(/\d+/)[0]
      switch (unit) {
        case 'ARFF':
          return 'Aircraft Rescue & Firefighting' + ' ' + unitId
        case 'B':
          return 'Brush' + ' ' + unitId
        case 'C':
          return 'Communications' + ' ' + unitId
        case 'CR':
          return 'Crash' + ' ' + unitId
        case 'D':
          return 'District Chief' + ' ' + unitId
        case 'DE':
          return 'Duke Energy'
        case 'DV':
          return 'Dive' + ' ' + unitId
        case 'E':
          return 'Engine' + ' ' + unitId
        case 'FB':
          return 'Fire Boat' + ' ' + unitId
        case 'H':
          return 'HAZMAT' + ' ' + unitId
        case 'LR':
          return 'Lieutenant of Rescue' + ' ' + unitId
        case 'M':
          return 'Marine' + ' ' + unitId
        case 'P':
          return 'Pumper' + ' ' + unitId
        case 'PD':
          return 'Municipal Police Officer'
        case 'R':
          return 'Rescue' + ' ' + unitId
        case 'S':
          return 'Squad' + ' ' + unitId
        case 'SR':
          return 'Special Rescue' + ' ' + unitId
        case 'T':
          return 'Truck' + ' ' + unitId
        case 'U':
          return 'Utility' + ' ' + unitId
      }
    }
    return 'Unknown'
    //
    //
    // // if (app = this.apparatus.replace(/[^A-z]+/, ''), isNaN(this.apparatus) === !1) return 'SUNSTAR Paramedics'
    // // if ('SS' == app) return 'SUNSTAR Paramedics - Supervisor'
    // var unit = this.apparatus.replace(/^[A-Za-z]{2}/, '').charAt(0)
    // console.log()
    // if (/^[A-Za-z]{2}/.test(this.apparatus) == true && this.apparatus.length == 5) {
    //   switch (unit) {
    //     case '1':
    //       return 'Fire Chief'
    //     case '2':
    //       return 'Asst. Fire Chief'
    //     case '3':
    //       return 'Training Officer'
    //     case '4':
    //       return 'Fire Prevention/Investigators'
    //     case '5':
    //       return 'EMS Director'
    //     case '6':
    //       return 'Operations Officer'
    //     case '7':
    //       return 'Support/Communications Officer'
    //     case '8':
    //       return 'Public Information Officer'
    //     case '9':
    //       return 'Director Fleet Maintenance'
    //     default:
    //       return 'Unknown Apparatus'
    //   }
    // } else {
    //   switch (unit) {
    //     case 'AAA':
    //       return 'American Automobile Association'
    //     case 'AM':
    //       return 'Aeromed'
    //     case 'ARFF':
    //       return 'Aircraft Rescue & Firefighting'
    //     case 'B':
    //       return 'Brush'
    //     case 'BFLT':
    //       return 'Bayflight'
    //     case 'BHN':
    //       return 'Bright House Networks'
    //     case 'BA':
    //       return 'SUNSTAR Paramedics - Bariatric'
    //     case 'C':
    //       return 'Communications'
    //     case 'CR':
    //       return 'Crash'
    //     case 'D':
    //       return 'District Chief'
    //     case 'DE':
    //       return 'Duke Energy'
    //     case 'DV':
    //       return 'Dive'
    //     case 'E':
    //       return 'Engine'
    //     case 'ECSR':
    //       return 'Eckerd College Search & Rescue'
    //     case 'ECRT':
    //       return 'Eckerd College Rescue Team'
    //     case 'FB':
    //       return 'Fire Boat'
    //     case 'FFWC':
    //       return 'Florida Fish & Wildlife Conservation'
    //     case 'H':
    //       return 'HAZMAT'
    //     case 'LR':
    //       return 'Lieutenant of Rescue'
    //     case 'M':
    //       return 'Marine'
    //     case 'P':
    //       return 'Pumper'
    //     case 'PD':
    //       return 'Municipal Police Officer'
    //     case 'R':
    //       return 'Rescue'
    //     case 'S':
    //       return 'Squad'
    //     case 'SR':
    //       return 'Special Rescue'
    //     case 'T':
    //       return 'Truck'
    //     case 'TFD':
    //       return 'Tampa Fire Department'
    //     case 'U':
    //       return 'Utility'
    //     case 'USCG':
    //       return 'United States Coast Guard'
    //     case 'WATER':
    //       return 'Water Tanker'
    //     case 'VERIZ':
    //       return 'Verizon'
    //     default:
    //       return 'Unknown Apparatus'
    //   }
    // }
  }
})
