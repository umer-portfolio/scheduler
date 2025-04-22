'use client';

import { useState } from 'react';

const times = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
const timezones = ["GMT", "UTC", "EST", "PST", "CST"];

export default function MeetingScheduler() {
  const [form, setForm] = useState({ fullName: '', email: '', date: '', time: '', timezone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    setStatus(result.success ? 'Meeting scheduled!' : 'Error sending email.');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Schedule Your Consultation</h2>
      <input placeholder="Full Name" required className="w-full border p-2" onChange={e => setForm({ ...form, fullName: e.target.value })} />
      <input type="email" placeholder="Email Address" required className="w-full border p-2" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="date" required className="w-full border p-2" onChange={e => setForm({ ...form, date: e.target.value })} />
      
      <select required className="w-full border p-2" onChange={e => setForm({ ...form, time: e.target.value })}>
        <option value="">Select Time</option>
        {times.map(time => <option key={time}>{time}</option>)}
      </select>

      <select required className="w-full border p-2" onChange={e => setForm({ ...form, timezone: e.target.value })}>
        <option value="">Select Time Zone</option>
        {timezones.map(zone => <option key={zone}>{zone}</option>)}
      </select>

      <textarea placeholder="Additional Info (optional)" className="w-full border p-2" onChange={e => setForm({ ...form, message: e.target.value })} />

      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Schedule Meeting</button>
      {status && <p>{status}</p>}
    </form>
  );
}
