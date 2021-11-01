import { AuthCookieGuard } from './auth-cookie.guard';

describe('AuthCookieGuard', () => {
  it('should be defined', () => {
    expect(new AuthCookieGuard()).toBeDefined();
  });
});
