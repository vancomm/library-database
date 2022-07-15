export default class Service {
  #apiRoute;

  constructor(apiRoute) {
    this.#apiRoute = apiRoute;
  }

  async getAll() {
    const res = await fetch(this.#apiRoute);
    const data = await res.json();
    return data;
  }

  async getPage(limit, offset) {
    const urlWithParams = `${this.#apiRoute}?${new URLSearchParams({ limit, offset })}`;
    const res = await fetch(urlWithParams);
    return res.json();
  }

  async postOne(data) {
    const res = await fetch(
      this.#apiRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

  async updateOne(data) {
    const res = await fetch(this.#apiRoute, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res;
  }
}
