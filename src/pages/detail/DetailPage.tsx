import React from 'react';
import { useParams } from 'react-router-dom';

type MathParams = {
  id: string;
};

export const DetailPage: React.FC = () => {
  var params = useParams<MathParams>();
  return <h1>tour id: {params.id}</h1>;
};
