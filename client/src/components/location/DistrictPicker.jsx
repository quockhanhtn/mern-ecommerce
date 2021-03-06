import PropTypes from 'prop-types';
// material
import { Autocomplete, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
// ----------------------------------------------------------------------

DistrictPicker.propTypes = {
  getFieldProps: PropTypes.func,
  touched: PropTypes.any,
  errors: PropTypes.object,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  provinceCode: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

DistrictPicker.defaultProps = {
  touched: false,
  errors: {},
  value: '',
  provinceCode: ''
};

export default function DistrictPicker({
  getFieldProps,
  touched,
  errors,
  label,
  value,
  defaultDistrictName,
  provinceCode,
  onChange,
  ...other
}) {
  const listDistricts = DISTRICTS.filter((district) => district.province_code === provinceCode);
  const [districts, setDistricts] = useState(listDistricts);

  useEffect(() => {
    const listDistrictsTemp = DISTRICTS.filter((d) => d.province_code === provinceCode);
    setDistricts(listDistrictsTemp);
  }, [provinceCode]);

  // useEffect(() => {
  //   const defaultValue = districts.find((district) => district?.name === defaultDistrictName);
  //   onChange(defaultValue);
  //   console.log('defaultValue', defaultDistrictName);
  // }, [defaultDistrictName]);

  const handleOnChange = (option, value) => {
    const defaultValue = districts.find((district) => district?.name === value?.name);
    onChange(defaultValue);
  };

  return (
    <Autocomplete
      options={districts.map((d) => ({ name: d.name }))}
      value={districts.find((d) => d.name === value)}
      onChange={handleOnChange}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="none"
          {...getFieldProps('district')}
          error={Boolean(touched.district && errors.district)}
          helperText={touched.district && errors.district}
        />
      )}
      {...other}
    />
  );
}

export const getDistrictCode = (name) => {
  const district = DISTRICTS.find((d) => d.name === name);
  return district?.code;
};

