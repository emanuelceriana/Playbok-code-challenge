import React, { useImperativeHandle, useState } from 'react';

import { Col, Input, Row } from 'antd';

import './styles/GenericInput.css';

import { ValidationRules, ValidationMessages } from '../utils/Validation';

interface Props {
  id?: string;
  title: string;
  value: string;
  type: string;
  onChange: Function;
}

type InputValidtion = {
  validate: () => void;
};

const GenericInput: React.ForwardRefRenderFunction<InputValidtion, Props> = (
  { id, title, value, type, onChange },
  ref
): JSX.Element => {
  const [isValid, setIsValid] = useState(true);

  useImperativeHandle(ref, () => ({
    validate() {
      const validation = ValidationRules[type](value);
      setIsValid(Boolean(validation));
      return validation;
    }
  }));

  return (
    <Row align="bottom" justify="start" className="Generic-input">
      <Col xs={16} sm={10} md={10} lg={10}>
        <h3>{title}</h3>
      </Col>
      <Col xs={16} sm={14} md={14} lg={14}>
        {!isValid &&
          ValidationMessages[type](value).map((error, idx) => {
            return (
              <p key={idx} style={{ textAlign: 'start', color: 'red', margin: '0' }}>
                {error}
              </p>
            );
          })}
        <Input
          id={id}
          placeholder={title}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </Col>
    </Row>
  );
};

export default React.forwardRef(GenericInput);
