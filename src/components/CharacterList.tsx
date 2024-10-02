import React from "react";

interface CharacterListProps {
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (id: number) => void;
  onAddCharacter: () => void;
  onDeleteCharacter: (id: number) => void;
}

interface Character {
  id: number;
  name: string;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  selectedCharacterId,
  onSelectCharacter,
  onAddCharacter,
  onDeleteCharacter,
}) => {
  return (
    <div>
      <h2>Characters</h2>
      <button onClick={onAddCharacter}>Add New Character</button>
      <ul>
        {characters.map((char) => (
          <li key={char.id} style={{ margin: "5px" }}>
            <span
              style={{
                cursor: "pointer",
                fontWeight: char.id === selectedCharacterId ? "bold" : "normal",
              }}
            >
              {char.name}
            </span>
            <button
              onClick={() => onSelectCharacter(char.id)}
              style={{ marginLeft: "10px" }}
            >
              View Character
            </button>
            <button
              onClick={() => onDeleteCharacter(char.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
