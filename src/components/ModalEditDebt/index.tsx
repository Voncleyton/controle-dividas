import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Form from './styles';
import IUser from '../../types/user';
import Modal from '../Modal';
import IDebt from '../../types/debts';
import ToastConfig from '../../configs/ToastConfig';

interface IModalEditDebtProps {
  buttonsEnabled: boolean;
  setButtonEnabled: (enabled: boolean) => void;
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
  setButtonEnabled,
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
  }, [debt, isOpen]);

  const handleValidation = (formData: IFormData): string => {
    if (formData.motivo === '') {
      return 'Por favor, informe o motivo da dívida!';
    }

    if (formData.valor <= 0) {
      return 'Por favor, informe um valor maior que Zero!';
    }

    return '';
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      const errorMessage = handleValidation(editedDebt);
      if (errorMessage) {
        toast.error(errorMessage, ToastConfig);
        return;
      }

      // Chamada API
      await handleEditDebt(editedDebt, debtID);

      toglleModal();

      toast.success('Dívida editada com sucesso!', ToastConfig);
    } catch (error) {
      toast.error(
        `Ocorreu algum erro ao tentar editar a dívida. ${error.message} `,
        ToastConfig,
      );

      setButtonEnabled(true);
    }
  };

  return (
    <Modal isOpen={isOpen} toglleModal={toglleModal}>
      <Form buttonsEnabled={buttonsEnabled} onSubmit={handleSubmit}>
        <h1>Nova Dívida</h1>

        <span>Cliente:</span>
        <select name="user" id="user" defaultValue={user.id} disabled>
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
          step=".01"
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
