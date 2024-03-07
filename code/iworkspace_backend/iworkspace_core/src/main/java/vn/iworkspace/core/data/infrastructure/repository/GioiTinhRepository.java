package vn.iworkspace.core.data.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.GioiTinh;

@Repository
public interface GioiTinhRepository extends JpaRepository<GioiTinh, Integer> {

}
