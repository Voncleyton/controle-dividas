import axios, { AxiosInstance } from 'axios';
import React, { useEffect, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ModalAddDebt from '../../components/ModalAddDebt';

import { debtsApi, usersApi } from '../../services/api';
import formatValue from '../../utils/formatValue';

import IDebt from '../../types/debts';
import IUser from '../../types/user';

import { Container, Header, UsersList, ListItem } from './styles';

interface IDebtsAPIResponse {
  result: IDebt[];
}

interface IUserTotals extends IUser {
  countOfDebts: number;
  amountOfDebts: number;
}

const Dashboard: React.FC = () => {
  const [debts, setDebts] = useState<IDebt[]>([]);
  const [usersList, setUsers] = useState<IUser[]>([]);
  const [usersWithDebtsList, setUsersWithDebtsList] = useState<IUserTotals[]>(
    [],
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickEnabled, setClickEnabled] = useState<boolean>(true);

  const getUsers = async (): Promise<void> => {
    const usersData = await usersApi.get<IUser[]>('');
    setUsers(usersData.data);
  };

  const getDebts = async (): Promise<void> => {
    const debtsData = await debtsApi.get<IDebtsAPIResponse>('');

    setDebts(debtsData.data.result);
  };

  useEffect(() => {
    getUsers();
    getDebts();
  }, []);

  // Filtar apenas os clientes que contém dívidas cadastradas e calcular totais
  useEffect(() => {
    const usersWithDebts = usersList.filter(user => {
      return debts?.some(debt => debt.idUsuario === user.id);
    });

    const usersListWithDebtsTotals = usersWithDebts.reduce(
      (accU: IUserTotals[], user: IUser) => {
        const { countOfDebts, amountOfDebts } = debts.reduce(
          (accD, debt) => {
            if (debt.idUsuario === user.id) {
              accD.countOfDebts += 1;
              accD.amountOfDebts += Number(debt.valor);
            }

            return accD;
          },
          {
            countOfDebts: 0,
            amountOfDebts: 0,
          },
        );

        accU.push({
          id: user.id,
          name: user.name,
          phone: user.phone,
          countOfDebts,
          amountOfDebts,
        });

        return accU;
      },
      [],
    );

    setUsersWithDebtsList(usersListWithDebtsTotals);
  }, [debts, usersList]);

  const handleAddDebt = async (
    debt: Omit<IDebt, '_id' | 'criado'>,
  ): Promise<void> => {
    setClickEnabled(false);

    await debtsApi.post('/', debt);

    getDebts();
    setClickEnabled(true);
  };

  const handleDeleteUsersDebts = async (userId: number): Promise<void> => {
    setClickEnabled(false);

    const deleteRequests: Promise<AxiosInstance>[] = [];

    debts.forEach(
      async (debt): Promise<void> => {
        if (debt.idUsuario === userId) {
          deleteRequests.push(debtsApi.delete(`/${debt._id}`));
        }
      },
    );

    axios.all(deleteRequests).then(() => {
      getDebts();
      setClickEnabled(true);
    });
  };

  const toglleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  return (
    <Container>
      <ModalAddDebt
        buttonsEnabled={clickEnabled}
        isOpen={modalOpen}
        toglleModal={toglleModal}
        users={usersList}
        handleAddDebt={handleAddDebt}
      />
      <Header>
        <h1>Lista de devedores</h1>
        <button type="button" onClick={toglleModal}>
          Adicionar dívida
        </button>
      </Header>
      <UsersList>
        {usersWithDebtsList.map(user => (
          <ListItem key={user.id} enabled={clickEnabled}>
            <Link
              to={{
                pathname: '/details',
                state: user,
              }}
            >
              <strong>{user.name}</strong>
              <span>{`Telefone: ${user.phone}`}</span>
              <span>{`${user.countOfDebts} dívida(s) cadastrada(s),
                  totalizando ${formatValue(user.amountOfDebts)}`}</span>
            </Link>

            <button
              type="button"
              onClick={() => handleDeleteUsersDebts(user.id)}
            >
              <FiXCircle size="30" />
            </button>
          </ListItem>
        ))}
      </UsersList>
    </Container>
  );
};

export default Dashboard;
