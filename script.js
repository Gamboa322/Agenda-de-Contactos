let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
const contactosDiv = document.getElementById("contactos");
const form = document.getElementById("contactForm");
const mensaje = document.getElementById("mensaje");
let editando = null;

function mostrarMensaje(texto, tipo = "error") {
  mensaje.textContent = texto;
  mensaje.style.color = tipo === "error" ? "#d32f2f" : "#388e3c";
  setTimeout(() => mensaje.textContent = "", 3000);
}

function renderizarContactos() {
  contactosDiv.innerHTML = "";
  if (contactos.length === 0) {
    contactosDiv.innerHTML = "<p style='text-align:center;'>No hay contactos guardados.</p>";
    return;
  }

  contactos.forEach((c, i) => {
    const contacto = document.createElement("div");
    contacto.className = "contacto";
    contacto.innerHTML = `
      <div class="contacto-info">
        <strong>${c.nombre}</strong><br>
        📧 ${c.correo}<br>
        📞 ${c.telefono}
      </div>
      <div class="contacto-actions">
        <button class="editar" onclick="editar(${i})">Editar</button>
        <button class="eliminar" onclick="eliminar(${i})">Eliminar</button>
      </div>
    `;
    contactosDiv.appendChild(contacto);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !correo || !telefono) {
    mostrarMensaje("Por favor, llena todos los campos.");
    return;
  }

  const nuevoContacto = { nombre, correo, telefono };

  if (editando !== null) {
    contactos[editando] = nuevoContacto;
    mostrarMensaje("Contacto actualizado.", "success");
    editando = null;
  } else {
    contactos.push(nuevoContacto);
    mostrarMensaje("Contacto guardado correctamente.", "success");
  }

  localStorage.setItem("contactos", JSON.stringify(contactos));
  form.reset();
  renderizarContactos();
});

function eliminar(index) {
  if (confirm("¿Estás seguro de eliminar este contacto?")) {
    contactos.splice(index, 1);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarMensaje("Contacto eliminado.", "success");
    renderizarContactos();
  }
}

function editar(index) {
  const c = contactos[index];
  document.getElementById("nombre").value = c.nombre;
  document.getElementById("correo").value = c.correo;
  document.getElementById("telefono").value = c.telefono;
  editando = index;
}

function limpiarFormulario() {
  form.reset();
  editando = null;
}

renderizarContactos();
