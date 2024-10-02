import React from "react";
import { ATTRIBUTE_LIST, Attribute } from "../consts";
import { calculateModifier, getAttributesTotal } from "../utils/modifier.utils";

interface AttributesProps {
  attributes: Record<Attribute, number>;
  updateAttribute: (attr: Attribute, value: number) => void;
}

const Attributes: React.FC<AttributesProps> = ({
  attributes,
  updateAttribute,
}) => {
  const handleIncrement = (attr: Attribute) => {
    if (getAttributesTotal(attributes) < 70) {
      updateAttribute(attr, attributes[attr] + 1);
    }
  };

  const handleDecrement = (attr: Attribute) => {
    if (getAttributesTotal(attributes) > 0) {
      updateAttribute(attr, attributes[attr] - 1);
    }
  };

  const displayModifier = (value: number): string => {
    const mod = calculateModifier(value);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <div>
      <h2>Attributes</h2>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
            <th>Modifier</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {ATTRIBUTE_LIST.map((attr) => (
            <tr key={attr}>
              <td>{attr}</td>
              <td>{attributes[attr]}</td>
              <td>{displayModifier(attributes[attr])}</td>
              <td>
                <button
                  onClick={() => handleDecrement(attr)}
                  disabled={attributes[attr] <= 0}
                >
                  -
                </button>
                <button
                  onClick={() => handleIncrement(attr)}
                  disabled={attributes[attr] >= 70}
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

export default Attributes;
