# Desafio-Tunts.Rocks-2024

Desafio de pegar dados de uma planilha do google sheets, realizar cálculos dos dados de alunos e retornar para a planilha os resultados

## Comandos usados:

npm init -y
npm install googleapis

## Para rodar:

node students.js

## Configuração da Chave da API

Siga os passos abaixo para configurar a chave da API em seu ambiente de desenvolvimento:

### Requisitos

- Node.js instalado
- Conta de API ativa no [Console do Google Cloud](https://console.cloud.google.com/)

### Passos

1. Clone este repositório:
   ```bash
   git clone https://github.com/thamires20/Desafio-Tunts.Rocks-2024
   ```

## Navegue até o diretório do projeto:

cd seu-projeto

## Passos para configuração do projeto

## Criação do Projeto no Console do Google Cloud Platform (GCP):

Acesse o Console do Google Cloud Platform.
Crie um novo projeto.
Ativação da API Google Sheets:

No Console do GCP, vá para "Biblioteca".
Pesquise e ative a API do Google Sheets para o seu projeto.

## Criação de Credenciais:

No Console do GCP, vá para "Credenciais".
Crie credenciais para a API do Google Sheets.
Escolha o tipo de credencial apropriado ("Chave da Conta de Serviço").
Faça o download do arquivo JSON contendo suas credenciais.

## Configuração do Acesso à Planilha:

Compartilhe a planilha com o endereço de e-mail fornecido no campo client_email no arquivo de credenciais JSON.
Certifique-se de que a conta de serviço tenha as permissões adequadas para acessar a planilha.

## Configuração do Ambiente no Projeto:

Crie um arquivo chamado credentials.json na raiz do projeto.
Adicione as credenciais JSON ao arquivo credentials.json.

## Uso das Credenciais no Código:

O arquivo já esta importado no students.js somente verifique e se precisar modifique, ou importe novamente.
