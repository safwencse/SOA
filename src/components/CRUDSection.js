import React, { useState, useEffect } from 'react';
import { apiService, validatePersonData } from '../services/api';
import './CRUDSection.css';

const CRUDSection = () => {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllPersons();
      setPersons(data);
      setMessage('');
      setErrors([]);
    } catch (error) {
      setMessage('Error fetching persons. Using demo data instead.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || '' : value
    }));
    
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validatePersonData(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setMessage('Please fix the errors below');
      return;
    }
    
    const personData = {
      name: formData.name.trim(),
      age: parseInt(formData.age)
    };

    try {
      setLoading(true);
      setErrors([]);
      
      if (editingId) {
        const result = await apiService.updatePerson(editingId, personData);
        
        setPersons(persons.map(person => 
          person.id === editingId ? { ...person, ...personData } : person
        ));
        
        setMessage(result.message || 'Person updated successfully!');
        setEditingId(null);
      } else {
        const result = await apiService.createPerson(personData);
        
        
        const newPerson = {
          id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1,
          ...personData
        };
        
        setPersons([...persons, newPerson]);
        setMessage(result.message || 'Person created successfully!');
      }

      setFormData({
        name: '',
        age: ''
      });
    } catch (error) {
      setMessage('Error saving person. Please check if the server is running.');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (person) => {
    setFormData({
      name: person.name,
      age: person.age.toString()
    });
    setEditingId(person.id);
    setMessage('Editing person...');
    setErrors([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;

    try {
      setLoading(true);
      const result = await apiService.deletePerson(id);
      setPersons(persons.filter(person => person.id !== id));
      setMessage(result.message || 'Person deleted successfully!');
      setErrors([]);
    } catch (error) {
      setMessage('Error deleting person. Please check if the server is running.');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      age: ''
    });
    setEditingId(null);
    setMessage('');
    setErrors([]);
  };

  return (
    <section className="crud-section" id="crud">
      <div className="container">
        <h2 className="section-title">Person Management</h2>
        <p className="section-subtitle">
          CRUD operations for Person entities using a RESTful API
        </p>

        {/* Server Status 
        <div className="server-status">
          <span className="status-label">API Base URL:</span>
          <code className="api-url">http://localhost:8080/TP4/persons</code>
          <button 
            onClick={fetchPersons} 
            className="btn-test"
            title="Test connection"
          >
            Test Connection
          </button>
        </div>*/}

        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {/* Error Display */}
        {errors.length > 0 && (
          <div className="message error">
            <strong>Validation Errors:</strong>
            <ul className="error-list">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="crud-container">
          {/* Form Section */}
          <div className="form-section">
            <h3>{editingId ? `Edit Person (ID: ${editingId})` : 'Create New Person'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  Name *
                  <span className="required"> (required)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter person's name"
                  className={errors.some(e => e.includes('Name')) ? 'input-error' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">
                  Age *
                  <span className="required"> (required, number)</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter person's age"
                  min="0"
                  max="150"
                  className={errors.some(e => e.includes('Age')) ? 'input-error' : ''}
                />
              </div>

              <div className="form-help">
                <p><strong>API Endpoints:</strong></p>
                <ul>
                  <li>GET <code>/persons</code> - Get all persons</li>
                  <li>POST <code>/persons</code> - Create new person</li>
                  <li>PUT <code>/persons/{'{id}'}</code> - Update person</li>
                  <li>DELETE <code>/persons/{'{id}'}</code> - Delete person</li>
                </ul>
              </div>

              <div className="form-buttons">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : editingId ? 'Update Person' : 'Create Person'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Persons List Section */}
          <div className="list-section">
            <div className="list-header">
              <h3>Persons List ({persons.length})</h3>
              <div className="list-actions">
                <button 
                  onClick={fetchPersons} 
                  className="btn btn-refresh"
                  disabled={loading}
                  title="Refresh list from server"
                >
                  ↻ Refresh
                </button>
                {persons.length > 0 && (
                  <button 
                    onClick={() => {
                      setPersons([]);
                      setMessage('List cleared (local only)');
                    }}
                    className="btn btn-clear"
                    title="Clear local list"
                  >
                    Clear List
                  </button>
                )}
              </div>
            </div>

            {loading && !persons.length ? (
              <div className="loading">
                <div className="spinner"></div>
                Connecting to server...
              </div>
            ) : persons.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h4>No persons found</h4>
                <p>Create your first person or click Refresh to fetch from server.</p>
                <button onClick={fetchPersons} className="btn btn-primary">
                  Fetch from Server
                </button>
              </div>
            ) : (
              <div className="items-list">
                {persons.map(person => (
                  <div className="item-card" key={person.id}>
                    <div className="item-content">
                      <div className="item-header">
                        <h4 className="item-name">{person.name}</h4>
                        <span className="item-id">ID: {person.id}</span>
                      </div>
                      <div className="item-details">
                        <div className="detail-item">
                          <span className="detail-label">Age:</span>
                          <span className="detail-value">{person.age} years</span>
                        </div>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEdit(person)}
                        className="btn-edit"
                        title="Edit this person"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(person.id)}
                        className="btn-delete"
                        title="Delete this person"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* API Documentation */}
        <div className="api-docs">
          <h3>API Documentation</h3>
          <div className="endpoints">
            <div className="endpoint">
              <span className="method get">GET</span>
              <code>/persons</code>
              <span className="desc">Get all persons</span>
            </div>
            <div className="endpoint">
              <span className="method post">POST</span>
              <code>/persons</code>
              <span className="desc">Create new person</span>
            </div>
            <div className="endpoint">
              <span className="method put">PUT</span>
              <code>/persons/{'{id}'}</code>
              <span className="desc">Update person</span>
            </div>
            <div className="endpoint">
              <span className="method delete">DELETE</span>
              <code>/persons/{'{id}'}</code>
              <span className="desc">Delete person</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRUDSection;