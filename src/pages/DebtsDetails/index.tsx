import React, { useEffect, useState } from 'react';
import { FiXCircle, FiChevronLeft } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import formatValue from '../../utils/formatValue';

import IDebt from '../../types/debts';
import IUser from '../../types/user';

import {
  Container,
  Header,
  DebtsList,
  ListItem,
  UserInfo,
  ListItemContent,
} from './styles';
import formatDate from '../../utils/formatDate';
import { debtsApi } from '../../services/api';
import ModalEditDebt from '../../components/ModalEditDebt';
import ToastConfig from '../../configs/ToastConfig';

interface IDebtsAPIResponse {
  result: IDebt[];
}

interface IUserTotals extends IUser {
  countOfDebts: number;
  amountOfDebts: number;
}

const DebtsDetails: React.FC = () => {
  const location = useLocation<IUserTotals>();
  const user = location.state;

  const [debts, setDebts] = useState<IDebt[]>([]);
  const [usersDebts, setUsersDebts] = useState<IDebt[]>([]);
  const [clickedDebtId, setClickedDebtId] = useState('0');
  const [clickedDebt, setClickedDebt] = useState<IDebt>({} as IDebt);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickEnabled, setClickEnabled] = useState<boolean>(true);

  const getUsersDebts = async (): Promise<void> => {
    const debtsData = await debtsApi.get<IDebtsAPIResponse>('');

    setDebts(debtsData.data.result);
  };

  useEffect(() => {
    getUsersDebts();
  }, []);

  useEffect(() => {
    const filteredListOfDebts = debts.filter(
      data => data.idUsuario === user.id,
    );

    const { countOfDebts, amountOfDebts } = filteredListOfDebts.reduce(
      (accD, debt) => {
        accD.countOfDebts += 1;
        accD.amountOfDebts += Number(debt.valor);
        return accD;
      },
      {
        countOfDebts: 0,
        amountOfDebts: 0,
      },
    );

    user.countOfDebts = countOfDebts;
    user.amountOfDebts = amountOfDebts;

    setUsersDebts(filteredListOfDebts);
  }, [user, debts]);

  const handleEditDebt = async (
    debt: Omit<IDebt, '_id' | 'criado'>,
    debtId: string,
  ): Promise<void> => {
    setClickEnabled(false);

    await debtsApi.put(`/${debtId}`, debt);

    getUsersDebts();
    setClickEnabled(true);
  };

  const handleDeleteDebt = async (debtId: string): Promise<void> => {
    try {
      const confirm = window.confirm('Deseja realmente excluir esta dívida?');

      if (!confirm) {
        return;
      }

      setClickEnabled(false);

      await debtsApi.delete(`/${debtId}`);
      getUsersDebts();

      setClickEnabled(true);

      toast.success('Dívida editada com sucesso!', ToastConfig);
    } catch (error) {
      toast.error(
        `Ocorreu algum erro ao tentar editar a dívida. ${error.message} `,
        ToastConfig,
      );
    }
  };

  const toglleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  const handleSelectClickedDebt = (debtId: string): void => {
    const filteredDebt = debts.filter(debt => debt._id === debtId)[0];

    setClickedDebt(filteredDebt);
    setClickedDebtId(filteredDebt._id);

    toglleModal();
  };

  const setButtonEnabled = (enabled: boolean) => {
    setClickEnabled(enabled);
  };

  return (
    <Container>
      {clickedDebtId && (
        <ModalEditDebt
          buttonsEnabled={clickEnabled}
          setButtonEnabled={setButtonEnabled}
          isOpen={modalOpen}
          toglleModal={toglleModal}
          user={user}
          handleEditDebt={handleEditDebt}
          debt={clickedDebt}
          debtID={clickedDebtId}
        />
      )}
      <Header>
        <Link to="/">
          <FiChevronLeft size="40" />
        </Link>
        <h1>Detalhes</h1>
      </Header>
      <UserInfo>
        <strong>{user.name}</strong>
        <span>{`Telefone: ${user.phone}`}</span>
        <span>
          {`${user.countOfDebts} dívida(s) cadastrada(s),
                  totalizando ${formatValue(user.amountOfDebts)}`}
        </span>
      </UserInfo>

      <DebtsList>
        {usersDebts.map(debt => (
          <ListItem key={debt._id} enabled={clickEnabled}>
            <ListItemContent
              className="content"
              type="button"
              onClick={() => {
                handleSelectClickedDebt(debt._id);
              }}
            >
              <div className="horizontalContent">
                <strong>Data:</strong>
                <span>{formatDate(new Date(debt.criado))}</span>
              </div>
              <div className="horizontalContent">
                <strong>Valor:</strong>
                <span>{formatValue(debt.valor)}</span>
              </div>
              <div className="horizontalContent">
                <strong>Motivo:</strong>
                <span>{debt.motivo}</span>
              </div>
            </ListItemContent>
            <button
              className="deleteButton"
              type="button"
              onClick={() => handleDeleteDebt(debt._id)}
            >
              <FiXCircle size="30" />
            </button>
          </ListItem>
        ))}
      </DebtsList>
    </Container>
  );
};

export default DebtsDetails;
