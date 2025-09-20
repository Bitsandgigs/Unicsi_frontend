import { GraduationCap, TrendingUp, FolderOpen, Tag } from "lucide-react"

const Integrations = () => {
  const steps = [
    {
      icon: GraduationCap,
      title: "Learn",
      description: "Get Expert Guidance To Launch Your Business",
    },
    {
      icon: TrendingUp,
      title: "Research",
      description: "Find Trending And High-Growth Products",
    },
    {
      icon: FolderOpen,
      title: "Source",
      description: "Get Your Products From UNICSI",
    },
    {
      icon: Tag,
      title: "Sell",
      description: "Make Money And Your Customers Happy",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Time to take the cap off
            <br />
            <span className="relative">
              your income
              <svg
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-3"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path d="M2 10C50 2 150 2 198 10" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white border-2 border-yellow-400 rounded-2xl p-6 h-full flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-amber-800 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Integrations;
