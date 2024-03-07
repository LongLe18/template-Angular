package vn.iworkspace.core.security.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.core.data.service.NguoiDungService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  NguoiDungService nguoiDungService;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String tenDangNhap) throws UsernameNotFoundException {
    NguoiDung user = nguoiDungService.findByTenDangNhap(tenDangNhap)
        .orElseThrow(() -> new UsernameNotFoundException("NguoiDung Not Found with tenDangNhap: " + tenDangNhap));

    return UserDetailsImpl.build(user);
  }

}
