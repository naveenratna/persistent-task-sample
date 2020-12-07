import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskmanagementService {

  constructor() { }
  // cards data getting
  getCards() {
    let cards:[] =JSON.parse(window.localStorage.getItem('cards') ||'[]');
    if (cards === null) {
       cards = [];
    }
    //console.log(cards)
    return cards;
  }

  // list data getting
  getLists(){
    let lists:[] =JSON.parse(window.localStorage.getItem('lists') ||'[]');
    if (lists === null) {
      lists = [];
    }
    //console.log(lists)
    return lists;
  }

  // add card data 

  addCardData(addItem: any){
    //console.log(addItem);
    const cardsStored = window.localStorage.getItem('cards');
    let cards = [];
    if (cardsStored !== null) {
      cards = JSON.parse(cardsStored);
    }
    const newCard = {
      fieldName: addItem.fieldName,
      id: cards.length + 1,
      parentid: addItem.parentid,
      parentName:addItem.parentName
    };

    cards.push(newCard);
    window.localStorage.setItem('cards', JSON.stringify(cards));
    //console.log(cards)
    return cards
  }
  
  // add list data
   addListData(addListItem: any){
    //console.log(addListItem);
    const listsStored = window.localStorage.getItem('lists');
    let lists = [];
    if (listsStored !== null) {
      lists = JSON.parse(listsStored);
    }
    const newlist = {
          fieldListName: addListItem.fieldListName,
          task:[],
          id: lists.length + 1
          };
    lists.push(newlist);
    window.localStorage.setItem('lists', JSON.stringify(lists));
    //console.log(lists)
    return lists
   }
}
