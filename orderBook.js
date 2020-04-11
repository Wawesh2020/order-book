const isMatching = (existingOrder, incomingOrder) => incomingOrder.type === 'buy'
  ? incomingOrder.price >= existingOrder.price
  : incomingOrder.price <= existingOrder.price

const isMatchingType = (existingOrder, incomingOrder) =>
  existingOrder.type !== incomingOrder.type && isMatching(existingOrder, incomingOrder)


const isFulfill = (matchingOrder, incomingOrder) => matchingOrder.quantity <= incomingOrder.quantity
  ? { ...incomingOrder, quantity: incomingOrder.quantity - matchingOrder.quantity }
  : { ...matchingOrder, quantity: matchingOrder.quantity - incomingOrder.quantity }

const reconcileOrder = (existingOrder, incomingOrder) =>
{
  let updateBook = []

  while (existingOrder.length && incomingOrder.quantity > 0)
  {
    const bookOrder = existingOrder.shift() 

    if (isMatchingType(bookOrder, incomingOrder) && incomingOrder.quantity > 0)
    {
      incomingOrder = isFulfill(bookOrder, incomingOrder)
      console.log(incomingOrder)
    } else
    {

      updateBook.push(bookOrder)
    }
  }

  updateBook = updateBook.concat(existingOrder)

  if (incomingOrder.quantity > 0)
  {
    updateBook.push(incomingOrder)
  }

  return updateBook
}
module.exports = reconcileOrder
