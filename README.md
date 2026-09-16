# Agro Radar

Sistema web desenvolvido para aplicações de Internet das Coisas no contexto agrícola, integrando dispositivos de campo, processamento backend, mensageria, persistência de dados e uma interface web para acompanhamento das informações.

O projeto foi construído utilizando uma arquitetura composta por diferentes serviços, executados de forma integrada através de Docker Compose.

---

## Objetivo

O Agro Radar foi desenvolvido com o objetivo de explorar a integração entre sistemas web e dispositivos IoT aplicados ao agronegócio.

A aplicação permite que informações provenientes de dispositivos ou sensores sejam recebidas, processadas, armazenadas e disponibilizadas para consulta por meio de uma interface web.

O projeto também explora conceitos como:

- comunicação assíncrona;
- mensageria;
- comunicação MQTT;
- APIs REST;
- autenticação;
- persistência de dados;
- containerização;
- proxy reverso;
- integração entre múltiplos serviços.

---

## Arquitetura

A aplicação é composta por diferentes componentes responsáveis por funções específicas.

```text
Dispositivos / Sensores IoT
            |
            | MQTT
            v
     Spring Boot API
       /          \
      /            \
PostgreSQL       RabbitMQ
      |
      v
   REST API
      |
      v
   Next.js
      |
      v
    Nginx
      |
      v
   Usuário
````

A infraestrutura completa pode ser executada utilizando Docker Compose.

---

## Backend

O backend principal foi desenvolvido utilizando:

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* Bean Validation
* PostgreSQL
* JWT
* RabbitMQ
* MQTT
* OpenAPI / Swagger
* Spring Mail

O backend concentra as regras de negócio e é responsável pela comunicação com os demais componentes da aplicação.

---

## API REST

A aplicação disponibiliza uma API REST construída com Spring Boot.

Entre as responsabilidades da API estão:

* recebimento e processamento de dados;
* persistência das informações;
* autenticação e autorização;
* comunicação com sistemas externos;
* integração com mensageria;
* disponibilização dos dados para o frontend.

A documentação da API utiliza OpenAPI/Swagger.

---

## Comunicação MQTT

O projeto utiliza MQTT para comunicação com dispositivos IoT.

A integração foi implementada utilizando o cliente Eclipse Paho.

O MQTT é adequado para esse tipo de aplicação por utilizar um modelo publish/subscribe e possuir baixo overhead de comunicação, características úteis em cenários envolvendo dispositivos conectados e redes com recursos limitados.

Fluxo simplificado:

```text
Dispositivo
    |
    | publica mensagem
    v
MQTT Broker
    |
    | entrega mensagem
    v
Backend
    |
    v
Processamento e persistência
```

---

## Mensageria com RabbitMQ

RabbitMQ é utilizado como mecanismo de mensageria dentro da arquitetura.

Isso permite separar determinadas operações do processamento principal da aplicação e trabalhar com comunicação assíncrona entre componentes.

```text
Producer
   |
   v
RabbitMQ
   |
   v
Consumer
```

A utilização de mensageria permite explorar conceitos importantes em sistemas distribuídos, como:

* desacoplamento;
* processamento assíncrono;
* filas de mensagens;
* produtores e consumidores.

---

## Persistência

O sistema utiliza PostgreSQL como banco de dados relacional.

A comunicação entre a aplicação Java e o banco utiliza:

* Spring Data JPA
* Hibernate

O banco é executado em um container próprio e utiliza volume Docker para persistência dos dados.

---

## Autenticação e segurança

O backend utiliza Spring Security para implementação das regras de segurança da aplicação.

A autenticação utiliza JSON Web Tokens (JWT).

Fluxo simplificado:

```text
Usuário
   |
   | credenciais
   v
Backend
   |
   | validação
   v
JWT
   |
   | token
   v
Requisições autenticadas
```

---

## Frontend

A interface web foi desenvolvida utilizando:

* Next.js
* React
* TypeScript
* Tailwind CSS

O frontend é responsável pela interação com o usuário e pelo consumo dos serviços disponibilizados pelo backend.

---

## Infraestrutura

A aplicação utiliza Docker para padronizar o ambiente de execução.

Os principais componentes executados em containers são:

```text
Docker Compose
|
├── Spring Boot API
├── Next.js
├── PostgreSQL
├── RabbitMQ
└── Nginx
```

Essa abordagem permite iniciar grande parte da infraestrutura necessária utilizando um único comando.

---

## Nginx

O Nginx é utilizado como proxy reverso na frente dos serviços da aplicação.

Ele permite centralizar o acesso aos componentes web e encaminhar as requisições para os serviços responsáveis.

```text
Cliente
   |
   v
 Nginx
 /    \
