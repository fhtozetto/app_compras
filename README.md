# Comprar

Aplicativo mobile/web desenvolvido com React Native + Expo para organizar uma lista de compras.

## Sobre o projeto

O app permite:
- adicionar itens de compra;
- marcar itens como pendentes ou concluídos;
- filtrar a lista por status (Pendente ou Concluído);
- remover itens individuais;
- limpar toda a lista.

Os dados são persistidos localmente usando AsyncStorage, então os itens continuam salvos entre sessões.

## Tecnologias

- React Native
- Expo
- TypeScript
- AsyncStorage

## Como executar

### 1) Pré-requisitos

- Node.js instalado (recomendado LTS)
- npm
- Expo Go (para testar no celular, opcional)

### 2) Instalar dependências

No diretório do projeto, execute:

```bash
npm install
```

### 3) Iniciar o projeto

```bash
npm run start
```

Isso abrirá o Expo Dev Tools no terminal.

### 4) Rodar em cada plataforma

- Android:

```bash
npm run android
```

- iOS (somente macOS):

```bash
npm run ios
```

- Web:

```bash
npm run web
```

## Estrutura principal

```text
src/
  app/
    Home/           # Tela principal
  components/       # Componentes reutilizáveis (Button, Filter, Input, Item...)
  storage/          # Persistência local com AsyncStorage
  types/            # Tipagens e enums da aplicação
```

## Fluxo de uso

1. Digite um item no campo "O que você precisa comprar?".
2. Toque em "Entrar" para adicionar.
3. Use os filtros para alternar entre Pendente e Concluído.
4. Marque/desmarque status no item.
5. Remova um item individualmente ou use "Limpar" para apagar todos.

## Observações

- O projeto está configurado com a nova arquitetura do Expo/React Native (`newArchEnabled: true`).
- Alertas e confirmações possuem tratamento específico para Web e Mobile.
