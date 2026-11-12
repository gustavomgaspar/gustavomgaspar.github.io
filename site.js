/* Gaspar — interações da landing.
   Sem dependências. Todo o conteúdo útil já está no HTML; aqui só vivem estados. */

(function () {
  'use strict';

  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. Painel: período (demonstração sintética, rotulada no HTML)
     --------------------------------------------------------------- */

  var PERIODOS = {
    hoje: {
      titulo: 'Contatos recebidos por faixa do dia',
      labels: ['08h', '10h', '12h', '14h', '16h', '18h', '20h'],
      valores: [1, 3, 5, 4, 6, 7, 3],
      tiles: {
        leads: ['42', '+8% vs. anterior'],
        contatos: ['29', '69% dos leads'],
        horas: ['3h', 'fluxo automático ativo']
      }
    },
    '7d': {
      titulo: 'Contatos recebidos por dia da semana',
      labels: ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'],
      valores: [31, 38, 29, 35, 42, 11, 8],
      tiles: {
        leads: ['286', '+12% vs. semana anterior'],
        contatos: ['194', '68% dos leads'],
        horas: ['21h', 'fluxo automático ativo']
      }
    },
    '30d': {
      titulo: 'Contatos recebidos por bloco de 5 dias',
      labels: ['1–5', '6–10', '11–15', '16–20', '21–25', '26–30'],
      valores: [118, 131, 142, 127, 151, 143],
      tiles: {
        leads: ['1.180', '+9% vs. mês anterior'],
        contatos: ['812', '69% dos leads'],
        horas: ['92h', 'fluxo automático ativo']
      }
    }
  };

  var painel = document.querySelector('.panel');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.ds-chip'));
  var listaBarras = document.getElementById('bars');
  var tituloGrafico = document.getElementById('chart-title');

  function pintarBarras(dados) {
    if (!listaBarras) return;
    var max = Math.max.apply(null, dados.valores);
    listaBarras.style.setProperty('--bars', String(dados.valores.length));
    listaBarras.innerHTML = dados.valores.map(function (valor, i) {
      var altura = Math.max(6, Math.round((valor / max) * 100));
      var atraso = reduzirMovimento ? 0 : 340 + i * 45;
      return (
        '<li class="bar">' +
        '<span class="bar__value">' + valor + '</span>' +
        '<span class="bar__stem" style="--h:' + altura + '%;--d:' + atraso + 'ms"></span>' +
        '<span class="bar__label">' + dados.labels[i] + '</span>' +
        '</li>'
      );
    }).join('');
    if (tituloGrafico) tituloGrafico.textContent = dados.titulo;
  }

  function pintarTiles(tiles) {
    Object.keys(tiles).forEach(function (chave) {
      var valor = document.querySelector('[data-tile="' + chave + '"]');
      var delta = document.querySelector('[data-tile="' + chave + '-delta"]');
      if (valor) valor.textContent = tiles[chave][0];
      if (delta) delta.textContent = tiles[chave][1];
    });
  }

  function selecionarPeriodo(botao) {
    var dados = PERIODOS[botao.getAttribute('data-periodo')];
    if (!dados) return;
    chips.forEach(function (chip) {
      var ativo = chip === botao;
      chip.classList.toggle('is-active', ativo);
      chip.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });
    pintarTiles(dados.tiles);
    pintarBarras(dados);
    if (painel && painel.classList.contains('is-armed')) {
      painel.classList.add('is-in');
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () { selecionarPeriodo(chip); });
  });

  /* ---------------------------------------------------------------
     2. Momento autoral: a revelação do painel na dobra
        O painel já é legível sem JS; só os elementos são armados
        quando há movimento permitido.
     --------------------------------------------------------------- */

  if (painel && !reduzirMovimento && 'IntersectionObserver' in window) {
    painel.classList.add('is-armed');

    var atrasos = { dsChip: 0, dsTile: 90, panel__chart: 340 };
    var indiceTile = 0;
    Array.prototype.forEach.call(painel.querySelectorAll('.ds-chip, .ds-tile, .panel__chart'), function (el) {
      var base = atrasos[el.className.split(' ')[0]] || 0;
      var extra = el.classList.contains('ds-tile') ? indiceTile * 70 : 0;
      if (el.classList.contains('ds-tile')) indiceTile++;
      el.style.setProperty('--d', (base + extra) + 'ms');
    });

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          painel.classList.add('is-in');
          observador.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observador.observe(painel);
  }

  /* ---------------------------------------------------------------
     3. Formulário de contato — sem backend.
        Valida no cliente e compõe a mensagem no WhatsApp confirmado.
     --------------------------------------------------------------- */

  var form = document.getElementById('lead-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var botaoEnviar = document.getElementById('submit');
  var NUMERO = '5515998182559';

  var REGRAS = [
    { id: 'nome', erro: 'erro-nome', teste: function (v) { return v.trim().length >= 2; }, mensagem: 'Informe seu nome.' },
    { id: 'empresa', erro: 'erro-empresa', teste: function (v) { return v.trim().length >= 2; }, mensagem: 'Informe o nome da empresa.' },
    {
      id: 'whatsapp', erro: 'erro-whatsapp',
      teste: function (v) { return (v.replace(/\D/g, '').length >= 10); },
      mensagem: 'Informe o WhatsApp com DDD, ex.: 15 99999-0000.'
    },
    {
      id: 'email', erro: 'erro-email', opcional: true,
      teste: function (v) { return v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      mensagem: 'Informe um e-mail válido ou deixe em branco.'
    }
  ];

  function limparErro(regra) {
    var campo = document.getElementById(regra.id);
    var caixa = document.getElementById(regra.erro);
    campo.removeAttribute('aria-invalid');
    caixa.hidden = true;
    caixa.textContent = '';
  }

  function marcarErro(regra) {
    var campo = document.getElementById(regra.id);
    var caixa = document.getElementById(regra.erro);
    campo.setAttribute('aria-invalid', 'true');
    caixa.hidden = false;
    caixa.textContent = regra.mensagem;
  }

  REGRAS.forEach(function (regra) {
    var campo = document.getElementById(regra.id);
    campo.addEventListener('input', function () {
      if (campo.getAttribute('aria-invalid') === 'true' && regra.teste(campo.value)) {
        limparErro(regra);
      }
    });
  });

  function validar() {
    var invalidos = [];
    REGRAS.forEach(function (regra) {
      var campo = document.getElementById(regra.id);
      if (regra.teste(campo.value)) {
        limparErro(regra);
      } else {
        marcarErro(regra);
        invalidos.push(campo);
      }
    });
    return invalidos;
  }

  function montarMensagem() {
    var valor = function (id) { return document.getElementById(id).value.trim(); };
    var necessidade = form.querySelector('input[name="necessidade"]:checked');
    var linhas = [
      'Olá, Gaspar! Vim pelo site e quero falar sobre uma landing page.',
      '',
      'Nome: ' + valor('nome'),
      'Empresa: ' + valor('empresa'),
      'WhatsApp: ' + valor('whatsapp')
    ];
    if (valor('email')) linhas.push('E-mail: ' + valor('email'));
    if (necessidade) linhas.push('Preciso de: ' + necessidade.value);
    if (valor('mensagem')) linhas.push('Mensagem: ' + valor('mensagem'));
    return linhas.join('\n');
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var invalidos = validar();
    if (invalidos.length) {
      status.classList.remove('is-ok');
      status.textContent = 'Revise os campos destacados antes de enviar.';
      invalidos[0].focus();
      return;
    }

    var url = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(montarMensagem());

    botaoEnviar.setAttribute('aria-busy', 'true');
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Abrindo o WhatsApp…';
    status.classList.remove('is-ok');
    status.textContent = 'Montando a sua mensagem…';

    var janela = window.open(url, '_blank', 'noopener');

    window.setTimeout(function () {
      botaoEnviar.removeAttribute('aria-busy');
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = 'Enviar pelo WhatsApp';

      status.classList.add('is-ok');
      if (janela) {
        status.textContent = 'Mensagem pronta no WhatsApp. Se a janela não abriu: ';
      } else {
        status.textContent = 'O navegador bloqueou a abertura. Toque para continuar: ';
      }
      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'link-quiet';
      link.textContent = 'abrir o WhatsApp agora';
      status.appendChild(link);
      status.appendChild(document.createTextNode('.'));
    }, 450);
  });
})();
