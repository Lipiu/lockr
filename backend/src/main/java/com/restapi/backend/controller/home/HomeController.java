package com.restapi.backend.controller.home;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor 
public class HomeController {
    @GetMapping("/homepage")
    public String home(){
        return "Home page";
    }
}