const DISTRICTS = [
  {
    name: 'Qu???n Ba ????nh',
    code: 1,
    division_type: 'qu???n',
    codename: 'quan_ba_dinh',
    province_code: 1
  },
  {
    name: 'Qu???n Ho??n Ki???m',
    code: 2,
    division_type: 'qu???n',
    codename: 'quan_hoan_kiem',
    province_code: 1
  },
  {
    name: 'Qu???n T??y H???',
    code: 3,
    division_type: 'qu???n',
    codename: 'quan_tay_ho',
    province_code: 1
  },
  {
    name: 'Qu???n Long Bi??n',
    code: 4,
    division_type: 'qu???n',
    codename: 'quan_long_bien',
    province_code: 1
  },
  {
    name: 'Qu???n C???u Gi???y',
    code: 5,
    division_type: 'qu???n',
    codename: 'quan_cau_giay',
    province_code: 1
  },
  {
    name: 'Qu???n ?????ng ??a',
    code: 6,
    division_type: 'qu???n',
    codename: 'quan_dong_da',
    province_code: 1
  },
  {
    name: 'Qu???n Hai B?? Tr??ng',
    code: 7,
    division_type: 'qu???n',
    codename: 'quan_hai_ba_trung',
    province_code: 1
  },
  {
    name: 'Qu???n Ho??ng Mai',
    code: 8,
    division_type: 'qu???n',
    codename: 'quan_hoang_mai',
    province_code: 1
  },
  {
    name: 'Qu???n Thanh Xu??n',
    code: 9,
    division_type: 'qu???n',
    codename: 'quan_thanh_xuan',
    province_code: 1
  },
  {
    name: 'Huy???n S??c S??n',
    code: 16,
    division_type: 'huy???n',
    codename: 'huyen_soc_son',
    province_code: 1
  },
  {
    name: 'Huy???n ????ng Anh',
    code: 17,
    division_type: 'huy???n',
    codename: 'huyen_dong_anh',
    province_code: 1
  },
  {
    name: 'Huy???n Gia L??m',
    code: 18,
    division_type: 'huy???n',
    codename: 'huyen_gia_lam',
    province_code: 1
  },
  {
    name: 'Qu???n Nam T??? Li??m',
    code: 19,
    division_type: 'qu???n',
    codename: 'quan_nam_tu_liem',
    province_code: 1
  },
  {
    name: 'Huy???n Thanh Tr??',
    code: 20,
    division_type: 'huy???n',
    codename: 'huyen_thanh_tri',
    province_code: 1
  },
  {
    name: 'Qu???n B???c T??? Li??m',
    code: 21,
    division_type: 'qu???n',
    codename: 'quan_bac_tu_liem',
    province_code: 1
  },
  {
    name: 'Huy???n M?? Linh',
    code: 250,
    division_type: 'huy???n',
    codename: 'huyen_me_linh',
    province_code: 1
  },
  {
    name: 'Qu???n H?? ????ng',
    code: 268,
    division_type: 'qu???n',
    codename: 'quan_ha_dong',
    province_code: 1
  },
  {
    name: 'Th??? x?? S??n T??y',
    code: 269,
    division_type: 'th??? x??',
    codename: 'thi_xa_son_tay',
    province_code: 1
  },
  {
    name: 'Huy???n Ba V??',
    code: 271,
    division_type: 'huy???n',
    codename: 'huyen_ba_vi',
    province_code: 1
  },
  {
    name: 'Huy???n Ph??c Th???',
    code: 272,
    division_type: 'huy???n',
    codename: 'huyen_phuc_tho',
    province_code: 1
  },
  {
    name: 'Huy???n ??an Ph?????ng',
    code: 273,
    division_type: 'huy???n',
    codename: 'huyen_dan_phuong',
    province_code: 1
  },
  {
    name: 'Huy???n Ho??i ?????c',
    code: 274,
    division_type: 'huy???n',
    codename: 'huyen_hoai_duc',
    province_code: 1
  },
  {
    name: 'Huy???n Qu???c Oai',
    code: 275,
    division_type: 'huy???n',
    codename: 'huyen_quoc_oai',
    province_code: 1
  },
  {
    name: 'Huy???n Th???ch Th???t',
    code: 276,
    division_type: 'huy???n',
    codename: 'huyen_thach_that',
    province_code: 1
  },
  {
    name: 'Huy???n Ch????ng M???',
    code: 277,
    division_type: 'huy???n',
    codename: 'huyen_chuong_my',
    province_code: 1
  },
  {
    name: 'Huy???n Thanh Oai',
    code: 278,
    division_type: 'huy???n',
    codename: 'huyen_thanh_oai',
    province_code: 1
  },
  {
    name: 'Huy???n Th?????ng T??n',
    code: 279,
    division_type: 'huy???n',
    codename: 'huyen_thuong_tin',
    province_code: 1
  },
  {
    name: 'Huy???n Ph?? Xuy??n',
    code: 280,
    division_type: 'huy???n',
    codename: 'huyen_phu_xuyen',
    province_code: 1
  },
  {
    name: 'Huy???n ???ng H??a',
    code: 281,
    division_type: 'huy???n',
    codename: 'huyen_ung_hoa',
    province_code: 1
  },
  {
    name: 'Huy???n M??? ?????c',
    code: 282,
    division_type: 'huy???n',
    codename: 'huyen_my_duc',
    province_code: 1
  },
  {
    name: 'Th??nh ph??? H?? Giang',
    code: 24,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ha_giang',
    province_code: 2
  },
  {
    name: 'Huy???n ?????ng V??n',
    code: 26,
    division_type: 'huy???n',
    codename: 'huyen_dong_van',
    province_code: 2
  },
  {
    name: 'Huy???n M??o V???c',
    code: 27,
    division_type: 'huy???n',
    codename: 'huyen_meo_vac',
    province_code: 2
  },
  {
    name: 'Huy???n Y??n Minh',
    code: 28,
    division_type: 'huy???n',
    codename: 'huyen_yen_minh',
    province_code: 2
  },
  {
    name: 'Huy???n Qu???n B???',
    code: 29,
    division_type: 'huy???n',
    codename: 'huyen_quan_ba',
    province_code: 2
  },
  {
    name: 'Huy???n V??? Xuy??n',
    code: 30,
    division_type: 'huy???n',
    codename: 'huyen_vi_xuyen',
    province_code: 2
  },
  {
    name: 'Huy???n B???c M??',
    code: 31,
    division_type: 'huy???n',
    codename: 'huyen_bac_me',
    province_code: 2
  },
  {
    name: 'Huy???n Ho??ng Su Ph??',
    code: 32,
    division_type: 'huy???n',
    codename: 'huyen_hoang_su_phi',
    province_code: 2
  },
  {
    name: 'Huy???n X??n M???n',
    code: 33,
    division_type: 'huy???n',
    codename: 'huyen_xin_man',
    province_code: 2
  },
  {
    name: 'Huy???n B???c Quang',
    code: 34,
    division_type: 'huy???n',
    codename: 'huyen_bac_quang',
    province_code: 2
  },
  {
    name: 'Huy???n Quang B??nh',
    code: 35,
    division_type: 'huy???n',
    codename: 'huyen_quang_binh',
    province_code: 2
  },
  {
    name: 'Th??nh ph??? Cao B???ng',
    code: 40,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_cao_bang',
    province_code: 4
  },
  {
    name: 'Huy???n B???o L??m',
    code: 42,
    division_type: 'huy???n',
    codename: 'huyen_bao_lam',
    province_code: 4
  },
  {
    name: 'Huy???n B???o L???c',
    code: 43,
    division_type: 'huy???n',
    codename: 'huyen_bao_lac',
    province_code: 4
  },
  {
    name: 'Huy???n H?? Qu???ng',
    code: 45,
    division_type: 'huy???n',
    codename: 'huyen_ha_quang',
    province_code: 4
  },
  {
    name: 'Huy???n Tr??ng Kh??nh',
    code: 47,
    division_type: 'huy???n',
    codename: 'huyen_trung_khanh',
    province_code: 4
  },
  {
    name: 'Huy???n H??? Lang',
    code: 48,
    division_type: 'huy???n',
    codename: 'huyen_ha_lang',
    province_code: 4
  },
  {
    name: 'Huy???n Qu???ng H??a',
    code: 49,
    division_type: 'huy???n',
    codename: 'huyen_quang_hoa',
    province_code: 4
  },
  {
    name: 'Huy???n Ho?? An',
    code: 51,
    division_type: 'huy???n',
    codename: 'huyen_hoa_an',
    province_code: 4
  },
  {
    name: 'Huy???n Nguy??n B??nh',
    code: 52,
    division_type: 'huy???n',
    codename: 'huyen_nguyen_binh',
    province_code: 4
  },
  {
    name: 'Huy???n Th???ch An',
    code: 53,
    division_type: 'huy???n',
    codename: 'huyen_thach_an',
    province_code: 4
  },
  {
    name: 'Th??nh Ph??? B???c K???n',
    code: 58,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_bac_kan',
    province_code: 6
  },
  {
    name: 'Huy???n P??c N???m',
    code: 60,
    division_type: 'huy???n',
    codename: 'huyen_pac_nam',
    province_code: 6
  },
  {
    name: 'Huy???n Ba B???',
    code: 61,
    division_type: 'huy???n',
    codename: 'huyen_ba_be',
    province_code: 6
  },
  {
    name: 'Huy???n Ng??n S??n',
    code: 62,
    division_type: 'huy???n',
    codename: 'huyen_ngan_son',
    province_code: 6
  },
  {
    name: 'Huy???n B???ch Th??ng',
    code: 63,
    division_type: 'huy???n',
    codename: 'huyen_bach_thong',
    province_code: 6
  },
  {
    name: 'Huy???n Ch??? ?????n',
    code: 64,
    division_type: 'huy???n',
    codename: 'huyen_cho_don',
    province_code: 6
  },
  {
    name: 'Huy???n Ch??? M???i',
    code: 65,
    division_type: 'huy???n',
    codename: 'huyen_cho_moi',
    province_code: 6
  },
  {
    name: 'Huy???n Na R??',
    code: 66,
    division_type: 'huy???n',
    codename: 'huyen_na_ri',
    province_code: 6
  },
  {
    name: 'Th??nh ph??? Tuy??n Quang',
    code: 70,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_tuyen_quang',
    province_code: 8
  },
  {
    name: 'Huy???n L??m B??nh',
    code: 71,
    division_type: 'huy???n',
    codename: 'huyen_lam_binh',
    province_code: 8
  },
  {
    name: 'Huy???n Na Hang',
    code: 72,
    division_type: 'huy???n',
    codename: 'huyen_na_hang',
    province_code: 8
  },
  {
    name: 'Huy???n Chi??m H??a',
    code: 73,
    division_type: 'huy???n',
    codename: 'huyen_chiem_hoa',
    province_code: 8
  },
  {
    name: 'Huy???n H??m Y??n',
    code: 74,
    division_type: 'huy???n',
    codename: 'huyen_ham_yen',
    province_code: 8
  },
  {
    name: 'Huy???n Y??n S??n',
    code: 75,
    division_type: 'huy???n',
    codename: 'huyen_yen_son',
    province_code: 8
  },
  {
    name: 'Huy???n S??n D????ng',
    code: 76,
    division_type: 'huy???n',
    codename: 'huyen_son_duong',
    province_code: 8
  },
  {
    name: 'Th??nh ph??? L??o Cai',
    code: 80,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_lao_cai',
    province_code: 10
  },
  {
    name: 'Huy???n B??t X??t',
    code: 82,
    division_type: 'huy???n',
    codename: 'huyen_bat_xat',
    province_code: 10
  },
  {
    name: 'Huy???n M?????ng Kh????ng',
    code: 83,
    division_type: 'huy???n',
    codename: 'huyen_muong_khuong',
    province_code: 10
  },
  {
    name: 'Huy???n Si Ma Cai',
    code: 84,
    division_type: 'huy???n',
    codename: 'huyen_si_ma_cai',
    province_code: 10
  },
  {
    name: 'Huy???n B???c H??',
    code: 85,
    division_type: 'huy???n',
    codename: 'huyen_bac_ha',
    province_code: 10
  },
  {
    name: 'Huy???n B???o Th???ng',
    code: 86,
    division_type: 'huy???n',
    codename: 'huyen_bao_thang',
    province_code: 10
  },
  {
    name: 'Huy???n B???o Y??n',
    code: 87,
    division_type: 'huy???n',
    codename: 'huyen_bao_yen',
    province_code: 10
  },
  {
    name: 'Th??? x?? Sa Pa',
    code: 88,
    division_type: 'th??? x??',
    codename: 'thi_xa_sa_pa',
    province_code: 10
  },
  {
    name: 'Huy???n V??n B??n',
    code: 89,
    division_type: 'huy???n',
    codename: 'huyen_van_ban',
    province_code: 10
  },
  {
    name: 'Th??nh ph??? ??i???n Bi??n Ph???',
    code: 94,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_dien_bien_phu',
    province_code: 11
  },
  {
    name: 'Th??? x?? M?????ng Lay',
    code: 95,
    division_type: 'th??? x??',
    codename: 'thi_xa_muong_lay',
    province_code: 11
  },
  {
    name: 'Huy???n M?????ng Nh??',
    code: 96,
    division_type: 'huy???n',
    codename: 'huyen_muong_nhe',
    province_code: 11
  },
  {
    name: 'Huy???n M?????ng Ch??',
    code: 97,
    division_type: 'huy???n',
    codename: 'huyen_muong_cha',
    province_code: 11
  },
  {
    name: 'Huy???n T???a Ch??a',
    code: 98,
    division_type: 'huy???n',
    codename: 'huyen_tua_chua',
    province_code: 11
  },
  {
    name: 'Huy???n Tu???n Gi??o',
    code: 99,
    division_type: 'huy???n',
    codename: 'huyen_tuan_giao',
    province_code: 11
  },
  {
    name: 'Huy???n ??i???n Bi??n',
    code: 100,
    division_type: 'huy???n',
    codename: 'huyen_dien_bien',
    province_code: 11
  },
  {
    name: 'Huy???n ??i???n Bi??n ????ng',
    code: 101,
    division_type: 'huy???n',
    codename: 'huyen_dien_bien_dong',
    province_code: 11
  },
  {
    name: 'Huy???n M?????ng ???ng',
    code: 102,
    division_type: 'huy???n',
    codename: 'huyen_muong_ang',
    province_code: 11
  },
  {
    name: 'Huy???n N???m P???',
    code: 103,
    division_type: 'huy???n',
    codename: 'huyen_nam_po',
    province_code: 11
  },
  {
    name: 'Th??nh ph??? Lai Ch??u',
    code: 105,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_lai_chau',
    province_code: 12
  },
  {
    name: 'Huy???n Tam ???????ng',
    code: 106,
    division_type: 'huy???n',
    codename: 'huyen_tam_duong',
    province_code: 12
  },
  {
    name: 'Huy???n M?????ng T??',
    code: 107,
    division_type: 'huy???n',
    codename: 'huyen_muong_te',
    province_code: 12
  },
  {
    name: 'Huy???n S??n H???',
    code: 108,
    division_type: 'huy???n',
    codename: 'huyen_sin_ho',
    province_code: 12
  },
  {
    name: 'Huy???n Phong Th???',
    code: 109,
    division_type: 'huy???n',
    codename: 'huyen_phong_tho',
    province_code: 12
  },
  {
    name: 'Huy???n Than Uy??n',
    code: 110,
    division_type: 'huy???n',
    codename: 'huyen_than_uyen',
    province_code: 12
  },
  {
    name: 'Huy???n T??n Uy??n',
    code: 111,
    division_type: 'huy???n',
    codename: 'huyen_tan_uyen',
    province_code: 12
  },
  {
    name: 'Huy???n N???m Nh??n',
    code: 112,
    division_type: 'huy???n',
    codename: 'huyen_nam_nhun',
    province_code: 12
  },
  {
    name: 'Th??nh ph??? S??n La',
    code: 116,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_son_la',
    province_code: 14
  },
  {
    name: 'Huy???n Qu???nh Nhai',
    code: 118,
    division_type: 'huy???n',
    codename: 'huyen_quynh_nhai',
    province_code: 14
  },
  {
    name: 'Huy???n Thu???n Ch??u',
    code: 119,
    division_type: 'huy???n',
    codename: 'huyen_thuan_chau',
    province_code: 14
  },
  {
    name: 'Huy???n M?????ng La',
    code: 120,
    division_type: 'huy???n',
    codename: 'huyen_muong_la',
    province_code: 14
  },
  {
    name: 'Huy???n B???c Y??n',
    code: 121,
    division_type: 'huy???n',
    codename: 'huyen_bac_yen',
    province_code: 14
  },
  {
    name: 'Huy???n Ph?? Y??n',
    code: 122,
    division_type: 'huy???n',
    codename: 'huyen_phu_yen',
    province_code: 14
  },
  {
    name: 'Huy???n M???c Ch??u',
    code: 123,
    division_type: 'huy???n',
    codename: 'huyen_moc_chau',
    province_code: 14
  },
  {
    name: 'Huy???n Y??n Ch??u',
    code: 124,
    division_type: 'huy???n',
    codename: 'huyen_yen_chau',
    province_code: 14
  },
  {
    name: 'Huy???n Mai S??n',
    code: 125,
    division_type: 'huy???n',
    codename: 'huyen_mai_son',
    province_code: 14
  },
  {
    name: 'Huy???n S??ng M??',
    code: 126,
    division_type: 'huy???n',
    codename: 'huyen_song_ma',
    province_code: 14
  },
  {
    name: 'Huy???n S???p C???p',
    code: 127,
    division_type: 'huy???n',
    codename: 'huyen_sop_cop',
    province_code: 14
  },
  {
    name: 'Huy???n V??n H???',
    code: 128,
    division_type: 'huy???n',
    codename: 'huyen_van_ho',
    province_code: 14
  },
  {
    name: 'Th??nh ph??? Y??n B??i',
    code: 132,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_yen_bai',
    province_code: 15
  },
  {
    name: 'Th??? x?? Ngh??a L???',
    code: 133,
    division_type: 'th??? x??',
    codename: 'thi_xa_nghia_lo',
    province_code: 15
  },
  {
    name: 'Huy???n L???c Y??n',
    code: 135,
    division_type: 'huy???n',
    codename: 'huyen_luc_yen',
    province_code: 15
  },
  {
    name: 'Huy???n V??n Y??n',
    code: 136,
    division_type: 'huy???n',
    codename: 'huyen_van_yen',
    province_code: 15
  },
  {
    name: 'Huy???n M?? C??ng Ch???i',
    code: 137,
    division_type: 'huy???n',
    codename: 'huyen_mu_cang_chai',
    province_code: 15
  },
  {
    name: 'Huy???n Tr???n Y??n',
    code: 138,
    division_type: 'huy???n',
    codename: 'huyen_tran_yen',
    province_code: 15
  },
  {
    name: 'Huy???n Tr???m T???u',
    code: 139,
    division_type: 'huy???n',
    codename: 'huyen_tram_tau',
    province_code: 15
  },
  {
    name: 'Huy???n V??n Ch???n',
    code: 140,
    division_type: 'huy???n',
    codename: 'huyen_van_chan',
    province_code: 15
  },
  {
    name: 'Huy???n Y??n B??nh',
    code: 141,
    division_type: 'huy???n',
    codename: 'huyen_yen_binh',
    province_code: 15
  },
  {
    name: 'Th??nh ph??? H??a B??nh',
    code: 148,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_hoa_binh',
    province_code: 17
  },
  {
    name: 'Huy???n ???? B???c',
    code: 150,
    division_type: 'huy???n',
    codename: 'huyen_da_bac',
    province_code: 17
  },
  {
    name: 'Huy???n L????ng S??n',
    code: 152,
    division_type: 'huy???n',
    codename: 'huyen_luong_son',
    province_code: 17
  },
  {
    name: 'Huy???n Kim B??i',
    code: 153,
    division_type: 'huy???n',
    codename: 'huyen_kim_boi',
    province_code: 17
  },
  {
    name: 'Huy???n Cao Phong',
    code: 154,
    division_type: 'huy???n',
    codename: 'huyen_cao_phong',
    province_code: 17
  },
  {
    name: 'Huy???n T??n L???c',
    code: 155,
    division_type: 'huy???n',
    codename: 'huyen_tan_lac',
    province_code: 17
  },
  {
    name: 'Huy???n Mai Ch??u',
    code: 156,
    division_type: 'huy???n',
    codename: 'huyen_mai_chau',
    province_code: 17
  },
  {
    name: 'Huy???n L???c S??n',
    code: 157,
    division_type: 'huy???n',
    codename: 'huyen_lac_son',
    province_code: 17
  },
  {
    name: 'Huy???n Y??n Th???y',
    code: 158,
    division_type: 'huy???n',
    codename: 'huyen_yen_thuy',
    province_code: 17
  },
  {
    name: 'Huy???n L???c Th???y',
    code: 159,
    division_type: 'huy???n',
    codename: 'huyen_lac_thuy',
    province_code: 17
  },
  {
    name: 'Th??nh ph??? Th??i Nguy??n',
    code: 164,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_thai_nguyen',
    province_code: 19
  },
  {
    name: 'Th??nh ph??? S??ng C??ng',
    code: 165,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_song_cong',
    province_code: 19
  },
  {
    name: 'Huy???n ?????nh H??a',
    code: 167,
    division_type: 'huy???n',
    codename: 'huyen_dinh_hoa',
    province_code: 19
  },
  {
    name: 'Huy???n Ph?? L????ng',
    code: 168,
    division_type: 'huy???n',
    codename: 'huyen_phu_luong',
    province_code: 19
  },
  {
    name: 'Huy???n ?????ng H???',
    code: 169,
    division_type: 'huy???n',
    codename: 'huyen_dong_hy',
    province_code: 19
  },
  {
    name: 'Huy???n V?? Nhai',
    code: 170,
    division_type: 'huy???n',
    codename: 'huyen_vo_nhai',
    province_code: 19
  },
  {
    name: 'Huy???n ?????i T???',
    code: 171,
    division_type: 'huy???n',
    codename: 'huyen_dai_tu',
    province_code: 19
  },
  {
    name: 'Th??? x?? Ph??? Y??n',
    code: 172,
    division_type: 'th??? x??',
    codename: 'thi_xa_pho_yen',
    province_code: 19
  },
  {
    name: 'Huy???n Ph?? B??nh',
    code: 173,
    division_type: 'huy???n',
    codename: 'huyen_phu_binh',
    province_code: 19
  },
  {
    name: 'Th??nh ph??? L???ng S??n',
    code: 178,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_lang_son',
    province_code: 20
  },
  {
    name: 'Huy???n Tr??ng ?????nh',
    code: 180,
    division_type: 'huy???n',
    codename: 'huyen_trang_dinh',
    province_code: 20
  },
  {
    name: 'Huy???n B??nh Gia',
    code: 181,
    division_type: 'huy???n',
    codename: 'huyen_binh_gia',
    province_code: 20
  },
  {
    name: 'Huy???n V??n L??ng',
    code: 182,
    division_type: 'huy???n',
    codename: 'huyen_van_lang',
    province_code: 20
  },
  {
    name: 'Huy???n Cao L???c',
    code: 183,
    division_type: 'huy???n',
    codename: 'huyen_cao_loc',
    province_code: 20
  },
  {
    name: 'Huy???n V??n Quan',
    code: 184,
    division_type: 'huy???n',
    codename: 'huyen_van_quan',
    province_code: 20
  },
  {
    name: 'Huy???n B???c S??n',
    code: 185,
    division_type: 'huy???n',
    codename: 'huyen_bac_son',
    province_code: 20
  },
  {
    name: 'Huy???n H???u L??ng',
    code: 186,
    division_type: 'huy???n',
    codename: 'huyen_huu_lung',
    province_code: 20
  },
  {
    name: 'Huy???n Chi L??ng',
    code: 187,
    division_type: 'huy???n',
    codename: 'huyen_chi_lang',
    province_code: 20
  },
  {
    name: 'Huy???n L???c B??nh',
    code: 188,
    division_type: 'huy???n',
    codename: 'huyen_loc_binh',
    province_code: 20
  },
  {
    name: 'Huy???n ????nh L???p',
    code: 189,
    division_type: 'huy???n',
    codename: 'huyen_dinh_lap',
    province_code: 20
  },
  {
    name: 'Th??nh ph??? H??? Long',
    code: 193,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ha_long',
    province_code: 22
  },
  {
    name: 'Th??nh ph??? M??ng C??i',
    code: 194,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_mong_cai',
    province_code: 22
  },
  {
    name: 'Th??nh ph??? C???m Ph???',
    code: 195,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_cam_pha',
    province_code: 22
  },
  {
    name: 'Th??nh ph??? U??ng B??',
    code: 196,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_uong_bi',
    province_code: 22
  },
  {
    name: 'Huy???n B??nh Li??u',
    code: 198,
    division_type: 'huy???n',
    codename: 'huyen_binh_lieu',
    province_code: 22
  },
  {
    name: 'Huy???n Ti??n Y??n',
    code: 199,
    division_type: 'huy???n',
    codename: 'huyen_tien_yen',
    province_code: 22
  },
  {
    name: 'Huy???n ?????m H??',
    code: 200,
    division_type: 'huy???n',
    codename: 'huyen_dam_ha',
    province_code: 22
  },
  {
    name: 'Huy???n H???i H??',
    code: 201,
    division_type: 'huy???n',
    codename: 'huyen_hai_ha',
    province_code: 22
  },
  {
    name: 'Huy???n Ba Ch???',
    code: 202,
    division_type: 'huy???n',
    codename: 'huyen_ba_che',
    province_code: 22
  },
  {
    name: 'Huy???n V??n ?????n',
    code: 203,
    division_type: 'huy???n',
    codename: 'huyen_van_don',
    province_code: 22
  },
  {
    name: 'Th??? x?? ????ng Tri???u',
    code: 205,
    division_type: 'th??? x??',
    codename: 'thi_xa_dong_trieu',
    province_code: 22
  },
  {
    name: 'Th??? x?? Qu???ng Y??n',
    code: 206,
    division_type: 'th??? x??',
    codename: 'thi_xa_quang_yen',
    province_code: 22
  },
  {
    name: 'Huy???n C?? T??',
    code: 207,
    division_type: 'huy???n',
    codename: 'huyen_co_to',
    province_code: 22
  },
  {
    name: 'Th??nh ph??? B???c Giang',
    code: 213,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_bac_giang',
    province_code: 24
  },
  {
    name: 'Huy???n Y??n Th???',
    code: 215,
    division_type: 'huy???n',
    codename: 'huyen_yen_the',
    province_code: 24
  },
  {
    name: 'Huy???n T??n Y??n',
    code: 216,
    division_type: 'huy???n',
    codename: 'huyen_tan_yen',
    province_code: 24
  },
  {
    name: 'Huy???n L???ng Giang',
    code: 217,
    division_type: 'huy???n',
    codename: 'huyen_lang_giang',
    province_code: 24
  },
  {
    name: 'Huy???n L???c Nam',
    code: 218,
    division_type: 'huy???n',
    codename: 'huyen_luc_nam',
    province_code: 24
  },
  {
    name: 'Huy???n L???c Ng???n',
    code: 219,
    division_type: 'huy???n',
    codename: 'huyen_luc_ngan',
    province_code: 24
  },
  {
    name: 'Huy???n S??n ?????ng',
    code: 220,
    division_type: 'huy???n',
    codename: 'huyen_son_dong',
    province_code: 24
  },
  {
    name: 'Huy???n Y??n D??ng',
    code: 221,
    division_type: 'huy???n',
    codename: 'huyen_yen_dung',
    province_code: 24
  },
  {
    name: 'Huy???n Vi???t Y??n',
    code: 222,
    division_type: 'huy???n',
    codename: 'huyen_viet_yen',
    province_code: 24
  },
  {
    name: 'Huy???n Hi???p H??a',
    code: 223,
    division_type: 'huy???n',
    codename: 'huyen_hiep_hoa',
    province_code: 24
  },
  {
    name: 'Th??nh ph??? Vi???t Tr??',
    code: 227,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_viet_tri',
    province_code: 25
  },
  {
    name: 'Th??? x?? Ph?? Th???',
    code: 228,
    division_type: 'th??? x??',
    codename: 'thi_xa_phu_tho',
    province_code: 25
  },
  {
    name: 'Huy???n ??oan H??ng',
    code: 230,
    division_type: 'huy???n',
    codename: 'huyen_doan_hung',
    province_code: 25
  },
  {
    name: 'Huy???n H??? Ho??',
    code: 231,
    division_type: 'huy???n',
    codename: 'huyen_ha_hoa',
    province_code: 25
  },
  {
    name: 'Huy???n Thanh Ba',
    code: 232,
    division_type: 'huy???n',
    codename: 'huyen_thanh_ba',
    province_code: 25
  },
  {
    name: 'Huy???n Ph?? Ninh',
    code: 233,
    division_type: 'huy???n',
    codename: 'huyen_phu_ninh',
    province_code: 25
  },
  {
    name: 'Huy???n Y??n L???p',
    code: 234,
    division_type: 'huy???n',
    codename: 'huyen_yen_lap',
    province_code: 25
  },
  {
    name: 'Huy???n C???m Kh??',
    code: 235,
    division_type: 'huy???n',
    codename: 'huyen_cam_khe',
    province_code: 25
  },
  {
    name: 'Huy???n Tam N??ng',
    code: 236,
    division_type: 'huy???n',
    codename: 'huyen_tam_nong',
    province_code: 25
  },
  {
    name: 'Huy???n L??m Thao',
    code: 237,
    division_type: 'huy???n',
    codename: 'huyen_lam_thao',
    province_code: 25
  },
  {
    name: 'Huy???n Thanh S??n',
    code: 238,
    division_type: 'huy???n',
    codename: 'huyen_thanh_son',
    province_code: 25
  },
  {
    name: 'Huy???n Thanh Thu???',
    code: 239,
    division_type: 'huy???n',
    codename: 'huyen_thanh_thuy',
    province_code: 25
  },
  {
    name: 'Huy???n T??n S??n',
    code: 240,
    division_type: 'huy???n',
    codename: 'huyen_tan_son',
    province_code: 25
  },
  {
    name: 'Th??nh ph??? V??nh Y??n',
    code: 243,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_vinh_yen',
    province_code: 26
  },
  {
    name: 'Th??nh ph??? Ph??c Y??n',
    code: 244,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_phuc_yen',
    province_code: 26
  },
  {
    name: 'Huy???n L???p Th???ch',
    code: 246,
    division_type: 'huy???n',
    codename: 'huyen_lap_thach',
    province_code: 26
  },
  {
    name: 'Huy???n Tam D????ng',
    code: 247,
    division_type: 'huy???n',
    codename: 'huyen_tam_duong',
    province_code: 26
  },
  {
    name: 'Huy???n Tam ?????o',
    code: 248,
    division_type: 'huy???n',
    codename: 'huyen_tam_dao',
    province_code: 26
  },
  {
    name: 'Huy???n B??nh Xuy??n',
    code: 249,
    division_type: 'huy???n',
    codename: 'huyen_binh_xuyen',
    province_code: 26
  },
  {
    name: 'Huy???n Y??n L???c',
    code: 251,
    division_type: 'huy???n',
    codename: 'huyen_yen_lac',
    province_code: 26
  },
  {
    name: 'Huy???n V??nh T?????ng',
    code: 252,
    division_type: 'huy???n',
    codename: 'huyen_vinh_tuong',
    province_code: 26
  },
  {
    name: 'Huy???n S??ng L??',
    code: 253,
    division_type: 'huy???n',
    codename: 'huyen_song_lo',
    province_code: 26
  },
  {
    name: 'Th??nh ph??? B???c Ninh',
    code: 256,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_bac_ninh',
    province_code: 27
  },
  {
    name: 'Huy???n Y??n Phong',
    code: 258,
    division_type: 'huy???n',
    codename: 'huyen_yen_phong',
    province_code: 27
  },
  {
    name: 'Huy???n Qu??? V??',
    code: 259,
    division_type: 'huy???n',
    codename: 'huyen_que_vo',
    province_code: 27
  },
  {
    name: 'Huy???n Ti??n Du',
    code: 260,
    division_type: 'huy???n',
    codename: 'huyen_tien_du',
    province_code: 27
  },
  {
    name: 'Th??? x?? T??? S??n',
    code: 261,
    division_type: 'th??? x??',
    codename: 'thi_xa_tu_son',
    province_code: 27
  },
  {
    name: 'Huy???n Thu???n Th??nh',
    code: 262,
    division_type: 'huy???n',
    codename: 'huyen_thuan_thanh',
    province_code: 27
  },
  {
    name: 'Huy???n Gia B??nh',
    code: 263,
    division_type: 'huy???n',
    codename: 'huyen_gia_binh',
    province_code: 27
  },
  {
    name: 'Huy???n L????ng T??i',
    code: 264,
    division_type: 'huy???n',
    codename: 'huyen_luong_tai',
    province_code: 27
  },
  {
    name: 'Th??nh ph??? H???i D????ng',
    code: 288,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_hai_duong',
    province_code: 30
  },
  {
    name: 'Th??nh ph??? Ch?? Linh',
    code: 290,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_chi_linh',
    province_code: 30
  },
  {
    name: 'Huy???n Nam S??ch',
    code: 291,
    division_type: 'huy???n',
    codename: 'huyen_nam_sach',
    province_code: 30
  },
  {
    name: 'Th??? x?? Kinh M??n',
    code: 292,
    division_type: 'th??? x??',
    codename: 'thi_xa_kinh_mon',
    province_code: 30
  },
  {
    name: 'Huy???n Kim Th??nh',
    code: 293,
    division_type: 'huy???n',
    codename: 'huyen_kim_thanh',
    province_code: 30
  },
  {
    name: 'Huy???n Thanh H??',
    code: 294,
    division_type: 'huy???n',
    codename: 'huyen_thanh_ha',
    province_code: 30
  },
  {
    name: 'Huy???n C???m Gi??ng',
    code: 295,
    division_type: 'huy???n',
    codename: 'huyen_cam_giang',
    province_code: 30
  },
  {
    name: 'Huy???n B??nh Giang',
    code: 296,
    division_type: 'huy???n',
    codename: 'huyen_binh_giang',
    province_code: 30
  },
  {
    name: 'Huy???n Gia L???c',
    code: 297,
    division_type: 'huy???n',
    codename: 'huyen_gia_loc',
    province_code: 30
  },
  {
    name: 'Huy???n T??? K???',
    code: 298,
    division_type: 'huy???n',
    codename: 'huyen_tu_ky',
    province_code: 30
  },
  {
    name: 'Huy???n Ninh Giang',
    code: 299,
    division_type: 'huy???n',
    codename: 'huyen_ninh_giang',
    province_code: 30
  },
  {
    name: 'Huy???n Thanh Mi???n',
    code: 300,
    division_type: 'huy???n',
    codename: 'huyen_thanh_mien',
    province_code: 30
  },
  {
    name: 'Qu???n H???ng B??ng',
    code: 303,
    division_type: 'qu???n',
    codename: 'quan_hong_bang',
    province_code: 31
  },
  {
    name: 'Qu???n Ng?? Quy???n',
    code: 304,
    division_type: 'qu???n',
    codename: 'quan_ngo_quyen',
    province_code: 31
  },
  {
    name: 'Qu???n L?? Ch??n',
    code: 305,
    division_type: 'qu???n',
    codename: 'quan_le_chan',
    province_code: 31
  },
  {
    name: 'Qu???n H???i An',
    code: 306,
    division_type: 'qu???n',
    codename: 'quan_hai_an',
    province_code: 31
  },
  {
    name: 'Qu???n Ki???n An',
    code: 307,
    division_type: 'qu???n',
    codename: 'quan_kien_an',
    province_code: 31
  },
  {
    name: 'Qu???n ????? S??n',
    code: 308,
    division_type: 'qu???n',
    codename: 'quan_do_son',
    province_code: 31
  },
  {
    name: 'Qu???n D????ng Kinh',
    code: 309,
    division_type: 'qu???n',
    codename: 'quan_duong_kinh',
    province_code: 31
  },
  {
    name: 'Huy???n Thu??? Nguy??n',
    code: 311,
    division_type: 'huy???n',
    codename: 'huyen_thuy_nguyen',
    province_code: 31
  },
  {
    name: 'Huy???n An D????ng',
    code: 312,
    division_type: 'huy???n',
    codename: 'huyen_an_duong',
    province_code: 31
  },
  {
    name: 'Huy???n An L??o',
    code: 313,
    division_type: 'huy???n',
    codename: 'huyen_an_lao',
    province_code: 31
  },
  {
    name: 'Huy???n Ki???n Thu???',
    code: 314,
    division_type: 'huy???n',
    codename: 'huyen_kien_thuy',
    province_code: 31
  },
  {
    name: 'Huy???n Ti??n L??ng',
    code: 315,
    division_type: 'huy???n',
    codename: 'huyen_tien_lang',
    province_code: 31
  },
  {
    name: 'Huy???n V??nh B???o',
    code: 316,
    division_type: 'huy???n',
    codename: 'huyen_vinh_bao',
    province_code: 31
  },
  {
    name: 'Huy???n C??t H???i',
    code: 317,
    division_type: 'huy???n',
    codename: 'huyen_cat_hai',
    province_code: 31
  },
  {
    name: 'Huy???n B???ch Long V??',
    code: 318,
    division_type: 'huy???n',
    codename: 'huyen_bach_long_vi',
    province_code: 31
  },
  {
    name: 'Th??nh ph??? H??ng Y??n',
    code: 323,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_hung_yen',
    province_code: 33
  },
  {
    name: 'Huy???n V??n L??m',
    code: 325,
    division_type: 'huy???n',
    codename: 'huyen_van_lam',
    province_code: 33
  },
  {
    name: 'Huy???n V??n Giang',
    code: 326,
    division_type: 'huy???n',
    codename: 'huyen_van_giang',
    province_code: 33
  },
  {
    name: 'Huy???n Y??n M???',
    code: 327,
    division_type: 'huy???n',
    codename: 'huyen_yen_my',
    province_code: 33
  },
  {
    name: 'Th??? x?? M??? H??o',
    code: 328,
    division_type: 'th??? x??',
    codename: 'thi_xa_my_hao',
    province_code: 33
  },
  {
    name: 'Huy???n ??n Thi',
    code: 329,
    division_type: 'huy???n',
    codename: 'huyen_an_thi',
    province_code: 33
  },
  {
    name: 'Huy???n Kho??i Ch??u',
    code: 330,
    division_type: 'huy???n',
    codename: 'huyen_khoai_chau',
    province_code: 33
  },
  {
    name: 'Huy???n Kim ?????ng',
    code: 331,
    division_type: 'huy???n',
    codename: 'huyen_kim_dong',
    province_code: 33
  },
  {
    name: 'Huy???n Ti??n L???',
    code: 332,
    division_type: 'huy???n',
    codename: 'huyen_tien_lu',
    province_code: 33
  },
  {
    name: 'Huy???n Ph?? C???',
    code: 333,
    division_type: 'huy???n',
    codename: 'huyen_phu_cu',
    province_code: 33
  },
  {
    name: 'Th??nh ph??? Th??i B??nh',
    code: 336,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_thai_binh',
    province_code: 34
  },
  {
    name: 'Huy???n Qu???nh Ph???',
    code: 338,
    division_type: 'huy???n',
    codename: 'huyen_quynh_phu',
    province_code: 34
  },
  {
    name: 'Huy???n H??ng H??',
    code: 339,
    division_type: 'huy???n',
    codename: 'huyen_hung_ha',
    province_code: 34
  },
  {
    name: 'Huy???n ????ng H??ng',
    code: 340,
    division_type: 'huy???n',
    codename: 'huyen_dong_hung',
    province_code: 34
  },
  {
    name: 'Huy???n Th??i Th???y',
    code: 341,
    division_type: 'huy???n',
    codename: 'huyen_thai_thuy',
    province_code: 34
  },
  {
    name: 'Huy???n Ti???n H???i',
    code: 342,
    division_type: 'huy???n',
    codename: 'huyen_tien_hai',
    province_code: 34
  },
  {
    name: 'Huy???n Ki???n X????ng',
    code: 343,
    division_type: 'huy???n',
    codename: 'huyen_kien_xuong',
    province_code: 34
  },
  {
    name: 'Huy???n V?? Th??',
    code: 344,
    division_type: 'huy???n',
    codename: 'huyen_vu_thu',
    province_code: 34
  },
  {
    name: 'Th??nh ph??? Ph??? L??',
    code: 347,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_phu_ly',
    province_code: 35
  },
  {
    name: 'Th??? x?? Duy Ti??n',
    code: 349,
    division_type: 'th??? x??',
    codename: 'thi_xa_duy_tien',
    province_code: 35
  },
  {
    name: 'Huy???n Kim B???ng',
    code: 350,
    division_type: 'huy???n',
    codename: 'huyen_kim_bang',
    province_code: 35
  },
  {
    name: 'Huy???n Thanh Li??m',
    code: 351,
    division_type: 'huy???n',
    codename: 'huyen_thanh_liem',
    province_code: 35
  },
  {
    name: 'Huy???n B??nh L???c',
    code: 352,
    division_type: 'huy???n',
    codename: 'huyen_binh_luc',
    province_code: 35
  },
  {
    name: 'Huy???n L?? Nh??n',
    code: 353,
    division_type: 'huy???n',
    codename: 'huyen_ly_nhan',
    province_code: 35
  },
  {
    name: 'Th??nh ph??? Nam ?????nh',
    code: 356,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_nam_dinh',
    province_code: 36
  },
  {
    name: 'Huy???n M??? L???c',
    code: 358,
    division_type: 'huy???n',
    codename: 'huyen_my_loc',
    province_code: 36
  },
  {
    name: 'Huy???n V??? B???n',
    code: 359,
    division_type: 'huy???n',
    codename: 'huyen_vu_ban',
    province_code: 36
  },
  {
    name: 'Huy???n ?? Y??n',
    code: 360,
    division_type: 'huy???n',
    codename: 'huyen_y_yen',
    province_code: 36
  },
  {
    name: 'Huy???n Ngh??a H??ng',
    code: 361,
    division_type: 'huy???n',
    codename: 'huyen_nghia_hung',
    province_code: 36
  },
  {
    name: 'Huy???n Nam Tr???c',
    code: 362,
    division_type: 'huy???n',
    codename: 'huyen_nam_truc',
    province_code: 36
  },
  {
    name: 'Huy???n Tr???c Ninh',
    code: 363,
    division_type: 'huy???n',
    codename: 'huyen_truc_ninh',
    province_code: 36
  },
  {
    name: 'Huy???n Xu??n Tr?????ng',
    code: 364,
    division_type: 'huy???n',
    codename: 'huyen_xuan_truong',
    province_code: 36
  },
  {
    name: 'Huy???n Giao Th???y',
    code: 365,
    division_type: 'huy???n',
    codename: 'huyen_giao_thuy',
    province_code: 36
  },
  {
    name: 'Huy???n H???i H???u',
    code: 366,
    division_type: 'huy???n',
    codename: 'huyen_hai_hau',
    province_code: 36
  },
  {
    name: 'Th??nh ph??? Ninh B??nh',
    code: 369,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ninh_binh',
    province_code: 37
  },
  {
    name: 'Th??nh ph??? Tam ??i???p',
    code: 370,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_tam_diep',
    province_code: 37
  },
  {
    name: 'Huy???n Nho Quan',
    code: 372,
    division_type: 'huy???n',
    codename: 'huyen_nho_quan',
    province_code: 37
  },
  {
    name: 'Huy???n Gia Vi???n',
    code: 373,
    division_type: 'huy???n',
    codename: 'huyen_gia_vien',
    province_code: 37
  },
  {
    name: 'Huy???n Hoa L??',
    code: 374,
    division_type: 'huy???n',
    codename: 'huyen_hoa_lu',
    province_code: 37
  },
  {
    name: 'Huy???n Y??n Kh??nh',
    code: 375,
    division_type: 'huy???n',
    codename: 'huyen_yen_khanh',
    province_code: 37
  },
  {
    name: 'Huy???n Kim S??n',
    code: 376,
    division_type: 'huy???n',
    codename: 'huyen_kim_son',
    province_code: 37
  },
  {
    name: 'Huy???n Y??n M??',
    code: 377,
    division_type: 'huy???n',
    codename: 'huyen_yen_mo',
    province_code: 37
  },
  {
    name: 'Th??nh ph??? Thanh H??a',
    code: 380,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_thanh_hoa',
    province_code: 38
  },
  {
    name: 'Th??? x?? B???m S??n',
    code: 381,
    division_type: 'th??? x??',
    codename: 'thi_xa_bim_son',
    province_code: 38
  },
  {
    name: 'Th??nh ph??? S???m S??n',
    code: 382,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_sam_son',
    province_code: 38
  },
  {
    name: 'Huy???n M?????ng L??t',
    code: 384,
    division_type: 'huy???n',
    codename: 'huyen_muong_lat',
    province_code: 38
  },
  {
    name: 'Huy???n Quan H??a',
    code: 385,
    division_type: 'huy???n',
    codename: 'huyen_quan_hoa',
    province_code: 38
  },
  {
    name: 'Huy???n B?? Th?????c',
    code: 386,
    division_type: 'huy???n',
    codename: 'huyen_ba_thuoc',
    province_code: 38
  },
  {
    name: 'Huy???n Quan S??n',
    code: 387,
    division_type: 'huy???n',
    codename: 'huyen_quan_son',
    province_code: 38
  },
  {
    name: 'Huy???n Lang Ch??nh',
    code: 388,
    division_type: 'huy???n',
    codename: 'huyen_lang_chanh',
    province_code: 38
  },
  {
    name: 'Huy???n Ng???c L???c',
    code: 389,
    division_type: 'huy???n',
    codename: 'huyen_ngoc_lac',
    province_code: 38
  },
  {
    name: 'Huy???n C???m Th???y',
    code: 390,
    division_type: 'huy???n',
    codename: 'huyen_cam_thuy',
    province_code: 38
  },
  {
    name: 'Huy???n Th???ch Th??nh',
    code: 391,
    division_type: 'huy???n',
    codename: 'huyen_thach_thanh',
    province_code: 38
  },
  {
    name: 'Huy???n H?? Trung',
    code: 392,
    division_type: 'huy???n',
    codename: 'huyen_ha_trung',
    province_code: 38
  },
  {
    name: 'Huy???n V??nh L???c',
    code: 393,
    division_type: 'huy???n',
    codename: 'huyen_vinh_loc',
    province_code: 38
  },
  {
    name: 'Huy???n Y??n ?????nh',
    code: 394,
    division_type: 'huy???n',
    codename: 'huyen_yen_dinh',
    province_code: 38
  },
  {
    name: 'Huy???n Th??? Xu??n',
    code: 395,
    division_type: 'huy???n',
    codename: 'huyen_tho_xuan',
    province_code: 38
  },
  {
    name: 'Huy???n Th?????ng Xu??n',
    code: 396,
    division_type: 'huy???n',
    codename: 'huyen_thuong_xuan',
    province_code: 38
  },
  {
    name: 'Huy???n Tri???u S??n',
    code: 397,
    division_type: 'huy???n',
    codename: 'huyen_trieu_son',
    province_code: 38
  },
  {
    name: 'Huy???n Thi???u H??a',
    code: 398,
    division_type: 'huy???n',
    codename: 'huyen_thieu_hoa',
    province_code: 38
  },
  {
    name: 'Huy???n Ho???ng H??a',
    code: 399,
    division_type: 'huy???n',
    codename: 'huyen_hoang_hoa',
    province_code: 38
  },
  {
    name: 'Huy???n H???u L???c',
    code: 400,
    division_type: 'huy???n',
    codename: 'huyen_hau_loc',
    province_code: 38
  },
  {
    name: 'Huy???n Nga S??n',
    code: 401,
    division_type: 'huy???n',
    codename: 'huyen_nga_son',
    province_code: 38
  },
  {
    name: 'Huy???n Nh?? Xu??n',
    code: 402,
    division_type: 'huy???n',
    codename: 'huyen_nhu_xuan',
    province_code: 38
  },
  {
    name: 'Huy???n Nh?? Thanh',
    code: 403,
    division_type: 'huy???n',
    codename: 'huyen_nhu_thanh',
    province_code: 38
  },
  {
    name: 'Huy???n N??ng C???ng',
    code: 404,
    division_type: 'huy???n',
    codename: 'huyen_nong_cong',
    province_code: 38
  },
  {
    name: 'Huy???n ????ng S??n',
    code: 405,
    division_type: 'huy???n',
    codename: 'huyen_dong_son',
    province_code: 38
  },
  {
    name: 'Huy???n Qu???ng X????ng',
    code: 406,
    division_type: 'huy???n',
    codename: 'huyen_quang_xuong',
    province_code: 38
  },
  {
    name: 'Th??? x?? Nghi S??n',
    code: 407,
    division_type: 'th??? x??',
    codename: 'thi_xa_nghi_son',
    province_code: 38
  },
  {
    name: 'Th??nh ph??? Vinh',
    code: 412,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_vinh',
    province_code: 40
  },
  {
    name: 'Th??? x?? C???a L??',
    code: 413,
    division_type: 'th??? x??',
    codename: 'thi_xa_cua_lo',
    province_code: 40
  },
  {
    name: 'Th??? x?? Th??i Ho??',
    code: 414,
    division_type: 'th??? x??',
    codename: 'thi_xa_thai_hoa',
    province_code: 40
  },
  {
    name: 'Huy???n Qu??? Phong',
    code: 415,
    division_type: 'huy???n',
    codename: 'huyen_que_phong',
    province_code: 40
  },
  {
    name: 'Huy???n Qu??? Ch??u',
    code: 416,
    division_type: 'huy???n',
    codename: 'huyen_quy_chau',
    province_code: 40
  },
  {
    name: 'Huy???n K??? S??n',
    code: 417,
    division_type: 'huy???n',
    codename: 'huyen_ky_son',
    province_code: 40
  },
  {
    name: 'Huy???n T????ng D????ng',
    code: 418,
    division_type: 'huy???n',
    codename: 'huyen_tuong_duong',
    province_code: 40
  },
  {
    name: 'Huy???n Ngh??a ????n',
    code: 419,
    division_type: 'huy???n',
    codename: 'huyen_nghia_dan',
    province_code: 40
  },
  {
    name: 'Huy???n Qu??? H???p',
    code: 420,
    division_type: 'huy???n',
    codename: 'huyen_quy_hop',
    province_code: 40
  },
  {
    name: 'Huy???n Qu???nh L??u',
    code: 421,
    division_type: 'huy???n',
    codename: 'huyen_quynh_luu',
    province_code: 40
  },
  {
    name: 'Huy???n Con Cu??ng',
    code: 422,
    division_type: 'huy???n',
    codename: 'huyen_con_cuong',
    province_code: 40
  },
  {
    name: 'Huy???n T??n K???',
    code: 423,
    division_type: 'huy???n',
    codename: 'huyen_tan_ky',
    province_code: 40
  },
  {
    name: 'Huy???n Anh S??n',
    code: 424,
    division_type: 'huy???n',
    codename: 'huyen_anh_son',
    province_code: 40
  },
  {
    name: 'Huy???n Di???n Ch??u',
    code: 425,
    division_type: 'huy???n',
    codename: 'huyen_dien_chau',
    province_code: 40
  },
  {
    name: 'Huy???n Y??n Th??nh',
    code: 426,
    division_type: 'huy???n',
    codename: 'huyen_yen_thanh',
    province_code: 40
  },
  {
    name: 'Huy???n ???? L????ng',
    code: 427,
    division_type: 'huy???n',
    codename: 'huyen_do_luong',
    province_code: 40
  },
  {
    name: 'Huy???n Thanh Ch????ng',
    code: 428,
    division_type: 'huy???n',
    codename: 'huyen_thanh_chuong',
    province_code: 40
  },
  {
    name: 'Huy???n Nghi L???c',
    code: 429,
    division_type: 'huy???n',
    codename: 'huyen_nghi_loc',
    province_code: 40
  },
  {
    name: 'Huy???n Nam ????n',
    code: 430,
    division_type: 'huy???n',
    codename: 'huyen_nam_dan',
    province_code: 40
  },
  {
    name: 'Huy???n H??ng Nguy??n',
    code: 431,
    division_type: 'huy???n',
    codename: 'huyen_hung_nguyen',
    province_code: 40
  },
  {
    name: 'Th??? x?? Ho??ng Mai',
    code: 432,
    division_type: 'th??? x??',
    codename: 'thi_xa_hoang_mai',
    province_code: 40
  },
  {
    name: 'Th??nh ph??? H?? T??nh',
    code: 436,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ha_tinh',
    province_code: 42
  },
  {
    name: 'Th??? x?? H???ng L??nh',
    code: 437,
    division_type: 'th??? x??',
    codename: 'thi_xa_hong_linh',
    province_code: 42
  },
  {
    name: 'Huy???n H????ng S??n',
    code: 439,
    division_type: 'huy???n',
    codename: 'huyen_huong_son',
    province_code: 42
  },
  {
    name: 'Huy???n ?????c Th???',
    code: 440,
    division_type: 'huy???n',
    codename: 'huyen_duc_tho',
    province_code: 42
  },
  {
    name: 'Huy???n V?? Quang',
    code: 441,
    division_type: 'huy???n',
    codename: 'huyen_vu_quang',
    province_code: 42
  },
  {
    name: 'Huy???n Nghi Xu??n',
    code: 442,
    division_type: 'huy???n',
    codename: 'huyen_nghi_xuan',
    province_code: 42
  },
  {
    name: 'Huy???n Can L???c',
    code: 443,
    division_type: 'huy???n',
    codename: 'huyen_can_loc',
    province_code: 42
  },
  {
    name: 'Huy???n H????ng Kh??',
    code: 444,
    division_type: 'huy???n',
    codename: 'huyen_huong_khe',
    province_code: 42
  },
  {
    name: 'Huy???n Th???ch H??',
    code: 445,
    division_type: 'huy???n',
    codename: 'huyen_thach_ha',
    province_code: 42
  },
  {
    name: 'Huy???n C???m Xuy??n',
    code: 446,
    division_type: 'huy???n',
    codename: 'huyen_cam_xuyen',
    province_code: 42
  },
  {
    name: 'Huy???n K??? Anh',
    code: 447,
    division_type: 'huy???n',
    codename: 'huyen_ky_anh',
    province_code: 42
  },
  {
    name: 'Huy???n L???c H??',
    code: 448,
    division_type: 'huy???n',
    codename: 'huyen_loc_ha',
    province_code: 42
  },
  {
    name: 'Th??? x?? K??? Anh',
    code: 449,
    division_type: 'th??? x??',
    codename: 'thi_xa_ky_anh',
    province_code: 42
  },
  {
    name: 'Th??nh Ph??? ?????ng H???i',
    code: 450,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_dong_hoi',
    province_code: 44
  },
  {
    name: 'Huy???n Minh H??a',
    code: 452,
    division_type: 'huy???n',
    codename: 'huyen_minh_hoa',
    province_code: 44
  },
  {
    name: 'Huy???n Tuy??n H??a',
    code: 453,
    division_type: 'huy???n',
    codename: 'huyen_tuyen_hoa',
    province_code: 44
  },
  {
    name: 'Huy???n Qu???ng Tr???ch',
    code: 454,
    division_type: 'huy???n',
    codename: 'huyen_quang_trach',
    province_code: 44
  },
  {
    name: 'Huy???n B??? Tr???ch',
    code: 455,
    division_type: 'huy???n',
    codename: 'huyen_bo_trach',
    province_code: 44
  },
  {
    name: 'Huy???n Qu???ng Ninh',
    code: 456,
    division_type: 'huy???n',
    codename: 'huyen_quang_ninh',
    province_code: 44
  },
  {
    name: 'Huy???n L??? Th???y',
    code: 457,
    division_type: 'huy???n',
    codename: 'huyen_le_thuy',
    province_code: 44
  },
  {
    name: 'Th??? x?? Ba ?????n',
    code: 458,
    division_type: 'th??? x??',
    codename: 'thi_xa_ba_don',
    province_code: 44
  },
  {
    name: 'Th??nh ph??? ????ng H??',
    code: 461,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_dong_ha',
    province_code: 45
  },
  {
    name: 'Th??? x?? Qu???ng Tr???',
    code: 462,
    division_type: 'th??? x??',
    codename: 'thi_xa_quang_tri',
    province_code: 45
  },
  {
    name: 'Huy???n V??nh Linh',
    code: 464,
    division_type: 'huy???n',
    codename: 'huyen_vinh_linh',
    province_code: 45
  },
  {
    name: 'Huy???n H?????ng H??a',
    code: 465,
    division_type: 'huy???n',
    codename: 'huyen_huong_hoa',
    province_code: 45
  },
  {
    name: 'Huy???n Gio Linh',
    code: 466,
    division_type: 'huy???n',
    codename: 'huyen_gio_linh',
    province_code: 45
  },
  {
    name: 'Huy???n ??a Kr??ng',
    code: 467,
    division_type: 'huy???n',
    codename: 'huyen_da_krong',
    province_code: 45
  },
  {
    name: 'Huy???n Cam L???',
    code: 468,
    division_type: 'huy???n',
    codename: 'huyen_cam_lo',
    province_code: 45
  },
  {
    name: 'Huy???n Tri???u Phong',
    code: 469,
    division_type: 'huy???n',
    codename: 'huyen_trieu_phong',
    province_code: 45
  },
  {
    name: 'Huy???n H???i L??ng',
    code: 470,
    division_type: 'huy???n',
    codename: 'huyen_hai_lang',
    province_code: 45
  },
  {
    name: 'Huy???n C???n C???',
    code: 471,
    division_type: 'huy???n',
    codename: 'huyen_con_co',
    province_code: 45
  },
  {
    name: 'Th??nh ph??? Hu???',
    code: 474,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_hue',
    province_code: 46
  },
  {
    name: 'Huy???n Phong ??i???n',
    code: 476,
    division_type: 'huy???n',
    codename: 'huyen_phong_dien',
    province_code: 46
  },
  {
    name: 'Huy???n Qu???ng ??i???n',
    code: 477,
    division_type: 'huy???n',
    codename: 'huyen_quang_dien',
    province_code: 46
  },
  {
    name: 'Huy???n Ph?? Vang',
    code: 478,
    division_type: 'huy???n',
    codename: 'huyen_phu_vang',
    province_code: 46
  },
  {
    name: 'Th??? x?? H????ng Th???y',
    code: 479,
    division_type: 'th??? x??',
    codename: 'thi_xa_huong_thuy',
    province_code: 46
  },
  {
    name: 'Th??? x?? H????ng Tr??',
    code: 480,
    division_type: 'th??? x??',
    codename: 'thi_xa_huong_tra',
    province_code: 46
  },
  {
    name: 'Huy???n A L?????i',
    code: 481,
    division_type: 'huy???n',
    codename: 'huyen_a_luoi',
    province_code: 46
  },
  {
    name: 'Huy???n Ph?? L???c',
    code: 482,
    division_type: 'huy???n',
    codename: 'huyen_phu_loc',
    province_code: 46
  },
  {
    name: 'Huy???n Nam ????ng',
    code: 483,
    division_type: 'huy???n',
    codename: 'huyen_nam_dong',
    province_code: 46
  },
  {
    name: 'Qu???n Li??n Chi???u',
    code: 490,
    division_type: 'qu???n',
    codename: 'quan_lien_chieu',
    province_code: 48
  },
  {
    name: 'Qu???n Thanh Kh??',
    code: 491,
    division_type: 'qu???n',
    codename: 'quan_thanh_khe',
    province_code: 48
  },
  {
    name: 'Qu???n H???i Ch??u',
    code: 492,
    division_type: 'qu???n',
    codename: 'quan_hai_chau',
    province_code: 48
  },
  {
    name: 'Qu???n S??n Tr??',
    code: 493,
    division_type: 'qu???n',
    codename: 'quan_son_tra',
    province_code: 48
  },
  {
    name: 'Qu???n Ng?? H??nh S??n',
    code: 494,
    division_type: 'qu???n',
    codename: 'quan_ngu_hanh_son',
    province_code: 48
  },
  {
    name: 'Qu???n C???m L???',
    code: 495,
    division_type: 'qu???n',
    codename: 'quan_cam_le',
    province_code: 48
  },
  {
    name: 'Huy???n H??a Vang',
    code: 497,
    division_type: 'huy???n',
    codename: 'huyen_hoa_vang',
    province_code: 48
  },
  {
    name: 'Huy???n Ho??ng Sa',
    code: 498,
    division_type: 'huy???n',
    codename: 'huyen_hoang_sa',
    province_code: 48
  },
  {
    name: 'Th??nh ph??? Tam K???',
    code: 502,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_tam_ky',
    province_code: 49
  },
  {
    name: 'Th??nh ph??? H???i An',
    code: 503,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_hoi_an',
    province_code: 49
  },
  {
    name: 'Huy???n T??y Giang',
    code: 504,
    division_type: 'huy???n',
    codename: 'huyen_tay_giang',
    province_code: 49
  },
  {
    name: 'Huy???n ????ng Giang',
    code: 505,
    division_type: 'huy???n',
    codename: 'huyen_dong_giang',
    province_code: 49
  },
  {
    name: 'Huy???n ?????i L???c',
    code: 506,
    division_type: 'huy???n',
    codename: 'huyen_dai_loc',
    province_code: 49
  },
  {
    name: 'Th??? x?? ??i???n B??n',
    code: 507,
    division_type: 'th??? x??',
    codename: 'thi_xa_dien_ban',
    province_code: 49
  },
  {
    name: 'Huy???n Duy Xuy??n',
    code: 508,
    division_type: 'huy???n',
    codename: 'huyen_duy_xuyen',
    province_code: 49
  },
  {
    name: 'Huy???n Qu??? S??n',
    code: 509,
    division_type: 'huy???n',
    codename: 'huyen_que_son',
    province_code: 49
  },
  {
    name: 'Huy???n Nam Giang',
    code: 510,
    division_type: 'huy???n',
    codename: 'huyen_nam_giang',
    province_code: 49
  },
  {
    name: 'Huy???n Ph?????c S??n',
    code: 511,
    division_type: 'huy???n',
    codename: 'huyen_phuoc_son',
    province_code: 49
  },
  {
    name: 'Huy???n Hi???p ?????c',
    code: 512,
    division_type: 'huy???n',
    codename: 'huyen_hiep_duc',
    province_code: 49
  },
  {
    name: 'Huy???n Th??ng B??nh',
    code: 513,
    division_type: 'huy???n',
    codename: 'huyen_thang_binh',
    province_code: 49
  },
  {
    name: 'Huy???n Ti??n Ph?????c',
    code: 514,
    division_type: 'huy???n',
    codename: 'huyen_tien_phuoc',
    province_code: 49
  },
  {
    name: 'Huy???n B???c Tr?? My',
    code: 515,
    division_type: 'huy???n',
    codename: 'huyen_bac_tra_my',
    province_code: 49
  },
  {
    name: 'Huy???n Nam Tr?? My',
    code: 516,
    division_type: 'huy???n',
    codename: 'huyen_nam_tra_my',
    province_code: 49
  },
  {
    name: 'Huy???n N??i Th??nh',
    code: 517,
    division_type: 'huy???n',
    codename: 'huyen_nui_thanh',
    province_code: 49
  },
  {
    name: 'Huy???n Ph?? Ninh',
    code: 518,
    division_type: 'huy???n',
    codename: 'huyen_phu_ninh',
    province_code: 49
  },
  {
    name: 'Huy???n N??ng S??n',
    code: 519,
    division_type: 'huy???n',
    codename: 'huyen_nong_son',
    province_code: 49
  },
  {
    name: 'Th??nh ph??? Qu???ng Ng??i',
    code: 522,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_quang_ngai',
    province_code: 51
  },
  {
    name: 'Huy???n B??nh S??n',
    code: 524,
    division_type: 'huy???n',
    codename: 'huyen_binh_son',
    province_code: 51
  },
  {
    name: 'Huy???n Tr?? B???ng',
    code: 525,
    division_type: 'huy???n',
    codename: 'huyen_tra_bong',
    province_code: 51
  },
  {
    name: 'Huy???n S??n T???nh',
    code: 527,
    division_type: 'huy???n',
    codename: 'huyen_son_tinh',
    province_code: 51
  },
  {
    name: 'Huy???n T?? Ngh??a',
    code: 528,
    division_type: 'huy???n',
    codename: 'huyen_tu_nghia',
    province_code: 51
  },
  {
    name: 'Huy???n S??n H??',
    code: 529,
    division_type: 'huy???n',
    codename: 'huyen_son_ha',
    province_code: 51
  },
  {
    name: 'Huy???n S??n T??y',
    code: 530,
    division_type: 'huy???n',
    codename: 'huyen_son_tay',
    province_code: 51
  },
  {
    name: 'Huy???n Minh Long',
    code: 531,
    division_type: 'huy???n',
    codename: 'huyen_minh_long',
    province_code: 51
  },
  {
    name: 'Huy???n Ngh??a H??nh',
    code: 532,
    division_type: 'huy???n',
    codename: 'huyen_nghia_hanh',
    province_code: 51
  },
  {
    name: 'Huy???n M??? ?????c',
    code: 533,
    division_type: 'huy???n',
    codename: 'huyen_mo_duc',
    province_code: 51
  },
  {
    name: 'Th??? x?? ?????c Ph???',
    code: 534,
    division_type: 'th??? x??',
    codename: 'thi_xa_duc_pho',
    province_code: 51
  },
  {
    name: 'Huy???n Ba T??',
    code: 535,
    division_type: 'huy???n',
    codename: 'huyen_ba_to',
    province_code: 51
  },
  {
    name: 'Huy???n L?? S??n',
    code: 536,
    division_type: 'huy???n',
    codename: 'huyen_ly_son',
    province_code: 51
  },
  {
    name: 'Th??nh ph??? Quy Nh??n',
    code: 540,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_quy_nhon',
    province_code: 52
  },
  {
    name: 'Huy???n An L??o',
    code: 542,
    division_type: 'huy???n',
    codename: 'huyen_an_lao',
    province_code: 52
  },
  {
    name: 'Th??? x?? Ho??i Nh??n',
    code: 543,
    division_type: 'th??? x??',
    codename: 'thi_xa_hoai_nhon',
    province_code: 52
  },
  {
    name: 'Huy???n Ho??i ??n',
    code: 544,
    division_type: 'huy???n',
    codename: 'huyen_hoai_an',
    province_code: 52
  },
  {
    name: 'Huy???n Ph?? M???',
    code: 545,
    division_type: 'huy???n',
    codename: 'huyen_phu_my',
    province_code: 52
  },
  {
    name: 'Huy???n V??nh Th???nh',
    code: 546,
    division_type: 'huy???n',
    codename: 'huyen_vinh_thanh',
    province_code: 52
  },
  {
    name: 'Huy???n T??y S??n',
    code: 547,
    division_type: 'huy???n',
    codename: 'huyen_tay_son',
    province_code: 52
  },
  {
    name: 'Huy???n Ph?? C??t',
    code: 548,
    division_type: 'huy???n',
    codename: 'huyen_phu_cat',
    province_code: 52
  },
  {
    name: 'Th??? x?? An Nh??n',
    code: 549,
    division_type: 'th??? x??',
    codename: 'thi_xa_an_nhon',
    province_code: 52
  },
  {
    name: 'Huy???n Tuy Ph?????c',
    code: 550,
    division_type: 'huy???n',
    codename: 'huyen_tuy_phuoc',
    province_code: 52
  },
  {
    name: 'Huy???n V??n Canh',
    code: 551,
    division_type: 'huy???n',
    codename: 'huyen_van_canh',
    province_code: 52
  },
  {
    name: 'Th??nh ph??? Tuy Ho??',
    code: 555,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_tuy_hoa',
    province_code: 54
  },
  {
    name: 'Th??? x?? S??ng C???u',
    code: 557,
    division_type: 'th??? x??',
    codename: 'thi_xa_song_cau',
    province_code: 54
  },
  {
    name: 'Huy???n ?????ng Xu??n',
    code: 558,
    division_type: 'huy???n',
    codename: 'huyen_dong_xuan',
    province_code: 54
  },
  {
    name: 'Huy???n Tuy An',
    code: 559,
    division_type: 'huy???n',
    codename: 'huyen_tuy_an',
    province_code: 54
  },
  {
    name: 'Huy???n S??n H??a',
    code: 560,
    division_type: 'huy???n',
    codename: 'huyen_son_hoa',
    province_code: 54
  },
  {
    name: 'Huy???n S??ng Hinh',
    code: 561,
    division_type: 'huy???n',
    codename: 'huyen_song_hinh',
    province_code: 54
  },
  {
    name: 'Huy???n T??y Ho??',
    code: 562,
    division_type: 'huy???n',
    codename: 'huyen_tay_hoa',
    province_code: 54
  },
  {
    name: 'Huy???n Ph?? Ho??',
    code: 563,
    division_type: 'huy???n',
    codename: 'huyen_phu_hoa',
    province_code: 54
  },
  {
    name: 'Th??? x?? ????ng H??a',
    code: 564,
    division_type: 'th??? x??',
    codename: 'thi_xa_dong_hoa',
    province_code: 54
  },
  {
    name: 'Th??nh ph??? Nha Trang',
    code: 568,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_nha_trang',
    province_code: 56
  },
  {
    name: 'Th??nh ph??? Cam Ranh',
    code: 569,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_cam_ranh',
    province_code: 56
  },
  {
    name: 'Huy???n Cam L??m',
    code: 570,
    division_type: 'huy???n',
    codename: 'huyen_cam_lam',
    province_code: 56
  },
  {
    name: 'Huy???n V???n Ninh',
    code: 571,
    division_type: 'huy???n',
    codename: 'huyen_van_ninh',
    province_code: 56
  },
  {
    name: 'Th??? x?? Ninh H??a',
    code: 572,
    division_type: 'th??? x??',
    codename: 'thi_xa_ninh_hoa',
    province_code: 56
  },
  {
    name: 'Huy???n Kh??nh V??nh',
    code: 573,
    division_type: 'huy???n',
    codename: 'huyen_khanh_vinh',
    province_code: 56
  },
  {
    name: 'Huy???n Di??n Kh??nh',
    code: 574,
    division_type: 'huy???n',
    codename: 'huyen_dien_khanh',
    province_code: 56
  },
  {
    name: 'Huy???n Kh??nh S??n',
    code: 575,
    division_type: 'huy???n',
    codename: 'huyen_khanh_son',
    province_code: 56
  },
  {
    name: 'Huy???n Tr?????ng Sa',
    code: 576,
    division_type: 'huy???n',
    codename: 'huyen_truong_sa',
    province_code: 56
  },
  {
    name: 'Th??nh ph??? Phan Rang-Th??p Ch??m',
    code: 582,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_phan_rang_thap_cham',
    province_code: 58
  },
  {
    name: 'Huy???n B??c ??i',
    code: 584,
    division_type: 'huy???n',
    codename: 'huyen_bac_ai',
    province_code: 58
  },
  {
    name: 'Huy???n Ninh S??n',
    code: 585,
    division_type: 'huy???n',
    codename: 'huyen_ninh_son',
    province_code: 58
  },
  {
    name: 'Huy???n Ninh H???i',
    code: 586,
    division_type: 'huy???n',
    codename: 'huyen_ninh_hai',
    province_code: 58
  },
  {
    name: 'Huy???n Ninh Ph?????c',
    code: 587,
    division_type: 'huy???n',
    codename: 'huyen_ninh_phuoc',
    province_code: 58
  },
  {
    name: 'Huy???n Thu???n B???c',
    code: 588,
    division_type: 'huy???n',
    codename: 'huyen_thuan_bac',
    province_code: 58
  },
  {
    name: 'Huy???n Thu???n Nam',
    code: 589,
    division_type: 'huy???n',
    codename: 'huyen_thuan_nam',
    province_code: 58
  },
  {
    name: 'Th??nh ph??? Phan Thi???t',
    code: 593,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_phan_thiet',
    province_code: 60
  },
  {
    name: 'Th??? x?? La Gi',
    code: 594,
    division_type: 'th??? x??',
    codename: 'thi_xa_la_gi',
    province_code: 60
  },
  {
    name: 'Huy???n Tuy Phong',
    code: 595,
    division_type: 'huy???n',
    codename: 'huyen_tuy_phong',
    province_code: 60
  },
  {
    name: 'Huy???n B???c B??nh',
    code: 596,
    division_type: 'huy???n',
    codename: 'huyen_bac_binh',
    province_code: 60
  },
  {
    name: 'Huy???n H??m Thu???n B???c',
    code: 597,
    division_type: 'huy???n',
    codename: 'huyen_ham_thuan_bac',
    province_code: 60
  },
  {
    name: 'Huy???n H??m Thu???n Nam',
    code: 598,
    division_type: 'huy???n',
    codename: 'huyen_ham_thuan_nam',
    province_code: 60
  },
  {
    name: 'Huy???n T??nh Linh',
    code: 599,
    division_type: 'huy???n',
    codename: 'huyen_tanh_linh',
    province_code: 60
  },
  {
    name: 'Huy???n ?????c Linh',
    code: 600,
    division_type: 'huy???n',
    codename: 'huyen_duc_linh',
    province_code: 60
  },
  {
    name: 'Huy???n H??m T??n',
    code: 601,
    division_type: 'huy???n',
    codename: 'huyen_ham_tan',
    province_code: 60
  },
  {
    name: 'Huy???n Ph?? Qu??',
    code: 602,
    division_type: 'huy???n',
    codename: 'huyen_phu_qui',
    province_code: 60
  },
  {
    name: 'Th??nh ph??? Kon Tum',
    code: 608,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_kon_tum',
    province_code: 62
  },
  {
    name: 'Huy???n ?????k Glei',
    code: 610,
    division_type: 'huy???n',
    codename: 'huyen_dak_glei',
    province_code: 62
  },
  {
    name: 'Huy???n Ng???c H???i',
    code: 611,
    division_type: 'huy???n',
    codename: 'huyen_ngoc_hoi',
    province_code: 62
  },
  {
    name: 'Huy???n ?????k T??',
    code: 612,
    division_type: 'huy???n',
    codename: 'huyen_dak_to',
    province_code: 62
  },
  {
    name: 'Huy???n Kon Pl??ng',
    code: 613,
    division_type: 'huy???n',
    codename: 'huyen_kon_plong',
    province_code: 62
  },
  {
    name: 'Huy???n Kon R???y',
    code: 614,
    division_type: 'huy???n',
    codename: 'huyen_kon_ray',
    province_code: 62
  },
  {
    name: 'Huy???n ?????k H??',
    code: 615,
    division_type: 'huy???n',
    codename: 'huyen_dak_ha',
    province_code: 62
  },
  {
    name: 'Huy???n Sa Th???y',
    code: 616,
    division_type: 'huy???n',
    codename: 'huyen_sa_thay',
    province_code: 62
  },
  {
    name: 'Huy???n Tu M?? R??ng',
    code: 617,
    division_type: 'huy???n',
    codename: 'huyen_tu_mo_rong',
    province_code: 62
  },
  {
    name: "Huy???n Ia H' Drai",
    code: 618,
    division_type: 'huy???n',
    codename: 'huyen_ia_h_drai',
    province_code: 62
  },
  {
    name: 'Th??nh ph??? Pleiku',
    code: 622,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_pleiku',
    province_code: 64
  },
  {
    name: 'Th??? x?? An Kh??',
    code: 623,
    division_type: 'th??? x??',
    codename: 'thi_xa_an_khe',
    province_code: 64
  },
  {
    name: 'Th??? x?? Ayun Pa',
    code: 624,
    division_type: 'th??? x??',
    codename: 'thi_xa_ayun_pa',
    province_code: 64
  },
  {
    name: 'Huy???n KBang',
    code: 625,
    division_type: 'huy???n',
    codename: 'huyen_kbang',
    province_code: 64
  },
  {
    name: 'Huy???n ????k ??oa',
    code: 626,
    division_type: 'huy???n',
    codename: 'huyen_dak_doa',
    province_code: 64
  },
  {
    name: 'Huy???n Ch?? P??h',
    code: 627,
    division_type: 'huy???n',
    codename: 'huyen_chu_pah',
    province_code: 64
  },
  {
    name: 'Huy???n Ia Grai',
    code: 628,
    division_type: 'huy???n',
    codename: 'huyen_ia_grai',
    province_code: 64
  },
  {
    name: 'Huy???n Mang Yang',
    code: 629,
    division_type: 'huy???n',
    codename: 'huyen_mang_yang',
    province_code: 64
  },
  {
    name: 'Huy???n K??ng Chro',
    code: 630,
    division_type: 'huy???n',
    codename: 'huyen_kong_chro',
    province_code: 64
  },
  {
    name: 'Huy???n ?????c C??',
    code: 631,
    division_type: 'huy???n',
    codename: 'huyen_duc_co',
    province_code: 64
  },
  {
    name: 'Huy???n Ch?? Pr??ng',
    code: 632,
    division_type: 'huy???n',
    codename: 'huyen_chu_prong',
    province_code: 64
  },
  {
    name: 'Huy???n Ch?? S??',
    code: 633,
    division_type: 'huy???n',
    codename: 'huyen_chu_se',
    province_code: 64
  },
  {
    name: 'Huy???n ????k P??',
    code: 634,
    division_type: 'huy???n',
    codename: 'huyen_dak_po',
    province_code: 64
  },
  {
    name: 'Huy???n Ia Pa',
    code: 635,
    division_type: 'huy???n',
    codename: 'huyen_ia_pa',
    province_code: 64
  },
  {
    name: 'Huy???n Kr??ng Pa',
    code: 637,
    division_type: 'huy???n',
    codename: 'huyen_krong_pa',
    province_code: 64
  },
  {
    name: 'Huy???n Ph?? Thi???n',
    code: 638,
    division_type: 'huy???n',
    codename: 'huyen_phu_thien',
    province_code: 64
  },
  {
    name: 'Huy???n Ch?? P??h',
    code: 639,
    division_type: 'huy???n',
    codename: 'huyen_chu_puh',
    province_code: 64
  },
  {
    name: 'Th??nh ph??? Bu??n Ma Thu???t',
    code: 643,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_buon_ma_thuot',
    province_code: 66
  },
  {
    name: 'Th??? x?? Bu??n H???',
    code: 644,
    division_type: 'th??? x??',
    codename: 'thi_xa_buon_ho',
    province_code: 66
  },
  {
    name: "Huy???n Ea H'leo",
    code: 645,
    division_type: 'huy???n',
    codename: 'huyen_ea_hleo',
    province_code: 66
  },
  {
    name: 'Huy???n Ea S??p',
    code: 646,
    division_type: 'huy???n',
    codename: 'huyen_ea_sup',
    province_code: 66
  },
  {
    name: 'Huy???n Bu??n ????n',
    code: 647,
    division_type: 'huy???n',
    codename: 'huyen_buon_don',
    province_code: 66
  },
  {
    name: "Huy???n C?? M'gar",
    code: 648,
    division_type: 'huy???n',
    codename: 'huyen_cu_mgar',
    province_code: 66
  },
  {
    name: 'Huy???n Kr??ng B??k',
    code: 649,
    division_type: 'huy???n',
    codename: 'huyen_krong_buk',
    province_code: 66
  },
  {
    name: 'Huy???n Kr??ng N??ng',
    code: 650,
    division_type: 'huy???n',
    codename: 'huyen_krong_nang',
    province_code: 66
  },
  {
    name: 'Huy???n Ea Kar',
    code: 651,
    division_type: 'huy???n',
    codename: 'huyen_ea_kar',
    province_code: 66
  },
  {
    name: "Huy???n M'??r???k",
    code: 652,
    division_type: 'huy???n',
    codename: 'huyen_mdrak',
    province_code: 66
  },
  {
    name: 'Huy???n Kr??ng B??ng',
    code: 653,
    division_type: 'huy???n',
    codename: 'huyen_krong_bong',
    province_code: 66
  },
  {
    name: 'Huy???n Kr??ng P???c',
    code: 654,
    division_type: 'huy???n',
    codename: 'huyen_krong_pac',
    province_code: 66
  },
  {
    name: 'Huy???n Kr??ng A Na',
    code: 655,
    division_type: 'huy???n',
    codename: 'huyen_krong_a_na',
    province_code: 66
  },
  {
    name: 'Huy???n L???k',
    code: 656,
    division_type: 'huy???n',
    codename: 'huyen_lak',
    province_code: 66
  },
  {
    name: 'Huy???n C?? Kuin',
    code: 657,
    division_type: 'huy???n',
    codename: 'huyen_cu_kuin',
    province_code: 66
  },
  {
    name: 'Th??nh ph??? Gia Ngh??a',
    code: 660,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_gia_nghia',
    province_code: 67
  },
  {
    name: 'Huy???n ????k Glong',
    code: 661,
    division_type: 'huy???n',
    codename: 'huyen_dak_glong',
    province_code: 67
  },
  {
    name: 'Huy???n C?? J??t',
    code: 662,
    division_type: 'huy???n',
    codename: 'huyen_cu_jut',
    province_code: 67
  },
  {
    name: 'Huy???n ?????k Mil',
    code: 663,
    division_type: 'huy???n',
    codename: 'huyen_dak_mil',
    province_code: 67
  },
  {
    name: 'Huy???n Kr??ng N??',
    code: 664,
    division_type: 'huy???n',
    codename: 'huyen_krong_no',
    province_code: 67
  },
  {
    name: 'Huy???n ?????k Song',
    code: 665,
    division_type: 'huy???n',
    codename: 'huyen_dak_song',
    province_code: 67
  },
  {
    name: "Huy???n ?????k R'L???p",
    code: 666,
    division_type: 'huy???n',
    codename: 'huyen_dak_rlap',
    province_code: 67
  },
  {
    name: 'Huy???n Tuy ?????c',
    code: 667,
    division_type: 'huy???n',
    codename: 'huyen_tuy_duc',
    province_code: 67
  },
  {
    name: 'Th??nh ph??? ???? L???t',
    code: 672,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_da_lat',
    province_code: 68
  },
  {
    name: 'Th??nh ph??? B???o L???c',
    code: 673,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_bao_loc',
    province_code: 68
  },
  {
    name: 'Huy???n ??am R??ng',
    code: 674,
    division_type: 'huy???n',
    codename: 'huyen_dam_rong',
    province_code: 68
  },
  {
    name: 'Huy???n L???c D????ng',
    code: 675,
    division_type: 'huy???n',
    codename: 'huyen_lac_duong',
    province_code: 68
  },
  {
    name: 'Huy???n L??m H??',
    code: 676,
    division_type: 'huy???n',
    codename: 'huyen_lam_ha',
    province_code: 68
  },
  {
    name: 'Huy???n ????n D????ng',
    code: 677,
    division_type: 'huy???n',
    codename: 'huyen_don_duong',
    province_code: 68
  },
  {
    name: 'Huy???n ?????c Tr???ng',
    code: 678,
    division_type: 'huy???n',
    codename: 'huyen_duc_trong',
    province_code: 68
  },
  {
    name: 'Huy???n Di Linh',
    code: 679,
    division_type: 'huy???n',
    codename: 'huyen_di_linh',
    province_code: 68
  },
  {
    name: 'Huy???n B???o L??m',
    code: 680,
    division_type: 'huy???n',
    codename: 'huyen_bao_lam',
    province_code: 68
  },
  {
    name: 'Huy???n ????? Huoai',
    code: 681,
    division_type: 'huy???n',
    codename: 'huyen_da_huoai',
    province_code: 68
  },
  {
    name: 'Huy???n ????? T???h',
    code: 682,
    division_type: 'huy???n',
    codename: 'huyen_da_teh',
    province_code: 68
  },
  {
    name: 'Huy???n C??t Ti??n',
    code: 683,
    division_type: 'huy???n',
    codename: 'huyen_cat_tien',
    province_code: 68
  },
  {
    name: 'Th??? x?? Ph?????c Long',
    code: 688,
    division_type: 'th??? x??',
    codename: 'thi_xa_phuoc_long',
    province_code: 70
  },
  {
    name: 'Th??nh ph??? ?????ng Xo??i',
    code: 689,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_dong_xoai',
    province_code: 70
  },
  {
    name: 'Th??? x?? B??nh Long',
    code: 690,
    division_type: 'th??? x??',
    codename: 'thi_xa_binh_long',
    province_code: 70
  },
  {
    name: 'Huy???n B?? Gia M???p',
    code: 691,
    division_type: 'huy???n',
    codename: 'huyen_bu_gia_map',
    province_code: 70
  },
  {
    name: 'Huy???n L???c Ninh',
    code: 692,
    division_type: 'huy???n',
    codename: 'huyen_loc_ninh',
    province_code: 70
  },
  {
    name: 'Huy???n B?? ?????p',
    code: 693,
    division_type: 'huy???n',
    codename: 'huyen_bu_dop',
    province_code: 70
  },
  {
    name: 'Huy???n H???n Qu???n',
    code: 694,
    division_type: 'huy???n',
    codename: 'huyen_hon_quan',
    province_code: 70
  },
  {
    name: 'Huy???n ?????ng Ph??',
    code: 695,
    division_type: 'huy???n',
    codename: 'huyen_dong_phu',
    province_code: 70
  },
  {
    name: 'Huy???n B?? ????ng',
    code: 696,
    division_type: 'huy???n',
    codename: 'huyen_bu_dang',
    province_code: 70
  },
  {
    name: 'Huy???n Ch??n Th??nh',
    code: 697,
    division_type: 'huy???n',
    codename: 'huyen_chon_thanh',
    province_code: 70
  },
  {
    name: 'Huy???n Ph?? Ri???ng',
    code: 698,
    division_type: 'huy???n',
    codename: 'huyen_phu_rieng',
    province_code: 70
  },
  {
    name: 'Th??nh ph??? T??y Ninh',
    code: 703,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_tay_ninh',
    province_code: 72
  },
  {
    name: 'Huy???n T??n Bi??n',
    code: 705,
    division_type: 'huy???n',
    codename: 'huyen_tan_bien',
    province_code: 72
  },
  {
    name: 'Huy???n T??n Ch??u',
    code: 706,
    division_type: 'huy???n',
    codename: 'huyen_tan_chau',
    province_code: 72
  },
  {
    name: 'Huy???n D????ng Minh Ch??u',
    code: 707,
    division_type: 'huy???n',
    codename: 'huyen_duong_minh_chau',
    province_code: 72
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 708,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 72
  },
  {
    name: 'Th??? x?? H??a Th??nh',
    code: 709,
    division_type: 'th??? x??',
    codename: 'thi_xa_hoa_thanh',
    province_code: 72
  },
  {
    name: 'Huy???n G?? D???u',
    code: 710,
    division_type: 'huy???n',
    codename: 'huyen_go_dau',
    province_code: 72
  },
  {
    name: 'Huy???n B???n C???u',
    code: 711,
    division_type: 'huy???n',
    codename: 'huyen_ben_cau',
    province_code: 72
  },
  {
    name: 'Th??? x?? Tr???ng B??ng',
    code: 712,
    division_type: 'th??? x??',
    codename: 'thi_xa_trang_bang',
    province_code: 72
  },
  {
    name: 'Th??nh ph??? Th??? D???u M???t',
    code: 718,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_thu_dau_mot',
    province_code: 74
  },
  {
    name: 'Huy???n B??u B??ng',
    code: 719,
    division_type: 'huy???n',
    codename: 'huyen_bau_bang',
    province_code: 74
  },
  {
    name: 'Huy???n D???u Ti???ng',
    code: 720,
    division_type: 'huy???n',
    codename: 'huyen_dau_tieng',
    province_code: 74
  },
  {
    name: 'Th??? x?? B???n C??t',
    code: 721,
    division_type: 'th??? x??',
    codename: 'thi_xa_ben_cat',
    province_code: 74
  },
  {
    name: 'Huy???n Ph?? Gi??o',
    code: 722,
    division_type: 'huy???n',
    codename: 'huyen_phu_giao',
    province_code: 74
  },
  {
    name: 'Th??? x?? T??n Uy??n',
    code: 723,
    division_type: 'th??? x??',
    codename: 'thi_xa_tan_uyen',
    province_code: 74
  },
  {
    name: 'Th??nh ph??? D?? An',
    code: 724,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_di_an',
    province_code: 74
  },
  {
    name: 'Th??nh ph??? Thu???n An',
    code: 725,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_thuan_an',
    province_code: 74
  },
  {
    name: 'Huy???n B???c T??n Uy??n',
    code: 726,
    division_type: 'huy???n',
    codename: 'huyen_bac_tan_uyen',
    province_code: 74
  },
  {
    name: 'Th??nh ph??? Bi??n H??a',
    code: 731,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_bien_hoa',
    province_code: 75
  },
  {
    name: 'Th??nh ph??? Long Kh??nh',
    code: 732,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_long_khanh',
    province_code: 75
  },
  {
    name: 'Huy???n T??n Ph??',
    code: 734,
    division_type: 'huy???n',
    codename: 'huyen_tan_phu',
    province_code: 75
  },
  {
    name: 'Huy???n V??nh C???u',
    code: 735,
    division_type: 'huy???n',
    codename: 'huyen_vinh_cuu',
    province_code: 75
  },
  {
    name: 'Huy???n ?????nh Qu??n',
    code: 736,
    division_type: 'huy???n',
    codename: 'huyen_dinh_quan',
    province_code: 75
  },
  {
    name: 'Huy???n Tr???ng Bom',
    code: 737,
    division_type: 'huy???n',
    codename: 'huyen_trang_bom',
    province_code: 75
  },
  {
    name: 'Huy???n Th???ng Nh???t',
    code: 738,
    division_type: 'huy???n',
    codename: 'huyen_thong_nhat',
    province_code: 75
  },
  {
    name: 'Huy???n C???m M???',
    code: 739,
    division_type: 'huy???n',
    codename: 'huyen_cam_my',
    province_code: 75
  },
  {
    name: 'Huy???n Long Th??nh',
    code: 740,
    division_type: 'huy???n',
    codename: 'huyen_long_thanh',
    province_code: 75
  },
  {
    name: 'Huy???n Xu??n L???c',
    code: 741,
    division_type: 'huy???n',
    codename: 'huyen_xuan_loc',
    province_code: 75
  },
  {
    name: 'Huy???n Nh??n Tr???ch',
    code: 742,
    division_type: 'huy???n',
    codename: 'huyen_nhon_trach',
    province_code: 75
  },
  {
    name: 'Th??nh ph??? V??ng T??u',
    code: 747,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_vung_tau',
    province_code: 77
  },
  {
    name: 'Th??nh ph??? B?? R???a',
    code: 748,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ba_ria',
    province_code: 77
  },
  {
    name: 'Huy???n Ch??u ?????c',
    code: 750,
    division_type: 'huy???n',
    codename: 'huyen_chau_duc',
    province_code: 77
  },
  {
    name: 'Huy???n Xuy??n M???c',
    code: 751,
    division_type: 'huy???n',
    codename: 'huyen_xuyen_moc',
    province_code: 77
  },
  {
    name: 'Huy???n Long ??i???n',
    code: 752,
    division_type: 'huy???n',
    codename: 'huyen_long_dien',
    province_code: 77
  },
  {
    name: 'Huy???n ?????t ?????',
    code: 753,
    division_type: 'huy???n',
    codename: 'huyen_dat_do',
    province_code: 77
  },
  {
    name: 'Th??? x?? Ph?? M???',
    code: 754,
    division_type: 'th??? x??',
    codename: 'thi_xa_phu_my',
    province_code: 77
  },
  {
    name: 'Huy???n C??n ?????o',
    code: 755,
    division_type: 'huy???n',
    codename: 'huyen_con_dao',
    province_code: 77
  },
  {
    name: 'Qu???n 1',
    code: 760,
    division_type: 'qu???n',
    codename: 'quan_1',
    province_code: 79
  },
  {
    name: 'Qu???n 12',
    code: 761,
    division_type: 'qu???n',
    codename: 'quan_12',
    province_code: 79
  },
  {
    name: 'Qu???n G?? V???p',
    code: 764,
    division_type: 'qu???n',
    codename: 'quan_go_vap',
    province_code: 79
  },
  {
    name: 'Qu???n B??nh Th???nh',
    code: 765,
    division_type: 'qu???n',
    codename: 'quan_binh_thanh',
    province_code: 79
  },
  {
    name: 'Qu???n T??n B??nh',
    code: 766,
    division_type: 'qu???n',
    codename: 'quan_tan_binh',
    province_code: 79
  },
  {
    name: 'Qu???n T??n Ph??',
    code: 767,
    division_type: 'qu???n',
    codename: 'quan_tan_phu',
    province_code: 79
  },
  {
    name: 'Qu???n Ph?? Nhu???n',
    code: 768,
    division_type: 'qu???n',
    codename: 'quan_phu_nhuan',
    province_code: 79
  },
  {
    name: 'Th??nh ph??? Th??? ?????c',
    code: 769,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_thu_duc',
    province_code: 79
  },
  {
    name: 'Qu???n 3',
    code: 770,
    division_type: 'qu???n',
    codename: 'quan_3',
    province_code: 79
  },
  {
    name: 'Qu???n 10',
    code: 771,
    division_type: 'qu???n',
    codename: 'quan_10',
    province_code: 79
  },
  {
    name: 'Qu???n 11',
    code: 772,
    division_type: 'qu???n',
    codename: 'quan_11',
    province_code: 79
  },
  {
    name: 'Qu???n 4',
    code: 773,
    division_type: 'qu???n',
    codename: 'quan_4',
    province_code: 79
  },
  {
    name: 'Qu???n 5',
    code: 774,
    division_type: 'qu???n',
    codename: 'quan_5',
    province_code: 79
  },
  {
    name: 'Qu???n 6',
    code: 775,
    division_type: 'qu???n',
    codename: 'quan_6',
    province_code: 79
  },
  {
    name: 'Qu???n 8',
    code: 776,
    division_type: 'qu???n',
    codename: 'quan_8',
    province_code: 79
  },
  {
    name: 'Qu???n B??nh T??n',
    code: 777,
    division_type: 'qu???n',
    codename: 'quan_binh_tan',
    province_code: 79
  },
  {
    name: 'Qu???n 7',
    code: 778,
    division_type: 'qu???n',
    codename: 'quan_7',
    province_code: 79
  },
  {
    name: 'Huy???n C??? Chi',
    code: 783,
    division_type: 'huy???n',
    codename: 'huyen_cu_chi',
    province_code: 79
  },
  {
    name: 'Huy???n H??c M??n',
    code: 784,
    division_type: 'huy???n',
    codename: 'huyen_hoc_mon',
    province_code: 79
  },
  {
    name: 'Huy???n B??nh Ch??nh',
    code: 785,
    division_type: 'huy???n',
    codename: 'huyen_binh_chanh',
    province_code: 79
  },
  {
    name: 'Huy???n Nh?? B??',
    code: 786,
    division_type: 'huy???n',
    codename: 'huyen_nha_be',
    province_code: 79
  },
  {
    name: 'Huy???n C???n Gi???',
    code: 787,
    division_type: 'huy???n',
    codename: 'huyen_can_gio',
    province_code: 79
  },
  {
    name: 'Th??nh ph??? T??n An',
    code: 794,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_tan_an',
    province_code: 80
  },
  {
    name: 'Th??? x?? Ki???n T?????ng',
    code: 795,
    division_type: 'th??? x??',
    codename: 'thi_xa_kien_tuong',
    province_code: 80
  },
  {
    name: 'Huy???n T??n H??ng',
    code: 796,
    division_type: 'huy???n',
    codename: 'huyen_tan_hung',
    province_code: 80
  },
  {
    name: 'Huy???n V??nh H??ng',
    code: 797,
    division_type: 'huy???n',
    codename: 'huyen_vinh_hung',
    province_code: 80
  },
  {
    name: 'Huy???n M???c H??a',
    code: 798,
    division_type: 'huy???n',
    codename: 'huyen_moc_hoa',
    province_code: 80
  },
  {
    name: 'Huy???n T??n Th???nh',
    code: 799,
    division_type: 'huy???n',
    codename: 'huyen_tan_thanh',
    province_code: 80
  },
  {
    name: 'Huy???n Th???nh H??a',
    code: 800,
    division_type: 'huy???n',
    codename: 'huyen_thanh_hoa',
    province_code: 80
  },
  {
    name: 'Huy???n ?????c Hu???',
    code: 801,
    division_type: 'huy???n',
    codename: 'huyen_duc_hue',
    province_code: 80
  },
  {
    name: 'Huy???n ?????c H??a',
    code: 802,
    division_type: 'huy???n',
    codename: 'huyen_duc_hoa',
    province_code: 80
  },
  {
    name: 'Huy???n B???n L???c',
    code: 803,
    division_type: 'huy???n',
    codename: 'huyen_ben_luc',
    province_code: 80
  },
  {
    name: 'Huy???n Th??? Th???a',
    code: 804,
    division_type: 'huy???n',
    codename: 'huyen_thu_thua',
    province_code: 80
  },
  {
    name: 'Huy???n T??n Tr???',
    code: 805,
    division_type: 'huy???n',
    codename: 'huyen_tan_tru',
    province_code: 80
  },
  {
    name: 'Huy???n C???n ???????c',
    code: 806,
    division_type: 'huy???n',
    codename: 'huyen_can_duoc',
    province_code: 80
  },
  {
    name: 'Huy???n C???n Giu???c',
    code: 807,
    division_type: 'huy???n',
    codename: 'huyen_can_giuoc',
    province_code: 80
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 808,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 80
  },
  {
    name: 'Th??nh ph??? M??? Tho',
    code: 815,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_my_tho',
    province_code: 82
  },
  {
    name: 'Th??? x?? G?? C??ng',
    code: 816,
    division_type: 'th??? x??',
    codename: 'thi_xa_go_cong',
    province_code: 82
  },
  {
    name: 'Th??? x?? Cai L???y',
    code: 817,
    division_type: 'th??? x??',
    codename: 'thi_xa_cai_lay',
    province_code: 82
  },
  {
    name: 'Huy???n T??n Ph?????c',
    code: 818,
    division_type: 'huy???n',
    codename: 'huyen_tan_phuoc',
    province_code: 82
  },
  {
    name: 'Huy???n C??i B??',
    code: 819,
    division_type: 'huy???n',
    codename: 'huyen_cai_be',
    province_code: 82
  },
  {
    name: 'Huy???n Cai L???y',
    code: 820,
    division_type: 'huy???n',
    codename: 'huyen_cai_lay',
    province_code: 82
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 821,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 82
  },
  {
    name: 'Huy???n Ch??? G???o',
    code: 822,
    division_type: 'huy???n',
    codename: 'huyen_cho_gao',
    province_code: 82
  },
  {
    name: 'Huy???n G?? C??ng T??y',
    code: 823,
    division_type: 'huy???n',
    codename: 'huyen_go_cong_tay',
    province_code: 82
  },
  {
    name: 'Huy???n G?? C??ng ????ng',
    code: 824,
    division_type: 'huy???n',
    codename: 'huyen_go_cong_dong',
    province_code: 82
  },
  {
    name: 'Huy???n T??n Ph?? ????ng',
    code: 825,
    division_type: 'huy???n',
    codename: 'huyen_tan_phu_dong',
    province_code: 82
  },
  {
    name: 'Th??nh ph??? B???n Tre',
    code: 829,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ben_tre',
    province_code: 83
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 831,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 83
  },
  {
    name: 'Huy???n Ch??? L??ch',
    code: 832,
    division_type: 'huy???n',
    codename: 'huyen_cho_lach',
    province_code: 83
  },
  {
    name: 'Huy???n M??? C??y Nam',
    code: 833,
    division_type: 'huy???n',
    codename: 'huyen_mo_cay_nam',
    province_code: 83
  },
  {
    name: 'Huy???n Gi???ng Tr??m',
    code: 834,
    division_type: 'huy???n',
    codename: 'huyen_giong_trom',
    province_code: 83
  },
  {
    name: 'Huy???n B??nh ?????i',
    code: 835,
    division_type: 'huy???n',
    codename: 'huyen_binh_dai',
    province_code: 83
  },
  {
    name: 'Huy???n Ba Tri',
    code: 836,
    division_type: 'huy???n',
    codename: 'huyen_ba_tri',
    province_code: 83
  },
  {
    name: 'Huy???n Th???nh Ph??',
    code: 837,
    division_type: 'huy???n',
    codename: 'huyen_thanh_phu',
    province_code: 83
  },
  {
    name: 'Huy???n M??? C??y B???c',
    code: 838,
    division_type: 'huy???n',
    codename: 'huyen_mo_cay_bac',
    province_code: 83
  },
  {
    name: 'Th??nh ph??? Tr?? Vinh',
    code: 842,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_tra_vinh',
    province_code: 84
  },
  {
    name: 'Huy???n C??ng Long',
    code: 844,
    division_type: 'huy???n',
    codename: 'huyen_cang_long',
    province_code: 84
  },
  {
    name: 'Huy???n C???u K??',
    code: 845,
    division_type: 'huy???n',
    codename: 'huyen_cau_ke',
    province_code: 84
  },
  {
    name: 'Huy???n Ti???u C???n',
    code: 846,
    division_type: 'huy???n',
    codename: 'huyen_tieu_can',
    province_code: 84
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 847,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 84
  },
  {
    name: 'Huy???n C???u Ngang',
    code: 848,
    division_type: 'huy???n',
    codename: 'huyen_cau_ngang',
    province_code: 84
  },
  {
    name: 'Huy???n Tr?? C??',
    code: 849,
    division_type: 'huy???n',
    codename: 'huyen_tra_cu',
    province_code: 84
  },
  {
    name: 'Huy???n Duy??n H???i',
    code: 850,
    division_type: 'huy???n',
    codename: 'huyen_duyen_hai',
    province_code: 84
  },
  {
    name: 'Th??? x?? Duy??n H???i',
    code: 851,
    division_type: 'th??? x??',
    codename: 'thi_xa_duyen_hai',
    province_code: 84
  },
  {
    name: 'Th??nh ph??? V??nh Long',
    code: 855,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_vinh_long',
    province_code: 86
  },
  {
    name: 'Huy???n Long H???',
    code: 857,
    division_type: 'huy???n',
    codename: 'huyen_long_ho',
    province_code: 86
  },
  {
    name: 'Huy???n Mang Th??t',
    code: 858,
    division_type: 'huy???n',
    codename: 'huyen_mang_thit',
    province_code: 86
  },
  {
    name: 'Huy???n V??ng Li??m',
    code: 859,
    division_type: 'huy???n',
    codename: 'huyen_vung_liem',
    province_code: 86
  },
  {
    name: 'Huy???n Tam B??nh',
    code: 860,
    division_type: 'huy???n',
    codename: 'huyen_tam_binh',
    province_code: 86
  },
  {
    name: 'Th??? x?? B??nh Minh',
    code: 861,
    division_type: 'th??? x??',
    codename: 'thi_xa_binh_minh',
    province_code: 86
  },
  {
    name: 'Huy???n Tr?? ??n',
    code: 862,
    division_type: 'huy???n',
    codename: 'huyen_tra_on',
    province_code: 86
  },
  {
    name: 'Huy???n B??nh T??n',
    code: 863,
    division_type: 'huy???n',
    codename: 'huyen_binh_tan',
    province_code: 86
  },
  {
    name: 'Th??nh ph??? Cao L??nh',
    code: 866,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_cao_lanh',
    province_code: 87
  },
  {
    name: 'Th??nh ph??? Sa ????c',
    code: 867,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_sa_dec',
    province_code: 87
  },
  {
    name: 'Th??nh ph??? H???ng Ng???',
    code: 868,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_hong_ngu',
    province_code: 87
  },
  {
    name: 'Huy???n T??n H???ng',
    code: 869,
    division_type: 'huy???n',
    codename: 'huyen_tan_hong',
    province_code: 87
  },
  {
    name: 'Huy???n H???ng Ng???',
    code: 870,
    division_type: 'huy???n',
    codename: 'huyen_hong_ngu',
    province_code: 87
  },
  {
    name: 'Huy???n Tam N??ng',
    code: 871,
    division_type: 'huy???n',
    codename: 'huyen_tam_nong',
    province_code: 87
  },
  {
    name: 'Huy???n Th??p M?????i',
    code: 872,
    division_type: 'huy???n',
    codename: 'huyen_thap_muoi',
    province_code: 87
  },
  {
    name: 'Huy???n Cao L??nh',
    code: 873,
    division_type: 'huy???n',
    codename: 'huyen_cao_lanh',
    province_code: 87
  },
  {
    name: 'Huy???n Thanh B??nh',
    code: 874,
    division_type: 'huy???n',
    codename: 'huyen_thanh_binh',
    province_code: 87
  },
  {
    name: 'Huy???n L???p V??',
    code: 875,
    division_type: 'huy???n',
    codename: 'huyen_lap_vo',
    province_code: 87
  },
  {
    name: 'Huy???n Lai Vung',
    code: 876,
    division_type: 'huy???n',
    codename: 'huyen_lai_vung',
    province_code: 87
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 877,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 87
  },
  {
    name: 'Th??nh ph??? Long Xuy??n',
    code: 883,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_long_xuyen',
    province_code: 89
  },
  {
    name: 'Th??nh ph??? Ch??u ?????c',
    code: 884,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_chau_doc',
    province_code: 89
  },
  {
    name: 'Huy???n An Ph??',
    code: 886,
    division_type: 'huy???n',
    codename: 'huyen_an_phu',
    province_code: 89
  },
  {
    name: 'Th??? x?? T??n Ch??u',
    code: 887,
    division_type: 'th??? x??',
    codename: 'thi_xa_tan_chau',
    province_code: 89
  },
  {
    name: 'Huy???n Ph?? T??n',
    code: 888,
    division_type: 'huy???n',
    codename: 'huyen_phu_tan',
    province_code: 89
  },
  {
    name: 'Huy???n Ch??u Ph??',
    code: 889,
    division_type: 'huy???n',
    codename: 'huyen_chau_phu',
    province_code: 89
  },
  {
    name: 'Huy???n T???nh Bi??n',
    code: 890,
    division_type: 'huy???n',
    codename: 'huyen_tinh_bien',
    province_code: 89
  },
  {
    name: 'Huy???n Tri T??n',
    code: 891,
    division_type: 'huy???n',
    codename: 'huyen_tri_ton',
    province_code: 89
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 892,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 89
  },
  {
    name: 'Huy???n Ch??? M???i',
    code: 893,
    division_type: 'huy???n',
    codename: 'huyen_cho_moi',
    province_code: 89
  },
  {
    name: 'Huy???n Tho???i S??n',
    code: 894,
    division_type: 'huy???n',
    codename: 'huyen_thoai_son',
    province_code: 89
  },
  {
    name: 'Th??nh ph??? R???ch Gi??',
    code: 899,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_rach_gia',
    province_code: 91
  },
  {
    name: 'Th??nh ph??? H?? Ti??n',
    code: 900,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ha_tien',
    province_code: 91
  },
  {
    name: 'Huy???n Ki??n L????ng',
    code: 902,
    division_type: 'huy???n',
    codename: 'huyen_kien_luong',
    province_code: 91
  },
  {
    name: 'Huy???n H??n ?????t',
    code: 903,
    division_type: 'huy???n',
    codename: 'huyen_hon_dat',
    province_code: 91
  },
  {
    name: 'Huy???n T??n Hi???p',
    code: 904,
    division_type: 'huy???n',
    codename: 'huyen_tan_hiep',
    province_code: 91
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 905,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 91
  },
  {
    name: 'Huy???n Gi???ng Ri???ng',
    code: 906,
    division_type: 'huy???n',
    codename: 'huyen_giong_rieng',
    province_code: 91
  },
  {
    name: 'Huy???n G?? Quao',
    code: 907,
    division_type: 'huy???n',
    codename: 'huyen_go_quao',
    province_code: 91
  },
  {
    name: 'Huy???n An Bi??n',
    code: 908,
    division_type: 'huy???n',
    codename: 'huyen_an_bien',
    province_code: 91
  },
  {
    name: 'Huy???n An Minh',
    code: 909,
    division_type: 'huy???n',
    codename: 'huyen_an_minh',
    province_code: 91
  },
  {
    name: 'Huy???n V??nh Thu???n',
    code: 910,
    division_type: 'huy???n',
    codename: 'huyen_vinh_thuan',
    province_code: 91
  },
  {
    name: 'Th??nh ph??? Ph?? Qu???c',
    code: 911,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_phu_quoc',
    province_code: 91
  },
  {
    name: 'Huy???n Ki??n H???i',
    code: 912,
    division_type: 'huy???n',
    codename: 'huyen_kien_hai',
    province_code: 91
  },
  {
    name: 'Huy???n U Minh Th?????ng',
    code: 913,
    division_type: 'huy???n',
    codename: 'huyen_u_minh_thuong',
    province_code: 91
  },
  {
    name: 'Huy???n Giang Th??nh',
    code: 914,
    division_type: 'huy???n',
    codename: 'huyen_giang_thanh',
    province_code: 91
  },
  {
    name: 'Qu???n Ninh Ki???u',
    code: 916,
    division_type: 'qu???n',
    codename: 'quan_ninh_kieu',
    province_code: 92
  },
  {
    name: 'Qu???n ?? M??n',
    code: 917,
    division_type: 'qu???n',
    codename: 'quan_o_mon',
    province_code: 92
  },
  {
    name: 'Qu???n B??nh Thu???',
    code: 918,
    division_type: 'qu???n',
    codename: 'quan_binh_thuy',
    province_code: 92
  },
  {
    name: 'Qu???n C??i R??ng',
    code: 919,
    division_type: 'qu???n',
    codename: 'quan_cai_rang',
    province_code: 92
  },
  {
    name: 'Qu???n Th???t N???t',
    code: 923,
    division_type: 'qu???n',
    codename: 'quan_thot_not',
    province_code: 92
  },
  {
    name: 'Huy???n V??nh Th???nh',
    code: 924,
    division_type: 'huy???n',
    codename: 'huyen_vinh_thanh',
    province_code: 92
  },
  {
    name: 'Huy???n C??? ?????',
    code: 925,
    division_type: 'huy???n',
    codename: 'huyen_co_do',
    province_code: 92
  },
  {
    name: 'Huy???n Phong ??i???n',
    code: 926,
    division_type: 'huy???n',
    codename: 'huyen_phong_dien',
    province_code: 92
  },
  {
    name: 'Huy???n Th???i Lai',
    code: 927,
    division_type: 'huy???n',
    codename: 'huyen_thoi_lai',
    province_code: 92
  },
  {
    name: 'Th??nh ph??? V??? Thanh',
    code: 930,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_vi_thanh',
    province_code: 93
  },
  {
    name: 'Th??nh ph??? Ng?? B???y',
    code: 931,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_nga_bay',
    province_code: 93
  },
  {
    name: 'Huy???n Ch??u Th??nh A',
    code: 932,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh_a',
    province_code: 93
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 933,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 93
  },
  {
    name: 'Huy???n Ph???ng Hi???p',
    code: 934,
    division_type: 'huy???n',
    codename: 'huyen_phung_hiep',
    province_code: 93
  },
  {
    name: 'Huy???n V??? Thu???',
    code: 935,
    division_type: 'huy???n',
    codename: 'huyen_vi_thuy',
    province_code: 93
  },
  {
    name: 'Huy???n Long M???',
    code: 936,
    division_type: 'huy???n',
    codename: 'huyen_long_my',
    province_code: 93
  },
  {
    name: 'Th??? x?? Long M???',
    code: 937,
    division_type: 'th??? x??',
    codename: 'thi_xa_long_my',
    province_code: 93
  },
  {
    name: 'Th??nh ph??? S??c Tr??ng',
    code: 941,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_soc_trang',
    province_code: 94
  },
  {
    name: 'Huy???n Ch??u Th??nh',
    code: 942,
    division_type: 'huy???n',
    codename: 'huyen_chau_thanh',
    province_code: 94
  },
  {
    name: 'Huy???n K??? S??ch',
    code: 943,
    division_type: 'huy???n',
    codename: 'huyen_ke_sach',
    province_code: 94
  },
  {
    name: 'Huy???n M??? T??',
    code: 944,
    division_type: 'huy???n',
    codename: 'huyen_my_tu',
    province_code: 94
  },
  {
    name: 'Huy???n C?? Lao Dung',
    code: 945,
    division_type: 'huy???n',
    codename: 'huyen_cu_lao_dung',
    province_code: 94
  },
  {
    name: 'Huy???n Long Ph??',
    code: 946,
    division_type: 'huy???n',
    codename: 'huyen_long_phu',
    province_code: 94
  },
  {
    name: 'Huy???n M??? Xuy??n',
    code: 947,
    division_type: 'huy???n',
    codename: 'huyen_my_xuyen',
    province_code: 94
  },
  {
    name: 'Th??? x?? Ng?? N??m',
    code: 948,
    division_type: 'th??? x??',
    codename: 'thi_xa_nga_nam',
    province_code: 94
  },
  {
    name: 'Huy???n Th???nh Tr???',
    code: 949,
    division_type: 'huy???n',
    codename: 'huyen_thanh_tri',
    province_code: 94
  },
  {
    name: 'Th??? x?? V??nh Ch??u',
    code: 950,
    division_type: 'th??? x??',
    codename: 'thi_xa_vinh_chau',
    province_code: 94
  },
  {
    name: 'Huy???n Tr???n ?????',
    code: 951,
    division_type: 'huy???n',
    codename: 'huyen_tran_de',
    province_code: 94
  },
  {
    name: 'Th??nh ph??? B???c Li??u',
    code: 954,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_bac_lieu',
    province_code: 95
  },
  {
    name: 'Huy???n H???ng D??n',
    code: 956,
    division_type: 'huy???n',
    codename: 'huyen_hong_dan',
    province_code: 95
  },
  {
    name: 'Huy???n Ph?????c Long',
    code: 957,
    division_type: 'huy???n',
    codename: 'huyen_phuoc_long',
    province_code: 95
  },
  {
    name: 'Huy???n V??nh L???i',
    code: 958,
    division_type: 'huy???n',
    codename: 'huyen_vinh_loi',
    province_code: 95
  },
  {
    name: 'Th??? x?? Gi?? Rai',
    code: 959,
    division_type: 'th??? x??',
    codename: 'thi_xa_gia_rai',
    province_code: 95
  },
  {
    name: 'Huy???n ????ng H???i',
    code: 960,
    division_type: 'huy???n',
    codename: 'huyen_dong_hai',
    province_code: 95
  },
  {
    name: 'Huy???n Ho?? B??nh',
    code: 961,
    division_type: 'huy???n',
    codename: 'huyen_hoa_binh',
    province_code: 95
  },
  {
    name: 'Th??nh ph??? C?? Mau',
    code: 964,
    division_type: 'th??nh ph???',
    codename: 'thanh_pho_ca_mau',
    province_code: 96
  },
  {
    name: 'Huy???n U Minh',
    code: 966,
    division_type: 'huy???n',
    codename: 'huyen_u_minh',
    province_code: 96
  },
  {
    name: 'Huy???n Th???i B??nh',
    code: 967,
    division_type: 'huy???n',
    codename: 'huyen_thoi_binh',
    province_code: 96
  },
  {
    name: 'Huy???n Tr???n V??n Th???i',
    code: 968,
    division_type: 'huy???n',
    codename: 'huyen_tran_van_thoi',
    province_code: 96
  },
  {
    name: 'Huy???n C??i N?????c',
    code: 969,
    division_type: 'huy???n',
    codename: 'huyen_cai_nuoc',
    province_code: 96
  },
  {
    name: 'Huy???n ?????m D??i',
    code: 970,
    division_type: 'huy???n',
    codename: 'huyen_dam_doi',
    province_code: 96
  },
  {
    name: 'Huy???n N??m C??n',
    code: 971,
    division_type: 'huy???n',
    codename: 'huyen_nam_can',
    province_code: 96
  },
  {
    name: 'Huy???n Ph?? T??n',
    code: 972,
    division_type: 'huy???n',
    codename: 'huyen_phu_tan',
    province_code: 96
  },
  {
    name: 'Huy???n Ng???c Hi???n',
    code: 973,
    division_type: 'huy???n',
    codename: 'huyen_ngoc_hien',
    province_code: 96
  }
];
