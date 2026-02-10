const OrderItems = ({ order }) => {
  return (
    <div className="space-y-2 w-full max-w-[220px]">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>${order.total_price.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping:</span>
        <span>$0.00</span>
      </div>

      <div className="flex justify-between font-bold border-t pt-2">
        <span>Total:</span>
        <span>${order.total_price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderItems;
