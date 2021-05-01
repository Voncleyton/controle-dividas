import React, { FormEvent, useState } from 'react';
import Form from './styles';
import IUser from '../../types/user';
import Modal from '../Modal';
import IDebt from '../../types/debts';

interface IModalAddDebtProps {
  buttonsEnabled: boolean;
  isOpen: boolean;
  toglleModal: () => void;
  handleAddDebt: (debit: Omit<IDebt, '_id' | 'criado'>) => Promise<void>;
  users: IUser[];
}

interface IFormData {
  idUsuario: number;
  motivo: string;
  valor: number;
}

const ModalAddDebt: React.FC<IModalAddDebtProps> = ({
  buttonsEnabled,
  isOpen,
  toglleModal,
  users,
  handleAddDebt,
}) => {
  const [user, setUser] = useState(0);
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(0);

  const handleValidation = (formData: IFormData): boolean => {
    if (formData.idUsuario === 0) {
      alert('Por favor, informe um cliente válido!');
      return false;
    }

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

  const clearFields = () => {
    setUser(0);
    setReason('');
    setAmount(0);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      const newDebt = {
        idUsuario: user,
        motivo: reason,
        valor: amount,
      };

      if (!handleValidation(newDebt)) {
        return;
      }

      // Chamada API
      await handleAddDebt(newDebt);

      clearFields();

      // toglleModal();
    } catch (error) {
      alert(
        `Ocorreu algum erro ao tentar gravar a dívida. \n ${error.message}`,
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
          value={user}
          onChange={e => setUser(parseInt(e.target.value, 10))}
        >
          <option value={0}> - </option>
          {users.map(userItem => (
            <option key={userItem.id} value={userItem.id}>
              {userItem.name}
            </option>
          ))}
        </select>

        <br />

        <span>Motivo:</span>
        <textarea
          name="reason"
          id="reason"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />

        <br />

        <span>Valor:</span>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
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

export default ModalAddDebt;
