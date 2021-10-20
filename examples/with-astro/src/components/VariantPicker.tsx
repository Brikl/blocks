import { Product } from '../types/Product'

export const VariantPicker = (props: { options: Product['options'] }) => {
  if (!props) return <></>
  const { options } = props

  return (
    <div>
      {options.map(option => {
        const { values } = option
        return (
          <div key={option.id} class="mb-2">
            <h5 class="font-bold mb-2 font-xl">{option.title}</h5>
            <div class="relative inline-block w-full text-gray-700">
              <select
                class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                placeholder="Regular input"
              >
                {values.map(value => (
                  <option value={value.id}>{value.title}</option>
                ))}
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
