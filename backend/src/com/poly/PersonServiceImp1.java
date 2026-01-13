package com.poly;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class PersonServiceImp1 implements PersonService {
    
    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    
    public PersonServiceImp1() {
        entityManagerFactory = Persistence.createEntityManagerFactory("persistence");
        entityManager = entityManagerFactory.createEntityManager();
    }
    
    @Override
    public List<Person> getAllPersons() {
        entityManager.getTransaction().begin();
        
        try {
            Query query = entityManager.createQuery("SELECT p FROM Person p");
            List<Person> persons = query.getResultList();
            
            entityManager.getTransaction().commit();
            
            if (persons.isEmpty()) {
                System.out.println("No persons found.");
            } else {
                for (Person person : persons) {
                    System.out.println(person);
                }
            }
            return persons;
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            e.printStackTrace();
            return null;
        }
    }
    
    @Override
    public Person getPerson(int id) {
        entityManager.getTransaction().begin();
        
        try {
            Person person = entityManager.find(Person.class, id);
            entityManager.getTransaction().commit();
            return person;
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            e.printStackTrace();
            return null;
        }
    }
    
    @Override
    public boolean addPerson(Person p) {
        entityManager.getTransaction().begin();
        
        try {
            entityManager.persist(p);
            entityManager.getTransaction().commit();
            System.out.println("Person successfully added to database");
            return true;
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            e.printStackTrace();
            System.out.println("Error adding person");
            return false;
        }
    }
    
    @Override
    public boolean updatePerson(Person p) {
        entityManager.getTransaction().begin();
        
        try {
            entityManager.merge(p);
            entityManager.getTransaction().commit();
            System.out.println("Person successfully updated");
            return true;
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            e.printStackTrace();
            System.out.println("Error updating person");
            return false;
        }
    }
    
    @Override
    public boolean deletePerson(int id) {
        entityManager.getTransaction().begin();
        
        try {
            Person person = entityManager.find(Person.class, id);
            if (person != null) {
                entityManager.remove(person);
                entityManager.getTransaction().commit();
                System.out.println("Person successfully deleted");
                return true;
            } else {
                entityManager.getTransaction().rollback();
                System.out.println("Person not found with ID: " + id);
                return false;
            }
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            e.printStackTrace();
            System.out.println("Error deleting person");
            return false;
        }
    }
    
    // Cleanup method
    public void close() {
        if (entityManager != null && entityManager.isOpen()) {
            entityManager.close();
        }
        if (entityManagerFactory != null && entityManagerFactory.isOpen()) {
            entityManagerFactory.close();
        }
    }
}