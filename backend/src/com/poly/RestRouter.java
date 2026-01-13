package com.poly;

import com.sun.jersey.spi.resource.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/persons")
@Singleton
public class RestRouter {
    
    private PersonService personService;
    
    public RestRouter() {
        personService = new PersonServiceImp1();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPersons() {
        try {
            List<Person> persons = personService.getAllPersons();
            return Response.ok(persons).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving persons: " + e.getMessage())
                    .build();
        }
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPerson(@PathParam("id") int id) {
        try {
            Person person = personService.getPerson(id);
            if (person != null) {
                return Response.ok(person).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Person not found with ID: " + id)
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving person: " + e.getMessage())
                    .build();
        }
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addPerson(Person person) {
        try {
            boolean success = personService.addPerson(person);
            if (success) {
                return Response.status(Response.Status.CREATED)
                        .entity("Person added successfully")
                        .build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Failed to add person")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error adding person: " + e.getMessage())
                    .build();
        }
    }
    
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePerson(@PathParam("id") int id, Person person) {
        try {
            person.setId(id); // Ensure the ID is set
            boolean success = personService.updatePerson(person);
            if (success) {
                return Response.ok("Person updated successfully").build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Failed to update person")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error updating person: " + e.getMessage())
                    .build();
        }
    }
    
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePerson(@PathParam("id") int id) {
        try {
            boolean success = personService.deletePerson(id);
            if (success) {
                return Response.ok("Person deleted successfully").build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Person not found with ID: " + id)
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error deleting person: " + e.getMessage())
                    .build();
        }
    }
}