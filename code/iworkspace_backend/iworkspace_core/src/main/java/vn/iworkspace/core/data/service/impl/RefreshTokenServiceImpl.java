package vn.iworkspace.core.data.service.impl;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.service.RefreshTokenService;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {
    @Value("${iworkspace.app.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    public Long getRefreshTokenDurationMs() {
        return refreshTokenDurationMs;
    }

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setNguoiDung(nguoiDungRepository.findById(userId).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken extendExpireByToken(String strRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(strRefreshToken).get();
        if (refreshToken.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refreshToken);
            throw new TokenRefreshException(refreshToken.getToken(),
                    "Refresh token was expired. Please make a new signin request");
        }
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(),
                    "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    @Transactional
    public int deleteByIdNguoiDung(Long idNguoiDung) {
        return refreshTokenRepository.deleteByNguoiDung(nguoiDungRepository.findById(idNguoiDung).get());
    }
}
