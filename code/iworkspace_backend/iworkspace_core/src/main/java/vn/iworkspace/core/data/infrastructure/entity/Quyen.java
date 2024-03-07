package vn.iworkspace.core.data.infrastructure.entity;

import org.hibernate.validator.constraints.UUID;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "quyen")
public class Quyen {

  @Id
  @Column(name = "id")
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(name = "name", length = 255)
  private QuyenEnum name;

  @Column(name = "mota", length = 255)
  private String moTa;

  public Quyen() {

  }

  public Quyen(QuyenEnum quyenEnum) {
    this.id = quyenEnum.ordinal();
    this.name = quyenEnum;
    this.moTa = quyenEnum.getLabel();
  }

}