export interface Promotion {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  store: string;
  category: string;
  imageUrl?: string;
  link?: string;
}

// =============================================================
// CONFIGURAÇÃO: Troque esta URL após fazer o deploy na Vercel
// =============================================================
// 1. Rode: npx vercel (na pasta do projeto)
// 2. Copie a URL gerada (ex: https://noteback-expo.vercel.app)
// 3. Cole abaixo:
const API_URL = 'https://noteback-expo.vercel.app/api/promocoes';
// =============================================================

// Dados de fallback caso o servidor esteja offline
const FALLBACK: Promotion[] = [
  // Alimentos
  { id: 'f1', title: 'Arroz Tipo 1 Camil 5kg', price: 'R$ 21,90', oldPrice: 'R$ 27,90', store: 'Carrefour', category: 'Alimentos' },
  { id: 'f2', title: 'Óleo de Soja Soya 900ml', price: 'R$ 5,49', oldPrice: 'R$ 7,99', store: 'Atacadão', category: 'Alimentos' },
  { id: 'f7', title: 'Feijão Carioca Kicaldo 1kg', price: 'R$ 7,49', oldPrice: 'R$ 9,99', store: 'Tenda Atacado', category: 'Alimentos' },
  { id: 'f8', title: 'Macarrão Espaguete Barilla 500g', price: 'R$ 4,99', oldPrice: 'R$ 7,49', store: 'Sonda Supermercados', category: 'Alimentos' },
  { id: 'f5', title: 'Café Pilão Torrado 500g', price: 'R$ 14,90', oldPrice: 'R$ 19,90', store: 'Assaí Atacadista', category: 'Alimentos' },
  { id: 'f12', title: 'Açúcar Refinado União 1kg', price: 'R$ 4,29', oldPrice: 'R$ 5,99', store: 'Pão de Açúcar', category: 'Alimentos' },
  { id: 'f13', title: 'Farinha de Trigo Dona Benta 1kg', price: 'R$ 4,89', oldPrice: 'R$ 6,50', store: 'Extra', category: 'Alimentos' },
  { id: 'f14', title: 'Biscoito Recheado Trakinas 136g', price: 'R$ 2,49', oldPrice: 'R$ 3,50', store: 'Super Muffato', category: 'Alimentos' },
  
  // Laticínios
  { id: 'f3', title: 'Leite Integral Parmalat 1L', price: 'R$ 4,79', oldPrice: 'R$ 6,29', store: 'Pão de Açúcar', category: 'Laticínios' },
  { id: 'f15', title: 'Manteiga Extra Aviação 200g', price: 'R$ 12,90', oldPrice: 'R$ 16,90', store: 'Carrefour', category: 'Laticínios' },
  { id: 'f16', title: 'Queijo Mussarela Fatiado 150g', price: 'R$ 8,99', oldPrice: 'R$ 11,50', store: 'Dia', category: 'Laticínios' },
  { id: 'f17', title: 'Iogurte Natural Danone 170g', price: 'R$ 2,99', oldPrice: 'R$ 3,99', store: 'Prezunic', category: 'Laticínios' },
  { id: 'f18', title: 'Requeijão Cremoso Vigor 200g', price: 'R$ 7,49', oldPrice: 'R$ 9,99', store: 'Atacadão', category: 'Laticínios' },

  // Limpeza
  { id: 'f4', title: 'Sabão em Pó Omo Lavagem Perfeita 1,6kg', price: 'R$ 15,90', oldPrice: 'R$ 22,90', store: 'Extra', category: 'Limpeza' },
  { id: 'f6', title: 'Amaciante Downy Brisa de Verão 500ml', price: 'R$ 9,90', oldPrice: 'R$ 14,50', store: 'Supermercados Dia', category: 'Limpeza' },
  { id: 'f19', title: 'Detergente Líquido Ypê 500ml', price: 'R$ 2,19', oldPrice: 'R$ 2,89', store: 'Assaí Atacadista', category: 'Limpeza' },
  { id: 'f20', title: 'Desinfetante Pinho Sol 1L', price: 'R$ 8,99', oldPrice: 'R$ 12,50', store: 'Tenda Atacado', category: 'Limpeza' },
  { id: 'f21', title: 'Água Sanitária Qboa 2L', price: 'R$ 5,99', oldPrice: 'R$ 7,99', store: 'Carrefour', category: 'Limpeza' },

  // Higiene e Perfumaria
  { id: 'f9', title: 'Papel Higiênico Neve Folha Dupla 12 rolos', price: 'R$ 16,90', oldPrice: 'R$ 23,90', store: 'Super Muffato', category: 'Higiene e Perfumaria' },
  { id: 'f11', title: 'Desodorante Rexona Aerosol 150ml', price: 'R$ 12,90', oldPrice: 'R$ 18,90', store: 'Carrefour', category: 'Higiene e Perfumaria' },
  { id: 'f22', title: 'Shampoo Seda Ceramidas 325ml', price: 'R$ 8,49', oldPrice: 'R$ 11,99', store: 'Pão de Açúcar', category: 'Higiene e Perfumaria' },
  { id: 'f23', title: 'Sabonete Dove Branco 90g', price: 'R$ 3,99', oldPrice: 'R$ 5,50', store: 'Extra', category: 'Higiene e Perfumaria' },
  { id: 'f24', title: 'Pasta de Dente Colgate Total 12 90g', price: 'R$ 5,49', oldPrice: 'R$ 7,50', store: 'Atacadão', category: 'Higiene e Perfumaria' },

  // Bebidas
  { id: 'f10', title: 'Refrigerante Coca-Cola 2L', price: 'R$ 7,99', oldPrice: 'R$ 10,99', store: 'Prezunic', category: 'Bebidas' },
  { id: 'f25', title: 'Cerveja Heineken Long Neck 330ml', price: 'R$ 5,99', oldPrice: 'R$ 7,50', store: 'Carrefour', category: 'Bebidas' },
  { id: 'f26', title: 'Suco de Uva Integral Aurora 1,5L', price: 'R$ 14,90', oldPrice: 'R$ 19,90', store: 'Assaí Atacadista', category: 'Bebidas' },
  { id: 'f27', title: 'Água Mineral Minalba Sem Gás 1,5L', price: 'R$ 2,49', oldPrice: 'R$ 3,50', store: 'Super Muffato', category: 'Bebidas' },

  // Açougue e Frios
  { id: 'f28', title: 'Contra Filé Friboi Reserva kg', price: 'R$ 39,90', oldPrice: 'R$ 49,90', store: 'Atacadão', category: 'Açougue e Frios' },
  { id: 'f29', title: 'Filé de Peito de Frango Sadia 1kg', price: 'R$ 18,90', oldPrice: 'R$ 24,90', store: 'Extra', category: 'Açougue e Frios' },
  { id: 'f30', title: 'Linguiça Calabresa Seara kg', price: 'R$ 22,90', oldPrice: 'R$ 29,90', store: 'Sonda Supermercados', category: 'Açougue e Frios' },
  
  // Hortifruti
  { id: 'f31', title: 'Banana Prata kg', price: 'R$ 5,99', oldPrice: 'R$ 8,50', store: 'Prezunic', category: 'Hortifruti' },
  { id: 'f32', title: 'Maçã Gala kg', price: 'R$ 8,99', oldPrice: 'R$ 12,90', store: 'Carrefour', category: 'Hortifruti' },
  { id: 'f33', title: 'Tomate Carmem kg', price: 'R$ 6,49', oldPrice: 'R$ 9,99', store: 'Pão de Açúcar', category: 'Hortifruti' },
  { id: 'f34', title: 'Batata Lavada kg', price: 'R$ 4,99', oldPrice: 'R$ 7,50', store: 'Tenda Atacado', category: 'Hortifruti' }
];

export const fetchPromotions = async (): Promise<Promotion[]> => {
  try {
    // Tenta buscar dados reais do servidor
    const response = await fetch(API_URL, { method: 'GET' });

    if (!response.ok) {
      throw new Error('Servidor retornou ' + response.status);
    }

    const data = await response.json();

    if (data.success && data.promotions && data.promotions.length > 0) {
      console.log('Promoções reais carregadas: ' + data.count + ' itens');
      return data.promotions;
    }

    // Servidor respondeu mas sem dados — usa fallback
    throw new Error('Sem dados no servidor');
  } catch (error) {
    // Servidor offline ou sem dados — usa fallback com aviso
    console.log('Usando dados de demonstração: ' + (error as Error).message);

    // Simula latência para UX consistente
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...FALLBACK].sort(() => Math.random() - 0.5);
  }
};
