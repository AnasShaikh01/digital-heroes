import type { UserRole } from '@/types/database';

export const ROLES: Record<Uppercase<UserRole>, UserRole> = {
  USER: 'user',
  ADMIN: 'admin',
};

export function isAdminRole(role: string | null | undefined): boolean {
  return role === ROLES.ADMIN;
}