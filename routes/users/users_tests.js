import axios from "axios";

async function test_name_unauthorized() {
  try {
    const response = await axios.get("http://localhost:3000/users", {
      headers: {
        authorization: "666666",
        cliente_id: "7407440e-180c-4e1f-ac22-eaba916b3c9d"
      }
    })
    return false    
  } catch (error) {
    return true
  }
}

async function test_name_unauthorized_invalid_cliente_id() {
  try {
    const response = await axios.get("http://localhost:3000/users", {
      headers: {
        authorization: "123456",
        cliente_id: "7407440e-180c-4e1f-ac22-eaba916b3c9a"
      }
    })
    return false    
  } catch (error) {
    return true
  }
}

async function test_name_empty() {
  try {
    const response = await axios.get("http://localhost:3000/users", {
      headers: {
        authorization: "123456",
        cliente_id: "7407440e-180c-4e1f-ac22-eaba916b3c9d"
      }
    });
    return response.data.usuarios.length > 1
  } catch (error) {
    return false
  }
}

async function test_name_sent() {
  try {
    const response = await axios.get("http://localhost:3000/users?name=rodrigo", {
      headers: {
        authorization: "123456",
        cliente_id: "7407440e-180c-4e1f-ac22-eaba916b3c9d"
      }
    })
    return response.data.usuarios.length >= 1
  } catch (error) {
    return false
  }
}

async function test_update_email() {

  const baseURL = "http://localhost:3000";

  const headers = {
    authorization: "123456",
    cliente_id: "7407440e-180c-4e1f-ac22-eaba916b3c9d"
  };

  const usuario_id = "4f4512f6-c9c3-461d-9e89-22ef8eae69d4";
  const originalEmail = "rodrigo.groff@gmail.com";
  const newEmail = "rodrigo.groff@hotmail.com";

  const updateEmail = async (email) => {
    return axios.put(`${baseURL}/users_updateEmail`, { usuario_id, email }, { headers });
  };

  try {
  
    await updateEmail(newEmail);

    const response_get = await axios.get(`${baseURL}/users`, { headers });
    const usuario = response_get.data.usuarios.find(u => u.id === usuario_id);

    if (usuario && usuario.email === newEmail) {
      await updateEmail(originalEmail);
      return true;
    }

    return false

  } catch (error) {
    return false
  }
}

export async function test_users() {
  if (!await test_name_unauthorized()) { console.log('testtest_name_unauthorized_all FAILED'); return; }
  if (!await test_name_unauthorized_invalid_cliente_id()) { console.log('test_name_unauthorized_invalid_cliente_id FAILED'); return; }
  if (!await test_name_empty()) { console.log('test_name_empty FAILED'); return; }
  if (!await test_name_sent()) { console.log('test_name_sent FAILED'); return; }
  if (!await test_update_email()) { console.log('test_update_email FAILED'); return; }

  console.log('test_users() ==> PASSED')
}
