import "../ChoseInventory.css";
import { useState} from "react";
import { API_BASE_URL } from "../consts";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function GearCard({ item, onClick, isSelected, onDelete, canDelete }) {
  return (
    <div
      className="gearCard"
      onClick={() => onClick(item)}
      style={{
        border: isSelected ? "3px solid #54fff7" : "1px solid grey",
      }}
    >
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      {canDelete && (
        <button
          className="deleteNewItemButton"
          onClick={() => {
            onDelete();
          }}
        >
          X
        </button>
      )}
    </div>
  );
}

function ChooseInventory({
  baseData,
  newForm,
  setNewForm,
  emptyForm,
}) {
  const gear = newForm.inventory[0];
  const [selectedGear, setSelectedGear] = useState(
    gear
      ? baseData.treasures.find((inventory) => inventory.name === gear.name)
      : null
  );
  const [newItems, setNewItems] = useState(newForm.inventory.slice(1));
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { characterId } = useParams();

  console.log("gear", gear, "baseData", baseData);
  const gearItems =
    baseData.treasures?.filter((item) => item.rarity === "gear") || [];
  const handleSelectGear = (item) => {
    setSelectedGear(item);
  };

  const handleAddNewItem = () => {
    if (newItemName && newItemDescription) {
      const newItemObject = {
        name: newItemName,
        description: newItemDescription,
        rarity: "gear",
      };
      setNewItems((prev) => [...prev, newItemObject]);
      setNewItemName("");
      setNewItemDescription("");
    }
  };

  const handleResetSelection = () => {
    setSelectedGear(null);
  };

  const handleSubmit = async (newForm) => {
    const updatedCharacterData = {
      ...newForm,
      inventory: [selectedGear, ...newItems],
    };
    try {
      let response;
      if (characterId) {
        response = await axios.put(
          `${API_BASE_URL}/characters/${characterId}`,
          updatedCharacterData
        );
        navigate(`/details/${characterId}`);
      } else {
        const separate = newForm.role.split(",");
        response = await axios.post(`${API_BASE_URL}/characters`, {
          ...newForm,
          inventory: [selectedGear, ...newItems],
          role: separate[separate.length - 1],
        });
      }
      setNewForm(emptyForm);
      console.log(response);

      const newCharacterId = response.data.id;
      if (newCharacterId) {
        navigate(`/details/${newCharacterId}`);
      } else {
        setErrorMsg("Ca marche pas parce que y'a pas d'ID mdr");
      }
    } catch (error) {
      console.error("Failed to process your request:", error);
    }
  };

  const handleDeleteItem = (index) => {
    setNewItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <>
      <h2 className="titleSelectGear">
        {characterId ? "Update inventory" : "Select a Gear Item"}
      </h2>
      <p>
        {characterId
          ? ""
          : "Your character is almost finished. Time to pick what you carry! You may choose one useful item from this list. You may additionnally, you may add three common weapons."}
      </p>
      <p>
        {characterId
          ? ""
          : "Your character is almost finished. Time to pick what you carry! You may choose one useful item from this list. You may additionnally, you may add three common weapons."}
      </p>

      <div className="cardContainer">
        {gearItems.map((item) =>
          selectedGear ? (
            item === selectedGear && (
              <GearCard
                key={item.id}
                item={item}
                onClick={handleSelectGear}
                isSelected={true}
              />
            )
          ) : (
            <GearCard
              key={item.id}
              item={item}
              onClick={handleSelectGear}
              isSelected={selectedGear === item}
            />
          )
        )}
      </div>
      {selectedGear && (
        <button className="changeMind" onClick={handleResetSelection}>
          I've changed my mind!
        </button>
      )}
      <h2 className="inventoryH">
        {characterId ? "Edit Additional Items" : "Add More Items"}
      </h2>
      <div className="intexte">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item Name"
        />
        <input
          type="text"
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
          placeholder="Item Description"
        />
        <button onClick={handleAddNewItem}>Add Item</button>
        {newItems.map((item, index) => (
          <GearCard
            key={index}
            item={item}
            onClick={() => {}}
            isSelected={false}
            onDelete={() => handleDeleteItem(index)}
            canDelete={true}
          />
        ))}
      </div>
      <button
        className="create"
        onClick={() => {
          handleSubmit(newForm);
        }}
      >
        {characterId ? "Update Character" : "Create Character"}{" "}
      </button>
    </>
  );
}

export default ChooseInventory;
