import { products } from "../config/products.json";
import { OrderHandler } from "./OrderHandler";
const prompt = require("prompt-sync")({ sigint: true });

export class Main {
  orderHandler: OrderHandler;
  constructor() {
    this.orderHandler = new OrderHandler();
  }

  showActiveProducts = () => {
    console.log(products);
  };

  showProductsOnCart = () => {
    this.orderHandler.getProductsOnCart();
  };

  exampleCart = () => {
    /* Example order: */
    this.orderHandler.add(12, 4);
    this.orderHandler.add(21, 2);

    const total = this.orderHandler.getTotal();
    console.log("This is the example total:", total); // 16.00€
  };

  handleBuyItems = (buying: boolean) => {
    const itemId = parseInt(prompt("What is the item id? "));
    const itemQuantity = parseInt(prompt("How many products do you want? "));

    if (!products.map((product) => product.number).includes(itemId)) {
      console.log(
        "The id is not valid, please check if you have typed it correctly"
      );
      this.handleBuyItems(buying);
      return;
    }

    this.orderHandler.add(itemId, itemQuantity);
    console.log("Product added!");

    const showCart = prompt("Do you want to check your cart? ");

    if (showCart && ["Yes", "yes"].includes(showCart)) {
      console.log(this.orderHandler.getProductsOnCart());
    }
    const finish = prompt("Have you finished your purchase? ");
    if (finish && ["Yes", "yes"].includes(finish)) {
      buying = false;
      const hasProductsOnCart = this.orderHandler.getProductsOnCart().length;

      if (hasProductsOnCart) {
        console.log("This is your receipt: ", this.orderHandler.getTotal());
      }
      return;
    } else {
      this.handleBuyItems(buying);
    }
  };

  showMenu = () => {
    console.log("Hello! What are you searching for today? ");
    const showProducts = prompt(
      "Do you want to see the active products on store? ",
      "No"
    );

    if (showProducts && ["Yes", "yes"].includes(showProducts))
      this.showActiveProducts();

    const useExampleOrder = prompt("Do you want to use the example order? ");

    if (useExampleOrder && ["Yes", "yes"].includes(useExampleOrder)) {
      this.exampleCart();
      return;
    }

    const buyProducts = prompt("Do you want to buy some products? ");
    let buying = buyProducts && ["Yes", "yes"].includes(buyProducts);
    this.handleBuyItems(buying);

    console.log("Have a nice day!");
  };
}
