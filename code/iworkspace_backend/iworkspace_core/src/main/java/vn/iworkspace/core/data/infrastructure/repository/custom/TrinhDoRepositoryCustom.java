package vn.iworkspace.core.data.infrastructure.repository.custom;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.infrastructure.entity.TrinhDo;

public interface TrinhDoRepositoryCustom {
  List<NguoiDung> thongKeNguoiDung(TrinhDo trinhDo);

}
