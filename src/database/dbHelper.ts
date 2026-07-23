import * as SQLite from 'expo-sqlite';

export interface PurchaseStats {
  totalGasto: number;
  totalCompras: number;
}

export interface PurchaseRecord {
  id: string;
  store_name: string;
  cnpj: string;
  total_value: number;
  issue_date: string;
  access_key: string;
  created_at: string;
  items_count?: number; // Calculated field
}

export interface ProductRecord {
  id: string;
  receipt_id: string;
  name: string;
  code: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  unit: string;
  store_name?: string; // Joined field
  issue_date?: string; // Joined field
}

// Get Database Instance
const getDB = async () => {
  return await SQLite.openDatabaseAsync('noteback.db');
};

export const getSummaryStats = async (): Promise<PurchaseStats> => {
  try {
    const db = await getDB();
    // In a real app we would filter by current month using issue_date or created_at
    // For now, getting total from all receipts.
    const result: any = await db.getFirstAsync(
      `SELECT COUNT(id) as totalCompras, SUM(total_value) as totalGasto FROM receipts`
    );
    
    return {
      totalGasto: result?.totalGasto || 0,
      totalCompras: result?.totalCompras || 0,
    };
  } catch (error) {
    console.error('Error getting summary stats:', error);
    return { totalGasto: 0, totalCompras: 0 };
  }
};

export const getAllPurchases = async (): Promise<PurchaseRecord[]> => {
  try {
    const db = await getDB();
    const results = await db.getAllAsync<PurchaseRecord>(
      `SELECT r.*, (SELECT COUNT(*) FROM products p WHERE p.receipt_id = r.id) as items_count 
       FROM receipts r 
       ORDER BY r.created_at DESC`
    );
    return results;
  } catch (error) {
    console.error('Error getting all purchases:', error);
    return [];
  }
};

export const getExpiringProducts = async (): Promise<ProductRecord[]> => {
  try {
    const db = await getDB();
    // Assuming for now we just show all products. 
    // In a full implementation, we'd add an expiry_date field or warranty logic.
    const results = await db.getAllAsync<ProductRecord>(
      `SELECT p.*, r.store_name, r.issue_date 
       FROM products p 
       JOIN receipts r ON p.receipt_id = r.id 
       ORDER BY r.issue_date DESC`
    );
    return results;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};
