import PropTypes from 'prop-types';
// material
import { Autocomplete, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

DistrictPicker.propTypes = {
  label: PropTypes.string.isRequired,
  defaultProvinceCode: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

DistrictPicker.defaultProps = {
  defaultProvinceCode: null,
  value: ''
};

export default function DistrictPicker({ touched, errors, label, defaultProvinceCode, value, onChange, ...other }) {
  const listDistricts = DISTRICTS.filter((district) => district.province_code === defaultProvinceCode);
  const [districts, setDistricts] = useState(listDistricts);

  useEffect(() => {
    const listDistrictsTemp = DISTRICTS.filter((district) => district.province_code === defaultProvinceCode);
    setDistricts(listDistrictsTemp);
  }, [defaultProvinceCode]);

  const handleOnChange = (option, value) => {
    const defaultValue = districts.find((district) => district?.name === value?.name);
    onChange(defaultValue);
  };

  return (
    <Autocomplete
      key={defaultProvinceCode}
      options={districts.map((district) => ({
        name: district.name
      }))}
      value={districts.find((district) => district.name === value)}
      onChange={(option, value) => handleOnChange(option, value)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="none"
          error={Boolean(touched.district && errors.district)}
          helperText={touched.district && errors.district}
        />
      )}
      {...other}
    />
  );
}

const DISTRICTS = [
  {
    name: 'Quận Ba Đình',
    code: 1,
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Hoàn Kiếm',
    code: 2,
    division_type: 'quận',
    codename: 'quan_hoan_kiem',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Tây Hồ',
    code: 3,
    division_type: 'quận',
    codename: 'quan_tay_ho',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Long Biên',
    code: 4,
    division_type: 'quận',
    codename: 'quan_long_bien',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Cầu Giấy',
    code: 5,
    division_type: 'quận',
    codename: 'quan_cau_giay',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Đống Đa',
    code: 6,
    division_type: 'quận',
    codename: 'quan_dong_da',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Hai Bà Trưng',
    code: 7,
    division_type: 'quận',
    codename: 'quan_hai_ba_trung',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Hoàng Mai',
    code: 8,
    division_type: 'quận',
    codename: 'quan_hoang_mai',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Thanh Xuân',
    code: 9,
    division_type: 'quận',
    codename: 'quan_thanh_xuan',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Sóc Sơn',
    code: 16,
    division_type: 'huyện',
    codename: 'huyen_soc_son',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Đông Anh',
    code: 17,
    division_type: 'huyện',
    codename: 'huyen_dong_anh',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Gia Lâm',
    code: 18,
    division_type: 'huyện',
    codename: 'huyen_gia_lam',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Nam Từ Liêm',
    code: 19,
    division_type: 'quận',
    codename: 'quan_nam_tu_liem',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Thanh Trì',
    code: 20,
    division_type: 'huyện',
    codename: 'huyen_thanh_tri',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Bắc Từ Liêm',
    code: 21,
    division_type: 'quận',
    codename: 'quan_bac_tu_liem',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Mê Linh',
    code: 250,
    division_type: 'huyện',
    codename: 'huyen_me_linh',
    province_code: 1,
    wards: []
  },
  {
    name: 'Quận Hà Đông',
    code: 268,
    division_type: 'quận',
    codename: 'quan_ha_dong',
    province_code: 1,
    wards: []
  },
  {
    name: 'Thị xã Sơn Tây',
    code: 269,
    division_type: 'thị xã',
    codename: 'thi_xa_son_tay',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Ba Vì',
    code: 271,
    division_type: 'huyện',
    codename: 'huyen_ba_vi',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Phúc Thọ',
    code: 272,
    division_type: 'huyện',
    codename: 'huyen_phuc_tho',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Đan Phượng',
    code: 273,
    division_type: 'huyện',
    codename: 'huyen_dan_phuong',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Hoài Đức',
    code: 274,
    division_type: 'huyện',
    codename: 'huyen_hoai_duc',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Quốc Oai',
    code: 275,
    division_type: 'huyện',
    codename: 'huyen_quoc_oai',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Thạch Thất',
    code: 276,
    division_type: 'huyện',
    codename: 'huyen_thach_that',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Chương Mỹ',
    code: 277,
    division_type: 'huyện',
    codename: 'huyen_chuong_my',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Thanh Oai',
    code: 278,
    division_type: 'huyện',
    codename: 'huyen_thanh_oai',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Thường Tín',
    code: 279,
    division_type: 'huyện',
    codename: 'huyen_thuong_tin',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Phú Xuyên',
    code: 280,
    division_type: 'huyện',
    codename: 'huyen_phu_xuyen',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Ứng Hòa',
    code: 281,
    division_type: 'huyện',
    codename: 'huyen_ung_hoa',
    province_code: 1,
    wards: []
  },
  {
    name: 'Huyện Mỹ Đức',
    code: 282,
    division_type: 'huyện',
    codename: 'huyen_my_duc',
    province_code: 1,
    wards: []
  },
  {
    name: 'Thành phố Hà Giang',
    code: 24,
    division_type: 'thành phố',
    codename: 'thanh_pho_ha_giang',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Đồng Văn',
    code: 26,
    division_type: 'huyện',
    codename: 'huyen_dong_van',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Mèo Vạc',
    code: 27,
    division_type: 'huyện',
    codename: 'huyen_meo_vac',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Yên Minh',
    code: 28,
    division_type: 'huyện',
    codename: 'huyen_yen_minh',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Quản Bạ',
    code: 29,
    division_type: 'huyện',
    codename: 'huyen_quan_ba',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Vị Xuyên',
    code: 30,
    division_type: 'huyện',
    codename: 'huyen_vi_xuyen',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Bắc Mê',
    code: 31,
    division_type: 'huyện',
    codename: 'huyen_bac_me',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Hoàng Su Phì',
    code: 32,
    division_type: 'huyện',
    codename: 'huyen_hoang_su_phi',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Xín Mần',
    code: 33,
    division_type: 'huyện',
    codename: 'huyen_xin_man',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Bắc Quang',
    code: 34,
    division_type: 'huyện',
    codename: 'huyen_bac_quang',
    province_code: 2,
    wards: []
  },
  {
    name: 'Huyện Quang Bình',
    code: 35,
    division_type: 'huyện',
    codename: 'huyen_quang_binh',
    province_code: 2,
    wards: []
  },
  {
    name: 'Thành phố Cao Bằng',
    code: 40,
    division_type: 'thành phố',
    codename: 'thanh_pho_cao_bang',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Bảo Lâm',
    code: 42,
    division_type: 'huyện',
    codename: 'huyen_bao_lam',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Bảo Lạc',
    code: 43,
    division_type: 'huyện',
    codename: 'huyen_bao_lac',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Hà Quảng',
    code: 45,
    division_type: 'huyện',
    codename: 'huyen_ha_quang',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Trùng Khánh',
    code: 47,
    division_type: 'huyện',
    codename: 'huyen_trung_khanh',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Hạ Lang',
    code: 48,
    division_type: 'huyện',
    codename: 'huyen_ha_lang',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Quảng Hòa',
    code: 49,
    division_type: 'huyện',
    codename: 'huyen_quang_hoa',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Hoà An',
    code: 51,
    division_type: 'huyện',
    codename: 'huyen_hoa_an',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Nguyên Bình',
    code: 52,
    division_type: 'huyện',
    codename: 'huyen_nguyen_binh',
    province_code: 4,
    wards: []
  },
  {
    name: 'Huyện Thạch An',
    code: 53,
    division_type: 'huyện',
    codename: 'huyen_thach_an',
    province_code: 4,
    wards: []
  },
  {
    name: 'Thành Phố Bắc Kạn',
    code: 58,
    division_type: 'thành phố',
    codename: 'thanh_pho_bac_kan',
    province_code: 6,
    wards: []
  },
  {
    name: 'Huyện Pác Nặm',
    code: 60,
    division_type: 'huyện',
    codename: 'huyen_pac_nam',
    province_code: 6,
    wards: []
  },
  {
    name: 'Huyện Ba Bể',
    code: 61,
    division_type: 'huyện',
    codename: 'huyen_ba_be',
    province_code: 6,
    wards: []
  },
  {
    name: 'Huyện Ngân Sơn',
    code: 62,
    division_type: 'huyện',
    codename: 'huyen_ngan_son',
    province_code: 6,
    wards: []
  },
  {
    name: 'Huyện Bạch Thông',
    code: 63,
    division_type: 'huyện',
    codename: 'huyen_bach_thong',
    province_code: 6,
    wards: []
  },
  {
    name: 'Huyện Chợ Đồn',
    code: 64,
    division_type: 'huyện',
    codename: 'huyen_cho_don',
    province_code: 6,
    wards: []
  },
  {
    name: 'Huyện Chợ Mới',
    code: 65,
    division_type: 'huyện',
    codename: 'huyen_cho_moi',
    province_code: 6,
    wards: []
  },
  {
    name: 'Huyện Na Rì',
    code: 66,
    division_type: 'huyện',
    codename: 'huyen_na_ri',
    province_code: 6,
    wards: []
  },
  {
    name: 'Thành phố Tuyên Quang',
    code: 70,
    division_type: 'thành phố',
    codename: 'thanh_pho_tuyen_quang',
    province_code: 8,
    wards: []
  },
  {
    name: 'Huyện Lâm Bình',
    code: 71,
    division_type: 'huyện',
    codename: 'huyen_lam_binh',
    province_code: 8,
    wards: []
  },
  {
    name: 'Huyện Na Hang',
    code: 72,
    division_type: 'huyện',
    codename: 'huyen_na_hang',
    province_code: 8,
    wards: []
  },
  {
    name: 'Huyện Chiêm Hóa',
    code: 73,
    division_type: 'huyện',
    codename: 'huyen_chiem_hoa',
    province_code: 8,
    wards: []
  },
  {
    name: 'Huyện Hàm Yên',
    code: 74,
    division_type: 'huyện',
    codename: 'huyen_ham_yen',
    province_code: 8,
    wards: []
  },
  {
    name: 'Huyện Yên Sơn',
    code: 75,
    division_type: 'huyện',
    codename: 'huyen_yen_son',
    province_code: 8,
    wards: []
  },
  {
    name: 'Huyện Sơn Dương',
    code: 76,
    division_type: 'huyện',
    codename: 'huyen_son_duong',
    province_code: 8,
    wards: []
  },
  {
    name: 'Thành phố Lào Cai',
    code: 80,
    division_type: 'thành phố',
    codename: 'thanh_pho_lao_cai',
    province_code: 10,
    wards: []
  },
  {
    name: 'Huyện Bát Xát',
    code: 82,
    division_type: 'huyện',
    codename: 'huyen_bat_xat',
    province_code: 10,
    wards: []
  },
  {
    name: 'Huyện Mường Khương',
    code: 83,
    division_type: 'huyện',
    codename: 'huyen_muong_khuong',
    province_code: 10,
    wards: []
  },
  {
    name: 'Huyện Si Ma Cai',
    code: 84,
    division_type: 'huyện',
    codename: 'huyen_si_ma_cai',
    province_code: 10,
    wards: []
  },
  {
    name: 'Huyện Bắc Hà',
    code: 85,
    division_type: 'huyện',
    codename: 'huyen_bac_ha',
    province_code: 10,
    wards: []
  },
  {
    name: 'Huyện Bảo Thắng',
    code: 86,
    division_type: 'huyện',
    codename: 'huyen_bao_thang',
    province_code: 10,
    wards: []
  },
  {
    name: 'Huyện Bảo Yên',
    code: 87,
    division_type: 'huyện',
    codename: 'huyen_bao_yen',
    province_code: 10,
    wards: []
  },
  {
    name: 'Thị xã Sa Pa',
    code: 88,
    division_type: 'thị xã',
    codename: 'thi_xa_sa_pa',
    province_code: 10,
    wards: []
  },
  {
    name: 'Huyện Văn Bàn',
    code: 89,
    division_type: 'huyện',
    codename: 'huyen_van_ban',
    province_code: 10,
    wards: []
  },
  {
    name: 'Thành phố Điện Biên Phủ',
    code: 94,
    division_type: 'thành phố',
    codename: 'thanh_pho_dien_bien_phu',
    province_code: 11,
    wards: []
  },
  {
    name: 'Thị xã Mường Lay',
    code: 95,
    division_type: 'thị xã',
    codename: 'thi_xa_muong_lay',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Mường Nhé',
    code: 96,
    division_type: 'huyện',
    codename: 'huyen_muong_nhe',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Mường Chà',
    code: 97,
    division_type: 'huyện',
    codename: 'huyen_muong_cha',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Tủa Chùa',
    code: 98,
    division_type: 'huyện',
    codename: 'huyen_tua_chua',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Tuần Giáo',
    code: 99,
    division_type: 'huyện',
    codename: 'huyen_tuan_giao',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Điện Biên',
    code: 100,
    division_type: 'huyện',
    codename: 'huyen_dien_bien',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Điện Biên Đông',
    code: 101,
    division_type: 'huyện',
    codename: 'huyen_dien_bien_dong',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Mường Ảng',
    code: 102,
    division_type: 'huyện',
    codename: 'huyen_muong_ang',
    province_code: 11,
    wards: []
  },
  {
    name: 'Huyện Nậm Pồ',
    code: 103,
    division_type: 'huyện',
    codename: 'huyen_nam_po',
    province_code: 11,
    wards: []
  },
  {
    name: 'Thành phố Lai Châu',
    code: 105,
    division_type: 'thành phố',
    codename: 'thanh_pho_lai_chau',
    province_code: 12,
    wards: []
  },
  {
    name: 'Huyện Tam Đường',
    code: 106,
    division_type: 'huyện',
    codename: 'huyen_tam_duong',
    province_code: 12,
    wards: []
  },
  {
    name: 'Huyện Mường Tè',
    code: 107,
    division_type: 'huyện',
    codename: 'huyen_muong_te',
    province_code: 12,
    wards: []
  },
  {
    name: 'Huyện Sìn Hồ',
    code: 108,
    division_type: 'huyện',
    codename: 'huyen_sin_ho',
    province_code: 12,
    wards: []
  },
  {
    name: 'Huyện Phong Thổ',
    code: 109,
    division_type: 'huyện',
    codename: 'huyen_phong_tho',
    province_code: 12,
    wards: []
  },
  {
    name: 'Huyện Than Uyên',
    code: 110,
    division_type: 'huyện',
    codename: 'huyen_than_uyen',
    province_code: 12,
    wards: []
  },
  {
    name: 'Huyện Tân Uyên',
    code: 111,
    division_type: 'huyện',
    codename: 'huyen_tan_uyen',
    province_code: 12,
    wards: []
  },
  {
    name: 'Huyện Nậm Nhùn',
    code: 112,
    division_type: 'huyện',
    codename: 'huyen_nam_nhun',
    province_code: 12,
    wards: []
  },
  {
    name: 'Thành phố Sơn La',
    code: 116,
    division_type: 'thành phố',
    codename: 'thanh_pho_son_la',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Quỳnh Nhai',
    code: 118,
    division_type: 'huyện',
    codename: 'huyen_quynh_nhai',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Thuận Châu',
    code: 119,
    division_type: 'huyện',
    codename: 'huyen_thuan_chau',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Mường La',
    code: 120,
    division_type: 'huyện',
    codename: 'huyen_muong_la',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Bắc Yên',
    code: 121,
    division_type: 'huyện',
    codename: 'huyen_bac_yen',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Phù Yên',
    code: 122,
    division_type: 'huyện',
    codename: 'huyen_phu_yen',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Mộc Châu',
    code: 123,
    division_type: 'huyện',
    codename: 'huyen_moc_chau',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Yên Châu',
    code: 124,
    division_type: 'huyện',
    codename: 'huyen_yen_chau',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Mai Sơn',
    code: 125,
    division_type: 'huyện',
    codename: 'huyen_mai_son',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Sông Mã',
    code: 126,
    division_type: 'huyện',
    codename: 'huyen_song_ma',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Sốp Cộp',
    code: 127,
    division_type: 'huyện',
    codename: 'huyen_sop_cop',
    province_code: 14,
    wards: []
  },
  {
    name: 'Huyện Vân Hồ',
    code: 128,
    division_type: 'huyện',
    codename: 'huyen_van_ho',
    province_code: 14,
    wards: []
  },
  {
    name: 'Thành phố Yên Bái',
    code: 132,
    division_type: 'thành phố',
    codename: 'thanh_pho_yen_bai',
    province_code: 15,
    wards: []
  },
  {
    name: 'Thị xã Nghĩa Lộ',
    code: 133,
    division_type: 'thị xã',
    codename: 'thi_xa_nghia_lo',
    province_code: 15,
    wards: []
  },
  {
    name: 'Huyện Lục Yên',
    code: 135,
    division_type: 'huyện',
    codename: 'huyen_luc_yen',
    province_code: 15,
    wards: []
  },
  {
    name: 'Huyện Văn Yên',
    code: 136,
    division_type: 'huyện',
    codename: 'huyen_van_yen',
    province_code: 15,
    wards: []
  },
  {
    name: 'Huyện Mù Căng Chải',
    code: 137,
    division_type: 'huyện',
    codename: 'huyen_mu_cang_chai',
    province_code: 15,
    wards: []
  },
  {
    name: 'Huyện Trấn Yên',
    code: 138,
    division_type: 'huyện',
    codename: 'huyen_tran_yen',
    province_code: 15,
    wards: []
  },
  {
    name: 'Huyện Trạm Tấu',
    code: 139,
    division_type: 'huyện',
    codename: 'huyen_tram_tau',
    province_code: 15,
    wards: []
  },
  {
    name: 'Huyện Văn Chấn',
    code: 140,
    division_type: 'huyện',
    codename: 'huyen_van_chan',
    province_code: 15,
    wards: []
  },
  {
    name: 'Huyện Yên Bình',
    code: 141,
    division_type: 'huyện',
    codename: 'huyen_yen_binh',
    province_code: 15,
    wards: []
  },
  {
    name: 'Thành phố Hòa Bình',
    code: 148,
    division_type: 'thành phố',
    codename: 'thanh_pho_hoa_binh',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Đà Bắc',
    code: 150,
    division_type: 'huyện',
    codename: 'huyen_da_bac',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Lương Sơn',
    code: 152,
    division_type: 'huyện',
    codename: 'huyen_luong_son',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Kim Bôi',
    code: 153,
    division_type: 'huyện',
    codename: 'huyen_kim_boi',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Cao Phong',
    code: 154,
    division_type: 'huyện',
    codename: 'huyen_cao_phong',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Tân Lạc',
    code: 155,
    division_type: 'huyện',
    codename: 'huyen_tan_lac',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Mai Châu',
    code: 156,
    division_type: 'huyện',
    codename: 'huyen_mai_chau',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Lạc Sơn',
    code: 157,
    division_type: 'huyện',
    codename: 'huyen_lac_son',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Yên Thủy',
    code: 158,
    division_type: 'huyện',
    codename: 'huyen_yen_thuy',
    province_code: 17,
    wards: []
  },
  {
    name: 'Huyện Lạc Thủy',
    code: 159,
    division_type: 'huyện',
    codename: 'huyen_lac_thuy',
    province_code: 17,
    wards: []
  },
  {
    name: 'Thành phố Thái Nguyên',
    code: 164,
    division_type: 'thành phố',
    codename: 'thanh_pho_thai_nguyen',
    province_code: 19,
    wards: []
  },
  {
    name: 'Thành phố Sông Công',
    code: 165,
    division_type: 'thành phố',
    codename: 'thanh_pho_song_cong',
    province_code: 19,
    wards: []
  },
  {
    name: 'Huyện Định Hóa',
    code: 167,
    division_type: 'huyện',
    codename: 'huyen_dinh_hoa',
    province_code: 19,
    wards: []
  },
  {
    name: 'Huyện Phú Lương',
    code: 168,
    division_type: 'huyện',
    codename: 'huyen_phu_luong',
    province_code: 19,
    wards: []
  },
  {
    name: 'Huyện Đồng Hỷ',
    code: 169,
    division_type: 'huyện',
    codename: 'huyen_dong_hy',
    province_code: 19,
    wards: []
  },
  {
    name: 'Huyện Võ Nhai',
    code: 170,
    division_type: 'huyện',
    codename: 'huyen_vo_nhai',
    province_code: 19,
    wards: []
  },
  {
    name: 'Huyện Đại Từ',
    code: 171,
    division_type: 'huyện',
    codename: 'huyen_dai_tu',
    province_code: 19,
    wards: []
  },
  {
    name: 'Thị xã Phổ Yên',
    code: 172,
    division_type: 'thị xã',
    codename: 'thi_xa_pho_yen',
    province_code: 19,
    wards: []
  },
  {
    name: 'Huyện Phú Bình',
    code: 173,
    division_type: 'huyện',
    codename: 'huyen_phu_binh',
    province_code: 19,
    wards: []
  },
  {
    name: 'Thành phố Lạng Sơn',
    code: 178,
    division_type: 'thành phố',
    codename: 'thanh_pho_lang_son',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Tràng Định',
    code: 180,
    division_type: 'huyện',
    codename: 'huyen_trang_dinh',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Bình Gia',
    code: 181,
    division_type: 'huyện',
    codename: 'huyen_binh_gia',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Văn Lãng',
    code: 182,
    division_type: 'huyện',
    codename: 'huyen_van_lang',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Cao Lộc',
    code: 183,
    division_type: 'huyện',
    codename: 'huyen_cao_loc',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Văn Quan',
    code: 184,
    division_type: 'huyện',
    codename: 'huyen_van_quan',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Bắc Sơn',
    code: 185,
    division_type: 'huyện',
    codename: 'huyen_bac_son',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Hữu Lũng',
    code: 186,
    division_type: 'huyện',
    codename: 'huyen_huu_lung',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Chi Lăng',
    code: 187,
    division_type: 'huyện',
    codename: 'huyen_chi_lang',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Lộc Bình',
    code: 188,
    division_type: 'huyện',
    codename: 'huyen_loc_binh',
    province_code: 20,
    wards: []
  },
  {
    name: 'Huyện Đình Lập',
    code: 189,
    division_type: 'huyện',
    codename: 'huyen_dinh_lap',
    province_code: 20,
    wards: []
  },
  {
    name: 'Thành phố Hạ Long',
    code: 193,
    division_type: 'thành phố',
    codename: 'thanh_pho_ha_long',
    province_code: 22,
    wards: []
  },
  {
    name: 'Thành phố Móng Cái',
    code: 194,
    division_type: 'thành phố',
    codename: 'thanh_pho_mong_cai',
    province_code: 22,
    wards: []
  },
  {
    name: 'Thành phố Cẩm Phả',
    code: 195,
    division_type: 'thành phố',
    codename: 'thanh_pho_cam_pha',
    province_code: 22,
    wards: []
  },
  {
    name: 'Thành phố Uông Bí',
    code: 196,
    division_type: 'thành phố',
    codename: 'thanh_pho_uong_bi',
    province_code: 22,
    wards: []
  },
  {
    name: 'Huyện Bình Liêu',
    code: 198,
    division_type: 'huyện',
    codename: 'huyen_binh_lieu',
    province_code: 22,
    wards: []
  },
  {
    name: 'Huyện Tiên Yên',
    code: 199,
    division_type: 'huyện',
    codename: 'huyen_tien_yen',
    province_code: 22,
    wards: []
  },
  {
    name: 'Huyện Đầm Hà',
    code: 200,
    division_type: 'huyện',
    codename: 'huyen_dam_ha',
    province_code: 22,
    wards: []
  },
  {
    name: 'Huyện Hải Hà',
    code: 201,
    division_type: 'huyện',
    codename: 'huyen_hai_ha',
    province_code: 22,
    wards: []
  },
  {
    name: 'Huyện Ba Chẽ',
    code: 202,
    division_type: 'huyện',
    codename: 'huyen_ba_che',
    province_code: 22,
    wards: []
  },
  {
    name: 'Huyện Vân Đồn',
    code: 203,
    division_type: 'huyện',
    codename: 'huyen_van_don',
    province_code: 22,
    wards: []
  },
  {
    name: 'Thị xã Đông Triều',
    code: 205,
    division_type: 'thị xã',
    codename: 'thi_xa_dong_trieu',
    province_code: 22,
    wards: []
  },
  {
    name: 'Thị xã Quảng Yên',
    code: 206,
    division_type: 'thị xã',
    codename: 'thi_xa_quang_yen',
    province_code: 22,
    wards: []
  },
  {
    name: 'Huyện Cô Tô',
    code: 207,
    division_type: 'huyện',
    codename: 'huyen_co_to',
    province_code: 22,
    wards: []
  },
  {
    name: 'Thành phố Bắc Giang',
    code: 213,
    division_type: 'thành phố',
    codename: 'thanh_pho_bac_giang',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Yên Thế',
    code: 215,
    division_type: 'huyện',
    codename: 'huyen_yen_the',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Tân Yên',
    code: 216,
    division_type: 'huyện',
    codename: 'huyen_tan_yen',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Lạng Giang',
    code: 217,
    division_type: 'huyện',
    codename: 'huyen_lang_giang',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Lục Nam',
    code: 218,
    division_type: 'huyện',
    codename: 'huyen_luc_nam',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Lục Ngạn',
    code: 219,
    division_type: 'huyện',
    codename: 'huyen_luc_ngan',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Sơn Động',
    code: 220,
    division_type: 'huyện',
    codename: 'huyen_son_dong',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Yên Dũng',
    code: 221,
    division_type: 'huyện',
    codename: 'huyen_yen_dung',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Việt Yên',
    code: 222,
    division_type: 'huyện',
    codename: 'huyen_viet_yen',
    province_code: 24,
    wards: []
  },
  {
    name: 'Huyện Hiệp Hòa',
    code: 223,
    division_type: 'huyện',
    codename: 'huyen_hiep_hoa',
    province_code: 24,
    wards: []
  },
  {
    name: 'Thành phố Việt Trì',
    code: 227,
    division_type: 'thành phố',
    codename: 'thanh_pho_viet_tri',
    province_code: 25,
    wards: []
  },
  {
    name: 'Thị xã Phú Thọ',
    code: 228,
    division_type: 'thị xã',
    codename: 'thi_xa_phu_tho',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Đoan Hùng',
    code: 230,
    division_type: 'huyện',
    codename: 'huyen_doan_hung',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Hạ Hoà',
    code: 231,
    division_type: 'huyện',
    codename: 'huyen_ha_hoa',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Thanh Ba',
    code: 232,
    division_type: 'huyện',
    codename: 'huyen_thanh_ba',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Phù Ninh',
    code: 233,
    division_type: 'huyện',
    codename: 'huyen_phu_ninh',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Yên Lập',
    code: 234,
    division_type: 'huyện',
    codename: 'huyen_yen_lap',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Cẩm Khê',
    code: 235,
    division_type: 'huyện',
    codename: 'huyen_cam_khe',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Tam Nông',
    code: 236,
    division_type: 'huyện',
    codename: 'huyen_tam_nong',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Lâm Thao',
    code: 237,
    division_type: 'huyện',
    codename: 'huyen_lam_thao',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Thanh Sơn',
    code: 238,
    division_type: 'huyện',
    codename: 'huyen_thanh_son',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Thanh Thuỷ',
    code: 239,
    division_type: 'huyện',
    codename: 'huyen_thanh_thuy',
    province_code: 25,
    wards: []
  },
  {
    name: 'Huyện Tân Sơn',
    code: 240,
    division_type: 'huyện',
    codename: 'huyen_tan_son',
    province_code: 25,
    wards: []
  },
  {
    name: 'Thành phố Vĩnh Yên',
    code: 243,
    division_type: 'thành phố',
    codename: 'thanh_pho_vinh_yen',
    province_code: 26,
    wards: []
  },
  {
    name: 'Thành phố Phúc Yên',
    code: 244,
    division_type: 'thành phố',
    codename: 'thanh_pho_phuc_yen',
    province_code: 26,
    wards: []
  },
  {
    name: 'Huyện Lập Thạch',
    code: 246,
    division_type: 'huyện',
    codename: 'huyen_lap_thach',
    province_code: 26,
    wards: []
  },
  {
    name: 'Huyện Tam Dương',
    code: 247,
    division_type: 'huyện',
    codename: 'huyen_tam_duong',
    province_code: 26,
    wards: []
  },
  {
    name: 'Huyện Tam Đảo',
    code: 248,
    division_type: 'huyện',
    codename: 'huyen_tam_dao',
    province_code: 26,
    wards: []
  },
  {
    name: 'Huyện Bình Xuyên',
    code: 249,
    division_type: 'huyện',
    codename: 'huyen_binh_xuyen',
    province_code: 26,
    wards: []
  },
  {
    name: 'Huyện Yên Lạc',
    code: 251,
    division_type: 'huyện',
    codename: 'huyen_yen_lac',
    province_code: 26,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Tường',
    code: 252,
    division_type: 'huyện',
    codename: 'huyen_vinh_tuong',
    province_code: 26,
    wards: []
  },
  {
    name: 'Huyện Sông Lô',
    code: 253,
    division_type: 'huyện',
    codename: 'huyen_song_lo',
    province_code: 26,
    wards: []
  },
  {
    name: 'Thành phố Bắc Ninh',
    code: 256,
    division_type: 'thành phố',
    codename: 'thanh_pho_bac_ninh',
    province_code: 27,
    wards: []
  },
  {
    name: 'Huyện Yên Phong',
    code: 258,
    division_type: 'huyện',
    codename: 'huyen_yen_phong',
    province_code: 27,
    wards: []
  },
  {
    name: 'Huyện Quế Võ',
    code: 259,
    division_type: 'huyện',
    codename: 'huyen_que_vo',
    province_code: 27,
    wards: []
  },
  {
    name: 'Huyện Tiên Du',
    code: 260,
    division_type: 'huyện',
    codename: 'huyen_tien_du',
    province_code: 27,
    wards: []
  },
  {
    name: 'Thị xã Từ Sơn',
    code: 261,
    division_type: 'thị xã',
    codename: 'thi_xa_tu_son',
    province_code: 27,
    wards: []
  },
  {
    name: 'Huyện Thuận Thành',
    code: 262,
    division_type: 'huyện',
    codename: 'huyen_thuan_thanh',
    province_code: 27,
    wards: []
  },
  {
    name: 'Huyện Gia Bình',
    code: 263,
    division_type: 'huyện',
    codename: 'huyen_gia_binh',
    province_code: 27,
    wards: []
  },
  {
    name: 'Huyện Lương Tài',
    code: 264,
    division_type: 'huyện',
    codename: 'huyen_luong_tai',
    province_code: 27,
    wards: []
  },
  {
    name: 'Thành phố Hải Dương',
    code: 288,
    division_type: 'thành phố',
    codename: 'thanh_pho_hai_duong',
    province_code: 30,
    wards: []
  },
  {
    name: 'Thành phố Chí Linh',
    code: 290,
    division_type: 'thành phố',
    codename: 'thanh_pho_chi_linh',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Nam Sách',
    code: 291,
    division_type: 'huyện',
    codename: 'huyen_nam_sach',
    province_code: 30,
    wards: []
  },
  {
    name: 'Thị xã Kinh Môn',
    code: 292,
    division_type: 'thị xã',
    codename: 'thi_xa_kinh_mon',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Kim Thành',
    code: 293,
    division_type: 'huyện',
    codename: 'huyen_kim_thanh',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Thanh Hà',
    code: 294,
    division_type: 'huyện',
    codename: 'huyen_thanh_ha',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Cẩm Giàng',
    code: 295,
    division_type: 'huyện',
    codename: 'huyen_cam_giang',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Bình Giang',
    code: 296,
    division_type: 'huyện',
    codename: 'huyen_binh_giang',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Gia Lộc',
    code: 297,
    division_type: 'huyện',
    codename: 'huyen_gia_loc',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Tứ Kỳ',
    code: 298,
    division_type: 'huyện',
    codename: 'huyen_tu_ky',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Ninh Giang',
    code: 299,
    division_type: 'huyện',
    codename: 'huyen_ninh_giang',
    province_code: 30,
    wards: []
  },
  {
    name: 'Huyện Thanh Miện',
    code: 300,
    division_type: 'huyện',
    codename: 'huyen_thanh_mien',
    province_code: 30,
    wards: []
  },
  {
    name: 'Quận Hồng Bàng',
    code: 303,
    division_type: 'quận',
    codename: 'quan_hong_bang',
    province_code: 31,
    wards: []
  },
  {
    name: 'Quận Ngô Quyền',
    code: 304,
    division_type: 'quận',
    codename: 'quan_ngo_quyen',
    province_code: 31,
    wards: []
  },
  {
    name: 'Quận Lê Chân',
    code: 305,
    division_type: 'quận',
    codename: 'quan_le_chan',
    province_code: 31,
    wards: []
  },
  {
    name: 'Quận Hải An',
    code: 306,
    division_type: 'quận',
    codename: 'quan_hai_an',
    province_code: 31,
    wards: []
  },
  {
    name: 'Quận Kiến An',
    code: 307,
    division_type: 'quận',
    codename: 'quan_kien_an',
    province_code: 31,
    wards: []
  },
  {
    name: 'Quận Đồ Sơn',
    code: 308,
    division_type: 'quận',
    codename: 'quan_do_son',
    province_code: 31,
    wards: []
  },
  {
    name: 'Quận Dương Kinh',
    code: 309,
    division_type: 'quận',
    codename: 'quan_duong_kinh',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện Thuỷ Nguyên',
    code: 311,
    division_type: 'huyện',
    codename: 'huyen_thuy_nguyen',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện An Dương',
    code: 312,
    division_type: 'huyện',
    codename: 'huyen_an_duong',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện An Lão',
    code: 313,
    division_type: 'huyện',
    codename: 'huyen_an_lao',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện Kiến Thuỵ',
    code: 314,
    division_type: 'huyện',
    codename: 'huyen_kien_thuy',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện Tiên Lãng',
    code: 315,
    division_type: 'huyện',
    codename: 'huyen_tien_lang',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Bảo',
    code: 316,
    division_type: 'huyện',
    codename: 'huyen_vinh_bao',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện Cát Hải',
    code: 317,
    division_type: 'huyện',
    codename: 'huyen_cat_hai',
    province_code: 31,
    wards: []
  },
  {
    name: 'Huyện Bạch Long Vĩ',
    code: 318,
    division_type: 'huyện',
    codename: 'huyen_bach_long_vi',
    province_code: 31,
    wards: []
  },
  {
    name: 'Thành phố Hưng Yên',
    code: 323,
    division_type: 'thành phố',
    codename: 'thanh_pho_hung_yen',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Văn Lâm',
    code: 325,
    division_type: 'huyện',
    codename: 'huyen_van_lam',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Văn Giang',
    code: 326,
    division_type: 'huyện',
    codename: 'huyen_van_giang',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Yên Mỹ',
    code: 327,
    division_type: 'huyện',
    codename: 'huyen_yen_my',
    province_code: 33,
    wards: []
  },
  {
    name: 'Thị xã Mỹ Hào',
    code: 328,
    division_type: 'thị xã',
    codename: 'thi_xa_my_hao',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Ân Thi',
    code: 329,
    division_type: 'huyện',
    codename: 'huyen_an_thi',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Khoái Châu',
    code: 330,
    division_type: 'huyện',
    codename: 'huyen_khoai_chau',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Kim Động',
    code: 331,
    division_type: 'huyện',
    codename: 'huyen_kim_dong',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Tiên Lữ',
    code: 332,
    division_type: 'huyện',
    codename: 'huyen_tien_lu',
    province_code: 33,
    wards: []
  },
  {
    name: 'Huyện Phù Cừ',
    code: 333,
    division_type: 'huyện',
    codename: 'huyen_phu_cu',
    province_code: 33,
    wards: []
  },
  {
    name: 'Thành phố Thái Bình',
    code: 336,
    division_type: 'thành phố',
    codename: 'thanh_pho_thai_binh',
    province_code: 34,
    wards: []
  },
  {
    name: 'Huyện Quỳnh Phụ',
    code: 338,
    division_type: 'huyện',
    codename: 'huyen_quynh_phu',
    province_code: 34,
    wards: []
  },
  {
    name: 'Huyện Hưng Hà',
    code: 339,
    division_type: 'huyện',
    codename: 'huyen_hung_ha',
    province_code: 34,
    wards: []
  },
  {
    name: 'Huyện Đông Hưng',
    code: 340,
    division_type: 'huyện',
    codename: 'huyen_dong_hung',
    province_code: 34,
    wards: []
  },
  {
    name: 'Huyện Thái Thụy',
    code: 341,
    division_type: 'huyện',
    codename: 'huyen_thai_thuy',
    province_code: 34,
    wards: []
  },
  {
    name: 'Huyện Tiền Hải',
    code: 342,
    division_type: 'huyện',
    codename: 'huyen_tien_hai',
    province_code: 34,
    wards: []
  },
  {
    name: 'Huyện Kiến Xương',
    code: 343,
    division_type: 'huyện',
    codename: 'huyen_kien_xuong',
    province_code: 34,
    wards: []
  },
  {
    name: 'Huyện Vũ Thư',
    code: 344,
    division_type: 'huyện',
    codename: 'huyen_vu_thu',
    province_code: 34,
    wards: []
  },
  {
    name: 'Thành phố Phủ Lý',
    code: 347,
    division_type: 'thành phố',
    codename: 'thanh_pho_phu_ly',
    province_code: 35,
    wards: []
  },
  {
    name: 'Thị xã Duy Tiên',
    code: 349,
    division_type: 'thị xã',
    codename: 'thi_xa_duy_tien',
    province_code: 35,
    wards: []
  },
  {
    name: 'Huyện Kim Bảng',
    code: 350,
    division_type: 'huyện',
    codename: 'huyen_kim_bang',
    province_code: 35,
    wards: []
  },
  {
    name: 'Huyện Thanh Liêm',
    code: 351,
    division_type: 'huyện',
    codename: 'huyen_thanh_liem',
    province_code: 35,
    wards: []
  },
  {
    name: 'Huyện Bình Lục',
    code: 352,
    division_type: 'huyện',
    codename: 'huyen_binh_luc',
    province_code: 35,
    wards: []
  },
  {
    name: 'Huyện Lý Nhân',
    code: 353,
    division_type: 'huyện',
    codename: 'huyen_ly_nhan',
    province_code: 35,
    wards: []
  },
  {
    name: 'Thành phố Nam Định',
    code: 356,
    division_type: 'thành phố',
    codename: 'thanh_pho_nam_dinh',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Mỹ Lộc',
    code: 358,
    division_type: 'huyện',
    codename: 'huyen_my_loc',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Vụ Bản',
    code: 359,
    division_type: 'huyện',
    codename: 'huyen_vu_ban',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Ý Yên',
    code: 360,
    division_type: 'huyện',
    codename: 'huyen_y_yen',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Nghĩa Hưng',
    code: 361,
    division_type: 'huyện',
    codename: 'huyen_nghia_hung',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Nam Trực',
    code: 362,
    division_type: 'huyện',
    codename: 'huyen_nam_truc',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Trực Ninh',
    code: 363,
    division_type: 'huyện',
    codename: 'huyen_truc_ninh',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Xuân Trường',
    code: 364,
    division_type: 'huyện',
    codename: 'huyen_xuan_truong',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Giao Thủy',
    code: 365,
    division_type: 'huyện',
    codename: 'huyen_giao_thuy',
    province_code: 36,
    wards: []
  },
  {
    name: 'Huyện Hải Hậu',
    code: 366,
    division_type: 'huyện',
    codename: 'huyen_hai_hau',
    province_code: 36,
    wards: []
  },
  {
    name: 'Thành phố Ninh Bình',
    code: 369,
    division_type: 'thành phố',
    codename: 'thanh_pho_ninh_binh',
    province_code: 37,
    wards: []
  },
  {
    name: 'Thành phố Tam Điệp',
    code: 370,
    division_type: 'thành phố',
    codename: 'thanh_pho_tam_diep',
    province_code: 37,
    wards: []
  },
  {
    name: 'Huyện Nho Quan',
    code: 372,
    division_type: 'huyện',
    codename: 'huyen_nho_quan',
    province_code: 37,
    wards: []
  },
  {
    name: 'Huyện Gia Viễn',
    code: 373,
    division_type: 'huyện',
    codename: 'huyen_gia_vien',
    province_code: 37,
    wards: []
  },
  {
    name: 'Huyện Hoa Lư',
    code: 374,
    division_type: 'huyện',
    codename: 'huyen_hoa_lu',
    province_code: 37,
    wards: []
  },
  {
    name: 'Huyện Yên Khánh',
    code: 375,
    division_type: 'huyện',
    codename: 'huyen_yen_khanh',
    province_code: 37,
    wards: []
  },
  {
    name: 'Huyện Kim Sơn',
    code: 376,
    division_type: 'huyện',
    codename: 'huyen_kim_son',
    province_code: 37,
    wards: []
  },
  {
    name: 'Huyện Yên Mô',
    code: 377,
    division_type: 'huyện',
    codename: 'huyen_yen_mo',
    province_code: 37,
    wards: []
  },
  {
    name: 'Thành phố Thanh Hóa',
    code: 380,
    division_type: 'thành phố',
    codename: 'thanh_pho_thanh_hoa',
    province_code: 38,
    wards: []
  },
  {
    name: 'Thị xã Bỉm Sơn',
    code: 381,
    division_type: 'thị xã',
    codename: 'thi_xa_bim_son',
    province_code: 38,
    wards: []
  },
  {
    name: 'Thành phố Sầm Sơn',
    code: 382,
    division_type: 'thành phố',
    codename: 'thanh_pho_sam_son',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Mường Lát',
    code: 384,
    division_type: 'huyện',
    codename: 'huyen_muong_lat',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Quan Hóa',
    code: 385,
    division_type: 'huyện',
    codename: 'huyen_quan_hoa',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Bá Thước',
    code: 386,
    division_type: 'huyện',
    codename: 'huyen_ba_thuoc',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Quan Sơn',
    code: 387,
    division_type: 'huyện',
    codename: 'huyen_quan_son',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Lang Chánh',
    code: 388,
    division_type: 'huyện',
    codename: 'huyen_lang_chanh',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Ngọc Lặc',
    code: 389,
    division_type: 'huyện',
    codename: 'huyen_ngoc_lac',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Cẩm Thủy',
    code: 390,
    division_type: 'huyện',
    codename: 'huyen_cam_thuy',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Thạch Thành',
    code: 391,
    division_type: 'huyện',
    codename: 'huyen_thach_thanh',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Hà Trung',
    code: 392,
    division_type: 'huyện',
    codename: 'huyen_ha_trung',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Lộc',
    code: 393,
    division_type: 'huyện',
    codename: 'huyen_vinh_loc',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Yên Định',
    code: 394,
    division_type: 'huyện',
    codename: 'huyen_yen_dinh',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Thọ Xuân',
    code: 395,
    division_type: 'huyện',
    codename: 'huyen_tho_xuan',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Thường Xuân',
    code: 396,
    division_type: 'huyện',
    codename: 'huyen_thuong_xuan',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Triệu Sơn',
    code: 397,
    division_type: 'huyện',
    codename: 'huyen_trieu_son',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Thiệu Hóa',
    code: 398,
    division_type: 'huyện',
    codename: 'huyen_thieu_hoa',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Hoằng Hóa',
    code: 399,
    division_type: 'huyện',
    codename: 'huyen_hoang_hoa',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Hậu Lộc',
    code: 400,
    division_type: 'huyện',
    codename: 'huyen_hau_loc',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Nga Sơn',
    code: 401,
    division_type: 'huyện',
    codename: 'huyen_nga_son',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Như Xuân',
    code: 402,
    division_type: 'huyện',
    codename: 'huyen_nhu_xuan',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Như Thanh',
    code: 403,
    division_type: 'huyện',
    codename: 'huyen_nhu_thanh',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Nông Cống',
    code: 404,
    division_type: 'huyện',
    codename: 'huyen_nong_cong',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Đông Sơn',
    code: 405,
    division_type: 'huyện',
    codename: 'huyen_dong_son',
    province_code: 38,
    wards: []
  },
  {
    name: 'Huyện Quảng Xương',
    code: 406,
    division_type: 'huyện',
    codename: 'huyen_quang_xuong',
    province_code: 38,
    wards: []
  },
  {
    name: 'Thị xã Nghi Sơn',
    code: 407,
    division_type: 'thị xã',
    codename: 'thi_xa_nghi_son',
    province_code: 38,
    wards: []
  },
  {
    name: 'Thành phố Vinh',
    code: 412,
    division_type: 'thành phố',
    codename: 'thanh_pho_vinh',
    province_code: 40,
    wards: []
  },
  {
    name: 'Thị xã Cửa Lò',
    code: 413,
    division_type: 'thị xã',
    codename: 'thi_xa_cua_lo',
    province_code: 40,
    wards: []
  },
  {
    name: 'Thị xã Thái Hoà',
    code: 414,
    division_type: 'thị xã',
    codename: 'thi_xa_thai_hoa',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Quế Phong',
    code: 415,
    division_type: 'huyện',
    codename: 'huyen_que_phong',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Quỳ Châu',
    code: 416,
    division_type: 'huyện',
    codename: 'huyen_quy_chau',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Kỳ Sơn',
    code: 417,
    division_type: 'huyện',
    codename: 'huyen_ky_son',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Tương Dương',
    code: 418,
    division_type: 'huyện',
    codename: 'huyen_tuong_duong',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Nghĩa Đàn',
    code: 419,
    division_type: 'huyện',
    codename: 'huyen_nghia_dan',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Quỳ Hợp',
    code: 420,
    division_type: 'huyện',
    codename: 'huyen_quy_hop',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Quỳnh Lưu',
    code: 421,
    division_type: 'huyện',
    codename: 'huyen_quynh_luu',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Con Cuông',
    code: 422,
    division_type: 'huyện',
    codename: 'huyen_con_cuong',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Tân Kỳ',
    code: 423,
    division_type: 'huyện',
    codename: 'huyen_tan_ky',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Anh Sơn',
    code: 424,
    division_type: 'huyện',
    codename: 'huyen_anh_son',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Diễn Châu',
    code: 425,
    division_type: 'huyện',
    codename: 'huyen_dien_chau',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Yên Thành',
    code: 426,
    division_type: 'huyện',
    codename: 'huyen_yen_thanh',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Đô Lương',
    code: 427,
    division_type: 'huyện',
    codename: 'huyen_do_luong',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Thanh Chương',
    code: 428,
    division_type: 'huyện',
    codename: 'huyen_thanh_chuong',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Nghi Lộc',
    code: 429,
    division_type: 'huyện',
    codename: 'huyen_nghi_loc',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Nam Đàn',
    code: 430,
    division_type: 'huyện',
    codename: 'huyen_nam_dan',
    province_code: 40,
    wards: []
  },
  {
    name: 'Huyện Hưng Nguyên',
    code: 431,
    division_type: 'huyện',
    codename: 'huyen_hung_nguyen',
    province_code: 40,
    wards: []
  },
  {
    name: 'Thị xã Hoàng Mai',
    code: 432,
    division_type: 'thị xã',
    codename: 'thi_xa_hoang_mai',
    province_code: 40,
    wards: []
  },
  {
    name: 'Thành phố Hà Tĩnh',
    code: 436,
    division_type: 'thành phố',
    codename: 'thanh_pho_ha_tinh',
    province_code: 42,
    wards: []
  },
  {
    name: 'Thị xã Hồng Lĩnh',
    code: 437,
    division_type: 'thị xã',
    codename: 'thi_xa_hong_linh',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Hương Sơn',
    code: 439,
    division_type: 'huyện',
    codename: 'huyen_huong_son',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Đức Thọ',
    code: 440,
    division_type: 'huyện',
    codename: 'huyen_duc_tho',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Vũ Quang',
    code: 441,
    division_type: 'huyện',
    codename: 'huyen_vu_quang',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Nghi Xuân',
    code: 442,
    division_type: 'huyện',
    codename: 'huyen_nghi_xuan',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Can Lộc',
    code: 443,
    division_type: 'huyện',
    codename: 'huyen_can_loc',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Hương Khê',
    code: 444,
    division_type: 'huyện',
    codename: 'huyen_huong_khe',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Thạch Hà',
    code: 445,
    division_type: 'huyện',
    codename: 'huyen_thach_ha',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Cẩm Xuyên',
    code: 446,
    division_type: 'huyện',
    codename: 'huyen_cam_xuyen',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Kỳ Anh',
    code: 447,
    division_type: 'huyện',
    codename: 'huyen_ky_anh',
    province_code: 42,
    wards: []
  },
  {
    name: 'Huyện Lộc Hà',
    code: 448,
    division_type: 'huyện',
    codename: 'huyen_loc_ha',
    province_code: 42,
    wards: []
  },
  {
    name: 'Thị xã Kỳ Anh',
    code: 449,
    division_type: 'thị xã',
    codename: 'thi_xa_ky_anh',
    province_code: 42,
    wards: []
  },
  {
    name: 'Thành Phố Đồng Hới',
    code: 450,
    division_type: 'thành phố',
    codename: 'thanh_pho_dong_hoi',
    province_code: 44,
    wards: []
  },
  {
    name: 'Huyện Minh Hóa',
    code: 452,
    division_type: 'huyện',
    codename: 'huyen_minh_hoa',
    province_code: 44,
    wards: []
  },
  {
    name: 'Huyện Tuyên Hóa',
    code: 453,
    division_type: 'huyện',
    codename: 'huyen_tuyen_hoa',
    province_code: 44,
    wards: []
  },
  {
    name: 'Huyện Quảng Trạch',
    code: 454,
    division_type: 'huyện',
    codename: 'huyen_quang_trach',
    province_code: 44,
    wards: []
  },
  {
    name: 'Huyện Bố Trạch',
    code: 455,
    division_type: 'huyện',
    codename: 'huyen_bo_trach',
    province_code: 44,
    wards: []
  },
  {
    name: 'Huyện Quảng Ninh',
    code: 456,
    division_type: 'huyện',
    codename: 'huyen_quang_ninh',
    province_code: 44,
    wards: []
  },
  {
    name: 'Huyện Lệ Thủy',
    code: 457,
    division_type: 'huyện',
    codename: 'huyen_le_thuy',
    province_code: 44,
    wards: []
  },
  {
    name: 'Thị xã Ba Đồn',
    code: 458,
    division_type: 'thị xã',
    codename: 'thi_xa_ba_don',
    province_code: 44,
    wards: []
  },
  {
    name: 'Thành phố Đông Hà',
    code: 461,
    division_type: 'thành phố',
    codename: 'thanh_pho_dong_ha',
    province_code: 45,
    wards: []
  },
  {
    name: 'Thị xã Quảng Trị',
    code: 462,
    division_type: 'thị xã',
    codename: 'thi_xa_quang_tri',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Linh',
    code: 464,
    division_type: 'huyện',
    codename: 'huyen_vinh_linh',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Hướng Hóa',
    code: 465,
    division_type: 'huyện',
    codename: 'huyen_huong_hoa',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Gio Linh',
    code: 466,
    division_type: 'huyện',
    codename: 'huyen_gio_linh',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Đa Krông',
    code: 467,
    division_type: 'huyện',
    codename: 'huyen_da_krong',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Cam Lộ',
    code: 468,
    division_type: 'huyện',
    codename: 'huyen_cam_lo',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Triệu Phong',
    code: 469,
    division_type: 'huyện',
    codename: 'huyen_trieu_phong',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Hải Lăng',
    code: 470,
    division_type: 'huyện',
    codename: 'huyen_hai_lang',
    province_code: 45,
    wards: []
  },
  {
    name: 'Huyện Cồn Cỏ',
    code: 471,
    division_type: 'huyện',
    codename: 'huyen_con_co',
    province_code: 45,
    wards: []
  },
  {
    name: 'Thành phố Huế',
    code: 474,
    division_type: 'thành phố',
    codename: 'thanh_pho_hue',
    province_code: 46,
    wards: []
  },
  {
    name: 'Huyện Phong Điền',
    code: 476,
    division_type: 'huyện',
    codename: 'huyen_phong_dien',
    province_code: 46,
    wards: []
  },
  {
    name: 'Huyện Quảng Điền',
    code: 477,
    division_type: 'huyện',
    codename: 'huyen_quang_dien',
    province_code: 46,
    wards: []
  },
  {
    name: 'Huyện Phú Vang',
    code: 478,
    division_type: 'huyện',
    codename: 'huyen_phu_vang',
    province_code: 46,
    wards: []
  },
  {
    name: 'Thị xã Hương Thủy',
    code: 479,
    division_type: 'thị xã',
    codename: 'thi_xa_huong_thuy',
    province_code: 46,
    wards: []
  },
  {
    name: 'Thị xã Hương Trà',
    code: 480,
    division_type: 'thị xã',
    codename: 'thi_xa_huong_tra',
    province_code: 46,
    wards: []
  },
  {
    name: 'Huyện A Lưới',
    code: 481,
    division_type: 'huyện',
    codename: 'huyen_a_luoi',
    province_code: 46,
    wards: []
  },
  {
    name: 'Huyện Phú Lộc',
    code: 482,
    division_type: 'huyện',
    codename: 'huyen_phu_loc',
    province_code: 46,
    wards: []
  },
  {
    name: 'Huyện Nam Đông',
    code: 483,
    division_type: 'huyện',
    codename: 'huyen_nam_dong',
    province_code: 46,
    wards: []
  },
  {
    name: 'Quận Liên Chiểu',
    code: 490,
    division_type: 'quận',
    codename: 'quan_lien_chieu',
    province_code: 48,
    wards: []
  },
  {
    name: 'Quận Thanh Khê',
    code: 491,
    division_type: 'quận',
    codename: 'quan_thanh_khe',
    province_code: 48,
    wards: []
  },
  {
    name: 'Quận Hải Châu',
    code: 492,
    division_type: 'quận',
    codename: 'quan_hai_chau',
    province_code: 48,
    wards: []
  },
  {
    name: 'Quận Sơn Trà',
    code: 493,
    division_type: 'quận',
    codename: 'quan_son_tra',
    province_code: 48,
    wards: []
  },
  {
    name: 'Quận Ngũ Hành Sơn',
    code: 494,
    division_type: 'quận',
    codename: 'quan_ngu_hanh_son',
    province_code: 48,
    wards: []
  },
  {
    name: 'Quận Cẩm Lệ',
    code: 495,
    division_type: 'quận',
    codename: 'quan_cam_le',
    province_code: 48,
    wards: []
  },
  {
    name: 'Huyện Hòa Vang',
    code: 497,
    division_type: 'huyện',
    codename: 'huyen_hoa_vang',
    province_code: 48,
    wards: []
  },
  {
    name: 'Huyện Hoàng Sa',
    code: 498,
    division_type: 'huyện',
    codename: 'huyen_hoang_sa',
    province_code: 48,
    wards: []
  },
  {
    name: 'Thành phố Tam Kỳ',
    code: 502,
    division_type: 'thành phố',
    codename: 'thanh_pho_tam_ky',
    province_code: 49,
    wards: []
  },
  {
    name: 'Thành phố Hội An',
    code: 503,
    division_type: 'thành phố',
    codename: 'thanh_pho_hoi_an',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Tây Giang',
    code: 504,
    division_type: 'huyện',
    codename: 'huyen_tay_giang',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Đông Giang',
    code: 505,
    division_type: 'huyện',
    codename: 'huyen_dong_giang',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Đại Lộc',
    code: 506,
    division_type: 'huyện',
    codename: 'huyen_dai_loc',
    province_code: 49,
    wards: []
  },
  {
    name: 'Thị xã Điện Bàn',
    code: 507,
    division_type: 'thị xã',
    codename: 'thi_xa_dien_ban',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Duy Xuyên',
    code: 508,
    division_type: 'huyện',
    codename: 'huyen_duy_xuyen',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Quế Sơn',
    code: 509,
    division_type: 'huyện',
    codename: 'huyen_que_son',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Nam Giang',
    code: 510,
    division_type: 'huyện',
    codename: 'huyen_nam_giang',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Phước Sơn',
    code: 511,
    division_type: 'huyện',
    codename: 'huyen_phuoc_son',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Hiệp Đức',
    code: 512,
    division_type: 'huyện',
    codename: 'huyen_hiep_duc',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Thăng Bình',
    code: 513,
    division_type: 'huyện',
    codename: 'huyen_thang_binh',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Tiên Phước',
    code: 514,
    division_type: 'huyện',
    codename: 'huyen_tien_phuoc',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Bắc Trà My',
    code: 515,
    division_type: 'huyện',
    codename: 'huyen_bac_tra_my',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Nam Trà My',
    code: 516,
    division_type: 'huyện',
    codename: 'huyen_nam_tra_my',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Núi Thành',
    code: 517,
    division_type: 'huyện',
    codename: 'huyen_nui_thanh',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Phú Ninh',
    code: 518,
    division_type: 'huyện',
    codename: 'huyen_phu_ninh',
    province_code: 49,
    wards: []
  },
  {
    name: 'Huyện Nông Sơn',
    code: 519,
    division_type: 'huyện',
    codename: 'huyen_nong_son',
    province_code: 49,
    wards: []
  },
  {
    name: 'Thành phố Quảng Ngãi',
    code: 522,
    division_type: 'thành phố',
    codename: 'thanh_pho_quang_ngai',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Bình Sơn',
    code: 524,
    division_type: 'huyện',
    codename: 'huyen_binh_son',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Trà Bồng',
    code: 525,
    division_type: 'huyện',
    codename: 'huyen_tra_bong',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Sơn Tịnh',
    code: 527,
    division_type: 'huyện',
    codename: 'huyen_son_tinh',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Tư Nghĩa',
    code: 528,
    division_type: 'huyện',
    codename: 'huyen_tu_nghia',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Sơn Hà',
    code: 529,
    division_type: 'huyện',
    codename: 'huyen_son_ha',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Sơn Tây',
    code: 530,
    division_type: 'huyện',
    codename: 'huyen_son_tay',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Minh Long',
    code: 531,
    division_type: 'huyện',
    codename: 'huyen_minh_long',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Nghĩa Hành',
    code: 532,
    division_type: 'huyện',
    codename: 'huyen_nghia_hanh',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Mộ Đức',
    code: 533,
    division_type: 'huyện',
    codename: 'huyen_mo_duc',
    province_code: 51,
    wards: []
  },
  {
    name: 'Thị xã Đức Phổ',
    code: 534,
    division_type: 'thị xã',
    codename: 'thi_xa_duc_pho',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Ba Tơ',
    code: 535,
    division_type: 'huyện',
    codename: 'huyen_ba_to',
    province_code: 51,
    wards: []
  },
  {
    name: 'Huyện Lý Sơn',
    code: 536,
    division_type: 'huyện',
    codename: 'huyen_ly_son',
    province_code: 51,
    wards: []
  },
  {
    name: 'Thành phố Quy Nhơn',
    code: 540,
    division_type: 'thành phố',
    codename: 'thanh_pho_quy_nhon',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện An Lão',
    code: 542,
    division_type: 'huyện',
    codename: 'huyen_an_lao',
    province_code: 52,
    wards: []
  },
  {
    name: 'Thị xã Hoài Nhơn',
    code: 543,
    division_type: 'thị xã',
    codename: 'thi_xa_hoai_nhon',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện Hoài Ân',
    code: 544,
    division_type: 'huyện',
    codename: 'huyen_hoai_an',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện Phù Mỹ',
    code: 545,
    division_type: 'huyện',
    codename: 'huyen_phu_my',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Thạnh',
    code: 546,
    division_type: 'huyện',
    codename: 'huyen_vinh_thanh',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện Tây Sơn',
    code: 547,
    division_type: 'huyện',
    codename: 'huyen_tay_son',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện Phù Cát',
    code: 548,
    division_type: 'huyện',
    codename: 'huyen_phu_cat',
    province_code: 52,
    wards: []
  },
  {
    name: 'Thị xã An Nhơn',
    code: 549,
    division_type: 'thị xã',
    codename: 'thi_xa_an_nhon',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện Tuy Phước',
    code: 550,
    division_type: 'huyện',
    codename: 'huyen_tuy_phuoc',
    province_code: 52,
    wards: []
  },
  {
    name: 'Huyện Vân Canh',
    code: 551,
    division_type: 'huyện',
    codename: 'huyen_van_canh',
    province_code: 52,
    wards: []
  },
  {
    name: 'Thành phố Tuy Hoà',
    code: 555,
    division_type: 'thành phố',
    codename: 'thanh_pho_tuy_hoa',
    province_code: 54,
    wards: []
  },
  {
    name: 'Thị xã Sông Cầu',
    code: 557,
    division_type: 'thị xã',
    codename: 'thi_xa_song_cau',
    province_code: 54,
    wards: []
  },
  {
    name: 'Huyện Đồng Xuân',
    code: 558,
    division_type: 'huyện',
    codename: 'huyen_dong_xuan',
    province_code: 54,
    wards: []
  },
  {
    name: 'Huyện Tuy An',
    code: 559,
    division_type: 'huyện',
    codename: 'huyen_tuy_an',
    province_code: 54,
    wards: []
  },
  {
    name: 'Huyện Sơn Hòa',
    code: 560,
    division_type: 'huyện',
    codename: 'huyen_son_hoa',
    province_code: 54,
    wards: []
  },
  {
    name: 'Huyện Sông Hinh',
    code: 561,
    division_type: 'huyện',
    codename: 'huyen_song_hinh',
    province_code: 54,
    wards: []
  },
  {
    name: 'Huyện Tây Hoà',
    code: 562,
    division_type: 'huyện',
    codename: 'huyen_tay_hoa',
    province_code: 54,
    wards: []
  },
  {
    name: 'Huyện Phú Hoà',
    code: 563,
    division_type: 'huyện',
    codename: 'huyen_phu_hoa',
    province_code: 54,
    wards: []
  },
  {
    name: 'Thị xã Đông Hòa',
    code: 564,
    division_type: 'thị xã',
    codename: 'thi_xa_dong_hoa',
    province_code: 54,
    wards: []
  },
  {
    name: 'Thành phố Nha Trang',
    code: 568,
    division_type: 'thành phố',
    codename: 'thanh_pho_nha_trang',
    province_code: 56,
    wards: []
  },
  {
    name: 'Thành phố Cam Ranh',
    code: 569,
    division_type: 'thành phố',
    codename: 'thanh_pho_cam_ranh',
    province_code: 56,
    wards: []
  },
  {
    name: 'Huyện Cam Lâm',
    code: 570,
    division_type: 'huyện',
    codename: 'huyen_cam_lam',
    province_code: 56,
    wards: []
  },
  {
    name: 'Huyện Vạn Ninh',
    code: 571,
    division_type: 'huyện',
    codename: 'huyen_van_ninh',
    province_code: 56,
    wards: []
  },
  {
    name: 'Thị xã Ninh Hòa',
    code: 572,
    division_type: 'thị xã',
    codename: 'thi_xa_ninh_hoa',
    province_code: 56,
    wards: []
  },
  {
    name: 'Huyện Khánh Vĩnh',
    code: 573,
    division_type: 'huyện',
    codename: 'huyen_khanh_vinh',
    province_code: 56,
    wards: []
  },
  {
    name: 'Huyện Diên Khánh',
    code: 574,
    division_type: 'huyện',
    codename: 'huyen_dien_khanh',
    province_code: 56,
    wards: []
  },
  {
    name: 'Huyện Khánh Sơn',
    code: 575,
    division_type: 'huyện',
    codename: 'huyen_khanh_son',
    province_code: 56,
    wards: []
  },
  {
    name: 'Huyện Trường Sa',
    code: 576,
    division_type: 'huyện',
    codename: 'huyen_truong_sa',
    province_code: 56,
    wards: []
  },
  {
    name: 'Thành phố Phan Rang-Tháp Chàm',
    code: 582,
    division_type: 'thành phố',
    codename: 'thanh_pho_phan_rang_thap_cham',
    province_code: 58,
    wards: []
  },
  {
    name: 'Huyện Bác Ái',
    code: 584,
    division_type: 'huyện',
    codename: 'huyen_bac_ai',
    province_code: 58,
    wards: []
  },
  {
    name: 'Huyện Ninh Sơn',
    code: 585,
    division_type: 'huyện',
    codename: 'huyen_ninh_son',
    province_code: 58,
    wards: []
  },
  {
    name: 'Huyện Ninh Hải',
    code: 586,
    division_type: 'huyện',
    codename: 'huyen_ninh_hai',
    province_code: 58,
    wards: []
  },
  {
    name: 'Huyện Ninh Phước',
    code: 587,
    division_type: 'huyện',
    codename: 'huyen_ninh_phuoc',
    province_code: 58,
    wards: []
  },
  {
    name: 'Huyện Thuận Bắc',
    code: 588,
    division_type: 'huyện',
    codename: 'huyen_thuan_bac',
    province_code: 58,
    wards: []
  },
  {
    name: 'Huyện Thuận Nam',
    code: 589,
    division_type: 'huyện',
    codename: 'huyen_thuan_nam',
    province_code: 58,
    wards: []
  },
  {
    name: 'Thành phố Phan Thiết',
    code: 593,
    division_type: 'thành phố',
    codename: 'thanh_pho_phan_thiet',
    province_code: 60,
    wards: []
  },
  {
    name: 'Thị xã La Gi',
    code: 594,
    division_type: 'thị xã',
    codename: 'thi_xa_la_gi',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Tuy Phong',
    code: 595,
    division_type: 'huyện',
    codename: 'huyen_tuy_phong',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Bắc Bình',
    code: 596,
    division_type: 'huyện',
    codename: 'huyen_bac_binh',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Hàm Thuận Bắc',
    code: 597,
    division_type: 'huyện',
    codename: 'huyen_ham_thuan_bac',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Hàm Thuận Nam',
    code: 598,
    division_type: 'huyện',
    codename: 'huyen_ham_thuan_nam',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Tánh Linh',
    code: 599,
    division_type: 'huyện',
    codename: 'huyen_tanh_linh',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Đức Linh',
    code: 600,
    division_type: 'huyện',
    codename: 'huyen_duc_linh',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Hàm Tân',
    code: 601,
    division_type: 'huyện',
    codename: 'huyen_ham_tan',
    province_code: 60,
    wards: []
  },
  {
    name: 'Huyện Phú Quí',
    code: 602,
    division_type: 'huyện',
    codename: 'huyen_phu_qui',
    province_code: 60,
    wards: []
  },
  {
    name: 'Thành phố Kon Tum',
    code: 608,
    division_type: 'thành phố',
    codename: 'thanh_pho_kon_tum',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Đắk Glei',
    code: 610,
    division_type: 'huyện',
    codename: 'huyen_dak_glei',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Ngọc Hồi',
    code: 611,
    division_type: 'huyện',
    codename: 'huyen_ngoc_hoi',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Đắk Tô',
    code: 612,
    division_type: 'huyện',
    codename: 'huyen_dak_to',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Kon Plông',
    code: 613,
    division_type: 'huyện',
    codename: 'huyen_kon_plong',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Kon Rẫy',
    code: 614,
    division_type: 'huyện',
    codename: 'huyen_kon_ray',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Đắk Hà',
    code: 615,
    division_type: 'huyện',
    codename: 'huyen_dak_ha',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Sa Thầy',
    code: 616,
    division_type: 'huyện',
    codename: 'huyen_sa_thay',
    province_code: 62,
    wards: []
  },
  {
    name: 'Huyện Tu Mơ Rông',
    code: 617,
    division_type: 'huyện',
    codename: 'huyen_tu_mo_rong',
    province_code: 62,
    wards: []
  },
  {
    name: "Huyện Ia H' Drai",
    code: 618,
    division_type: 'huyện',
    codename: 'huyen_ia_h_drai',
    province_code: 62,
    wards: []
  },
  {
    name: 'Thành phố Pleiku',
    code: 622,
    division_type: 'thành phố',
    codename: 'thanh_pho_pleiku',
    province_code: 64,
    wards: []
  },
  {
    name: 'Thị xã An Khê',
    code: 623,
    division_type: 'thị xã',
    codename: 'thi_xa_an_khe',
    province_code: 64,
    wards: []
  },
  {
    name: 'Thị xã Ayun Pa',
    code: 624,
    division_type: 'thị xã',
    codename: 'thi_xa_ayun_pa',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện KBang',
    code: 625,
    division_type: 'huyện',
    codename: 'huyen_kbang',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Đăk Đoa',
    code: 626,
    division_type: 'huyện',
    codename: 'huyen_dak_doa',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Chư Păh',
    code: 627,
    division_type: 'huyện',
    codename: 'huyen_chu_pah',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Ia Grai',
    code: 628,
    division_type: 'huyện',
    codename: 'huyen_ia_grai',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Mang Yang',
    code: 629,
    division_type: 'huyện',
    codename: 'huyen_mang_yang',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Kông Chro',
    code: 630,
    division_type: 'huyện',
    codename: 'huyen_kong_chro',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Đức Cơ',
    code: 631,
    division_type: 'huyện',
    codename: 'huyen_duc_co',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Chư Prông',
    code: 632,
    division_type: 'huyện',
    codename: 'huyen_chu_prong',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Chư Sê',
    code: 633,
    division_type: 'huyện',
    codename: 'huyen_chu_se',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Đăk Pơ',
    code: 634,
    division_type: 'huyện',
    codename: 'huyen_dak_po',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Ia Pa',
    code: 635,
    division_type: 'huyện',
    codename: 'huyen_ia_pa',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Krông Pa',
    code: 637,
    division_type: 'huyện',
    codename: 'huyen_krong_pa',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Phú Thiện',
    code: 638,
    division_type: 'huyện',
    codename: 'huyen_phu_thien',
    province_code: 64,
    wards: []
  },
  {
    name: 'Huyện Chư Pưh',
    code: 639,
    division_type: 'huyện',
    codename: 'huyen_chu_puh',
    province_code: 64,
    wards: []
  },
  {
    name: 'Thành phố Buôn Ma Thuột',
    code: 643,
    division_type: 'thành phố',
    codename: 'thanh_pho_buon_ma_thuot',
    province_code: 66,
    wards: []
  },
  {
    name: 'Thị xã Buôn Hồ',
    code: 644,
    division_type: 'thị xã',
    codename: 'thi_xa_buon_ho',
    province_code: 66,
    wards: []
  },
  {
    name: "Huyện Ea H'leo",
    code: 645,
    division_type: 'huyện',
    codename: 'huyen_ea_hleo',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Ea Súp',
    code: 646,
    division_type: 'huyện',
    codename: 'huyen_ea_sup',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Buôn Đôn',
    code: 647,
    division_type: 'huyện',
    codename: 'huyen_buon_don',
    province_code: 66,
    wards: []
  },
  {
    name: "Huyện Cư M'gar",
    code: 648,
    division_type: 'huyện',
    codename: 'huyen_cu_mgar',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Krông Búk',
    code: 649,
    division_type: 'huyện',
    codename: 'huyen_krong_buk',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Krông Năng',
    code: 650,
    division_type: 'huyện',
    codename: 'huyen_krong_nang',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Ea Kar',
    code: 651,
    division_type: 'huyện',
    codename: 'huyen_ea_kar',
    province_code: 66,
    wards: []
  },
  {
    name: "Huyện M'Đrắk",
    code: 652,
    division_type: 'huyện',
    codename: 'huyen_mdrak',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Krông Bông',
    code: 653,
    division_type: 'huyện',
    codename: 'huyen_krong_bong',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Krông Pắc',
    code: 654,
    division_type: 'huyện',
    codename: 'huyen_krong_pac',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Krông A Na',
    code: 655,
    division_type: 'huyện',
    codename: 'huyen_krong_a_na',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Lắk',
    code: 656,
    division_type: 'huyện',
    codename: 'huyen_lak',
    province_code: 66,
    wards: []
  },
  {
    name: 'Huyện Cư Kuin',
    code: 657,
    division_type: 'huyện',
    codename: 'huyen_cu_kuin',
    province_code: 66,
    wards: []
  },
  {
    name: 'Thành phố Gia Nghĩa',
    code: 660,
    division_type: 'thành phố',
    codename: 'thanh_pho_gia_nghia',
    province_code: 67,
    wards: []
  },
  {
    name: 'Huyện Đăk Glong',
    code: 661,
    division_type: 'huyện',
    codename: 'huyen_dak_glong',
    province_code: 67,
    wards: []
  },
  {
    name: 'Huyện Cư Jút',
    code: 662,
    division_type: 'huyện',
    codename: 'huyen_cu_jut',
    province_code: 67,
    wards: []
  },
  {
    name: 'Huyện Đắk Mil',
    code: 663,
    division_type: 'huyện',
    codename: 'huyen_dak_mil',
    province_code: 67,
    wards: []
  },
  {
    name: 'Huyện Krông Nô',
    code: 664,
    division_type: 'huyện',
    codename: 'huyen_krong_no',
    province_code: 67,
    wards: []
  },
  {
    name: 'Huyện Đắk Song',
    code: 665,
    division_type: 'huyện',
    codename: 'huyen_dak_song',
    province_code: 67,
    wards: []
  },
  {
    name: "Huyện Đắk R'Lấp",
    code: 666,
    division_type: 'huyện',
    codename: 'huyen_dak_rlap',
    province_code: 67,
    wards: []
  },
  {
    name: 'Huyện Tuy Đức',
    code: 667,
    division_type: 'huyện',
    codename: 'huyen_tuy_duc',
    province_code: 67,
    wards: []
  },
  {
    name: 'Thành phố Đà Lạt',
    code: 672,
    division_type: 'thành phố',
    codename: 'thanh_pho_da_lat',
    province_code: 68,
    wards: []
  },
  {
    name: 'Thành phố Bảo Lộc',
    code: 673,
    division_type: 'thành phố',
    codename: 'thanh_pho_bao_loc',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Đam Rông',
    code: 674,
    division_type: 'huyện',
    codename: 'huyen_dam_rong',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Lạc Dương',
    code: 675,
    division_type: 'huyện',
    codename: 'huyen_lac_duong',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Lâm Hà',
    code: 676,
    division_type: 'huyện',
    codename: 'huyen_lam_ha',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Đơn Dương',
    code: 677,
    division_type: 'huyện',
    codename: 'huyen_don_duong',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Đức Trọng',
    code: 678,
    division_type: 'huyện',
    codename: 'huyen_duc_trong',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Di Linh',
    code: 679,
    division_type: 'huyện',
    codename: 'huyen_di_linh',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Bảo Lâm',
    code: 680,
    division_type: 'huyện',
    codename: 'huyen_bao_lam',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Đạ Huoai',
    code: 681,
    division_type: 'huyện',
    codename: 'huyen_da_huoai',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Đạ Tẻh',
    code: 682,
    division_type: 'huyện',
    codename: 'huyen_da_teh',
    province_code: 68,
    wards: []
  },
  {
    name: 'Huyện Cát Tiên',
    code: 683,
    division_type: 'huyện',
    codename: 'huyen_cat_tien',
    province_code: 68,
    wards: []
  },
  {
    name: 'Thị xã Phước Long',
    code: 688,
    division_type: 'thị xã',
    codename: 'thi_xa_phuoc_long',
    province_code: 70,
    wards: []
  },
  {
    name: 'Thành phố Đồng Xoài',
    code: 689,
    division_type: 'thành phố',
    codename: 'thanh_pho_dong_xoai',
    province_code: 70,
    wards: []
  },
  {
    name: 'Thị xã Bình Long',
    code: 690,
    division_type: 'thị xã',
    codename: 'thi_xa_binh_long',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Bù Gia Mập',
    code: 691,
    division_type: 'huyện',
    codename: 'huyen_bu_gia_map',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Lộc Ninh',
    code: 692,
    division_type: 'huyện',
    codename: 'huyen_loc_ninh',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Bù Đốp',
    code: 693,
    division_type: 'huyện',
    codename: 'huyen_bu_dop',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Hớn Quản',
    code: 694,
    division_type: 'huyện',
    codename: 'huyen_hon_quan',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Đồng Phú',
    code: 695,
    division_type: 'huyện',
    codename: 'huyen_dong_phu',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Bù Đăng',
    code: 696,
    division_type: 'huyện',
    codename: 'huyen_bu_dang',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Chơn Thành',
    code: 697,
    division_type: 'huyện',
    codename: 'huyen_chon_thanh',
    province_code: 70,
    wards: []
  },
  {
    name: 'Huyện Phú Riềng',
    code: 698,
    division_type: 'huyện',
    codename: 'huyen_phu_rieng',
    province_code: 70,
    wards: []
  },
  {
    name: 'Thành phố Tây Ninh',
    code: 703,
    division_type: 'thành phố',
    codename: 'thanh_pho_tay_ninh',
    province_code: 72,
    wards: []
  },
  {
    name: 'Huyện Tân Biên',
    code: 705,
    division_type: 'huyện',
    codename: 'huyen_tan_bien',
    province_code: 72,
    wards: []
  },
  {
    name: 'Huyện Tân Châu',
    code: 706,
    division_type: 'huyện',
    codename: 'huyen_tan_chau',
    province_code: 72,
    wards: []
  },
  {
    name: 'Huyện Dương Minh Châu',
    code: 707,
    division_type: 'huyện',
    codename: 'huyen_duong_minh_chau',
    province_code: 72,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 708,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 72,
    wards: []
  },
  {
    name: 'Thị xã Hòa Thành',
    code: 709,
    division_type: 'thị xã',
    codename: 'thi_xa_hoa_thanh',
    province_code: 72,
    wards: []
  },
  {
    name: 'Huyện Gò Dầu',
    code: 710,
    division_type: 'huyện',
    codename: 'huyen_go_dau',
    province_code: 72,
    wards: []
  },
  {
    name: 'Huyện Bến Cầu',
    code: 711,
    division_type: 'huyện',
    codename: 'huyen_ben_cau',
    province_code: 72,
    wards: []
  },
  {
    name: 'Thị xã Trảng Bàng',
    code: 712,
    division_type: 'thị xã',
    codename: 'thi_xa_trang_bang',
    province_code: 72,
    wards: []
  },
  {
    name: 'Thành phố Thủ Dầu Một',
    code: 718,
    division_type: 'thành phố',
    codename: 'thanh_pho_thu_dau_mot',
    province_code: 74,
    wards: []
  },
  {
    name: 'Huyện Bàu Bàng',
    code: 719,
    division_type: 'huyện',
    codename: 'huyen_bau_bang',
    province_code: 74,
    wards: []
  },
  {
    name: 'Huyện Dầu Tiếng',
    code: 720,
    division_type: 'huyện',
    codename: 'huyen_dau_tieng',
    province_code: 74,
    wards: []
  },
  {
    name: 'Thị xã Bến Cát',
    code: 721,
    division_type: 'thị xã',
    codename: 'thi_xa_ben_cat',
    province_code: 74,
    wards: []
  },
  {
    name: 'Huyện Phú Giáo',
    code: 722,
    division_type: 'huyện',
    codename: 'huyen_phu_giao',
    province_code: 74,
    wards: []
  },
  {
    name: 'Thị xã Tân Uyên',
    code: 723,
    division_type: 'thị xã',
    codename: 'thi_xa_tan_uyen',
    province_code: 74,
    wards: []
  },
  {
    name: 'Thành phố Dĩ An',
    code: 724,
    division_type: 'thành phố',
    codename: 'thanh_pho_di_an',
    province_code: 74,
    wards: []
  },
  {
    name: 'Thành phố Thuận An',
    code: 725,
    division_type: 'thành phố',
    codename: 'thanh_pho_thuan_an',
    province_code: 74,
    wards: []
  },
  {
    name: 'Huyện Bắc Tân Uyên',
    code: 726,
    division_type: 'huyện',
    codename: 'huyen_bac_tan_uyen',
    province_code: 74,
    wards: []
  },
  {
    name: 'Thành phố Biên Hòa',
    code: 731,
    division_type: 'thành phố',
    codename: 'thanh_pho_bien_hoa',
    province_code: 75,
    wards: []
  },
  {
    name: 'Thành phố Long Khánh',
    code: 732,
    division_type: 'thành phố',
    codename: 'thanh_pho_long_khanh',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Tân Phú',
    code: 734,
    division_type: 'huyện',
    codename: 'huyen_tan_phu',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Cửu',
    code: 735,
    division_type: 'huyện',
    codename: 'huyen_vinh_cuu',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Định Quán',
    code: 736,
    division_type: 'huyện',
    codename: 'huyen_dinh_quan',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Trảng Bom',
    code: 737,
    division_type: 'huyện',
    codename: 'huyen_trang_bom',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Thống Nhất',
    code: 738,
    division_type: 'huyện',
    codename: 'huyen_thong_nhat',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Cẩm Mỹ',
    code: 739,
    division_type: 'huyện',
    codename: 'huyen_cam_my',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Long Thành',
    code: 740,
    division_type: 'huyện',
    codename: 'huyen_long_thanh',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Xuân Lộc',
    code: 741,
    division_type: 'huyện',
    codename: 'huyen_xuan_loc',
    province_code: 75,
    wards: []
  },
  {
    name: 'Huyện Nhơn Trạch',
    code: 742,
    division_type: 'huyện',
    codename: 'huyen_nhon_trach',
    province_code: 75,
    wards: []
  },
  {
    name: 'Thành phố Vũng Tàu',
    code: 747,
    division_type: 'thành phố',
    codename: 'thanh_pho_vung_tau',
    province_code: 77,
    wards: []
  },
  {
    name: 'Thành phố Bà Rịa',
    code: 748,
    division_type: 'thành phố',
    codename: 'thanh_pho_ba_ria',
    province_code: 77,
    wards: []
  },
  {
    name: 'Huyện Châu Đức',
    code: 750,
    division_type: 'huyện',
    codename: 'huyen_chau_duc',
    province_code: 77,
    wards: []
  },
  {
    name: 'Huyện Xuyên Mộc',
    code: 751,
    division_type: 'huyện',
    codename: 'huyen_xuyen_moc',
    province_code: 77,
    wards: []
  },
  {
    name: 'Huyện Long Điền',
    code: 752,
    division_type: 'huyện',
    codename: 'huyen_long_dien',
    province_code: 77,
    wards: []
  },
  {
    name: 'Huyện Đất Đỏ',
    code: 753,
    division_type: 'huyện',
    codename: 'huyen_dat_do',
    province_code: 77,
    wards: []
  },
  {
    name: 'Thị xã Phú Mỹ',
    code: 754,
    division_type: 'thị xã',
    codename: 'thi_xa_phu_my',
    province_code: 77,
    wards: []
  },
  {
    name: 'Huyện Côn Đảo',
    code: 755,
    division_type: 'huyện',
    codename: 'huyen_con_dao',
    province_code: 77,
    wards: []
  },
  {
    name: 'Quận 1',
    code: 760,
    division_type: 'quận',
    codename: 'quan_1',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 12',
    code: 761,
    division_type: 'quận',
    codename: 'quan_12',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận Gò Vấp',
    code: 764,
    division_type: 'quận',
    codename: 'quan_go_vap',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận Bình Thạnh',
    code: 765,
    division_type: 'quận',
    codename: 'quan_binh_thanh',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận Tân Bình',
    code: 766,
    division_type: 'quận',
    codename: 'quan_tan_binh',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận Tân Phú',
    code: 767,
    division_type: 'quận',
    codename: 'quan_tan_phu',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận Phú Nhuận',
    code: 768,
    division_type: 'quận',
    codename: 'quan_phu_nhuan',
    province_code: 79,
    wards: []
  },
  {
    name: 'Thành phố Thủ Đức',
    code: 769,
    division_type: 'thành phố',
    codename: 'thanh_pho_thu_duc',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 3',
    code: 770,
    division_type: 'quận',
    codename: 'quan_3',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 10',
    code: 771,
    division_type: 'quận',
    codename: 'quan_10',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 11',
    code: 772,
    division_type: 'quận',
    codename: 'quan_11',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 4',
    code: 773,
    division_type: 'quận',
    codename: 'quan_4',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 5',
    code: 774,
    division_type: 'quận',
    codename: 'quan_5',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 6',
    code: 775,
    division_type: 'quận',
    codename: 'quan_6',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 8',
    code: 776,
    division_type: 'quận',
    codename: 'quan_8',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận Bình Tân',
    code: 777,
    division_type: 'quận',
    codename: 'quan_binh_tan',
    province_code: 79,
    wards: []
  },
  {
    name: 'Quận 7',
    code: 778,
    division_type: 'quận',
    codename: 'quan_7',
    province_code: 79,
    wards: []
  },
  {
    name: 'Huyện Củ Chi',
    code: 783,
    division_type: 'huyện',
    codename: 'huyen_cu_chi',
    province_code: 79,
    wards: []
  },
  {
    name: 'Huyện Hóc Môn',
    code: 784,
    division_type: 'huyện',
    codename: 'huyen_hoc_mon',
    province_code: 79,
    wards: []
  },
  {
    name: 'Huyện Bình Chánh',
    code: 785,
    division_type: 'huyện',
    codename: 'huyen_binh_chanh',
    province_code: 79,
    wards: []
  },
  {
    name: 'Huyện Nhà Bè',
    code: 786,
    division_type: 'huyện',
    codename: 'huyen_nha_be',
    province_code: 79,
    wards: []
  },
  {
    name: 'Huyện Cần Giờ',
    code: 787,
    division_type: 'huyện',
    codename: 'huyen_can_gio',
    province_code: 79,
    wards: []
  },
  {
    name: 'Thành phố Tân An',
    code: 794,
    division_type: 'thành phố',
    codename: 'thanh_pho_tan_an',
    province_code: 80,
    wards: []
  },
  {
    name: 'Thị xã Kiến Tường',
    code: 795,
    division_type: 'thị xã',
    codename: 'thi_xa_kien_tuong',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Tân Hưng',
    code: 796,
    division_type: 'huyện',
    codename: 'huyen_tan_hung',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Hưng',
    code: 797,
    division_type: 'huyện',
    codename: 'huyen_vinh_hung',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Mộc Hóa',
    code: 798,
    division_type: 'huyện',
    codename: 'huyen_moc_hoa',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Tân Thạnh',
    code: 799,
    division_type: 'huyện',
    codename: 'huyen_tan_thanh',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Thạnh Hóa',
    code: 800,
    division_type: 'huyện',
    codename: 'huyen_thanh_hoa',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Đức Huệ',
    code: 801,
    division_type: 'huyện',
    codename: 'huyen_duc_hue',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Đức Hòa',
    code: 802,
    division_type: 'huyện',
    codename: 'huyen_duc_hoa',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Bến Lức',
    code: 803,
    division_type: 'huyện',
    codename: 'huyen_ben_luc',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Thủ Thừa',
    code: 804,
    division_type: 'huyện',
    codename: 'huyen_thu_thua',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Tân Trụ',
    code: 805,
    division_type: 'huyện',
    codename: 'huyen_tan_tru',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Cần Đước',
    code: 806,
    division_type: 'huyện',
    codename: 'huyen_can_duoc',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Cần Giuộc',
    code: 807,
    division_type: 'huyện',
    codename: 'huyen_can_giuoc',
    province_code: 80,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 808,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 80,
    wards: []
  },
  {
    name: 'Thành phố Mỹ Tho',
    code: 815,
    division_type: 'thành phố',
    codename: 'thanh_pho_my_tho',
    province_code: 82,
    wards: []
  },
  {
    name: 'Thị xã Gò Công',
    code: 816,
    division_type: 'thị xã',
    codename: 'thi_xa_go_cong',
    province_code: 82,
    wards: []
  },
  {
    name: 'Thị xã Cai Lậy',
    code: 817,
    division_type: 'thị xã',
    codename: 'thi_xa_cai_lay',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Tân Phước',
    code: 818,
    division_type: 'huyện',
    codename: 'huyen_tan_phuoc',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Cái Bè',
    code: 819,
    division_type: 'huyện',
    codename: 'huyen_cai_be',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Cai Lậy',
    code: 820,
    division_type: 'huyện',
    codename: 'huyen_cai_lay',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 821,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Chợ Gạo',
    code: 822,
    division_type: 'huyện',
    codename: 'huyen_cho_gao',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Gò Công Tây',
    code: 823,
    division_type: 'huyện',
    codename: 'huyen_go_cong_tay',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Gò Công Đông',
    code: 824,
    division_type: 'huyện',
    codename: 'huyen_go_cong_dong',
    province_code: 82,
    wards: []
  },
  {
    name: 'Huyện Tân Phú Đông',
    code: 825,
    division_type: 'huyện',
    codename: 'huyen_tan_phu_dong',
    province_code: 82,
    wards: []
  },
  {
    name: 'Thành phố Bến Tre',
    code: 829,
    division_type: 'thành phố',
    codename: 'thanh_pho_ben_tre',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 831,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Chợ Lách',
    code: 832,
    division_type: 'huyện',
    codename: 'huyen_cho_lach',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Mỏ Cày Nam',
    code: 833,
    division_type: 'huyện',
    codename: 'huyen_mo_cay_nam',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Giồng Trôm',
    code: 834,
    division_type: 'huyện',
    codename: 'huyen_giong_trom',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Bình Đại',
    code: 835,
    division_type: 'huyện',
    codename: 'huyen_binh_dai',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Ba Tri',
    code: 836,
    division_type: 'huyện',
    codename: 'huyen_ba_tri',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Thạnh Phú',
    code: 837,
    division_type: 'huyện',
    codename: 'huyen_thanh_phu',
    province_code: 83,
    wards: []
  },
  {
    name: 'Huyện Mỏ Cày Bắc',
    code: 838,
    division_type: 'huyện',
    codename: 'huyen_mo_cay_bac',
    province_code: 83,
    wards: []
  },
  {
    name: 'Thành phố Trà Vinh',
    code: 842,
    division_type: 'thành phố',
    codename: 'thanh_pho_tra_vinh',
    province_code: 84,
    wards: []
  },
  {
    name: 'Huyện Càng Long',
    code: 844,
    division_type: 'huyện',
    codename: 'huyen_cang_long',
    province_code: 84,
    wards: []
  },
  {
    name: 'Huyện Cầu Kè',
    code: 845,
    division_type: 'huyện',
    codename: 'huyen_cau_ke',
    province_code: 84,
    wards: []
  },
  {
    name: 'Huyện Tiểu Cần',
    code: 846,
    division_type: 'huyện',
    codename: 'huyen_tieu_can',
    province_code: 84,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 847,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 84,
    wards: []
  },
  {
    name: 'Huyện Cầu Ngang',
    code: 848,
    division_type: 'huyện',
    codename: 'huyen_cau_ngang',
    province_code: 84,
    wards: []
  },
  {
    name: 'Huyện Trà Cú',
    code: 849,
    division_type: 'huyện',
    codename: 'huyen_tra_cu',
    province_code: 84,
    wards: []
  },
  {
    name: 'Huyện Duyên Hải',
    code: 850,
    division_type: 'huyện',
    codename: 'huyen_duyen_hai',
    province_code: 84,
    wards: []
  },
  {
    name: 'Thị xã Duyên Hải',
    code: 851,
    division_type: 'thị xã',
    codename: 'thi_xa_duyen_hai',
    province_code: 84,
    wards: []
  },
  {
    name: 'Thành phố Vĩnh Long',
    code: 855,
    division_type: 'thành phố',
    codename: 'thanh_pho_vinh_long',
    province_code: 86,
    wards: []
  },
  {
    name: 'Huyện Long Hồ',
    code: 857,
    division_type: 'huyện',
    codename: 'huyen_long_ho',
    province_code: 86,
    wards: []
  },
  {
    name: 'Huyện Mang Thít',
    code: 858,
    division_type: 'huyện',
    codename: 'huyen_mang_thit',
    province_code: 86,
    wards: []
  },
  {
    name: 'Huyện Vũng Liêm',
    code: 859,
    division_type: 'huyện',
    codename: 'huyen_vung_liem',
    province_code: 86,
    wards: []
  },
  {
    name: 'Huyện Tam Bình',
    code: 860,
    division_type: 'huyện',
    codename: 'huyen_tam_binh',
    province_code: 86,
    wards: []
  },
  {
    name: 'Thị xã Bình Minh',
    code: 861,
    division_type: 'thị xã',
    codename: 'thi_xa_binh_minh',
    province_code: 86,
    wards: []
  },
  {
    name: 'Huyện Trà Ôn',
    code: 862,
    division_type: 'huyện',
    codename: 'huyen_tra_on',
    province_code: 86,
    wards: []
  },
  {
    name: 'Huyện Bình Tân',
    code: 863,
    division_type: 'huyện',
    codename: 'huyen_binh_tan',
    province_code: 86,
    wards: []
  },
  {
    name: 'Thành phố Cao Lãnh',
    code: 866,
    division_type: 'thành phố',
    codename: 'thanh_pho_cao_lanh',
    province_code: 87,
    wards: []
  },
  {
    name: 'Thành phố Sa Đéc',
    code: 867,
    division_type: 'thành phố',
    codename: 'thanh_pho_sa_dec',
    province_code: 87,
    wards: []
  },
  {
    name: 'Thành phố Hồng Ngự',
    code: 868,
    division_type: 'thành phố',
    codename: 'thanh_pho_hong_ngu',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Tân Hồng',
    code: 869,
    division_type: 'huyện',
    codename: 'huyen_tan_hong',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Hồng Ngự',
    code: 870,
    division_type: 'huyện',
    codename: 'huyen_hong_ngu',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Tam Nông',
    code: 871,
    division_type: 'huyện',
    codename: 'huyen_tam_nong',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Tháp Mười',
    code: 872,
    division_type: 'huyện',
    codename: 'huyen_thap_muoi',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Cao Lãnh',
    code: 873,
    division_type: 'huyện',
    codename: 'huyen_cao_lanh',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Thanh Bình',
    code: 874,
    division_type: 'huyện',
    codename: 'huyen_thanh_binh',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Lấp Vò',
    code: 875,
    division_type: 'huyện',
    codename: 'huyen_lap_vo',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Lai Vung',
    code: 876,
    division_type: 'huyện',
    codename: 'huyen_lai_vung',
    province_code: 87,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 877,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 87,
    wards: []
  },
  {
    name: 'Thành phố Long Xuyên',
    code: 883,
    division_type: 'thành phố',
    codename: 'thanh_pho_long_xuyen',
    province_code: 89,
    wards: []
  },
  {
    name: 'Thành phố Châu Đốc',
    code: 884,
    division_type: 'thành phố',
    codename: 'thanh_pho_chau_doc',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện An Phú',
    code: 886,
    division_type: 'huyện',
    codename: 'huyen_an_phu',
    province_code: 89,
    wards: []
  },
  {
    name: 'Thị xã Tân Châu',
    code: 887,
    division_type: 'thị xã',
    codename: 'thi_xa_tan_chau',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện Phú Tân',
    code: 888,
    division_type: 'huyện',
    codename: 'huyen_phu_tan',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện Châu Phú',
    code: 889,
    division_type: 'huyện',
    codename: 'huyen_chau_phu',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện Tịnh Biên',
    code: 890,
    division_type: 'huyện',
    codename: 'huyen_tinh_bien',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện Tri Tôn',
    code: 891,
    division_type: 'huyện',
    codename: 'huyen_tri_ton',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 892,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện Chợ Mới',
    code: 893,
    division_type: 'huyện',
    codename: 'huyen_cho_moi',
    province_code: 89,
    wards: []
  },
  {
    name: 'Huyện Thoại Sơn',
    code: 894,
    division_type: 'huyện',
    codename: 'huyen_thoai_son',
    province_code: 89,
    wards: []
  },
  {
    name: 'Thành phố Rạch Giá',
    code: 899,
    division_type: 'thành phố',
    codename: 'thanh_pho_rach_gia',
    province_code: 91,
    wards: []
  },
  {
    name: 'Thành phố Hà Tiên',
    code: 900,
    division_type: 'thành phố',
    codename: 'thanh_pho_ha_tien',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Kiên Lương',
    code: 902,
    division_type: 'huyện',
    codename: 'huyen_kien_luong',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Hòn Đất',
    code: 903,
    division_type: 'huyện',
    codename: 'huyen_hon_dat',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Tân Hiệp',
    code: 904,
    division_type: 'huyện',
    codename: 'huyen_tan_hiep',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 905,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Giồng Riềng',
    code: 906,
    division_type: 'huyện',
    codename: 'huyen_giong_rieng',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Gò Quao',
    code: 907,
    division_type: 'huyện',
    codename: 'huyen_go_quao',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện An Biên',
    code: 908,
    division_type: 'huyện',
    codename: 'huyen_an_bien',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện An Minh',
    code: 909,
    division_type: 'huyện',
    codename: 'huyen_an_minh',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Thuận',
    code: 910,
    division_type: 'huyện',
    codename: 'huyen_vinh_thuan',
    province_code: 91,
    wards: []
  },
  {
    name: 'Thành phố Phú Quốc',
    code: 911,
    division_type: 'thành phố',
    codename: 'thanh_pho_phu_quoc',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Kiên Hải',
    code: 912,
    division_type: 'huyện',
    codename: 'huyen_kien_hai',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện U Minh Thượng',
    code: 913,
    division_type: 'huyện',
    codename: 'huyen_u_minh_thuong',
    province_code: 91,
    wards: []
  },
  {
    name: 'Huyện Giang Thành',
    code: 914,
    division_type: 'huyện',
    codename: 'huyen_giang_thanh',
    province_code: 91,
    wards: []
  },
  {
    name: 'Quận Ninh Kiều',
    code: 916,
    division_type: 'quận',
    codename: 'quan_ninh_kieu',
    province_code: 92,
    wards: []
  },
  {
    name: 'Quận Ô Môn',
    code: 917,
    division_type: 'quận',
    codename: 'quan_o_mon',
    province_code: 92,
    wards: []
  },
  {
    name: 'Quận Bình Thuỷ',
    code: 918,
    division_type: 'quận',
    codename: 'quan_binh_thuy',
    province_code: 92,
    wards: []
  },
  {
    name: 'Quận Cái Răng',
    code: 919,
    division_type: 'quận',
    codename: 'quan_cai_rang',
    province_code: 92,
    wards: []
  },
  {
    name: 'Quận Thốt Nốt',
    code: 923,
    division_type: 'quận',
    codename: 'quan_thot_not',
    province_code: 92,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Thạnh',
    code: 924,
    division_type: 'huyện',
    codename: 'huyen_vinh_thanh',
    province_code: 92,
    wards: []
  },
  {
    name: 'Huyện Cờ Đỏ',
    code: 925,
    division_type: 'huyện',
    codename: 'huyen_co_do',
    province_code: 92,
    wards: []
  },
  {
    name: 'Huyện Phong Điền',
    code: 926,
    division_type: 'huyện',
    codename: 'huyen_phong_dien',
    province_code: 92,
    wards: []
  },
  {
    name: 'Huyện Thới Lai',
    code: 927,
    division_type: 'huyện',
    codename: 'huyen_thoi_lai',
    province_code: 92,
    wards: []
  },
  {
    name: 'Thành phố Vị Thanh',
    code: 930,
    division_type: 'thành phố',
    codename: 'thanh_pho_vi_thanh',
    province_code: 93,
    wards: []
  },
  {
    name: 'Thành phố Ngã Bảy',
    code: 931,
    division_type: 'thành phố',
    codename: 'thanh_pho_nga_bay',
    province_code: 93,
    wards: []
  },
  {
    name: 'Huyện Châu Thành A',
    code: 932,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh_a',
    province_code: 93,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 933,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 93,
    wards: []
  },
  {
    name: 'Huyện Phụng Hiệp',
    code: 934,
    division_type: 'huyện',
    codename: 'huyen_phung_hiep',
    province_code: 93,
    wards: []
  },
  {
    name: 'Huyện Vị Thuỷ',
    code: 935,
    division_type: 'huyện',
    codename: 'huyen_vi_thuy',
    province_code: 93,
    wards: []
  },
  {
    name: 'Huyện Long Mỹ',
    code: 936,
    division_type: 'huyện',
    codename: 'huyen_long_my',
    province_code: 93,
    wards: []
  },
  {
    name: 'Thị xã Long Mỹ',
    code: 937,
    division_type: 'thị xã',
    codename: 'thi_xa_long_my',
    province_code: 93,
    wards: []
  },
  {
    name: 'Thành phố Sóc Trăng',
    code: 941,
    division_type: 'thành phố',
    codename: 'thanh_pho_soc_trang',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Châu Thành',
    code: 942,
    division_type: 'huyện',
    codename: 'huyen_chau_thanh',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Kế Sách',
    code: 943,
    division_type: 'huyện',
    codename: 'huyen_ke_sach',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Mỹ Tú',
    code: 944,
    division_type: 'huyện',
    codename: 'huyen_my_tu',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Cù Lao Dung',
    code: 945,
    division_type: 'huyện',
    codename: 'huyen_cu_lao_dung',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Long Phú',
    code: 946,
    division_type: 'huyện',
    codename: 'huyen_long_phu',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Mỹ Xuyên',
    code: 947,
    division_type: 'huyện',
    codename: 'huyen_my_xuyen',
    province_code: 94,
    wards: []
  },
  {
    name: 'Thị xã Ngã Năm',
    code: 948,
    division_type: 'thị xã',
    codename: 'thi_xa_nga_nam',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Thạnh Trị',
    code: 949,
    division_type: 'huyện',
    codename: 'huyen_thanh_tri',
    province_code: 94,
    wards: []
  },
  {
    name: 'Thị xã Vĩnh Châu',
    code: 950,
    division_type: 'thị xã',
    codename: 'thi_xa_vinh_chau',
    province_code: 94,
    wards: []
  },
  {
    name: 'Huyện Trần Đề',
    code: 951,
    division_type: 'huyện',
    codename: 'huyen_tran_de',
    province_code: 94,
    wards: []
  },
  {
    name: 'Thành phố Bạc Liêu',
    code: 954,
    division_type: 'thành phố',
    codename: 'thanh_pho_bac_lieu',
    province_code: 95,
    wards: []
  },
  {
    name: 'Huyện Hồng Dân',
    code: 956,
    division_type: 'huyện',
    codename: 'huyen_hong_dan',
    province_code: 95,
    wards: []
  },
  {
    name: 'Huyện Phước Long',
    code: 957,
    division_type: 'huyện',
    codename: 'huyen_phuoc_long',
    province_code: 95,
    wards: []
  },
  {
    name: 'Huyện Vĩnh Lợi',
    code: 958,
    division_type: 'huyện',
    codename: 'huyen_vinh_loi',
    province_code: 95,
    wards: []
  },
  {
    name: 'Thị xã Giá Rai',
    code: 959,
    division_type: 'thị xã',
    codename: 'thi_xa_gia_rai',
    province_code: 95,
    wards: []
  },
  {
    name: 'Huyện Đông Hải',
    code: 960,
    division_type: 'huyện',
    codename: 'huyen_dong_hai',
    province_code: 95,
    wards: []
  },
  {
    name: 'Huyện Hoà Bình',
    code: 961,
    division_type: 'huyện',
    codename: 'huyen_hoa_binh',
    province_code: 95,
    wards: []
  },
  {
    name: 'Thành phố Cà Mau',
    code: 964,
    division_type: 'thành phố',
    codename: 'thanh_pho_ca_mau',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện U Minh',
    code: 966,
    division_type: 'huyện',
    codename: 'huyen_u_minh',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện Thới Bình',
    code: 967,
    division_type: 'huyện',
    codename: 'huyen_thoi_binh',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện Trần Văn Thời',
    code: 968,
    division_type: 'huyện',
    codename: 'huyen_tran_van_thoi',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện Cái Nước',
    code: 969,
    division_type: 'huyện',
    codename: 'huyen_cai_nuoc',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện Đầm Dơi',
    code: 970,
    division_type: 'huyện',
    codename: 'huyen_dam_doi',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện Năm Căn',
    code: 971,
    division_type: 'huyện',
    codename: 'huyen_nam_can',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện Phú Tân',
    code: 972,
    division_type: 'huyện',
    codename: 'huyen_phu_tan',
    province_code: 96,
    wards: []
  },
  {
    name: 'Huyện Ngọc Hiển',
    code: 973,
    division_type: 'huyện',
    codename: 'huyen_ngoc_hien',
    province_code: 96,
    wards: []
  }
];
