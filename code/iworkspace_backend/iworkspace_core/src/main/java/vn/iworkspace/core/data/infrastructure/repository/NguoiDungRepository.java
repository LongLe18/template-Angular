package vn.iworkspace.core.data.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.DonVi;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Long> {

  Optional<NguoiDung> findByGuid(String guid);

  Optional<NguoiDung> findByTenDangNhap(String tenDangNhap);

  Boolean existsByTenDangNhap(String tenDangNhap);

  Boolean existsByEmail(String email);

  @Query("SELECT td FROM NguoiDung td WHERE " +
      "(:keyword IS NULL OR LOWER(td.hoVaTen) LIKE lower(concat('%', :keyword,'%')) " +
      "OR LOWER(td.donVi.tenDonVi) LIKE lower(concat('%', :keyword,'%')) " +
      "OR LOWER(td.chucDanh) LIKE lower(concat('%', :keyword,'%'))) " +
      "AND (:hoVaTen IS NULL OR LOWER(td.hoVaTen) LIKE lower(concat('%', :hoVaTen,'%'))) " +
      "AND (:tenDonVi IS NULL OR LOWER(td.donVi.tenDonVi) LIKE lower(concat('%', :tenDonVi,'%'))) " +
      "AND (:chucDanh IS NULL OR LOWER(td.chucDanh) LIKE lower(concat('%', :chucDanh,'%')))")
  Page<NguoiDung> filter(String keyword, String hoVaTen, String tenDonVi, String chucDanh, Pageable pageable);

}
