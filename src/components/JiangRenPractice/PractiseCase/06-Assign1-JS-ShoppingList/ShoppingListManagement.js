/**
 * Data and Variables:
Create a shopping list array,

Array Operations:
Add two items to the shopping list and output the updated list.
Remove the last item from the shopping list and output the result.

Conditions and Loops:
Create a function that outputs "Your shopping cart is full" in the console when the shopping list has more than 5 items.
Use a loop to iterate through the shopping list and output each item in the console with a number.

Functions and Objects:

Create a function that accepts an item name as a parameter and returns whether the item is in the shopping list.

Create a shopping item object that includes the item name, price, and quantity:
 */

// Create shopping list array
let shoppingList = ["Apple", "Milk", "Bread"];
console.log("Initial shopping list:", shoppingList);

// Add two items to the shopping list
shoppingList.push("Banana");
shoppingList.push("Chocolate");
console.log("Shopping list after adding items:", shoppingList);

// Remove the last item from the shopping list
const removedItem = shoppingList.pop();
console.log(`Removed item: ${removedItem}`);
console.log("Shopping list after removal:", shoppingList);

// Check if the shopping cart is full
function checkCartFull(cart) {
  if (cart.length > 5) {
    console.log("Your shopping cart is full");
    return true;
  }
  return false;
}

// Test the cart check function
shoppingList.push("Eggs");
shoppingList.push("Toothbrush");
shoppingList.push("Shampoo");
console.log("After adding more items:", shoppingList);
checkCartFull(shoppingList);

// Loop through the shopping list and output each item with a number
function displayShoppingList(cart) {
  console.log("Shopping List:");
  for (let i = 0; i < cart.length; i++) {
    console.log(`${i + 1}. ${cart[i]}`);
  }
}

displayShoppingList(shoppingList);

// Check if an item is in the shopping list
function isItemInCart(itemName) {
  return shoppingList.includes(itemName);
}

console.log("Is Bread in the shopping cart?", isItemInCart("Bread"));
console.log("Is Cola in the shopping cart?", isItemInCart("Cola"));

// Create shopping item object
class ShoppingItem {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

// Create shopping item instances
const apple = new ShoppingItem("Apple", 5.5, 3);
const milk = new ShoppingItem("Milk", 8.9, 2);

console.log("Shopping items:", apple);
