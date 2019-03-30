export interface TokenInfo {
  sub: string;
  Roles: {
    authority: string;
  };
  exp: number;
  iat: number;
  jti: number;
}
