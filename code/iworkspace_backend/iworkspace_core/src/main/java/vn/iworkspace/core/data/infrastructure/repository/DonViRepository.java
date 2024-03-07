package vn.iworkspace.core.data.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.DonVi;

@Repository
public interface DonViRepository extends JpaRepository<DonVi, Long> {
  Optional<DonVi> findByGuid(String guid);

  List<DonVi> findByDonViCha(DonVi donViCha);

  @Query("SELECT td FROM DonVi td WHERE " +
      "(:keyword IS NULL OR LOWER(td.tenDonVi) LIKE lower(concat('%', :keyword,'%')) " +
      "OR LOWER(td.moTa) LIKE lower(concat('%', :keyword,'%'))) " +
      "AND (:tenDonVi IS NULL OR LOWER(td.tenDonVi) LIKE lower(concat('%', :tenDonVi,'%'))) " +
      "AND (:thuTu IS NULL OR td.thuTu = :thuTu) " +
      "AND (:moTa IS NULL OR LOWER(td.moTa) LIKE lower(concat('%', :moTa,'%')))")
  Page<DonVi> filter(String keyword, String tenDonVi, Integer thuTu, String moTa, Pageable pageable);

}
