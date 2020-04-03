import React from 'react';


export default class GotServices extends React.Component {
  constructor() {
    super();
    this._apiBase = 'https://jsonplaceholder.typicode.com/todos';
  }
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json();
  };
// fetch(url, {
//   method: 'POST',
//   body: JSON.stringify(data),
//   headers: {
//     'Content-Type':'application/json'
//   }
// })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(error => console.error('Error', error))

  getAllTasks() {
    return this.getResource('/?page=1&pageSize=5');
  }
  getTask(id) {
    return this.getResource(`/${id}`);
  }
  
}

