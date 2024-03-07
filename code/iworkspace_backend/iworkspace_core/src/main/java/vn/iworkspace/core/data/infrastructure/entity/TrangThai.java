package vn.iworkspace.core.data.infrastructure.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "trangthai")
public class TrangThai {

  @Id
  @Column(name = "id")
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(name = "name", length = 255)
  private TrangThaiEnum name;

  @Column(name = "mota", length = 255)
  private String moTa;

  public TrangThai() {

  }

  public TrangThai(TrangThaiEnum trangThaiEnum) {
    this.id = trangThaiEnum.ordinal();
    this.name = trangThaiEnum;
    this.moTa = trangThaiEnum.getLabel();
  }

}