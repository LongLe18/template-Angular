package vn.iworkspace.core.data.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;


public interface RefreshTokenService {
    public Long getRefreshTokenDurationMs();



    public Optional<RefreshToken> findByToken(String token);

    public RefreshToken createRefreshToken(Long userId);

    public RefreshToken extendExpireByToken(String strRefreshToken);

    public RefreshToken verifyExpiration(RefreshToken token);

    public int deleteByIdNguoiDung(Long idNguoiDung);
}
