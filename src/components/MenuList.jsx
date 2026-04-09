import React from "react";
import FoodCard from "./FoodCard";

export default function MenuList({ menuItems, onOpen }) {
  return (
    <main className="p-4 grid grid-cols-1 gap-4">
      {menuItems.map((item) => (
        <FoodCard key={item.id} item={item} onOpen={onOpen} />
      ))}
    </main>
  );
}
