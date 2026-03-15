import {useRef} from "react";
import {ShoppingCart} from "lucide-react";
import {useCart} from "../context/CartContext";
import Modal from "./UI/Modal";
import CartDetails from "./CartDetails.jsx";

export default function CartSheet({totalHarga, totalItem}) {
    const {cart} = useCart();
    const dialog = useRef();

    if (cart.length === 0) return null;

    return (
        <>
            <div
                className="fixed bottom-6 left-4 right-4 bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center z-40">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <ShoppingCart size={24} className="text-orange-400"/>
                        <span
                            className="absolute -top-2 -right-2 bg-white text-gray-900 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItem}
            </span>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400">Total Pesanan</p>
                        <p className="font-bold text-sm text-orange-400">
                            Rp {totalHarga.toLocaleString()}
                        </p>
                    </div>
                </div>

                <button
                    className="bg-orange-500 px-6 py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform"
                    onClick={() => dialog.current.open()}
                >
                    Cek Keranjang
                </button>
            </div>

            {/* MODAL BERADA DI SINI (DENGAN ISI CUSTOM) */}
            <Modal ref={dialog} title="Detail Pesanan">
                <CartDetails totalHarga={totalHarga}/>
            </Modal>
        </>
    );
}