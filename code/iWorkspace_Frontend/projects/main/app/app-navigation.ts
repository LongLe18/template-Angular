import { CommonConst } from "projects/common-lib/src/public-api";

export const navigation = [
  {
    text: 'Quản trị hệ thống',
    value: 'system',
    icon: 'preferences',
    path: '',
    items: [
      {
        value: 'Quản lý cơ cấu tổ chức',
        text: 'Quản lý cơ cấu tổ chức',
        path: CommonConst.TOCHUC,
      },
      {
        value: 'Quản lý nhân sự',
        text: 'Quản lý nhân sự',
        path: CommonConst.NHANSU,
      },
      {
        value: 'Quản lý chức vụ',
        text: 'Quản lý chức vụ',
        path: CommonConst.CHUCVU,
      },
      {
        value: 'Danh mục trình độ',
        text: 'Danh mục trình độ',
        path: CommonConst.TRINHDO,
      },
      {
        value: 'menu',
        text: 'Quản lý menu chức năng',
        path: CommonConst.MENU,
      },
      {
        value: 'rolemanagement',
        text: 'Quản lý vai trò',
        path: CommonConst.VAITRO,
      },
      {
        value: 'field',
        text: 'Quản lý lĩnh vực',
        path: CommonConst.LINHVUC,
      },
      {
        value: 'procedure',
        text: 'Quản lý thủ tục hành chính',
        path: CommonConst.THUTUCHC
      }
    ],
  },
  {
    text: 'Quản trị danh mục ĐKHNHT',
    value: 'DKHTmanagement',
    icon: 'file',
    path: '',
    items: [
      {
        value: 'coorganization',
        text: 'Đơn vị đồng tổ chức',
        path: CommonConst.DONVITC,
      },
      {
        value: 'techonology',
        text: 'Công nghệ tổ chức',
        path: CommonConst.CONGNGHETC,
      },
      {
        value: 'foreignManagement',
        text: 'Quản lý đại biểu nước ngoài',
        path: CommonConst.DAIBIEUNN,
      },
      {
        value: 'place',
        text: 'Địa điểm',
        path: CommonConst.DIADIEM,
      },
      {
        value: 'currency',
        text: 'Loại tiền tệ',
        path: CommonConst.TIENTE,
      },
    ],
  },
  {
    text: 'Đăng ký HNHTQT',
    value: 'DKHT',
    icon: 'textdocument',
    path: '',
    items: [
      {
        value: 'registerTTHC',
        text: 'Đăng ký thủ tục hành chính',
        path: CommonConst.DANGKYTTHC,
      },
      {
        value: 'approveTTHC',
        text: 'Phê duyệt thủ tục hành chính',
        path: CommonConst.PHEDUYETTHC,
      },
      {
        value: 'yearreport',
        text: 'Báo cáo năm',
        path: CommonConst.BAOCAONAM,
      },
      {
        value: 'organizationReport',
        text: 'Báo cáo theo cơ quan tổ chức',
        path: CommonConst.BAOCAOCQTC,
      },
      {
        value: 'reportedScientist',
        text: 'Báo cáo theo nhà khoa học',
        path: CommonConst.BAOCAONKH,
      },
    ]
  },
  {
    text: 'Xử lý thủ tục hành chính',
    value: 'handleTTHC',
    icon: 'preferences',
    path: '',
    items: [
      {
        value: 'Đăng ký thủ tục hành chính',
        text: 'Đăng ký thủ tục hành chính',
        path: CommonConst.DANGKYTTHC_DUNGCHUNG,
      },
      {
        value: 'approveTTHC',
        text: 'Phê duyệt thủ tục hành chính',
        path: CommonConst.PHEDUYETTHC_DUNGCHUNG,
      },
    ]
  },
];
