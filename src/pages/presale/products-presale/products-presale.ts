import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from '../../../providers/order.service'; 


@IonicPage({
  name: 'ProductsPresalePage',
  segment: 'products-presale/:order'
})
@Component({
  selector: 'page-products-presale',
  templateUrl: 'products-presale.html',
})
export class ProductsPresalePage {

  productSelected: any = null;
  products: FirebaseListObservable<any>;
  showLoad: boolean = false;
  
  marks: any[] = [
    {
      title: 'Skip',
      products: [
        {
          "name":"Skip de 330gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "330 gr",
          "cant":"bolson x 36 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "name":"Skip de 800gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "800 gr",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "name":"Skip de 2,25kg",
          "weight": "2,25kg",
          "cant":"bolson x 6 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "name":"Skip de 330gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "330 gr",
          "cant":"bolson x 36 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "name":"Skip de 800gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "800 gr",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "name":"Skip de 2,25kg",
          "weight": "2,25kg",
          "cant":"bolson x 6 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
      ]
    },
    {
      title: 'OMO',
      products: [
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 140gr",
          "weight": "140gr",
          "cant":"bolson x 40 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 360gr",
          "weight": "360gr",
          "cant":"bolson x 36 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 900gr",
          "weight": "900gr",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 10 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBqTbL2WAz3wWrRcl-vchANk7qW4K5C-lb8vtvTmnu_rpJuL0c",
          "name":"Omo de 160 g",
          "weight": "160g",
          "cant":"bolson x 40 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Floral"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBqTbL2WAz3wWrRcl-vchANk7qW4K5C-lb8vtvTmnu_rpJuL0c",
          "name":"Omo de 900g",
          "weight": "900 g",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Floral"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBqTbL2WAz3wWrRcl-vchANk7qW4K5C-lb8vtvTmnu_rpJuL0c",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Floral"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 160 g",
          "weight": "160g",
          "cant":"bolson x 40 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 900g",
          "weight": "900 g",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "name":"Omo de 2,5 kg",
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"222",
            "title":"detergente en barra"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"222",
            "title":"detergente en barra"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        }
      ]
    },
    {
      title: 'Skip',
      products: [
        {
          "name":"Skip de 330gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "330 gr",
          "cant":"bolson x 36 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "name":"Skip de 800gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "800 gr",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "name":"Skip de 2,25kg",
          "weight": "2,25kg",
          "cant":"bolson x 6 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "name":"Skip de 330gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "330 gr",
          "cant":"bolson x 36 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "name":"Skip de 800gr",
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "weight": "800 gr",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
        {
          "image":"http://www.stock.com.py/images/thumbs/0144743_300.jpeg",
          "name":"Skip de 2,25kg",
          "weight": "2,25kg",
          "cant":"bolson x 6 u",
          "img":"xxx",
          "mark":"Skip",
          "group":"Skip"
        },
      ]
    },
    {
      title: 'OMO',
      products: [
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 140gr",
          "weight": "140gr",
          "cant":"bolson x 40 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 360gr",
          "weight": "360gr",
          "cant":"bolson x 36 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 900gr",
          "weight": "900gr",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"http://stock.com.py/images/thumbs/0143145_300.jpeg",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 10 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Limon"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBqTbL2WAz3wWrRcl-vchANk7qW4K5C-lb8vtvTmnu_rpJuL0c",
          "name":"Omo de 160 g",
          "weight": "160g",
          "cant":"bolson x 40 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Floral"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBqTbL2WAz3wWrRcl-vchANk7qW4K5C-lb8vtvTmnu_rpJuL0c",
          "name":"Omo de 900g",
          "weight": "900 g",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Floral"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBqTbL2WAz3wWrRcl-vchANk7qW4K5C-lb8vtvTmnu_rpJuL0c",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Floral"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 160 g",
          "weight": "160g",
          "cant":"bolson x 40 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 900g",
          "weight": "900 g",
          "cant":"bolson x 15 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"111",
            "title":"detergente en polvo"
          },
          "name":"Omo de 2,5 kg",
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"222",
            "title":"detergente en barra"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        },
        {
          "category":{
            "id":"222",
            "title":"detergente en barra"
          },
          "image":"https://www.omo.com.bo/wp-content/uploads/sites/5/2012/06/sol.png",
          "name":"Omo de 2,5 kg",
          "weight": "2,5 kg",
          "cant":"bolson x 4 u",
          "img":"xxx",
          "mark":"Omo",
          "group":"Abrazo de Sol"
        }
      ]
    },
    
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.products = this.orderService.getProducstOrder(this.navParams.get('order'));
  }

  clickedProduct( product ){
    this.productSelected = product;
    this.productSelected.count = 0;
  }

  add(){
    this.productSelected.count++;
  }

  remove(){
    if(this.productSelected.count > 0){
      this.productSelected.count--;
    }
  }

  addProduct(){
    this.showLoad = true;
    this.products.push(this.productSelected)
    .then(data=>{
      this.showLoad = false;
      this.close();
      let toast = this.toasCtrl.create({
        message: 'Producto agregado',
        duration: 1000
      });
      toast.present();
    })
    .catch(error=>{
      this.showLoad = false;
      console.error(error);
    })
  }

  close(){
    this.productSelected = null;
  }

  showOrder(){
    let modal = this.modalCtrl.create('OrderPresalePage',{
      order: this.navParams.get('order')
    });
    modal.present();
  }

}
