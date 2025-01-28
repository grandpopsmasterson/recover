package com.udacity.jwdnd.c1.review.service.api;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import com.udacity.jwdnd.c1.review.model.Project;
import com.udacity.jwdnd.c1.review.model.Room;

@Service
public class MatterportService {
     private final RestTemplate restTemplate;

    public MatterportService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Project getProjectById(Long id) {
        String url = "https://api.matterport.com/api/models/graph" + id;
        try {
            return restTemplate.getForObject(url, Project.class);
        } catch (HttpClientErrorException e) {
            System.err.println("Client error: " + e.getStatusCode());
            return null;
        } catch (ResourceAccessException e) {
            System.err.println("Network error: " + e.getMessage());
            return null;
        }
    }

    public List<Room> getAllRooms() {
        String url = "https://api.example.com/rooms";
        ResponseEntity<List<Room>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<>() {}
        );
        return response.getBody();
    }
}
