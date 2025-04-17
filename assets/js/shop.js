document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.getElementById('shop-grid');

  const products = [
    { image: 'images/shop/test20.JPG', name: 'basic grinder e.g. 2G', price: '$5' },
    { image: 'images/shop/test23.JPG', name: 'dual color bong', price: '$20' },
    { image: 'images/shop/tes12.JPG', name: 'dual color bong and grinder', price: '$35' },
    { image: 'images/shop/test17.JPG', name: 'basic bong "enlarged" 5G', price: '$10' },
    { image: 'images/shop/test21.JPG', name: 'multi color grinder', price: '$5' },
    // Add more product entries as needed
  ];

  products.forEach(({ image, name, price }) => {
    const card = document.createElement('div');
    card.className = 'shop-card';

  card.innerHTML = `
  <img src="${image}" alt="${name}">
  <div class="card-info">
    <h3>${name}</h3>
    <p>${price}</p>
    <a href="details.html"><button>See Details</button></a>
  </div>
`;



    shopGrid.appendChild(card);
  });
});
