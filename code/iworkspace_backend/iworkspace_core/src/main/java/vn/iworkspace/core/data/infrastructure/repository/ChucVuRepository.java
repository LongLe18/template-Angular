package vn.iworkspace.core.data.infrastructure.repository;

import java.util.Optional;

import org.hibernate.annotations.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.infrastructure.entity.ChucVu;

@Repository
public interface ChucVuRepository extends JpaRepository<ChucVu, Long> {
  Optional<ChucVu> findByGuid(String guid);

  // không dùng convention :keyword do hiện tại spring đang bị lỗi với first
  // request nhận tham số kiểm tra null
  @Query("SELECT td FROM ChucVu td WHERE " +
      "(:#{#keyword} IS NULL OR LOWER(td.tenChucVu) LIKE lower(concat('%', :#{#keyword},'%')) " +
      "OR LOWER(td.moTa) LIKE lower(concat('%', :#{#keyword},'%'))) " +
      "AND (:#{#tenChucVu} IS NULL OR LOWER(td.tenChucVu) LIKE lower(concat('%', :#{#tenChucVu},'%'))) " +
      "AND (:#{#thuTu} IS NULL OR td.thuTu = :#{#thuTu}) " +
      "AND (:#{#moTa} IS NULL OR LOWER(td.moTa) LIKE lower(concat('%', :#{#moTa},'%')))")
  Page<ChucVu> filter(String keyword, String tenChucVu, Integer thuTu, String moTa,
      Pageable pageable);

}
