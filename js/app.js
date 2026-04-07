// E-commerce Project - JavaScript Principal
// Home Page - TechStore
// Data: 2024

// ========== DADOS MOCKADOS ==========
const produtosDestaque = [
    {
        id: 1,
        nome: "iPhone 15 Pro",
        preco: 8999.99,
        imagem: "https://via.placeholder.com/300x300/000000/FFFFFF?text=iPhone+15+Pro",
        descricao: "O mais avançado iPhone com chip A17 Pro e câmera de 48MP",
        categoria: "Celulares",
        estoque: 12,
        destaque: true,
        desconto: 10
    },
    {
        id: 2,
        nome: "MacBook Air M3",
        preco: 12999.99,
        imagem: "https://via.placeholder.com/300x300/007ACC/FFFFFF?text=MacBook+Air+M3",
        descricao: "Ultrafino com chip M3, 8GB RAM, SSD 256GB",
        categoria: "Notebooks",
        estoque: 8,
        destaque: true,
        desconto: 5
    },
    {
        id: 3,
        nome: "AirPods Pro (2ª geração)",
        preco: 1899.99,
        imagem: "https://via.placeholder.com/300x300/FFFFFF/000000?text=AirPods+Pro",
        descricao: "Cancelamento ativo de ruído, áudio espacial, resistência à água",
        categoria: "Áudio",
        estoque: 25,
        destaque: true
    },
    {
        id: 4,
        nome: "iPad Air",
        preco: 4999.99,
        imagem: "https://via.placeholder.com/300x300/C0C0C0/000000?text=iPad+Air",
        descricao: "10.9 polegadas, chip M2, compatível com Apple Pencil Pro",
        categoria: "Tablets",
        estoque: 15,
        destaque: true,
        desconto: 15
    }
];

// ========== ESTADO DA APLICAÇÃO ==========
let carrinho = [];

// ========== FUNÇÕES UTILITÁRIAS ==========
function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(preco);
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarCarrinho();
    }
}

function calcularPrecoComDesconto(produto) {
    if (produto.desconto) {
        return produto.preco * (1 - produto.desconto / 100);
    }
    return produto.preco;
}

// ========== FUNÇÕES DE PRODUTOS ==========
function criarCardProdutoDestaque(produto) {
    const precoOriginal = produto.preco;
    const precoComDesconto = calcularPrecoComDesconto(produto);
    const temDesconto = produto.desconto > 0;

    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
            ${produto.desconto ? `<div class="bg-red-500 text-white text-xs font-bold px-3 py-1 absolute top-3 left-3 rounded-full z-10">-${produto.desconto}%</div>` : ''}

            <div class="relative overflow-hidden">
                <img src="${produto.imagem}" alt="${produto.nome}"
                     class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            <div class="p-6">
                <div class="mb-3">
                    <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                        ${produto.categoria}
                    </span>
                </div>

                <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">${produto.nome}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${produto.descricao}</p>

                <div class="flex items-center justify-between mb-4">
                    <div class="flex flex-col">
                        ${temDesconto ? `
                            <span class="text-2xl font-bold text-green-600">${formatarPreco(precoComDesconto)}</span>
                            <span class="text-sm text-gray-500 line-through">${formatarPreco(precoOriginal)}</span>
                        ` : `
                            <span class="text-2xl font-bold text-green-600">${formatarPreco(precoOriginal)}</span>
                        `}
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Estoque</div>
                        <div class="font-semibold ${produto.estoque > 10 ? 'text-green-600' : produto.estoque > 0 ? 'text-yellow-600' : 'text-red-600'}">
                            ${produto.estoque} un
                        </div>
                    </div>
                </div>

                <button onclick="adicionarAoCarrinho(${produto.id})"
                        class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${produto.estoque === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${produto.estoque === 0 ? 'disabled' : ''}>
                    ${produto.estoque === 0 ? 'Indisponível' : '<i class="fas fa-cart-plus mr-2"></i>Adicionar ao Carrinho'}
                </button>
            </div>
        </div>
    `;
}

function renderizarProdutosDestaque() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    container.innerHTML = produtosDestaque.map(produto => criarCardProdutoDestaque(produto)).join('');
}

// ========== FUNÇÕES DO CARRINHO ==========
function adicionarAoCarrinho(produtoId) {
    const produto = produtosDestaque.find(p => p.id === produtoId);
    if (!produto || produto.estoque === 0) return;

    const itemExistente = carrinho.find(item => item.id === produtoId);

    if (itemExistente) {
        if (itemExistente.quantidade < produto.estoque) {
            itemExistente.quantidade++;
        } else {
            mostrarNotificacao('Quantidade máxima em estoque atingida!', 'warning');
            return;
        }
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: calcularPrecoComDesconto(produto),
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`, 'success');
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinho();
    atualizarCarrinho();
}

function alterarQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade <= 0) {
        removerDoCarrinho(produtoId);
        return;
    }

    const item = carrinho.find(item => item.id === produtoId);
    const produto = produtosDestaque.find(p => p.id === produtoId);

    if (item && novaQuantidade <= produto.estoque) {
        item.quantidade = novaQuantidade;
        salvarCarrinho();
        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    // Atualizar contador do carrinho
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    const cartCount = document.getElementById('cart-count');

    if (totalItens > 0) {
        cartCount.textContent = totalItens;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }

    // Atualizar modal do carrinho
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (carrinho.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Seu carrinho está vazio</p>
                <p class="text-sm text-gray-400 mt-2">Adicione alguns produtos!</p>
            </div>
        `;
        cartTotal.classList.add('hidden');
        return;
    }

    cartItems.innerHTML = carrinho.map(item => `
        <div class="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <div class="flex items-center space-x-4">
                <img src="${item.imagem}" alt="${item.nome}" class="w-16 h-16 object-cover rounded-lg">
                <div>
                    <h4 class="font-semibold text-gray-800 text-sm">${item.nome}</h4>
                    <p class="text-gray-600 text-sm">${formatarPreco(item.preco)}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="alterarQuantidade(${item.id}, ${item.quantidade - 1})"
                        class="text-gray-400 hover:text-gray-600 p-1">
                    <i class="fas fa-minus text-sm"></i>
                </button>
                <span class="font-medium text-sm w-8 text-center">${item.quantidade}</span>
                <button onclick="alterarQuantidade(${item.id}, ${item.quantidade + 1})"
                        class="text-gray-400 hover:text-gray-600 p-1">
                    <i class="fas fa-plus text-sm"></i>
                </button>
                <button onclick="removerDoCarrinho(${item.id})"
                        class="text-red-400 hover:text-red-600 p-1 ml-2">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Calcular e mostrar total
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    document.getElementById('total-price').textContent = formatarPreco(total);
    cartTotal.classList.remove('hidden');
}

// ========== FUNÇÕES DE INTERFACE ==========
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function toggleCarrinho() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

function mostrarNotificacao(mensagem, tipo = 'success') {
    // Criar notificação
    const notificacao = document.createElement('div');
    notificacao.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;

    if (tipo === 'success') {
        notificacao.classList.add('bg-green-500', 'text-white');
        notificacao.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${mensagem}`;
    } else if (tipo === 'warning') {
        notificacao.classList.add('bg-yellow-500', 'text-white');
        notificacao.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${mensagem}`;
    } else {
        notificacao.classList.add('bg-red-500', 'text-white');
        notificacao.innerHTML = `<i class="fas fa-times-circle mr-2"></i>${mensagem}`;
    }

    document.body.appendChild(notificacao);

    // Animar entrada
    setTimeout(() => {
        notificacao.classList.remove('translate-x-full');
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.classList.add('translate-x-full');
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll para âncoras
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Carregar carrinho do localStorage
    carregarCarrinho();

    // Renderizar produtos em destaque
    renderizarProdutosDestaque();

    // Configurar event listeners
    const menuToggle = document.getElementById('menu-toggle');
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartModal = document.getElementById('cart-modal');

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (cartBtn) cartBtn.addEventListener('click', toggleCarrinho);
    if (closeCart) closeCart.addEventListener('click', toggleCarrinho);

    // Fechar modal do carrinho ao clicar fora
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCarrinho();
            }
        });
    }

    // Smooth scroll
    smoothScroll();

    // Animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animações
    document.querySelectorAll('.category-card, .product-card').forEach(card => {
        observer.observe(card);
    });

    console.log('🏪 TechStore Home Page carregada com sucesso!');
    console.log(`✨ ${produtosDestaque.length} produtos em destaque`);
});

// ========== ANIMAÇÕES CSS ==========
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
