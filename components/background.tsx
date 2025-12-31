export default function Background() {
    return (
        <>
            <div className="pointer-events-none fixed inset-0 -z-10">
       
                {/* tiny dotted stars */}
                <div className="absolute inset-0 bg-dot-grid opacity-40" />

                {/* purple/indigo glows like your screenshot */}    
                <div className="absolute left-[12%] top-[18%] h-[36rem] w-[36rem] rounded-full bg-[#6d28d9]/26 blur-3xl animate-float" />
                <div className="absolute right-[18%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-[#3b82f6]/22 blur-3xl animate-float" />
                <div className="absolute left-[46%] top-[46%] h-[22rem] w-[22rem] rounded-full bg-[#4c1d95]/22 blur-3xl animate-float" />

                {/* bottom fade so foreground cards pop */}

                {/* edge vignette, keeps center bright like the photo */}
                <div className="absolute inset-0 mask-vignette" />
            </div>
        </>
    );
}