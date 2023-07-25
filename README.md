### Dự án Structure Express JS

## Thư viện DEV

1/NODEMON :npm i nodemon --save-dev
=> giúp theo dõi file và reload khi có sự thay đổi

## Thư viện production
1/ express: npm i express
=> tạo ra server express
2/dotenv :npm i dotenv
=>Đọc file .env

## Bộ thư viện bable 
npm i @babel/cli @babel/core @babel/preset-env @babel/node
=> kich hoạt chuyển đổi version ES cao thành  version phù hợp với môi trường
=> lưu ý :
    + phải có file .babelrc cùng cấp với .env
    + kích hoạt đầy đủ @babel/cli @babel/core @babel/preset-env @babel/node
    + trong lệnh dự án chạy thêm : "pro": "babel-node ./src/server.js"  và   "dev": "nodemon --inspect --exec babel-node src/server.js"