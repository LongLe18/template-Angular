package vn.iworkspace.api.payload.request;

import java.util.Set;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Data;
import vn.iworkspace.core.data.infrastructure.entity.QuyenEnum;

@Data
public class SignupRequestDTO {
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @Enumerated(EnumType.STRING)
  private Set<QuyenEnum> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

}
