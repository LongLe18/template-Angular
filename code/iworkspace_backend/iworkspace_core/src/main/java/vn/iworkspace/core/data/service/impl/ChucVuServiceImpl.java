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

import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.entity.TrangThaiEnum;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.service.ChucVuService;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.ChucVuRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ChucVuServiceImpl implements ChucVuService {

    @Autowired
    private ChucVuRepository chucVuRepository;

    @Transactional
    public List<ChucVu> findAll() {
        return chucVuRepository.findAll();
    }

    public Optional<ChucVu> findById(Long id) {
        return chucVuRepository.findById(id);
    }

    public Optional<ChucVu> findByGuid(String guid) {
        return chucVuRepository.findByGuid(guid);
    }

    @Transactional
    public ChucVu save(ChucVu chucVu) {
        return chucVuRepository.save(chucVu);
    }

    @Transactional
    public void delete(ChucVu chucVu) {
        chucVu.setTrangThaiEnum(TrangThaiEnum.DaXoa);
        chucVuRepository.save(chucVu);
    }

    public Page<ChucVu> filter(String keyword, String tenChucVu, Integer thuTu, String moTa, Pageable pageable) {
        return chucVuRepository.filter(keyword, tenChucVu, thuTu, moTa, pageable);
    }

}
