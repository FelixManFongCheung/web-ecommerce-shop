export interface CartData {
  products: string[];
  createdAt: string;
  expiresAt: string;
  isExpired: boolean;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  error?: string;
  cartID?: string;
}
