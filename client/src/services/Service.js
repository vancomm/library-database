export default class Service {
  apiRoute;

  constructor(apiRoute) {
    this.apiRoute = apiRoute;
  }

  async get(params) {
    const urlWithParams = `${this.apiRoute}?${new URLSearchParams(params)}`;
    return fetch(urlWithParams);
  }

  async getThruPost(params) {
    const res = await fetch(
      `${this.apiRoute}/get`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
    );
    return res.json();
  }

  async getById(id) {
    return fetch(`${this.apiRoute}/${id}`);
  }

  find(limit, search, start = true, end = false) {
    return (query) => this.getThruPost({
      limit,
      where: {
        [search]: `${start ? '' : '%'}${query}${end ? '' : '%'}`,
      },
    });
  }

  async postOne(record) {
    return fetch(
      this.apiRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      },
    );
  }

  async delete(params) {
    return fetch(this.apiRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }

  async deleteById(id) {
    return fetch(`${this.apiRoute}/${id}`, { method: 'DELETE' });
  }

  async updateById(id, data) {
    return fetch(`${this.apiRoute}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async updateOne(record) {
    return fetch(this.apiRoute, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
  }
}
