document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.getElementById('shop-grid');

  const products = [
    { image: 'shop/test20.JPG', name: 'basic grinder e.g. 2G', price: '$5' },
    { image: 'shop/test23.JPG', name: 'dual color bong', price: '$20' },
    { image: 'shop/tes12.JPG', name: 'mixed colors bong and grinder', price: '$35' },
    { image: 'shop/test17.JPG', name: 'multi color grinder "enlarged" 5G', price: '$10' },
    { image: 'shop/test21.JPG', name: 'multi color grinder', price: '$5' },
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
    <button class="add-to-cart" data-name="${name}" data-price="${price}">Add to Cart</button>
  </div>
`;




    shopGrid.appendChild(card);
  });
});
