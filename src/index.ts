import { MyOrderHandler } from "./classes/OrderHandler";
import { OrderHandler } from "./interfaces/OrderHandler.interface";
import products from "./config/products.json";

console.log(products);

const orderHandler: typeof OrderHandler = new MyOrderHandler();
orderHandler.add(12, 4);
orderHandler.add(21, 2);
const total = orderHandler.getTotal();
console.log(total); // 16.00€
