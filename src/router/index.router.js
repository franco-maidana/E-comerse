import CustomRouter from './customRouter.js'
import apiRouter from './api/index.api.router.js'


const api = new apiRouter()


class indexRouter extends CustomRouter {
  init(){
    this.router.use('/api', api.getRouter())
  }
}

export default indexRouter