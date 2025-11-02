// Función para convertir un ArrayBuffer en string hexadecimal
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Genera un hash SHA-256 del texto dado
export async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hashBuffer);
}

// Crea una sal aleatoria (16 bytes)
export function generateSalt() {
  const saltArray = new Uint8Array(16);
  crypto.getRandomValues(saltArray);
  return bufferToHex(saltArray);
}

// Manejo de registro
// document.getElementById("regSubmitBtn").addEventListener("click", async () => {
//   const username = document.getElementById("regUser").value.trim();
//   const password = document.getElementById("regPass").value;

//   if (!username || !password) {
//     showMessage("Por favor, completa todos los campos");
//     return;
//   }

//   const salt = generateSalt();
//   const hash = await hashText(password + salt);

//   const users = JSON.parse(localStorage.getItem("users") || "{}");
//   users[username] = { salt, hash };
//   localStorage.setItem("users", JSON.stringify(users));

//   showMessage("✅ Usuario registrado correctamente");
// });

// Manejo de login
// document.getElementById("logSubmitBtn").addEventListener("click", async () => {
//   const username = document.getElementById("logUser").value.trim();
//   const password = document.getElementById("logPass").value;

//   const users = JSON.parse(localStorage.getItem("users") || "{}");
//   const user = users[username];

//   if (!user) {
//     showMessage("❌ Usuario no encontrado");
//     return;
//   }

//   const hash = await hashText(password + user.salt);

//   if (hash === user.hash) {
//     showMessage("✅ Login correcto. Bienvenido, " + username + "!");
//   } else {
//     showMessage("❌ Contraseña incorrecta");
//   }
// });

// function showMessage(text) {
//   document.getElementById("message").textContent = text;
// }
