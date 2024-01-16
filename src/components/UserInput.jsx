import { useEffect, useRef, useState } from "react";
import items from "../../data.json";

const UserInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredItems(
      items.filter(
        (item) =>
          !chips.includes(inputValue.current) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, chips]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleItemSelect = (selectedItem) => {
    setChips([...chips, selectedItem]);
    setInputValue("");
  };

  const handleChipRemove = (removedChip) => {
    setChips(chips.filter((chip) => chip !== removedChip));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      setHighlightedChip(lastChip);
      event.preventDefault();
    }
    if (event.key === "Backspace" && highlightedChip) {
      handleChipRemove(highlightedChip);
      setHighlightedChip(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row space-x-4 flex-wrap max-w-xl items-start">
        {chips.map((chip, index) => (
          <div
            key={index}
            className={`chip ${
              highlightedChip === chip ? "highlighted" : ""
            }  bg-white mb-4 rounded-full w-fit px-6  flex flex-row items-center space-x-2 text-black `}
          >
            <img
              src={items.find((item) => item.name === chip)?.image}
              alt={chip}
              className="w-16 h-16"
            />
            {chip}{" "}
            <span
              onClick={() => handleChipRemove(chip)}
              className="text-red-500 cursor-pointer hover:bf-red-700"
            >
              X
            </span>
          </div>
        ))}
      </div>

      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Find Users...."
        className="w-96 h-12 px-4 text-lg border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 mb-4"
      />

      {showSuggestions && (
        <div className="bg-gray-400  rounded-md w-96">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemSelect(item.name)}
              className="flex flex-row items-center space-x-2 px-2 hover:bg-gray-300 cursor-pointer"
            >
              <img src={item.image} alt={item.name} className="w-12 h-12 " />
              <p className="text-lg">{item.name}</p>
              <p className="text-sm ">{item.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInput;
