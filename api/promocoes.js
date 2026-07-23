const axios = require('axios');
const cheerio = require('cheerio');

const MARKETS = [
  {
    name: 'Carrefour',
    url: 'https://www.carrefour.com.br/ofertas',
    itemSelector: '.vtex-product-summary-2-x-container',
    titleSelector: '.vtex-product-summary-2-x-productNameContainer',
    priceSelector: '.vtex-product-price-1-x-sellingPriceValue',
    imageSelector: 'img.vtex-product-summary-2-x-imageNormal',
  },
  {
    name: 'Pão de Açúcar',
    url: 'https://www.paodeacucar.com/secao/ofertas',
    itemSelector: '[data-testid="product-card"]',
    titleSelector: '[data-testid="product-title"]',
    priceSelector: '[data-testid="product-price"]',
    imageSelector: 'img',
  },
  {
    name: 'Atacadão',
    url: 'https://www.atacadao.com.br/ofertas',
    itemSelector: '.product-item',
    titleSelector: '.product-name',
    priceSelector: '.price-best',
    imageSelector: '.product-image img',
  },
  {
    name: 'Extra',
    url: 'https://www.extra.com.br/ofertas',
    itemSelector: '[data-testid="product-card"]',
    titleSelector: '[data-testid="product-title"]',
    priceSelector: '[data-testid="product-price"]',
    imageSelector: 'img',
  },
  {
    name: 'Supermercados Dia',
    url: 'https://www.dia.com.br/ofertas',
    itemSelector: '.vtex-product-summary-2-x-container',
    titleSelector: '.vtex-product-summary-2-x-productNameContainer',
    priceSelector: '.vtex-product-price-1-x-sellingPriceValue',
    imageSelector: 'img.vtex-product-summary-2-x-imageNormal',
  },
  {
    name: 'Assaí Atacadista',
    url: 'https://www.assai.com.br/ofertas',
    itemSelector: '.views-row',
    titleSelector: '.title-oferta',
    priceSelector: '.price-oferta',
    imageSelector: '.img-oferta img',
  },
  {
    name: 'Tenda Atacado',
    url: 'https://www.tendaatacado.com.br/ofertas',
    itemSelector: '.product-card',
    titleSelector: '.product-title',
    priceSelector: '.price',
    imageSelector: 'img.product-image',
  },
  {
    name: 'Sonda Supermercados',
    url: 'https://www.sonda.com.br/ofertas',
    itemSelector: '.vtex-product-summary-2-x-container',
    titleSelector: '.vtex-product-summary-2-x-productNameContainer',
    priceSelector: '.vtex-product-price-1-x-sellingPriceValue',
    imageSelector: 'img.vtex-product-summary-2-x-imageNormal',
  },
  {
    name: 'Super Muffato',
    url: 'https://www.supermuffato.com.br/ofertas',
    itemSelector: '.product-item',
    titleSelector: '.product-name',
    priceSelector: '.best-price',
    imageSelector: '.product-image img',
  },
  {
    name: 'Prezunic',
    url: 'https://www.prezunic.com.br/ofertas',
    itemSelector: '[data-testid="product-card"]',
    titleSelector: '[data-testid="product-title"]',
    priceSelector: '[data-testid="product-price"]',
    imageSelector: 'img',
  },
];

async function scrapeMarket(market) {
  try {
    const response = await axios.get(market.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
      timeout: 8000,
    });

    const $ = cheerio.load(response.data);
    const products = [];

    $(market.itemSelector).each((i, el) => {
      if (i >= 5) return;

      const title = $(el).find(market.titleSelector).text().trim();
      const price = $(el).find(market.priceSelector).text().trim();
      const imageUrl = $(el).find(market.imageSelector).attr('src');

      if (title && price) {
        products.push({
          id: 'promo-' + market.name.replace(/\s/g, '') + '-' + i,
          title: title,
          price: price.startsWith('R$') ? price : 'R$ ' + price,
          store: market.name,
          category: 'Oferta',
          imageUrl: imageUrl && imageUrl.startsWith('http') ? imageUrl : undefined,
        });
      }
    });

    return products;
  } catch (err) {
    console.log('Falha ao raspar ' + market.name + ': ' + err.message);
    return [];
  }
}

module.exports = async function handler(req, res) {
  // CORS - permite o app acessar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=300'); // Cache 5 min na CDN da Vercel

  try {
    // Raspa todos os mercados em paralelo
    const results = await Promise.allSettled(
      MARKETS.map((m) => scrapeMarket(m))
    );

    let allPromotions = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allPromotions = allPromotions.concat(result.value);
      }
    });

    // Embaralha
    allPromotions.sort(() => Math.random() - 0.5);

    res.status(200).json({
      success: true,
      count: allPromotions.length,
      scraped_at: new Date().toISOString(),
      promotions: allPromotions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      promotions: [],
    });
  }
};
