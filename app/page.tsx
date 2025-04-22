'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    additionalInfo: '',
    date: new Date(),
    time: '',
    timeZone: 'MST - Mountain Standard Time (Denver)',
  });

  const [status, setStatus] = useState('');

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const timeZones = [
    'UTC - Coordinated Universal Time',
    'EST - Eastern Standard Time (New York)',
    'CST - Central Standard Time (Chicago)',
    'MST - Mountain Standard Time (Denver)',
    'PST - Pacific Standard Time (Los Angeles)',
    'GMT - Greenwich Mean Time (London)',
    'CET - Central European Time (Paris)',
    'GST - Gulf Standard Time (Dubai)',
    'IST - Indian Standard Time (Mumbai)',
    'SGT - Singapore Time',
    'AEST - Australian Eastern Standard Time (Sydney)',
    'NZST - New Zealand Standard Time (Auckland)',
    'PKT - Pakistan Standard Time (Karachi)',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: formData.date.toISOString(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('✅ Meeting scheduled successfully!');
        setFormData({
          name: '',
          email: '',
          additionalInfo: '',
          date: new Date(),
          time: '',
          timeZone: 'MST - Mountain Standard Time (Denver)',
        });
      } else {
        setStatus('❌ Failed to schedule meeting.');
      }
    } catch (err) {
      setStatus('❌ Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-2">Schedule Your Consultation</h1>
        <p className="text-center text-gray-600 mb-10">
          Select a date and time that works for you. We’ll confirm shortly.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select a Date</label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                dateFormat="EEEE, MMMM do, yyyy"
                minDate={new Date()}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select a Time</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={`p-2 sm:p-3 rounded-xl border transition text-sm sm:text-base font-medium ${
                      formData.time === time
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 text-gray-800 hover:border-blue-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Time Zone</label>
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="" disabled>Select your time zone</option>
                {timeZones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Additional Information <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full p-0.5 border border-gray-300 rounded-xl shadow-sm"
                rows={4}
                placeholder=" Let us know what you'd like to discuss..."
              />
            </div>

            <div className="pt-0.5">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                Schedule Meeting
              </button>
              {status && <p className="mt-4 text-center text-sm text-gray-600">{status}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
