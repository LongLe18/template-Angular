package vn.iworkspace.api.payload;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import vn.iworkspace.core.data.infrastructure.entity.ChucVu;
import vn.iworkspace.core.data.infrastructure.entity.TrangThaiEnum;

@Data
public class FilterResponseDTO<T> {

    private int pageIndex;

    private long totalCount;

    private int totalPage;

    private List<T> data;

    public FilterResponseDTO() {
    }

    public FilterResponseDTO(int pageIndex, long totalItem, int totalPage, List<T> data) {
        this.pageIndex = pageIndex;
        this.totalCount = totalItem;
        this.totalPage = totalPage;
        this.data = data;
    }

}
