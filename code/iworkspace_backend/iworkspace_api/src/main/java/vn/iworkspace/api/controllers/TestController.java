package vn.iworkspace.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import vn.iworkspace.api.payload.response.MessageResponseDTO;
import vn.iworkspace.core.data.infrastructure.entity.QuyenEnum;

@CrossOrigin(origins = {"http://tthctest_vnu.rteam.vn", "http://localhost:8081"}, maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/test")
public class TestController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/nguoidung")
  @PreAuthorize("hasRole('NguoiDung') or hasRole('QuanTriDonVi') or hasRole('QuanTriHeThong')")
  @ResponseStatus(HttpStatus.OK)
  public MessageResponseDTO nguoiDungAccess() {
    return new MessageResponseDTO("nguoiDungAccess");
  }

  @GetMapping("/quantridonvi")
  @PreAuthorize("hasRole('QuanTriDonVi')")
  @ResponseStatus(HttpStatus.OK)
  public MessageResponseDTO quanTriDonViAccess() {
    return new MessageResponseDTO("quanTriDonViAccess");
  }

  @GetMapping("/quantrihethong")
  @PreAuthorize("hasRole('QuanTriHeThong')")
  @ResponseStatus(HttpStatus.OK)
  public MessageResponseDTO quanTriHeThongAccess() {
    return new MessageResponseDTO("quanTriHeThongAccess");
  }
}
