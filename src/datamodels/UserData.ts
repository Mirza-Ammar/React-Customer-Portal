export interface UserData {
  id: string;
  phoneNumber: string;
  countryCode: string;

  /** Custom backend JWT */
  token: string;

  /** Supabase access token (used for protected APIs) */
  supabaseAccessToken: string;
}
