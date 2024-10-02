import React, { useState, useEffect } from "react";
import Attributes from "./components/Attributes";
import Classes from "./components/Classes";
import Skills from "./components/Skills";
import CharacterList from "./components/CharacterList";
import { Attribute, SKILL_LIST, Character } from "./consts";
import { saveCharacter, getCharacter } from "./services/api";
import { getSkillModifier } from "./utils/modifier.utils";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );

  // Fetch characters from API on mount
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacter();

        if (data && data.body && Array.isArray(data.body.characters)) {
          const fetchedCharacters = data.body.characters;
          setCharacters(fetchedCharacters);
          if (fetchedCharacters.length > 0) {
            setSelectedCharacterId(fetchedCharacters[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, []);

  // Handle saving characters to API
  const handleSave = async () => {
    const characterData = {
      characters,
    };

    for (const character of characterData.characters) {
      // Calculate modifiers for attributes
      const characterSkills = character.skills;
      const characterAttributes = character.attributes;
      SKILL_LIST.forEach((skill) => {
        const skillModifier = getSkillModifier(skill, characterAttributes);
        characterSkills[skill.name] =
          characterSkills[skill.name] + skillModifier;
      });
    }

    try {
      await saveCharacter(characterData);
      alert("Characters saved successfully!");
    } catch (error) {
      console.error("Error saving characters:", error);
    }
  };

  // Handle adding a new character
  const handleAddCharacter = () => {
    const newId =
      characters.length > 0 ? Math.max(...characters.map((c) => c.id)) + 1 : 1;
    const newCharacter: Character = {
      id: newId,
      name: `Character ${characters.length + 1}`,
      attributes: {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      },
      skills: SKILL_LIST.reduce((acc, skill) => {
        acc[skill.name] = 0;
        return acc;
      }, {} as Record<string, number>),
    };
    setCharacters((prev) => [...prev, newCharacter]);
  };

  // Handle selecting a character
  const handleSelectCharacter = (id: number | string) => {
    const character = characters.find((char) => char.id === id);
    if (character) {
      setSelectedCharacterId(character.id);
    }
  };

  // Handle deleting a character
  const handleDeleteCharacter = (id: number | string) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
    if (selectedCharacterId === id) {
      setSelectedCharacterId(null);
    }
  };

  // Function to update a selected character's attribute
  const updateSelectedCharacterAttributes = (
    attr: Attribute,
    value: number
  ) => {
    setCharacters((prev) =>
      prev.map((char) => {
        if (char.id === selectedCharacterId) {
          // Update the attribute
          const updatedAttributes = {
            ...char.attributes,
            [attr]: value,
          };

          return {
            ...char,
            attributes: updatedAttributes,
          };
        }
        return char;
      })
    );
  };

  // Function to update a selected character's skill
  const updateSelectedCharacterSkills = (skillName: string, points: number) => {
    setCharacters((prev) =>
      prev.map((char) => {
        if (char.id === selectedCharacterId) {
          return {
            ...char,
            skills: {
              ...char.skills,
              [skillName]: points,
            },
          };
        }
        return char;
      })
    );
  };

  // Find the selected character
  const selectedCharacter = characters.find(
    (char) => char.id === selectedCharacterId
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tabletop RPG Character Sheet</h1>
      <CharacterList
        characters={characters}
        selectedCharacterId={selectedCharacterId}
        onSelectCharacter={handleSelectCharacter}
        onAddCharacter={handleAddCharacter}
        onDeleteCharacter={handleDeleteCharacter}
      />
      {selectedCharacter && (
        <>
          <Attributes
            attributes={selectedCharacter.attributes}
            updateAttribute={updateSelectedCharacterAttributes}
          />
          <Classes attributes={selectedCharacter.attributes} />
          <Skills
            attributes={selectedCharacter.attributes}
            skills={selectedCharacter.skills}
            updateSkill={updateSelectedCharacterSkills}
          />
        </>
      )}
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Save Characters
      </button>
    </div>
  );
};

export default App;
