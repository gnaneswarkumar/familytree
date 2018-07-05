import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      {
        id: 1,
        name: 'Tippa Raju',
        sons:[{id:2,name:'Pedda Chennappa'},{id:3,name:'Chinna Chennappa'}],
        wiwes:[],
        daughters:[],
        mother:[],
        father:[]
     },
      {
        id: 2,
        name: 'Pedda Chennappa',
        sons:[{id:4,name:'Linga Raju'},{id:7,name:'Dassappa'}],
      },
      {
        id: 3,
        name: 'Chinna Chennappa',
        sons:[],
      },
      { id: 4, name: 'Linga Raju' },
      { id: 5, name: 'Papa Raju' },
      { id: 6, name: 'Venkata Narasappa' },
      { id: 7, name: 'Dassappa' },
      { id: 8, name: 'Venkata Ramanna' },
      { id: 9, name: 'Venkata Rayappa' },
      { id: 10, name: 'Dassappa' },
      { id: 11, name: 'Dasappa' },
      {id:12, name: 'Surya Naraya Rao'},
      {id:13, name: 'Sambasiva Rao'},
      {id:14, name: 'Sudhakar'},
      {id:15, name: 'Ramachandra Rao'},
      {id:16, name: 'Venkata Narayanappa'},
      {id:17, name: 'Venkata Narasappa'},
      {id:18, name: 'Venkata Rayappa'},
      {id:19, name: 'Venkata Subba Rao'},
      {id:20, name: 'Krishna Murthy'},
      {id:21, name: 'Sree Nath'},
      {id:22, name: 'Surendra Nath'},
      {id:23, name: 'Ramachandra Rao'},
      {id:24, name: 'Sasidhar'},
      {id:25, name: 'Venkata Narasappa'}
    ];
    return {heroes};
  }

}
