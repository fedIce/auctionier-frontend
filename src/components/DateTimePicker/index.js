import { useState } from "react";

export default function DateTimePicker({ label = "Select" }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleDateChange = (e) => setDate(e.target.value);
    const handleTimeChange = (e) => setTime(e.target.value);

    return (
        <div className="w-full space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded bg-background px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} Time
                </label>
                <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="w-full border border-gray-300 rounded bg-background px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-600">
        <p><strong>Selected Date:</strong> {date || "None"}</p>
        <p><strong>Selected Time:</strong> {time || "None"}</p>
      </div> */}
        </div>
    );
}
