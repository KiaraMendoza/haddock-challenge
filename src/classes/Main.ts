import { products } from "../config/products.json";
import { OrderHandler } from "./OrderHandler";
const prompt = require("prompt-sync")({ sigint: true });

const affirmativeResponses = ["Yes", "yes", "Y", "y"];

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
    const itemId = parseInt(prompt("What is the item's id? "));
    const itemQuantity = parseInt(prompt("How many products do you want? "));

    if (!products.map((product) => product.id).includes(itemId)) {
      console.log(
        "The id is not valid, please check if you have typed it correctly"
      );
      this.handleBuyItems(buying);
      return;
    }

    this.orderHandler.add(itemId, itemQuantity);
    console.log("Product added!");

    const showCart = prompt("Do you want to check your cart? (yes/no) ");

    if (showCart && affirmativeResponses.includes(showCart)) {
      console.log(this.orderHandler.getProductsOnCart());
    }
    const finish = prompt("Have you finished your purchase? (yes/no) ");
    if (finish && affirmativeResponses.includes(finish)) {
      buying = false;
      const hasProductsOnCart = this.orderHandler.getProductsOnCart().length;

      if (hasProductsOnCart) {
        console.log(
          "This is your receipt: ",
          this.orderHandler.getTotal(),
          "€"
        );
      }
      return;
    } else {
      this.handleBuyItems(buying);
    }
  };

  showMenu = () => {
    console.log("Hello! What are you looking for today? ");
    const showProducts = prompt(
      "Do you want to see the active products on store? (yes/no) ",
      "No"
    );

    if (showProducts && affirmativeResponses.includes(showProducts))
      this.showActiveProducts();

    const useExampleOrder = prompt(
      "Do you want to use the example order? (yes/no) "
    );

    if (useExampleOrder && affirmativeResponses.includes(useExampleOrder)) {
      this.exampleCart();
      return;
    }

    const buyProducts = prompt("Do you want to buy some products? (yes/no) ");
    let buying = buyProducts && affirmativeResponses.includes(buyProducts);
    buying && this.handleBuyItems(buying);

    console.log("Have a nice day!");
  };
}
