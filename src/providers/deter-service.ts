import { Injectable } from '@angular/core';

@Injectable()
export class DetersService {

  constructor() {
    console.log('Hello DeterService Provider');
  }

  getAllProduct(){
    return[
      {
          title:'Detergentes Lux',
          cover: 'http://placehold.it/350x150',
          deterCategory:[
            {
              img: 'http://placehold.it/400x400',
              title: 'Lux 75g'
            },
            {
              img: 'http://placehold.it/400x400',
              title: 'lux 125g'
            }
          ]
      },
      {
          title:'Mis vacaciones2',
          cover: 'http://placehold.it/350x150',
          deterCategory:[
            {
              img: 'http://placehold.it/400x400',
              title: 'colombia'
            },
            {
              img: 'http://placehold.it/400x400',
              title: 'venezuela'
            }
          ]
      }
    ]
  }
   getAll(){
    return [
        {
          title:'Mis vacaciones',
          cover: 'http://placehold.it/350x150',
          deterCategory:[
            {
              img: 'http://placehold.it/400x400',
              title: 'colombia'
            },
            {
              img: 'http://placehold.it/400x400',
              title: 'venezuela'
            }
          ]
        },
        {
          title:'Mis vacaciones 2',
          cover: 'http://placehold.it/350x150',
          deterCategory:[
            {
              img: 'http://placehold.it/400x400',
              title: 'img 1'
            }
          ]
        },
        {
          title:'Mis vacaciones 3',
          cover: 'http://placehold.it/350x150',
          deterCategory:[
            {
              img: 'http://placehold.it/400x400',
              title: 'img 1'
            }
          ]
        }
    ]
  }
}
