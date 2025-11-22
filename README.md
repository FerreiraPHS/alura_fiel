# Times Históricos do Corinthians

Aplicação web simples que celebra os elencos campeões do Corinthians. Possui tela de entrada temática, busca por ano ou competição, cards com títulos, escalação base e links para saber mais.

## Funcionalidades
- Modal inicial com desafio "Vai Corinthians" para liberar a experiência.
- Busca por ano ou competição; enter ou botão.
- Cards com títulos, escalação e link externo.
- Dados centralizados em data.json para fácil manutenção.
- Layout dark responsivo, header sticky e rodapé com homenagem à Fiel.

## Como usar
1. Abrir index.html em um navegador moderno.
2. Digitar "corinthians" no modal para liberar o conteúdo.
3. Buscar por um ano ou competição (ex.: 2012, Libertadores, Paulista).

## Estrutura
- index.html: marcação da página e modal inicial.
- style.css: tema dark, responsividade e ajustes de foco/acessibilidade.
- script.js: lógica do modal, carregamento do data.json e busca/renderização.
- data.json: lista de times, títulos, escalação e links.

## Tecnologias
HTML, CSS, JavaScript vanilla. Fonte Quicksand via Google Fonts.

## Acessibilidade
- aria-labels e ria-live nos resultados.
- Foco visível e atalhos via Enter em inputs/modal.

## Desenvolver
Clone ou baixe os arquivos estáticos e edite localmente. Para alterar dados, ajuste data.json mantendo o mesmo formato.

## Próximos passos sugeridos
- Filtros por modalidade/competição.
- Destaques iniciais (cards em destaque) em vez de apenas mensagem.
- Cache offline simples ou fallback se o fetch falhar.
