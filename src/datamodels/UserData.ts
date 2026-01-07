export interface UserData {
  /** Backend user ID */
  id: string;

  /** Auth info */
  phoneNumber: string;
  countryCode: string;

  /** Custom backend JWT */
  token: string;

  /** Supabase access token (used for protected APIs) */
  supabaseAccessToken: string;

  /* ================================
   * Profile data (from /users/me)
   * ================================ */

  /** Individual / Business */
  userType?: string;

  /** EP-1009 */
  epNumber?: string | null;

  /** ERB-1009 */
  poBoxNumber?: string | null;

  /** Customer / Admin */
  role?: string;

  /** Optional profile image */
  profileImage?: string | null;
}
