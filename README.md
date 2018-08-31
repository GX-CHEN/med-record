# Med Schedule Web App

## What is this?

- Responsive React Web App that record the medicine taken status (for medicine experiment research).
- Doctor can specify medicines, and view the med taken history by days.
- Patient/volunteers need to report that they took the medicine everyday.
- Has English/Chinese support. Language can be switched in one click.

## Demo Website

- https://biteapie.com
- Doctor Account: doctor/doctor
- Patient Account: test/test

## What can it do?

### Login with different roles

- There are two role permissions: doctor and patient. The login page is the same.
- Two language can switch using top-left icon

<p float="left">
<img src="screenshots/login.jpg" alt="Login Page"  width="260"/>
<img src="screenshots/login_chinese.jpg" alt="Login Page (in Chinese)" width="260" />
</p>
<div style="clear: both;"></div>

### Patients View

- After patient login, the daily report page will display. There's only one functional button (besides language switch button) that patient can click, which is the report button.
- Patient should click report button when they take the medicine for a certain day. Report button will be disabled after reporting until next day.

<p float="left">
<img src="screenshots/patient_reporting.jpg" alt="Patient Reporting" width="260" />
<img src="screenshots/reporting_confirmation.jpg" alt="Reporting Confirmation" width="260" />
<img src="screenshots/reporting_refresh.jpg" alt="Reporting Refresh" width="260" />
</p>
<div style="clear: both;"></div>

### Doctor View

- After doctor login, there are two options "manage medicines", and "view med taken history"
- In "manage medicines" page, doctor can specify (add/delete) the medicines patient should take daily. These med info will display on patient view when patient take the meds
- In "view med taken history" page, doctor can select a certain date, to see the med-taken status. A green check will appear after patient name only if already reported

<p float="left">
<img src="screenshots/med_history.jpg" alt="Med History" width="260" />
<img src="screenshots/med_management.jpg" alt="Med Management" width="260" />
<div style="clear: both;"></div>
</p>

## How to build?

### Install app dependencies

```bash
# install global npm package which helps run the app
npm install -g nodemon
npm install -g serve

# install dependencies for both server and client side
cd server
npm install

cd ../client
npm install
```

### Run in local dev mode

```bash
# Assume you're in the root directory

# Go to server directory first, run server-side first
cd server
npm start

# Then go to client directory, run client-side
cd ../client
npm install
```

### Run in production mode

- For the client side, production ready bundle file can be achieved by running `npm run build`, then you can serve it use the web-server of your choice (Nginx or Apache)
- For the server side, there are few options to run it, and keep it running. I would recommend a tool called PM2 which can help manage Node processes very easily

## Tech Stacks

- Server-side: NodeJS, Express, MongoDB
- Client-side: React, Redux, Moment.js, Ant Design
