const container = document.querySelector("#root")
const getProduct = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products")
        const products = await response.json()
        container.innerHTML = `
        <div class="grid grid-cols-3 gap-4">
            ${products?.map(item => {
                return `
                <div class="bg-gray-300 border-2 border-black m-4 p-4 flex flex-col items-center justify-between">
                    <h3 class="title text-lg font-bold mb-2">${item.title}</h3>
                    <img src=${item.image} class="w-[300px] h-[200px] object-cover mb-2 mix-blend-color-burn"/>
                    <span class="text-sm text-gray-700 mb-2">${item.description}</span>
                    <span class="text-lg font-semibold">$${item.price}</span>
                </div>
                `
            }).join("")}
        </div>`
    } catch (error) {
        if (error) {
            alert(error.message)
        }
    }
}
getProduct()
