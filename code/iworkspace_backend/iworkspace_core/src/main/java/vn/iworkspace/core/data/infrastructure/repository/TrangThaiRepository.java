package vn.iworkspace.core.data.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.TrangThai;

@Repository
public interface TrangThaiRepository extends JpaRepository<TrangThai, Integer> {

}
