import { Attribute, Skill } from "../consts";

export const calculateModifier = (value: number): number => {
  return Math.floor((value - 10) / 2);
};

export const getSkillModifier = (
  skill: Skill,
  attributes: Record<Attribute, number>
): number => {
  const attrValue = attributes[skill.attributeModifier];
  return calculateModifier(attrValue);
};

export const getAttributesTotal = (attributes: Record<Attribute, number>): number => {
  return Object.values(attributes).reduce((acc, curr) => acc + curr, 0);
}