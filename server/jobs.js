var Jobs = JobCollection('JobQueue')

Jobs.allow({
  admin: function (userId, method, params) {
    if (userId === 'nodeWorker') {
      return true
    } else {
      return false
    }
  }
})

Meteor.publish('allJobs', function () {
  return Jobs.find({})
})

Jobs.startJobServer()
