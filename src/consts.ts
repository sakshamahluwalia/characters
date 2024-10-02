// src/consts.ts

export const ATTRIBUTE_LIST: Attribute[] = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
];

export const CLASS_LIST: ClassList = {
  'Barbarian': {
      'Strength': 14,
      'Dexterity': 9,
      'Constitution': 9,
      'Intelligence': 9,
      'Wisdom': 9,
      'Charisma': 9,
  },
  'Wizard': {
      'Strength': 9,
      'Dexterity': 9,
      'Constitution': 9,
      'Intelligence': 14,
      'Wisdom': 9,
      'Charisma': 9,
  },
  'Bard': {
      'Strength': 9,
      'Dexterity': 9,
      'Constitution': 9,
      'Intelligence': 9,
      'Wisdom': 9,
      'Charisma': 14,
  },
}

export const SKILL_LIST: Skill[] = [
  { name: 'Acrobatics', attributeModifier: 'Dexterity' },
  { name: 'Animal Handling', attributeModifier: 'Wisdom' },
  { name: 'Arcana', attributeModifier: 'Intelligence' },
  { name: 'Athletics', attributeModifier: 'Strength' },
  { name: 'Deception', attributeModifier: 'Charisma' },
  { name: 'History', attributeModifier: 'Intelligence' },
  { name: 'Insight', attributeModifier: 'Wisdom' },
  { name: 'Intimidation', attributeModifier: 'Charisma' },
  { name: 'Investigation', attributeModifier: 'Intelligence' },
  { name: 'Medicine', attributeModifier: 'Wisdom' },
  { name: 'Nature', attributeModifier: 'Intelligence' },
  { name: 'Perception', attributeModifier: 'Wisdom' },
  { name: 'Performance', attributeModifier: 'Charisma' },
  { name: 'Persuasion', attributeModifier: 'Charisma' },
  { name: 'Religion', attributeModifier: 'Intelligence' },
  { name: 'Sleight of Hand', attributeModifier: 'Dexterity' },
  { name: 'Stealth', attributeModifier: 'Dexterity' },
  { name: 'Survival', attributeModifier: 'Wisdom' },
]

// Type Definitions
export type Attribute =
  | 'Strength'
  | 'Dexterity'
  | 'Constitution'
  | 'Intelligence'
  | 'Wisdom'
  | 'Charisma';

export interface ClassRequirements {
  [key: string]: number;
}

export interface ClassList {
  [className: string]: ClassRequirements;
}

export interface Skill {
  name: string;
  attributeModifier: Attribute;
}

export interface Character {
  id: number; // Using number for unique identifiers
  name: string;
  attributes: Record<Attribute, number>;
  skills: Record<string, number>;
}