package vn.iworkspace.core.data.infrastructure.entity;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "refreshtoken")
@Data
public class RefreshToken extends AbstractEntity<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idnguoidung", referencedColumnName = "id")
    private NguoiDung nguoiDung;

    @Column(name = "token", nullable = false, unique = true)
    private String token;

    @Column(name = "expirydate", nullable = false)
    private Instant expiryDate;

    public RefreshToken() {
    }

}
