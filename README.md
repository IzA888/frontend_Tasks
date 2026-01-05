Perfeito 🙂
# 🖥️ Documentação Frontend – Tasks App

Este documento descreve a arquitetura, estrutura e fluxo do **frontend da aplicação Tasks**, desenvolvido em **Angular**.


## 🔹 Tecnologias Utilizadas

* **Angular (standalone components)**
* **TypeScript**
* **Angular Material**
* **RxJS**
* **HTTP Client**
* **JWT + XSRF (CSRF Token)**


## 🧠 Tipo de Arquitetura

O frontend segue uma **arquitetura baseada em componentes e serviços**, com **estado centralizado via Services (RxJS)**.

```
Componentes → Services → Backend (API REST)
```


## 📁 Estrutura de Pastas

```
src/
 ├── app/
 │   ├── tasks/
 │   │   ├── tasks.component.ts
 │   │   ├── tasks-list.component.ts
 │   │   ├── task.service.ts
 │   │
 │   ├── user/
 │   │   ├── user.component.ts
 │   │   ├── user-auth-dialog/
 │   │   ├── user-login/
 │   │   ├── user-add/
 │   │   ├── user.service.ts
 │   │
 │   ├── interceptors/
 │   │   └── auth.interceptor.ts
 │   │
 │   ├── models/
 │   │   ├── user.model.ts
 │   │   └── task.model.ts
 │   │
 │   └── app.component.ts
```


## 🧩 Componentes Principais

### AppComponent

* Componente principal da aplicação
* Controla:

  * Abertura do **pop-up de login/cadastro**
  * Layout (sidebar, toolbar)
  * Inicialização da sessão do usuário

---

### UserComponent

* Exibe informações do usuário logado
* Depende do estado vindo do `UserService`
* Mostra loading enquanto os dados não carregam

---

### UserAuthDialogComponent

* Modal de autenticação
* Contém:

  * Login
  * Cadastro
* Retorna os dados para o `AppComponent` via `afterClosed()`

---

### TasksComponent

* Componente container das tarefas
* Responsável por:

  * Criar tarefas
  * Orquestrar lista de tarefas

---

### TasksListComponent

* Lista as tarefas do usuário
* Reage a:

  * Criação
  * Atualização
  * Exclusão


## 🔄 Services

### UserService

Responsável por:

* Login e cadastro
* Armazenar token JWT
* Controlar o estado do usuário logado

Utiliza **BehaviorSubject** para compartilhar o usuário entre componentes.

```ts
private user$ = new BehaviorSubject<User | null>(null);
```

---

### TaskService

Responsável por:

* Buscar tarefas
* Criar, editar e excluir tarefas
* Emitir eventos quando uma tarefa é adicionada


## 🔐 Interceptor de Autenticação

### auth.interceptor.ts

Funções:

* Anexa o **JWT** no header `Authorization`
* Anexa o **XSRF Token** no header `X-XSRF-TOKEN`
* Usa `withCredentials: true` para permitir cookies

Esse interceptor garante que:

* Requisições autenticadas funcionem corretamente
* Segurança contra CSRF


## 🔄 Fluxo de Login

1. App inicia
2. Verifica se existe token
3. Se não existir:

   * Abre o modal de autenticação
4. Usuário faz login ou cadastro
5. Token JWT é salvo
6. Usuário é carregado via API
7. Componentes reagem automaticamente ao estado do usuário



## 🔁 Comunicação Entre Componentes

* Não há comunicação direta entre componentes irmãos
* Tudo passa pelos **Services**
* O estado é compartilhado usando **Observables (RxJS)**



## 🧪 Boas Práticas Utilizadas

* Separação de responsabilidades
* Componentes pequenos e reutilizáveis
* Services como fonte única de dados
* Evita `window.location.reload()`
* Uso correto de Observables e Subscriptions



## ✅ Benefícios da Arquitetura

* Código organizado
* Fácil manutenção
* Fácil entendimento para iniciantes
* Fluxo previsível de dados
* Segurança integrada


