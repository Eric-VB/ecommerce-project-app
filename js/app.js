// ===== APLICAÇÃO DE LOJA SIMPLES PARA APRENDIZADO =====

// 1. DADOS DOS PRODUTOS
const produtos = [
    {
        id: 1,
        nome: "iPhone 15",
        preco: 3999,
        imagem: "assets/img/iphone.jpg",
        desconto: 10,
        estoque: 5
    },
    {
        id: 2,
        nome: "MacBook Air",
        preco: 7999,
        imagem: "assets/img/macbook.png",
        desconto: 0,
        estoque: 3
    },
    {
        id: 3,
        nome: "AirPods Pro",
        preco: 1899,
        imagem: "assets/img/airpods-pro.png",
        desconto: 15,
        estoque: 10
    },
    {
        id: 4,
        nome: "iPad Air",
        preco: 4999,
        imagem: "assets/img/ipad.jpg",
        desconto: 5,
        estoque: 0
    }
];

// 2. ESTADO DO CARRINHO
let carrinho = [];

// 3. FUNÇÃO: Renderizar produtos na página
function renderizarProdutos() {
    const container = document.getElementById('produtos');
    
    container.innerHTML = produtos.map(produto => {
        // Calcular preço com desconto
        const precoComDesconto = produto.preco * (1 - produto.desconto / 100);
        
        return `
            <div class="produto-card">
                ${produto.desconto > 0 ? `<span class="produto-desconto">-${produto.desconto}%</span>` : ''}
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="produto-estoque">Estoque: ${produto.estoque}</p>
                
                <div class="produto-preco">
                    ${produto.desconto > 0 ? `
                        <span style="text-decoration: line-through; color: #999; size: 14px;">R$ ${produto.preco.toFixed(2)}</span><br>
                        R$ ${precoComDesconto.toFixed(2)}
                    ` : `
                        R$ ${produto.preco.toFixed(2)}
                    `}
                </div>
                
                <button class="btn-adicionar" 
                        onclick="adicionarAoCarrinho(${produto.id})"
                        ${produto.estoque === 0 ? 'disabled' : ''}>
                    ${produto.estoque === 0 ? 'Fora de Estoque' : 'Adicionar ao Carrinho'}
                </button>
            </div>
        `;
    }).join('');
}

// 4. FUNÇÃO: Adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    // Encontrar o produto
    const produto = produtos.find(p => p.id === produtoId);
    
    if (!produto || produto.estoque === 0) {
        mostrarNotificacao('Produto não disponível!', 'error');
        return;
    }
    
    // Verificar se já está no carrinho
    const itemExistente = carrinho.find(item => item.id === produtoId);
    
    if (itemExistente) {
        // Se já existe, aumentar quantidade
        itemExistente.quantidade++;
    } else {
        // Se não existe, adicionar novo
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco * (1 - produto.desconto / 100),
            quantidade: 1
        });
    }
    
    // Atualizar a interface
    atualizarCarrinho();
    mostrarNotificacao(`${produto.nome} adicionado!`, 'success');
}

// 5. FUNÇÃO: Atualizar carrinho (contador + conteúdo)
function atualizarCarrinho() {
    // Atualizar contador
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('cart-count').textContent = totalItens;
    
    // Renderizar itens do carrinho
    const carrinhoContainer = document.getElementById('cart-items');
    
    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = `
            <p style="text-align: center; color: #999; padding: 30px;">
                Seu carrinho está vazio
            </p>
        `;
        document.getElementById('cart-total').classList.add('hidden');
        return;
    }
    
    // Mostrar itens
    carrinhoContainer.innerHTML = carrinho.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.nome}</h4>
                <p class="cart-item-price">R$ ${item.preco.toFixed(2)}</p>
            </div>
            
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="diminuirQuantidade(${item.id})">-</button>
                <span>${item.quantidade}</span>
                <button class="qty-btn" onclick="aumentarQuantidade(${item.id})">+</button>
                <button class="remove-btn" onclick="removerDoCarrinho(${item.id})">Remover</button>
            </div>
        </div>
    `).join('');
    
    // Calcular e mostrar total
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    document.getElementById('total-price').textContent = 'R$ ' + total.toFixed(2);
    document.getElementById('cart-total').classList.remove('hidden');
}

// 6. FUNÇÃO: Aumentar quantidade
function aumentarQuantidade(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        item.quantidade++;
        atualizarCarrinho();
    }
}

// 7. FUNÇÃO: Diminuir quantidade
function diminuirQuantidade(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        if (item.quantidade > 1) {
            item.quantidade--;
        } else {
            removerDoCarrinho(produtoId);
        }
        atualizarCarrinho();
    }
}

// 8. FUNÇÃO: Remover do carrinho
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
}

// 9. FUNÇÃO: Abrir/fechar modal do carrinho
function toggleCarrinho() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

// 10. FUNÇÃO: Mostrar notificação
function mostrarNotificacao(mensagem, tipo) {
    const notif = document.createElement('div');
    notif.className = `notificacao ${tipo}`;
    notif.textContent = mensagem;
    
    document.body.appendChild(notif);
    
    // Remover depois de 3 segundos
    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// 11. INICIALIZAR QUANDO A PÁGINA CARREGA
document.addEventListener('DOMContentLoaded', function() {
    renderizarProdutos();
    atualizarCarrinho();
});
