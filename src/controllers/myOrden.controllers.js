// myOrden.controllers.js
import myOrder from "../services/myOrder.service.js";

class MyOrdenControllers {
  constructor() {
    this.myOrderInstance = new myOrder(); // Renombrado para evitar confusión
  }

  orden = async (req, res, next) => {
    try {
      await this.myOrderInstance.myOrder(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
  
}

const myOrden = new MyOrdenControllers();
export const { orden } = myOrden;
