import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function RegisteredUsersLastWeek(props) {
  const numberOfPreviousWeek = getWeekNumber(new Date());

  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h5"
        style={{ color: "rgba(19, 145, 135, 1)" }}
        gutterBottom
      >
        Registrations in week {numberOfPreviousWeek}
      </Typography>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data(props.appUsersList, numberOfPreviousWeek)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="dayOfWeek" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Registered users"
            barSize={20}
            fill="rgba(19, 145, 135, 0.65)"
          />
        </BarChart>
      </ResponsiveContainer>
      <Typography
        component="p"
        style={{ paddingTop: 20, color: "rgba(19, 145, 135, 1)" }}
        gutterBottom
      >
        Total number of registrations is{" "}
        {props.appUsersList.reduce(
          (result, user) =>
            user.week === numberOfPreviousWeek ? ++result : result,
          0
        )}
        .
      </Typography>
    </React.Fragment>
  );
}

function getWeekNumber(date) {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return weekNo - 1;
}

function getFirstDayOfWeek(week, year) {
  const simpleWeekDefinition = new Date(year, 0, 1 + (week - 1) * 7);
  let dayOfWeek = simpleWeekDefinition.getDay();
  let ISOweekStart = simpleWeekDefinition;
  dayOfWeek <= 4
    ? ISOweekStart.setDate(
        simpleWeekDefinition.getDate() - simpleWeekDefinition.getDay() + 1
      )
    : ISOweekStart.setDate(
        simpleWeekDefinition.getDate() + 8 - simpleWeekDefinition.getDay()
      );
  return ISOweekStart;
}

function data(usersList, previousWeek) {
  const firstDayOfWeek = getFirstDayOfWeek(
    previousWeek,
    new Date().getUTCFullYear()
  );

  const daysOfWeek = Array(7)
    .fill("")
    .map((day, index) => {
      day = new Date(+firstDayOfWeek);
      return day.setDate(day.getDate() + index);
    });

  return daysOfWeek.map(day => ({
    dayOfWeek: new Date(day).toLocaleDateString().slice(0, 5),
    "Registered users": usersList.reduce(
      (result, user) =>
        user.date === new Date(day).toLocaleDateString() ? ++result : result,
      0
    )
  }));
}
