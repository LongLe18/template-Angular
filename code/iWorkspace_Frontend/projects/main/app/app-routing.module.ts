import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuardService } from 'projects/common-lib/src/public-api';

import { SideNavOuterToolbarComponent, UnauthenticatedContentComponent } from './layouts';

import { LoginComponent } from './auth/dangnhap/dangnhap.component';
import { ResetPasswordComponent } from './auth/khoiphucmatkhau/khoiphucmatkhau.component';
import { CreateAccountComponent } from './auth/dangky/dangky.component';
import { ChangePasswordComponent } from './auth/doimatkhau/doimatkhau.component';
import { ChucVuComponent, CapNhatChucVuComponent } from './quantrihethong/chucvu';
import { TrinhDoComponent, CapNhatTrinhDoComponent } from './quantrihethong/trinhdo';
import { LinhVucComponent, CapNhatLinhVucComponent } from './quantrihethong/linhvuc';
import { CapNhatMenuComponent, MenuComponent } from './quantrihethong/menu';
import { CapNhatToChucComponent, ToChucComponent } from './quantrihethong/tochuc';
import { CapNhatNhanSuComponent, NhanSuComponent } from './quantrihethong/nhansu';
import { CapNhatVaiTroComponent, VaiTroComponent } from './quantrihethong/vaitro';
import { CapNhatThuTucHCComponent, ThuTucHCComponent } from './quantrihethong/thutuc';
import { ProfileComponent } from './quantrihethong/profile/profile.component';
import { ThongBaoComponent } from './quantrihethong/thongbao/thongbao.component';
import { DonViDongToChucComponent, CapNhatDonViDongTCComponent } from './danhmucDKHNHT/donvidongtochuc';
import { CongNgheToChucComponent, CapNhatCongNgheTCComponent } from './danhmucDKHNHT/congnghetochuc';
import { DaiBieuNNComponent, CapNhatDaiBieuNNComponent } from './danhmucDKHNHT/daibieunuocngoai';
import { DiaDiemComponent, CapNhatDiaDiemComponent } from './danhmucDKHNHT/diadiem';
import { CapNhatTienTeComponent, TienTeComponent } from './danhmucDKHNHT/tiente';
import { BaoCaoNamComponent } from './dangkyHNHT/baocaonam/baocaonam.component';
import { BaoCaoCQTCComponent } from './dangkyHNHT/baocaoCQTC/baocaocqtc.component';
import { BaoCaoNKHComponent } from './dangkyHNHT/baocaoKH/baocaonkh.component';
import { DangKyThuTucHCDungChungComponent, ThemmoiDangKyTTHCDungChungComponent, CapNhatDangKyTTHCDungChungComponent } from './xulyTTHC/dangkyTTHC';
import { PheDuyetThuTucHCDungChungComponent, XuLyHoSoDungChungComponent } from './xulyTTHC/pheduyetTTHC';
// import { PheDuyetThuTucHCComponent } from './dangkyHNHT/pheduyetTTHC';
import { DangKyThuTucHCComponent, ThemmoiDangKyTTHCComponent, CapNhatDangKyTTHCComponent } from './dangkyHNHT/dangkyTTHC';
import { PheDuyetThuTucHCComponent, XuLyHoSoComponent } from './dangkyHNHT/pheduyetTTHC';

const routes: Routes = [
  {
    path: 'xacthuc',
    component: UnauthenticatedContentComponent,
    children: [
      {
        path: 'dangnhap',
        component: LoginComponent,
      },
      {
        path: 'khoiphuc-matkhau',
        component: ResetPasswordComponent,
      },
      {
        path: 'dangky',
        component: CreateAccountComponent,
      },
      {
        path: 'doimatkhau/:recoveryCode',
        component: ChangePasswordComponent,
      },
      {
        path: '**',
        redirectTo: 'dangnhap',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    component: SideNavOuterToolbarComponent,
    children: [
      {
        path: "chucvu",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: ChucVuComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatChucVuComponent,
            canActivate: [AuthGuardService],
          },
          {
            path: 'sua/:guid',
            component: CapNhatChucVuComponent,
            canActivate: [AuthGuardService],
          }
        ]
      },
      {
        path: "trinhdo",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: TrinhDoComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatTrinhDoComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatTrinhDoComponent,
          }
        ]
      },
      {
        path: "linhvuc",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: LinhVucComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatLinhVucComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatLinhVucComponent,
          }
        ]
      },
      {
        path: "menu",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: MenuComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatMenuComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatMenuComponent,
          }
        ]
      },
      {
        path: "tochuc",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: ToChucComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatToChucComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatToChucComponent,
          }
        ]
      },
      {
        path: "nhansu",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: NhanSuComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatNhanSuComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatNhanSuComponent,
          }
        ]
      },
      {
        path: "vaitro",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: VaiTroComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatVaiTroComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatVaiTroComponent,
          }
        ]
      },
      {
        path: "thutuchc",
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: ThuTucHCComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatThuTucHCComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatThuTucHCComponent,
          }
        ]
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "thongbao",
        component: ThongBaoComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'donvidongtc',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: DonViDongToChucComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatDonViDongTCComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatDonViDongTCComponent,
          }
        ]
      },
      {
        path: 'congnghetc',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: CongNgheToChucComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatCongNgheTCComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatCongNgheTCComponent,
          }
        ]
      },
      {
        path: 'daibieunuocngoai',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: DaiBieuNNComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatDaiBieuNNComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatDaiBieuNNComponent,
          },
        ]
      },
      {
        path: 'diadiemtochuc',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: DiaDiemComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatDiaDiemComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatDiaDiemComponent,
          },
        ]
      },
      {
        path: 'loaitiente',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: TienTeComponent,
          },
          {
            path: 'themmoi',
            component: CapNhatTienTeComponent,
          },
          {
            path: 'sua/:guid',
            component: CapNhatTienTeComponent,
          },
        ]
      },
      {
        path: 'baocaonam',
        component: BaoCaoNamComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'baocaocqtc',
        component: BaoCaoCQTCComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'baocaonhakhoahoc',
        component: BaoCaoNKHComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'dangkytthcdungchung',
        component: DangKyThuTucHCDungChungComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'dangkytthcdungchung',
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'themmoi',
            component: ThemmoiDangKyTTHCDungChungComponent,
            canActivate: [AuthGuardService],
          },
          {
            path: 'sua/:guid',
            component: CapNhatDangKyTTHCDungChungComponent,
            canActivate: [AuthGuardService],
          },
        ]
      },
      {
        path: 'pheduyetthcdungchung',
        component: PheDuyetThuTucHCDungChungComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'pheduyetthcdungchung',
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'xulyhoso/:guid',
            component: XuLyHoSoDungChungComponent,
            canActivate: [AuthGuardService],
          },
        ]
      },
      {
        path: 'dangkytthc',
        component: DangKyThuTucHCComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'dangkytthc',
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'themmoi',
            component: ThemmoiDangKyTTHCComponent,
            canActivate: [AuthGuardService],
          },
          {
            path: 'sua/:guid',
            component: CapNhatDangKyTTHCComponent,
            canActivate: [AuthGuardService],
          },
        ]
      },
      {
        path: 'pheduyetthc',
        component: PheDuyetThuTucHCComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'pheduyetthc',
        canActivate: [AuthGuardService],
        children: [
          {
            path: 'xulyhoso/:guid',
            component: XuLyHoSoComponent,
            canActivate: [AuthGuardService],
          },
        ]
      },
      {
        path: '**',
        redirectTo: 'tochuc',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
