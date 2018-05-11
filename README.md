## Use the following commands to build and run the app

### Install global npm command
```
npm install -g nodemon
npm install -g serve
```

### Build and run
There are two folders inside the project, one is node backend (server), the other one is react frontend (client), go to each folder and run ```npm install``` to install dependecies. Then go to each folder to run ```npm start``` to start the application

## Mongodb data schema
There are 3 main collection for this application:
- Medicine
  ```
  {
    medicine_uid: uid,
    medicine_name: string,
    take_time: [time],
    take_period: number(days) 
  }
  ```
- User
  ```
  {
    user_uid: uid,
    name: string,
    username: string,
    password: string,
    created_time: time,
    medicine_list: [medicine_uid],
    user_type: "patient" || "doctor"
  }
  ```
- Experiment
  ```
  {
    experiment_uid: uid,
    experiment_id: number,
    experiment_name: string,
    medicine_list: [medicine_uid],
    patient_list: [user_uid],
    start_date: date
  }
  ```
- Daily Record
  ```
  {
    daily_record_uid: uid,
    date: date,
    dataList: {
      "user_uid": [ 
        {
          "medicine_id": [timestamp],
          ...
        }
        ...
        ]
      ...
    }
  }
  ```

## RESTful URI
CRUD (create, read, update, ~~delete~~) action for the following type:
1. User account
2. Medicine
3. Experiment
4. Time punching
5. Read record (table view for doctor)
