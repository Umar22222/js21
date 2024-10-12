let limit = 7; // Bir marta yuklanadigan mahsulotlar soni
let skip = 0;  // Yuklangan mahsulotlar soni
let selectedCategory = 'all'; // Tanlangan kategoriya

// Kategoriyalarni olish va filterni to'ldirish
const loadCategories = async () => {
    const res = await fetch('https://dummyjson.com/products/categories');
    const categories = await res.json();
    
    const categorySelect = document.getElementById('category');
    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
};

// Mahsulotlarni olish
const loadProducts = async (limit, skip, category = 'all') => {
    // "Loading..." matnini ko'rsatish
    document.getElementById('loadingMessage').style.display = 'block';

    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (category !== 'all') {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    // "Loading..." matnini yashirish
    document.getElementById('loadingMessage').style.display = 'none';

    renderProducts(data.products);
};

// Mahsulotlarni ekranga chiqarish
const renderProducts = (products) => {
    const productContainer = document.getElementById('products');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        productContainer.appendChild(productElement);
    });
};

// "See More" tugmasi bosilganda mahsulotlarni yuklash
document.getElementById('seeMore').addEventListener('click', () => {
    skip += limit;
    loadProducts(limit, skip, selectedCategory);
});

// Kategoriya bo'yicha filtrlash
document.getElementById('category').addEventListener('change', (event) => {
    selectedCategory = event.target.value;
    skip = 0; // Har doim yangi kategoriya tanlanganda qayta yuklaymiz
    document.getElementById('products').innerHTML = ''; // Eski mahsulotlarni tozalash
    loadProducts(limit, skip, selectedCategory);
});

// Sahifa yuklanganda mahsulotlarni yuklaymiz va kategoriyalarni yuklaymiz
window.onload = () => {
    loadCategories();
    loadProducts(limit, skip);
};
