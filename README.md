<h1 align="center">
    CODE7<br />
    Controle de Dívidas
</h1>

<p align="center">
  <a href="#rocket-Tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#warning-Pre-requisitos">Pre requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-Como-usar">Como usar</a>
</p>

## :rocket: Tecnologias
Tecnologias utilizadas:

-  [ReactJS](https://reactjs.org/)
-  [TypeScript](https://typescriptlang.org/)
-  [Styled Components](https://styled-components.com/)
-  [axios](https://github.com/axios/axios)
-  [ESLint](https://eslint.org/)
-  [Prettier](https://prettier.io/)
-  [Yarn v1.22](https://yarnpkg.com/)
-  [VS Code](https://code.visualstudio.com/)

## :warning: Pre requisitos

<h3>Rodando a aplicação</h3>
	Com o yarn instalado:
	1. Abra o terminal dentro da pasta 'controle-dívidas' do projeto e execute 
	o comando 'yarn install' para carregar os arquivos necessários 
	para a aplicação. 
	2. Após carregar rode o comando 'yarn start' para executar a aplicação.
  3. A aplicação será aberta no browser.

  PS: As rotas de requisição dos clientes é plública 
  (https://jsonplaceholder.typicode.com/users), mas das dívidas estão 
  em uma API privada e provavelmente o acesso será negado sem uma chave de 
  autenticação. Todavia um backend poderá ser implementado com as seguintes rotas:
  ![Rotas](https://github.com/voncleyton/controle-dividas/blob/master/rotasAPI.png?raw=true)
  
  PS2: Deve ser mudado o caminho da API no arquivo 'controle-dívidas/src/services/api.ts'
## :memo: Como usar
	
	A aplicação se trata de um gerenciamento de dívidas.

  <h4> 1 - Tela Inicial (Lista de devedores) </h4> 
  Nesta tela é apresentada a lista de clientes que possuam pelo menos
  uma dívida cadastrada e um botão para cadastrar novas dívidas
	<h5>1.1 - Inserindo novas dívidas:</h5>
	Na tela inicial, clique no botão 'Adicionar dívida'. 
  Um modal com o formulário de cadastro aparecerá. Basta 
  preencher o formulário e clicar em salvar, ou cancelar a operação. 
  Se ocorrer algum erro de validação ou requisição um Toast de erro 
  será apresetado, se tudo estiver ok um Toast de sucesso será 
  apresentado, modal fechado e a lista inicial atualizada.
	
  <h5>1.2 - Excluindo todas as dívidas de um único cliente</h5>
  Na tela inicial cada item da lista representa um cliente,
  trazendo suas informações e os totais devidos por ele. Junto de cada
  item existe um botão para a exclusão rápida de todas as dívidas
  do cliente. Ao clicar, uma mensagem de cofirmação aparecerá
  e caso seja coformada, um Toast de sucesso será apresetado
  e o item excluído da lista. Caso algo de errado aconteça no processo, um Toast
  aparecerá informando o que houve.

  <h5>1.3 - Abrindo a lista de dívidas de um cliente</h5>
  Cada item da lista na tela inicial também é um link para a pagina
  que detalha as dívidas do cliente clicado.

  <h4> 2 - Tela de detalhes (Lista das dívidas de um cliente) </h4> 
	
  <h5>2.1 - Editando uma dívida do cliente</h5>
	1. A visualização nesta tela funciona da mesma forma que na tela
  inicial. É apresentada uma lista, desta vez das dívidas de um cliente 
  específico. Cada item da lista é clicavel e contém um botão ao lado para a 
  exclusão. Para editar/visualizar detalhes de uma dívida em específico, basta 
  clicar no item desejado da lista, um modal com o formulário de cadastro 
  aparecerá. Basta modificar o que precisa e clicar em salvar, ou cancelar 
  a operação. Se ocorrer algum erro de validação ou requisição um Toast de erro 
  será apresetado, se tudo estiver ok um Toast de sucesso será 
  apresentado, o modal fechado e a lista atualizada.  
	
  <h5>2.2 - Excluindo uma dívida do cliente</h5>
	Como na tela inicial, junto de cada item existe um botão para a exclusão 
  rápida. Ao clicar, uma mensagem de cofirmação aparecerá
  e caso seja coformada, um Toast de sucesso será apresetado
  e o item excluído da lista. Caso algo de errado aconteça no processo, um Toast
  aparecerá informando o que houve.

Desenvolvido por Vocleyton Martins de Souza.
