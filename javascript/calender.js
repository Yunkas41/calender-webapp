const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
window.onload = function () {
    showProcess(today, calendar);
};
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";
    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}
function createProcess(year, month) {
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";
    var count = 0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month + 1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                count++;
                if(getNationalHoliday(year, month, count) != ""){
                    calendar += "<td class='holiday' title='" + getNationalHoliday(year, month, count)+"'>" + count + "</td>";
                } else if(year == today.getFullYear()
                  && month == (today.getMonth())
                  && count == today.getDate()){
                    calendar += "<td class='today'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}

function getNationalHoliday(nen, tsuki, hi) {
    yobi = new Date(nen, tsuki, hi).getDay();
    tsuki += 1;
    if( nen == 2019 && tsuki == 5 && hi == 1 ){
      return "天皇の即位の日";
    }else if(nen == 2019 && tsuki == 4 && hi == 30 ){
      return "休日";
    }else if(nen == 2019 && tsuki == 5 && hi == 2 ){
      return "休日";
    }else if(nen == 2019 && tsuki == 10 && hi== 22 ){
      return "即位礼正殿の儀の行われる日";
    }else if(nen == 2020 && tsuki == 7 && hi== 23 ){
      return "海の日";
    }else if(nen == 2020 && tsuki == 7 && hi== 24 ){
      return "スポーツの日";
    }else if(nen == 2020 && tsuki == 8 && hi== 10 ){
      return "山の日";
    }else if(nen == 2021 && tsuki == 7 && hi== 22 ){
      return "海の日";
    }else if(nen == 2021 && tsuki == 7 && hi== 23 ){
      return "スポーツの日";
    }else if(nen == 2021 && tsuki == 8 && hi== 8 ){
      return "山の日";
    }else if(tsuki == 1 && hi == 1) {
      return "元日";
    }else if(tsuki == 2 && hi == 11) {
      return "建国記念の日";
    }else if(tsuki == 4 && hi == 29) {
      return "昭和の日";
    }else if(tsuki == 5 && hi == 3) {
      return "憲法記念日";
    }else if(tsuki == 5 && hi == 4) {
      return "みどりの日";
    }else if(tsuki == 5 && hi == 5) {
      return "こどもの日";
    }else if(nen >= 2016 && nen != 2020 && nen != 2021 && tsuki == 8 && hi == 11) {
      return "山の日";
    }else if(tsuki == 11 && hi == 3) {
      return "文化の日";
    }else if(tsuki == 11 && hi == 23) {
      return "勤労感謝の日";
    }else if(nen<=2018 && tsuki == 12 && hi == 23) {
      return "天皇誕生日";
    }else if(nen >= 2020 && tsuki == 2 && hi == 23) {
      return "天皇誕生日";
    }else if(tsuki == 1 && yobi == 1 && 7 < hi && hi < 15) {
      return "成人の日";
    }else if(nen != 2020 && nen != 2021 && tsuki == 7 && yobi == 1 && 14 < hi && hi < 22) {
      return "海の日";
    }else if(tsuki == 9 && yobi == 1 && 14 < hi && hi < 22) {
      return "敬老の日";
    }else if(nen<=2019 && tsuki == 10 && yobi == 1 && 7 < hi && hi < 15) {
      return "体育の日";
    }else if(nen >=2022 && tsuki == 10 && yobi == 1 && 7 < hi && hi < 15) {
      return "スポーツの日";
    }else if(tsuki == 3 && hi == shunbun(nen)) {
      return "春分の日";
    }else if(tsuki == 9 && hi == shubun(nen)) {
      return "秋分の日";
    }else{
      return "";
    }
}
function shunbun(nen) {
    if(nen < 1900 || nen > 2099) {
      return 0;
    }
    if(nen % 4 === 0) {
      return nen <= 1956 ? 21 : (nen <= 2088 ? 20 : 19);
    } else if(nen % 4 == 1) {
      return nen <= 1989 ? 21 : 20;
    } else if(nen % 4 == 2) {
      return nen <= 2022 ? 21 : 20;
    } else {
      return nen <= 1923 ? 22 : (nen <= 2055 ? 21 : 20);
    }
}
function shubun(nen) {
    if(nen < 1900 || nen > 2099) {
      return 0;
    }
    if(nen % 4 === 0) {
      return nen <= 2008 ? 23 : 22;
    } else if(nen % 4 == 1) {
      return nen <= 1917 ? 24 : (nen <= 2041 ? 23 : 22);
    } else if(nen % 4 == 2) {
      return nen <= 1946 ? 24 : (nen <= 2074 ? 23 : 22);
    } else {
      return nen <= 1979 ? 24 : 23;
    }
}
