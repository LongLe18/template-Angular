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
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.DonViRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DonViService {

    public List<DonVi> findAll();

    List<DonVi> findByDonViCha(DonVi donViCha);

    public Optional<DonVi> findById(Long id);

    public Optional<DonVi> findByGuid(String guid);

    public DonVi save(DonVi donVi);

    public void delete(DonVi donVi);

    public Page<DonVi> filter(String keyword, String tenDonVi, Integer thuTu, String moTa, Pageable pageable);

}
