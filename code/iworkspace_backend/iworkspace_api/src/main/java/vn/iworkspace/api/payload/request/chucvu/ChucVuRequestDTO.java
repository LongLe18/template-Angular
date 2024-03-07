package vn.iworkspace.api.payload.request.chucvu;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import vn.iworkspace.core.data.infrastructure.entity.TrangThaiEnum;

@Data
public class ChucVuRequestDTO {

  @NotNull(message = "Không được để trống")
  @NotBlank(message = "Không được để trống")
  private String tenChucVu;

  @NotNull(message = "Không được để trống")
  private Integer thuTu;

  private String moTa;

  @NotNull(message = "Không được để trống")
  @Enumerated(EnumType.STRING)
  @JsonProperty("trangThai")
  private TrangThaiEnum trangThaiEnum;

}
