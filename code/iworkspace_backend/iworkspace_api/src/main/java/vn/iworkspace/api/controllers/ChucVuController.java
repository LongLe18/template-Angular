package vn.iworkspace.api.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.annotation.HttpConstraint;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import vn.iworkspace.api.payload.FilterResponseDTO;
import vn.iworkspace.api.payload.request.chucvu.ChucVuRequestDTO;
import vn.iworkspace.api.payload.response.MessageResponseDTO;
import vn.iworkspace.api.payload.response.chucvu.ChucVuResponseDTO;
import vn.iworkspace.core.common.SortUtil;
import vn.iworkspace.core.common.Constants.Pagination;
import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.QuyenEnum;
import vn.iworkspace.core.data.service.ChucVuService;
import vn.iworkspace.core.exception.impl.NotfoundException;

@CrossOrigin(origins = {"http://tthctest_vnu.rteam.vn", "http://localhost:8081"}, maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/chucvu")
public class ChucVuController {
  @Autowired
  ChucVuService chucVuService;

  @Autowired
  ModelMapper mapper;

  @GetMapping()
  @ResponseStatus(HttpStatus.OK)
  public FilterResponseDTO<ChucVuResponseDTO> filter(
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) String tenChucVu,
      @RequestParam(required = false) Integer thuTu,
      @RequestParam(required = false) String moTa,
      @RequestParam(defaultValue = "1") int pageIndex,
      @RequestParam(defaultValue = "10") int pageSize,
      @RequestParam(defaultValue = "created,desc") String[] sort) {

    List<Order> orders = SortUtil.buildOrders(sort);

    Pageable pagingSort = PageRequest.of(pageIndex - 1, pageSize, Sort.by(orders));// tính pageIndex từ 0
    Page<ChucVu> pageChucVu = chucVuService.filter(keyword, tenChucVu, thuTu, moTa, pagingSort);
    List<ChucVu> listChucVu = pageChucVu.getContent();
    List<ChucVuResponseDTO> listChucVuResponseDTO = listChucVu
        .stream()
        .map(chucVu -> mapper.map(chucVu, ChucVuResponseDTO.class))
        .collect(Collectors.toList());

    FilterResponseDTO<ChucVuResponseDTO> response = new FilterResponseDTO<ChucVuResponseDTO>(
        pageChucVu.getTotalElements() == 0 ? 0 : pageChucVu.getNumber() + 1,
        pageChucVu.getTotalElements(), pageChucVu.getTotalPages(), listChucVuResponseDTO);

    return response;
  }

  @GetMapping("/{guid}")
  @ResponseStatus(HttpStatus.OK)
  public ChucVuResponseDTO getChucVuByGuid(@PathVariable("guid") String guid) {
    Optional<ChucVu> chucVu = chucVuService.findByGuid(guid);

    if (chucVu.isPresent()) {
      ChucVu _chucVu = chucVu.get();
      return mapper.map(_chucVu, ChucVuResponseDTO.class);
    }
    throw new NotfoundException("item not found with guid " + guid, HttpStatus.NOT_FOUND.toString(),
        HttpStatus.NOT_FOUND.toString());

  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  @Transactional
  public ChucVuResponseDTO createChucVu(@Valid @RequestBody ChucVuRequestDTO chucVuCreateRequestDTO) {
    ChucVu chucVu = mapper.map(chucVuCreateRequestDTO, ChucVu.class);

    ChucVu _chucVu = chucVuService
        .save(new ChucVu(chucVu.getTenChucVu(), chucVu.getThuTu(), chucVu.getMoTa(), chucVu.getTrangThaiEnum()));

    return mapper.map(_chucVu, ChucVuResponseDTO.class);
  }

  @PutMapping("/{guid}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Transactional
  public void updateChucVu(@PathVariable("guid") String guid, @Valid @RequestBody ChucVu chucVu) {
    Optional<ChucVu> chucVuData = chucVuService.findByGuid(guid);

    if (chucVuData.isPresent()) {
      ChucVu _chucVu = chucVuData.get();
      _chucVu.setTenChucVu(chucVu.getTenChucVu());
      _chucVu.setThuTu(chucVu.getThuTu());
      _chucVu.setMoTa(chucVu.getMoTa());
      _chucVu.setTrangThaiEnum(chucVu.getTrangThaiEnum());
      return;
    }
    throw new NotfoundException("item not found with guid " + guid, HttpStatus.NOT_FOUND.toString(),
        HttpStatus.NOT_FOUND.toString());

  }

  @DeleteMapping("/{guid}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Transactional
  public void deleteChucVu(@PathVariable("guid") String guid) {
    Optional<ChucVu> chucVuData = chucVuService.findByGuid(guid);

    if (chucVuData.isPresent()) {
      ChucVu _chucVu = chucVuData.get();
      chucVuService.delete(_chucVu);
      return;
    }
    throw new NotfoundException("item not found with guid " + guid, HttpStatus.NOT_FOUND.toString(),
        HttpStatus.NOT_FOUND.toString());
  }

  @DeleteMapping()
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Transactional
  public void deleteChucVus(@RequestBody String[] guid) {
    for (String item : guid) {
      Optional<ChucVu> chucVuData = chucVuService.findByGuid(item);

      if (chucVuData.isPresent()) {
        ChucVu _chucVu = chucVuData.get();
        chucVuService.delete(_chucVu);
      }
    }
  }

}
