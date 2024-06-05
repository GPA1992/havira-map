# Hávira Frontend Teste

## Descrição

O **Hávira Web Map** é uma aplicação web interativa que coleta informações de usuários a partir de uma API e exibe esses dados de maneira visual e intuitiva. Com essa aplicação, é possível listar os usuários em uma tabela detalhada e visualizar suas localizações geográficas em um mapa interativo utilizando a biblioteca Leaflet.

### <a href="https://havira-map-zeip.vercel.app/" target="_blank">Aplicação Online:  https://havira-map-zeip.vercel.app/</a>

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Next.js 14**: Framework de React para desenvolvimento de aplicações web modernas e performáticas.
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida e customizável.
- **ShadCN**: Ferramenta para construção de componentes de UI.
- **React Query (TanStack)**: Biblioteca para gerenciamento de estado e cache de dados assíncronos.
- **Docker**: Plataforma para criação e gerenciamento de contêineres, garantindo um ambiente de desenvolvimento e produção consistente.
- **Redux**: Biblioteca para gerenciamento de estado global da aplicação.

## Funcionalidades

- **Coleta de Dados**: A aplicação se conecta a uma API externa para coletar dados dos usuários.
- **Gerenciar Usuários**: É possivel adicionar e excluir usuarios.
- **Listagem de Usuários**: Exibição dos usuários em uma tabela com filtros e opções para o gerenciamento dos usuários.
- **Mapa Interativo**: Visualização das localizações dos usuários em um mapa interativo, é possivel clicar para obter informações dos usuários.

## Instalação e Execução

Para executar esta aplicação localmente, siga os passos abaixo:

1. Clone este repositório:
    ```bash
    git clone <URL do repositório>
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd <diretório do projeto>
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
    ou
     ```bash
    yarn
    ```
4. Inicie a aplicação:
    ```bash
    npm run dev
    ```
    ou
    ```bash
    yarn run dev
    ```
   ### acesse: 
   Para conferir a execução
   > <a href="http://localhost:3000">http://localhost:3000</a>

   
5. Para executar a aplicação em um contêiner Docker:
    ```bash
    docker-compose up --build -d
    ```
   ### acesse: 
   Para conferir a execução
   > <a href="http://localhost:3000">http://localhost:3000</a>
