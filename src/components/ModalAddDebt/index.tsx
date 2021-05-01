import React, { FormEvent, useState } from 'react';
import {debitsApi} from '../../services/api';
import { Form } from './styles';
import IUser from '../../types/user';

interface IModalAddDebtProps {
  users: IUser[];
}

interface IFormData {
  idUsuario: number,
  motivo: string,
  valor: number
}

const ModalAddDebt: React.FC<IModalAddDebtProps> = ({users}) => {
  const [user, setUser] = useState(0);
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(0);

  const handleChange =  (event: any): void => {
    const { target } = event;
    const value = target.value;
    const name = target.name;


    switch (name) {
      case 'user':
        setUser(parseInt(value));
        break;
      case 'reason':
        setReason(value);
        break;
      case 'amount':
        setAmount(parseFloat(value));
        break;  
      default:
        break;
    }
  }

  const HandleValidation = (formData: IFormData): Boolean => {
    if (formData.idUsuario === 0) {
      alert('Por favor, informe um cliente válido!');
      return false;
    };
    
    if (formData.motivo === '') {
      alert('Por favor, informe o motivo da dívida!');
      return false;
    };

    if (formData.valor <= 0) {
      alert('Por favor, informe um valor maior que Zero!');
      return false;
    }

    return true;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => { 
    event.preventDefault();   
    
    const body = {
      "idUsuario": user,
      "motivo": reason,
      "valor": amount
    };
    
    HandleValidation(body);

    //Chamada API
    await debitsApi.post('/', body);

    clearFields();
  }

  const clearFields = () => {
    setUser(0);
    setReason('');
    setAmount(0);    
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Nova Dívida</h1>
      
      <span>Cliente:</span>
      <select 
        name="user" 
        id="user"
        value={user}
        onChange={handleChange}
      >
        <option value={0}> - </option>  
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <br/>

      <span>Motivo:</span>
      <textarea 
        name="reason" 
        id="reason" 
        value={reason}
        onChange={handleChange}>
      </textarea>

      <br/>

      <span>Valor:</span>
      <input 
        type= "number" 
        name="amount" 
        id="amount"
        value={amount}
        onChange={handleChange} 
        data-type="currency"
      />  

      <br/><br/>    

      <button type="submit">
        <p className="text">Adicionar Dívida</p>
      </button>
    </Form>
  );
}

export default ModalAddDebt;