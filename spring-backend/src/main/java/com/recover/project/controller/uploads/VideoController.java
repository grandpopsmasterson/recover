package com.recover.project.controller.uploads;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.recover.project.service.uploads.GoogleCloudStorageService;

@RestController
public class VideoController {

    @Autowired
    private GoogleCloudStorageService googleCloudStorageService;

    @PostMapping("/upload-video")
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            String videoUri = googleCloudStorageService.uploadFile(file);
            return ResponseEntity.ok("Video uploaded successfully! File URI: " + videoUri);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading video: " + e.getMessage());
        }
    }
}


