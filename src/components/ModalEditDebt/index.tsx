import React, { FormEvent, useEffect, useState } from 'react';
import Form from './styles';
import IUser from '../../types/user';
import Modal from '../Modal';
import IDebt from '../../types/debts';

interface IModalEditDebtProps {
  buttonsEnabled: boolean;
  isOpen: boolean;
  toglleModal: () => void;
  handleEditDebt: (
    debt: Omit<IDebt, '_id' | 'criado'>,
    debtId: string,
  ) => Promise<void>;
  debtID: string;
  debt: IDebt;
  user: IUser;
}

interface IFormData {
  motivo: string;
  valor: number;
}

const ModalEditDebt: React.FC<IModalEditDebtProps> = ({
  buttonsEnabled = false,
  isOpen,
  toglleModal,
  user,
  debtID,
  debt,
  handleEditDebt,
}) => {
  const [editedDebt, setEditedDebt] = useState(debt);

  useEffect(() => {
    setEditedDebt(debt);
  }, [debt]);

  const handleValidation = (formData: IFormData): boolean => {
    if (formData.motivo === '') {
      alert('Por favor, informe o motivo da dívida!');
      return false;
    }

    if (formData.valor <= 0) {
      alert('Por favor, informe um valor maior que Zero!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      if (!handleValidation(editedDebt)) {
        return;
      }

      // Chamada API
      await handleEditDebt(editedDebt, debtID);

      toglleModal();
    } catch (error) {
      alert(
        `Ocorreu algum erro ao tentar editar a dívida. \n ${error.message}`,
      );
    }
  };

  return (
    <Modal isOpen={isOpen} toglleModal={toglleModal}>
      <Form buttonsEnabled={buttonsEnabled} onSubmit={handleSubmit}>
        <h1>Nova Dívida</h1>

        <span>Cliente:</span>
        <select
          name="user"
          id="user"
          value={user.id}
          defaultValue={user.id}
          disabled
        >
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        </select>

        <br />

        <span>Motivo:</span>
        <textarea
          name="reason"
          id="reason"
          value={editedDebt.motivo}
          onChange={e =>
            setEditedDebt(prevState => ({
              ...prevState,
              motivo: e.target.value,
            }))
          }
        />

        <br />

        <span>Valor:</span>
        <input
          type="number"
          name="amount"
          id="amount"
          value={editedDebt.valor}
          min={0}
          onChange={e =>
            setEditedDebt(prevState => ({
              ...prevState,
              valor: parseFloat(e.target.value),
            }))
          }
          data-type="currency"
        />

        <br />
        <br />

        <div className="buttonsContainer">
          <button type="button" className="cancelButton" onClick={toglleModal}>
            <p className="text">Cancelar</p>
          </button>

          <button type="submit" className="addButton">
            <p className="text">Salvar</p>
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalEditDebt;
