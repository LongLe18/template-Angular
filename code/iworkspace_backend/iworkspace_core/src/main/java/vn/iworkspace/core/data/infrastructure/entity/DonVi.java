package vn.iworkspace.core.data.infrastructure.entity;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "donvi")
public class DonVi extends AbstractEntity<Long> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "iddonvicha", referencedColumnName = "id", nullable = true)
    private DonVi donViCha;

    @Column(name = "tendonvi", nullable = false)
    private String tenDonVi;

    @Column(name = "thutu", nullable = false)
    private Integer thuTu;

    @Column(name = "mota", nullable = true)
    private String moTa;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "idtrangthai")
    private TrangThaiEnum trangThaiEnum;

    public DonVi() {
    }

    public DonVi(DonVi donViCha, String tenDonVi, Integer thuTu, String moTa, TrangThaiEnum trangThaiEnum) {
        this.donViCha = donViCha;
        this.tenDonVi = tenDonVi;
        this.thuTu = thuTu;
        this.moTa = moTa;
        this.trangThaiEnum = trangThaiEnum;
    }

}
