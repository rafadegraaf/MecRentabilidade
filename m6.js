/* ==========================================================================
   MÓDULO 6 — ENCERRAMENTO & AÇÃO (Slides 52 a 55 da V6 — 4 slides)
   Alinhado exatamente ao motor de index.html:
   - Cada slide expõe { module: 6, render: () => ..., onMount }
   - Suporte nativo a Tema Claro / Escuro via CSS tokens do index.html
   - 100% dos textos originais da V6 preservados
   ========================================================================== */

(function () {
  if (!document.getElementById('m6-styles')) {
    const style = document.createElement('style');
    style.id = 'm6-styles';
    style.textContent = `
      .m6-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
        color: var(--text-primary);
      }

      .m6-kicker {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--senar-green);
      }
      [data-theme="dark"] .m6-kicker {
        color: var(--senar-green-bright);
      }

      .m6-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 4px 11px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .m6-pill-green { background: var(--senar-green); color: #fff; }
      .m6-pill-soft { background: var(--senar-green-soft); color: var(--senar-green); border: 1px solid var(--senar-green-border); }
      .m6-pill-amber { background: var(--amber-soft); color: var(--amber-dark); border: 1px solid var(--amber-border); }
      .m6-pill-gold { background: var(--gold); color: #0F172A; font-weight: 900; }

      [data-theme="dark"] .m6-pill-soft { color: var(--senar-green-bright); }

      /* Slide 52 — Síntese da Jornada (4 Verbos) */
      .m6-sub-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .m6-subtitle {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-secondary);
      }

      .m6-journey-flow {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
        gap: 10px;
        align-items: stretch;
        flex: 1;
        min-height: 0;
      }
      .m6-step {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-top: 5px solid var(--senar-green);
        border-radius: 16px;
        padding: 18px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.4s ease, transform 0.4s ease;
      }
      .m6-step.is-shown {
        opacity: 1;
        transform: translateY(0);
      }
      .m6-step.is-final {
        background: var(--senar-green-soft);
        border-color: var(--senar-green-border);
        border-top-color: var(--amber);
      }
      .m6-step-tag {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.09em;
        color: var(--senar-green);
      }
      [data-theme="dark"] .m6-step-tag { color: var(--senar-green-bright); }
      .m6-step.is-final .m6-step-tag { color: var(--amber-dark); }

      .m6-step-title {
        font-size: 20px;
        font-weight: 900;
        color: var(--text-primary);
        line-height: 1.15;
        margin-top: 4px;
      }
      .m6-step-desc {
        font-size: 13.5px;
        font-weight: 500;
        color: var(--text-secondary);
        line-height: 1.45;
        margin-top: 8px;
      }
      .m6-step-mod {
        font-size: 11.5px;
        font-weight: 800;
        color: var(--text-muted);
        padding-top: 10px;
        border-top: 1px solid var(--border-color);
      }
      .m6-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--amber);
      }

      .m6-anchor-dark {
        background: linear-gradient(135deg, var(--senar-green-dark) 0%, var(--senar-green) 100%);
        color: #FFFFFF;
        border-radius: 13px;
        padding: 13px 22px;
        text-align: center;
        font-size: 16.5px;
        font-weight: 800;
        letter-spacing: -0.01em;
      }
      .m6-anchor-dark strong {
        color: var(--gold);
      }

      /* Slide 53 — Compromisso Prático • Enquete (6 cards clicáveis no palco) */
      .m6-poll-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 14px;
        flex: 1;
        min-height: 0;
      }
      .m6-poll-card {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-radius: 15px;
        padding: 18px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        cursor: pointer;
        text-align: left;
        color: var(--text-primary);
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
      }
      .m6-poll-card:hover {
        border-color: var(--senar-green);
        transform: translateY(-2px);
      }
      .m6-poll-card.is-picked {
        background: var(--senar-green-soft);
        border: 2px solid var(--senar-green);
        box-shadow: 0 8px 22px rgba(0, 104, 55, 0.16);
      }
      .m6-poll-num {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: var(--senar-green);
        color: #FFFFFF;
        font-size: 15px;
        font-weight: 900;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .m6-poll-card.is-picked .m6-poll-num {
        background: var(--amber);
        color: #0F172A;
      }
      .m6-poll-title {
        font-size: 18px;
        font-weight: 900;
        line-height: 1.2;
        color: var(--text-primary);
      }
      .m6-poll-desc {
        font-size: 13.5px;
        font-weight: 500;
        color: var(--text-secondary);
        line-height: 1.42;
      }

      /* Slide 54 — Mensagem Final (Keynote) */
      .m6-keynote {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 28px;
        padding: 20px 44px;
      }
      .m6-quote {
        font-size: 42px;
        font-weight: 900;
        line-height: 1.22;
        letter-spacing: -0.025em;
        color: var(--text-primary);
        max-width: 980px;
      }
      .m6-quote-hl {
        position: relative;
        display: inline-block;
        color: var(--senar-green);
      }
      [data-theme="dark"] .m6-quote-hl {
        color: var(--senar-green-bright);
      }
      .m6-quote-hl::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -4px;
        height: 6px;
        border-radius: 999px;
        background: var(--amber);
      }
      .m6-pillars-strip {
        display: inline-flex;
        align-items: center;
        gap: 18px;
        padding: 13px 28px;
        border-radius: 999px;
        background: var(--senar-green-soft);
        border: 1.5px solid var(--senar-green-border);
        font-size: 15px;
        font-weight: 900;
        letter-spacing: 0.1em;
        color: var(--senar-green);
      }
      [data-theme="dark"] .m6-pillars-strip {
        color: var(--senar-green-bright);
      }
      .m6-pillars-dot {
        color: var(--amber);
        font-size: 18px;
        line-height: 1;
      }

      /* Slide 55 — Fechamento Institucional (Muito Obrigado) */
      .m6-closing-hero {
        width: 100%;
        height: 100%;
        position: relative;
        background: linear-gradient(135deg, #064E3B 0%, #006837 50%, #022C22 100%);
        color: #FFFFFF;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 50px 72px 44px;
      }
      .m6-closing-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.22;
        pointer-events: none;
      }
      .m6-closing-layer {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .m6-closing-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 18px;
      }
      .m6-closing-tag {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.28);
        color: #A7F3D0;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 9px 22px;
        border-radius: 999px;
      }
      .m6-closing-thanks {
        font-size: 74px;
        font-weight: 900;
        letter-spacing: -0.03em;
        line-height: 1.02;
        color: #FFFFFF;
      }
      .m6-closing-bar {
        width: 120px;
        height: 6px;
        border-radius: 999px;
        background: var(--gold);
      }
      .m6-closing-author {
        font-size: 22px;
        font-weight: 700;
        color: #E2E8F0;
      }
      .m6-closing-foot {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding-bottom: 14px;
      }
    `;
    document.head.appendChild(style);
  }

  function wrapM6(title, bodyHTML, footnote) {
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

  const ARROW_SVG = `
    <div class="m6-arrow">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </div>
  `;

  /* ==========================================================================
     DEFINIÇÃO DOS 4 SLIDES DO MÓDULO 6 (Slides 52 a 55 da V6)
     ========================================================================== */
  const M6_SLIDES = [
    /* SLIDE 52 — Síntese da Jornada: O Caminho para Proteger a Margem */
    {
      module: 6,
      render: () => wrapM6(
        'O Caminho para Proteger a Margem',
        `
        <div class="m6-wrap">
          <div class="m6-sub-row">
            <span class="m6-subtitle">Da leitura do custo real à decisão no talhão em 4 passos contínuos</span>
            <span class="m6-pill m6-pill-soft">SÍNTESE DA JORNADA</span>
          </div>

          <div class="m6-journey-flow">
            <article class="m6-step">
              <div>
                <div class="m6-step-tag">01 • ENXERGAR</div>
                <div class="m6-step-title">Enxergar o Custo</div>
                <p class="m6-step-desc">Separar COE, COT e CT. Entender depreciação, custo de capital e o peso real da mecanização na saca.</p>
              </div>
              <div class="m6-step-mod">Módulos 1 & 2</div>
            </article>

            ${ARROW_SVG}

            <article class="m6-step">
              <div>
                <div class="m6-step-tag">02 • CAÇAR</div>
                <div class="m6-step-title">Caçar o Gargalo</div>
                <p class="m6-step-desc">Atacar vazamentos de caixa (logística, diesel, quebra) e de ROI (janela, regulagem e tecnologia ociosa).</p>
              </div>
              <div class="m6-step-mod">Módulo 3</div>
            </article>

            ${ARROW_SVG}

            <article class="m6-step">
              <div>
                <div class="m6-step-tag">03 • MEDIR</div>
                <div class="m6-step-title">Medir o Indicador</div>
                <p class="m6-step-desc">Sair do achismo com régua financeira (TCO, ROI, Lucro/ha) e técnica (DM, MTBF, L/ha, perdas).</p>
              </div>
              <div class="m6-step-mod">Módulo 4</div>
            </article>

            ${ARROW_SVG}

            <article class="m6-step is-final">
              <div>
                <div class="m6-step-tag">04 • DECIDIR</div>
                <div class="m6-step-title">Decidir com Dados</div>
                <p class="m6-step-desc">Usar telemetria e IA como filtro de exceção para corrigir o desvio no mesmo dia, ainda na safra.</p>
              </div>
              <div class="m6-step-mod" style="color:var(--amber-dark);">Módulo 5</div>
            </article>
          </div>

          <div class="m6-anchor-dark">
            Tecnologia e indicador só viram <strong>margem</strong> quando mudam a rotina de quem opera e de quem decide.
          </div>
        </div>
        `,
        'Módulo 6 • Síntese completa da jornada de gestão de mecanização.'
      ),
      onMount: () => {
        requestAnimationFrame(() => {
          document.querySelectorAll('.m6-step').forEach((card, i) => {
            setTimeout(() => card.classList.add('is-shown'), i * 110);
          });
        });
      }
    },

    /* SLIDE 53 — Compromisso Prático • Enquete */
    {
      module: 6,
      render: () => wrapM6(
        'Qual indicador você se compromete a atacar amanhã cedo?',
        `
        <div class="m6-wrap">
          <div class="m6-sub-row">
            <span class="m6-subtitle">Votação rápida no auditório — escolha a sua prioridade</span>
            <span class="m6-pill m6-pill-amber">COMPROMISSO PRÁTICO • ENQUETE</span>
          </div>

          <div class="m6-poll-grid" id="m6-poll-grid">
            <button type="button" class="m6-poll-card">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="m6-poll-num">01</span>
                <span class="m6-poll-title">Ociosidade & Eficiência Op.</span>
              </div>
              <p class="m6-poll-desc">Cortar motor ligado parado e tempo improdutivo no turno</p>
            </button>

            <button type="button" class="m6-poll-card">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="m6-poll-num">02</span>
                <span class="m6-poll-title">Consumo Real (L/ha)</span>
              </div>
              <p class="m6-poll-desc">Sair da armadilha do L/h e ajustar marcha, lastragem e giro</p>
            </button>

            <button type="button" class="m6-poll-card">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="m6-poll-num">03</span>
                <span class="m6-poll-title">DM, MTBF & Quebras</span>
              </div>
              <p class="m6-poll-desc">Reduzir paradas em janela com checklist e revisão preventiva</p>
            </button>

            <button type="button" class="m6-poll-card">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="m6-poll-num">04</span>
                <span class="m6-poll-title">Logística & Deslocamentos</span>
              </div>
              <p class="m6-poll-desc">Calda pronta, transbordo sincronizado e máquina fora do asfalto</p>
            </button>

            <button type="button" class="m6-poll-card">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="m6-poll-num">05</span>
                <span class="m6-poll-title">Perdas no Talhão & Regulagem</span>
              </div>
              <p class="m6-poll-desc">Medir colheita, calibrar bicos/faixa e zerar retrabalho</p>
            </button>

            <button type="button" class="m6-poll-card">
              <div style="display:flex;align-items:center;gap:12px;">
                <span class="m6-poll-num">06</span>
                <span class="m6-poll-title">Custo Real por Hectare</span>
              </div>
              <p class="m6-poll-desc">Fechar a conta real da frota (COT/CT) e diluir custo fixo</p>
            </button>
          </div>
        </div>
        `,
        'Módulo 6 • Clique em qualquer cartão no palco para destacar a prioridade mais votada.'
      ),
      onMount: () => {
        document.querySelectorAll('#m6-poll-grid .m6-poll-card').forEach(card => {
          card.addEventListener('click', () => {
            card.classList.toggle('is-picked');
          });
        });
      }
    },

    /* SLIDE 54 — Mensagem Final (Keynote) */
    {
      module: 6,
      render: () => wrapM6(
        'Mensagem Final',
        `
        <div class="m6-wrap">
          <div class="m6-keynote">
            <span class="m6-pill m6-pill-green" style="font-size:12px;padding:6px 16px;">MENSAGEM FINAL</span>

            <blockquote class="m6-quote">
              Não se tem controle do que não se mede —<br>
              e não se constrói lucro com o que se mede e <span class="m6-quote-hl">não vira ação.</span>
            </blockquote>

            <div class="m6-pillars-strip">
              <span>MEDIR NO CAMPO</span>
              <span class="m6-pillars-dot">•</span>
              <span>DECIDIR NO DIA</span>
              <span class="m6-pillars-dot">•</span>
              <span>PROTEGER A MARGEM</span>
            </div>
          </div>
        </div>
        `,
        'Módulo 6 • Fechamento técnico-estratégico.'
      )
    },

    /* SLIDE 55 — Fechamento Institucional (Muito Obrigado) */
    {
      module: 6,
      render: () => `
        <section class="slide-view m6-closing-hero">
          <img src="assets/capa.jpg" alt="" class="m6-closing-bg" onerror="this.style.display='none'">
          <div class="m6-closing-layer">
            <div style="display:flex;justify-content:center;">
              <span class="m6-closing-tag">TUDO QUE VEM PARA O SENAR VOLTA PARA O CAMPO</span>
            </div>

            <div class="m6-closing-center">
              <h1 class="m6-closing-thanks">MUITO OBRIGADO</h1>
              <div class="m6-closing-bar"></div>
              <p class="m6-closing-author">Rafael De Graaf • Mecanização e Tecnologia Agrícola • SENAR MT</p>
            </div>

            <div class="m6-closing-foot">
              <img src="assets/logo_senar.png" class="logo-on-dark" style="height:54px;width:auto;object-fit:contain;" alt="SENAR Mato Grosso"
                   onerror="this.outerHTML='<span class=\\'logo-fallback\\'>SENAR MATO GROSSO</span>'">
              <img src="assets/logo-sistemafamato.png" class="logo-on-dark" style="height:36px;width:auto;object-fit:contain;" alt="Sistema FAMATO"
                   onerror="this.outerHTML='<span class=\\'logo-fallback\\'>SISTEMA FAMATO</span>'">
            </div>
          </div>
        </section>
      `
    }
  ];

  window.EXTRA_SLIDES = window.EXTRA_SLIDES || [];
  window.EXTRA_SLIDES.push(...M6_SLIDES);
  window.M6_SLIDES = M6_SLIDES;
})();
