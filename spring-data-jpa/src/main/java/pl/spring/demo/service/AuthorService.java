package pl.spring.demo.service;

import pl.spring.demo.to.AuthorTo;

import java.util.List;

public interface AuthorService {

    List<AuthorTo> findAllAuthors();

}
