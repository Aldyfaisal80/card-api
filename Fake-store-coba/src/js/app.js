const navbar = document.getElementById("navbar");
const container = document.querySelector("#root");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortNameBtn = document.getElementById("sortName");
const sortPriceBtn = document.getElementById("sortPrice");
const sortRatingBtn = document.getElementById("sortRating");
const resetBtn = document.getElementById("resetBtn");

let productsData; // Original data to reset

const getProduct = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        productsData = await response.json();
        applyFilters();
    } catch (error) {
        if (error) {
            alert(error.message);
        }
    }
};

const applyFilters = () => {
    let filteredProducts = [...productsData];

    const updateProducts = () => {
        // Sorting
        const sortByName = () => {
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        };

        const sortByPrice = () => {
            filteredProducts.sort((a, b) => a.price - b.price);
        };

        const sortByRating = () => {
            filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        };

        sortNameBtn.addEventListener("click", () => {
            sortByName();
            renderProducts(filteredProducts);
        });

        sortPriceBtn.addEventListener("click", () => {
            sortByPrice();
            renderProducts(filteredProducts);
        });

        sortRatingBtn.addEventListener("click", () => {
            sortByRating();
            renderProducts(filteredProducts);
        });

        renderProducts(filteredProducts);
    };

    const performSearch = () => {
        // Search
        const searchTerm = searchInput.value.toLowerCase();
        filteredProducts = productsData.filter(
            (item) => item.title.toLowerCase().includes(searchTerm)
        );

        updateProducts();
    };

    // Handle search on button click
    searchBtn.addEventListener("click", performSearch);

    // Handle search on Enter key press
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    updateProducts();

    // Reset
    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        filteredProducts = [...productsData];
        updateProducts();
    });
};

const renderProducts = (products) => {
    container.innerHTML = `
        <div class="container mx-auto grid grid-cols-3 gap-[50px] mt-[50px]">
            ${products
                .map((item) => {
                    return `
                <div class="card w-96 bg-base-100 shadow-xl">
                    <figure>
                    <img src=${item.image} class="h-[200px]"> 
                    </figure>
                    <div class="card-body">
                    <h2 class="card-title">${item.title}</h2>
                    <p>${item.description}</p>
                    <span>Rating: ${item.rating.rate} / 5</span>
                    <span>(${item.rating.count} reviews)</span>
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

getProduct();
