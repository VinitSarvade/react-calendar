import { useState } from "react";
import Calendar from "./calendar-picker";
import "./styles.scss";

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  return (
    <div className="App">
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <br />
      <br />
      {selectedDate?.toDateString()}
    </div>
  );
}
