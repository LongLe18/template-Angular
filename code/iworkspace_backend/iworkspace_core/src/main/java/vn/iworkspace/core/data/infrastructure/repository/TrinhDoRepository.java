package vn.iworkspace.core.data.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.TrinhDo;
import vn.iworkspace.core.data.infrastructure.repository.custom.TrinhDoRepositoryCustom;

@Repository
public interface TrinhDoRepository extends JpaRepository<TrinhDo, Long>, TrinhDoRepositoryCustom {
  Optional<TrinhDo> findByGuid(String guid);

  @Query("SELECT td FROM TrinhDo td WHERE " +
      "(:keyword IS NULL OR LOWER(td.maTrinhDo) LIKE lower(concat('%', :keyword,'%')) " +
      "OR LOWER(td.tenTrinhDo) LIKE lower(concat('%', :keyword,'%')) " +
      "OR LOWER(td.moTa) LIKE lower(concat('%', :keyword,'%'))) " +
      "AND (:maTrinhDo IS NULL OR LOWER(td.maTrinhDo) LIKE lower(concat('%', :maTrinhDo,'%'))) " +
      "AND (:tenTrinhDo IS NULL OR LOWER(td.tenTrinhDo) LIKE lower(concat('%', :tenTrinhDo,'%'))) " +
      "AND (:moTa IS NULL OR LOWER(td.moTa) LIKE lower(concat('%', :moTa,'%')))")
  Page<TrinhDo> filter(String keyword, String maTrinhDo, String tenTrinhDo, String moTa, Pageable pageable);

}
