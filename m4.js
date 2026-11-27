/* ==========================================================================
   MÓDULO 4 — INDICADORES DE GESTÃO (Slides 30 a 49 da V6 — 20 slides)
   Alinhado exatamente ao motor de index.html:
   - Cada slide expõe { module: 4, render: () => wrapM4(title, bodyHTML, footnote) }
   - Suporte nativo a Tema Claro / Escuro via CSS tokens do index.html
   - Ordem exata da V6:
     1. Wayfinding (Financeiros em foco)
     2..8. 7 Financeiros (EBITDA, COT, Margem Op., Lucro/ha, Payback, ROI, TCO)
     9. Wayfinding (Técnicos & Agrícolas em foco)
     10..15. 6 Técnicos de Máquina (DM, Índice de Quebra, MTBF, L/ha, Eficiência Op., MTTR)
     16..19. 4 Técnicos Operacionais (Plantio, Pulverização, Colheita, Perdas)
     20. Ponte M4 → M5 (Do Papel ao Tempo Real)
   ========================================================================== */

(function () {
  if (!document.getElementById('m4-styles')) {
    const style = document.createElement('style');
    style.id = 'm4-styles';
    style.textContent = `
      .m4-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        color: var(--text-primary);
      }

      /* Cards base alinhados aos tokens do index.html */
      .m4-card {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-radius: 14px;
        padding: 15px 18px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
      }
      .m4-card-soft {
        background: var(--senar-green-soft);
        border: 1.5px solid var(--senar-green-border);
        border-radius: 14px;
        padding: 13px 16px;
      }
      .m4-card-amber {
        background: var(--amber-soft);
        border: 1.5px solid var(--amber-border);
        border-radius: 14px;
        padding: 13px 16px;
      }
      .m4-card-red {
        background: var(--red-soft);
        border: 1.5px solid var(--red-border);
        border-radius: 14px;
        padding: 13px 16px;
      }

      /* Kickers e pills */
      .m4-kicker {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--senar-green);
        margin-bottom: 4px;
      }
      [data-theme="dark"] .m4-kicker {
        color: var(--senar-green-bright);
      }

      .m4-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .m4-pill-green { background: var(--senar-green); color: #fff; }
      .m4-pill-soft { background: var(--senar-green-soft); color: var(--senar-green); border: 1px solid var(--senar-green-border); }
      .m4-pill-amber { background: var(--amber-soft); color: var(--amber-dark); border: 1px solid var(--amber-border); }
      .m4-pill-red { background: var(--red-soft); color: var(--red-dark); border: 1px solid var(--red-border); }
      .m4-pill-muted { background: var(--card-elevated); color: var(--text-muted); border: 1px solid var(--border-color); }

      [data-theme="dark"] .m4-pill-soft { color: var(--senar-green-bright); }

      .m4-sub {
        font-size: 12.5px;
        color: var(--text-secondary);
        display: block;
        margin-top: 2px;
        line-height: 1.38;
      }

      /* Wayfinding M4 */
      .m4-wf-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        flex: 1;
        min-height: 0;
      }
      .m4-wf-col {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        padding: 18px;
        border-radius: 16px;
        border: 2px solid var(--border-color);
        background: var(--card-bg);
      }
      .m4-wf-col.active-green {
        border-color: var(--senar-green);
        box-shadow: 0 10px 26px rgba(0, 104, 55, 0.12);
      }
      .m4-wf-col.active-amber {
        border-color: var(--amber);
        box-shadow: 0 10px 26px rgba(217, 119, 6, 0.14);
      }
      .m4-wf-col.dim {
        opacity: 0.62;
      }
      .m4-wf-list {
        list-style: none;
        padding: 0;
        margin: 8px 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .m4-wf-list li {
        font-size: 13.5px;
        font-weight: 700;
        color: var(--text-primary);
        padding: 6px 10px;
        border-radius: 8px;
        background: var(--card-elevated);
        border: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .m4-wf-idx {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        background: var(--senar-green);
        color: #fff;
        font-size: 11px;
        font-weight: 900;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .m4-wf-mini-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        margin-top: 6px;
      }
      .m4-wf-mini-item {
        font-size: 12.5px;
        font-weight: 700;
        padding: 6px 9px;
        border-radius: 8px;
        background: var(--card-elevated);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
      }
      .m4-eq-bar {
        background: linear-gradient(135deg, var(--senar-green-dark) 0%, var(--senar-green) 100%);
        color: #FFFFFF;
        border-radius: 12px;
        padding: 11px 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 800;
        flex-wrap: wrap;
      }
      .m4-eq-chip {
        background: rgba(255, 255, 255, 0.14);
        padding: 4px 12px;
        border-radius: 8px;
      }
      .m4-eq-gold {
        background: var(--gold);
        color: #0F172A;
        padding: 4px 12px;
        border-radius: 8px;
        font-weight: 900;
      }

      /* Cartão de Foto — Indicador Individual */
      .m4-ind-head {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-left: 6px solid var(--senar-green);
        border-radius: 14px;
        padding: 14px 20px;
      }
      .m4-ind-head.accent-amber { border-left-color: var(--amber); }
      .m4-ind-head.accent-red { border-left-color: var(--red); }

      .m4-ind-name {
        font-size: 26px;
        font-weight: 900;
        color: var(--text-primary);
        line-height: 1.15;
        letter-spacing: -0.02em;
      }
      .m4-ind-desc {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-top: 4px;
        line-height: 1.38;
      }

      .m4-ind-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        flex: 1;
        min-height: 0;
      }

      .m4-box {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-top: 4px solid var(--senar-green);
        border-radius: 14px;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
      }
      .m4-box.accent-amber { border-top-color: var(--amber); }
      .m4-box.accent-red { border-top-color: var(--red); }

      .m4-formula-well {
        background: var(--card-elevated);
        border: 1.5px solid var(--border-strong);
        border-radius: 12px;
        padding: 16px 16px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex: 1;
      }
      .m4-formula-main {
        font-size: 18px;
        font-weight: 900;
        color: var(--text-primary);
        line-height: 1.35;
      }
      .m4-formula-sub {
        font-size: 13px;
        font-weight: 700;
        color: var(--senar-green);
      }
      [data-theme="dark"] .m4-formula-sub { color: var(--senar-green-bright); }

      .m4-frac {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        vertical-align: middle;
        margin: 0 6px;
      }
      .m4-frac-num {
        border-bottom: 2px solid var(--text-primary);
        padding: 0 8px 3px;
        font-size: 15.5px;
        font-weight: 800;
      }
      .m4-frac-den {
        padding: 3px 8px 0;
        font-size: 15.5px;
        font-weight: 800;
      }

      .m4-note {
        font-size: 12.5px;
        font-weight: 600;
        color: var(--text-secondary);
        line-height: 1.38;
        padding-top: 8px;
        border-top: 1px solid var(--border-color);
      }

      .m4-example-text {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-primary);
        line-height: 1.45;
      }

      .m4-result-box {
        border-radius: 12px;
        padding: 14px 16px;
        border: 1.5px solid var(--senar-green-border);
        background: var(--senar-green-soft);
      }
      .m4-result-box.tone-amber {
        border-color: var(--amber-border);
        background: var(--amber-soft);
      }
      .m4-result-box.tone-red {
        border-color: var(--red-border);
        background: var(--red-soft);
      }
      .m4-result-kicker {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--senar-green);
      }
      .m4-result-box.tone-amber .m4-result-kicker { color: var(--amber-dark); }
      .m4-result-box.tone-red .m4-result-kicker { color: var(--red-dark); }
      [data-theme="dark"] .m4-result-box .m4-result-kicker { color: var(--senar-green-bright); }
      [data-theme="dark"] .m4-result-box.tone-amber .m4-result-kicker { color: var(--amber-dark); }
      [data-theme="dark"] .m4-result-box.tone-red .m4-result-kicker { color: var(--red-dark); }

      .m4-result-big {
        font-size: 29px;
        font-weight: 900;
        line-height: 1.1;
        margin-top: 4px;
        color: var(--senar-green);
      }
      .m4-result-box.tone-amber .m4-result-big { color: var(--amber-dark); }
      .m4-result-box.tone-red .m4-result-big { color: var(--red-dark); }
      [data-theme="dark"] .m4-result-box .m4-result-big { color: var(--senar-green-bright); }
      [data-theme="dark"] .m4-result-box.tone-amber .m4-result-big { color: var(--amber-dark); }
      [data-theme="dark"] .m4-result-box.tone-red .m4-result-big { color: var(--red-dark); }

      .m4-result-sub {
        font-size: 13.5px;
        font-weight: 700;
        color: var(--text-primary);
        margin-top: 4px;
      }

      /* Comparativo 2 cartões (MTBF e L/ha) */
      .m4-cmp-stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: 1;
        justify-content: center;
      }
      .m4-cmp-item {
        border-radius: 12px;
        padding: 13px 15px;
        border: 1.5px solid var(--border-color);
        background: var(--card-elevated);
      }
      .m4-cmp-item.good {
        border-left: 5px solid var(--senar-green);
        background: var(--senar-green-soft);
        border-color: var(--senar-green-border);
      }
      .m4-cmp-item.bad {
        border-left: 5px solid var(--red);
        background: var(--red-soft);
        border-color: var(--red-border);
      }
      .m4-cmp-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 6px;
      }

      /* Barra inferior Na Prática de Gestão */
      .m4-tip-bar {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-left: 5px solid var(--amber);
        border-radius: 11px;
        padding: 11px 16px;
        font-size: 13.5px;
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1.38;
      }
      .m4-tip-bar strong {
        color: var(--amber-dark);
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.05em;
        margin-right: 6px;
      }

      /* Ponte M4 -> M5 */
      .m4-bridge-grid {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 18px;
        align-items: stretch;
        flex: 1;
      }
      .m4-bridge-card {
        border-radius: 16px;
        padding: 24px 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
      }
      .m4-bridge-ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .m4-bridge-ul li {
        font-size: 16.5px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        line-height: 1.35;
      }
    `;
    document.head.appendChild(style);
  }

  function wrapM4(title, bodyHTML, footnote) {
    if (typeof window.wrapContentSlide === 'function') {
      return window.wrapContentSlide(title, bodyHTML, footnote);
    }
    return `
      <section class="slide-view content-slide">
        <header class="slide-top-chrome">
          <div class="top-left-brand">
            <img src="assets/logo_senar.png" class="logo-senar" alt="SENAR Mato Grosso">
            <span class="top-divider"></span>
            <h1 class="slide-title-main">${title}</h1>
          </div>
        </header>
        <div class="slide-body">${bodyHTML}</div>
        <footer class="slide-bottom-chrome">
          <span class="slide-footnote">${footnote || ''}</span>
          <img src="assets/logo-sistemafamato.png" class="logo-famato" alt="Sistema FAMATO">
        </footer>
      </section>
    `;
  }

  /* Wayfinding M4 (Etapa 1: Financeiros | Etapa 2: Técnicos & Agrícolas) */
  function renderWayfindingM4(etapaAtiva) {
    const finActive = etapaAtiva === 1;
    return `
      <div class="m4-wrap">
        <div class="m4-wf-grid">
          <div class="m4-wf-col ${finActive ? 'active-green' : 'dim'}">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <div>
                  <div class="m4-kicker">ETAPA 1 • A RÉGUA DO CAIXA</div>
                  <div style="font-size:21px;font-weight:900;">Indicadores Financeiros</div>
                  <span class="m4-sub">Quanto a mecanização custa e quanto devolve de margem</span>
                </div>
                <span class="m4-pill ${finActive ? 'm4-pill-green' : 'm4-pill-soft'}">
                  ${finActive ? 'EM FOCO AGORA' : '✓ CONCLUÍDO'}
                </span>
              </div>

              <ul class="m4-wf-list">
                <li><span class="m4-wf-idx">1</span>EBITDA Agrícola (geração de caixa)</li>
                <li><span class="m4-wf-idx">2</span>COT (Custo Operacional Total)</li>
                <li><span class="m4-wf-idx">3</span>Margem Operacional (%)</li>
                <li><span class="m4-wf-idx">4</span>Lucro por Hectare (R$/ha)</li>
                <li><span class="m4-wf-idx">5</span>Payback (safras / anos)</li>
                <li><span class="m4-wf-idx">6</span>ROI (Retorno sobre Investimento)</li>
                <li><span class="m4-wf-idx">7</span>TCO (Custo Total de Propriedade)</li>
              </ul>
            </div>
          </div>

          <div class="m4-wf-col ${!finActive ? 'active-amber' : 'dim'}">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <div>
                  <div class="m4-kicker" style="color:var(--amber-dark);">ETAPA 2 • A ENTREGA NO CAMPO</div>
                  <div style="font-size:21px;font-weight:900;">Indicadores Técnicos & Agrícolas</div>
                  <span class="m4-sub">Onde a frota e a operação constroem ou drenam o resultado</span>
                </div>
                <span class="m4-pill ${!finActive ? 'm4-pill-amber' : 'm4-pill-muted'}">
                  ${!finActive ? 'EM FOCO AGORA' : 'A SEGUIR'}
                </span>
              </div>

              <div style="margin-top:12px;">
                <div class="m4-kicker" style="color:var(--amber-dark);">FROTA (6 INDICADORES TÉCNICOS)</div>
                <div class="m4-wf-mini-grid">
                  <div class="m4-wf-mini-item">• Disponibilidade (DM)</div>
                  <div class="m4-wf-mini-item">• Índice de Quebra</div>
                  <div class="m4-wf-mini-item">• Confiabilidade (MTBF)</div>
                  <div class="m4-wf-mini-item">• Consumo Real (L/ha)</div>
                  <div class="m4-wf-mini-item">• Ociosidade & Efic. Op.</div>
                  <div class="m4-wf-mini-item">• Manutenção (MTTR)</div>
                </div>
              </div>

              <div style="margin-top:14px;">
                <div class="m4-kicker">TALHÃO (4 INDICADORES AGRÍCOLAS)</div>
                <div class="m4-wf-mini-grid">
                  <div class="m4-wf-mini-item">• Eficiência de Plantio</div>
                  <div class="m4-wf-mini-item">• Eficiência de Pulverização</div>
                  <div class="m4-wf-mini-item">• Eficiência de Colheita</div>
                  <div class="m4-wf-mini-item">• Perdas Operacionais</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m4-eq-bar">
          <span style="font-size:11px;letter-spacing:0.08em;opacity:0.88;">EQUAÇÃO DO RESULTADO</span>
          <span class="m4-eq-chip">Indicadores Técnicos no Talhão</span>
          <span>→</span>
          <span class="m4-eq-gold">Empurram a Régua Financeira no Caixa</span>
        </div>
      </div>
    `;
  }

  /* Helper para cartão padrão de indicador (Conceito + Fórmula + Exemplo/Resultado + Na Prática) */
  function renderIndSlide(cfg) {
    const accentCls = cfg.accent === 'amber' ? 'accent-amber' : (cfg.accent === 'red' ? 'accent-red' : '');
    const resTone = cfg.resultTone === 'amber' ? 'tone-amber' : (cfg.resultTone === 'red' ? 'tone-red' : '');
    return `
      <div class="m4-wrap tabular">
        <div class="m4-ind-head ${accentCls}">
          <div class="m4-ind-name">${cfg.name}</div>
          <div class="m4-ind-desc">${cfg.desc}</div>
        </div>

        <div class="m4-ind-body">
          <div class="m4-box ${accentCls}">
            <div class="m4-kicker" style="${cfg.accent === 'amber' ? 'color:var(--amber-dark);' : ''}">FÓRMULA DE CÁLCULO</div>
            <div class="m4-formula-well">
              <div class="m4-formula-main">${cfg.formulaHTML}</div>
              ${cfg.formulaSub ? `<div class="m4-formula-sub">${cfg.formulaSub}</div>` : ''}
            </div>
            <div class="m4-note">${cfg.formulaNote}</div>
          </div>

          <div class="m4-box ${accentCls}">
            <div class="m4-kicker" style="${cfg.accent === 'amber' ? 'color:var(--amber-dark);' : ''}">${cfg.exampleKicker}</div>
            ${cfg.compareHTML ? cfg.compareHTML : `
              <div class="m4-example-text">${cfg.exampleText}</div>
              <div class="m4-result-box ${resTone}">
                <div class="m4-result-kicker">${cfg.resultKicker}</div>
                <div class="m4-result-big">${cfg.resultBig}</div>
                <div class="m4-result-sub">${cfg.resultSub}</div>
              </div>
            `}
          </div>
        </div>

        <div class="m4-tip-bar">
          <strong>▲ NA PRÁTICA DE GESTÃO:</strong> ${cfg.tip}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     20 SLIDES DO MÓDULO 4 (Slides 30 a 49 da V6)
     ========================================================================== */
  const M4_SLIDES = [
    /* 1. SLIDE 30 — Wayfinding Financeiros em foco */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores',
        renderWayfindingM4(1),
        'Módulo 4 • Etapa 1: Indicadores Financeiros (A Régua do Caixa).'
      )
    },

    /* 2. SLIDE 31 — EBITDA Agrícola */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores financeiros',
        renderIndSlide({
          name: 'EBITDA Agrícola',
          desc: 'Geração de caixa pura da operação agrícola antes de juros, impostos, depreciação e amortização.',
          formulaHTML: 'EBITDA = Receita Bruta − COE',
          formulaSub: 'Visão operacional direta de geração de caixa',
          formulaNote: 'EBITDA: mede a capacidade da fazenda de gerar dinheiro vivo antes da estrutura financeira e da reposição de frota.',
          exampleKicker: 'EXEMPLO MT (IMEA 26/27)',
          exampleText: 'Receita Bruta de <strong>R$ 8.710/ha</strong> − COE (desembolso direto) de <strong>R$ 6.029/ha</strong>.',
          resultKicker: 'GERAÇÃO DE CAIXA OPERACIONAL',
          resultBig: 'R$ 2.681/ha',
          resultSub: 'Margem EBITDA operacional de 30,8%',
          tip: 'EBITDA alto paga parcela do banco no curto prazo, mas não substitui o COT/CT na hora de renovar a frota.'
        }),
        'Indicadores Financeiros • 1 de 7 (Base IMEA 26/27).'
      )
    },

    /* 3. SLIDE 32 — COT */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores financeiros',
        renderIndSlide({
          name: 'COT — Custo Operacional Total',
          desc: 'Quanto custa produzir 1 hectare somando desembolso direto (COE) e desgaste da frota.',
          formulaHTML: 'COT = COE + Depreciação',
          formulaSub: '(Mecanização + Benfeitorias)',
          formulaNote: 'COE: desembolso direto de caixa na safra • Depreciação: reserva para repor máquinas e estruturas.',
          exampleKicker: 'EXEMPLO MT (IMEA 26/27 • SOJA R$ 130/SC)',
          exampleText: 'COE de <strong>R$ 6.029/ha</strong> + Depreciação de <strong>R$ 671/ha</strong>. A mecanização já representa <strong>16,2% do COT</strong>.',
          resultKicker: 'RESULTADO CONSOLIDADO',
          resultBig: 'R$ 6.700 / ha',
          resultSub: 'Equivalente a 51,5 sc/ha de ponto de equilíbrio',
          resultTone: 'amber',
          tip: 'Quem olha só o COE acha que sobrou caixa, mas está consumindo a frota sem provisionar reposição.'
        }),
        'Indicadores Financeiros • 2 de 7 (Base IMEA 26/27).'
      )
    },

    /* 4. SLIDE 33 — Margem Operacional (%) */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores financeiros',
        renderIndSlide({
          name: 'Margem Operacional (%)',
          desc: 'Percentual da receita bruta que sobra após pagar os custos operacionais da safra.',
          formulaHTML: `Margem Op. (%) = <span class="m4-frac"><span class="m4-frac-num">Receita Bruta − COT</span><span class="m4-frac-den">Receita Bruta</span></span> × 100`,
          formulaNote: 'Receita Bruta: produtividade × preço da saca • COT: desembolso + depreciação.',
          exampleKicker: 'EXEMPLO MT (IMEA 26/27 • 67 SC/HA)',
          exampleText: 'Receita de <strong>R$ 8.710/ha</strong> − COT de <strong>R$ 6.700/ha</strong> = sobra operacional de <strong>R$ 2.010/ha</strong>.',
          resultKicker: 'MARGEM OPERACIONAL',
          resultBig: '23,1% no COT',
          resultSub: 'Atenção: considerando o Custo Total (CT), cai para 5,7%',
          tip: 'A margem mostra a folga real da operação — qualquer ineficiência na frota come essa fatia direto.'
        }),
        'Indicadores Financeiros • 3 de 7 (Base IMEA 26/27).'
      )
    },

    /* 5. SLIDE 34 — Lucro por Hectare (R$/ha) */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores financeiros',
        renderIndSlide({
          name: 'Lucro por Hectare (R$/ha)',
          desc: 'Resultado líquido econômico que sobra por hectare depois de pagar absolutamente todos os custos (CT).',
          formulaHTML: 'Lucro / ha = Receita Bruta / ha − Custo Total (CT) / ha',
          formulaNote: 'CT (Custo Total): COT + remuneração da terra e custo de oportunidade do capital investido na frota.',
          exampleKicker: 'EXEMPLO MT (IMEA 26/27)',
          exampleText: 'Receita Bruta Modal de <strong>R$ 8.710/ha</strong> − Custo Total (CT) de <strong>R$ 8.210/ha</strong>.',
          resultKicker: 'SOBRA REAL LÍQUIDA',
          resultBig: 'R$ 500/ha',
          resultSub: 'Apenas 3,8 sc/ha de colchão econômico real',
          resultTone: 'red',
          tip: 'Com 3,8 sc/ha de colchão, perder 1,5 sc/ha no talhão ou queimar diesel à toa apaga quase 40% do lucro.'
        }),
        'Indicadores Financeiros • 4 de 7 (Base IMEA 26/27).'
      )
    },

    /* 6. SLIDE 35 — Payback */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores financeiros',
        renderIndSlide({
          name: 'Payback (Tempo de Retorno)',
          desc: 'Tempo necessário (em safras ou anos) para uma máquina ou tecnologia embarcada se pagar.',
          formulaHTML: `Payback (anos) = <span class="m4-frac"><span class="m4-frac-num">Investimento Inicial</span><span class="m4-frac-den">Ganho ou Economia Anual</span></span>`,
          formulaNote: 'Investimento Inicial: desembolso total de aquisição/instalação • Ganho Anual: economia de insumos, diesel ou sacas extras.',
          exampleKicker: 'EXEMPLO PRÁTICO • AGRICULTURA DE PRECISÃO',
          exampleText: 'Kit Piloto + Corte de Seção de <strong>R$ 120 mil</strong> gerando <strong>R$ 60 mil/ano</strong> de economia em insumos e sobreposição.',
          resultKicker: 'VELOCIDADE DE RETORNO',
          resultBig: '2,0 safras',
          resultSub: 'R$ 120.000 ÷ R$ 60.000/ano = capital recuperado em 2 anos',
          tip: 'Payback mede velocidade de retorno e risco de caixa, mas não mede o lucro gerado depois que o bem se paga.'
        }),
        'Indicadores Financeiros • 5 de 7.'
      )
    },

    /* 7. SLIDE 36 — ROI */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores financeiros',
        renderIndSlide({
          name: 'ROI — Retorno sobre Investimento',
          desc: 'Percentual de retorno líquido obtido para cada real aplicado em máquinas ou tecnologias.',
          formulaHTML: `ROI (%) = <span class="m4-frac"><span class="m4-frac-num">Ganho Acumulado − Investimento</span><span class="m4-frac-den">Investimento</span></span> × 100`,
          formulaNote: 'Ganho Acumulado: economia ou receita extra gerada no período • Investimento: valor total pago.',
          exampleKicker: 'EXEMPLO PRÁTICO • HORIZONTE DE 4 SAFRAS',
          exampleText: 'Investimento de <strong>R$ 120 mil</strong> gerando ganho acumulado de <strong>R$ 240 mil</strong> ao longo de 4 safras.',
          resultKicker: 'RETORNO LÍQUIDO',
          resultBig: 'ROI = +100%',
          resultSub: 'Retornou 2× o valor aplicado (R$ 120 mil de lucro líquido)',
          tip: 'Pagar 100% da tecnologia na nota e usar só 40% na cabine transforma ROI positivo no papel em prejuízo real.'
        }),
        'Indicadores Financeiros • 6 de 7.'
      )
    },

    /* 8. SLIDE 37 — TCO */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores financeiros',
        renderIndSlide({
          name: 'TCO — Custo Total de Propriedade',
          desc: 'Custo total de propriedade da máquina do dia da compra até a revenda — muito além da nota fiscal.',
          formulaHTML: 'TCO = Aquisição + Operação + Manutenção & Peças − Valor Residual',
          formulaSub: 'Operação = Diesel + Lubrificantes + Mão de Obra',
          formulaNote: 'TCO (Total Cost of Ownership): compara máquinas pelo ciclo completo de vida, não pelo preço de etiqueta.',
          exampleKicker: 'EXEMPLO TC 5.90 (CICLO DE 10 ANOS)',
          exampleText: 'Compra <strong>R$ 1,40 mi</strong> + Operação/Manut. <strong>~R$ 1,65 mi</strong> − Residual <strong>R$ 350 mil</strong>.',
          resultKicker: 'CUSTO REAL DO CICLO',
          resultBig: 'TCO ~R$ 2,70 milhões',
          resultSub: 'O valor da nota fiscal é apenas metade da conta real',
          resultTone: 'amber',
          tip: 'A máquina mais barata na compra que quebra mais e consome mais diesel quase sempre tem o pior TCO.'
        }),
        'Indicadores Financeiros • 7 de 7.'
      )
    },

    /* 9. SLIDE 38 — Wayfinding Técnicos & Agrícolas em foco */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores',
        renderWayfindingM4(2),
        'Módulo 4 • Etapa 1 concluída; Etapa 2: Indicadores Técnicos & Agrícolas em foco.'
      )
    },

    /* 10. SLIDE 39 — Disponibilidade Mecânica (DM) */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Máquina)',
        renderIndSlide({
          accent: 'amber',
          name: 'Disponibilidade Mecânica (DM)',
          desc: 'Percentual do tempo programado em que a máquina esteve mecanicamente pronta para trabalhar.',
          formulaHTML: `DM (%) = <span class="m4-frac"><span class="m4-frac-num">Horas Programadas − Horas Paradas Manut.</span><span class="m4-frac-den">Horas Programadas</span></span> × 100`,
          formulaNote: 'Horas Programadas: tempo previsto de operação • Paradas Manut.: corretivas e preventivas no turno.',
          exampleKicker: 'EXEMPLO PRÁTICO NA JANELA',
          exampleText: '<strong>100 h</strong> programadas na janela com <strong>10 h</strong> paradas na oficina → <strong>DM = 90%</strong>.',
          resultKicker: 'IMPACTO NA FROTA',
          resultBig: '90% → 75% de DM',
          resultSub: 'Equivale a perder 1 máquina inteira a cada 6',
          resultTone: 'red',
          tip: 'DM mede se a oficina entrega a máquina pronta, mas sozinha não revela se ela quebra várias vezes no dia.'
        }),
        'Indicadores Técnicos de Frota • 1 de 6.'
      )
    },

    /* 11. SLIDE 40 — Índice de Quebra */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Máquina)',
        renderIndSlide({
          accent: 'amber',
          name: 'Índice de Quebra',
          desc: 'Percentual das horas programadas perdidas especificamente por falhas corretivas não planejadas.',
          formulaHTML: `Índice de Quebra (%) = <span class="m4-frac"><span class="m4-frac-num">Horas Paradas por Quebra</span><span class="m4-frac-den">Horas Programadas</span></span> × 100`,
          formulaNote: 'Foco exclusivo em corretiva: separa o que foi revisão programada do que foi parada de emergência.',
          exampleKicker: 'EXEMPLO PRÁTICO NA JANELA',
          exampleText: '<strong>8 h</strong> de quebra corretiva em <strong>100 h</strong> programadas durante a janela operacional.',
          resultKicker: 'INDISPONIBILIDADE POR QUEBRA',
          resultBig: 'Índice = 8,0%',
          resultSub: 'Referência de boa gestão em safra: < 5%',
          resultTone: 'red',
          tip: 'Índice de quebra alto em plena safra é o recibo de revisão de entressafra mal feita ou checklist ignorado.'
        }),
        'Indicadores Técnicos de Frota • 2 de 6.'
      )
    },

    /* 12. SLIDE 41 — Confiabilidade (MTBF) */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Máquina)',
        renderIndSlide({
          accent: 'amber',
          name: 'Confiabilidade (MTBF)',
          desc: 'Tempo Médio Entre Falhas — mede quanto tempo a máquina roda sem interromper a operação.',
          formulaHTML: `MTBF (h) = <span class="m4-frac"><span class="m4-frac-num">Horas Trabalhadas</span><span class="m4-frac-den">Nº de Quebras</span></span>`,
          formulaNote: 'MTBF (Mean Time Between Failures): quanto maior, mais confiável e previsível é a máquina no talhão.',
          exampleKicker: 'EXEMPLO MATADOR — MESMA DM, REALIDADES OPOSTAS',
          compareHTML: `
            <div class="m4-cmp-stack">
              <div class="m4-cmp-item good">
                <div class="m4-cmp-top">
                  <strong style="font-size:16px;">Máquina A</strong>
                  <span class="m4-pill m4-pill-green">DM 90% • MTBF = 90 h</span>
                </div>
                <div style="font-size:14px;color:var(--text-primary);">
                  1 única quebra de 10 h em 100 h → <strong>operação contínua</strong>
                </div>
              </div>
              <div class="m4-cmp-item bad">
                <div class="m4-cmp-top">
                  <strong style="font-size:16px;">Máquina B</strong>
                  <span class="m4-pill m4-pill-red">DM 90% • MTBF = 9 h (CRÍTICO)</span>
                </div>
                <div style="font-size:14px;color:var(--text-primary);">
                  10 quebras de 1 h em 100 h → <strong>trava tudo toda hora</strong>
                </div>
              </div>
            </div>
          `,
          tip: 'Ambas têm 90% de DM, mas a Máquina B destrói a logística e trava transbordo, caminhão-pipa e equipe 10 vezes.'
        }),
        'Indicadores Técnicos de Frota • 3 de 6.'
      )
    },

    /* 13. SLIDE 42 — Consumo de Combustível (L/ha) */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Máquina)',
        renderIndSlide({
          accent: 'amber',
          name: 'Consumo de Combustível (L/ha)',
          desc: 'Litros reais de diesel consumidos por hectare efetivamente entregue — não apenas por hora de motor.',
          formulaHTML: `Consumo Real (L/ha) = <span class="m4-frac"><span class="m4-frac-num">Litros Totais Abastecidos</span><span class="m4-frac-den">Hectares Entregues</span></span>`,
          formulaNote: 'Por que L/ha? Conecta o gasto real na bomba à área efetivamente pronta no talhão.',
          exampleKicker: 'EXEMPLO COMPARATIVO — A ARMADILHA DO L/H',
          compareHTML: `
            <div class="m4-cmp-stack">
              <div class="m4-cmp-item bad">
                <div class="m4-cmp-top">
                  <strong style="font-size:16px;">Trator A</strong>
                  <span class="m4-pill m4-pill-red">12,0 L/ha (CARO)</span>
                </div>
                <div style="font-size:14px;color:var(--text-primary);">
                  24 L/h ÷ 2,0 ha/h → gasta menos/h, mas <strong>encarece o hectare</strong>
                </div>
              </div>
              <div class="m4-cmp-item good">
                <div class="m4-cmp-top">
                  <strong style="font-size:16px;">Trator B</strong>
                  <span class="m4-pill m4-pill-green">9,0 L/ha (EFICIENTE)</span>
                </div>
                <div style="font-size:14px;color:var(--text-primary);">
                  28 L/h ÷ 3,1 ha/h → <strong>-25% diesel por hectare entregue</strong>
                </div>
              </div>
            </div>
          `,
          tip: 'Premiar apenas menor L/h incentiva rodar em marcha baixa e encarece o hectare. O que manda é L/ha.'
        }),
        'Indicadores Técnicos de Frota • 4 de 6.'
      )
    },

    /* 14. SLIDE 43 — Horas Improdutivas & Eficiência Operacional */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Máquina)',
        renderIndSlide({
          accent: 'amber',
          name: 'Horas Improdutivas & Eficiência Operacional',
          desc: 'Quanto do tempo de motor ligado vira área efetivamente trabalhada vs. espera, manobra e ociosidade.',
          formulaHTML: `
            <div style="display:flex;flex-direction:column;gap:12px;align-items:center;">
              <div>Eficiência Op. (%) = <span class="m4-frac"><span class="m4-frac-num">Horas Efetivas</span><span class="m4-frac-den">Horas Totais Motor</span></span> × 100</div>
              <div>Ociosidade (%) = <span class="m4-frac"><span class="m4-frac-num">Horas Parado Ligado</span><span class="m4-frac-den">Horas Motor</span></span> × 100</div>
            </div>
          `,
          formulaNote: 'Horas Efetivas: máquina realmente plantando, pulverizando ou colhendo (sem manobras e esperas).',
          exampleKicker: 'EXEMPLO PRÁTICO • TURNO DE 10 HORAS',
          exampleText: 'Em <strong>10 h</strong> de motor ligado: <strong>6,5 h</strong> trabalhando e <strong>3,5 h</strong> em manobra, espera ou ar-condicionado.',
          resultKicker: 'RESULTADO DO TURNO',
          resultBig: 'Eficiência = 65%',
          resultSub: 'Meta de referência em campo: > 75% a 80%',
          resultTone: 'amber',
          tip: 'Cada ponto ganho em eficiência operacional entrega mais hectares por dia e dilui o custo fixo sem comprar máquina.'
        }),
        'Indicadores Técnicos de Frota • 5 de 6.'
      )
    },

    /* 15. SLIDE 44 — Tempo de Manutenção (MTTR) */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Máquina)',
        renderIndSlide({
          accent: 'amber',
          name: 'Tempo de Manutenção (MTTR)',
          desc: 'Tempo médio necessário para diagnosticar, reparar e devolver a máquina funcionando ao talhão.',
          formulaHTML: `MTTR (h) = <span class="m4-frac"><span class="m4-frac-num">Tempo Total em Manutenção</span><span class="m4-frac-den">Nº de Paradas</span></span>`,
          formulaNote: 'MTTR (Mean Time To Repair): inclui diagnóstico, espera por peça, reparo e liberação para o campo.',
          exampleKicker: 'EXEMPLO PRÁTICO NA OFICINA',
          exampleText: '<strong>5 quebras</strong> na safra somando <strong>20 horas</strong> de máquina parada na oficina ou esperando peça.',
          resultKicker: 'TEMPO MÉDIO DE REPARO',
          resultBig: 'MTTR = 4,0 h/parada',
          resultSub: '20 h totais ÷ 5 paradas (quanto menor, melhor a resposta)',
          resultTone: 'amber',
          tip: 'MTTR alto raramente é só lentidão do mecânico — costuma ser falta de peça crítica, logística ruim ou diagnóstico demorado.'
        }),
        'Indicadores Técnicos de Frota • 6 de 6.'
      )
    },

    /* 16. SLIDE 45 — Eficiência de Plantio */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Operacional)',
        renderIndSlide({
          name: 'Eficiência de Plantio',
          desc: 'Capacidade de entregar área dentro da janela agronômica preservando estande e singulação.',
          formulaHTML: `Capacidade (ha/dia) = <span class="m4-frac"><span class="m4-frac-num">Área Plantada</span><span class="m4-frac-den">Dias Úteis</span></span>`,
          formulaSub: 'Metas de Qualidade: Singulação ≥ 98% | CV Espaçamento < 15%',
          formulaNote: 'Equilíbrio obrigatório: ritmo diário para cumprir a janela sem destruir a distribuição de sementes.',
          exampleKicker: 'EXEMPLO PRÁTICO — VELOCIDADE VS. ESTANDE',
          exampleText: 'Acelerar demais a plantadeira entrega <strong>+15% de ha/dia</strong> no curto prazo, mas derruba a singulação no sulco.',
          resultKicker: 'CONTA NA COLHEITA',
          resultBig: '−3 a −5 sc/ha',
          resultSub: 'Perda produtiva por falhas, duplas e emergência desuniforme',
          resultTone: 'red',
          tip: 'Plantio rápido e desuniforme não é eficiência — é perda de teto produtivo contratada para 120 dias depois.'
        }),
        'Indicadores Agrícolas de Talhão • 1 de 4.'
      )
    },

    /* 17. SLIDE 46 — Eficiência de Pulverização */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Operacional)',
        renderIndSlide({
          name: 'Eficiência de Pulverização',
          desc: 'Precisão de dose aplicada no alvo, sem deriva ou sobreposição, com alta disponibilidade de calda.',
          formulaHTML: `Desvio de Dose (%) = <span class="m4-frac"><span class="m4-frac-num">Taxa Real − Taxa Alvo</span><span class="m4-frac-den">Taxa Alvo</span></span> × 100`,
          formulaSub: 'Tolerância: ±5% + Monitorar % de Sobreposição',
          formulaNote: 'Precisão + Logística: dose certa no alvo com corte de seção calibrado e abastecimento rápido.',
          exampleKicker: 'EXEMPLO PRÁTICO • 1.000 HA DE DEFENSIVOS',
          exampleText: 'Apenas <strong>5% de sobreposição ou erro de dose</strong> sobre R$ 1.200/ha de defensivos em 1.000 ha.',
          resultKicker: 'DESPERDÍCIO DIRETO',
          resultBig: 'R$ 60 mil / safra',
          resultSub: 'Jogados fora sem entregar 1 grama a mais de controle',
          resultTone: 'amber',
          tip: 'Sem calda pronta e corte de seção calibrado, o pulverizador gasta a janela abastecendo ou desperdiçando defensivo.'
        }),
        'Indicadores Agrícolas de Talhão • 2 de 4.'
      )
    },

    /* 18. SLIDE 47 — Eficiência de Colheita */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Operacional)',
        renderIndSlide({
          name: 'Eficiência de Colheita',
          desc: 'Ritmo de colheita (ha/h ou t/h) com descarga sincronizada, baixa ociosidade e qualidade de grão no graneleiro.',
          formulaHTML: `Rendimento (ha/h) = <span class="m4-frac"><span class="m4-frac-num">Área Colhida</span><span class="m4-frac-den">Horas Motor</span></span>`,
          formulaSub: '+ Qualidade: % Grãos Quebrados e Impurezas',
          formulaNote: 'Rendimento real: depende de descarga em movimento (bazuca sincronizada) e regulagem de trilha.',
          exampleKicker: 'EXEMPLO PRÁTICO • GARGALO DE DESCARGA',
          exampleText: 'Parar a colhedora para descarregar ou esperar bazuca/caminhão empurra a operação para o risco de chuva.',
          resultKicker: 'QUEDA DE CAPACIDADE',
          resultBig: '−15% a −20% ha/dia',
          resultSub: 'Menor ritmo diário atrasa também a janela da 2ª safra',
          resultTone: 'red',
          tip: 'Colher rápido enchendo o graneleiro de impureza ou grão quebrado vira desconto direto na balança do armazém.'
        }),
        'Indicadores Agrícolas de Talhão • 3 de 4.'
      )
    },

    /* 19. SLIDE 48 — Perdas Operacionais (Colheita) */
    {
      module: 4,
      render: () => wrapM4(
        'Indicadores técnicos (Operacional)',
        renderIndSlide({
          accent: 'red',
          name: 'Perdas Operacionais (Colheita)',
          desc: 'Medição direta atrás da colhedora (armação 1 m² ou 2 m²) dos grãos que caíram no chão por plataforma ou trilha.',
          formulaHTML: `Perda (sc/ha) = <span class="m4-frac"><span class="m4-frac-num">Peso Coletado (g/m²)</span><span class="m4-frac-den">6</span></span>`,
          formulaSub: 'Regra prática de campo: 6 g/m² = 1,0 sc/ha',
          formulaNote: 'Medição rápida: coleta atrás da máquina (plataforma + trilha/limpeza) para ajuste imediato no talhão.',
          exampleKicker: 'EXEMPLO MT (1.000 HA • SOJA R$ 130/SC)',
          exampleText: 'Perda evitável de <strong>+1,5 sc/ha (9 g/m² no chão)</strong> sobre a margem real de 3,8 sc/ha do CT.',
          resultKicker: 'DINHEIRO DEIXADO NO CHÃO',
          resultBig: 'R$ 195 mil / safra',
          resultSub: 'Consome 39% de toda a sobra real da lavoura',
          resultTone: 'red',
          tip: 'Medir perdas leva 5 minutos no talhão e é o indicador de retorno financeiro mais imediato da fazenda.'
        }),
        'Indicadores Agrícolas de Talhão • 4 de 4.'
      )
    },

    /* 20. SLIDE 49 — Ponte M4 -> M5: Do Papel ao Tempo Real */
    {
      module: 4,
      render: () => wrapM4(
        'Do Papel ao Tempo Real',
        `
        <div class="m4-wrap">
          <div style="text-align:center;font-size:17px;font-weight:700;color:var(--text-secondary);">
            Por que os indicadores não sobrevivem na prancheta
          </div>

          <div class="m4-bridge-grid">
            <div class="m4-bridge-card m4-card-red" style="border-top:6px solid var(--red);">
              <div>
                <div class="m4-kicker" style="color:var(--red-dark);">GESTÃO NO RETROVISOR</div>
                <div style="font-size:24px;font-weight:900;margin-top:4px;">Prancheta & Planilha Semanal</div>
              </div>
              <ul class="m4-bridge-ul">
                <li><span style="color:var(--red);font-weight:900;">✕</span> Dado chega dias depois da operação</li>
                <li><span style="color:var(--red);font-weight:900;">✕</span> Gestor faz "autópsia" pós-safra</li>
                <li><span style="color:var(--red);font-weight:900;">✕</span> Desvio vira prejuízo antes da correção</li>
              </ul>
              <div style="font-size:13px;font-weight:800;color:var(--red-dark);padding-top:10px;border-top:1px solid var(--red-border);">
                Reage tarde — quando o custo já saiu do caixa.
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:center;color:var(--amber);">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            <div class="m4-bridge-card m4-card-soft" style="border-top:6px solid var(--senar-green);">
              <div>
                <div class="m4-kicker">GESTÃO NO TALHÃO</div>
                <div style="font-size:24px;font-weight:900;margin-top:4px;">Tempo Real: Telemetria + IA</div>
              </div>
              <ul class="m4-bridge-ul">
                <li><span style="color:var(--senar-green);font-weight:900;">✓</span> Monitoramento vivo direto da cabine</li>
                <li><span style="color:var(--senar-green);font-weight:900;">✓</span> Alerta imediato de ociosidade, L/ha e falha</li>
                <li><span style="color:var(--senar-green);font-weight:900;">✓</span> Correção no mesmo dia protege a margem</li>
              </ul>
              <div style="font-size:13px;font-weight:800;color:var(--senar-green);padding-top:10px;border-top:1px solid var(--senar-green-border);">
                Atua durante a janela — antes de virar prejuízo.
              </div>
            </div>
          </div>

          <div class="m4-eq-bar" style="justify-content:space-between;padding:10px 18px;">
            <span style="font-size:13px;font-weight:700;">Indicador vivo só funciona quando chega na mão de quem decide no mesmo dia.</span>
            <span class="m4-eq-gold">PRÓXIMO PASSO → Módulo 5: Tecnologias que Aumentam os Resultados</span>
          </div>
        </div>
        `,
        'Fim do Módulo 4 • Ponte para Telemetria & IA.'
      )
    }
  ];

  window.EXTRA_SLIDES = window.EXTRA_SLIDES || [];
  window.EXTRA_SLIDES.push(...M4_SLIDES);
  window.M4_SLIDES = M4_SLIDES;
})();
