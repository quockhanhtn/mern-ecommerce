# How to run

- Please set environment variables before run.
  |Name            |Require |Description                   |Default                              |
  |----------------|--------|------------------------------|-------------------------------------|
  |PORT            | ❌     | Port to running server       | 3001                                |
  |MONGO_URI       | ✔      | Connect string to MongoDb    |                                     |
  
- Run server by command:
  ```bash
  npm i && npm run start
  ```

- Order document
  - Create by customer
    - Case 1: User has register and login to system
      - User must add address to address list
    - Case 2: Guest (just buy without login)