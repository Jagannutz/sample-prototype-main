fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('products');
    data.forEach(p => {
      const div = document.createElement('div');
      div.textContent = `${p.name} - $${p.price}`;
      container.appendChild(div);
    });
  });