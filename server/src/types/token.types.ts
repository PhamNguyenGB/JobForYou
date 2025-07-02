export interface TokenDto {
  id?: number;
  user_id?: number;
  admin_id?: number;
  refresh_token: string;
  type: string;
  is_revoked: boolean;
  expires_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
