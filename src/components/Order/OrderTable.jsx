const OrderTable = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead className="bg-base-200">
          <tr>
            <th>Product</th>
            <th className="text-right">Price</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td className="text-right">${item.price}</td>
              <td className="text-right">{item.quantity}</td>
              <td className="text-right font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
