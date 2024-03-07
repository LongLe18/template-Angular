package vn.iworkspace.core.data.infrastructure.entity;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "trinhdo")
public class TrinhDo extends AbstractEntity<Long> {

    @Column(name = "matrinhdo", nullable = false, unique = true)
    private String maTrinhDo;

    @Column(name = "tentrinhdo", nullable = false)
    private String tenTrinhDo;

    @Column(name = "mota", nullable = true)
    private String moTa;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "idtrangthai")
    private TrangThaiEnum trangThaiEnum;

    public TrinhDo() {
    }

    public TrinhDo(String maTrinhDo, String tenTrinhDo, String moTa, TrangThaiEnum trangThaiEnum) {
        this.maTrinhDo = maTrinhDo;
        this.tenTrinhDo = tenTrinhDo;
        this.moTa = moTa;
        this.trangThaiEnum = trangThaiEnum;
    }

}
