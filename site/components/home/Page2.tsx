function Page2() {
  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800">
            Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Cresc</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">Integrate enterprise-grade push capabilities into your app in just three steps</p>
        </div>

        {/* Terminal Window Simulation */}
        <div className="bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden mb-12 text-left text-sm sm:text-base font-mono text-slate-300 transform hover:scale-[1.02] transition-transform duration-500 border border-slate-700/50">
          {/* Terminal Header */}
          <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="ml-4 text-xs font-sans text-slate-400 font-medium tracking-wider">bash - cresc-cli</span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-slate-500 block mb-1"># 1. Install CLI globally</span>
              <span className="text-emerald-400 mr-2">$</span>
              <span className="text-slate-100">npm i -g react-native-update-cli</span>
            </div>
            
            <div className="pt-2">
              <span className="text-slate-500 block mb-1"># 2. Upload the base native package (only once)</span>
              <span className="text-emerald-400 mr-2">$</span>
              <span className="text-slate-100">cresc uploadIpa yourApp.ipa</span><br/>
              <span className="text-emerald-400 mr-2">$</span>
              <span className="text-slate-100">cresc uploadApk yourApp.apk</span>
            </div>

            <div className="pt-2">
              <span className="text-slate-500 block mb-1"># 3. Bundle and upload the hot update package</span>
              <span className="text-emerald-400 mr-2">$</span>
              <span className="text-slate-100">cresc bundle --platform android</span><br/>
              <span className="text-emerald-400 mr-2">$</span>
              <span className="text-slate-100">cresc bundle --platform ios</span>
            </div>

            <div className="pt-2 flex items-center">
              <span className="text-emerald-400 mr-2">$</span>
              <div className="w-2 h-5 bg-slate-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        <a 
          href="/docs/getting-started" 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-slate-900 rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-indigo-500/30 hover:-translate-y-1"
        >
          View Integration Docs
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>
    </div>
  );
}

export default Page2;
