package vn.iworkspace.api.controllers;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import vn.iworkspace.core.data.infrastructure.entity.QuyenEnum;
import vn.iworkspace.core.data.infrastructure.entity.RefreshToken;
import vn.iworkspace.core.data.infrastructure.entity.Quyen;
import vn.iworkspace.core.data.infrastructure.entity.NguoiDung;
import vn.iworkspace.api.payload.request.SigninRequestDTO;
import vn.iworkspace.api.payload.request.RefreshTokenRequestDTO;
import vn.iworkspace.api.payload.request.SignupRequestDTO;
import vn.iworkspace.api.payload.response.JwtResponseDTO;
import vn.iworkspace.api.payload.response.MessageResponseDTO;
import vn.iworkspace.core.data.infrastructure.repository.QuyenRepository;
import vn.iworkspace.core.data.infrastructure.repository.NguoiDungRepository;
import vn.iworkspace.core.security.jwt.JwtUtils;
import vn.iworkspace.core.data.service.RefreshTokenService;
import vn.iworkspace.core.exception.impl.ServiceUnavailableException;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import vn.iworkspace.core.security.impl.UserDetailsImpl;
import vn.iworkspace.core.security.impl.UserDetailsServiceImpl;

@CrossOrigin(origins = {"http://tthctest_vnu.rteam.vn", "http://localhost:8081"}, maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  NguoiDungRepository nguoiDungRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  RefreshTokenService refreshTokenService;

  @PostMapping("/signin")
  @ResponseStatus(HttpStatus.OK)
  public JwtResponseDTO authenticateUser(@Valid @RequestBody SigninRequestDTO loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
        .collect(Collectors.toList());

    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

    return new JwtResponseDTO(jwt, refreshToken.getToken(), refreshTokenService.getRefreshTokenDurationMs(),
        userDetails.getId(), userDetails.getUsername(),
        userDetails.getEmail(), roles);
  }

  @PostMapping("/signup")
  @ResponseStatus(HttpStatus.CREATED)
  public MessageResponseDTO registerUser(@Valid @RequestBody SignupRequestDTO signUpRequest) {
    throw new ServiceUnavailableException(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()),
        String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()), "Hàm này đã tạm dừng");
    // if (nguoiDungRepository.existsByTenDangNhap(signUpRequest.getUsername())) {
    // return new MessageResponseDTO("Error: Username is already taken!");
    // }

    // if (nguoiDungRepository.existsByEmail(signUpRequest.getEmail())) {
    // return new MessageResponseDTO("Error: Email is already in use!");
    // }

    // Create new user's account
    // NguoiDung user = new NguoiDung(signUpRequest.getUsername(),
    // signUpRequest.getEmail(),
    // encoder.encode(signUpRequest.getPassword()));

    // Set<String> strRoles = signUpRequest.getRole();
    // Set<ERole> roles = new HashSet<>();

    // if (strRoles == null) {
    // Role userRole = roleRepository.findByName(ERole.ROLE_USER)
    // .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    // roles.add(userRole.getName());
    // } else {
    // strRoles.forEach(role -> {
    // roles.add(ERole.valueOf(role));

    // switch (role) {
    // case "admin":
    // Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
    // .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    // roles.add(adminRole.getName());
    // break;
    // case "mod":
    // Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
    // .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    // roles.add(modRole.getName());
    // break;
    // default:
    // Role userRole = roleRepository.findByName(ERole.ROLE_USER)
    // .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    // roles.add(userRole.getName());
    // }
    // });
    // }

    // user.setRoles(Collections.singleton(ERole.ROLE_USER));

    // user.setRoles(signUpRequest.getRole());
    // userRepository.save(user);

    // return new MessageResponseDTO("User registered successfully!");
  }

  @PostMapping("/signout")
  @ResponseStatus(HttpStatus.OK)
  public MessageResponseDTO signout() {
    Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principle.toString() != "anonymousUser") {
      Long userId = ((UserDetailsImpl) principle).getId();
      refreshTokenService.deleteByIdNguoiDung(userId);
    }

    return new MessageResponseDTO("User logouted successfully!");
  }

  @PostMapping("/refreshtoken")
  @ResponseStatus(HttpStatus.CREATED)
  public JwtResponseDTO refreshtoken(@Valid @RequestBody RefreshTokenRequestDTO refreshTokenRequest) {
    String strRefreshToken = refreshTokenRequest.getRefreshToken();

    return refreshTokenService.findByToken(strRefreshToken)
        .map(refreshTokenService::verifyExpiration)
        .map(RefreshToken::getNguoiDung)
        .map(nguoiDung -> {

          String jwt = jwtUtils.generateJwtToken(nguoiDung.getTenDangNhap());
          RefreshToken refreshToken = refreshTokenService.extendExpireByToken(strRefreshToken);
          List<String> listStrQuyenEnum = nguoiDung.getQuyenEnums().stream().map(quyenEnum -> quyenEnum.toString())
              .collect(Collectors.toList());

          return new JwtResponseDTO(jwt, refreshToken.getToken(), refreshTokenService.getRefreshTokenDurationMs(),
              nguoiDung.getId(), nguoiDung.getTenDangNhap(),
              nguoiDung.getEmail(), listStrQuyenEnum);
        })
        .orElseThrow(() -> new TokenRefreshException(strRefreshToken,
            "Refresh token is not in database!"));

  }

}
