// TODO: Replace mock authentication with Supabase Auth.
// This module intentionally has NO real security. It exists so the
// login screen and route structure can be built now and swapped later.

export type Role = "participant" | "admin";

export const authService = {
  async login(_participantId: string, _password: string, role: Role): Promise<{ role: Role }> {
    // No real credential check happens here. Any input "succeeds" for demo purposes.
    return { role };
  },

  async logout(): Promise<void> {
    // no-op in the mock implementation
  },
};
