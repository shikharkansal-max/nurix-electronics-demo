(function () {
  'use strict';

  var API_URL = 'https://agentx-us.nurixlabs.tech/voice/outbound-call';
  var AGENT_ID = 'fb466fac-ed15-4ca0-bca2-fcc21f49cf81';
  var WORKSPACE_ID = 'e3d23869-60c0-4191-8852-08e67de83a39';

  function wireCallMeButton() {
    var btn = document.getElementById('please_call_me');
    var nameInput = document.getElementById('name_input');
    var phoneInput = document.getElementById('phone_input');
    var transferInput = document.getElementById('transfer_input');
    var statusEl = document.getElementById('callMeStatus');
    if (!btn || !nameInput || !phoneInput || !statusEl) return;

    btn.addEventListener('click', async function () {
      if (btn.disabled) return;

      var name = nameInput.value.trim();
      var phone = phoneInput.value.trim();
      var transfer = transferInput ? transferInput.value.trim() : '';

      if (!name) { nameInput.focus(); return; }
      if (!phone) { phoneInput.focus(); return; }

      var originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Placing your call…';

      statusEl.classList.add('d-none');
      statusEl.classList.remove('status-success', 'status-error');
      statusEl.textContent = '';

      try {
        var resp = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'workspace-id': WORKSPACE_ID,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            agent_id: AGENT_ID,
            number: phone,
            custom_dynamic_variables_config: {
              transfer_phone_number: transfer,
            },
          }),
        });

        if (!resp.ok) throw new Error('Request failed: ' + resp.status);

        statusEl.textContent =
          'You’ll receive a call from Nurix Electronics shortly.';
        statusEl.classList.remove('d-none');
        statusEl.classList.add('status-success');
        btn.textContent = 'Call Requested';
      } catch (err) {
        console.error('Error:', err);
        statusEl.textContent = 'Something went wrong. Please try again.';
        statusEl.classList.remove('d-none');
        statusEl.classList.add('status-error');
        btn.disabled = false;
        btn.innerHTML = originalHTML;
      }
    });
  }

  function setFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireCallMeButton();
    setFooterYear();
  });
})();
