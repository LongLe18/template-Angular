package vn.iworkspace.core.data.service;

import java.util.Optional;

import java.util.List;

import vn.iworkspace.core.data.infrastructure.entity.TrinhDo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TrinhDoService {

    public List<TrinhDo> findAll();

    public Optional<TrinhDo> findById(Long id);

    public Optional<TrinhDo> findByGuid(String guid);

    public TrinhDo save(TrinhDo trinhDo);

    public void delete(TrinhDo trinhDo);

    public Page<TrinhDo> filter(String keyword, String maTrinhDo, String tenTrinhDo, String moTa, Pageable pageable);

}
