package vn.iworkspace.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import vn.iworkspace.core.data.infrastructure.entity.Quyen;
import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.DonVi;
import vn.iworkspace.core.data.infrastructure.entity.GioiTinh;
import vn.iworkspace.core.data.infrastructure.entity.GioiTinhEnum;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.infrastructure.entity.QuyenEnum;
import vn.iworkspace.core.data.infrastructure.entity.TrangThai;
import vn.iworkspace.core.data.infrastructure.entity.TrangThaiEnum;
import vn.iworkspace.core.data.infrastructure.entity.TrinhDo;
import vn.iworkspace.core.data.infrastructure.repository.QuyenRepository;
import vn.iworkspace.core.data.infrastructure.repository.TrangThaiRepository;
import vn.iworkspace.core.data.service.ChucVuService;
import vn.iworkspace.core.data.service.DonViService;
import vn.iworkspace.core.data.service.NguoiDungService;
import vn.iworkspace.core.data.service.QuyenService;
import vn.iworkspace.core.data.service.TrinhDoService;
import vn.iworkspace.core.data.infrastructure.repository.GioiTinhRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;

import javax.annotation.PostConstruct;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class InitData {

    @Autowired
    private QuyenService quyenService;

    @Autowired
    private GioiTinhRepository gioiTinhRepository;

    @Autowired
    private TrangThaiRepository trangThaiRepository;

    @Autowired
    private ChucVuService chucVuService;

    @Autowired
    private TrinhDoService trinhDoService;

    @Autowired
    private DonViService donViService;

    @Autowired
    private NguoiDungService nguoiDungService;

    @Autowired
    PasswordEncoder encoder;

    @Bean
    public CommandLineRunner run() throws Exception {
        return args -> {

            addDanhMucEnum();

            List<ChucVu> chucVuList = chucVuService.findAll();

            if (chucVuList.isEmpty()) {

                int[] numbers = IntStream.range(1, 20).toArray();

                chucVuList = Arrays.stream(numbers)
                        .mapToObj(i -> new ChucVu("Chức vụ " + i, i, "", TrangThaiEnum.HoatDong))
                        .collect(Collectors.toList());

                chucVuList.stream().forEach(chucVu -> {
                    chucVuService.save(chucVu);
                });

            }

            List<TrinhDo> trinhDoList = trinhDoService.findAll();

            if (trinhDoList.isEmpty()) {

                int[] numbers = IntStream.range(1, 20).toArray();

                trinhDoList = Arrays.stream(numbers)
                        .mapToObj(i -> new TrinhDo("TD0" + i, "Trình độ " + i, "Trình độ " + i,
                                TrangThaiEnum.HoatDong))
                        .collect(Collectors.toList());

                trinhDoList.stream().forEach(trinhDo -> {
                    trinhDoService.save(trinhDo);
                });
            }

            List<DonVi> listDonVi = donViService.findByDonViCha(null);
            DonVi donViRoot = null;
            if (listDonVi.isEmpty()) {
                donViRoot = new DonVi(null, "VNU", 1, "VNU", TrangThaiEnum.HoatDong);
                donViService.save(donViRoot);
                int[] numbers = IntStream.range(1, 20).toArray();
                listDonVi = new ArrayList<DonVi>();
                for (int i : numbers) {
                    DonVi donVi = new DonVi(donViRoot, "Đơn vị con " + i, i, "Đơn vị con " + i,
                            TrangThaiEnum.HoatDong);
                    donViService.save(donVi);
                    listDonVi.add(donVi);
                }

            } else {
                donViRoot = listDonVi.get(0);
                listDonVi = donViService.findAll();
            }

            List<NguoiDung> listNguoiDung = nguoiDungService.findAll();
            if (listNguoiDung.isEmpty()) {
                Set<QuyenEnum> quyenSet = new HashSet<QuyenEnum>();
                quyenSet.add(QuyenEnum.QuanTriHeThong);
                NguoiDung nguoiDungAdmin = new NguoiDung("admin", encoder.encode("1"), donViRoot,
                        "admin", GioiTinhEnum.Nam,
                        "test@rteam.vn",
                        "0913435587",
                        Instant.now(),
                        "giáo sư",
                        chucVuList.get(0),
                        trinhDoList.get(0),
                        quyenSet,
                        TrangThaiEnum.HoatDong);
                nguoiDungService.save(nguoiDungAdmin);
                int[] numbers = IntStream.range(1, 20).toArray();
                listNguoiDung = new ArrayList<NguoiDung>();
                for (int i : numbers) {

                    NguoiDung nguoiDung = new NguoiDung("test" + i, encoder.encode("1"), donViRoot, "test"
                            + i, GioiTinhEnum.Nam,
                            "test" + i + "@rteam.vn",
                            "0913435587", Instant.now(), "giáo sư", chucVuList.get(0),
                            trinhDoList.get(0), quyenSet,
                            TrangThaiEnum.HoatDong);
                    nguoiDungService.save(nguoiDung);
                    listNguoiDung.add(nguoiDung);
                }

            }

        };

    }

    public void addDanhMucEnum() {
        List<Quyen> roles = quyenService.findAll();

        if (roles.isEmpty()) {
            quyenService.save(new Quyen(QuyenEnum.NguoiDung));
            quyenService.save(new Quyen(QuyenEnum.QuanTriDonVi));
            quyenService.save(new Quyen(QuyenEnum.QuanTriHeThong));
        }

        if (trangThaiRepository.findAll().isEmpty()) {
            trangThaiRepository.save(new TrangThai(TrangThaiEnum.DaXoa));
            trangThaiRepository.save(new TrangThai(TrangThaiEnum.KhongHoatDong));
            trangThaiRepository.save(new TrangThai(TrangThaiEnum.HoatDong));
        }

        if (gioiTinhRepository.findAll().isEmpty()) {
            gioiTinhRepository.save(new GioiTinh(GioiTinhEnum.Nam));
            gioiTinhRepository.save(new GioiTinh(GioiTinhEnum.Nu));
            gioiTinhRepository.save(new GioiTinh(GioiTinhEnum.KhongXacDinh));
        }

    }

}
