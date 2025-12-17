export interface Tax {
   taxId: string,
   taxDesc: string,
   taxPercentage: number
}

export interface Taxs {
   tax: Tax,
   taxAmount: number
}

export interface CreatedBy {
   userId: string,
   userName: string
}

export interface Item {
   saleItemId: number,
   menuId: string,
   menuName: string,
   quantity: number,
   price: number,
   total: number
}

export interface SaleData {
   salesId: string,
   saleDate: string,
   taxs: Taxs[],
   subTotal: number,
   totalAmount: number,
   createdBy: CreatedBy,
   createdDate: string,
   updatedBy: CreatedBy | null,
   updatedDate: string | null,
   items: Item[]
}

export interface SaleHistoryResponse {
   content: SaleData[];
   page: number;
   size: number;
   totalElements: number;
   totalPages: number;
}