const fs = require("fs");

const departments = [
  "Computer Science", "Cyber Security", "Software Engineering",
  "Information Technology", "Data Science"
];
const levels = [100, 200, 300, 400, 500];
const TOTAL = 200;

const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const students = [];
for (let i = 1; i <= TOTAL; i++) {
  const attendance = Math.round(rand(40, 100));
  // Score loosely follows attendance, plus noise, so patterns exist to mine
  const score = clamp(Math.round(attendance * 0.7 + rand(0, 30)), 0, 100);

  students.push({
    studentId: `STU${String(i).padStart(4, "0")}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    attendancePercentage: attendance,
    averageExamScore: score,
  });
}

const header = "studentId,department,level,attendancePercentage,averageExamScore";
const rows = students.map(s =>
  [s.studentId, s.department, s.level, s.attendancePercentage, s.averageExamScore].join(",")
);

fs.writeFileSync("students.csv", [header, ...rows].join("\n"));
fs.writeFileSync("students.json", JSON.stringify(students, null, 2));
console.log(`Generated ${students.length} students.`);