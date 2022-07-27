import { existsRoute, loginRoute, registerRoute } from '../data/routes';

const AuthService = {
  async exists(username) {
    return fetch(`${existsRoute}/?username=${username}`);
  },

  async tryLogin(params) {
    const res = await fetch(loginRoute, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (res.status !== 200) {
      const { message } = await res.json();
      return { success: false, message };
    }

    const { user, token } = await res.json();
    return { success: true, user, token };
  },

  async tryRegister(params) {
    const res = await fetch(registerRoute, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (res.status !== 201) {
      const { message } = await res.json();
      return { success: false, message };
    }
    const { user, token } = await res.json();
    return { success: true, user, token };
  },
};

export default AuthService;
