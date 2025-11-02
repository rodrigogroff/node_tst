import axios from "axios";

async function test_all_empty() {
  try {
    const response = await axios.post("http://localhost:3000/auth", { "cliente_id": "", "email" : "" });
    return false    
  } catch (error) {
    return true
  }
}

async function test_client_id_invalid() {
  try {
    const response = await axios.post("http://localhost:3000/auth", { "cliente_id": "7407440e-180c-4e1f-ac22-eaba916b3c90", "email" : "teste@teste.com" });
    return false;
  } catch (error) {
    return true
  }
}

async function test_client_id_valid_invalid_email() {
  try {
    const response = await axios.post("http://localhost:3000/auth", { "cliente_id": "7407440e-180c-4e1f-ac22-eaba916b3c9d", "email" : "teste@teste.com" });
    return false;
  } catch (error) {
    return true
  }
}

async function test_client_id_valid_valid_email() {
  try {
    const response = await axios.post("http://localhost:3000/auth", { "cliente_id": "7407440e-180c-4e1f-ac22-eaba916b3c9d", "email" : "rodrigo.groff@gmail.com" });
    return true    
  } catch (error) {
    return false;
  }
}

export async function test_auth() {
  if (!await test_all_empty()) { console.log('test_all_empty FAILED'); return; }
  if (!await test_client_id_invalid()) { console.log('test_client_id_invalid FAILED'); return; }
  if (!await test_client_id_valid_invalid_email()) { console.log('test_client_id_valid_invalid_email FAILED'); return; }
  if (!await test_client_id_valid_valid_email()) { console.log('test_client_id_valid_valid_email FAILED'); return; }
  console.log('test_auth() ==> PASSED')
}
