package vn.iworkspace.core.data.infrastructure.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "gioitinh")
public class GioiTinh {

  @Id
  @Column(name = "id")
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(name = "name", length = 255)
  private GioiTinhEnum name;

  @Column(name = "mota", length = 255)
  private String moTa;

  public GioiTinh() {

  }

  public GioiTinh(GioiTinhEnum gioiTinhEnum) {
    this.id = gioiTinhEnum.ordinal();
    this.name = gioiTinhEnum;
    this.moTa = gioiTinhEnum.getLabel();
  }

}