/**
 * HumAi Landing Page — Main Application Scripts
 * Manages interactive simulator, pricing switch, FAQ accordions, feature tabs, and sticky elements.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  const lang = document.documentElement.getAttribute('lang') || 'ar';

  // --------------------------------------------------------------------------
  // 1. WhatsApp Executive Assistant Interactive Simulator
  // --------------------------------------------------------------------------
  const waScenarios = {
    attendance: {
      ar: {
        userMsg: "مين اتأخر النهارده في فرع التجمع؟",
        userTime: "09:35 ص",
        botIntro: "صباح الخير يا فندم. تم فحص الحضور الجغرافي (Geofencing) لفرع التجمع الآن:",
        botPoints: [
          "⚠️ 3 موظفين متأخرين عن موعد الشفت:",
          "• أحمد حسن — متأخر 17 دقيقة (شفت 9:00 ص)",
          "• مريم سعيد — متأخرة 12 دقيقة (شفت 9:00 ص)",
          "• عمر خالد — متأخر 8 دقائق (سجل دخول 9:08 ص)"
        ],
        botOutro: "إجمالي نسبة الحضور في الفرع حتى الآن: 91%.",
        botTime: "09:35 ص",
        hasAction: false
      },
      en: {
        userMsg: "Who is late today at the New Cairo branch?",
        userTime: "09:35 AM",
        botIntro: "Good morning. Real-time geofence attendance for New Cairo branch:",
        botPoints: [
          "⚠️ 3 employees arrived late for today's shift:",
          "• Ahmed Hassan — 17 mins late (Shift 9:00 AM)",
          "• Mariam Saeed — 12 mins late (Shift 9:00 AM)",
          "• Omar Khaled — 8 mins late (Checked in 9:08 AM)"
        ],
        botOutro: "Current branch attendance rate: 91%.",
        botTime: "09:35 AM",
        hasAction: false
      }
    },
    performance: {
      ar: {
        userMsg: "نسبة تحقيق التارجت في قسم المبيعات كام الشهر ده؟",
        userTime: "11:15 ص",
        botIntro: "تقرير أداء المبيعات حتى اليوم (اليوم 24 من الشهر):",
        botPoints: [
          "🎯 نسبة تحقيق التارجت الإجمالية: 87.4% (مستهدف 1.2M EGP — محقق 1.05M EGP)",
          "⭐ أعلى الموظفين أداءً: محمود عادل (118% من التارجت)",
          "📈 أقرب موظف للوصول: نادين سامح (94%)",
          "⚠️ 2 مندوبين تحت 70% من المستهدف الشهري"
        ],
        botOutro: "القسم في طريقه لتجاوز التارجت بـ 4% بحلول نهاية الشهر.",
        botTime: "11:15 ص",
        hasAction: false
      },
      en: {
        userMsg: "What is the sales team's target achievement rate this month?",
        userTime: "11:15 AM",
        botIntro: "Sales performance update as of today (Day 24 of cycle):",
        botPoints: [
          "🎯 Total Team Achievement: 87.4% (Target: 1.2M EGP — Achieved: 1.05M EGP)",
          "⭐ Top Performer: Mahmoud Adel (118% of quota)",
          "📈 Nearing Target: Nadine Sameh (94%)",
          "⚠️ 2 reps currently below 70% monthly milestone"
        ],
        botOutro: "Team projected to exceed target by 4% by month-end.",
        botTime: "11:15 AM",
        hasAction: false
      }
    },
    leave: {
      ar: {
        userMsg: "أحمد فاضله كام يوم إجازة؟ وهل في تعارض لو وافقتله على بكرة؟",
        userTime: "02:10 م",
        botIntro: "سجل الإجازات لـ أحمد حسن (قسم المبيعات):",
        botPoints: [
          "📅 رصيد الإجازات السنوية المتبقي: 9 أيام (استهلك 12 من 21)",
          "✅ لا يوجد تعارض في الشيفت: سارة ومحمود متواجدين غداً بنفس الفرع",
          "📋 الطلب مسجل على السيستم برقم #LV-408"
        ],
        botOutro: "هل ترغب في اعتماد الإجازة الآن؟",
        botTime: "02:10 م",
        hasAction: false
      },
      en: {
        userMsg: "How many leave days does Ahmed have left? Any shift conflicts if approved for tomorrow?",
        userTime: "02:10 PM",
        botIntro: "Leave record for Ahmed Hassan (Sales Department):",
        botPoints: [
          "📅 Remaining Annual Leave: 9 days (Used 12 of 21)",
          "✅ Zero shift conflict: Sarah & Mahmoud cover the same branch tomorrow",
          "📋 Pending request ID: #LV-408"
        ],
        botOutro: "Would you like me to approve this leave now?",
        botTime: "02:10 PM",
        hasAction: false
      }
    },
    action: {
      ar: {
        userMsg: "ضيف 500 جنيه مكافأة لمحمود عشان قفل التارجت.",
        userTime: "04:45 م",
        botIntro: "محمود عادل (مبيعات) — حقق 118% من التارجت الشهري.",
        botPoints: [
          "💰 نوع العملية: مكافأة أداء استثنائي (Bonus)",
          "💵 المبلغ: 500 جنيه مصري",
          "🔒 تأكيد الأمان: يتطلب اعتمادك كمدير تنفيذي مصرح له"
        ],
        botOutro: "هل تريد تأكيد إضافة المبلغ لمسير رواتب الشهر الحالي؟",
        botTime: "04:45 م",
        hasAction: true,
        actionBtnText: "تأكيد إضافة المكافأة الآن (Confirm)",
        actionSuccessMsg: "✅ تم بنجاح! تم قيد مكافأة 500 EGP لمحمود عادل في مسير الرواتب برقم عملية #TX-9042."
      },
      en: {
        userMsg: "Add a 500 EGP bonus for Mahmoud for hitting quota.",
        userTime: "04:45 PM",
        botIntro: "Mahmoud Adel (Sales) — Exceeded monthly target at 118%.",
        botPoints: [
          "💰 Transaction Type: Performance Bonus",
          "💵 Amount: 500 EGP",
          "🔒 Security Protocol: Verified Executive Manager Authorization"
        ],
        botOutro: "Would you like to confirm adding this bonus to the current payroll cycle?",
        botTime: "04:45 PM",
        hasAction: true,
        actionBtnText: "Confirm Bonus (Confirm)",
        actionSuccessMsg: "✅ Confirmed! 500 EGP bonus added to Mahmoud Adel's payroll record under #TX-9042."
      }
    }
  };

  const waTabButtons = document.querySelectorAll('.ai-tab-btn');
  const waChatBody = document.querySelector('#wa-interactive-body');

  function renderScenario(scenarioKey) {
    if (!waChatBody) return;
    const scenario = waScenarios[scenarioKey] ? waScenarios[scenarioKey][lang] : null;
    if (!scenario) return;

    // Build chat markup
    let pointsHtml = scenario.botPoints.map(pt => `<div style="margin-block: 2px;">${pt}</div>`).join('');
    
    let actionHtml = '';
    if (scenario.hasAction) {
      actionHtml = `
        <div class="wa-action-box" id="wa-action-container">
          <div style="font-size: 0.8rem; color: #10B981; font-weight: 700;">
            ${isRTL ? 'إجراء مالي يحتاج تأكيد المالك' : 'Financial Action Requires Owner Approval'}
          </div>
          <button type="button" class="wa-action-btn" id="wa-confirm-btn">
            ${scenario.actionBtnText}
          </button>
        </div>
      `;
    }

    waChatBody.innerHTML = `
      <div class="wa-msg wa-msg-user">
        ${scenario.userMsg}
        <div class="wa-msg-time">${scenario.userTime} ✓✓</div>
      </div>
      <div class="wa-msg wa-msg-bot">
        <div>${scenario.botIntro}</div>
        <div style="margin-block: 6px; padding-inline-start: 4px; border-inline-start: 2px solid #10B981;">
          ${pointsHtml}
        </div>
        <div style="margin-top: 6px;">${scenario.botOutro}</div>
        ${actionHtml}
        <div class="wa-msg-time">${scenario.botTime}</div>
      </div>
    `;

    // Bind action button if present
    const confirmBtn = document.querySelector('#wa-confirm-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const actionContainer = document.querySelector('#wa-action-container');
        if (actionContainer) {
          actionContainer.innerHTML = `
            <div style="font-size: 0.85rem; color: #10B981; font-weight: 700; padding: 6px; background: rgba(16,185,129,0.15); border-radius: 6px;">
              ${scenario.actionSuccessMsg}
            </div>
          `;
          if (window.HumAiAnalytics) {
            window.HumAiAnalytics.track('ai_simulator_action_confirmed', { scenario: scenarioKey });
          }
        }
      });
    }
  }

  // Handle Scenario Tab Clicks
  waTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      waTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenarioKey = btn.getAttribute('data-scenario');
      renderScenario(scenarioKey);
      if (window.HumAiAnalytics) {
        window.HumAiAnalytics.track('ai_simulator_tab_switch', { scenario: scenarioKey });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Pricing Toggle (Monthly vs Annual)
  // --------------------------------------------------------------------------
  const pricingButtons = document.querySelectorAll('.pricing-switch-btn');
  const aiPriceAmount = document.querySelector('#pricing-ai-amount');
  const aiPricePeriod = document.querySelector('#pricing-ai-period');
  const aiSavingsNotice = document.querySelector('#pricing-savings-notice');

  pricingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pricingButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const billingCycle = btn.getAttribute('data-billing');

      if (billingCycle === 'annual') {
        if (aiPriceAmount) aiPriceAmount.textContent = '4,000';
        if (aiPricePeriod) aiPricePeriod.textContent = isRTL ? 'جنيه / سنويًا' : 'EGP / year';
        if (aiSavingsNotice) aiSavingsNotice.style.display = 'inline-block';
        if (window.HumAiAnalytics) window.HumAiAnalytics.events.selectAnnual();
      } else {
        if (aiPriceAmount) aiPriceAmount.textContent = '600';
        if (aiPricePeriod) aiPricePeriod.textContent = isRTL ? 'جنيه / شهريًا' : 'EGP / month';
        if (aiSavingsNotice) aiSavingsNotice.style.display = 'none';
        if (window.HumAiAnalytics) window.HumAiAnalytics.events.selectMonthly();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Platform Feature Category Tabs (Section 7)
  // --------------------------------------------------------------------------
  const featureCategoryButtons = document.querySelectorAll('.feature-nav-btn');
  const featureCards = document.querySelectorAll('.feature-card');

  featureCategoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      featureCategoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedCategory = btn.getAttribute('data-category');

      featureCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. FAQ Accordion
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items for clean accordion UX
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        const questionText = questionBtn.textContent.trim();
        if (window.HumAiAnalytics) {
          window.HumAiAnalytics.events.faqOpen(questionText);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Mobile Sticky Bottom Action Bar Visibility
  // --------------------------------------------------------------------------
  const mobileStickyBar = document.querySelector('#mobile-sticky-bar');
  const heroSection = document.querySelector('#hero');
  const footerSection = document.querySelector('#footer');

  if (mobileStickyBar && heroSection && 'IntersectionObserver' in window) {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If hero is out of view, show sticky bar on mobile
        if (!entry.isIntersecting && window.innerWidth <= 768) {
          mobileStickyBar.classList.add('visible');
        } else {
          mobileStickyBar.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    stickyObserver.observe(heroSection);

    // Hide sticky bar when footer is in view
    if (footerSection) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            mobileStickyBar.classList.remove('visible');
          }
        });
      }, { threshold: 0.2 });
      footerObserver.observe(footerSection);
    }
  }

  // --------------------------------------------------------------------------
  // 6. Global CTA Event Delegation
  // --------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-analytics-event]');
    if (!target) return;

    const eventName = target.getAttribute('data-analytics-event');
    const location = target.getAttribute('data-analytics-location') || 'page_element';

    if (eventName === 'click_start_trial') {
      window.HumAiAnalytics.events.clickStartTrial(location);
    } else if (eventName === 'click_demo') {
      window.HumAiAnalytics.events.clickDemo(location);
    } else if (eventName === 'click_whatsapp') {
      window.HumAiAnalytics.events.clickWhatsApp(location);
    }
  });

  // --------------------------------------------------------------------------
  // 7. Initialize first simulator state
  // --------------------------------------------------------------------------
  renderScenario('attendance');
});
