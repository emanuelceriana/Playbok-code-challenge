import React from 'react';

import './styles/Title.css';

interface Props {
  content: string;
  tag?: string;
}

const Title: React.FC<Props> = ({ content, tag = 'h1' }): JSX.Element => {
  return React.createElement(tag, null, content);
};

export default Title;
