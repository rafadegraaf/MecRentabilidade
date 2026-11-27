/* ==========================================================================
   MÓDULO 5 — TECNOLOGIAS PARA GESTÃO DE FROTAS (Slides 50 e 51 da V6 — 2 slides)
   Alinhado exatamente ao motor de index.html:
   - Cada slide expõe { module: 5, render: () => wrapM5(title, bodyHTML, footnote), onMount }
   - Suporte nativo a Tema Claro / Escuro via CSS tokens do index.html
   - 100% dos textos originais da V6 preservados
   ========================================================================== */

(function () {
  if (!document.getElementById('m5-styles')) {
    const style = document.createElement('style');
    style.id = 'm5-styles';
    style.textContent = `
      .m5-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        color: var(--text-primary);
      }

      .m5-subhead {
        font-size: 20px;
        font-weight: 900;
        color: var(--text-primary);
        letter-spacing: -0.02em;
        line-height: 1.15;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      /* Cards base */
      .m5-card {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-radius: 14px;
        padding: 15px 18px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
      }
      .m5-card-soft {
        background: var(--senar-green-soft);
        border: 1.5px solid var(--senar-green-border);
        border-radius: 14px;
        padding: 14px 16px;
      }
      .m5-card-red {
        background: var(--red-soft);
        border: 1.5px solid var(--red-border);
        border-radius: 14px;
        padding: 14px 16px;
      }
      .m5-card-amber {
        background: var(--amber-soft);
        border: 1.5px solid var(--amber-border);
        border-radius: 14px;
        padding: 12px 16px;
      }

      /* Kickers e pills */
      .m5-kicker {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--senar-green);
      }
      [data-theme="dark"] .m5-kicker {
        color: var(--senar-green-bright);
      }

      .m5-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 10.5px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .m5-pill-green { background: var(--senar-green); color: #fff; }
      .m5-pill-soft { background: var(--senar-green-soft); color: var(--senar-green); border: 1px solid var(--senar-green-border); }
      .m5-pill-red { background: var(--red-soft); color: var(--red-dark); border: 1px solid var(--red-border); }
      .m5-pill-amber { background: var(--amber-soft); color: var(--amber-dark); border: 1px solid var(--amber-border); }
      .m5-pill-gold { background: var(--gold); color: #0F172A; font-weight: 900; }

      [data-theme="dark"] .m5-pill-soft { color: var(--senar-green-bright); }

      /* Slide 50: Layout Telemetria & Big Data */
      .m5-split-flow {
        display: grid;
        grid-template-columns: 1.06fr auto 0.94fr;
        gap: 16px;
        align-items: stretch;
        flex: 1;
        min-height: 0;
      }
      .m5-panel {
        border-radius: 16px;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
      }
      .m5-data-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        flex: 1;
      }
      .m5-data-item {
        background: var(--card-elevated);
        border: 1.5px solid var(--border-color);
        border-left: 4px solid var(--senar-green);
        border-radius: 11px;
        padding: 11px 13px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
      }
      .m5-data-title {
        font-size: 14.5px;
        font-weight: 800;
        color: var(--text-primary);
      }
      .m5-data-desc {
        font-size: 12.5px;
        color: var(--text-secondary);
        line-height: 1.38;
      }

      .m5-ul-red {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .m5-ul-red li {
        position: relative;
        padding-left: 16px;
        font-size: 13.5px;
        line-height: 1.42;
        color: var(--text-secondary);
      }
      .m5-ul-red li strong { color: var(--text-primary); }
      .m5-ul-red li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 7px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--red);
      }

      /* Slide 51: IA no Operations via Chat */
      .m5-ia-grid {
        display: grid;
        grid-template-columns: 1.12fr 0.88fr;
        gap: 18px;
        flex: 1;
        min-height: 0;
      }
      .m5-chat-shell {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      }
      .m5-chat-top {
        background: linear-gradient(135deg, var(--senar-green-dark) 0%, var(--senar-green) 100%);
        color: #FFFFFF;
        padding: 11px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .m5-chat-body {
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        flex: 1;
      }
      .m5-bubble-user {
        background: var(--card-elevated);
        border: 1.5px solid var(--border-strong);
        border-radius: 12px 12px 4px 12px;
        padding: 11px 14px;
        margin-left: 24px;
      }
      .m5-bubble-ai {
        background: var(--senar-green-soft);
        border: 1.5px solid var(--senar-green-border);
        border-left: 5px solid var(--senar-green);
        border-radius: 12px;
        padding: 13px 15px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.45s ease, transform 0.45s ease;
      }
      .m5-bubble-ai.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
      .m5-ai-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .m5-ai-list li {
        font-size: 13px;
        line-height: 1.38;
        color: var(--text-primary);
        padding-left: 14px;
        position: relative;
      }
      .m5-ai-list li::before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--senar-green);
        font-weight: 900;
      }

      .m5-pillars {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 11px;
      }
      .m5-pillar-card {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-left: 5px solid var(--senar-green);
        border-radius: 14px;
        padding: 13px 16px;
        display: flex;
        align-items: flex-start;
        gap: 13px;
        flex: 1;
      }
      .m5-pillar-num {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: var(--senar-green);
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
      }

      /* Faixas de ancoragem */
      .m5-bar-dark {
        background: linear-gradient(135deg, var(--senar-green-dark) 0%, var(--senar-green) 100%);
        color: #FFFFFF;
        border-radius: 12px;
        padding: 11px 18px;
        font-size: 13.5px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }
      .m5-bar-amber {
        background: var(--amber-soft);
        border: 1.5px solid var(--amber-border);
        border-left: 5px solid var(--amber);
        border-radius: 11px;
        padding: 11px 16px;
        font-size: 13.5px;
        font-weight: 700;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
    `;
    document.head.appendChild(style);
  }

  function wrapM5(title, bodyHTML, footnote) {
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

  /* ==========================================================================
     DEFINIÇÃO DOS 2 SLIDES DO MÓDULO 5 (Slides 50 e 51 da V6)
     ========================================================================== */
  const M5_SLIDES = [
    /* SLIDE 50 — Telemetria & Big Data no Campo */
    {
      module: 5,
      render: () => wrapM5(
        'Tecnologias para gestão de frotas',
        `
        <div class="m5-wrap">
          <div class="m5-subhead">
            <span>Telemetria & Big Data no Campo</span>
            <span class="m5-pill m5-pill-soft">MÓDULO 5 • 1 DE 2</span>
          </div>

          <div class="m5-split-flow">
            <!-- Esquerda: Big Data em Tempo Real -->
            <div class="m5-panel m5-card" style="border-top:5px solid var(--senar-green);">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <span class="m5-kicker">O QUE A TELEMETRIA JÁ ENTREGA</span>
                <span class="m5-pill m5-pill-green">BIG DATA EM TEMPO REAL</span>
              </div>

              <div class="m5-data-grid">
                <div class="m5-data-item">
                  <div class="m5-data-title">Motor & Diesel</div>
                  <div class="m5-data-desc">Consumo (L/ha), rotação, carga de motor e marcha lenta.</div>
                </div>
                <div class="m5-data-item">
                  <div class="m5-data-title">Operação & Mapas</div>
                  <div class="m5-data-desc">Piloto, corte de seção, velocidade e taxa aplicada no talhão.</div>
                </div>
                <div class="m5-data-item">
                  <div class="m5-data-title">Saúde Mecânica</div>
                  <div class="m5-data-desc">Códigos de falha, temperatura e pressão para ação preditiva.</div>
                </div>
                <div class="m5-data-item">
                  <div class="m5-data-title">Logística & Turno</div>
                  <div class="m5-data-desc">Manobras, deslocamentos, esperas e horas improdutivas.</div>
                </div>
              </div>

              <div class="m5-card-soft" style="padding:9px 12px;font-size:12.5px;font-weight:700;">
                Milhares de registros por dia saindo direto do barramento CAN da frota.
              </div>
            </div>

            <!-- Seta Central -->
            <div style="display:flex;align-items:center;justify-content:center;color:var(--amber);">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            <!-- Direita: O Gargalo Real -->
            <div class="m5-panel m5-card-red" style="border-top:5px solid var(--red);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                  <span class="m5-kicker" style="color:var(--red-dark);">ONDE A GESTÃO TRAVA</span>
                  <span class="m5-pill m5-pill-red">O GARGALO REAL</span>
                </div>
                <div style="font-size:20px;font-weight:900;color:var(--red-dark);line-height:1.2;margin-top:8px;">
                  Raro é o profissional capaz de enxergar o padrão
                </div>
              </div>

              <ul class="m5-ul-red">
                <li><strong>Excesso de telas e relatórios:</strong> a equipe se afoga em dados brutos e não fecha a análise no turno.</li>
                <li><strong>Perfil escasso no campo:</strong> cruzar telemetria, agronomia e custo para apontar a decisão exige tempo e domínio raro.</li>
                <li><strong>Dado parado vira arquivo morto:</strong> a fazenda paga pela conectividade, mas continua corrigindo só depois do prejuízo.</li>
              </ul>

              <div class="m5-card" style="padding:9px 12px;font-size:12.5px;font-weight:800;border-left:4px solid var(--red);">
                O problema deixou de ser falta de informação — hoje é falta de capacidade de leitura rápida.
              </div>
            </div>
          </div>

          <div class="m5-bar-amber">
            <span><strong style="color:var(--amber-dark);margin-right:6px;">▲ NA PRÁTICA:</strong> Telemetria sem leitura de padrão é apenas Big Data caro parado no servidor.</span>
          </div>
        </div>
        `,
        'Módulo 5 • Telemetria, Big Data e o gargalo humano de análise.'
      )
    },

    /* SLIDE 51 — IA no Operations: Análise via Chat & Relatórios Prontos */
    {
      module: 5,
      render: () => wrapM5(
        'Tecnologias para gestão de frotas',
        `
        <div class="m5-wrap tabular">
          <div class="m5-subhead">
            <span>IA no Operations: Análise via Chat & Relatórios Prontos</span>
            <span class="m5-pill m5-pill-soft">MÓDULO 5 • 2 DE 2</span>
          </div>

          <div class="m5-ia-grid">
            <!-- Esquerda: Simulação de Chat -->
            <div class="m5-chat-shell">
              <div class="m5-chat-top">
                <div style="font-weight:800;font-size:14.5px;display:flex;align-items:center;gap:8px;">
                  <span style="width:9px;height:9px;border-radius:50%;background:var(--gold);display:inline-block;"></span>
                  Operations • Assistente de IA
                </div>
                <span class="m5-pill m5-pill-gold">ANÁLISE VIA CHAT</span>
              </div>

              <div class="m5-chat-body">
                <div class="m5-bubble-user">
                  <div class="m5-kicker" style="color:var(--text-muted);margin-bottom:3px;">PERGUNTA DO GESTOR</div>
                  <div style="font-size:14px;font-weight:700;color:var(--text-primary);line-height:1.38;">
                    "Quais máquinas tiveram maior ociosidade e pior consumo (L/ha) nesta semana? Gere o relatório."
                  </div>
                </div>

                <div class="m5-bubble-ai" id="m5-ai-response">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                    <span class="m5-kicker">RELATÓRIO AUTOMÁTICO • 3 DESVIOS CRÍTICOS</span>
                    <span class="m5-pill m5-pill-green" style="font-size:10px;padding:3px 8px;">Gerado em segundos</span>
                  </div>

                  <ul class="m5-ai-list">
                    <li><strong>Colhedora 03:</strong> 24% de motor ocioso (espera recorrente de transbordo).</li>
                    <li><strong>Trator 07:</strong> +3,4 L/ha acima da média da frota no mesmo talhão.</li>
                    <li><strong>Pulverizador 02:</strong> alerta de pressão hidráulica — revisar antes da parada.</li>
                  </ul>

                  <div class="m5-card" style="padding:8px 12px;font-size:12.5px;font-weight:700;border-left:4px solid var(--amber);">
                    <strong style="color:var(--amber-dark);">Ação sugerida:</strong> ajustar logística de bazuca e revisar marcha/lastragem.
                  </div>
                </div>
              </div>
            </div>

            <!-- Direita: 3 Pilares -->
            <div class="m5-pillars">
              <div class="m5-pillar-card">
                <div class="m5-pillar-num">01</div>
                <div>
                  <div style="font-size:16px;font-weight:800;color:var(--text-primary);">Conversa direta com o Big Data</div>
                  <div style="font-size:13px;color:var(--text-secondary);line-height:1.4;margin-top:4px;">
                    O gestor pergunta em português no chat, sem precisar cruzar planilhas ou navegar em dezenas de menus.
                  </div>
                </div>
              </div>

              <div class="m5-pillar-card" style="border-left-color:var(--amber);">
                <div class="m5-pillar-num" style="background:var(--amber);color:#0F172A;">02</div>
                <div>
                  <div style="font-size:16px;font-weight:800;color:var(--text-primary);">Padrões e relatórios mastigados</div>
                  <div style="font-size:13px;color:var(--text-secondary);line-height:1.4;margin-top:4px;">
                    A IA varre milhares de registros da telemetria e entrega o relatório pronto apontando exatamente onde está o vazamento.
                  </div>
                </div>
              </div>

              <div class="m5-pillar-card">
                <div class="m5-pillar-num">03</div>
                <div>
                  <div style="font-size:16px;font-weight:800;color:var(--text-primary);">Foco na decisão, não na coleta</div>
                  <div style="font-size:13px;color:var(--text-secondary);line-height:1.4;margin-top:4px;">
                    Democratiza a análise de alto nível e devolve tempo para a liderança atuar no talhão no mesmo dia.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="m5-bar-dark">
            <span><strong style="color:var(--gold);margin-right:6px;">A REGRA DE OURO:</strong> A IA filtra o dado e entrega o relatório — mas nenhuma tecnologia faz o plano de ação ou audita o campo sozinha.</span>
            <span class="m5-pill m5-pill-gold">PRÓXIMO → MÓDULO 6</span>
          </div>
        </div>
        `,
        'Módulo 5 • Inteligência Artificial aplicada como filtro de exceção na gestão de frotas.'
      ),
      onMount: () => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const resp = document.getElementById('m5-ai-response');
            if (resp) resp.classList.add('is-visible');
          }, 260);
        });
      }
    }
  ];

  window.EXTRA_SLIDES = window.EXTRA_SLIDES || [];
  window.EXTRA_SLIDES.push(...M5_SLIDES);
  window.M5_SLIDES = M5_SLIDES;
})();