v      v
Next   API
```

---

## Tecnologias utilizadas

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* Bean Validation
* Maven

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Banco de dados

* PostgreSQL

### IoT e comunicação

* MQTT
* Eclipse Paho

### Mensageria

* RabbitMQ
* Spring AMQP

### Infraestrutura

* Docker
* Docker Compose
* Nginx

### Documentação

* OpenAPI
* Swagger

---

## Estrutura do repositório

```text
agro-radar/
├── agro-radar-java/
├── agro-radar-next-new/
├── agro-radar-node/
├── nginx/
├── docker-compose.yml
└── README.md
```

### `agro-radar-java/`

Backend principal desenvolvido utilizando Java e Spring Boot.

### `agro-radar-next-new/`

Interface web desenvolvida utilizando Next.js e React.

### `agro-radar-node/`

Componente e experimentos relacionados ao ecossistema Node.js desenvolvidos durante a evolução do projeto.

### `nginx/`

Configuração do proxy reverso utilizado pela aplicação.

### `docker-compose.yml`

Orquestra os principais serviços necessários para execução do ambiente.

---

## Executando o projeto

### Pré-requisitos

É necessário possuir:

* Git
* Docker
* Docker Compose

Clone o repositório:

```bash
git clone https://github.com/ErikMaia/agro-radar.git
cd agro-radar
```

Configure as variáveis de ambiente e credenciais necessárias antes da execução.

Em seguida:

```bash
docker compose up --build
```

O Docker Compose será responsável por iniciar os diferentes componentes da aplicação.

---

## Configuração

Credenciais e informações sensíveis não devem ser armazenadas diretamente no código-fonte.

Recomenda-se utilizar um arquivo `.env` não versionado para valores como:

```env
POSTGRES_USER=
POSTGRES_PASSWORD=

SPRING_MAIL_USERNAME=
SPRING_MAIL_PASSWORD=

JWT_SECRET=
```

O arquivo `.env` deve ser incluído no `.gitignore`.

---

## Conceitos explorados

O projeto envolve conceitos de diferentes áreas do desenvolvimento de software:

* desenvolvimento backend;
* APIs REST;
* Internet das Coisas;
* comunicação MQTT;
* sistemas distribuídos;
* mensageria;
* autenticação e autorização;
* bancos de dados relacionais;
* persistência com ORM;
* desenvolvimento frontend;
* containerização;
* proxy reverso;
* integração entre serviços.

---

## Principais desafios

Durante o desenvolvimento do projeto foram explorados desafios como:

* integrar diferentes tecnologias dentro de uma única arquitetura;
* receber informações provenientes de dispositivos IoT;
* trabalhar com comunicação assíncrona;
* integrar MQTT e RabbitMQ ao backend;
* organizar a comunicação entre frontend e API;
* persistir os dados recebidos;
* configurar autenticação;
* executar diferentes componentes através de containers;
* configurar o Nginx como ponto de entrada da aplicação.

---

## Contexto

O Agro Radar foi desenvolvido como projeto acadêmico relacionado à aplicação de tecnologias computacionais no agronegócio.

Além da implementação das funcionalidades, o projeto serviu como estudo prático de integração entre desenvolvimento web, IoT, mensageria, bancos de dados e infraestrutura.

---

## Autor

**Erik Silva Maia**

* GitHub: [@ErikMaia](https://github.com/ErikMaia)
* LinkedIn: [Erik Silva Maia](https://www.linkedin.com/in/erik-silva-maia/)

---

## Status

Projeto acadêmico concluído e mantido como demonstração da arquitetura, integrações e tecnologias utilizadas durante seu desenvolvimento.

```

Tem um ponto mais importante que o README: **troque imediatamente a credencial de e-mail que está atualmente versionada no `docker-compose.yml`**, mesmo que ela já não seja usada. Como ela entrou no Git, apenas editar o arquivo não torna a credencial antiga segura; a rotação é necessária.

E, olhando como recrutador, depois dessa documentação eu considero o `agro-radar` um candidato bem mais forte para ser **pinned** no seu perfil: ele prova integração, backend, segurança, mensageria, IoT, frontend e infraestrutura em um único projeto.
```
