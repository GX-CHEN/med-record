## Med Schedule Web App

Responsive React Web App that record the medicine take schedule with English/Chinese support

## Demo Website

https://biteapie.com
Doctor Account: doctor/doctor
Patient Account: test/test

## Use the following commands to build and run the app

Front-end is using React, back-end is using NodeJS. The core technologies are both JavaScript, and both packaged using npm (node package manager)

### Install global npm command

```
npm install -g nodemon
npm install -g serve
```

### Build and run

There are two folders inside the project, one is node back-end (server), the other one is react frontend (client), go to each folder and run `npm install` to install dependencies. Then go to each folder to run `npm start` to start the application

### RESTful URI

CRUD (create, read, update, delete) action for the following type:

1.  User account
2.  Medicine
3.  Experiment
4.  Daily report for med taken (patient)
5.  Read record (table view for doctor)

## Application Screenshots

### Login Page (in English and Chinese), language can switch using top-left icon

<p float="left">
<img src="screenshots/login.jpg" alt="Login Page"  width="300"/>
<img src="screenshots/login_chinese.jpg" alt="Login Page (in Chinese)" width="300" />
</p>
<div style="clear: both;"></div>

### Patients have daily report page (report icon will be disabled after reporting until next day)

<p float="left">
<img src="screenshots/patient_reporting.jpg" alt="Patient Reporting" width="300" />
<img src="screenshots/reporting_confirmation.jpg" alt="Reporting Confirmation" width="300" />
<img src="screenshots/reporting_refresh.jpg" alt="Reporting Refresh" width="300" />
</p>
<div style="clear: both;"></div>

### Doctor can manage medicines, and view med taken history

<p float="left">
<img src="screenshots/med_history.jpg" alt="Med History" width="300" />
<img src="screenshots/med_management.jpg" alt="Med Management" width="300" />
<div style="clear: both;"></div>
</p>
