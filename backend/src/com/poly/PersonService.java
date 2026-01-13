package com.poly;

import java.util.List;

public interface PersonService {
    List<Person> getAllPersons();
    Person getPerson(int id);
    boolean addPerson(Person p);
    boolean updatePerson(Person p);
    boolean deletePerson(int id);
}