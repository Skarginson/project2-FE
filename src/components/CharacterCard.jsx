import "../homepage.css";
import { API_BASE_URL } from "../consts";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CharacterCard({ author, name, id, deleteCard, role }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await axios.delete(`${API_BASE_URL}/characters/${id}`);
  };
  return (
    <>
      {" "}
      <div className="refRelative">
        <div onClick={() => navigate(`/details/${id}`)} className="homeCard">
          <h1>{name}</h1>
          <img src={`${API_BASE_URL}/image/${role}.jpg`} alt={role} />
          <i>By {author}</i>
        </div>
        <button
          className="deleteBtn"
          onClick={() => {
            handleDelete();
            deleteCard();
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default CharacterCard;
