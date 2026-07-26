export default function OrdersPage({ orders }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-[#1f1f1f] mb-2">
          Your Orders
        </h1>
        <p className="text-[#666] mb-12">Track everything you’ve ordered from Ember House</p>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-[#888]">
            <p className="text-xl mb-2">No orders yet</p>
            <p>Your delicious history will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-[#888]">Order #{order.id}</p>
                    <p className="text-sm text-[#888]">{order.date}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}× {item.name}
                      </span>
                      <span className="text-[#555]">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/5 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}