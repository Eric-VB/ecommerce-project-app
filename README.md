# 🛍️ Minha Loja - Projeto Simplificado

Um projeto de **e-commerce simples** para aprender JavaScript, HTML e CSS!

## 📚 Entendendo o Projeto

### **3 Arquivos Principais**

1. **index.html** - Estrutura (esqueleto da página)
2. **css/styles.css** - Aparência (cores, layout)
3. **js/app.js** - Lógica (o que faz funcionar)

```
ecommerce-project-app/
├── index.html          # Estrutura HTML
├── css/
│   └── styles.css      # Estilos (CSS puro)
├── js/
│   └── app.js          # Lógica (JavaScript)
└── README.md           # Este arquivo
```

## 🎯 Como o Projeto Funciona

### **HTML**
Define a estrutura: cabeçalho, área de produtos, modal do carrinho.

### **CSS**
Define o visual: cores (#333, #3498db), tamanhos, espaçamento.

### **JavaScript**
Define o comportamento:
- Array `produtos = [...]` ← Lista de produtos
- Array `carrinho = []` ← Itens do usuário
- Funções que fazem coisas acontecer

## 🚀 Como Usar

1. Abra `index.html` no navegador
2. Clique "Adicionar ao Carrinho" em qualquer produto
3. Clique no botão 🛒 pra ver seu carrinho
4. Use +/- pra mudar quantidade

## 💡 O que Aprender

### **JavaScript - Conceitos Principais**

**Arrays de Objetos:**
```javascript
const produtos = [
    { id: 1, nome: "iPhone", preco: 3999, desconto: 10 },
    { id: 2, nome: "iPad", preco: 4999, desconto: 5 }
];
```

**Métodos Úteis:**
```javascript
.find(p => p.id === 1)           // Encontra 1 produto
.map(item => item.nome)          // Extrai só nomes
.filter(item => item.estoque > 0) // Filtra itens
.reduce((sum, i) => sum + i.preco) // Soma preços
```

**Template Literals:**
```javascript
`Preço: R$ ${preco.toFixed(2)}`  // Inserir variáveis
```

**DOM Manipulation:**
```javascript
document.getElementById('id').innerHTML = html;
classList.toggle('hidden');
```

## 📝 Exercícios Sugeridos

### **1. Adicione um novo produto**
Em `js/app.js`, no array `produtos`, add:
```javascript
{
    id: 5,
    nome: "Seu Produto",
    preco: 1999,
    imagem: "https://via.placeholder.com/200x150",
    desconto: 0,
    estoque: 10
}
```

### **2. Mude as cores**
Em `css/styles.css`:
- `#333` = cinza → mude para `#000` (preto)
- `#3498db` = azul → mude para `#e74c3c` (vermelho)

### **3. Salve o carrinho**
Add localStorage em `js/app.js` para guardar o carrinho

### **4. Valide estoque**
Não deixe adicionar mais do que tem

## 🐛 Como Debug

Abra o Console (F12) no navegador:
```javascript
console.log(produtos);  // Ver lista
console.log(carrinho);  // Ver carrinho
```

## ✅ Checklist de Aprendizado

- [ ] Entendi a estrutura do HTML
- [ ] Entendi como CSS funciona
- [ ] Entendi arrays e objetos
- [ ] Entendi funções básicas
- [ ] Consegui adicionar um produto
- [ ] Consegui mudar cores
- [ ] Entendi localStorage
- [ ] Fiz minha primeira modificação

## 🎓 Próximos Passos (Desafios)

1. Adicionar busca de produtos
2. Filtrar por categoria
3. Cupom de desconto  
4. Salvar carrinho com localStorage
5. Validar quantidade vs estoque

## 🚀 Pronto para Aprender?

Abra `index.html` e comece a explorar o código!

### Option 2: Using a local server (recommended)
1. Install Node.js if not already installed
2. Run a local server:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Or using Node.js
   npx serve .

   # Or using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

## Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Future Enhancements
- [ ] User authentication system
- [ ] Product search functionality
- [ ] Product filtering by category
- [ ] Checkout process
- [ ] Payment integration
- [ ] User profile management
- [ ] Order history
- [ ] Admin panel
- [ ] Backend API integration
- [ ] Database integration (MySQL)

## Learning Objectives
This project demonstrates:
- HTML5 semantic structure
- CSS Grid and Flexbox layouts
- JavaScript ES6+ features (arrow functions, template literals, destructuring)
- DOM manipulation
- Event handling
- Local storage API
- Responsive web design
- Component-based architecture concepts
- State management basics

## Contributing
This is a learning project. Feel free to:
- Add new features
- Improve the UI/UX
- Fix bugs
- Add tests
- Optimize performance

## License
ISC License - feel free to use this project for learning purposes.