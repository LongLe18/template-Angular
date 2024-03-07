package vn.iworkspace.core.common;

import org.springframework.data.domain.Sort;

import vn.iworkspace.core.data.infrastructure.entity.QuyenEnum;

public class Constants {
    private Constants() {

    }

    public static final class Authority {
        private Authority() {
        }

        public static final String NguoiDung = QuyenEnum.NguoiDung.name();
        public static final String QuanTriDonVi = QuyenEnum.QuanTriDonVi.name();
        public static final String QuanTriHeThong = QuyenEnum.QuanTriHeThong.name();

    }

    public static final class Pagination {
        private Pagination() {

        }

        public static final Integer DEFAULT_PAGE = 0;
        public static final Integer DEFAULT_PAGE_SIZE = 20;
        public static final Sort.Direction DEFAULT_SORT_DIRECTION = Sort.Direction.DESC;
    }
}
