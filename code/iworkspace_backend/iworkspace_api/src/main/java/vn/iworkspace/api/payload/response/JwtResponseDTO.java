package vn.iworkspace.api.payload.response;

import java.util.List;

public class JwtResponseDTO {
  private String token;
  private String type = "Bearer";
  private String refreshToken;
  private Long id;
  private String username;
  private String email;
  private List<String> roles;
  private Long expiresIn;

  public JwtResponseDTO(String accessToken, String refreshToken, Long expiresIn, Long id, String username, String email,
      List<String> roles) {
    this.token = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public String getRefreshToken() {
    return refreshToken;
  }

  public void setRefreshToken(String refreshToken) {
    this.refreshToken = refreshToken;
  }

  public Long getExpiresIn() {
    return expiresIn;
  }

  public void setExpiresIn(Long expiresIn) {
    this.expiresIn = expiresIn;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public List<String> getRoles() {
    return roles;
  }
}
