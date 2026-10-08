
let Skeleton  = () => {
 return (
    <div className="h-screen bg-[#0d0f14] text-white p-6 animate-pulse">
      
      {/* Navbar */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-white/10 rounded-md"></div>
        <div className="h-10 w-10 bg-white/10 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="mt-10 space-y-5">
        <div className="h-8 w-64 bg-white/10 rounded-md"></div>

        <div className="h-4 w-96 bg-white/10 rounded-md"></div>

        <div className="h-32 w-full bg-white/10 rounded-xl"></div>

        <div className="h-32 w-full bg-white/10 rounded-xl"></div>
      </div>

    </div>
  )
}

export default Skeleton


