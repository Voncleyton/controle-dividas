import React from 'react';
import { FiXCircle } from 'react-icons/fi';

import Container from './styles';

interface IListItemProps {
  id: any;
  enabled: boolean;
  onDelete: (key: any) => Promise<void>;
  children: React.ReactNode;
}

const ListItem: React.FC<IListItemProps> = ({
  id,
  enabled,
  onDelete,
  children,
}) => {
  return (
    <Container enabled={enabled}>
      {children}

      <button
        type="button"
        className="deleteButton"
        onClick={() => onDelete(id)}
      >
        <FiXCircle size="30" />
      </button>
    </Container>
  );
};

export default ListItem;
