package com.example.calculator;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CalculatorController.class)
public class CalculatorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testSqrt() throws Exception {
        String json = "{\"operation\":\"sqrt\", \"x\":\"9\"}";
        mockMvc.perform(post("/api/calculate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(content().string("3.0"));
    }
    
    @Test
    void testFactorial() throws Exception {
        String json = "{\"operation\":\"factorial\", \"x\":\"5\"}";
        mockMvc.perform(post("/api/calculate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(content().string("120.0"));
    }

    @Test
    void testLog() throws Exception {
        String json = "{\"operation\":\"log\", \"x\":\"100\"}";
        mockMvc.perform(post("/api/calculate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(content().string("2.0"));
    }

    @Test
    void testPower() throws Exception {
        String json = "{\"operation\":\"power\", \"x\":\"2\", \"y\":\"3\"}";
        mockMvc.perform(post("/api/calculate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(content().string("8.0"));
    }
}