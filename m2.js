/* ==========================================================================
   MÓDULO 2 — COMPOSIÇÃO DOS CUSTOS DA MECANIZAÇÃO (Slides 10 a 21 no deck)
   Alinhado exatamente ao motor de index.html:
   - Cada slide expõe { module: 2, render: () => ..., onMount: () => ... }
   - Suporta renderização via wrapContentSlide quando disponível
   - Simulador TC 5.90 integrado no padrão CONAB (5.000 h / 10 anos | Limite 500 h/ano)
   ========================================================================== */

(function () {
  if (!document.getElementById('m2-styles')) {
    const style = document.createElement('style');
    style.id = 'm2-styles';
    style.textContent = `
      .m2-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        color: var(--text-primary);
      }

      /* Cards base alinhados aos tokens do index.html */
      .m2-card {
        background: var(--card-bg);
        border: 1.5px solid var(--border-color);
        border-radius: 14px;
        padding: 14px 16px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
      }
      .m2-card-soft {
        background: var(--senar-green-soft);
        border: 1.5px solid var(--senar-green-border);
        border-radius: 14px;
        padding: 12px 16px;
      }
      .m2-card-dark {
        background: linear-gradient(135deg, var(--senar-green-dark) 0%, var(--senar-green) 100%);
        color: #FFFFFF;
        border-radius: 14px;
        padding: 14px 18px;
        border: 1px solid rgba(255, 255, 255, 0.14);
      }
      .m2-card-amber {
        background: var(--amber-soft);
        border: 1.5px solid var(--amber-border);
        border-radius: 14px;
        padding: 12px 16px;
      }
      .m2-card-red {
        background: var(--red-soft);
        border: 1.5px solid var(--red-border);
        border-radius: 14px;
        padding: 12px 16px;
      }

      /* Badges e rótulos */
      .m2-kicker {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--senar-green);
        margin-bottom: 3px;
      }
      [data-theme="dark"] .m2-kicker {
        color: var(--senar-green-bright);
      }

      .m2-pill {
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
      .m2-pill-green { background: var(--senar-green); color: #fff; }
      .m2-pill-soft { background: var(--senar-green-soft); color: var(--senar-green); border: 1px solid var(--senar-green-border); }
      .m2-pill-amber { background: var(--amber-soft); color: var(--amber-dark); border: 1px solid var(--amber-border); }
      .m2-pill-red { background: var(--red-soft); color: var(--red-dark); border: 1px solid var(--red-border); }
      .m2-pill-muted { background: var(--card-elevated); color: var(--text-muted); border: 1px solid var(--border-color); }

      [data-theme="dark"] .m2-pill-soft { color: var(--senar-green-bright); }

      /* Faixa inferior de ancoragem */
      .m2-footer-bar {
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

      /* Grids auxiliares */
      .m2-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; flex: 1; min-height: 0; }
      .m2-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; flex: 1; min-height: 0; }
      .m2-grid-target { display: grid; grid-template-columns: 0.92fr 1.08fr; gap: 22px; align-items: center; flex: 1; }
      .m2-grid-hub { display: grid; grid-template-columns: 1fr 0.86fr 1fr; gap: 14px; align-items: stretch; flex: 1; min-height: 0; }

      .m2-sub { font-size: 12px; color: var(--text-secondary); display: block; margin-top: 2px; line-height: 1.35; }

      /* Wayfinding */
      .m2-wf-col {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 15px 16px;
        border-radius: 15px;
        border: 2px solid var(--border-color);
        background: var(--card-bg);
        transition: all 0.25s ease;
      }
      .m2-wf-col.active {
        border-color: var(--senar-green);
        box-shadow: 0 10px 24px rgba(0, 104, 55, 0.12);
      }
      .m2-wf-col.dim {
        opacity: 0.62;
      }
      .m2-wf-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 8px 11px;
        border-radius: 10px;
        background: var(--card-elevated);
        border: 1px solid var(--border-color);
      }
      .m2-wf-num {
        width: 23px;
        height: 23px;
        border-radius: 7px;
        background: var(--senar-green);
        color: #fff;
        font-size: 12px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .m2-eq-bar {
        background: var(--senar-green-dark);
        color: #FFFFFF;
        border-radius: 12px;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        font-size: 13.5px;
        font-weight: 700;
        flex-wrap: wrap;
      }
      .m2-eq-chip {
        background: rgba(255,255,255,0.14);
        padding: 4px 10px;
        border-radius: 8px;
      }
      .m2-eq-final {
        background: var(--gold);
        color: #0F172A;
        padding: 4px 12px;
        border-radius: 8px;
        font-weight: 900;
      }

      /* Tabela CONAB vs ASABE */
      .m2-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }
      .m2-table th {
        background: var(--senar-green);
        color: #fff;
        text-align: left;
        padding: 8px 12px;
        font-weight: 700;
        font-size: 12px;
      }
      .m2-table th:first-child { border-radius: 10px 0 0 0; }
      .m2-table th:last-child { border-radius: 0 10px 0 0; }
      .m2-table td {
        padding: 7px 12px;
        border-bottom: 1px solid var(--border-color);
        vertical-align: middle;
      }
      .m2-table tr:nth-child(even) td {
        background: var(--card-elevated);
      }

      /* Bullets limpos */
      .m2-ul {
        list-style: none;
        padding: 0;
        margin: 8px 0 0 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .m2-ul li {
        position: relative;
        padding-left: 15px;
        font-size: 13px;
        line-height: 1.4;
        color: var(--text-secondary);
      }
      .m2-ul li strong { color: var(--text-primary); }
      .m2-ul li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 6.5px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--senar-green);
      }
      .m2-ul.red li::before { background: var(--red); }

      /* Galpão */
      .m2-photo-box {
        border-radius: 16px;
        overflow: hidden;
        border: 1.5px solid var(--border-color);
        background: var(--card-bg);
        height: 100%;
        min-height: 360px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .m2-photo-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Simulador TC 5.90 */
      .m2-sim-grid {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 14px;
        flex: 1;
        min-height: 0;
      }
      .m2-rank-row {
        display: grid;
        grid-template-columns: 26px 1.25fr 1.15fr 76px 52px;
        align-items: center;
        gap: 8px;
        padding: 5px 8px;
        border-radius: 8px;
        background: var(--card-elevated);
        border: 1px solid var(--border-color);
        font-size: 12px;
      }
      .m2-rank-row.maestra {
        border-color: var(--amber);
        background: var(--amber-soft);
      }
      .m2-bar-track {
        height: 10px;
        background: var(--donut-track);
        border-radius: 999px;
        overflow: hidden;
      }
      .m2-bar-fill {
        height: 100%;
        border-radius: 999px;
        transition: width 0.25s ease;
      }
      .m2-preset-btn {
        border: 1.5px solid var(--border-color);
        background: var(--card-elevated);
        color: var(--text-primary);
        border-radius: 9px;
        padding: 6px 8px;
        cursor: pointer;
        text-align: left;
        transition: all 0.18s ease;
      }
      .m2-preset-btn:hover, .m2-preset-btn.active {
        border-color: var(--senar-green);
        background: var(--senar-green-soft);
      }
      .m2-slider {
        width: 100%;
        accent-color: var(--senar-green);
        cursor: pointer;
      }
      .m2-kpi-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      .m2-kpi {
        background: var(--card-elevated);
        border: 1.5px solid var(--border-color);
        border-radius: 10px;
        padding: 8px 10px;
      }
    `;
    document.head.appendChild(style);
  }

  function wrapM2(title, bodyHTML, footnote) {
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

  function renderWayfindingM2(etapaAtiva) {
    const fixoActive = etapaAtiva === 1;
    return `
      <div class="m2-wrap">
        <div class="m2-grid-2">
          <div class="m2-wf-col ${fixoActive ? 'active' : 'dim'}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div class="m2-kicker">ETAPA 1 • ESTRUTURA DA FROTA</div>
                <div style="font-size:21px;font-weight:900;">CUSTOS FIXOS</div>
                <span class="m2-sub" style="font-size:13px;">A máquina parada no galpão já custa</span>
              </div>
              <span class="m2-pill ${fixoActive ? 'm2-pill-green' : 'm2-pill-soft'}">
                ${fixoActive ? 'EM FOCO AGORA' : '✓ CONCLUÍDO'}
              </span>
            </div>
            <div class="m2-wf-item">
              <div class="m2-wf-num">1</div>
              <div>
                <div style="font-weight:800;font-size:13.5px;">Depreciação <span class="m2-pill m2-pill-amber" style="margin-left:6px;padding:2px 7px;font-size:10px;">COT</span></div>
                <span class="m2-sub">Horímetro (desgaste) vs. Calendário (obsolescência)</span>
              </div>
            </div>
            <div class="m2-wf-item">
              <div class="m2-wf-num">2</div>
              <div>
                <div style="font-weight:800;font-size:13.5px;">Custo do Capital <span class="m2-pill m2-pill-red" style="margin-left:6px;padding:2px 7px;font-size:10px;">CT / Caixa</span></div>
                <span class="m2-sub">Custo de oportunidade (próprio) ou juros (Moderfrota)</span>
              </div>
            </div>
            <div class="m2-wf-item">
              <div class="m2-wf-num">3</div>
              <div>
                <div style="font-weight:800;font-size:13.5px;">Seguro, Abrigo e Licenças <span class="m2-pill m2-pill-muted" style="margin-left:6px;padding:2px 7px;font-size:10px;">COE / COT</span></div>
                <span class="m2-sub">Proteção da frota, galpão e sinal GNSS pago</span>
              </div>
            </div>
          </div>

          <div class="m2-wf-col ${!fixoActive ? 'active' : 'dim'}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div class="m2-kicker">ETAPA 2 • OPERAÇÃO NO TALHÃO</div>
                <div style="font-size:21px;font-weight:900;">CUSTOS VARIÁVEIS</div>
                <span class="m2-sub" style="font-size:13px;">A máquina rodando consome direto do caixa</span>
              </div>
              <span class="m2-pill ${!fixoActive ? 'm2-pill-green' : 'm2-pill-muted'}">
                ${!fixoActive ? 'EM FOCO AGORA' : 'A SEGUIR'}
              </span>
            </div>
            <div class="m2-wf-item">
              <div class="m2-wf-num">1</div>
              <div>
                <div style="font-weight:800;font-size:13.5px;">Combustível e Lubrificantes <span class="m2-pill m2-pill-soft" style="margin-left:6px;padding:2px 7px;font-size:10px;">COE</span></div>
                <span class="m2-sub">Diesel (maior desembolso direto) + óleos e filtros</span>
              </div>
            </div>
            <div class="m2-wf-item">
              <div class="m2-wf-num">2</div>
              <div>
                <div style="font-weight:800;font-size:13.5px;">Manutenção e Peças <span class="m2-pill m2-pill-soft" style="margin-left:6px;padding:2px 7px;font-size:10px;">COE</span></div>
                <span class="m2-sub">Preventiva vs. corretiva — cresce com o horímetro</span>
              </div>
            </div>
            <div class="m2-wf-item">
              <div class="m2-wf-num">3</div>
              <div>
                <div style="font-weight:800;font-size:13.5px;">Pneus e Rodados <span class="m2-pill m2-pill-soft" style="margin-left:6px;padding:2px 7px;font-size:10px;">COE</span></div>
                <span class="m2-sub">Impacto direto de patinagem, lastragem e calibragem</span>
              </div>
            </div>
            <div class="m2-wf-item">
              <div class="m2-wf-num">4</div>
              <div>
                <div style="font-weight:800;font-size:13.5px;">Mão de Obra Operacional <span class="m2-pill m2-pill-soft" style="margin-left:6px;padding:2px 7px;font-size:10px;">COE</span></div>
                <span class="m2-sub">Salário + encargos — quem define a eficiência real</span>
              </div>
            </div>
          </div>
        </div>

        <div class="m2-eq-bar tabular">
          <span style="font-size:11px;letter-spacing:0.08em;opacity:0.88;">EQUAÇÃO DA GESTÃO</span>
          <span class="m2-eq-chip">Custos Fixos (R$/h)</span>
          <span>+</span>
          <span class="m2-eq-chip">Custos Variáveis (R$/h)</span>
          <span>=</span>
          <span class="m2-eq-chip">Custo Horário (R$/h)</span>
          <span>÷</span>
          <span class="m2-eq-chip">Rendimento (ha/h)</span>
          <span>=</span>
          <span class="m2-eq-final">Custo Real (R$/ha)</span>
        </div>
      </div>
    `;
  }

  const M2_SLIDES = [
    {
      module: 2,
      render: () => wrapM2(
        'Definição do alvo',
        `
        <div class="m2-wrap">
          <div class="m2-grid-target">
            <div class="m2-card-soft" style="display:flex;align-items:center;justify-content:center;height:100%;min-height:360px;">
              <svg viewBox="0 0 360 320" style="width:100%;max-width:340px;height:auto;">
                <circle cx="180" cy="160" r="102" fill="none" stroke="var(--senar-green)" stroke-width="3.5" opacity="0.85"/>
                <circle cx="180" cy="160" r="54" fill="none" stroke="var(--senar-green)" stroke-width="2.5" opacity="0.65"/>
                <circle cx="180" cy="160" r="9" fill="var(--senar-green)"/>
                <line x1="180" y1="36" x2="180" y2="284" stroke="var(--senar-green)" stroke-width="2"/>
                <line x1="56" y1="160" x2="304" y2="160" stroke="var(--senar-green)" stroke-width="2"/>
                <path d="M138 118 L162 142 M162 142 L162 128 M162 142 L148 142" stroke="var(--senar-green)" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M222 118 L198 142 M198 142 L198 128 M198 142 L212 142" stroke="var(--senar-green)" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M138 202 L162 178 M162 178 L162 192 M162 178 L148 178" stroke="var(--senar-green)" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M222 202 L198 178 M198 178 L198 192 M198 178 L212 178" stroke="var(--senar-green)" stroke-width="3" fill="none" stroke-linecap="round"/>
                <text x="180" y="24" text-anchor="middle" font-size="16" font-weight="800" fill="var(--text-primary)">Custeio</text>
                <text x="316" y="165" text-anchor="start" font-size="16" font-weight="800" fill="var(--text-primary)">COE</text>
                <text x="180" y="306" text-anchor="middle" font-size="16" font-weight="800" fill="var(--text-primary)">COT</text>
                <text x="44" y="165" text-anchor="end" font-size="16" font-weight="800" fill="var(--text-primary)">CT</text>
              </svg>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
              <div class="m2-card" style="border-left:5px solid #6b9080;">
                <div style="font-size:17px;font-weight:800;">CUSTEIO</div>
                <div style="font-size:14.5px;margin-top:3px;color:var(--text-secondary);">Gastos diretos da safra</div>
              </div>
              <div class="m2-card" style="border-left:5px solid var(--senar-green);">
                <div style="font-size:17px;font-weight:800;">COE</div>
                <div style="font-size:14.5px;margin-top:3px;color:var(--text-secondary);">Custo Operacional Efetivo: desembolso direto</div>
              </div>
              <div class="m2-card" style="border-left:5px solid var(--amber);">
                <div style="font-size:17px;font-weight:800;">COT</div>
                <div style="font-size:14.5px;margin-top:3px;color:var(--text-secondary);">COE + depreciação.</div>
              </div>
              <div class="m2-card" style="border-left:5px solid var(--red);">
                <div style="font-size:17px;font-weight:800;">CT</div>
                <div style="font-size:14.5px;margin-top:3px;color:var(--text-secondary);">Custo Total: soma de todos os custos e custo de oportunidade</div>
              </div>
            </div>
          </div>

          <div class="m2-footer-bar">
            <span>Cada categoria de custo tem alavancas específicas de controle. Entender onde cada item entra é o primeiro passo para reduzir o custo de mecanização.</span>
          </div>
        </div>
        `,
        'Módulo 2 • Estrutura de custos agrícolas (Custeio, COE, COT e CT).'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Composição dos Custos da Mecanização',
        renderWayfindingM2(1),
        'Etapa 1: Custos Fixos em foco.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Depreciação',
        `
        <div class="m2-wrap">
          <div style="display:grid;grid-template-columns:0.34fr 0.66fr;gap:16px;flex:1;align-items:stretch;">
            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div class="m2-kicker">CUSTO FIXO • COT</div>
                <div style="font-size:21px;font-weight:900;margin-bottom:8px;">DEPRECIAÇÃO</div>
                <ul class="m2-ul" style="gap:12px;">
                  <li><strong>Entra no COT</strong> — custo invisível</li>
                  <li>Quanto mais cara a máquina, <strong>maior o custo</strong></li>
                  <li>Depende da <strong>vida útil</strong> do equipamento</li>
                  <li>Menos horas ociosas = <strong>depreciação diluída em mais hectares</strong> = menor impacto no COT</li>
                </ul>
              </div>
              <div class="m2-card-amber" style="margin-top:10px;font-size:12px;font-weight:700;">
                Regra híbrida CONAB: vale o que vencer primeiro — <strong>horímetro</strong> (desgaste) ou <strong>calendário</strong> (obsolescência).
              </div>
            </div>

            <div class="m2-card" style="padding:12px;display:flex;flex-direction:column;justify-content:space-between;">
              <table class="m2-table tabular">
                <thead>
                  <tr>
                    <th>MÁQUINA / IMPLEMENTO</th>
                    <th>CONAB<br><span style="font-weight:400;font-size:11px;opacity:0.9;">Anexos II e III (Brasil)</span></th>
                    <th>ASABE D497.7<br><span style="font-weight:400;font-size:11px;opacity:0.9;">Norma EUA (1 safra/ano)</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Trator de Roda (Grãos)</strong><span class="m2-sub">Operações pesadas e plantio</span></td>
                    <td><strong>15.000 h</strong><span class="m2-sub">10 anos • Res. 20%</span></td>
                    <td><strong>16.000 h</strong><span class="m2-sub">4x2: 12.000 h</span></td>
                  </tr>
                  <tr>
                    <td><strong>Colheitadeira Autoprop.</strong><span class="m2-sub">Colhedora (horas de motor)</span></td>
                    <td><strong>5.000 h</strong><span class="m2-sub">10 anos • Res. 25%</span></td>
                    <td><strong>3.000 h</strong><span class="m2-sub">Curta para MT</span></td>
                  </tr>
                  <tr>
                    <td><strong>Pulverizador Autoprop.</strong><span class="m2-sub">Alta intensidade em 2 safras</span></td>
                    <td><strong>10.000 h</strong><span class="m2-sub">10 anos • Res. 20%</span></td>
                    <td><strong>1.500 h</strong><span class="m2-sub">6,7x menor que CONAB</span></td>
                  </tr>
                  <tr>
                    <td><strong>Plantadeira / Semeadora</strong><span class="m2-sub">Plantio direto c/ adubo</span></td>
                    <td><strong>1.200 h</strong><span class="m2-sub">15 anos • Res. 20%</span></td>
                    <td><strong>1.500 h</strong><span class="m2-sub">Uso anual menor nos EUA</span></td>
                  </tr>
                  <tr>
                    <td><strong>Distribuidor de Sólidos</strong><span class="m2-sub">Calcário e fertilizantes a lanço</span></td>
                    <td><strong>2.000 h</strong><span class="m2-sub">10 anos • Res. 5%</span></td>
                    <td><strong>1.200 h</strong><span class="m2-sub">Vida útil conservadora</span></td>
                  </tr>
                </tbody>
              </table>
              <div class="m2-sub" style="margin-top:6px;">
                Fontes: CONAB (Metodologia de Custos de Produção Agrícola) e ASABE Standard D497.7 (Agricultural Machinery Management Data).
              </div>
            </div>
          </div>
        </div>
        `,
        'Fontes: CONAB e ASABE D497.7.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Custo de oportunidade',
        `
        <div class="m2-wrap tabular">
          <div class="m2-grid-hub">
            <div style="display:flex;flex-direction:column;gap:9px;justify-content:space-between;">
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">CONCEITO</div>
                <div style="font-size:13px;">O que o dinheiro <strong>deixou de render</strong> fora do ferro.</div>
              </div>
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">REFERÊNCIA (2026/27)</div>
                <div style="font-size:13px;"><strong>13,75% a.a.</strong> (Selic / CDI) aplicado sobre o <strong>capital médio</strong>.</div>
              </div>
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">ONDE PESA?</div>
                <div style="font-size:13px;">Entra no <strong>CT</strong> — invisível no caixa, mas real no patrimônio.</div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;justify-content:center;gap:10px;">
              <div class="m2-card-soft" style="text-align:center;">
                <span class="m2-pill m2-pill-soft">À VISTA</span>
                <div style="font-size:15px;font-weight:800;margin-top:4px;">Capital Próprio</div>
                <span class="m2-sub">Custo de Oportunidade</span>
              </div>

              <div class="m2-card-dark" style="text-align:center;padding:16px 14px;">
                <div style="font-size:10.5px;font-weight:800;letter-spacing:0.1em;color:var(--gold);">CUSTO FIXO SILENCIOSO</div>
                <div style="font-size:20px;font-weight:900;margin:4px 0;">CUSTO DO CAPITAL</div>
                <div style="font-size:12.5px;opacity:0.9;">Não existe dinheiro grátis na mecanização</div>
              </div>

              <div class="m2-card-amber" style="text-align:center;">
                <span class="m2-pill m2-pill-amber">CRÉDITO</span>
                <div style="font-size:15px;font-weight:800;margin-top:4px;">Financiado</div>
                <span class="m2-sub">Juros do Financiamento</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:9px;justify-content:space-between;">
              <div class="m2-card" style="border-right:4px solid var(--amber);">
                <div class="m2-kicker" style="color:var(--amber-dark);">MODERFROTA (PISO 26/27)</div>
                <div style="font-size:13px;"><strong>12,5% a.a.</strong> Empresarial | <strong>11,5%</strong> Pronamp (até 85% do bem).</div>
              </div>
              <div class="m2-card" style="border-right:4px solid var(--amber);">
                <div class="m2-kicker" style="color:var(--amber-dark);">REALIDADE MT (ACIMA DO TETO)</div>
                <div style="font-size:13px;">Montadora / crédito livre: <strong>15% a 17%+ a.a.</strong></div>
              </div>
              <div class="m2-card" style="border-right:4px solid var(--amber);">
                <div class="m2-kicker" style="color:var(--amber-dark);">ONDE PESA?</div>
                <div style="font-size:13px;">Sai direto do <strong>Fluxo de Caixa</strong> (parcela + juro efetivo).</div>
              </div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1.35fr 0.65fr;gap:12px;">
            <div class="m2-card-soft" style="border-left:5px solid var(--red);">
              <div class="m2-kicker" style="color:var(--red-dark);">CONTA NA PRÁTICA • EXEMPLO REAL TC 5.90 (R$ 1,4 MILHÃO)</div>
              <div style="font-size:13px;">
                Sobre o capital médio (R$ 875 mil), o custo de capital gira entre <strong>R$ 109 mil e R$ 120 mil/ano</strong> só para a máquina existir no galpão, antes de queimar 1 litro de diesel.
              </div>
            </div>
            <div class="m2-card-red" style="display:flex;flex-direction:column;justify-content:center;">
              <div class="m2-kicker" style="color:var(--red-dark);">IMEA SAFRA 2026/27 (SOJA MT)</div>
              <div style="font-size:19px;font-weight:900;color:var(--red-dark);">R$ 568/ha <span style="font-size:12.5px;font-weight:700;">Oportunidade Frota</span></div>
              <span class="m2-sub">Já superou a própria Depreciação (R$ 498/ha)</span>
            </div>
          </div>
        </div>
        `,
        'Custo de oportunidade do capital vs. custo financeiro de crédito.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Custos fixos inegociáveis',
        `
        <div class="m2-wrap">
          <div style="display:grid;grid-template-columns:0.95fr 1.05fr;gap:20px;flex:1;align-items:center;">
            <div class="m2-photo-box">
              <img src="assets/galpao.jpg" alt="Galpão de máquinas agrícolas"
                   onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
              <div style="display:none;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;color:var(--text-muted);">
                <div style="font-size:38px;margin-bottom:8px;">🚜</div>
                <div style="font-weight:800;">Adicione a foto em <code>assets/galpao.jpg</code></div>
                <span class="m2-sub">Imagem do galpão de máquinas</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:14px;">
              <div class="m2-card" style="border-left:5px solid var(--senar-green);padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <span style="font-size:19px;font-weight:800;">Seguro</span>
                  <span class="m2-pill m2-pill-soft">COE</span>
                </div>
                <div style="font-size:14.5px;line-height:1.45;color:var(--text-secondary);">
                  Entra no COE. Custo fixo obrigatório para proteção da frota contra sinistros e perdas.
                </div>
              </div>

              <div class="m2-card" style="border-left:5px solid var(--amber);padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <span style="font-size:19px;font-weight:800;">Abrigo</span>
                  <span class="m2-pill m2-pill-amber">COT</span>
                </div>
                <div style="font-size:14.5px;line-height:1.45;color:var(--text-secondary);">
                  Entra no COT. Proteção das máquinas reduz depreciação acelerada por exposição ao tempo.
                </div>
              </div>

              <div class="m2-card" style="border-left:5px solid var(--senar-green);padding:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <span style="font-size:19px;font-weight:800;">Licenças</span>
                  <span class="m2-pill m2-pill-soft">COE</span>
                </div>
                <div style="font-size:14.5px;line-height:1.45;color:var(--text-secondary);">
                  Entra no COE. Inclui sinal GNSS pago e liberações de software — custos crescentes com a tecnologia embarcada.
                </div>
              </div>
            </div>
          </div>
        </div>
        `,
        'Seguro, abrigo e licenças na estrutura de custos.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Composição dos Custos da Mecanização',
        renderWayfindingM2(2),
        'Etapa 2: Custos Variáveis em foco.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Combustível',
        `
        <div class="m2-wrap tabular">
          <div class="m2-grid-hub">
            <div style="display:flex;flex-direction:column;gap:9px;justify-content:space-between;">
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">A ARMADILHA</div>
                <div style="font-weight:800;font-size:14px;">L/h engana o gestor</div>
                <span class="m2-sub">Gastar menos por hora com baixo rendimento encarece o hectare.</span>
              </div>
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">INDICADOR REAL</div>
                <div style="font-weight:800;font-size:14px;">O que manda é L/ha</div>
                <span class="m2-sub">Conecta consumo real à área efetivamente entregue.</span>
              </div>
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">DENTRO DA PORTEIRA</div>
                <div style="font-weight:800;font-size:14px;">Preço vs. Consumo</div>
                <span class="m2-sub">Ninguém controla o litro na bomba, mas controla o talhão.</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;justify-content:center;gap:10px;">
              <div class="m2-card-soft" style="text-align:center;">
                <span class="m2-pill m2-pill-soft">GESTÃO</span>
                <div style="font-weight:800;font-size:14.5px;margin-top:4px;">Como Medir Certo</div>
                <span class="m2-sub">Fuja da armadilha do horímetro</span>
              </div>
              <div class="m2-card-dark" style="text-align:center;padding:16px 14px;">
                <div style="font-size:10.5px;font-weight:800;letter-spacing:0.1em;color:var(--gold);">CUSTO VARIÁVEL #1</div>
                <div style="font-size:21px;font-weight:900;margin:4px 0;">DIESEL NO CAMPO</div>
                <div style="font-size:12.5px;opacity:0.9;">Maior desembolso direto de caixa na operação</div>
              </div>
              <div class="m2-card-red" style="text-align:center;">
                <span class="m2-pill m2-pill-red">DESPERDÍCIO</span>
                <div style="font-weight:800;font-size:14.5px;margin-top:4px;">3 Ralos Invisíveis</div>
                <span class="m2-sub">Onde o diesel vira fumaça</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:9px;justify-content:space-between;">
              <div class="m2-card" style="border-right:4px solid var(--red);">
                <div class="m2-kicker" style="color:var(--red-dark);">RALO 1 • LOGÍSTICA</div>
                <div style="font-weight:800;font-size:14px;">Marcha Lenta e Ociosidade</div>
                <span class="m2-sub">Motor ligado esperando transbordo, água ou manobra longa.</span>
              </div>
              <div class="m2-card" style="border-right:4px solid var(--red);">
                <div class="m2-kicker" style="color:var(--red-dark);">RALO 2 • TRAÇÃO</div>
                <div style="font-weight:800;font-size:14px;">Patinagem e Lastragem</div>
                <span class="m2-sub">Lastro ou calibragem errada queima potência e pneu.</span>
              </div>
              <div class="m2-card" style="border-right:4px solid var(--red);">
                <div class="m2-kicker" style="color:var(--red-dark);">RALO 3 • OPERAÇÃO</div>
                <div style="font-weight:800;font-size:14px;">Rotação Fora da Faixa</div>
                <span class="m2-sub">Regra de ouro: marcha acima, rotação abaixo (faixa econômica).</span>
              </div>
            </div>
          </div>

          <div class="m2-card-amber" style="display:grid;grid-template-columns:1.35fr 0.65fr;gap:14px;align-items:center;">
            <div>
              <div class="m2-kicker" style="color:var(--amber-dark);">IMPACTO NO CAIXA (COE) • CONTA RÁPIDA NA FAZENDA • ÁREA DE 1.000 HA</div>
              <div style="font-size:13px;">
                Desperdiçar apenas <strong>4 L/ha</strong> somando as operações da safra vira dinheiro queimado direto do COE — sem entregar 1 grama a mais de soja no graneleiro.
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center;">
              <div class="m2-card" style="padding:7px;">
                <div style="font-size:16px;font-weight:900;color:var(--red-dark);">4.000 L</div>
                <span class="m2-sub" style="font-size:10.5px;">Diesel perdido/safra</span>
              </div>
              <div class="m2-card" style="padding:7px;">
                <div style="font-size:16px;font-weight:900;color:var(--red-dark);">~R$ 24 mil</div>
                <span class="m2-sub" style="font-size:10.5px;">Ref. R$ 6,00/L (COE)</span>
              </div>
              <div class="m2-card" style="padding:7px;">
                <div style="font-size:16px;font-weight:900;color:var(--amber-dark);">185 sc</div>
                <span class="m2-sub" style="font-size:10.5px;">Soja a R$ 130/sc</span>
              </div>
            </div>
          </div>
        </div>
        `,
        'Consumo específico (L/ha) vs. consumo horário (L/h).'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Lubrificantes',
        `
        <div class="m2-wrap">
          <div class="m2-grid-hub">
            <div style="display:flex;flex-direction:column;gap:9px;justify-content:space-between;">
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">ESPECIFICAÇÃO</div>
                <div style="font-weight:800;font-size:14px;">Norma acima de marca</div>
                <span class="m2-sub">Viscosidade e classificação (API / hidráulico) não admitem improviso.</span>
              </div>
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">INTERVALO</div>
                <div style="font-weight:800;font-size:14px;">Horímetro ou severidade</div>
                <span class="m2-sub">Esticar troca no MT (poeira, calor e carga) satura filtro e aditivo.</span>
              </div>
              <div class="m2-card" style="border-left:4px solid var(--senar-green);">
                <div class="m2-kicker">CONJUNTO</div>
                <div style="font-weight:800;font-size:14px;">Óleo bom pede filtro bom</div>
                <span class="m2-sub">Filtro paralelo ou vencido deixa contaminante circular no sistema.</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;justify-content:center;gap:10px;">
              <div class="m2-card-soft" style="text-align:center;">
                <span class="m2-pill m2-pill-soft">GESTÃO</span>
                <div style="font-weight:800;font-size:14.5px;margin-top:4px;">Regra do Jogo</div>
                <span class="m2-sub">Especificação e prazo mandam</span>
              </div>
              <div class="m2-card-dark" style="text-align:center;padding:16px 14px;">
                <div style="font-size:10.5px;font-weight:800;letter-spacing:0.1em;color:var(--gold);">CUSTO VARIÁVEL #2</div>
                <div style="font-size:19.5px;font-weight:900;margin:4px 0;">LUBRIFICANTES E FILTROS</div>
                <div style="font-size:12.5px;opacity:0.9;">A película que separa desgaste normal de quebra</div>
              </div>
              <div class="m2-card-amber" style="text-align:center;">
                <span class="m2-pill m2-pill-amber">ATENÇÃO</span>
                <div style="font-weight:800;font-size:14.5px;margin-top:4px;">Pontos Críticos</div>
                <span class="m2-sub">Onde o erro custa caro</span>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:9px;justify-content:space-between;">
              <div class="m2-card" style="border-right:4px solid var(--amber);">
                <div class="m2-kicker" style="color:var(--amber-dark);">CONTAMINAÇÃO</div>
                <div style="font-weight:800;font-size:14px;">Poeira, água e diesel ruim</div>
                <span class="m2-sub">Armazenagem e abastecimento sujos destroem bomba, bico e óleo.</span>
              </div>
              <div class="m2-card" style="border-right:4px solid var(--amber);">
                <div class="m2-kicker" style="color:var(--amber-dark);">FALSA ECONOMIA</div>
                <div style="font-weight:800;font-size:14px;">Óleo barato no tambor</div>
                <span class="m2-sub">Economia de centavos por litro cobra alto em desgaste prematuro.</span>
              </div>
              <div class="m2-card" style="border-right:4px solid var(--amber);">
                <div class="m2-kicker" style="color:var(--amber-dark);">MONITORAMENTO</div>
                <div style="font-weight:800;font-size:14px;">Análise de óleo e nível</div>
                <span class="m2-sub">Checagem diária de nível e análise periódica antecipam falhas.</span>
              </div>
            </div>
          </div>

          <div class="m2-grid-2" style="flex:0;">
            <div class="m2-card-red">
              <div class="m2-kicker" style="color:var(--red-dark);">HORAS OCIOSAS AUMENTAM O CUSTO</div>
              <div style="font-size:12.5px;">Cada hora ociosa com motor ligado queima horímetro e aditivo sem entregar hectare — dilui menos o custo fixo e antecipa trocas preventivas.</div>
            </div>
            <div class="m2-card-soft" style="border-left:4px solid var(--senar-green);">
              <div class="m2-kicker">MANUTENÇÃO PREDITIVA = SAÍDA DE ECONOMIA</div>
              <div style="font-size:12.5px;">Trocar óleo/filtro pelo estado real (análise de óleo e monitoramento) evita troca prematura e freia quebra cara em plena janela.</div>
            </div>
          </div>
        </div>
        `,
        'Especificação técnica, filtragem e severidade operacional.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Manutenção e peças',
        `
        <div class="m2-wrap">
          <div class="m2-grid-3">
            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--red);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m2-kicker" style="color:var(--red-dark);">EFEITO CASCATA</div>
                  <span class="m2-pill m2-pill-red">01</span>
                </div>
                <div style="font-size:17.5px;font-weight:800;margin-top:4px;">Atuar no início da falha</div>
                <ul class="m2-ul red">
                  <li><strong>Falha pequena vira quebra grande:</strong> vazamento, folga, ruído ou correia gasta puxam outros componentes junto.</li>
                  <li><strong>Adiar conserto cobra juros altos:</strong> rodar "só até fechar o talhão" multiplica peça, tempo de oficina e parada.</li>
                  <li><strong>Janela perdida pesa mais que a peça:</strong> quebra no plantio ou na colheita compromete operação inteira.</li>
                </ul>
              </div>
              <div class="m2-card-red" style="margin-top:10px;font-size:12px;font-weight:700;">
                Intervir cedo corta a cadeia de quebras e salva o orçamento.
              </div>
            </div>

            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--senar-green);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m2-kicker">ROTINA PADRONIZADA</div>
                  <span class="m2-pill m2-pill-soft">02</span>
                </div>
                <div style="font-size:17.5px;font-weight:800;margin-top:4px;">Força dos checklists</div>
                <ul class="m2-ul">
                  <li><strong>Tira a gestão da memória:</strong> padroniza inspeção diária e preventiva sem depender de "achismo".</li>
                  <li><strong>Flagra anomalia antes de parar:</strong> pressão, temperatura, ruídos, filtros, bicos e aperto de parafusos.</li>
                  <li><strong>Gera histórico e cobrança clara:</strong> aponta quem viu, o que falhou e o que precisa entrar em peça.</li>
                </ul>
              </div>
              <div class="m2-card-soft" style="margin-top:10px;font-size:12px;font-weight:700;">
                Checklist sem ação vira papel; com rotina, vira prevenção.
              </div>
            </div>

            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--amber);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m2-kicker" style="color:var(--amber-dark);">FATOR HUMANO</div>
                  <span class="m2-pill m2-pill-amber">03</span>
                </div>
                <div style="font-size:17.5px;font-weight:800;margin-top:4px;">Importância da mão de obra</div>
                <ul class="m2-ul">
                  <li><strong>Operador é o primeiro sensor:</strong> percebe mudança de som, vibração ou resposta antes do alarme.</li>
                  <li><strong>Capacitação reduz erro e retrabalho:</strong> regulagem errada ou montagem mal feita gera nova falha rápida.</li>
                  <li><strong>Equipe alinhada fecha o ciclo:</strong> operador reporta cedo e mecânico executa no padrão certo.</li>
                </ul>
              </div>
              <div class="m2-card-amber" style="margin-top:10px;font-size:12px;font-weight:700;">
                Não basta ter peça boa — exige gente treinada operando e mantendo.
              </div>
            </div>
          </div>

          <div class="m2-footer-bar">
            <span>Na prática: falha atendida no começo + checklist disciplinado + mão de obra capacitada reduzem corretiva cara e mantêm a frota na janela.</span>
            <span class="m2-pill m2-pill-green">COE</span>
          </div>
        </div>
        `,
        'Prevenção, rotina de inspeção e capacitação técnica.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Pneus',
        `
        <div class="m2-wrap">
          <div class="m2-grid-2">
            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:5px solid var(--red);padding:18px;">
              <div>
                <div class="m2-kicker" style="color:var(--red-dark);">O QUE ANTECIPA O DESGASTE</div>
                <div style="font-size:20px;font-weight:800;margin-bottom:8px;">Mau uso no dia a dia</div>
                <ul class="m2-ul red" style="gap:12px;">
                  <li><strong>Pressão errada:</strong> pouca pressão superaquece e estressa a carcaça; excesso concentra o desgaste no centro da banda e reduz aderência.</li>
                  <li><strong>Tração dianteira ligada no asfalto:</strong> trava o esterçamento, gera arraste forçado e devora a borracha em deslocamentos.</li>
                  <li><strong>Lastro ou patinagem:</strong> excesso de patinagem ou peso mal distribuído acelera o desgaste sem ganho de tração.</li>
                </ul>
              </div>
              <div class="m2-card-red" style="margin-top:14px;font-size:13px;font-weight:700;">
                A borracha acaba bem antes da hora e a troca pesa direto no caixa.
              </div>
            </div>

            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:5px solid var(--senar-green);padding:18px;">
              <div>
                <div class="m2-kicker">COMO ALONGAR A VIDA ÚTIL</div>
                <div style="font-size:20px;font-weight:800;margin-bottom:8px;">Gestão simples de rodado</div>
                <ul class="m2-ul" style="gap:12px;">
                  <li><strong>Calibragem por operação:</strong> ajustar a pressão conforme a carga e o tipo de piso (campo vs. transporte).</li>
                  <li><strong>Tração 4x4 com critério:</strong> desligar no asfalto e usar apenas quando o solo ou a carga exigirem.</li>
                  <li><strong>Rotina de conferência:</strong> calibragem periódica e atenção aos sinais precoces de desgaste irregular.</li>
                </ul>
              </div>
              <div class="m2-card-soft" style="margin-top:14px;font-size:13px;font-weight:700;">
                Pneu dura mais, patinagem cai e o consumo de diesel acompanha.
              </div>
            </div>
          </div>

          <div class="m2-footer-bar">
            <span>Na conta da fazenda: pneu é item caro de reposição — erro de operação encurta a vida útil e cobra junto no combustível.</span>
            <span class="m2-pill m2-pill-green">COE</span>
          </div>
        </div>
        `,
        'Calibragem, tração 4x4 e patinagem no rodado.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Mão de obra',
        `
        <div class="m2-wrap">
          <div class="m2-grid-3">
            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--senar-green);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m2-kicker">CONTA POR HECTARE</div>
                  <span class="m2-pill m2-pill-soft">01</span>
                </div>
                <div style="font-size:17.5px;font-weight:800;margin-top:4px;">Salário isolado engana</div>
                <ul class="m2-ul">
                  <li><strong>R$/ha depende do rendimento (ha/h):</strong> máquina lenta ou mal aproveitada encarece o hectare trabalhado.</li>
                  <li><strong>Arrasta o custo fixo junto:</strong> menos hectares por hora significa menor diluição de depreciação e capital.</li>
                  <li><strong>Encargos e turno contam:</strong> hora extra mal planejada ou parada constante elevam o custo operacional.</li>
                </ul>
              </div>
              <div class="m2-card-soft" style="margin-top:10px;font-size:12px;font-weight:700;">
                Quem manda no custo da mão de obra é a entrega por hora.
              </div>
            </div>

            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--amber);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m2-kicker" style="color:var(--amber-dark);">EFEITO ALAVANCA</div>
                  <span class="m2-pill m2-pill-amber">02</span>
                </div>
                <div style="font-size:17.5px;font-weight:800;margin-top:4px;">Puxa ou segura os outros custos</div>
                <ul class="m2-ul">
                  <li><strong>Diesel e marcha:</strong> condução correta segura L/ha; marcha baixa com giro alto queima combustível.</li>
                  <li><strong>Rodado e transmissão:</strong> desligar 4x4 no asfalto e calibrar pressão preservam pneu e trem de força.</li>
                  <li><strong>Regulagem e atenção:</strong> erro de calibragem, sobreposição ou falta de reporte viram perda e quebra.</li>
                </ul>
              </div>
              <div class="m2-card-amber" style="margin-top:10px;font-size:12px;font-weight:700;">
                O operador define como a tecnologia e o ferro performam.
              </div>
            </div>

            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--senar-green);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div class="m2-kicker">SAÍDA PRÁTICA</div>
                  <span class="m2-pill m2-pill-soft">03</span>
                </div>
                <div style="font-size:17.5px;font-weight:800;margin-top:4px;">Capacitação é retorno</div>
                <ul class="m2-ul">
                  <li><strong>Treinamento corta retrabalho:</strong> padroniza operação, leitura de painel e ajuste fino no campo.</li>
                  <li><strong>Menos erro na janela crítica:</strong> ganho de eficiência em plantio, aplicação e colheita vale sacas.</li>
                  <li><strong>Retenção e segurança:</strong> equipe bem formada erra menos, acidenta menos e entrega mais resultado.</li>
                </ul>
              </div>
              <div class="m2-card-soft" style="margin-top:10px;font-size:12px;font-weight:700;">
                Formar gente é uma das alavancas mais baratas e eficazes.
              </div>
            </div>
          </div>

          <div class="m2-footer-bar">
            <span>Fechando os custos variáveis: máquina cara e tecnologia embarcada só pagam a conta com gente capacitada no comando.</span>
            <span class="m2-pill m2-pill-green">COE + EFICIÊNCIA</span>
          </div>
        </div>
        `,
        'Rendimento operacional, alavancagem de custos e capacitação.'
      )
    },

    {
      module: 2,
      render: () => wrapM2(
        'Composição Real: Ranking de Custos & Diluição',
        `
        <div class="m2-wrap tabular" id="m2-sim-root">
          <div class="m2-sim-grid">
            <div class="m2-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:8px;padding:12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                <div style="font-weight:800;font-size:14px;">Ranking Dinâmico por Hora Trabalhada (R$/h)</div>
                <div style="display:flex;gap:8px;font-size:10.5px;font-weight:700;">
                  <span style="color:var(--senar-green);">● Fixo (COT/CT)</span>
                  <span style="color:#0284c7;">● Variável (COE)</span>
                  <span style="color:var(--amber);">★ A Maestra</span>
                </div>
              </div>

              <div id="m2-sim-ranking" style="display:flex;flex-direction:column;gap:5px;flex:1;justify-content:center;"></div>

              <div class="m2-card-soft" style="padding:8px 12px;font-size:11.5px;" id="m2-sim-life-box"></div>
            </div>

            <div style="display:flex;flex-direction:column;justify-content:space-between;gap:9px;">
              <div class="m2-card" style="padding:11px 14px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;">
                  <span class="m2-kicker" style="margin:0;">CENÁRIOS RÁPIDOS DE PALCO</span>
                  <span class="m2-pill m2-pill-soft">Colheitadeira TC 5.90 • R$ 1,40 mi</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
                  <button type="button" class="m2-preset-btn" data-ha="100" data-h="100">
                    <div style="font-weight:800;font-size:11px;">Baixa Escala</div>
                    <span class="m2-sub" style="font-size:10px;">100 ha | 100 h</span>
                  </button>
                  <button type="button" class="m2-preset-btn active" data-ha="500" data-h="300">
                    <div style="font-weight:800;font-size:11px;">Base TC 5.90</div>
                    <span class="m2-sub" style="font-size:10px;">500 ha | 300 h</span>
                  </button>
                  <button type="button" class="m2-preset-btn" data-ha="500" data-h="200">
                    <div style="font-weight:800;font-size:11px;">Corte Ociosid.</div>
                    <span class="m2-sub" style="font-size:10px;">500 ha | 200 h</span>
                  </button>
                  <button type="button" class="m2-preset-btn" data-ha="1200" data-h="700">
                    <div style="font-weight:800;font-size:11px;">2 Safras (Hor.)</div>
                    <span class="m2-sub" style="font-size:10px;">1.200 ha | 700 h</span>
                  </button>
                </div>

                <div style="margin-top:10px;display:flex;flex-direction:column;gap:8px;">
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;">
                      <span>Área Colhida / Ano</span>
                      <span id="m2-lbl-ha" style="color:var(--senar-green);font-weight:900;">500 ha</span>
                    </div>
                    <input type="range" id="m2-sl-ha" class="m2-slider" min="100" max="2000" step="50" value="500">
                  </div>
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;">
                      <span>Horas Trabalhadas / Ano <span class="m2-sub" style="display:inline;font-weight:600;">(Limite CONAB: 500 h/ano)</span></span>
                      <span id="m2-lbl-h" style="color:var(--senar-green);font-weight:900;">300 h</span>
                    </div>
                    <input type="range" id="m2-sl-h" class="m2-slider" min="100" max="1200" step="25" value="300">
                  </div>
                </div>
              </div>

              <div class="m2-card-dark" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;">
                <div>
                  <div style="font-size:10.5px;font-weight:800;letter-spacing:0.08em;opacity:0.85;">CUSTO REAL POR HECTARE</div>
                  <div id="m2-kpi-rsha" style="font-size:30px;font-weight:900;line-height:1.1;margin-top:2px;">R$ 750/ha</div>
                  <div id="m2-kpi-diff" style="font-size:11.5px;color:var(--gold);font-weight:700;margin-top:2px;">Cenário Base de Referência</div>
                </div>
                <div style="text-align:right;">
                  <div id="m2-kpi-scha" style="font-size:19px;font-weight:800;color:var(--gold);">5,77 sc/ha</div>
                  <div style="font-size:11px;opacity:0.8;">Ref. Soja R$ 130/sc</div>
                </div>
              </div>

              <div class="m2-kpi-grid">
                <div class="m2-kpi">
                  <div style="font-size:10px;font-weight:800;color:var(--text-muted);">CUSTO HORÁRIO</div>
                  <div id="m2-kpi-rsh" style="font-size:16px;font-weight:900;margin-top:2px;">R$ 1.249/h</div>
                  <span id="m2-kpi-mix" class="m2-sub" style="font-size:10px;">Fixo 68% • Var 32%</span>
                </div>
                <div class="m2-kpi">
                  <div style="font-size:10px;font-weight:800;color:var(--text-muted);">RENDIMENTO</div>
                  <div id="m2-kpi-hah" style="font-size:16px;font-weight:900;margin-top:2px;">1,67 ha/h</div>
                  <span class="m2-sub" style="font-size:10px;">Área ÷ Horas</span>
                </div>
                <div class="m2-kpi">
                  <div style="font-size:10px;font-weight:800;color:var(--text-muted);">CUSTO ANUAL</div>
                  <div id="m2-kpi-ano" style="font-size:16px;font-weight:900;margin-top:2px;">R$ 374.813</div>
                  <span id="m2-kpi-dep" class="m2-sub" style="font-size:10px;">Dep.: R$ 105.000/ano</span>
                </div>
              </div>
            </div>
          </div>

          <div class="m2-footer-bar" style="padding:8px 14px;font-size:12.5px;">
            <span><strong>Custos Fixos (R$/h) + Custos Variáveis (R$/h) = Custo Horário (R$/h) ÷ Rendimento (ha/h) = Custo Real (R$/ha)</strong></span>
            <span class="m2-pill m2-pill-amber">Próximo passo → Onde as horas estão vazando no talhão?</span>
          </div>
        </div>
        `,
        'Simulador TC 5.90 • Regra CONAB (5.000 h / 10 anos).'
      ),
      onMount: function () {
        initSimuladorTC590();
      }
    }
  ];

  function calcTC590(ha, horas) {
    const V = 1400000;
    const VR = V * 0.25;
    const baseDep = V - VR;
    const vidaHoras = 5000;
    const vidaAnosMax = 10;
    const limiteCal = vidaHoras / vidaAnosMax;

    let depAnual, depHora, vidaEfetiva, regime;
    if (horas <= limiteCal) {
      depAnual = baseDep / vidaAnosMax;
      depHora = depAnual / horas;
      vidaEfetiva = vidaAnosMax;
      regime = 'Calendário (10 anos CONAB)';
    } else {
      depHora = baseDep / vidaHoras;
      depAnual = depHora * horas;
      vidaEfetiva = vidaHoras / horas;
      regime = 'Horímetro (piso R$ 210/h)';
    }

    const capMedio = (V + VR) / 2;
    const capAnual = capMedio * 0.1375;
    const capHora = capAnual / horas;

    const salAnual = 30400;
    const salHora = salAnual / horas;

    const combHora = 204;
    const manutHora = 126;
    const moHora = 45;
    const pneuHora = 22;

    const fixoHora = capHora + depHora + salHora;
    const varHora = combHora + manutHora + moHora + pneuHora;
    const custoHora = fixoHora + varHora;
    const custoAnual = custoHora * horas;
    const rendimento = ha / horas;
    const custoHa = custoAnual / ha;

    const itens = [
      { nome: 'Custo do Capital', tag: 'FIXO • CT', val: capHora, cor: '#006837', maestra: false },
      { nome: 'Depreciação', tag: 'FIXO • COT', val: depHora, cor: '#047857', maestra: false },
      { nome: 'Combustível e Lubrificantes', tag: 'VAR • COE', val: combHora, cor: '#0284c7', maestra: false },
      { nome: 'Manutenção e Peças', tag: 'VAR • COE', val: manutHora, cor: '#0369a1', maestra: false },
      { nome: 'Seguro, Abrigo e Licenças', tag: 'FIXO • COE/COT', val: salHora, cor: '#15803d', maestra: false },
      { nome: 'Mão de Obra Operacional', tag: 'VAR • COE • A MAESTRA', val: moHora, cor: '#d97706', maestra: true },
      { nome: 'Pneus e Rodados', tag: 'VAR • COE', val: pneuHora, cor: '#0ea5e9', maestra: false }
    ].sort((a, b) => b.val - a.val);

    return {
      ha, horas, depAnual, depHora, vidaEfetiva, regime, limiteCal,
      fixoHora, varHora, custoHora, custoAnual, rendimento, custoHa, itens
    };
  }

  function fmtBRL(n) {
    return 'R$ ' + Math.round(n).toLocaleString('pt-BR');
  }

  function initSimuladorTC590() {
    const slHa = document.getElementById('m2-sl-ha');
    const slH = document.getElementById('m2-sl-h');
    if (!slHa || !slH || slHa.dataset.bound === '1') return;
    slHa.dataset.bound = '1';

    const baseRef = calcTC590(500, 300);

    function render() {
      const ha = Number(slHa.value);
      const h = Number(slH.value);
      const r = calcTC590(ha, h);

      document.getElementById('m2-lbl-ha').textContent = ha.toLocaleString('pt-BR') + ' ha';
      document.getElementById('m2-lbl-h').textContent = h.toLocaleString('pt-BR') + ' h';

      document.getElementById('m2-kpi-rsha').textContent = fmtBRL(r.custoHa) + '/ha';
      document.getElementById('m2-kpi-scha').textContent = (r.custoHa / 130).toFixed(2).replace('.', ',') + ' sc/ha';
      document.getElementById('m2-kpi-rsh').textContent = fmtBRL(r.custoHora) + '/h';

      const pctFixo = Math.round((r.fixoHora / r.custoHora) * 100);
      document.getElementById('m2-kpi-mix').textContent = `Fixo ${pctFixo}% • Var ${100 - pctFixo}%`;
      document.getElementById('m2-kpi-hah').textContent = r.rendimento.toFixed(2).replace('.', ',') + ' ha/h';
      document.getElementById('m2-kpi-ano').textContent = fmtBRL(r.custoAnual);
      document.getElementById('m2-kpi-dep').textContent = `Dep.: ${fmtBRL(r.depAnual)}/ano`;

      const diffPct = ((r.custoHa - baseRef.custoHa) / baseRef.custoHa) * 100;
      const diffEl = document.getElementById('m2-kpi-diff');
      if (Math.abs(diffPct) < 0.2) {
        diffEl.textContent = `Cenário Base (500 ha | 300 h): ${fmtBRL(baseRef.custoHa)}/ha`;
      } else if (diffPct < 0) {
        diffEl.textContent = `${diffPct.toFixed(1).replace('.', ',')}% no custo/ha vs. Base (${fmtBRL(baseRef.custoHa)}/ha)`;
      } else {
        diffEl.textContent = `+${diffPct.toFixed(1).replace('.', ',')}% no custo/ha vs. Base (${fmtBRL(baseRef.custoHa)}/ha)`;
      }

      const maxVal = r.itens[0].val || 1;
      const rankEl = document.getElementById('m2-sim-ranking');
      rankEl.innerHTML = r.itens.map((it, idx) => {
        const pct = (it.val / r.custoHora) * 100;
        const barW = Math.max(4, (it.val / maxVal) * 100);
        return `
          <div class="m2-rank-row ${it.maestra ? 'maestra' : ''}">
            <div style="font-weight:800;color:var(--text-muted);">${idx + 1}º</div>
            <div>
              <div style="font-weight:800;line-height:1.15;">${it.nome}</div>
              <div style="font-size:9.5px;font-weight:700;color:var(--text-muted);">${it.tag}</div>
            </div>
            <div class="m2-bar-track">
              <div class="m2-bar-fill" style="width:${barW.toFixed(1)}%;background:${it.cor};"></div>
            </div>
            <div style="font-weight:800;text-align:right;">${fmtBRL(it.val)}/h</div>
            <div style="font-weight:700;text-align:right;color:var(--text-secondary);">${pct.toFixed(1).replace('.', ',')}%</div>
          </div>
        `;
      }).join('');

      const lifeEl = document.getElementById('m2-sim-life-box');
      if (h <= r.limiteCal) {
        lifeEl.innerHTML = `<strong>VIDA ÚTIL EFETIVA: 10,0 anos (${r.regime})</strong> — Até 500 h/ano, a depreciação anual fica travada em <strong>R$ 105.000/ano</strong> e o custo/h cai conforme você trabalha mais horas.`;
      } else {
        lifeEl.innerHTML = `<strong>VIDA ÚTIL EFETIVA: ${r.vidaEfetiva.toFixed(1).replace('.', ',')} anos (${r.regime})</strong> — Acima de 500 h/ano, a vida útil em anos cai, a depreciação/h trava no piso (<strong>R$ 210/h</strong>) e a depreciação anual sobe para <strong>${fmtBRL(r.depAnual)}/ano</strong>.`;
      }
    }

    slHa.addEventListener('input', () => {
      document.querySelectorAll('#m2-sim-root .m2-preset-btn').forEach(b => b.classList.remove('active'));
      render();
    });
    slH.addEventListener('input', () => {
      document.querySelectorAll('#m2-sim-root .m2-preset-btn').forEach(b => b.classList.remove('active'));
      render();
    });

    document.querySelectorAll('#m2-sim-root .m2-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#m2-sim-root .m2-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        slHa.value = btn.dataset.ha;
        slH.value = btn.dataset.h;
        render();
      });
    });

    render();
  }

  window.EXTRA_SLIDES = window.EXTRA_SLIDES || [];
  window.EXTRA_SLIDES.push(...M2_SLIDES);
  window.M2_SLIDES = M2_SLIDES;
  window.initSimuladorTC590 = initSimuladorTC590;
})();
