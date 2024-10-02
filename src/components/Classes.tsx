import React, { useState } from "react";
import { CLASS_LIST, Attribute } from "../consts";

interface ClassesProps {
  attributes: Record<Attribute, number>;
}

const Classes: React.FC<ClassesProps> = ({ attributes }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const checkRequirements = (className: string): boolean => {
    const requirements = CLASS_LIST[className];
    for (let attr in requirements) {
      if (attributes[attr as Attribute] < requirements[attr as Attribute]) {
        return false;
      }
    }
    return true;
  };

  const handleClassClick = (className: string) => {
    setSelectedClass((prev) => (prev === className ? null : className));
  };

  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {Object.keys(CLASS_LIST).map((className) => (
          <li
            key={className}
            style={{
              cursor: "pointer",
              backgroundColor: checkRequirements(className)
                ? "lightgreen"
                : "lightcoral",
              margin: "5px",
              padding: "10px",
              borderRadius: "5px",
            }}
            onClick={() => handleClassClick(className)}
          >
            {className}
            {selectedClass === className && (
              <div style={{ marginTop: "10px" }}>
                <strong>Requirements:</strong>
                <ul>
                  {Object.entries(CLASS_LIST[className]).map(
                    ([attr, value]) => (
                      <li key={attr}>
                        {attr}: {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classes;
