// Category
export interface Category {
   categoryId: string;
   categoryName: string;
}

// User information
export interface UserInfo {
   userId: string;
   userName: string;
}

// Inventory
export interface Inventory {
   inventoryId: string;
   quantity: number;
   uom: string;
}

// // Discount (expand later if needed)
export interface Discount {}

// Single Menu Item
export interface MenuData {
   menuId: string;
   menuName: string;
   price: number;
   category: Category;
   imageUrl: string;
   isThereDiscount: boolean;
   description: string;
   createdBy: UserInfo;
   createdDate: string;
   updatedBy: UserInfo | null;
   updatedDate: string | null;
   inventory: Inventory;
   discounts: Discount[];
}

export type Status = "idle" | "loading" | "succeeded" | "failed"; 

export interface MenuPagination {
   content: MenuData[];
   page: number;
   size: number;
   totalElements: number;
   totalPages: number;
}

export interface MenuApiResponse {
   data: MenuPagination;
}

export interface PaginationState {
   menuList: MenuData[];
   status: Status;
   error: string | null;
   page: number;
   size: number;
   totalElements: number;
   totalPages: number;
}

export interface MenuState {
   card: PaginationState; // CardContainer page
   stock: PaginationState; // Stock page
}

export interface FetchMenusParams {
   scope: "card" | "stock";
   page: number;
   size: number;
}
