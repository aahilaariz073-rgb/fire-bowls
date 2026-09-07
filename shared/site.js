/* Shared behaviour for every page: lazy split-section video, ad-attribution
   passthrough, the hero lead form and the quote popup. Each page decides
   which of these exist; every block no-ops when its markup is absent. */

  // The two loops are ~5MB each, so they are not fetched until they are
  // near the viewport, and they pause again once scrolled well past.
  (function(){
    var vids = ['split-loop-video', 'split-loop-video-2']
      .map(function(id){ return document.getElementById(id); })
      .filter(Boolean);
    if (!vids.length) return;

    function play(v){ var p = v.play(); if (p && p.catch) p.catch(function(){}); }

    if (!('IntersectionObserver' in window)) {
      vids.forEach(function(v){ v.preload = 'auto'; play(v); });
      return;
    }

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var v = e.target;
        if (e.isIntersecting) { v.preload = 'auto'; play(v); }
        else if (!v.paused) { v.pause(); }
      });
    }, { rootMargin: '200px 0px' });

    vids.forEach(function(v){ io.observe(v); });
  })();

  // Pass ad attribution through to the CRM: any utm_*/gclid/fbclid on the page
  // URL is appended to the form embeds, so the lead record shows its source.
  (function(){
    var qs = window.location.search;
    if (!qs || qs.length < 2) return;
    var keep = [];
    new URLSearchParams(qs).forEach(function(v, k){
      if (/^utm_/i.test(k) || /^(gclid|fbclid|msclkid|campaign_id|adgroup_id)$/i.test(k)) {
        keep.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
    });
    if (!keep.length) return;
    var extra = keep.join('&');

    var modalFrame = document.getElementById('quote-modal-embed');
    if (modalFrame) {
      var dsrc = modalFrame.getAttribute('data-src');
      if (dsrc) {
        modalFrame.setAttribute('data-src', dsrc + (dsrc.indexOf('?') > -1 ? '&' : '?') + extra);
      }
    }
  })();

  // Hero form posts straight to a GoHighLevel inbound webhook, independent of
  // the popup. Paste the workflow's webhook URL here to switch it on; while it
  // is empty the form falls back to opening the popup so no lead is lost.
  var LEAD_WEBHOOK_URL = '';
  var HOSTED_FORM_URL = 'https://api.leadconnectorhq.com/widget/form/iD7GLxxCdv51i6umUCJF';

  (function(){
    var form = document.getElementById('lead-form');
    if (!form) return;
    var card = form;
    var errorBox = document.getElementById('lead-error');
    var status = document.getElementById('lead-status');
    var button = form.querySelector('button[type="submit"]');

    function campaignParams(){
      var out = {};
      try {
        new URLSearchParams(window.location.search).forEach(function(v, k){
          if (/^utm_/i.test(k) || /^(gclid|fbclid|msclkid)$/i.test(k)) out[k] = v;
        });
      } catch (err) {}
      return out;
    }

    function payload(){
      var name = (document.getElementById('lead-name').value || '').trim();
      var space = name.indexOf(' ');
      var data = {
        first_name: space > -1 ? name.slice(0, space) : name,
        last_name:  space > -1 ? name.slice(space + 1) : '',
        full_name: name,
        phone: (document.getElementById('lead-phone').value || '').trim(),
        email: (document.getElementById('lead-email').value || '').trim(),
        interest: document.getElementById('lead-interest').value || '',
        source: (document.body.getAttribute('data-lead-source') || 'BellaFina landing page') + ' — hero form',
        page_url: window.location.href
      };
      var utm = campaignParams();
      Object.keys(utm).forEach(function(k){ data[k] = utm[k]; });
      return data;
    }

    function showSent(){
      card.classList.add('is-sent');
      if (status) status.classList.add('is-visible');
    }

    function showError(msg){
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.add('is-visible');
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();

      // Until the webhook URL is set, send the lead to the hosted version of
      // the same GoHighLevel form in a new tab, prefilled. Never the popup.
      if (!LEAD_WEBHOOK_URL) {
        var d = payload();
        var q = [
          'first_name=' + encodeURIComponent(d.first_name),
          'last_name=' + encodeURIComponent(d.last_name),
          'phone=' + encodeURIComponent(d.phone),
          'email=' + encodeURIComponent(d.email),
          'single_line_11kyi=' + encodeURIComponent(d.interest)
        ].join('&');
        window.open(HOSTED_FORM_URL + '?' + q, '_blank', 'noopener');
        // Not captured yet — say so rather than claiming we have the lead.
        if (status) {
          status.querySelector('h4').textContent = 'One more step';
          status.querySelector('p').textContent = "We've opened the quote form in a new tab with your details filled in. Send it there and we'll be in touch within one business day.";
        }
        showSent();
        return;
      }

      if (errorBox) errorBox.classList.remove('is-visible');
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }

      var body = JSON.stringify(payload());

      fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then(function(res){
        if (!res.ok) throw new Error('status ' + res.status);
        showSent();
      }).catch(function(){
        // Some webhook endpoints reject the CORS preflight. Retry opaquely so
        // the lead still lands, then treat it as sent.
        fetch(LEAD_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: body
        }).then(function(){
          showSent();
        }).catch(function(){
          if (button) { button.disabled = false; button.innerHTML = 'Request My Free Quote <span class="btn-arrow">&rarr;</span>'; }
          showError('Sorry — that did not send. Please call (714) 699-9269 or email info@bellafinaoutdoors.com.');
        });
      });
    });
  })();

  // Quote modal. Its iframe loads the first time the modal opens, so the page
  // carries one form embed on load rather than two.
  (function(){
    var modal = document.getElementById('quote-modal');
    var frame = document.getElementById('quote-modal-embed');
    if (!modal || !frame) return;
    var lastFocus = null;

    function openModal(e){
      if (e && e.preventDefault) e.preventDefault();
      lastFocus = document.activeElement;
      if (!frame.getAttribute('src')) { frame.setAttribute('src', frame.getAttribute('data-src')); }
      modal.hidden = false;
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      var close = modal.querySelector('.modal-close');
      if (close) close.focus();
    }
    window.openQuoteModal = openModal;

    function closeModal(){
      modal.classList.remove('is-open');
      modal.hidden = true;
      document.body.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    frame.addEventListener('load', function(){
      var wrap = document.getElementById('quote-embed-wrap');
      if (wrap) wrap.classList.add('is-loaded');
    });

    // Warm the embed shortly after load so the popup opens with the form
    // already there rather than starting a cold fetch on click.
    function warm(){
      if (!frame.getAttribute('src')) { frame.setAttribute('src', frame.getAttribute('data-src')); }
    }
    if (window.requestIdleCallback) { requestIdleCallback(warm, { timeout: 4000 }); }
    else { setTimeout(warm, 2500); }

    Array.prototype.forEach.call(document.querySelectorAll('[data-quote-modal]'), function(el){
      el.addEventListener('click', openModal);
    });

    // Show the popup on its own once per visit: 5s after load, or when a
    // desktop visitor moves to leave.
    var AUTO_DELAY_MS = 5000;
    var seen = false;
    try { seen = sessionStorage.getItem('bf_quote_seen') === '1'; } catch (err) {}

    function markSeen(){
      seen = true;
      try { sessionStorage.setItem('bf_quote_seen', '1'); } catch (err) {}
    }

    function autoOpen(){
      if (seen || modal.classList.contains('is-open')) return;
      markSeen();
      openModal();
    }

    if (!seen) {
      setTimeout(autoOpen, AUTO_DELAY_MS);
      if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mouseout', function(e){
          if (!e.relatedTarget && e.clientY <= 0) autoOpen();
        });
      }
    }
    Array.prototype.forEach.call(modal.querySelectorAll('[data-modal-close]'), function(el){
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  })();
