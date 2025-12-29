const API_BASE_URL = 'http://localhost:8080/TP4/persons';

export const apiService = {
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

  async getAllPersons() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },

  async getPersonById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  },

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

  async deletePerson(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const message = await response.text();
    return { success: true, message, id };
  },
};

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
