/* ==========================================================================
   MÓDULO 3 — GARGALOS NA MECANIZAÇÃO (Slides 23 a 29 da V6 / Slides 22 a 28 no deck)
   Alinhado exatamente ao motor de index.html:
   - Cada slide expõe { module: 3, render: () => wrapM3(title, bodyHTML, footnote), onMount: () => ... }
   - Suporte nativo a Tema Claro / Escuro via CSS tokens do index.html
   - Correção aplicada no Slide 29: "Indicador → Meta → Ação"
   ========================================================================== */

(function () {
  if (!document.getElementById('m3-styles')) {
    const style = document.createElement('style');
    style.id = 'm3-styles';
    style.textContent = `
      .m3-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        color: var(--text-primary);
      }

      /* Cards base */
      .m3-card {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-radius: 14px;
        padding: 14px 16px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
      }
      .m3-card-soft {
        background: var(--senar-green-soft);
        border: 1.5px solid var(--senar-green-border);
        border-radius: 14px;
        padding: 12px 16px;
      }
      .m3-card-dark {
        background: linear-gradient(135deg, var(--senar-green-dark) 0%, var(--senar-green) 100%);
        color: #FFFFFF;
        border-radius: 14px;
        padding: 14px 18px;
        border: 1px solid rgba(255, 255, 255, 0.14);
      }
      .m3-card-amber {
        background: var(--amber-soft);
        border: 1.5px solid var(--amber-border);
        border-radius: 14px;
        padding: 12px 16px;
      }
      .m3-card-red {
        background: var(--red-soft);
        border: 1.5px solid var(--red-border);
        border-radius: 14px;
        padding: 12px 16px;
      }

      /* Kickers e pills */
      .m3-kicker {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--senar-green);
        margin-bottom: 3px;
      }
      [data-theme="dark"] .m3-kicker {
        color: var(--senar-green-bright);
      }

      .m3-pill {
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
      .m3-pill-green { background: var(--senar-green); color: #fff; }
      .m3-pill-soft { background: var(--senar-green-soft); color: var(--senar-green); border: 1px solid var(--senar-green-border); }
      .m3-pill-amber { background: var(--amber-soft); color: var(--amber-dark); border: 1px solid var(--amber-border); }
      .m3-pill-red { background: var(--red-soft); color: var(--red-dark); border: 1px solid var(--red-border); }
      .m3-pill-muted { background: var(--card-elevated); color: var(--text-muted); border: 1px solid var(--border-color); }

      [data-theme="dark"] .m3-pill-soft { color: var(--senar-green-bright); }

      .m3-sub {
        font-size: 12.5px;
        color: var(--text-secondary);
        display: block;
        margin-top: 2px;
        line-height: 1.38;
      }

      .m3-footer-bar {
        background: var(--senar-green-soft);
        border-left: 5px solid var(--senar-green);
        border-radius: 10px;
        padding: 10px 16px;
        font-size: 13.5px;
        font-weight: 700;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      /* Grids */
      .m3-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; flex: 1; min-height: 0; }
      .m3-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; flex: 1; min-height: 0; }
      .m3-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; flex: 1; min-height: 0; }

      /* Wayfinding M3 */
      .m3-wf-col {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        padding: 18px;
        border-radius: 16px;
        border: 2px solid var(--border-color);
        background: var(--card-bg);
        transition: all 0.25s ease;
      }
      .m3-wf-col.active-red {
        border-color: var(--red);
        box-shadow: 0 10px 26px rgba(185, 28, 28, 0.12);
      }
      .m3-wf-col.active-amber {
        border-color: var(--amber);
        box-shadow: 0 10px 26px rgba(217, 119, 6, 0.14);
      }
      .m3-wf-col.dim {
        opacity: 0.62;
      }
      .m3-wf-item {
        display: flex;
        align-items: flex-start;
        gap: 11px;
        padding: 10px 12px;
        border-radius: 11px;
        background: var(--card-elevated);
        border: 1px solid var(--border-color);
      }
      .m3-wf-badge {
        width: 25px;
        height: 25px;
        border-radius: 7px;
        color: #fff;
        font-size: 12px;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 1px;
      }

      /* Listas limpas */
      .m3-ul {
        list-style: none;
        padding: 0;
        margin: 8px 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .m3-ul li {
        position: relative;
        padding-left: 15px;
        font-size: 13px;
        line-height: 1.4;
        color: var(--text-secondary);
      }
      .m3-ul li strong { color: var(--text-primary); }
      .m3-ul li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 6.5px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--senar-green);
      }
      .m3-ul.red li::before { background: var(--red); }
      .m3-ul.amber li::before { background: var(--amber); }

      /* Choque numérico VS */
      .m3-vs-bar {
        display: grid;
        grid-template-columns: 0.9fr 1fr auto 1fr;
        gap: 12px;
        align-items: center;
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-radius: 14px;
        padding: 12px 16px;
      }
      .m3-vs-badge {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--amber);
        color: #0F172A;
        font-weight: 900;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(217, 119, 6, 0.25);
      }

      /* Barra animada DM 90% -> 75% */
      .m3-dm-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 6px;
        margin-top: 6px;
      }
      .m3-dm-unit {
        height: 28px;
        border-radius: 7px;
        background: var(--senar-green);
        color: #fff;
        font-size: 11px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s ease;
      }
      .m3-dm-unit.is-lost {
        background: var(--red);
        transform: scale(0.96);
        box-shadow: 0 0 0 2px var(--red-border);
      }

      /* Stepper Ponte M3 -> M4 */
      .m3-step-flow {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        gap: 14px;
        align-items: stretch;
        flex: 1;
      }
      .m3-step-card {
        border-radius: 16px;
        padding: 20px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 2px solid var(--border-color);
        background: var(--card-bg);
      }
      .m3-step-num {
        font-size: 30px;
        font-weight: 900;
        opacity: 0.22;
        line-height: 1;
      }
      .m3-step-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--amber);
      }
    `;
    document.head.appendChild(style);
  }

  function wrapM3(title, bodyHTML, footnote) {
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

  /* Helper para renderizar o Wayfinding do Módulo 3 (Eixo 1 vs. Eixo 2) */
  function renderWayfindingM3(eixoAtivo) {
    const eixo1Active = eixoAtivo === 1;
    return `
      <div class="m3-wrap">
        <div class="m3-grid-2">
          <!-- EIXO 1 -->
          <div class="m3-wf-col ${eixo1Active ? 'active-red' : 'dim'}">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <div>
                  <div class="m3-kicker" style="color:var(--red-dark);">EIXO 1 • VAZAMENTO NO CAIXA (COE)</div>
                  <div style="font-size:22px;font-weight:900;">Gargalos de Custo</div>
                  <span class="m3-sub">A máquina rodando caro demais por hora ou por hectare</span>
                </div>
                <span class="m3-pill ${eixo1Active ? 'm3-pill-red' : 'm3-pill-soft'}">
                  ${eixo1Active ? 'EM FOCO AGORA' : '✓ CONCLUÍDO'}
                </span>
              </div>

              <div style="display:flex;flex-direction:column;gap:9px;margin-top:14px;">
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--red);">1</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Manobras e Projeto de Linhas</div>
                    <span class="m3-sub">Excesso de manobras por falta de projeto para piloto automático</span>
                  </div>
                </div>
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--red);">2</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Logística e Deslocamentos</div>
                    <span class="m3-sub">Falta de calda pronta, esperas e uso da máquina como veículo</span>
                  </div>
                </div>
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--red);">3</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Diesel e Motor Ocioso</div>
                    <span class="m3-sub">Operação fora da faixa econômica e motor ligado no ar-condicionado</span>
                  </div>
                </div>
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--red);">4</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Quebras e Compra por Preço</div>
                    <span class="m3-sub">Peça paralela, falta de treinamento e baixa disponibilidade mecânica</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- EIXO 2 -->
          <div class="m3-wf-col ${!eixo1Active ? 'active-amber' : 'dim'}">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <div>
                  <div class="m3-kicker" style="color:var(--amber-dark);">EIXO 2 • VAZAMENTO NO RETORNO (ROI)</div>
                  <div style="font-size:22px;font-weight:900;">Gargalos de ROI</div>
                  <span class="m3-sub">Investimento alto entregando menos sacas e menor retorno</span>
                </div>
                <span class="m3-pill ${!eixo1Active ? 'm3-pill-amber' : 'm3-pill-muted'}">
                  ${!eixo1Active ? 'EM FOCO AGORA' : 'A SEGUIR'}
                </span>
              </div>

              <div style="display:flex;flex-direction:column;gap:9px;margin-top:14px;">
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--amber);color:#0F172A;">1</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Super ou Subdimensionamento</div>
                    <span class="m3-sub">Frota sobrando no custo fixo ou faltando na capacidade diária</span>
                  </div>
                </div>
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--amber);color:#0F172A;">2</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Atrasos na Janela Agronômica</div>
                    <span class="m3-sub">Plantio e colheita fora do ponto ideal custam sacas por hectare</span>
                  </div>
                </div>
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--amber);color:#0F172A;">3</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Tecnologia Paga e Subutilizada</div>
                    <span class="m3-sub">Piloto, corte de seção e recursos embarcados sem uso pleno</span>
                  </div>
                </div>
                <div class="m3-wf-item">
                  <div class="m3-wf-badge" style="background:var(--amber);color:#0F172A;">4</div>
                  <div>
                    <div style="font-weight:800;font-size:14px;">Regulagem e Retrabalho</div>
                    <span class="m3-sub">Bico gasto, faixa errada e colhedora desregulada drenam produtividade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     DEFINIÇÃO DOS 7 SLIDES DO MÓDULO 3 (Slides 23 a 29 da V6)
     ========================================================================== */
  const M3_SLIDES = [
    /* SLIDE 23 — Wayfinding Gargalos: Eixo 1 em foco */
    {
      module: 3,
      render: () => wrapM3(
        'Gargalos na mecanização',
        renderWayfindingM3(1),
        'Módulo 3 • Eixo 1 (Gargalos de Custo no Caixa) e Eixo 2 (Gargalos de Retorno).'
      )
    },

    /* SLIDE 24 — Logística e tempo improdutivo */
    {
      module: 3,
      render: () => wrapM3(
        'Logística e tempo improdutivo',
        `
        <div class="m3-wrap tabular">
          <div class="m3-grid-4">
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--senar-green);">
              <div>
                <div class="m3-kicker">01. PROJETO</div>
                <div style="font-size:17px;font-weight:800;margin-top:4px;">Manobras Excessivas</div>
                <ul class="m3-ul">
                  <li>Falta de projeto de linhas para piloto automático.</li>
                  <li>Cabeceiras longas aumentam tempo sem cortar/aplicar.</li>
                </ul>
              </div>
              <div class="m3-card-soft" style="margin-top:12px;padding:8px 10px;font-size:11.5px;font-weight:700;">
                Tiros curtos = mais tempo manobrando que produzindo.
              </div>
            </div>

            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--amber);">
              <div>
                <div class="m3-kicker" style="color:var(--amber-dark);">02. APOIO</div>
                <div style="font-size:17px;font-weight:800;margin-top:4px;">Logística de Campo</div>
                <ul class="m3-ul amber">
                  <li>Espera por transbordo, caminhão-pipa ou adubo.</li>
                  <li>Ausência de calda pronta trava o pulverizador.</li>
                </ul>
              </div>
              <div class="m3-card-amber" style="margin-top:12px;padding:8px 10px;font-size:11.5px;font-weight:700;">
                Máquina principal nunca pode esperar apoio.
              </div>
            </div>

            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--red);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker" style="color:var(--red-dark);">03. DESLOCAMENTO</div>
                  <span class="m3-pill m3-pill-red" style="font-size:9.5px;padding:2px 7px;">RALO CRÍTICO</span>
                </div>
                <div style="font-size:17px;font-weight:800;margin-top:4px;">Máquina Não é Veículo</div>
                <ul class="m3-ul red">
                  <li>Deslocamento até a sede por peça, almoço ou diesel.</li>
                  <li>Rodado e transmissão sofrem no asfalto e carreador.</li>
                </ul>
              </div>
              <div class="m3-card-red" style="margin-top:12px;padding:8px 10px;font-size:11.5px;font-weight:700;">
                Desgaste caro sem entregar 1 m² de trabalho.
              </div>
            </div>

            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--red);">
              <div>
                <div class="m3-kicker" style="color:var(--red-dark);">04. OCIOSIDADE</div>
                <div style="font-size:17px;font-weight:800;margin-top:4px;">Motor Ligado Parado</div>
                <ul class="m3-ul red">
                  <li>Espera prolongada com motor ligado no ar-condicionado.</li>
                  <li>Queima diesel e horímetro sem entregar 1 hectare.</li>
                </ul>
              </div>
              <div class="m3-card-red" style="margin-top:12px;padding:8px 10px;font-size:11.5px;font-weight:700;">
                Consome COE e antecipa depreciação e revisão.
              </div>
            </div>
          </div>

          <!-- Choque Numérico -->
          <div class="m3-vs-bar">
            <div>
              <div class="m3-kicker" style="color:var(--amber-dark);">CHOQUE NUMÉRICO</div>
              <div style="font-size:13.5px;font-weight:800;line-height:1.3;">
                1 hora de máquina pesada deslocando ou ociosa vs. veículo de apoio
              </div>
            </div>

            <div class="m3-card-red" style="padding:10px 14px;">
              <div style="font-size:11px;font-weight:800;color:var(--red-dark);">MÁQUINA AGRÍCOLA</div>
              <div style="font-size:21px;font-weight:900;color:var(--red-dark);">R$ 400 a R$ 900/h</div>
              <span class="m3-sub" style="font-size:11.5px;">Diesel + desgaste + custo fixo</span>
            </div>

            <div class="m3-vs-badge">VS.</div>

            <div class="m3-card-soft" style="padding:10px 14px;">
              <div style="font-size:11px;font-weight:800;color:var(--senar-green);">APOIO LEVE (CAMINHONETE)</div>
              <div style="font-size:21px;font-weight:900;color:var(--senar-green);">R$ 60 a R$ 90/h</div>
              <span class="m3-sub" style="font-size:11.5px;"><strong>Até 10x mais barato</strong> para logística</span>
            </div>
          </div>
        </div>
        `,
        'Eixo 1 • Ralos logísticos e tempo improdutivo no talhão.'
      )
    },

    /* SLIDE 25 — Operação, Diesel & Quebra */
    {
      module: 3,
      render: () => wrapM3(
        'Operação, Diesel & Quebra',
        `
        <div class="m3-wrap tabular">
          <div class="m3-grid-3">
            <!-- Coluna 1 -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--amber);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker" style="color:var(--amber-dark);">CONSUMO ELEVADO</div>
                  <span class="m3-pill m3-pill-amber" style="font-size:9.5px;padding:2px 7px;">L/HA</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Ajuste Fino & Condução</div>
                <ul class="m3-ul amber">
                  <li>Lastragem e calibragem fora do ideal</li>
                  <li>Patinagem fora da faixa técnica (8% a 12%)</li>
                  <li>Marcha baixa + giro alto (fora da faixa econômica)</li>
                </ul>
              </div>
              <div class="m3-card-amber" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                +3 a 5 L/h desperdiçados = R$ 18 a 30 mil/ano por máquina (1.000 h × R$ 6/L)
              </div>
            </div>

            <!-- Coluna 2 -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--senar-green);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker">FATOR HUMANO</div>
                  <span class="m3-pill m3-pill-soft" style="font-size:9.5px;padding:2px 7px;">CABINE</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Falta de Capacitação</div>
                <ul class="m3-ul">
                  <li>Operação guiada pelo hábito, sem padrão técnico</li>
                  <li>Manobras brutas e sobrecarga no trem de força</li>
                  <li>Sintoma inicial ignorado vira corretiva cara</li>
                </ul>
              </div>
              <div class="m3-card-soft" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Elo multiplicador: o mesmo erro puxa diesel, pneu e oficina junto
              </div>
            </div>

            <!-- Coluna 3 -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--red);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker" style="color:var(--red-dark);">RALO CRÍTICO</div>
                  <span class="m3-pill m3-pill-red" style="font-size:9.5px;padding:2px 7px;">OFICINA</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Compra por Preço & Quebra</div>
                <ul class="m3-ul red">
                  <li>Peça paralela ou revisão cortada no orçamento</li>
                  <li>Economia de centavos vira parada em plena janela</li>
                  <li>Corretiva derruba a Disponibilidade Mecânica (DM)</li>
                </ul>
              </div>
              <div class="m3-card-red" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Economia na peça trava máquina de R$ 1,4M+ parada por dias na safra
              </div>
            </div>
          </div>

          <!-- Impacto DM 90% -> 75% -->
          <div class="m3-card-red" style="display:grid;grid-template-columns:0.36fr 0.64fr;gap:18px;align-items:center;padding:12px 18px;">
            <div>
              <div class="m3-kicker" style="color:var(--red-dark);">IMPACTO DA DISPONIBILIDADE MECÂNICA (DM)</div>
              <div style="font-size:24px;font-weight:900;color:var(--red-dark);line-height:1.1;">90% → 75% DM</div>
              <div class="m3-dm-grid" id="m3-dm-fleet">
                <div class="m3-dm-unit">M1</div>
                <div class="m3-dm-unit">M2</div>
                <div class="m3-dm-unit">M3</div>
                <div class="m3-dm-unit">M4</div>
                <div class="m3-dm-unit">M5</div>
                <div class="m3-dm-unit" id="m3-dm-lost-unit">M6 ✕</div>
              </div>
            </div>
            <div style="font-size:15px;font-weight:700;line-height:1.42;color:var(--text-primary);">
              Cair de <strong>90% para 75%</strong> de disponibilidade equivale a <strong>perder 1 máquina inteira a cada 6</strong> mantendo o mesmo custo fixo no galpão.
            </div>
          </div>
        </div>
        `,
        'Eixo 1 • Condução, capacitação e impacto da disponibilidade mecânica.'
      ),
      onMount: () => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const lost = document.getElementById('m3-dm-lost-unit');
            if (lost) lost.classList.add('is-lost');
          }, 350);
        });
      }
    },

    /* SLIDE 26 — Wayfinding Gargalos: Eixo 2 em foco */
    {
      module: 3,
      render: () => wrapM3(
        'Gargalos na mecanização',
        renderWayfindingM3(2),
        'Módulo 3 • Eixo 1 concluído; Eixo 2 (Gargalos de Retorno / ROI) em foco.'
      )
    },

    /* SLIDE 27 — Capacidade Operacional & Tecnologia */
    {
      module: 3,
      render: () => wrapM3(
        'Capacidade Operacional & Tecnologia',
        `
        <div class="m3-wrap tabular">
          <div class="m3-grid-3">
            <!-- Card 1 -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--red);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker" style="color:var(--red-dark);">RALO CRÍTICO — JANELA</div>
                  <span class="m3-pill m3-pill-red" style="font-size:9.5px;padding:2px 7px;">SUB</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Capacidade Insuficiente & Subdimensionamento</div>
                <ul class="m3-ul red">
                  <li>Rendimento diário (ha/dia) abaixo da demanda da área.</li>
                  <li>Atraso na janela de plantio derruba o teto produtivo.</li>
                  <li>Efeito dominó: compromete a colheita e a 2ª safra.</li>
                </ul>
              </div>
              <div class="m3-card-red" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Perda de sacas que nenhuma economia de diesel recupera.
              </div>
            </div>

            <!-- Card 2 -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--amber);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker" style="color:var(--amber-dark);">CAPITAL IMOBILIZADO</div>
                  <span class="m3-pill m3-pill-amber" style="font-size:9.5px;padding:2px 7px;">SUPER</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Superdimensionamento de Frota</div>
                <ul class="m3-ul amber">
                  <li>Exemplo clássico: trator de 300 cv em implemento de 180 cv.</li>
                  <li>Paga depreciação, capital e manutenção de máquina maior.</li>
                  <li>Sobra potência no motor e falta diluição do custo fixo.</li>
                </ul>
              </div>
              <div class="m3-card-amber" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Estrutura cara para entregar rendimento de máquina menor.
              </div>
            </div>

            <!-- Card 3 -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--senar-green);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker">100% PAGA • 40% USADA</div>
                  <span class="m3-pill m3-pill-soft" style="font-size:9.5px;padding:2px 7px;">TECNOLOGIA</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Subutilização de Tecnologia</div>
                <ul class="m3-ul">
                  <li>Piloto, corte de seção, taxa variável e telemetria pagos na NF.</li>
                  <li>Operam desligados ou sem calibração por falta de domínio.</li>
                  <li>Dados coletados na cabine que não viram decisão no talhão.</li>
                </ul>
              </div>
              <div class="m3-card-soft" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Custo de Ferrari operando com entrega de máquina básica.
              </div>
            </div>
          </div>

          <!-- Efeito Tesoura no ROI -->
          <div class="m3-card-dark" style="display:grid;grid-template-columns:0.25fr 1fr 1fr 1fr;gap:12px;align-items:center;padding:12px 16px;">
            <div>
              <div style="font-size:10.5px;font-weight:800;letter-spacing:0.08em;color:var(--gold);">EFEITO TESOURA</div>
              <div style="font-size:18px;font-weight:900;">NO ROI</div>
            </div>
            <div style="background:rgba(255,255,255,0.10);padding:8px 12px;border-radius:10px;">
              <div style="font-size:11px;font-weight:800;color:#FCA5A5;">SUBDIMENSIONADA</div>
              <div style="font-size:12.5px;font-weight:700;">Perde janela e sacas/ha (derruba a receita)</div>
            </div>
            <div style="background:rgba(255,255,255,0.10);padding:8px 12px;border-radius:10px;">
              <div style="font-size:11px;font-weight:800;color:var(--gold);">SUPERDIMENSIONADA</div>
              <div style="font-size:12.5px;font-weight:700;">Trava capital no galpão (explode o custo fixo)</div>
            </div>
            <div style="background:rgba(255,255,255,0.10);padding:8px 12px;border-radius:10px;">
              <div style="font-size:11px;font-weight:800;color:#6EE7B7;">TECNOLOGIA OCIOSA</div>
              <div style="font-size:12.5px;font-weight:700;">Paga 100% • Captura ~40% (ROI desperdiçado)</div>
            </div>
          </div>
        </div>
        `,
        'Eixo 2 • Dimensionamento de frota, janela agronômica e uso pleno da tecnologia embarcada.'
      )
    },

    /* SLIDE 28 — Regulagem & Perda no Talhão */
    {
      module: 3,
      render: () => wrapM3(
        'Regulagem & Perda no Talhão',
        `
        <div class="m3-wrap tabular">
          <div class="m3-grid-3">
            <!-- Pulverização -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--amber);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker" style="color:var(--amber-dark);">PULVERIZAÇÃO</div>
                  <span class="m3-pill m3-pill-amber" style="font-size:9.5px;padding:2px 7px;">2X CUSTO</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Bicos, Deriva & Retrabalho</div>
                <ul class="m3-ul amber">
                  <li>Bicos desgastados e pressão errada comprometem cobertura e controle.</li>
                  <li>Reaplicação gera retrabalho: paga 2x a operação + insumo.</li>
                </ul>
              </div>
              <div class="m3-card-amber" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Impacto: custo dobrado ou praga/doença ativa
              </div>
            </div>

            <!-- Plantio & Adubação -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--senar-green);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker">PLANTIO & ADUBAÇÃO</div>
                  <span class="m3-pill m3-pill-soft" style="font-size:9.5px;padding:2px 7px;">ESTANDE</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Faixa Errada & Plantabilidade</div>
                <ul class="m3-ul">
                  <li>Distribuidor descalibrado (CV alto) cria faixas de sub e superdosagem.</li>
                  <li>Velocidade e regulagem ruins derrubam o estande ou forçam replantio.</li>
                </ul>
              </div>
              <div class="m3-card-soft" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Impacto: perda silenciosa de teto produtivo
              </div>
            </div>

            <!-- Colheita -->
            <div class="m3-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--red);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m3-kicker" style="color:var(--red-dark);">COLHEITA</div>
                  <span class="m3-pill m3-pill-red" style="font-size:9.5px;padding:2px 7px;">PERDA IRREVERSÍVEL</span>
                </div>
                <div style="font-size:18px;font-weight:800;margin-top:4px;">Colhedora Desregulada</div>
                <ul class="m3-ul red">
                  <li>Plataforma, trilha e limpeza fora do ajuste jogam sacas no chão.</li>
                  <li>Não existe segunda passada além de descontos por grão quebrado/impureza.</li>
                </ul>
              </div>
              <div class="m3-card-red" style="margin-top:12px;font-size:12.5px;font-weight:800;">
                Impacto: grão perdido não volta para o graneleiro
              </div>
            </div>
          </div>

          <!-- Conta Real no Talhão -->
          <div class="m3-card-red" style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:16px;align-items:center;padding:12px 18px;">
            <div>
              <div class="m3-kicker" style="color:var(--red-dark);">CONTA REAL NO TALHÃO</div>
              <div style="font-size:14.5px;font-weight:800;line-height:1.35;">
                Retrabalho paga 2x no caixa. Perda na colheita arranca a margem direto no chão.
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center;">
              <div class="m3-card" style="padding:8px;">
                <div style="font-size:18px;font-weight:900;color:var(--red-dark);">+1,5 sc/ha</div>
                <span class="m3-sub" style="font-size:10.5px;">perda média evitável</span>
              </div>
              <div class="m3-card" style="padding:8px;">
                <div style="font-size:18px;font-weight:900;color:var(--red-dark);">R$ 195 mil</div>
                <span class="m3-sub" style="font-size:10.5px;">1.000 ha • Soja R$ 130/sc</span>
              </div>
              <div class="m3-card" style="padding:8px;">
                <div style="font-size:18px;font-weight:900;color:var(--amber-dark);">39% da sobra</div>
                <span class="m3-sub" style="font-size:10.5px;">sobre margem CT de 3,8 sc/ha</span>
              </div>
            </div>
          </div>
        </div>
        `,
        'Eixo 2 • Qualidade de execução, retrabalho e perdas irreversíveis no talhão.'
      )
    },

    /* SLIDE 29 — Ponte M3 -> M4 (Corrigido: Indicador → Meta → Ação) */
    {
      module: 3,
      render: () => wrapM3(
        'Indicador → Meta → Ação',
        `
        <div class="m3-wrap">
          <div class="m3-step-flow">
            <!-- Passo 01 -->
            <div class="m3-step-card" style="border-top:6px solid var(--senar-green);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="m3-pill m3-pill-soft">PASSO 01</span>
                  <span class="m3-step-num">01</span>
                </div>
                <div style="font-size:23px;font-weight:900;margin-top:12px;">INDICADOR <span style="font-size:14px;font-weight:700;color:var(--senar-green);">(Medir)</span></div>
                <div style="font-size:16px;font-weight:800;margin-top:10px;line-height:1.35;">
                  Sem medição, o vazamento continua invisível.
                </div>
              </div>
              <div class="m3-card-soft" style="margin-top:14px;font-size:13px;font-weight:700;">
                O primeiro passo para a mudança é a informação.
              </div>
            </div>

            <!-- Seta 1 -->
            <div class="m3-step-arrow">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            <!-- Passo 02 -->
            <div class="m3-step-card" style="border-top:6px solid var(--amber);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="m3-pill m3-pill-amber">PASSO 02</span>
                  <span class="m3-step-num">02</span>
                </div>
                <div style="font-size:23px;font-weight:900;margin-top:12px;">META <span style="font-size:14px;font-weight:700;color:var(--amber-dark);">(Combinar)</span></div>
                <div style="font-size:16px;font-weight:800;margin-top:10px;line-height:1.35;">
                  Sem indicador, não existe meta clara no turno.
                </div>
              </div>
              <div class="m3-card-amber" style="margin-top:14px;font-size:13px;font-weight:700;">
                Define o que é bom ou ruim na operação (ex.: % ociosidade, patinagem).
              </div>
            </div>

            <!-- Seta 2 -->
            <div class="m3-step-arrow">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            <!-- Passo 03 -->
            <div class="m3-step-card" style="border-top:6px solid var(--senar-green-dark);background:var(--senar-green-soft);border-color:var(--senar-green-border);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="m3-pill m3-pill-green">PASSO 03</span>
                  <span class="m3-step-num">03</span>
                </div>
                <div style="font-size:23px;font-weight:900;margin-top:12px;">AÇÃO <span style="font-size:14px;font-weight:700;color:var(--senar-green);">(Corrigir)</span></div>
                <div style="font-size:16px;font-weight:800;margin-top:10px;line-height:1.35;">
                  Quem enxerga o placar joga para ganhar.
                </div>
              </div>
              <div class="m3-card" style="margin-top:14px;font-size:13px;font-weight:700;">
                Correções pontuais na cabine e no escritório.
              </div>
            </div>
          </div>

          <div class="m3-footer-bar">
            <span>A maioria dos operadores não resiste à melhoria — eles apenas não sabem qual número se espera deles.</span>
            <span class="m3-pill m3-pill-green">PRÓXIMO PASSO → Módulo 4: Quais indicadores medir?</span>
          </div>
        </div>
        `,
        'Fim do Módulo 3 • Ponte para os Indicadores de Gestão.'
      )
    }
  ];

  window.EXTRA_SLIDES = window.EXTRA_SLIDES || [];
  window.EXTRA_SLIDES.push(...M3_SLIDES);
  window.M3_SLIDES = M3_SLIDES;
})();
