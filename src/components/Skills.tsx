import React from "react";
import { SKILL_LIST, Attribute } from "../consts";
import {
  calculateModifier,
  getSkillModifier,
} from "../utils/modifier.utils";

interface SkillsProps {
  attributes: Record<Attribute, number>;
  skills: Record<string, number>;
  updateSkill: (skillName: string, points: number) => void;
}

const Skills: React.FC<SkillsProps> = ({ attributes, skills, updateSkill }) => {
  const intelligenceModifier = calculateModifier(attributes["Intelligence"]);
  const totalPointsAvailable = 10 + 4 * intelligenceModifier;

  const totalPointsSpent = Object.values(skills).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const pointsRemaining = totalPointsAvailable - totalPointsSpent;

  const handleIncrement = (skillName: string) => {
    if (pointsRemaining > 0) {
      updateSkill(skillName, skills[skillName] + 1);
    }
  };

  const handleDecrement = (skillName: string) => {
    if (skills[skillName] > 0) {
      updateSkill(skillName, skills[skillName] - 1);
    }
  };

  return (
    <div>
      <h2>Skills</h2>
      <p>
        Points Available: {pointsRemaining} / {totalPointsAvailable}
      </p>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Points</th>
            <th>Modifier</th>
            <th>Total</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {SKILL_LIST.map((skill) => (
            <tr key={skill.name}>
              <td>{skill.name}</td>
              <td>{skills[skill.name]}</td>
              <td>
                ({skill.attributeModifier}): {getSkillModifier(skill, attributes)}
              </td>
              <td>{skills[skill.name] + getSkillModifier(skill, attributes)}</td>
              <td>
                <button
                  onClick={() => handleDecrement(skill.name)}
                  disabled={skills[skill.name] <= 0}
                >
                  -
                </button>
                <button
                  onClick={() => handleIncrement(skill.name)}
                  disabled={pointsRemaining <= 0}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skills;
