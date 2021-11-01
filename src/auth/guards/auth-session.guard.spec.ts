import { AuthSessionGuard } from './auth-session.guard';

describe('AuthSessionGuard', () => {
  it('should be defined', () => {
    expect(new AuthSessionGuard(null)).toBeDefined();
  });
});
