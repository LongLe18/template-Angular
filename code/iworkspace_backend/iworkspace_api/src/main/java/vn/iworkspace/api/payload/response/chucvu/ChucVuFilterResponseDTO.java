package vn.iworkspace.api.payload.response.chucvu;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.TrangThaiEnum;

@Data
public class ChucVuFilterResponseDTO<T> {

  private Integer pageIndex;

  private Integer totalItem;

  private Integer totalPage;

  private List<T> data;

}
