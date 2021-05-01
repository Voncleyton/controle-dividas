import React, { useEffect, useState } from 'react';
import { FiXCircle, FiXSquare, FiX } from 'react-icons/fi';

import { usersApi } from '../../services/api';
import IDebt from '../../types/debts';
import IUser from '../../types/user';

import { Container, Header, UsersList, ListItem } from './styles';

const Dashboard: React.FC = () => {
  const [debts, setDebts] = useState<IDebt[] | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);


  useEffect(() => {

    const fetchUsers = async () => {
      const usersData = await usersApi.get<IUser[]>('');
      const debtsData = await usersApi.get<IDebt[]>('');
      
      setUsers(usersData.data);
      setDebts(debtsData.data);
      
    }

    fetchUsers();

  }, []);

  const handleDeleteUsersDebits = (userId: number): void => {
    alert('Todas as dívidas deste cliente foram deletadas');    
  }

  return(
    <Container>
      <Header>
        <h1>Lista de devedores</h1>
        <button className="addButton">
          Adicionar dívida
        </button>
      </Header>
      <UsersList>
        {
          users.map(user => (
            <ListItem>
              <a href="/">
                <strong>
                  {user.name}  
                </strong>
                <span>
                  {`Telefone: ${user.phone}`}
                </span>
                <span>
                  {`x dívidas cadastradas, totalizando R$100000,00`}
                </span>
              </a>
             
              <button type="button" onClick={() => handleDeleteUsersDebits(user.id)}>
                <FiXCircle size="30" />
              </button>
            </ListItem>    
          ))
        }        
      </UsersList>
    </Container>
  );
}

export default Dashboard;