export default class Service {
  #apiRoute;

  constructor(apiRoute) {
    this.#apiRoute = apiRoute;
  }

  async get(params) {
    const urlWithParams = `${this.#apiRoute}?${new URLSearchParams(params)}`;
    const res = await fetch(urlWithParams);
    return res.json();
  }

  async postOne(record) {
    const res = await fetch(
      this.#apiRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      },
    );
    return res;
  }

  async deleteOne(id) {
    const res = await fetch(this.#apiRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    return res;
  }

  async updateOne(record) {
    const res = await fetch(this.#apiRoute, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
    return res;
  }
}
