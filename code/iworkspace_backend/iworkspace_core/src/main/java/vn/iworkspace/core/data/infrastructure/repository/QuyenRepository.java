package vn.iworkspace.core.data.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.QuyenEnum;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.infrastructure.entity.Quyen;

@Repository
public interface QuyenRepository extends JpaRepository<Quyen, Integer> {

}
