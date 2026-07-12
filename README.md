# Perfecto Confecções - E-Commerce Híbrido & ERP Lojista

Um e-commerce completo e interativo desenvolvido com foco em alta performance e experiência do usuário premium, projetado especialmente para a **Perfecto Confecções**. A plataforma integra um catálogo dinâmico de moda, carrinho de compras com lógica de precificação híbrida (Varejo/Atacado) e um Painel Administrativo avançado (ERP) para controle total de vendas, estoque e identidade da loja.

Este projeto foi construído utilizando **Vanilla Javascript, HTML5 semântico e CSS3 puro**, sendo uma excelente demonstração de manipulação direta de DOM, gerenciamento de estado cliente-servidor simulado localmente e design moderno.

---

## 🚀 Principais Funcionalidades

### 🛒 Experiência do Cliente (Front-End)
* **Catálogo Inteligente:** Filtros dinâmicos por categorias, tamanhos e barra de busca integrada com atualização em tempo real.
* **Precificação Progressiva (Varejo/Atacado):** O carrinho detecta automaticamente quando a quantidade mínima de peças para atacado (configurável pelo lojista) é atingida, aplicando o desconto progressivo e exibindo selos informativos de economia.
* **Carrinho Lateral Deslizante (Drawer):** Interface ágil e animada para ajuste rápido de quantidades e visualização de descontos.
* **Checkout Estruturado por Abas:** Fluxo organizado em etapas (Identificação, Envio e Pagamento) com validação de dados e suporte a múltiplos métodos de pagamento (Cartão de Crédito, Boleto, PIX e WhatsApp).
* **Pop-up de Atendimento Inteligente:** Central de ajuda flexível para canalizar contatos de clientes diretamente no WhatsApp ou E-mail da empresa.

### 💼 Ferramentas do Lojista (Painel Administrativo)
* **Autenticação de Sessão:** Acesso restrito via login administrativo protegido (`admin` / `perfecto` padrão), com feedback de erro via animação física (*shake screen effect*).
* **Gestão de Catálogo (CRUD Completo):** Adicione, edite ou remova produtos em segundos:
  * **Upload Direto de Fotos:** Importador de imagens do computador convertidas localmente para Base64 (FileReader API).
  * **Grade de Tamanhos Flexível:** Cadastro de tamanhos personalizados em campo de texto livre (separados por vírgula), permitindo grades numéricas (Ex: 38, 40, 42) ou alfanuméricas (Ex: P, M, G, GG, XG).
* **Controle de Estoque Avançado (ERP):** Rastreabilidade total das mercadorias de acordo com o status de compra:
  * **Estoque Disponível:** Quantidade de itens livres para venda exibida no catálogo.
  * **Reservado:** Peças vinculadas a pedidos pendentes de pagamento (Pix, Boleto, WhatsApp).
  * **Vendido:** Peças faturadas (pagamentos confirmados ou via Cartão).
  * **Transições Automáticas:** Ações no painel para **Confirmar Pagamento** (converte Reservas em Vendas) ou **Cancelar Pedido** (devolve os itens imediatamente para o estoque disponível).
* **Configurador Visual & SEO:**
  * Alteração dinâmica de temas em tempo real (**Midnight Dark**, **Emerald Luxe** ou **Classic Light**).
  * Controle de tamanho de logo independente para cabeçalho e rodapé (suportando logos de alta resolução maiores de 250px).
  * Edição dinâmica do Título da Aba (Tab Title), Meta-descrição SEO, textos institucionais e copyright no rodapé.

---

## 🛠️ Tecnologias Utilizadas

* **Estrutura:** HTML5 Semântico para máxima acessibilidade e indexação SEO.
* **Estilização:** CSS3 puro com arquitetura de variáveis (`--custom-vars`) para temas dinâmicos, efeitos de Glassmorphism e transições suaves de animação.
* **Lógica:** JavaScript Moderno (ES6+) aplicando conceitos de programação assíncrona, File System emulador em base64 e gerenciamento local de estados (`localStorage` e `sessionStorage`).
* **Design & Ícones:** Biblioteca FontAwesome 6 e tipografia moderna importada via Google Fonts (Outfit).

---

## 📂 Organização dos Arquivos

```
perfectoconfeccoes/
├── assets/
│   └── images/
│       ├── logo.png               # Logomarca oficial da marca
│       ├── camisa_polo.png        # Fotos padrão de catálogo (AI Generated)
│       └── ...
├── index.html                     # Estrutura e marcação semântica
├── styles.css                     # Design System, Temas e Micro-animações
├── app.js                         # Core Controller, Lógica de Negócios e Persistência
└── README.md                      # Documentação de portfólio
```

---

## 💻 Como Rodar o Projeto Localmente

Como o sistema foi construído sem dependências pesadas de servidores back-end, rodá-lo é extremamente simples:

1. Clone o repositório em sua máquina:
   ```bash
   git clone https://github.com/uauNICK/perfectoconfeccoes.git
   ```
2. Abra a pasta do projeto:
   ```bash
   cd perfectoconfeccoes
   ```
3. Execute o projeto diretamente:
   * Basta abrir o arquivo `index.html` em qualquer navegador moderno.
   * **Recomendado:** Execute através da extensão *Live Server* do VS Code ou usando o utilitário de sua preferência para simular um ambiente de produção local.
4. Para acessar o painel administrativo, role até o rodapé do site, clique em **"Painel do Lojista"** e faça o login:
   * **Usuário:** `admin`
   * **Senha:** `perfecto`
