package pl.spring.demo.mapper;

import pl.spring.demo.entity.AuthorEntity;
import pl.spring.demo.to.AuthorTo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class AuthorMapper {

    public static AuthorTo map(AuthorEntity authorEntity){
        if(authorEntity != null){
            return new AuthorTo(authorEntity.getId(), authorEntity.getFirstName(), authorEntity.getLastName());
        }
        return null;
    }

    public static AuthorEntity map(AuthorTo authorTo){
        if(authorTo != null){
            return new AuthorEntity(authorTo.getId(),authorTo.getFirstName(),authorTo.getLastName());
        }
        return null;
    }

    public static List<AuthorTo> map2ToList(List<AuthorEntity> authorEntities){
        return authorEntities.stream().map(AuthorMapper::map).collect(Collectors.toList());
    }

    public static Set<AuthorTo> map2To(Set<AuthorEntity> authorEntitySet){
        Set<AuthorTo> authorToSet = new HashSet<>();
        for (AuthorEntity authorEntity: authorEntitySet) {
            authorToSet.add(map(authorEntity));
        }
        return authorToSet;
    }

    public static Set<AuthorEntity> map2Entity(Set<AuthorTo> authorToSet){
        Set<AuthorEntity> authorEntitySet = new HashSet<>();
        for (AuthorTo authorTo: authorToSet) {
            authorEntitySet.add(map(authorTo));
        }
        return authorEntitySet;
    }

    public static List<AuthorEntity> map2EntityList(List<AuthorTo> authorTos){
        return authorTos.stream().map(AuthorMapper::map).collect(Collectors.toList());
    }
}
