import {useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";
import {X} from "lucide-react";

export default function Modal({ref, children, title, maxWidthClass="sm:max-w-lg", hideFooter = false}) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            },
        };
    });

    return createPortal(
        <dialog
            ref={dialog}
            className={`
                backdrop:bg-black/50 backdrop:backdrop-blur-sm
                w-full p-0 border-none shadow-2xl outline-none
                /* Fix: Tambahkan mx-auto agar simetris di tengah */
                mx-auto
                /* Mobile: Menempel di bawah */
                mt-auto mb-0 rounded-t-3xl
                /* PC: Tengah layar & lebar maksimal */
                sm:my-auto sm:rounded-3xl ${maxWidthClass}
                animate-slide-up sm:animate-fade-in
                `}
            onClick={(e) => {
                // Menutup modal jika klik di area backdrop
                if (e.target === dialog.current) dialog.current.close();
            }}
        >
            <div
                className="bg-white p-6 flex flex-col max-h-[85vh] sm:max-h-[80vh]">                {/* Header Modal */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={() => dialog.current.close()}
                        className="p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition"
                    >
                        <X size={20}/>
                    </button>
                </div>

                {/* Konten (Children) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>

                {/* Action Button (Form Method Dialog) */}
                <form method="dialog" className="mt-6" aria-disabled={hideFooter}>
                    <button
                        className={`w-full py-3 bg-gray-50 text-gray-500 rounded-xl font-bold active:bg-gray-100 transition ${hideFooter ? 'opacity-0' : ''}`}>
                        Kembali
                    </button>
                </form>
            </div>
        </dialog>,
        document.getElementById("modal"),
    );
}