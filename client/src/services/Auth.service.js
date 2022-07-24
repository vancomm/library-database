import { loginRoute, registerRoute } from '../data/routes';

const AuthService = {
  async tryLogin(username, password) {
    const res = await fetch(loginRoute, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status !== 200) {
      const { message } = await res.json();
      return { success: false, message };
    }

    const { user, token } = await res.json();
    return { success: true, user, token };
  },

  async tryRegister(username, name, role, password) {
    return { success: false };
  },
};

export default AuthService;
