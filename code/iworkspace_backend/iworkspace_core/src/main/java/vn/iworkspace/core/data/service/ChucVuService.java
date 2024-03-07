package vn.iworkspace.core.data.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.ChucVuRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChucVuService {

    public List<ChucVu> findAll();

    public Optional<ChucVu> findById(Long id);

    public Optional<ChucVu> findByGuid(String guid);

    public ChucVu save(ChucVu chucVu);

    public void delete(ChucVu chucVu);

    public Page<ChucVu> filter(String keyword, String tenChucVu, Integer thuTu, String moTa, Pageable pageable);

}
