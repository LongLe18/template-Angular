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
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.service.DonViService;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.DonViRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class DonViServiceImpl implements DonViService {

    @Autowired
    private DonViRepository donViRepository;

    public List<DonVi> findAll() {
        return donViRepository.findAll();
    }

    public Optional<DonVi> findById(Long id) {
        return donViRepository.findById(id);
    }

    public Optional<DonVi> findByGuid(String guid) {
        return donViRepository.findByGuid(guid);
    }

    @Transactional
    public DonVi save(DonVi donVi) {
        return donViRepository.save(donVi);
    }

    @Transactional
    public void delete(DonVi donVi) {
        donViRepository.delete(donVi);
    }

    public Page<DonVi> filter(String keyword, String tenDonVi, Integer thuTu, String moTa, Pageable pageable) {
        return donViRepository.filter(keyword, tenDonVi, thuTu, moTa, pageable);
    }

    public List<DonVi> findByDonViCha(DonVi donViCha) {
        return donViRepository.findByDonViCha(donViCha);
    }

}
