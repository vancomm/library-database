export default class Service {
  apiRoute;

  constructor(apiRoute) {
    this.apiRoute = apiRoute;
  }

  async get(params, token) {
    const urlWithParams = `${this.apiRoute}?${new URLSearchParams(params)}`;
    return fetch(
      urlWithParams,
      {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async getById(id, token) {
    return fetch(
      `${this.apiRoute}/${id}`,
      {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async getThruPost(params, token) {
    const res = await fetch(
      `${this.apiRoute}/get`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      },
    );
    return res.json();
  }

  find(limit, search, token, start = true, end = false) {
    return (query) => this.getThruPost(
      {
        limit,
        where: {
          [search]: `${start ? '' : '%'}${query}${end ? '' : '%'}`,
        },
      },
      token,
    );
  }

  async postOne(data, token) {
    return fetch(
      this.apiRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
  }

  async delete(params, token) {
    return fetch(this.apiRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
  }

  async deleteById(id, token) {
    return fetch(
      `${this.apiRoute}/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async updateById(id, data, token) {
    return fetch(
      `${this.apiRoute}/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
  }

  async updateOne(record, token) {
    return fetch(this.apiRoute, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      body: JSON.stringify(record),
    });
  }
}
