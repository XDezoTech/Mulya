export async function loginApi(loginData) {
  const URL = 'http://localhost:8082/api/public/login';
  // console.log('Login data:', loginData);

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${errorText}`);
    }

    const data = await response.json(); // Parse the JSON response
    // console.log('Full login response:', data); // Log the full response for debugging

    // Map the backend response to the expected format
    return {
      token: data.token, // Map 'jwt' to 'token'
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      imageUrl: data.imageUrl,
      role: data.role,
    };
  } catch (error) {
    console.error('Login API error:', error.message || error);
    throw error; // Re-throw the error for the caller to handle
  }
}
export async function signupApi({
  email,
  password,
  firstName,
  lastName,
  profilePicture,
}) {
  const URL = '/api/public/register';
  console.log(email, password, firstName, lastName, profilePicture);

  const formData = new FormData();
  const user = { email, password, firstName, lastName };
  formData.append(
    'user',
    new Blob([JSON.stringify(user)], { type: 'application/json' }),
  );
  if (profilePicture) {
    formData.append('image', profilePicture); // image is a File object
  }

  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Signup failed: ${errorText}`);
    }

    const data = await response.json(); // Parse the JSON response
    console.log('Full signup response:', data); // Log the full response for debugging

    // Map the backend response to the expected format
    return {
      token: data.token, // Map 'token' from the backend response
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      imageUrl: data.imageUrl,
      role: data.role,
    };
  } catch (error) {
    console.error('Signup API error:', error.message || error);
    throw error; // Re-throw the error for the caller to handle
  }
}
export async function updateUserApi(userData, jwt) {
  const URL = 'http://localhost:8080/auth/update'; // Your API endpoint
  console.log(userData);

  try {
    const response = await fetch(URL, {
      method: 'PUT', // Make a POST request
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
      body: userData, // Convert your postData object to a JSON string
    });

    if (!response.ok) {
      throw new Error('Failed to signup the user ' + response.status);
    }

    const data = await response.json(); // Parse the JSON response from the server
    console.log('Signed up', data);
    return data;
  } catch (error) {
    // Closing the try block
    console.error('Error creating post:', error);
  }
}
