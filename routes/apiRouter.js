var express =  require ('express');
var apiController = require ('./../controllers/apiController');
var apiRouter = express.Router();

apiRouter.route('/history')
  .get(apiController.get)
  .post(apiController.add);

apiRouter.route('/history/:id')
  .get(apiController.getById);

/*
apiRouter.route('/:id')
  .post()
  .delete()
  .put();
*/
module.exports = apiRouter;
