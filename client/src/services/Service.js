export default class Service {
  apiRoute;

  constructor(apiRoute) {
    this.apiRoute = apiRoute;
  }

  // async get(params) {
  //   const urlWithParams = `${this.apiRoute}?${new URLSearchParams(params)}`;
  //   const res = await fetch(urlWithParams);
  //   return res.json();
  // }

  async get(params) {
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
    const { records: [record] } = await this.get({ limit: 1, where: { id } });
    return record;
  }

  find(limit, search, start = true, end = false) {
    return (query) => this.get({
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
    return this.delete({ where: { id } });
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
