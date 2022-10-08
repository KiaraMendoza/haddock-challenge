import { MyOrderHandler } from "./classes/OrderHandler";
import { products } from "./config/products.json";

console.log(products);

const orderHandler = new MyOrderHandler();
orderHandler.add(12, 4);
orderHandler.add(21, 2);
console.log(orderHandler); // 16.00€
const total = orderHandler.getTotal();
console.log(total); // 16.00€
