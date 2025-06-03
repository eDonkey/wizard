
let currentStep = 1;

function nextStep() {
  document.querySelector('.step.active').classList.remove('active');
  currentStep++;
  document.querySelector('.step[data-step="' + currentStep + '"]').classList.add('active');
}

async function submitForm() {
  const emociones = document.getElementById('emociones').value;
  const estilo_preferido = document.getElementById('estilo_preferido').value;
  const colores = document.getElementById('colores').value;
  const descripcion = document.getElementById('descripcion').value;

  const payload = {
    emociones,
    descripcion: estilo_preferido + " " + colores + " " + descripcion
  };

  const res = await fetch('https://wizard-mb0m.onrender.com/api/sugerencia', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  const resultado = data.respuesta;

  document.getElementById('respuesta-json').textContent = resultado;
  document.getElementById('resultado').classList.remove('oculto');

  // Guardar en localStorage
  const historial = JSON.parse(localStorage.getItem('estilos')) || [];
  historial.push({ fecha: new Date().toISOString(), resultado });
  localStorage.setItem('estilos', JSON.stringify(historial));
}

function descargarPDF() {
  const element = document.getElementById('resultado');
  html2pdf().from(element).save('estilo_visual.pdf');
}
