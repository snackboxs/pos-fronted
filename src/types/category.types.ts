export interface CreatedBy {
  userId: string;
  userName: string;
}

export interface Category {
  categoryId: string;
  categoryName: string;
  createdBy: CreatedBy;
  createdDate: string;
  updatedBy: CreatedBy | null;
  updatedDate: string | null;
}

export interface CategoryResponse {
   timestamp: string;
   status: number;
   message: string;
   data: Category[]; 
}