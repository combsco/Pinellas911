/*global FlowRouter BlazeLayout*/

FlowRouter.route('/', {
  name: 'main',
  action: function (params, queryParams) {
    BlazeLayout.render('layout', {
      content: 'home'
    })
  }
})

FlowRouter.route('/index.html', {
  name: 'main',
  action: function (params, queryParams) {
    BlazeLayout.render('layout', {
      content: 'home'
    })
  }
})

FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('layout', {
      content: 'notFound'
    })
  }
}
