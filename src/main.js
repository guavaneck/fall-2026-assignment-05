import products from './data/products.json';

const productsPerPage = 5;
let currentPage = 1;
const productGrid = document.querySelector('#product-grid');
const previousButton = document.querySelector('#previous-page');
const nextButton = document.querySelector('#next-page');
const pageIndicator = document.querySelector('#page-indicator');

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';
  const image = document.createElement('img');
  image.className = 'product-image';
  Object.assign(image, {
    src: product.imageUrl,
    alt: product.name,
    width: 640,
    height: 480,
    loading: 'lazy',
  });
  const content = document.createElement('div');
  content.className = 'product-content';
  const category = document.createElement('p');
  category.className = 'product-category';
  category.textContent = product.category;
  const headingRow = document.createElement('div');
  headingRow.className = 'product-heading';
  const title = document.createElement('h3');
  title.textContent = product.name;
  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);
  headingRow.append(title, price);
  const description = document.createElement('p');
  description.className = 'product-description';
  description.textContent = product.description;
  content.append(category, headingRow, description);
  article.append(image, content);
  return article;
}

function renderProducts() {
  if (!productGrid) return;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const fragment = document.createDocumentFragment();
  products
    .slice(start, start + productsPerPage)
    .forEach((product) => fragment.append(createProductCard(product)));
  productGrid.replaceChildren(fragment);
  productGrid.setAttribute('aria-busy', 'false');
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
}

if (productGrid) {
  previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderProducts();
      productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage += 1;
      renderProducts();
      productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  renderProducts();
}
