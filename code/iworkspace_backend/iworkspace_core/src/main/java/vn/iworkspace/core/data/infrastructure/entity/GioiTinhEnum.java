package vn.iworkspace.core.data.infrastructure.entity;

public enum GioiTinhEnum {
  Nam("Nam"),
  Nu("Nữ"),
  KhongXacDinh("Không Xác Định");

  private final String label;

  GioiTinhEnum(String label) {
    this.label = label;
  }

  public String getLabel() {
    return label;
  }

}