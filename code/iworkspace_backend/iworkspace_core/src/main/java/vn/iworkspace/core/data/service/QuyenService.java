package vn.iworkspace.core.data.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.iworkspace.core.data.infrastructure.entity.Quyen;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.QuyenRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuyenService {

    public List<Quyen> findAll();

    public Optional<Quyen> findById(Integer id);

    public Quyen save(Quyen quyen);

    public void delete(Quyen quyen);

}
