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

import vn.iworkspace.core.data.infrastructure.entity.Quyen;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.service.QuyenService;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.QuyenRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class QuyenServiceImpl implements QuyenService {

    @Autowired
    private QuyenRepository quyenRepository;

    @Transactional
    public List<Quyen> findAll() {
        return quyenRepository.findAll();
    }

    public Optional<Quyen> findById(Integer id) {
        return quyenRepository.findById(id);
    }

    @Transactional
    public Quyen save(Quyen quyen) {
        return quyenRepository.save(quyen);
    }

    @Transactional
    public void delete(Quyen quyen) {
        quyenRepository.delete(quyen);
    }

}
