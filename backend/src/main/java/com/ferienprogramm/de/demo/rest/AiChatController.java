package com.ferienprogramm.de.demo.rest;

import com.ferienprogramm.de.demo.service.OpenApiModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiChatController {

    @Autowired
    private OpenApiModelService openApiModelService;

    @GetMapping("/api/chat")
    String chatWithAi(@RequestParam("userInput") String userInput) {
        return openApiModelService.getChatCompletion(userInput);
    }

}
