import { Injectable } from '@angular/core';

import { Case } from '../../models/case';

@Injectable()
export class Cases {
  items: Case[] = [];

  defaultCase: any = {
    "region_site": "VIC Metro - 60 Elizabeth Street",
    "location_unit": "Kitchen Freezer",
    "case_desc": "(-13.8°C)Temperature too High",
    "date_created": "2015-12-25",
    "status": "Created",
    "resolution": "Unresolved",
    "diagnostic": "Unattended",
    "asignee": "John Gamble",
  };


  constructor() {
    let cases = [
      {
        "region_site": "VIC Metro - 601 Elizabeth Street",
        "location_unit": "Kitchen Freezer",
        "case_desc": "(-13.8°C)Temperature too High",
        "date_created": "2015-12-25",
        "status": "Created",
        "resolution": "Unresolved",
        "diagnostic": "Unattended",
        "asignee": "John Gamble"
      },
      {
        "region_site": "VIC Metro - 60 Elizabeth Street",
        "location_unit": "Kitchen Freezer",
        "case_desc": "(-13.8°C)Temperature too High",
        "date_created": "2015-12-25",
        "status": "Created",
        "resolution": "Unresolved",
        "diagnostic": "Unattended",
        "asignee": "John Gamble"
      },
      {
        "region_site": "VIC Metro - 60 Elizabeth Street",
        "location_unit": "Kitchen Freezer",
        "case_desc": "(-13.8°C)Temperature too High",
        "date_created": "2015-12-25",
        "status": "Created",
        "resolution": "Unresolved",
        "diagnostic": "Unattended",
        "asignee": "John Gamble"
      },
      {
        "region_site": "VIC Metro - 60 Elizabeth Street",
        "location_unit": "Kitchen Freezer",
        "case_desc": "(-13.8°C)Temperature too High",
        "date_created": "2015-12-25",
        "status": "Created",
        "resolution": "Unresolved",
        "diagnostic": "Unattended",
        "asignee": "John Gamble"
      },
      {
        "region_site": "VIC Metro - 60 Elizabeth Street",
        "location_unit": "Kitchen Freezer",
        "case_desc": "(-13.8°C)Temperature too High",
        "date_created": "2015-12-25",
        "status": "Created",
        "resolution": "Unresolved",
        "diagnostic": "Unattended",
        "asignee": "John Gamble"
      },
      {
        "region_site": "VIC Metro - 60 Elizabeth Street",
        "location_unit": "Kitchen Freezer",
        "case_desc": "(-13.8°C)Temperature too High",
        "date_created": "2015-12-25",
        "status": "Created",
        "resolution": "Unresolved",
        "diagnostic": "Unattended",
        "asignee": "John Gamble"
      }
    ];

    for (let item of cases) {
      this.items.push(new Case(item));
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

  add(item: Case) {
    this.items.push(item);
  }

  delete(item: Case) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
