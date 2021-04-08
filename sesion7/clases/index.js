import moment from 'moment';
var birthday = moment('25-08-1983', 'DD-MM-YYYY'); 
var today = moment();
console.log(today.diff(birthday, 'days'));
