// This file handles adding medicines to the pharmacy cart and calculating totals (prices & taxes).

export function updateCart(cart, medicineItem, quantity) {
  // 1. Check if the medicine is already in the cart
  const existingItemIndex = cart.findIndex(item => item.id === medicineItem.id);

  if (existingItemIndex >= 0) {
    // 2a. If it exists, just increase/decrease the quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // 2b. If it's a new item, add the entire item to the cart
    cart.push({
      ...medicineItem,
      quantity: quantity
    });
  }

  // 3. Calculate new total prices
  return calculateCartTotals(cart);
}

function calculateCartTotals(cart) {
  let subtotal = 0;
  
  // Loop through all items and multiply price by quantity
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  // Calculate 18% GST (Tax)
  const tax = subtotal * 0.18; 
  const total = subtotal + tax;

  return {
    cartItems: cart,
    subtotal: Math.round(subtotal),
    tax: Math.round(tax),
    finalTotal: Math.round(total)
  };
}
