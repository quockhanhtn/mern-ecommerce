import PropTypes from 'prop-types';
// material
import { Autocomplete, TextField } from '@material-ui/core';

// ----------------------------------------------------------------------

ProvincePicker.propTypes = {
  getFieldProps: PropTypes.func.isRequired,
  touched: PropTypes.any,
  errors: PropTypes.object,
  label: PropTypes.string.isRequired,
  defaultProvinceName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

ProvincePicker.defaultProps = {
  touched: false,
  errors: {},
  defaultProvinceName: '',
  value: ''
};

export default function ProvincePicker({
  getFieldProps,
  touched,
  errors,
  label,
  defaultProvinceName,
  value,
  onChange,
  ...other
}) {
  const handleOnChange = (option, value) => {
    const defaultValue = PROVINCES.find((p) => p.name === value?.name);
    onChange(defaultValue);
  };

  return (
    <Autocomplete
      options={PROVINCES.map((p) => ({ name: p.name }))}
      value={PROVINCES.find((p) => p.name === value)}
      defaultValue={PROVINCES.find((p) => p.name === defaultProvinceName)}
      onChange={handleOnChange}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="none"
          {...getFieldProps('province')}
          error={Boolean(touched.province && errors.province)}
          helperText={touched.province && errors.province}
        />
      )}
      {...other}
    />
  );
}

export const getProvinceCode = (name) => {
  const province = PROVINCES.find((p) => p.name === name);
  return province?.code;
};

