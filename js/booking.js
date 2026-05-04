function initBookingForm(){
  var emailField = document.getElementById('booking-form-to');
  var counsellorField = document.getElementById('booking-form-counsellor');
  var submit = document.getElementById('booking-submit');
  var form = document.querySelector('.booking-form');

  if (emailField) emailField.value = 'neil@neilatkinsoncounselling.co.uk';
  if (counsellorField) counsellorField.value = 'Neil Atkinson';
  if (submit) submit.textContent = 'Send message to Neil';
  if (form) form.setAttribute('action', 'thankyou.html?counsellor=neil-atkinson');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBookingForm);
} else {
  initBookingForm();
}
