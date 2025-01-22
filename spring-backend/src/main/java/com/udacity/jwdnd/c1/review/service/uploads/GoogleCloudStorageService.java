package com.udacity.jwdnd.c1.review.service.uploads;

import com.google.cloud.storage.*;
import com.google.cloud.WriteChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.UUID;

@Service
public class GoogleCloudStorageService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleCloudStorageService.class);
    private static final String BUCKET_NAME = "recover-bucket39a4";
    private static final int BUFFER_SIZE = 1024 * 1024; // 1 MB buffer
    
    private final Storage storage;

    public GoogleCloudStorageService() {
        this.storage = StorageOptions.getDefaultInstance().getService();
        logStorageDetails();
    }

    private void logStorageDetails() {
        if (storage != null) {
            logger.debug("Credentials: {}", storage.getOptions().getCredentials());
        } else {
            logger.debug("Failed to initialize Storage instance.");
        }
    }

    public String uploadFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        String filename = generateUniqueFilename(file.getOriginalFilename());
        logger.debug("Starting file upload process for file: {}", filename);
        
        String contentType = determineContentType(file);
        BlobInfo blobInfo = createBlobInfo(filename, contentType);
        
        return uploadToBucket(file, blobInfo);
    }

    private String determineContentType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        logger.debug("File content type: {}", contentType);
        return contentType;
    }

    private BlobInfo createBlobInfo(String filename, String contentType) {
        BlobId blobId = BlobId.of(BUCKET_NAME, filename);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(contentType)
                .build();
        logger.debug("BlobInfo created with blobId: {}", blobId);
        return blobInfo;
    }

    private String uploadToBucket(MultipartFile file, BlobInfo blobInfo) throws IOException {
        try (WriteChannel writer = storage.writer(blobInfo);
             InputStream inputStream = file.getInputStream()) {
            
            byte[] buffer = new byte[BUFFER_SIZE];
            int bytesRead;
            long totalBytesRead = 0;
            
            logger.debug("Starting upload of file: {}", blobInfo.getName());

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                totalBytesRead += bytesRead;
                writer.write(ByteBuffer.wrap(buffer, 0, bytesRead));
                
                if (totalBytesRead % (BUFFER_SIZE * 10) == 0) {  // Log every 10MB
                    logger.debug("Written {} MB so far", totalBytesRead / (1024 * 1024));
                }
            }

            logger.debug("File upload completed successfully. Total size: {} MB", 
                    totalBytesRead / (1024 * 1024));
            
            return generateGcsUri(blobInfo.getName());
        } catch (Exception e) {
            logger.error("Error during file upload: {}", e.getMessage(), e);
            throw new IOException("Error uploading file", e);
        }
    }

    private String generateUniqueFilename(String originalFilename) {
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        return UUID.randomUUID() + extension;
    }

    private String generateGcsUri(String filename) {
        String fileUri = String.format("gs://%s/%s", BUCKET_NAME, filename);
        logger.debug("File uploaded to Google Cloud Storage with URI: {}", fileUri);
        return fileUri;
    }
}




