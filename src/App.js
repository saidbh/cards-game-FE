import React, { useState } from "react";
import { fetchCards, sortCards } from "./services/cardService";

const suits = {
  Carreaux: { symbol: "♦", color: "text-red-600" },
  Cœur: { symbol: "♥", color: "text-red-600" },
  Pique: { symbol: "♠", color: "text-black" },
  Trèfle: { symbol: "♣", color: "text-black" },
};

export default function App() {
  const [cards, setCards] = useState([]);

  const handleFetch = async () => {
    try {
      const data = await fetchCards();
      setCards(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSort = async () => {
    try {
      const data = await sortCards(cards);
      const sortedCards = data || [];
      setCards([...sortedCards]);
    } catch (err) {
      console.error("Sort error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-green-700 p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Jeux des cartes</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleFetch}
          className="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200"
        >
          Piochez des cartes
        </button>
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-yellow-300 text-black rounded shadow hover:bg-yellow-200 disabled:opacity-50"
          disabled={cards.length === 0}
        >
          Trier les cartes
        </button>
      </div>

      {cards.length === 0 && (
        <p className="text-center text-white">
          Cliquez sur « Tirer des cartes » pour commencer
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {cards.map((card, index) => {
          const suit = suits[card.color] || {};
          return (
            <div
              key={index}
              className="relative w-32 h-48 bg-white rounded-xl shadow-lg border border-gray-300 p-2"
            >
              <div className={`absolute top-2 left-2 text-sm ${suit.color}`}>
                {card.value}
                <div>{suit.symbol}</div>
              </div>
              <div
                className={`absolute bottom-2 right-2 text-sm rotate-180 ${suit.color}`}
              >
                {card.value}
                <div>{suit.symbol}</div>
              </div>
              <div
                className={`flex items-center justify-center h-full text-4xl ${suit.color}`}
              >
                {suit.symbol}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}