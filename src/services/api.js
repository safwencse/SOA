// Base URL for your Tomcat REST service
const API_BASE_URL = 'http://localhost:8080/TP4/persons';

// CRUD API calls for Person entity
export const apiService = {
  // CREATE - POST request
  async createPerson(personData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const message = await response.text();
    return { success: true, message, data: personData };
  },

  // READ - GET all persons
  async getAllPersons() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },

  // READ - GET single person by ID
  async getPersonById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },

  // UPDATE - PUT request
  async updatePerson(id, personData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const message = await response.text();
    return { success: true, message, data: { id: parseInt(id), ...personData } };
  },

  // DELETE - DELETE request
  async deletePerson(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const message = await response.text();
    return { success: true, message, id };
  },
};

// Helper function to validate person data
export const validatePersonData = (personData) => {
  const errors = [];
  if (!personData.name || personData.name.trim() === '') errors.push('Name is required');
  if (personData.age === undefined || personData.age === '') {
    errors.push('Age is required');
  } else if (isNaN(parseInt(personData.age))) {
    errors.push('Age must be a number');
  } else if (parseInt(personData.age) < 0) {
    errors.push('Age must be a positive number');
  }
  return errors;
};
