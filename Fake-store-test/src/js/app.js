const navbar = document.getElementById("navbar");
const container = document.querySelector("#root");
const getProduct = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    navbar.innerHTML = `
        <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">Fake Store</a>
        </div>
        <div class="flex-none gap-2">
          <div class="form-control">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
        `;
    container.innerHTML = `
        <div class="grid grid-cols-3 gap-4">
            ${products
              ?.map((item) => {
                return `
            <div class="card card-side bg-base-100 shadow-xl">
            <img src=${item.image} class="w-[300px] h-[200px] object-cover mb-2"/>
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
  } catch (error) {
    if (error) {
      alert(error.message);
    }
  }
};
getProduct();
