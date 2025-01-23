const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: []
}

/* 
  Implement a cart feature:
  1. Add items to cart.
  2. Add 3% tax to item in cart
  3. Buy item: cart >> purchases
  4. Empty cart
*/

function addItem(item) {
  return this.cart.push(item);
}

function addTaxes() {
  return this.cart.map(item => {
      return {...item, value: item.value * (1.03)}
  })
}

function buyItem(itemName) {
  let idx = this.cart.findIndex(cartItem => cartItem.name == itemName);
  
  if(idx >= 0) {
    this.cart = addTaxes.call(this);
    item = this.cart[idx];
    this.cart.splice(idx,1);
    this.purchases.push(item);
  }

  return this;
}

function emptyCart() {
  this.cart = []
}

/* Bonus
  accept refunds.
  track user history
 */




// --------------------------------------

purchaseItem(
  emptyCart,
  buyItem,
  applyTaxtToItems,
  addItemToCart
)(user, {name: 'Apple', value: 500})

let amazonHistory = [];
const compose = (f,g) => (...args) => f(g(...args))

function purchaseItem(...fns) {
  return fns.reduce(compose)
}

function addItemToCart(user, item) {
  amazonHistory.push(user);
  const updatedCart = user.cart.concat(item);
  return {...user, cart: updatedCart}
}

function applyTaxtToItems(user) {
  amazonHistory.push(user);
  const {cart} = user;
  const tax = 1.3;
  const updatedCart = cart.map(item => {
    return {...item, value: item.value * tax}
  })

  return {...user, cart: updatedCart}
}

function buyItem(user) {
  amazonHistory.push(user);
  return {...user, purchases: user.cart}
}

function emptyCart(user) {
  amazonHistory.push(user);
  return {...user, cart: []}
}
