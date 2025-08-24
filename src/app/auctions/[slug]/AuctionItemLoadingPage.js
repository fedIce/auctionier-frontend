// pages/auctions/bang-olufsen-beolab-90-active-speaker-set/loading.jsx

export default function AuctionItemLoadingPage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="bg-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="h-10 w-40 bg-foreground-800 rounded animate-pulse"></div>
          <div className="flex space-x-4">
            <div className="h-10 w-24 bg-foreground-800 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-foreground-800 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-foreground-800 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-foreground-800 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Auction Details */}
          <div className="space-y-6">
            <div className="h-8 bg-foreground-800 rounded animate-pulse w-3/4"></div>
            <div className="h-6 bg-foreground-800 rounded animate-pulse w-1/2"></div>
            
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-4/5"></div>
            
            <div className="border-t border-foreground/10 pt-4 mt-4">
              <div className="h-6 bg-foreground-800 rounded animate-pulse w-1/3"></div>
              <div className="h-10 bg-foreground-800 rounded animate-pulse mt-2 w-1/2"></div>
            </div>
            
            <div className="border-t border-foreground/10 pt-4">
              <div className="h-6 bg-foreground-800 rounded animate-pulse w-1/4"></div>
              <div className="h-4 bg-foreground-800 rounded animate-pulse mt-2 w-1/3"></div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <div className="h-12 bg-foreground-800 rounded animate-pulse flex-1"></div>
              <div className="h-12 bg-foreground-800 rounded animate-pulse flex-1"></div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12">
          <div className="h-6 bg-foreground-800 rounded animate-pulse w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-4/5"></div>
            <div className="h-4 bg-foreground-800 rounded animate-pulse w-full"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-foreground/10 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="h-6 bg-foreground-800 rounded animate-pulse w-1/4 mx-auto"></div>
          <div className="flex justify-center space-x-6 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-6 bg-foreground-800 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}