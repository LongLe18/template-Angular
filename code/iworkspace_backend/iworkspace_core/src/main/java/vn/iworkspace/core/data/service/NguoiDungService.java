package vn.iworkspace.core.data.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.iworkspace.core.data.infrastructure.entity.DonVi;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NguoiDungService {

    public List<NguoiDung> findAll();

    public Optional<NguoiDung> findById(Long id);

    public Optional<NguoiDung> findByGuid(String guid);

    public NguoiDung save(NguoiDung nguoiDung);

    public void delete(NguoiDung nguoiDung);

    public Page<NguoiDung> filter(String keyword, String hoVaTen, String tenDonVi, String chucDanh, Pageable pageable);

    Optional<NguoiDung> findByTenDangNhap(String tenDangNhap);

    Boolean existsByTenDangNhap(String tenDangNhap);

    Boolean existsByEmail(String email);

}
