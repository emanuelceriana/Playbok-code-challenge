import React from 'react';

import { Modal } from 'antd';

interface Props {
  visible: boolean;
  handleModal: Function;
  title: string;
  amount: string;
  prevAmount: string;
}

const TransactionModal: React.FC<Props> = ({
  visible,
  handleModal,
  title,
  amount,
  prevAmount
}): JSX.Element => {
  return (
    <div>
      <Modal
        title={
          <span>
            Transaction <strong>{title}</strong> already exist
          </span>
        }
        visible={visible}
        onOk={() => {
          handleModal({ title, amount });
        }}
        onCancel={() => {
          handleModal();
        }}
        okText="OK"
        cancelText="Cancel"
      >
        <p>If you continue the previous value will be overwritten:</p>
        <p>
          Before: <del>{prevAmount}</del>
        </p>
        <p>
          After: <ins>{amount}</ins>
        </p>
      </Modal>
    </div>
  );
};

export default TransactionModal;
