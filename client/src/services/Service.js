export default class Service {
  apiRoute;

  constructor(apiRoute) {
    this.apiRoute = apiRoute;
  }

  async get(params) {
    const urlWithParams = `${this.apiRoute}?${new URLSearchParams(params)}`;
    const res = await fetch(urlWithParams);
    return res.json();
  }

  async getComplex(params) {
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

  find(limit, search, start = true, end = false) {
    return (query) => this.getComplex({
      limit,
      where: {
        [search]: `${start ? '' : '%'}${query}${end ? '' : '%'}`,
      },
    });
  }

  async postOne(record) {
    const res = await fetch(
      this.apiRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      },
    );
    return res.json();
  }

  async deleteOne(id) {
    return fetch(this.apiRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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
