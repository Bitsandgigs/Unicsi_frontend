import { Edit, Palette, Megaphone, Users, User, Diamond } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Custom Packaging",
    description: "UNICSI help source from cooperated factories in China and assign to you for selling.",
    icon: Edit,
    variant: "primary" 
  },
  {
    id: 2,
    title: "Custom Packaging",
    description:
      "Custom Packaging for Dropshipping is turn one-time buyers into loyal customers with packaging that speaks volumes.",
    icon: Palette,
    variant: "secondary" 
  },
  {
    id: 3,
    title: "3PL Fulfillment",
    description:
      "Enjoy hassle-free order processing and lightning-fast global shipping for your own products stocked in UNICSI's warehouse.",
    icon: Megaphone,
    variant: "secondary" 
  },
  {
    id: 4,
    title: "ODM Power",
    description: "Collaborate with UNICSI's top manufacturers to develop your exclusive, high-quality products",
    icon: Users,
    variant: "secondary"
  },
  {
    id: 5,
    title: "Print on Demand",
    description: "Bring your creative visions to life with custom-printed merchandise.",
    icon: User,
    variant: "secondary" 
  },
  {
    id: 6,
    title: "Bulk Purchase",
    description: "Save on bulk orders with wholesale pricing, flexible terms, and fast global delivery.",
    icon: Diamond,
    variant: "secondary" 
  }
]

const Services = () => {
  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
            UNICSI Supports You in Every Step of Growth
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className={`
                  rounded-2xl p-8 transition-all duration-300 hover:scale-105
                  ${
                    service.variant === "primary"
                      ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }
                `}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    ${service.variant === "primary" ? "bg-white/20" : "bg-yellow-200"}
                  `}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${service.variant === "primary" ? "text-white" : "text-gray-800"}`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p
                    className={`
                    text-sm leading-relaxed
                    ${service.variant === "primary" ? "text-white/90" : "text-gray-600"}
                  `}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services;
