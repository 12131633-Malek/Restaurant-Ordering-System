// Both pickup and delivery begin preparing 10 minutes after confirmation.
export function canCancelOrder(order, now) {
  return order.status !== 'cancelled' && now - order.placedAt < 10 * 60 * 1000
}
