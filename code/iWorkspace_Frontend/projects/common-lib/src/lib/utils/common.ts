import { SESSION_STORAGE, TRANGTHAI } from "projects/common-lib/src/public-api";
import {jwtDecode} from "jwt-decode";
import notify from 'devextreme/ui/notify';

type PayLoadToken = {
  authorities: Array<string>;
  exp: number;
  iat: number;
  sub: string;
};


const getRoleAccount = (token?: any) => {
  const defaultValue = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE.USER_KEY)) || "";
  const decoded = jwtDecode<PayLoadToken>(token || defaultValue.data.accessToken);
  return decoded.authorities;
};

const getUsernameFromToken = (token: any) => {
  const decodedToken = jwtDecode<PayLoadToken>(token);
  return decodedToken.sub;
};

const renderSTT = (page: any, limit: any, index: any) => {
  return (Number(page) - 1) * Number(limit) + index + 1;
};

const objectWithoutProperties = (obj: any, keys: string[]) => {
  let target: any = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
};

const removeObjUndefined = (obj: any) => {
  if (obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === "" || obj[key] === null) {
        delete obj[key];
      }
    });
  }
  return obj;
};

const Notify = (message: string, typeNote: string, time: number) => {
  return notify({
    message: message,
    width: 200,
    position: { at: 'top center', my: 'top center' },
  }, typeNote, time);
}

const mappingTrangThai = (status: any) => {
  switch (status) {
    case true:
      return TRANGTHAI.HOATDONG;
    case false:
      return TRANGTHAI.KHONGHOATDONG;
    case 1:
      return TRANGTHAI.DAXOA;
  }
}

const mappingTrangThaiString = (status: any) => {
  switch (status) {
    case TRANGTHAI.HOATDONG:
      return 'Hoạt động';
    case TRANGTHAI.KHONGHOATDONG:
      return 'Không hoạt động';
    case TRANGTHAI.DAXOA:
      return 'Đã xóa';
  }
}

const reverseMappingTrangThai = (status: any) => {
  switch (status) {
    case TRANGTHAI.HOATDONG:
      return true;
    case TRANGTHAI.KHONGHOATDONG:
      return false;
    case TRANGTHAI.DAXOA:
      return 1;
    default: return true;
  }
}

export {
  renderSTT,
  objectWithoutProperties,
  removeObjUndefined,
  getRoleAccount,
  getUsernameFromToken,
  Notify,
  mappingTrangThai,
  reverseMappingTrangThai,
  mappingTrangThaiString
};
