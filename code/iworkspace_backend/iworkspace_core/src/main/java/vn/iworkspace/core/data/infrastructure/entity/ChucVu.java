package vn.iworkspace.core.data.infrastructure.entity;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "chucvu")
public class ChucVu extends AbstractEntity<Long> {

    @Column(name = "tenchucvu", nullable = false)
    private String tenChucVu;

    @Column(name = "thutu", nullable = false)
    private Integer thuTu;

    @Column(name = "mota", nullable = true)
    private String moTa;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "idtrangthai")
    private TrangThaiEnum trangThaiEnum;

    public ChucVu() {
    }

    public ChucVu(String tenChucVu, Integer thuTu, String moTa, TrangThaiEnum trangThaiEnum) {
        this.tenChucVu = tenChucVu;
        this.thuTu = thuTu;
        this.moTa = moTa;
        this.trangThaiEnum = trangThaiEnum;
    }

}
