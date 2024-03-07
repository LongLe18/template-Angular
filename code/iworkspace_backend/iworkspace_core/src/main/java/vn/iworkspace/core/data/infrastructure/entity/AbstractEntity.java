package vn.iworkspace.core.data.infrastructure.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "Created", "Modified" }, allowGetters = true)
@Data
public abstract class AbstractEntity<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @CreatedDate
    @Column(name = "created", updatable = false)
    private Instant created = Instant.now();

    @LastModifiedDate
    @Column(name = "modified")
    private Instant modified = Instant.now();

    @Column(name = "guid")
    private String guid = UUID.randomUUID().toString();

}
