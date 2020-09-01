const routes = require('next-routes')();

routes
  .add('/vows/new', '/vows/new')
  .add('/vows/:address', '/vows/show')
  .add('/admin/:address', '/admin/blockdtl')
  .add('/info/:address', '/info/cert')
  .add('/admin/transaction/:address', '/admin/transaction')
  .add('/badges/issueBadge', '/badges/issueBadge')
  module.exports = routes;