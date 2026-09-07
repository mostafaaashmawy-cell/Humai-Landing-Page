/**
 * HumAi Conversion & Analytics Tracker
 * Production-ready tracking helper for Meta Pixel, Google Analytics (GA4), TikTok Pixel, and WhatsApp CTAs.
 */

(function () {
  'use strict';

  window.HumAiAnalytics = {
    // Debug mode (enabled by default on localhost or with ?debug_analytics=true)
    isDebug: window.location.hostname === 'localhost' || 
             window.location.hostname === '127.0.0.1' || 
             window.location.search.includes('debug_analytics=true'),

    /**
     * Dispatch an event to all integrated tracking platforms
     * @param {string} eventName - Name of the conversion event
     * @param {Object} [params={}] - Additional metadata
     */
    track: function (eventName, params) {
      params = params || {};
      params.timestamp = new Date().toISOString();
      params.lang = document.documentElement.getAttribute('lang') || 'ar';
      params.page = window.location.pathname;

      if (this.isDebug) {
        console.groupCollapsed(`[HumAi Analytics] Event: %c${eventName}`, 'color: #10B981; font-weight: bold;');
        console.log('Parameters:', params);
        console.groupEnd();
      }

      // 1. Meta Pixel (Facebook)
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, params);
      }

      // 2. Google Analytics 4 / Google Ads (gtag)
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }

      // 3. TikTok Pixel
      if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') {
        window.ttq.track(eventName, params);
      }

      // 4. Custom Dispatch for native listeners
      const customEvent = new CustomEvent('humai_conversion', {
        detail: { eventName, params }
      });
      window.dispatchEvent(customEvent);
    },

    /**
     * Helper for standard conversion events
     */
    events: {
      viewHero: function () {
        window.HumAiAnalytics.track('view_hero');
      },
      clickStartTrial: function (location) {
        window.HumAiAnalytics.track('click_start_trial', { cta_location: location || 'unknown' });
      },
      clickDemo: function (location) {
        window.HumAiAnalytics.track('click_demo', { cta_location: location || 'unknown' });
      },
      clickWhatsApp: function (location, queryType) {
        window.HumAiAnalytics.track('click_whatsapp', {
          cta_location: location || 'unknown',
          query_type: queryType || 'direct_inquiry'
        });
      },
      viewAiSection: function () {
        window.HumAiAnalytics.track('view_ai_section');
      },
      viewPricing: function () {
        window.HumAiAnalytics.track('view_pricing');
      },
      selectMonthly: function () {
        window.HumAiAnalytics.track('select_monthly', { plan: 'monthly', price: 600, currency: 'EGP' });
      },
      selectAnnual: function () {
        window.HumAiAnalytics.track('select_annual', { plan: 'annual', price: 4000, currency: 'EGP', savings: 3200 });
      },
      faqOpen: function (questionTitle) {
        window.HumAiAnalytics.track('faq_open', { question: questionTitle });
      },
      startSignup: function (planSelected) {
        window.HumAiAnalytics.track('start_signup', { plan: planSelected || 'core_3800' });
      }
    }
  };

  // Intersection Observer for Section Impression Tracking
  document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = { threshold: 0.35 };

    const heroSection = document.querySelector('#hero');
    const aiSection = document.querySelector('#ai-assistant');
    const pricingSection = document.querySelector('#pricing');

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'hero') {
              window.HumAiAnalytics.events.viewHero();
              observer.unobserve(entry.target);
            } else if (entry.target.id === 'ai-assistant') {
              window.HumAiAnalytics.events.viewAiSection();
              observer.unobserve(entry.target);
            } else if (entry.target.id === 'pricing') {
              window.HumAiAnalytics.events.viewPricing();
              observer.unobserve(entry.target);
            }
          }
        });
      }, observerOptions);

      if (heroSection) sectionObserver.observe(heroSection);
      if (aiSection) sectionObserver.observe(aiSection);
      if (pricingSection) sectionObserver.observe(pricingSection);
    }
  });
})();
