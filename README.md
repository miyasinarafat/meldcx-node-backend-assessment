## Installation steps

### 1. Clone repository
```bash
git clone git@github.com:miyasinarafat/meldcx-node-backend-assessment.git
```

### 2. Install the packages
```bash
npm install
```

### 3. Run application
```bash
npm start
```

## Access APIs
```bash
http://localhost:8000/
```

### File store
```bash
# POST::http://localhost:8080/files

{
    "data": {
        "filename": "1677807415565-meldcx-2023_02_06_22171928350589116_thumbnail_1.jpg",
        "publicKey": "2fb98703eef88ab060398d4b8e42083c6e45469dd7531a3810095b17efd8acfe",
        "privateKey": "7869fd46bb30e9cb33c8d4e2c5e1afb29350f3a4ab8d9868c41bfecb77a646e1"
    },
    "message": "File has been uploaded."
}
```

### File download
```bash
# GET::http://localhost:8080/files/7869fd46bb30e9cb33c8d4e2c5e1afb29350f3a4ab8d9868c41bfecb77a646e1
```

### File DELETE
```bash
# DELETE::http://localhost:8080/files/7869fd46bb30e9cb33c8d4e2c5e1afb29350f3a4ab8d9868c41bfecb77a646e1

{
    "message": "File has been deleted."
}
```

## NOTES
- I would write and unit tests using [jest.js](https://jestjs.io/)
  - Integration tests using [mocha.js](https://mochajs.org/) and [chai.js](https://www.chaijs.com/)
- I would add the gcp cloud storage using [multer](https://github.com/expressjs/multer) [custom storage engine](https://github.com/expressjs/multer/blob/master/StorageEngine.md) features.

