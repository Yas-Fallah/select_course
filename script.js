let selectedCourses = [];
const course = [];
let ss = [];
let names = document.getElementsByClassName("name");
for (let i of names) {
  course.push(i.textContent);
}

let btn = document.getElementsByClassName("btn");
for (let b of btn) {
  b.addEventListener("click", function (Event) {
    let id = this.getAttribute("data-id");
    let day = this.getAttribute("data-day");
    let start = this.getAttribute("data-start-time");
    let end = this.getAttribute("data-end-time");
    let time = start + "-" + end;
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    tr.appendChild(td);
    let name = document.createElement("span");

    name.textContent = course[id - 1];
    if (
      !selectedCourses.includes(name.textContent) &&
      !checkTimeConflict(id, day, time)
    ) {
      td.appendChild(name);
      let button = document.createElement("button");
      button.textContent = "حذف";
      button.className = "btn";
      button.addEventListener("click", function (MouseEvent) {
        this.parentElement.parentElement.remove();
        selectedCourses = selectedCourses.filter(
          (item) => item != name.textContent
        );
        let i = { id, start, end, day };
        const index = ss.findIndex((x) => x.id == i.id);
        ss.splice(index, 1);
      });

      td.appendChild(button);
      document.getElementById("selectedCourses").appendChild(tr);
      selectedCourses.push(name.textContent);
      ss.push({ id: id, start, end, day });
    } else if (checkTimeConflict(id, day, time)) {
      alert("Error: درس انتخابی ،تداخل زمانی دارد.");
    } else {
      alert("این درس قبلا انتخاب شده است!!");
      let i = document.getElementsByClassName("error");
      // i.innerText="این درس قبلا انتخاب شده است!!";
      // return;
    }
  });
}
// تابع تداخل زمانی
function checkTimeConflict(id, newDay, newTime) {
  const [newStart, newEnd] = newTime.split("-");
  const [startHour1, startMin1] = newStart.split(":").map(Number);
  const [endHour1, endMin1] = newEnd.split(":").map(Number);
  for (const course of ss) {
    const [existingStart, existingEnd] = [course.start, course.end];
    const [startHour2, startMin2] = existingStart.split(":").map(Number);
    const [endHour2, endMin2] = existingEnd.split(":").map(Number);

    console.log(startHour1, startHour2, endHour1, endHour2, id, course.id);
    if (id != course.id) {
      if (course.day == newDay) {
        if (startHour1 <= startHour2 && startHour2 <= endHour1) {
          return true;
        }
      }
    }
  }
  return false;
}
