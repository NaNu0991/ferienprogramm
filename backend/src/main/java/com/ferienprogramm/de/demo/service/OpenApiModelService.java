package com.ferienprogramm.de.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;


@Service
public class OpenApiModelService {

    private final OpenAiChatModel chatModel;

    @Autowired
    public OpenApiModelService(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }


    public String getChatCompletion(String userInput) {
        ChatResponse response = chatModel.call(
                new Prompt(
                        "Antworte so, wie in einer Konversation üblich: " + userInput,
                        OpenAiChatOptions.builder()
                                .model("sonar")
                                .temperature(0.4)
                                .build()
                ));

        return response.getResults().stream()
                .map(choice -> {
                    String text = choice.getOutput().getText();
                    return text != null ? text.replaceAll("\\[\\d+\\]", "") : "";
                })
                .collect(Collectors.joining("\n"));
    }

}
