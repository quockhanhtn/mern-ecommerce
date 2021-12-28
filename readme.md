# Tiểu luận chuyên ngành Công nghệ phần mềm
- Đề tài: **Website bán điện thoại và phụ kiện dùng MERN stack**
- Giáo viên hướng dẫn: TS. Huỳnh Xuân Phụng
- Sinh viên:
  - Hồ Huy Hoàng. MSSV: 18110284. Lớp đại trà
  - Lâm Quốc Khánh. MSSV: 18110304. Lớp đại trà


## Hướng dẫn cài đặt

### Yêu cầu

- NodeJS, nên dùng phiên bản LTS (Long Term Support). Có thể tại đây https://nodejs.org/en/download/

### Server api

- Mở command line (terminal) tại thư mục `server`
- Dùng lệnh sau để cài đặt các package trong project
    #### `npm install`
- Chuẩn bị các biến môi trường như sau
	|Tên biến              |Bắt buộc |Mô tả                                                                                     |Mặc định        |
	|----------------------|---------|------------------------------------------------------------------------------------------|----------------|
	|PORT                  |❌       |Port để listen (lắng nghe) server api                                                     |3001            |
	|MONGO_URI             |✔       |Connection string để kết nối tới MongoDb                                                  |                |
	|JWT_SECRET            |✔       |Khóa bí mật (secret key), dùng trong Json Web token                                       |                |
	|JWT_EXPIRES_IN        |✔       |Thời gian có hiệu lực của jsonWebToken. VD: 15m, 1d, 30d ...                              |                |
	|JWT_REFRESH_EXPIRES_IN|✔       |Thời gian có hiệu lực của refreshToken. VD: 15d, 30d ...                                  |                |
	|VNPAY_SECRET          |✔       |VNpay Secert                                                                              |                |
	|VNPAY_TMN_CODE        |✔       |VNPay TMN Code                                                                            |                |
	|VNPAY_URL             |✔       |VNPay Url                                                                                 |                |
	|FIREBASE_PROJECT_ID   |✔       |Firebase project Id                                                                       |                |
	|FIREBASE_PRIVATE_KEY  |✔       |Firebase private key                                                                      |                |
	|FIREBASE_CLIENT_EMAIL |✔       |Firebase client email                                                                     |                |

- Có thể tạo file `nodemon.json` trong thư mục server với nội dung như sau:
	```json
	"env": {
		"PORT": "3001",
		"MONGO_URI": "mongodb://localhost:27017/cellphones",
		"JWT_SECRET": "S3cr3tK3y",
		"JWT_EXPIRES_IN": "7d",
		"JWT_REFRESH_EXPIRES_IN": "30d",
		"VNPAY_SECRET": "OVOALYVDSIREXCICBCAANMFTAEDVNNCV",
		"VNPAY_TMN_CODE": "QL509E3K",
		"VNPAY_URL": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
		"FIREBASE_PROJECT_ID": "fb-pro-10",
		"FIREBASE_PRIVATE_KEY": "-----BEGIN PRIVATE KEY-----\n{YOUR_KEY}==\n-----END PRIVATE KEY-----\n",
		"FIREBASE_CLIENT_EMAIL": "firebase-adminsdk-@fb-pro-10.iam.gserviceaccount.com"
	  }
	}
	```
- Dùng lệnh để chạy server với các biến trong file `nodemon.json`
    #### `npm run dev`

- Dùng lệnh sau để chạy server ở môi trường production, các biến môi trường cần phải được setup riêng, không dùng file `nodemon.json`
    #### `npm run start`

### Client app

- Mở command line (terminal) tại thư mục `client`
- Dùng lệnh sau để cài đặt các package trong project
    #### `npm ci`
- Tạo file `.env` trong thư mục `client` với các biến sau

	|Tên biến                    |Bắt buộc |Mô tả                                   |Mặc định                     |
	|----------------------------|---------|----------------------------------------|-----------------------------|
	|PORT                        |❌       |Port để listen (lắng nghe) client app   |3000                         |
	|REACT_APP_API_BASE_URL      |❌       |Base URL của api                        |http://localhost:3001/api/v1 |
	|REACT_APP_FIREBASE_CONFIG   |✔       |Firebase config (*)                     |                             |

	(*) REACT_APP_FIREBASE_CONFIG có dạng chuỗi được JSON.stringify từ object config
	
	Ví dụ:
	```json
	objecConfig = {
    "databaseURL": "gs://fb-pro-10.appspot.com",
    "apiKey": "xxx",
    "authDomain": "fb-pro-10.firebaseapp.com",
    "projectId": "fb-pro-10",
    "storageBucket": "fb-pro-10.appspot.com",
    "messagingSenderId": "111",
    "appId": "1:11:web:abcd",
    "measurementId": "G-HJJH"
	}
	```
	=> `REACT_APP_FIREBASE_CONFIG={"databaseURL":"gs://fb-pro-10.appspot.com","apiKey":"xxx","authDomain":"fb-pro-10.firebaseapp.com","projectId":"fb-pro-10","storageBucket":"fb-pro-10.appspot.com","messagingSenderId":"111","appId":"1:11:web:abcd","measurementId":"G-HJJH"}`
- Dùng lệnh sau để build ứng dụng
    #### `npm run build`
- Cài đặt thư viện serve và chạy app
    #### `npm install -g serve`
	#### `serve -d build`

<br>
<br>

## Tài liệu
- Đặc tả yêu cầu: 
  - [Xem online (markdown)](./docs/00_vi_UserRequirement.md) 
  - [Download pdf](./docs/00_vi_UserRequirement.pdf)
- UserCase: 
  - [File pdf](./docs/01_vi_Usercase.pdf) 
  - [File .drawio](./docs/01_vi_Usercase.drawio)
  
  ![usercase image](./docs/images/usercase.svg)


<br>
<br>

<details>
  <summary>Readme.md in English version</summary>
# [Under construction] eCommerce website for Cellphones and accessories store

<br>
<br>

## Overview

- Technical: **MERN Stack** (**M**ongoDB **E**xpress **R**eact **N**odeJs)
- Subject: Essay on software engineering (Tiểu luận chuyên ngành Công nghệ phần mềm - Hệ đại trà).
- Instructor: PhD. **Phung** Huynh Xuan
- Authors:
  - **Hoang** Ho Huy <@hohuyhoangg>
  - **Khanh** Lam Quoc <@quockhanhtn>

<br>
<br>

## Documents (in Vietnamese)
- [UserRequirement](./docs/00_vi_UserRequirement.md)
- [UserCase (was drew with draw.io)](./docs/01_vi_Usercase.drawio)
  <details>
    <summary>Click to show usercase</summary>

    ![usercase image](./docs/images/usercase.svg)
  </details>


<br>
<br>

## Project Structure

<pre>
<b>project</b>
├── docs   (Document of project)
├── client (Frontend using React JS)
├── server (Backend using Node with Express library and MongoDB for database)
</pre>

<br>
<br>

</details>
