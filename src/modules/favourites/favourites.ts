import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './favourites.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { favService } from '../../services/favourite.service';

export class Favourites {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
    this.getProducts();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  async getProducts() {
    this.products = await favService.get();
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);
    });
  }
}

export const favouritesComp = new Favourites();
