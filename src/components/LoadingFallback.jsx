export default function LoadingFallback() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-7">
            {/* Bouncing dots */}
            <div className="flex gap-2.5">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-gray-400 opacity-30"
                        style={{
                            animation: "pulse 1.4s ease-in-out infinite",
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Sliding bar */}
            <div className="w-40 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full w-2/5 bg-gray-400 rounded-full"
                    style={{ animation: "slide 1.6s ease-in-out infinite" }}
                />
            </div>

            {/* Label */}
            <span
                className="text-xs font-light tracking-widest uppercase text-gray-400"
                style={{ animation: "fade 2s ease-in-out infinite" }}
            >
        Loading
      </span>

            <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(1); opacity: 0.3; }
          40% { transform: scale(1.5); opacity: 1; }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(300%); }
          100% { transform: translateX(300%); }
        }
        @keyframes fade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
        </div>
    );
}