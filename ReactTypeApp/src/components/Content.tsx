import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface Props {
  courseParts: CoursePart[];
}

const Content: React.FC<Props> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <p key={index}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  );
}

export default Content;