import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "name": "Cook Co",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "info@cook.com.",
        "database": "Version 3.0.1555 32mb",
        "color": "pink"
      },
      {
        "name": "Charlie Chocolate",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "cook@charliechocolate.com",
        "database": "Version 3.0.1555 32mb",
        "color": "blue"
      },
      {
        "name": "Starbucks",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "monitor@starbucks.com",
        "database": "Version 3.0.1555 32mb",
         "color": "blue"
      },
      {
        "name": "Red Steak",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "john@redsteak.co.uk",
        "database": "Version 3.0.1555 32mb",
        "color": "blue"
      },
      {
        "name": "Wales Cooking School",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "john@walescooking.com",
        "database": "Version 3.0.1555 32mb",
        "color": "blue"
      },
      {
        "name": "Molly House",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "molly@mollycook.co.uk",
        "database": "Version 3.0.1555 32mb",
        "color": "blue"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
