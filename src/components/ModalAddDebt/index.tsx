import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Form from './styles';
import IUser from '../../types/user';
import Modal from '../Modal';
import IDebt from '../../types/debts';
import ToastConfig from '../../configs/ToastConfig';

interface IModalAddDebtProps {
  buttonsEnabled: boolean;
  setButtonEnabled: (enabled: boolean) => void;
  isOpen: boolean;
  toglleModal: () => void;
  handleAddDebt: (debt: Omit<IDebt, '_id' | 'criado'>) => Promise<void>;
  users: IUser[];
}

interface IFormData {
  idUsuario: number;
  motivo: string;
  valor: number;
}

const ModalAddDebt: React.FC<IModalAddDebtProps> = ({
  buttonsEnabled,
  setButtonEnabled,
  isOpen,
  toglleModal,
  users,
  handleAddDebt,
}) => {
  const [user, setUser] = useState(0);
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(0);

  const handleValidation = (formData: IFormData): string => {
    if (formData.idUsuario === 0) {
      return 'Por favor, informe um cliente válido!';
    }

    if (formData.motivo === '') {
      return 'Por favor, informe o motivo da dívida!';
    }

    if (formData.valor <= 0) {
      return 'Por favor, informe um valor maior que Zero!';
    }

    return '';
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

      const errorMessage = handleValidation(newDebt);
      if (errorMessage) {
        toast.error(errorMessage, ToastConfig);
        return;
      }

      // Chamada API
      await handleAddDebt(newDebt);

      clearFields();
      toglleModal();

      toast.success('Dívida cadastrada com sucesso!', ToastConfig);
    } catch (error) {
      toast.error(
        `Ocorreu algum erro ao tentar gravar a dívida. ${error.message} `,
        ToastConfig,
      );

      setButtonEnabled(true);
    }
  };

  const handleCancel = (): void => {
    clearFields();
    toglleModal();
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
          min={0}
          onChange={e => setAmount(parseFloat(e.target.value))}
          data-type="currency"
        />

        <br />
        <br />

        <div className="buttonsContainer">
          <button type="button" className="cancelButton" onClick={handleCancel}>
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
