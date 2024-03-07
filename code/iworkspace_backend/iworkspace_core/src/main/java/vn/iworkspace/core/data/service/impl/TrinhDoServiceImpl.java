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

import vn.iworkspace.core.data.infrastructure.entity.TrinhDo;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.repository.RefreshTokenRepository;
import vn.iworkspace.core.data.service.TrinhDoService;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.data.infrastructure.repository.TrinhDoRepository;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class TrinhDoServiceImpl implements TrinhDoService {

    @Autowired
    private TrinhDoRepository trinhDoRepository;

    @Transactional
    public List<TrinhDo> findAll() {
        return trinhDoRepository.findAll();
    }

    public Optional<TrinhDo> findById(Long id) {
        return trinhDoRepository.findById(id);
    }

    public Optional<TrinhDo> findByGuid(String guid) {
        return trinhDoRepository.findByGuid(guid);
    }

    @Transactional
    public TrinhDo save(TrinhDo trinhDo) {
        return trinhDoRepository.save(trinhDo);
    }

    @Transactional
    public void delete(TrinhDo trinhDo) {
        trinhDoRepository.delete(trinhDo);
    }

    public Page<TrinhDo> filter(String keyword, String maTrinhDo, String tenTrinhDo, String moTa, Pageable pageable) {
        return trinhDoRepository.filter(keyword, maTrinhDo, tenTrinhDo, moTa, pageable);
    }

}
