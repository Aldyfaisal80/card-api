let products = []; // Global variable to store the products

const navbar = document.getElementById("navbar");
const container = document.querySelector("#root");
const getProduct = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json(); // Store the products in the global variable
    renderNavbar();
    renderProducts(products);
  } catch (error) {
    if (error) {
      alert(error.message);
    }
  }
};



const renderNavbar = () => {
  navbar.innerHTML = `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Fake Store</a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" oninput="searchProduct(event)" />
        </div>
        <!-- The rest of your navbar code... -->
      </div>
    </div>
  `;
};

const renderProducts = (productsToRender) => {
  container.innerHTML = `
    <div class="grid grid-cols-3 gap-4">
      ${productsToRender
        ?.map((item) => {
          return `
            <div class="card card-side bg-base-100 shadow-xl">
            <figure>
            <img src=${item.image} class="w-[300px] h-[200px] object-cover mb-2"/>
            </figure>  
              <div class="card-body">
                <h2 class="card-title">${item.title}</h2>
                <p>${item.description}</p>
                <div class="card-actions justify-between flex items-center">
                  <span>$${item.price}</span>
                  <button class="btn btn-primary">Buy</button>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>`;
};

const searchProduct = (event) => {
  const searchTerm = event.target.value;
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderProducts(filteredProducts);
};

getProduct();
