package vn.iworkspace.core.data.service.impl;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.iworkspace.core.data.infrastructure.entity.DonVi;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.service.NguoiDungService;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class NguoiDungServiceImpl implements NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Transactional
    public List<NguoiDung> findAll() {
        return nguoiDungRepository.findAll();
    }

    public Optional<NguoiDung> findById(Long id) {
        return nguoiDungRepository.findById(id);
    }

    public Optional<NguoiDung> findByGuid(String guid) {
        return nguoiDungRepository.findByGuid(guid);
    }

    @Transactional
    public NguoiDung save(NguoiDung nguoiDung) {
        return nguoiDungRepository.save(nguoiDung);
    }

    @Transactional
    public void delete(NguoiDung nguoiDung) {
        nguoiDungRepository.delete(nguoiDung);
    }

    public Page<NguoiDung> filter(String keyword, String hoVaTen, String tenDonVi, String chucDanh, Pageable pageable) {
        return nguoiDungRepository.filter(keyword, hoVaTen, tenDonVi, chucDanh, pageable);
    }

    public Optional<NguoiDung> findByTenDangNhap(String tenDangNhap) {
        return nguoiDungRepository.findByTenDangNhap(tenDangNhap);
    }

    public Boolean existsByTenDangNhap(String tenDangNhap) {
        return nguoiDungRepository.existsByTenDangNhap(tenDangNhap);
    }

    public Boolean existsByEmail(String email) {
        return nguoiDungRepository.existsByEmail(email);
    }

}
