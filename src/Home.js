/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

export default function Example() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-24 sm:px-2 sm:py-12 lg:px-4">
        <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-y-10 gap-x-6 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                We built our business on great customer service
              </h2>
              <p className="mt-4 text-gray-500">
                At the beginning at least, but then we realized we could make a lot more money if we kinda stopped
                caring about that. Our new strategy is to write a bunch of things that look really good in the
                headlines, then clarify in the small print but hope people don't actually read it.
              </p>
            </div>
            <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/incentives-07-hero.jpg"
                alt=""
                className="object-center object-cover"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}