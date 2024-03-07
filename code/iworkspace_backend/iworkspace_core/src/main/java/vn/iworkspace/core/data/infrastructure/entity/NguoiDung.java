package vn.iworkspace.core.data.infrastructure.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.Instant;

@Data
@Entity
@Table(name = "nguoidung", uniqueConstraints = {
// @UniqueConstraint(columnNames = "tendangnhap")
})
public class NguoiDung extends AbstractEntity<Long> {
  @NotBlank
  @Size(max = 255)
  @Column(name = "tendangnhap")
  private String tenDangNhap;

  @NotBlank
  @Size(max = 255)
  @Column(name = "matkhau")
  private String matKhau;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "iddonvi", referencedColumnName = "id")
  private DonVi donVi;

  @NotBlank
  @Size(max = 255)
  @Column(name = "hoten")
  private String hoVaTen;

  @Enumerated(EnumType.ORDINAL)
  @Column(name = "idgioitinh", length = 255)
  private GioiTinhEnum gioiTinh;

  @Size(max = 255)
  @Email
  @Column(name = "email")
  private String email;

  @Size(max = 255)
  @Column(name = "sodienthoai")
  private String soDienThoai;

  @Column(name = "ngaysinh")
  private Instant ngaySinh;

  @NotBlank
  @Size(max = 255)
  @Column(name = "chucdanh")
  private String chucDanh;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idchucvu", referencedColumnName = "id", nullable = false)
  private ChucVu chucVu;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idtrinhdo", referencedColumnName = "id", nullable = false)
  private TrinhDo trinhDo;

  @ElementCollection(targetClass = QuyenEnum.class)
  @CollectionTable(name = "nguoidung_quyen", joinColumns = @JoinColumn(name = "idnguoidung"))
  @Enumerated(EnumType.ORDINAL)
  @Column(name = "idquyen")
  private Set<QuyenEnum> quyenEnums = new HashSet<>();

  @NotNull
  @Enumerated(EnumType.ORDINAL)
  @Column(name = "idtrangthai")
  private TrangThaiEnum trangThaiEnum;

  // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch =
  // FetchType.LAZY)
  // private Set<RefreshToken> refreshTokens;

  public NguoiDung() {
  }

  public NguoiDung(String tenDangNhap, String matKhau, DonVi donVi, String hoVaTen, GioiTinhEnum gioiTinh, String email,
      String soDienThoai, Instant ngaySinh, String chucDanh, ChucVu chucVu, TrinhDo trinhDo, Set<QuyenEnum> quyenEnums,
      TrangThaiEnum trangThaiEnum) {
    this.tenDangNhap = tenDangNhap;
    this.matKhau = matKhau;
    this.donVi = donVi;
    this.hoVaTen = hoVaTen;
    this.gioiTinh = gioiTinh;
    this.email = email;
    this.soDienThoai = soDienThoai;
    this.ngaySinh = ngaySinh;
    this.chucDanh = chucDanh;
    this.chucVu = chucVu;
    this.trinhDo = trinhDo;
    this.quyenEnums = quyenEnums;
    this.trangThaiEnum = trangThaiEnum;
  }

}
