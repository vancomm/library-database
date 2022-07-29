import {
  existsRoute, loginRoute, registerRoute, updateRoute,
} from '../data/routes';

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

  async update(token) {
    try {
      const res = await fetch(
        updateRoute,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { user } = await res.json();
      return { success: true, user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
};

export default AuthService;
