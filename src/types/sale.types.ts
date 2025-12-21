export interface Item {
   menuId: string,
   quantity: number,
}

export interface SaleRequest  {
   items: Item[],
   taxIds: string[],
}