package vn.iworkspace.core.data.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByGuid(String guid);

    Optional<RefreshToken> findByToken(String token);

    @Modifying
    int deleteByNguoiDung(NguoiDung nguoiDung);

    // @Modifying
    // int deleteByIdNguoiDung(Long idNguoiDung);
}
