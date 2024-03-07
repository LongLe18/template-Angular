package vn.iworkspace.api.payload.response.chucvu;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import vn.iworkspace.api.payload.request.chucvu.ChucVuRequestDTO;
import vn.iworkspace.core.data.infrastructure.entity.TrangThaiEnum;

@Data
public class ChucVuResponseDTO extends ChucVuRequestDTO {
  private String guid;

}
