## Haddock Code Challenge

On top of helping restaurants manage their back of the house costs, we want to create a new product that allows them to handle takeaway and delivery orders. For our beta testing, we are working with a chinese restaurant, which for the moment offers only these products through our product:

| Number | Name                      | Price |
| ------ | ------------------------- | ----: |
| 12     | Spring rolls              | 4.50€ |
| 21     | Fried rice with pork      | 6.00€ |
| 37     | Chicken with almond sauce | 6.50€ |

A core part of theses solutions is offering discounts on food items to incentivize orders. There are several types of discounts currently active:

- 2-for-1 promotions (buy two of the same product, the second one is free). Currently applied on the spring rolls item (`12`).
- Spend X to save Y promotions (reach a certain amount on an order and you get a discount). Currently applied to orders over 20€, which get a 5€ discount.


An example interface for an implementation in Typescript would be:

```tsx
interface OrderHandler {
  add: (number: number, quantity: number) => void;
  getTotal: () => number;
}
```

Example of usage:

```tsx
const orderHandler: OrderHandler = new MyOrderHandler();
orderHandler.add(12, 4);
orderHandler.add(21, 2);
const total = orderHandler.getTotal();
console.log(total); // 16.00€
```

When we are ready to expand, it should be very easy to add new products and configure discounts, so we need to make it all configurable using a json file.

**Notes about the solution**

You can use any programming language and style you want, we recommend you to use the one you feel more comfortable with. Make sure to include instructions of how to run it and clarify any part of the solution you consider is not obvious.

As long as the functionality is preserved you can modify the suggested interface to suit your design/style/programming language of choice.

The code should be written as if it would be part of a bigger piece of code which is already running in production, so we don't need it to be a full fledge standalone service, but it should pass a code review.

In our code reviews there are 3 things we check first:

- Does it work according to the specs?
- Is it properly tested?
- Is the solution self-describing/easy to understand/well documented?

Asking questions to understand the problem is always better than implementing the right solution for the wrong problem.
