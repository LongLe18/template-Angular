import { DATE_TIME_FORMAT } from "./dateFormat";

const ALLOW_PAGE_SIZE = [10, 20, 50];

enum PAGE_OPTIONS {
  DEFAULT_PAGE_INDEX = 0,
  DEFAULT_PAGE_SIZE = 10,
}

enum LOCAL_STORAGE_KEY {
  USER = "user",
  PAGE_SIZE = "page_size",
  ACCESS_TOKEN = "access_token",
  USERNAME = "username",
  MENUS = "menus",
  USER_ID = "userId",
  PAGE_PARAMS = "PAGE_PARAMS",
  PRICE_SPECIFIC = "PRICE_SPECIFIC",
  PRICE_SPECIFIC_KEY = "PRICE_SPECIFIC_KEY",
}

enum SESSION_STORAGE {
  USER_KEY = 'auth-user',
  TOKEN_HEADER_KEY = 'Authorization',
  ACCESS_TOKEN = "access_token",
}

enum TRANGTHAI {
  HOATDONG = 'HoatDong',
  DAXOA = 'DaXoa',
  KHONGHOATDONG = 'KhongHoatDong'
}

export {
  DATE_TIME_FORMAT,
  PAGE_OPTIONS,
  LOCAL_STORAGE_KEY,
  SESSION_STORAGE,
  ALLOW_PAGE_SIZE,
  TRANGTHAI,
};