const PROVINCES = [
  {
    name: 'Thành phố Hà Nội',
    code: 1,
    division_type: 'thành phố trung ương',
    codename: 'thanh_pho_ha_noi',
    phone_code: 24
  },
  {
    name: 'Tỉnh Hà Giang',
    code: 2,
    division_type: 'tỉnh',
    codename: 'tinh_ha_giang',
    phone_code: 219
  },
  {
    name: 'Tỉnh Cao Bằng',
    code: 4,
    division_type: 'tỉnh',
    codename: 'tinh_cao_bang',
    phone_code: 206
  },
  {
    name: 'Tỉnh Bắc Kạn',
    code: 6,
    division_type: 'tỉnh',
    codename: 'tinh_bac_kan',
    phone_code: 209
  },
  {
    name: 'Tỉnh Tuyên Quang',
    code: 8,
    division_type: 'tỉnh',
    codename: 'tinh_tuyen_quang',
    phone_code: 207
  },
  {
    name: 'Tỉnh Lào Cai',
    code: 10,
    division_type: 'tỉnh',
    codename: 'tinh_lao_cai',
    phone_code: 214
  },
  {
    name: 'Tỉnh Điện Biên',
    code: 11,
    division_type: 'tỉnh',
    codename: 'tinh_dien_bien',
    phone_code: 215
  },
  {
    name: 'Tỉnh Lai Châu',
    code: 12,
    division_type: 'tỉnh',
    codename: 'tinh_lai_chau',
    phone_code: 213
  },
  {
    name: 'Tỉnh Sơn La',
    code: 14,
    division_type: 'tỉnh',
    codename: 'tinh_son_la',
    phone_code: 212
  },
  {
    name: 'Tỉnh Yên Bái',
    code: 15,
    division_type: 'tỉnh',
    codename: 'tinh_yen_bai',
    phone_code: 216
  },
  {
    name: 'Tỉnh Hoà Bình',
    code: 17,
    division_type: 'tỉnh',
    codename: 'tinh_hoa_binh',
    phone_code: 218
  },
  {
    name: 'Tỉnh Thái Nguyên',
    code: 19,
    division_type: 'tỉnh',
    codename: 'tinh_thai_nguyen',
    phone_code: 208
  },
  {
    name: 'Tỉnh Lạng Sơn',
    code: 20,
    division_type: 'tỉnh',
    codename: 'tinh_lang_son',
    phone_code: 205
  },
  {
    name: 'Tỉnh Quảng Ninh',
    code: 22,
    division_type: 'tỉnh',
    codename: 'tinh_quang_ninh',
    phone_code: 203
  },
  {
    name: 'Tỉnh Bắc Giang',
    code: 24,
    division_type: 'tỉnh',
    codename: 'tinh_bac_giang',
    phone_code: 204
  },
  {
    name: 'Tỉnh Phú Thọ',
    code: 25,
    division_type: 'tỉnh',
    codename: 'tinh_phu_tho',
    phone_code: 210
  },
  {
    name: 'Tỉnh Vĩnh Phúc',
    code: 26,
    division_type: 'tỉnh',
    codename: 'tinh_vinh_phuc',
    phone_code: 211
  },
  {
    name: 'Tỉnh Bắc Ninh',
    code: 27,
    division_type: 'tỉnh',
    codename: 'tinh_bac_ninh',
    phone_code: 222
  },
  {
    name: 'Tỉnh Hải Dương',
    code: 30,
    division_type: 'tỉnh',
    codename: 'tinh_hai_duong',
    phone_code: 220
  },
  {
    name: 'Thành phố Hải Phòng',
    code: 31,
    division_type: 'thành phố trung ương',
    codename: 'thanh_pho_hai_phong',
    phone_code: 225
  },
  {
    name: 'Tỉnh Hưng Yên',
    code: 33,
    division_type: 'tỉnh',
    codename: 'tinh_hung_yen',
    phone_code: 221
  },
  {
    name: 'Tỉnh Thái Bình',
    code: 34,
    division_type: 'tỉnh',
    codename: 'tinh_thai_binh',
    phone_code: 227
  },
  {
    name: 'Tỉnh Hà Nam',
    code: 35,
    division_type: 'tỉnh',
    codename: 'tinh_ha_nam',
    phone_code: 226
  },
  {
    name: 'Tỉnh Nam Định',
    code: 36,
    division_type: 'tỉnh',
    codename: 'tinh_nam_dinh',
    phone_code: 228
  },
  {
    name: 'Tỉnh Ninh Bình',
    code: 37,
    division_type: 'tỉnh',
    codename: 'tinh_ninh_binh',
    phone_code: 229
  },
  {
    name: 'Tỉnh Thanh Hóa',
    code: 38,
    division_type: 'tỉnh',
    codename: 'tinh_thanh_hoa',
    phone_code: 237
  },
  {
    name: 'Tỉnh Nghệ An',
    code: 40,
    division_type: 'tỉnh',
    codename: 'tinh_nghe_an',
    phone_code: 238
  },
  {
    name: 'Tỉnh Hà Tĩnh',
    code: 42,
    division_type: 'tỉnh',
    codename: 'tinh_ha_tinh',
    phone_code: 239
  },
  {
    name: 'Tỉnh Quảng Bình',
    code: 44,
    division_type: 'tỉnh',
    codename: 'tinh_quang_binh',
    phone_code: 232
  },
  {
    name: 'Tỉnh Quảng Trị',
    code: 45,
    division_type: 'tỉnh',
    codename: 'tinh_quang_tri',
    phone_code: 233
  },
  {
    name: 'Tỉnh Thừa Thiên Huế',
    code: 46,
    division_type: 'tỉnh',
    codename: 'tinh_thua_thien_hue',
    phone_code: 234
  },
  {
    name: 'Thành phố Đà Nẵng',
    code: 48,
    division_type: 'thành phố trung ương',
    codename: 'thanh_pho_da_nang',
    phone_code: 236
  },
  {
    name: 'Tỉnh Quảng Nam',
    code: 49,
    division_type: 'tỉnh',
    codename: 'tinh_quang_nam',
    phone_code: 235
  },
  {
    name: 'Tỉnh Quảng Ngãi',
    code: 51,
    division_type: 'tỉnh',
    codename: 'tinh_quang_ngai',
    phone_code: 255
  },
  {
    name: 'Tỉnh Bình Định',
    code: 52,
    division_type: 'tỉnh',
    codename: 'tinh_binh_dinh',
    phone_code: 256
  },
  {
    name: 'Tỉnh Phú Yên',
    code: 54,
    division_type: 'tỉnh',
    codename: 'tinh_phu_yen',
    phone_code: 257
  },
  {
    name: 'Tỉnh Khánh Hòa',
    code: 56,
    division_type: 'tỉnh',
    codename: 'tinh_khanh_hoa',
    phone_code: 258
  },
  {
    name: 'Tỉnh Ninh Thuận',
    code: 58,
    division_type: 'tỉnh',
    codename: 'tinh_ninh_thuan',
    phone_code: 259
  },
  {
    name: 'Tỉnh Bình Thuận',
    code: 60,
    division_type: 'tỉnh',
    codename: 'tinh_binh_thuan',
    phone_code: 252
  },
  {
    name: 'Tỉnh Kon Tum',
    code: 62,
    division_type: 'tỉnh',
    codename: 'tinh_kon_tum',
    phone_code: 260
  },
  {
    name: 'Tỉnh Gia Lai',
    code: 64,
    division_type: 'tỉnh',
    codename: 'tinh_gia_lai',
    phone_code: 269
  },
  {
    name: 'Tỉnh Đắk Lắk',
    code: 66,
    division_type: 'tỉnh',
    codename: 'tinh_dak_lak',
    phone_code: 262
  },
  {
    name: 'Tỉnh Đắk Nông',
    code: 67,
    division_type: 'tỉnh',
    codename: 'tinh_dak_nong',
    phone_code: 261
  },
  {
    name: 'Tỉnh Lâm Đồng',
    code: 68,
    division_type: 'tỉnh',
    codename: 'tinh_lam_dong',
    phone_code: 263
  },
  {
    name: 'Tỉnh Bình Phước',
    code: 70,
    division_type: 'tỉnh',
    codename: 'tinh_binh_phuoc',
    phone_code: 271
  },
  {
    name: 'Tỉnh Tây Ninh',
    code: 72,
    division_type: 'tỉnh',
    codename: 'tinh_tay_ninh',
    phone_code: 276
  },
  {
    name: 'Tỉnh Bình Dương',
    code: 74,
    division_type: 'tỉnh',
    codename: 'tinh_binh_duong',
    phone_code: 274
  },
  {
    name: 'Tỉnh Đồng Nai',
    code: 75,
    division_type: 'tỉnh',
    codename: 'tinh_dong_nai',
    phone_code: 251
  },
  {
    name: 'Tỉnh Bà Rịa - Vũng Tàu',
    code: 77,
    division_type: 'tỉnh',
    codename: 'tinh_ba_ria_vung_tau',
    phone_code: 254
  },
  {
    name: 'Thành phố Hồ Chí Minh',
    code: 79,
    division_type: 'thành phố trung ương',
    codename: 'thanh_pho_ho_chi_minh',
    phone_code: 28
  },
  {
    name: 'Tỉnh Long An',
    code: 80,
    division_type: 'tỉnh',
    codename: 'tinh_long_an',
    phone_code: 272
  },
  {
    name: 'Tỉnh Tiền Giang',
    code: 82,
    division_type: 'tỉnh',
    codename: 'tinh_tien_giang',
    phone_code: 273
  },
  {
    name: 'Tỉnh Bến Tre',
    code: 83,
    division_type: 'tỉnh',
    codename: 'tinh_ben_tre',
    phone_code: 275
  },
  {
    name: 'Tỉnh Trà Vinh',
    code: 84,
    division_type: 'tỉnh',
    codename: 'tinh_tra_vinh',
    phone_code: 294
  },
  {
    name: 'Tỉnh Vĩnh Long',
    code: 86,
    division_type: 'tỉnh',
    codename: 'tinh_vinh_long',
    phone_code: 270
  },
  {
    name: 'Tỉnh Đồng Tháp',
    code: 87,
    division_type: 'tỉnh',
    codename: 'tinh_dong_thap',
    phone_code: 277
  },
  {
    name: 'Tỉnh An Giang',
    code: 89,
    division_type: 'tỉnh',
    codename: 'tinh_an_giang',
    phone_code: 296
  },
  {
    name: 'Tỉnh Kiên Giang',
    code: 91,
    division_type: 'tỉnh',
    codename: 'tinh_kien_giang',
    phone_code: 297
  },
  {
    name: 'Thành phố Cần Thơ',
    code: 92,
    division_type: 'thành phố trung ương',
    codename: 'thanh_pho_can_tho',
    phone_code: 292
  },
  {
    name: 'Tỉnh Hậu Giang',
    code: 93,
    division_type: 'tỉnh',
    codename: 'tinh_hau_giang',
    phone_code: 293
  },
  {
    name: 'Tỉnh Sóc Trăng',
    code: 94,
    division_type: 'tỉnh',
    codename: 'tinh_soc_trang',
    phone_code: 299
  },
  {
    name: 'Tỉnh Bạc Liêu',
    code: 95,
    division_type: 'tỉnh',
    codename: 'tinh_bac_lieu',
    phone_code: 291
  },
  {
    name: 'Tỉnh Cà Mau',
    code: 96,
    division_type: 'tỉnh',
    codename: 'tinh_ca_mau',
    phone_code: 290
  }
];
