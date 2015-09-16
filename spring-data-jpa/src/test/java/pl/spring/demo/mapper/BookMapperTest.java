package pl.spring.demo.mapper;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;

import pl.spring.demo.mapper.BookMapper;
import pl.spring.demo.to.BookTo;
import pl.spring.demo.entity.BookEntity;

public class BookMapperTest {
    private BookMapper bookMapper = new BookMapper();


//    @Test
//    public void shouldProperlyConvertToBookEntity() {
//        // given
//        BookTo book = new BookTo(1L, "Romeo i Julia", "Wiliam Szekspir,Jan Kowalski");
//        // when
//        BookEntity bookEntity = bookMapper.map(book);
//        // then
//        assertNotNull(bookEntity);
//        assertEquals(1L, bookEntity.getId().longValue());
//        assertEquals("Romeo i Julia", bookEntity.getTitle());
//        assertEquals("Wiliam", bookEntity.getAuthors().get(0).getFirstName());
//        assertEquals("Szekspir", bookEntity.getAuthors().get(0).getLastName());
//        assertEquals("Jan", bookEntity.getAuthors().get(1).getFirstName());
//        assertEquals("Kowalski", bookEntity.getAuthors().get(1).getLastName());
//    }

}