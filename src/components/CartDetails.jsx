import {Trash2} from "lucide-react";
import {useCart} from "../context/CartContext";

export default function CartDetails({totalHarga}) {
    const {cart, addToCart, removeFromCart} = useCart();

    return (
        <div className="space-y-4">
            {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                        <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt={item.name}/>
                        <div>
                            <p className="font-bold text-sm text-gray-800">{item.name}</p>
                            <p className="text-xs text-orange-600 font-semibold">
                                Rp {item.price.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-lg">
                        <button
                            onClick={() => removeFromCart(item)}
                            className="text-orange-600 active:scale-90"
                        >
                            {item.quantity === 1 ? <Trash2 size={16} className="text-red-500"/> : "-"}
                        </button>
                        <span className="text-sm font-bold text-gray-700">{item.qty}</span>
                        <button
                            onClick={() => addToCart(item)}
                            className="text-orange-600 font-bold active:scale-90"
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}

            <div className="pt-4 flex justify-between items-center">
                <span className="font-medium text-gray-500">Total Bayar:</span>
                <span className="text-lg font-black text-orange-600">
          Rp {totalHarga.toLocaleString()}
        </span>
            </div>

            <button
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold mt-2 active:bg-black transition-colors">
                Pesan Sekarang
            </button>
        </div>
    );
}