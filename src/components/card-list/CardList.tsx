import { DragEvent, useState } from "react";
import React from 'react';
import { Card } from "./Card";
import './CardList.css';

const CardList = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: 'title 1', status: false, description: 'card 1', order: 1 },
    { id: 2, title: 'title 2', status: false, description: 'card 2', order: 2 },
    { id: 3, title: 'title 3', status: false, description: 'card 3', order: 3 },
    { id: 4, title: 'title 4', status: false, description: 'card 4', order: 4 },
  ]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: Card) => {
    setCurrentCard(card);
  };

  const dragEndHandler = (e: DragEvent) => {
    // e.target.style.backgroundColor = '#fff';
  };

  const dragOverHandler = (e: DragEvent) => e.preventDefault();


  const dragLeaveHandler = (e: DragEvent) => {
  };

  const dropHandler = (e: DragEvent, card: Card) => {
    e.preventDefault();
    const updatedOrderCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, order: currentCard?.order ?? c.order };
      } else if (c.id === currentCard?.id) {
        return { ...c, order: card.order };
      } else {
        return c;
      }
    });
    setCards(updatedOrderCards);
  };

  const sortCard = (a: Card, b: Card) => a.order > b.order ? 1 : -1;

  const sortedCardList = cards.sort(sortCard).map((card) => {
    return <div
      onDragStart={(e) => dragStartHandler(e, card)}
      onDrop={(e) => dropHandler(e, card)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      draggable
      className={'card'}
      key={card?.id}>
      <h1>{card?.title}</h1>
      <p>{card?.description}</p>
      <p>{card.status}</p>
    </div>;
  });

  return <div className={'card-list'}>{sortedCardList}</div>;
};

export default CardList;
