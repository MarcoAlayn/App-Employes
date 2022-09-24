import React from 'react';
interface Props {
  size: 'small' | 'large';
}

const Loader = ({ size }: Props) => {
  return <div className={`loader ${size}`}></div>;
};

export default Loader;
