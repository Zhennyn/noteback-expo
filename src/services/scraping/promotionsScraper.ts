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
  { id: 'f1', title: 'Arroz Tipo 1 Camil 5kg', price: 'R$ 21,90', oldPrice: 'R$ 27,90', store: 'Carrefour', category: 'Alimentos' },
  { id: 'f2', title: 'Óleo de Soja Soya 900ml', price: 'R$ 5,49', oldPrice: 'R$ 7,99', store: 'Atacadão', category: 'Alimentos' },
  { id: 'f3', title: 'Leite Integral Parmalat 1L', price: 'R$ 4,79', oldPrice: 'R$ 6,29', store: 'Pão de Açúcar', category: 'Laticínios' },
  { id: 'f4', title: 'Sabão em Pó Omo 1,6kg', price: 'R$ 15,90', oldPrice: 'R$ 22,90', store: 'Extra', category: 'Limpeza' },
  { id: 'f5', title: 'Café Pilão Torrado 500g', price: 'R$ 14,90', oldPrice: 'R$ 19,90', store: 'Assaí Atacadista', category: 'Alimentos' },
  { id: 'f6', title: 'Amaciante Downy 500ml', price: 'R$ 9,90', oldPrice: 'R$ 14,50', store: 'Supermercados Dia', category: 'Limpeza' },
  { id: 'f7', title: 'Feijão Carioca Kicaldo 1kg', price: 'R$ 7,49', oldPrice: 'R$ 9,99', store: 'Tenda Atacado', category: 'Alimentos' },
  { id: 'f8', title: 'Macarrão Espaguete Barilla 500g', price: 'R$ 4,99', oldPrice: 'R$ 7,49', store: 'Sonda Supermercados', category: 'Alimentos' },
  { id: 'f9', title: 'Papel Higiênico Neve 12 rolos', price: 'R$ 16,90', oldPrice: 'R$ 23,90', store: 'Super Muffato', category: 'Higiene' },
  { id: 'f10', title: 'Refrigerante Coca-Cola 2L', price: 'R$ 7,99', oldPrice: 'R$ 10,99', store: 'Prezunic', category: 'Bebidas' },
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
