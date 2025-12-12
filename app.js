// ====================================
// PROJETO CORDEL - JavaScript
// ====================================

// Configuração inicial
document.addEventListener('DOMContentLoaded', () => {
    inicializarTudo();
});

function inicializarTudo() {
    menuMobile();
    scrollSuave();
    revelarElementos();
    efetoParallax();
    botaoTopo();
    headerFixo();
    animarTexto();
}

// ====================================
// MENU MOBILE
// ====================================
 

        // Fechar menu ao clicar em um link
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('ativo');
                btnMenu.classList.remove('ativo');
            });
        });
    }
}

// ====================================
// SCROLL SUAVE
// ====================================
function scrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href');
            
            if (id === '#') return;
            
            const elemento = document.querySelector(id);
            if (elemento) {
                elemento.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ====================================
// REVELAR ELEMENTOS AO SCROLL
// ====================================
function revelarElementos() {
    const elementos = document.querySelectorAll('.revelar');
    
    if (elementos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => observer.observe(elemento));
}

// ====================================
// EFEITO PARALLAX
// ====================================
function efetoParallax() {
    const secoes = document.querySelectorAll('.parallax, .imagem');
    
    if (secoes.length === 0) return;
    
    window.addEventListener('scroll', () => {
        secoes.forEach(secao => {
            const scrollPosition = window.pageYOffset;
            const secaoTop = secao.offsetTop;
            const secaoHeight = secao.offsetHeight;
            
            if (scrollPosition > secaoTop - window.innerHeight && 
                scrollPosition < secaoTop + secaoHeight) {
                const yPos = (scrollPosition - secaoTop) * 0.5;
                secao.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });
}

// ====================================
// BOTÃO VOLTAR AO TOPO
// ====================================
function botaoTopo() {
    // Criar botão se não existir
    let btnTopo = document.querySelector('.btn-topo');
    
    if (!btnTopo) {
        btnTopo = document.createElement('button');
        btnTopo.className = 'btn-topo';
        btnTopo.innerHTML = '↑';
        btnTopo.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(btnTopo);
    }
    
    // Mostrar/ocultar botão
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btnTopo.classList.add('visivel');
        } else {
            btnTopo.classList.remove('visivel');
        }
    });
    
    // Scroll ao topo ao clicar
    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====================================
// HEADER FIXO
// ====================================
function headerFixo() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    const alturaHeader = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > alturaHeader) {
            header.classList.add('fixo');
        } else {
            header.classList.remove('fixo');
        }
    });
}

// ====================================
// ANIMAR TEXTO (EFEITO MÁQUINA DE ESCREVER)
// ====================================
function animarTexto() {
    const elementos = document.querySelectorAll('.texto-animado');
    
    elementos.forEach(elemento => {
        const texto = elemento.textContent;
        elemento.textContent = '';
        elemento.style.opacity = '1';
        
        let i = 0;
        const velocidade = 50; // ms por letra
        
        function escrever() {
            if (i < texto.length) {
                elemento.textContent += texto.charAt(i);
                i++;
                setTimeout(escrever, velocidade);
            }
        }
        
        // Iniciar quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    escrever();
                    observer.unobserve(elemento);
                }
            });
        });
        
        observer.observe(elemento);
    });
}

// ====================================
// FUNÇÕES UTILITÁRIAS
// ====================================

// Adicionar classe de animação ao scroll
function adicionarAnimacaoScroll(seletor, classe = 'fade-in') {
    const elementos = document.querySelectorAll(seletor);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(classe);
            }
        });
    }, { threshold: 0.1 });
    
    elementos.forEach(el => observer.observe(el));
}

// Detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Throttle para performance
function throttle(func, delay) {
    let ultimo = 0;
    return function(...args) {
        const agora = new Date().getTime();
        if (agora - ultimo < delay) return;
        ultimo = agora;
        return func(...args);
    };
}

// Debounce para performance
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// ====================================
// EXEMPLOS DE USO AVANÇADO
// ====================================

// Adicionar mais animações personalizadas conforme necessário
// adicionarAnimacaoScroll('.paragrafo', 'slide-up');
// adicionarAnimacaoScroll('.titulo', 'zoom-in');

console.log('✅ Projeto Cordel - JavaScript carregado com sucesso!');
