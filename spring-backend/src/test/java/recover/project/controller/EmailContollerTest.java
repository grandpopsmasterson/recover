package com.recover.project;

import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.recover.project.controller.email.EmailController;
import com.recover.project.service.email.EmailService;

@WebMvcTest(EmailController.class)
class EmailMockTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmailService emailService;
    
    @Test
    void testCall() throws Exception {
        when(emailService.testCall()).thenReturn("Test successful");
        this.mockMvc
            .perform(get("/api/v1/emails/test"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string(contains("Test successful"))
        );
    }
}