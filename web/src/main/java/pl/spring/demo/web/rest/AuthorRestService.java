package pl.spring.demo.web.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import pl.spring.demo.entity.AuthorEntity;
import pl.spring.demo.service.AuthorService;
import pl.spring.demo.service.BookService;
import pl.spring.demo.to.AuthorTo;
import pl.spring.demo.to.BookTo;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value="/authors")
public class AuthorRestService {

    @Autowired
    private AuthorService authorService;

    @RequestMapping(value = "/all-authors", method = RequestMethod.GET)
    public List<AuthorTo> findAllAuthors() {
        return authorService.findAllAuthors();
    }
}
