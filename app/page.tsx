'use client';

import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    organizerName: '',
    organizerEmail: '',
    guestEmail: '',
    date: '',
    time: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('Email sent successfully!');
        setFormData({
          organizerName: '',
          organizerEmail: '',
          guestEmail: '',
          date: '',
          time: '',
        });
      } else {
        setStatus('Failed to send email.');
      }
    } catch (err) {
      setStatus('Something went wrong.');
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Schedule a Meeting</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="organizerName" placeholder="Your Name" value={formData.organizerName} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="organizerEmail" placeholder="Your Email" value={formData.organizerEmail} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="guestEmail" placeholder="Guest Email" value={formData.guestEmail} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send Invitation</button>
      </form>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </main>
  );
}
